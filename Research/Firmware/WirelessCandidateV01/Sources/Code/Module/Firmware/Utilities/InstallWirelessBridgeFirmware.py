"""Install or restore only the three reviewed main keyboard bridge pages.

Explicit main-firmware mutation, separate from read-only probes and backups.
Requires an agreed typing interruption and main DFU driver. Preserves vectors,
factory system memory and every byte from the native configuration region.
"""
import argparse as ArgumentParsing
import hashlib as Hash
import importlib.util as Importing
import json as Json
import shutil as FileCopying
import time as Time
from datetime import datetime as DateTime, timezone as TimeZone
from pathlib import Path
import hid as Hid

RepositoryRoot = Path(__file__).resolve().parents[4]
Specification = Importing.spec_from_file_location('KeyboardBackupUtilities', Path(__file__).with_name('BackupKeyboardFirmware.py'))
Backup = Importing.module_from_spec(Specification)
Specification.loader.exec_module(Backup)
Base = 0x08000000
PageSize = 2048
ConfigurationOffset = 0x1F800
AllowedLayout = [('Payload', 0x0801F000, PageSize), ('Packet', 0x08014000, PageSize), ('Unknown', 0x08012000, PageSize)]


def WritePage(Page, File, Directory, Transcript, Label):
    Address = int(Page['Address'], 16)
    if (Page['Name'], Address, Page['Length']) not in AllowedLayout or len(File.read_bytes()) != PageSize:
        raise ValueError('Main write is outside the exact three reviewed 2 KiB pages')
    print(Label + ' main ' + Page['Name'] + ' page at ' + hex(Address), flush=True)
    Backup.RunDfu(['--dfuse-address', hex(Address), '--download', str(File)], Transcript, Label + Page['Name'])
    Readback = Directory / (Label + Page['Name'] + 'Readback.bin')
    Backup.RunDfu(['--dfuse-address', hex(Address) + ':2048', '--upload', str(Readback)], Transcript, 'Readback' + Page['Name'])
    if Readback.read_bytes() != File.read_bytes():
        raise RuntimeError('Main page readback mismatch: ' + Page['Name'])


def QueryWirelessIdentity():
    Devices = [Item for Item in Hid.enumerate(0x6D66, 0x8572) if Item['usage_page'] == 0xFF60 and Item['usage'] == 0x61]
    if len(Devices) != 1:
        return False
    Device = Hid.device()
    try:
        Device.open_path(Devices[0]['path'])
        for Index in range(16):
            if not Device.read(32, timeout_ms=1):
                break
        if Device.write(b'\0\xFE\0' + bytes(30)) != 33:
            return False
        Deadline = Time.monotonic() + 0.7
        while Time.monotonic() < Deadline:
            Reply = bytes(Device.read(32, timeout_ms=100))
            if Reply[:12] == bytes.fromhex('06000000b03054a132103319'):
                return True
        return False
    finally:
        Device.close()


def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Parser.add_argument('--Plan', type=Path, default=RepositoryRoot / 'Code/Module/Keyboard/Runtime/WirelessBridge/WirelessBridgePlan.json')
    Parser.add_argument('--EnterDfu', action='store_true')
    Parser.add_argument('--Restore', action='store_true')
    Arguments = Parser.parse_args()
    Profile = Json.loads((RepositoryRoot / 'Code/Module/Keyboard/Wireless/BridgeProfile.json').read_text())
    PlanDirectory = Arguments.Plan.resolve().parent
    Plan = Json.loads(Arguments.Plan.read_text())
    Original = Path(Plan['BaseBackup']).read_bytes()
    if len(Original) != 262144 or Plan['BaseSha256'] != Profile['ApplicationSha256'] or Hash.sha256(Original).hexdigest() != Plan['BaseSha256']:
        raise ValueError('Main original backup fingerprint mismatch')
    if [(Item['Name'], int(Item['Address'], 16), Item['Length']) for Item in Plan['Pages']] != AllowedLayout:
        raise ValueError('Main plan does not match the fixed three-page layout and safe order')
    Patched = bytearray(Original)
    for Page in Plan['Pages']:
        for FileKey, HashKey in (('File', 'Sha256'), ('RestoreFile', 'RestoreSha256')):
            File = (PlanDirectory / Page[FileKey]).resolve()
            if File.parent != PlanDirectory or Hash.sha256(File.read_bytes()).hexdigest() != Page[HashKey]:
                raise ValueError('Main package file path or hash mismatch')
        Offset = int(Page['Address'], 16) - Base
        if (PlanDirectory / Page['RestoreFile']).read_bytes() != Original[Offset:Offset + PageSize]:
            raise ValueError('Main recovery page differs from the verified backup')
        Patched[Offset:Offset + PageSize] = (PlanDirectory / Page['File']).read_bytes()
    if Hash.sha256(Patched).hexdigest() != Plan['PatchedApplicationSha256']:
        raise ValueError('Main patched whole-image fingerprint mismatch')
    if Patched[:PageSize] != Original[:PageSize] or Patched[ConfigurationOffset:] != Original[ConfigurationOffset:]:
        raise ValueError('Main vectors/configuration unexpectedly changed')
    Output = RepositoryRoot / 'Research/Device' / DateTime.now(TimeZone.utc).strftime('KeyboardFlash%Y%m%dT%H%M%SZ')
    Output.mkdir()
    Package = Output / 'Package'
    Package.mkdir()
    FileCopying.copy2(Arguments.Plan, Package / 'WirelessBridgePlan.json')
    for Page in Plan['Pages']:
        for Key in ('File', 'RestoreFile'):
            FileCopying.copy2(PlanDirectory / Page[Key], Package / Page[Key])
    Transcript, Report = [], {'Mode': 'Restore' if Arguments.Restore else 'Install', 'FirmwareWritten': False,
        'ApplicationVerified': False, 'ConfigurationPreserved': False, 'VectorsPreserved': False,
        'FactorySystemMemoryWritten': False, 'Plan': str(Package / 'WirelessBridgePlan.json')}
    WritesStarted, DfuReady, SafeToBoot = False, False, False
    Before = None
    try:
        Listing = Backup.RunDfu(['--list'], Transcript, 'ListMainBefore')
        if Arguments.EnterDfu:
            if 'Found DFU:' in Listing:
                raise RuntimeError('A main-controller DFU is already present; refuse ambiguous entry')
            Backup.EnterKeyboardDfu(Transcript)
        Deadline = Time.monotonic() + 12
        while True:
            Listing = Backup.RunDfu(['--list'], Transcript, 'WaitMainDfu')
            Matches = [Line for Line in Listing.splitlines() if 'Found DFU:' in Line and 'alt=0' in Line]
            DfuReady = len(Matches) == 1 and '[2e3c:df11]' in Matches[0].lower()
            if DfuReady or Matches or Time.monotonic() >= Deadline:
                break
            Time.sleep(0.3)
        if Backup.ParseApplicationLength(Listing) != 262144:
            raise RuntimeError('Main application region must match the 256 KiB backed-up device')
        BeforeFile = Output / 'BeforeApplication.bin'
        Backup.ReadKeyboardFlash(BeforeFile, Transcript)
        Before = BeforeFile.read_bytes()
        Second = Output / 'BeforeApplicationConfirm.bin'
        Backup.ReadKeyboardFlash(Second, Transcript)
        if Before != Second.read_bytes():
            raise RuntimeError('Main repeated pre-write reads differ')
        if Before[:ConfigurationOffset] not in (Original[:ConfigurationOffset], bytes(Patched[:ConfigurationOffset])):
            raise RuntimeError('Current main code is neither the verified stock nor this exact bridge')
        Target = bytearray(Original if Arguments.Restore else Patched)
        Target[ConfigurationOffset:] = Before[ConfigurationOffset:]
        Report['ConfigurationSha256'] = Hash.sha256(Before[ConfigurationOffset:]).hexdigest()
        for Page in reversed(Plan['Pages']) if Arguments.Restore else Plan['Pages']:
            File = Package / Page['RestoreFile' if Arguments.Restore else 'File']
            Offset = int(Page['Address'], 16) - Base
            if Before[Offset:Offset + PageSize] == File.read_bytes():
                Report.setdefault('UnchangedPagesSkipped', []).append(Page['Name'])
                continue
            WritesStarted = True
            WritePage(Page, File, Output, Transcript, 'Restore' if Arguments.Restore else 'Install')
        AfterFile = Output / 'AfterApplication.bin'
        Backup.ReadKeyboardFlash(AfterFile, Transcript)
        After = AfterFile.read_bytes()
        if After != Target:
            raise RuntimeError('Main final whole-image readback mismatch')
        SafeToBoot = True
        Report.update(FirmwareWritten=WritesStarted, ApplicationVerified=True, ConfigurationPreserved=True,
            VectorsPreserved=True, ApplicationSha256=Hash.sha256(After).hexdigest())
    except Exception as Error:
        Report['Error'] = str(Error)
        if WritesStarted and Before is not None:
            try:
                for Page in reversed(Plan['Pages']):
                    Offset = int(Page['Address'], 16) - Base
                    File = Output / ('Rollback' + Page['Name'] + 'Page.bin')
                    File.write_bytes(Before[Offset:Offset + PageSize])
                    WritePage(Page, File, Output, Transcript, 'Rollback')
                Readback = Output / 'RollbackApplication.bin'
                Backup.ReadKeyboardFlash(Readback, Transcript)
                SafeToBoot = Readback.read_bytes() == Before
                Report['RollbackVerified'] = SafeToBoot
            except Exception as RollbackError:
                Report['RollbackError'] = str(RollbackError)
        elif DfuReady:
            SafeToBoot = True
        raise
    finally:
        if SafeToBoot:
            try:
                Backup.ReadKeyboardFlash(Output / 'Entry.bin', Transcript, Leave=True)
                Report['ExitRequested'] = True
            except Exception as Error:
                Report['ExitTransportMessage'] = str(Error)
            Deadline = Time.monotonic() + 10
            while Time.monotonic() < Deadline:
                if Backup.GetKeyboardInterfaces() and QueryWirelessIdentity():
                    Report['MainUsbAndWirelessIdentityReturned'] = True
                    break
                Time.sleep(0.3)
        (Output / 'Transcript.json').write_text(Json.dumps(Transcript, indent=2) + '\n', encoding='utf-8')
        (Output / 'Report.json').write_text(Json.dumps(Report, indent=2) + '\n', encoding='utf-8')
        print(Json.dumps(Report, indent=2))
        print('Evidence: ' + str(Output))
    if Report['ApplicationVerified'] and not Report.get('MainUsbAndWirelessIdentityReturned'):
        raise RuntimeError('Main image verified, but USB plus radio identity recovery has not been confirmed; inspect deployment record')


if __name__ == '__main__':
    Main()
