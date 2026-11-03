"""Install or restore the verified NEOS75 screen application pages.

This is an explicit firmware-writing tool, separate from read-only probes.
It checks the complete current image, writes payload/vector/hook in that order,
verifies every page and the whole image, then boots the application. A failed
write or an automatic return to DFU triggers restoration from the exact backup.
"""
import argparse as ArgumentParsing
import hashlib as Hash
import importlib.util as Importing
import json as Json
import subprocess as Subprocess
import shutil as FileCopying
import time as Time
from datetime import datetime as DateTime, timezone as TimeZone
from pathlib import Path
import hid as Hid

RepositoryRoot = Path(__file__).resolve().parents[4]
Specification = Importing.spec_from_file_location('ScreenBackupUtilities', Path(__file__).with_name('BackupScreenFirmware.py'))
BackupUtilities = Importing.module_from_spec(Specification)
Specification.loader.exec_module(BackupUtilities)


def RunDfu(Arguments, Transcript):
    Command = [str(RepositoryRoot / 'Tools/Dfu/dfu-util.exe'), '--device', ',5542:1000', '--alt', '0', *Arguments]
    Result = Subprocess.run(Command, capture_output=True, timeout=30)
    Output = (Result.stdout + Result.stderr).decode('utf-8', errors='replace')
    Transcript.append({'Arguments': Command[1:], 'ExitCode': Result.returncode, 'Output': Output})
    if Result.returncode:
        raise RuntimeError(f'dfu-util failed ({Result.returncode}): {Output[-1500:]}')


def WritePage(Page, PageFile, Expected, EvidenceDirectory, Transcript, Label):
    Address = int(Page['Address'], 16)
    if Address not in (0x50000, 0x51000, 0x52000, 0x53000, 0x8000, 0x35000, 0x3C000) or len(Expected) != 4096:
        raise ValueError('Refusing to write outside the exact supported application pages')
    print(f'{Label} {Page["Name"]} page at {Address:#x}', flush=True)
    RunDfu(['--dfuse-address', hex(Address), '--download', str(PageFile)], Transcript)
    ReadbackFile = EvidenceDirectory / f'{Label}{Page["Name"]}Readback.bin'
    RunDfu(['--dfuse-address', f'{Address:#x}:4096', '--upload', str(ReadbackFile)], Transcript)
    if ReadbackFile.read_bytes() != Expected:
        raise RuntimeError(f'{Page["Name"]} page readback differs after {Label}')


def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Parser.add_argument('--Plan', type=Path, default=RepositoryRoot / 'Code/Module/Screen/Runtime/Device/ScreenUiPatchPlan.json')
    Parser.add_argument('--EnterDfu', action='store_true')
    Parser.add_argument('--Restore', action='store_true', help='restore original pages from the exact device backup')
    Arguments = Parser.parse_args()
    PlanDirectory = Arguments.Plan.resolve().parent
    Plan = Json.loads(Arguments.Plan.read_text(encoding='utf-8'))
    Profile = Json.loads((RepositoryRoot / 'Code/Module/Screen/Device/NativeProfile.json').read_text(encoding='utf-8'))
    Original = Path(Plan['BaseBackup']).read_bytes()
    if Hash.sha256(Original).hexdigest() != Profile['ApplicationSha256'] or Plan['BaseSha256'] != Profile['ApplicationSha256']:
        raise ValueError('Original device backup fingerprint mismatch')
    Layout = [(Page['Name'], int(Page['Address'], 16), Page['Length']) for Page in Plan['Pages']]
    AllowedLayouts = [
        [('Payload', 0x50000, 4096), ('Vector', 0x8000, 4096), ('Hook', 0x3C000, 4096)],
        [('Payload', 0x50000, 4096), ('Vector', 0x8000, 4096), ('Information', 0x35000, 4096), ('Hook', 0x3C000, 4096)],
        [('Payload', 0x50000, 4096), ('Payload01', 0x51000, 4096), ('Payload02', 0x52000, 4096),
         ('Payload03', 0x53000, 4096), ('Vector', 0x8000, 4096), ('Information', 0x35000, 4096), ('Hook', 0x3C000, 4096)]]
    if Layout not in AllowedLayouts:
        raise ValueError('Patch plan must contain only supported pages in safe order')
    Modified = bytearray(Original)
    for Page in Plan['Pages']:
        for FileKey, HashKey in (('File', 'Sha256'), ('RestoreFile', 'RestoreSha256')):
            File = (PlanDirectory / Page[FileKey]).resolve()
            if File.parent != PlanDirectory or Hash.sha256(File.read_bytes()).hexdigest() != Page[HashKey]:
                raise ValueError('Patch/restore file path or fingerprint mismatch')
        Offset = int(Page['Address'], 16) - 0x8000
        if (PlanDirectory / Page['RestoreFile']).read_bytes() != Original[Offset:Offset + 4096]:
            raise ValueError('Restore page does not match original backup')
        Modified[Offset:Offset + 4096] = (PlanDirectory / Page['File']).read_bytes()
    if Hash.sha256(Modified).hexdigest() != Plan['PatchedApplicationSha256']:
        raise ValueError('Patched whole-image fingerprint mismatch')
    OutputDirectory = RepositoryRoot / 'Research/Screen' / DateTime.now(TimeZone.utc).strftime('Flash%Y%m%dT%H%M%SZ')
    OutputDirectory.mkdir(exist_ok=False)
    PackageDirectory = OutputDirectory / 'Package'
    PackageDirectory.mkdir()
    FileCopying.copy2(Arguments.Plan, PackageDirectory / 'ScreenUiPatchPlan.json')
    for Page in Plan['Pages']:
        for Key in ('File', 'RestoreFile'):
            FileCopying.copy2(PlanDirectory / Page[Key], PackageDirectory / Page[Key])
    PlanDirectory = PackageDirectory
    Transcript = []
    InstalledRecord = RepositoryRoot / 'Research/Screen/InstalledUi.json'
    PreviousInstallation = Json.loads(InstalledRecord.read_text(encoding='utf-8')) if InstalledRecord.is_file() else {}
    Report = {'Mode': 'Restore' if Arguments.Restore else 'Install', 'Plan': str(PackageDirectory / 'ScreenUiPatchPlan.json'),
        'ApplicationVerified': False, 'ApplicationHidReturned': False, 'BootloaderWritten': False}
    WritesStarted, SafeToBoot = False, False
    Target = Original if Arguments.Restore else bytes(Modified)
    RestoreTarget = Original
    ConfigurationOffset = 0x7F000 - 0x8000

    def RestorePages():
        for Page in reversed(Plan['Pages']):
            File = PlanDirectory / Page['RestoreFile']
            WritePage(Page, File, File.read_bytes(), OutputDirectory, Transcript, 'Rollback')
        Readback = OutputDirectory / 'RestoredApplication.bin'
        BackupUtilities.ReadScreenFlash(Readback, Transcript)
        if Readback.read_bytes() != RestoreTarget:
            raise RuntimeError('Restored whole application differs from original backup')
        Report['OriginalRestored'] = True

    try:
        if Arguments.EnterDfu:
            BackupUtilities.EnterScreenDfu(Transcript)
        BeforeFile = OutputDirectory / 'BeforeApplication.bin'
        BackupUtilities.ReadScreenFlash(BeforeFile, Transcript)
        Before = BeforeFile.read_bytes()
        if len(Before) != len(Original):
            raise ValueError('Current device application has an unexpected length')
        # The final 4 KiB is native mutable configuration, observed changing
        # independently of all code pages. Preserve it byte for byte, including
        # during rollback; never use it to identify the executable version.
        BeforeNormalized = Before[:ConfigurationOffset] + Original[ConfigurationOffset:]
        RestoreTarget = Original[:ConfigurationOffset] + Before[ConfigurationOffset:]
        Target = RestoreTarget if Arguments.Restore else bytes(Modified[:ConfigurationOffset]) + Before[ConfigurationOffset:]
        Report['ConfigurationPreserved'] = True
        Report['ConfigurationAddress'] = '0x7f000'
        # Any bytes outside these pages must still match this device backup.
        Outside = bytearray(BeforeNormalized)
        for Page in Plan['Pages']:
            Offset = int(Page['Address'], 16) - 0x8000
            Outside[Offset:Offset + 4096] = Original[Offset:Offset + 4096]
        if Outside != Original:
            raise ValueError('Current device differs outside the supported patch pages')
        KnownPrevious = False
        if PreviousInstallation.get('BaseSha256') == Profile['ApplicationSha256'] and PreviousInstallation.get('Report'):
            PreviousSnapshot = Path(PreviousInstallation['Report']).parent / 'AfterApplication.bin'
            if PreviousSnapshot.is_file():
                PreviousBytes = PreviousSnapshot.read_bytes()
                if Hash.sha256(PreviousBytes).hexdigest() == PreviousInstallation.get('ApplicationSha256'):
                    KnownPrevious = BeforeNormalized == PreviousBytes[:ConfigurationOffset] + Original[ConfigurationOffset:]
        if not Arguments.Restore and BeforeNormalized not in (Original, bytes(Modified)) and not KnownPrevious:
            raise ValueError('Current patch pages are unknown; restore the original first')
        if Before != Target:
            WritesStarted = True
            for Page in (list(reversed(Plan['Pages'])) if Arguments.Restore else Plan['Pages']):
                File = PlanDirectory / Page['RestoreFile' if Arguments.Restore else 'File']
                Offset = int(Page['Address'], 16) - 0x8000
                if Before[Offset:Offset + 4096] == File.read_bytes():
                    Report.setdefault('UnchangedPagesSkipped', []).append(Page['Name'])
                    continue
                WritePage(Page, File, File.read_bytes(), OutputDirectory, Transcript, 'Restore' if Arguments.Restore else 'Install')
        AfterFile = OutputDirectory / 'AfterApplication.bin'
        BackupUtilities.ReadScreenFlash(AfterFile, Transcript)
        if AfterFile.read_bytes() != Target:
            raise RuntimeError('Complete application readback differs from the planned image')
        Report.update(ApplicationVerified=True, ApplicationSha256=Hash.sha256(Target).hexdigest(),
            FirmwareWritten=WritesStarted)
        SafeToBoot = True
    except Exception as Error:
        Report['Error'] = str(Error)
        if WritesStarted:
            try:
                RestorePages()
                SafeToBoot = True
            except Exception as RestoreError:
                Report['RestoreError'] = str(RestoreError)
        else:
            SafeToBoot = True
    if SafeToBoot:
        try:
            BackupUtilities.ReadScreenFlash(OutputDirectory / 'ExitEntry.bin', Transcript, Leave=True)
            Report['ExitRequested'] = True
            # Observe for longer than the 10,000-tick LVGL watchdog interval.
            for Attempt in range(40):
                if Hid.enumerate(0x5542, 1):
                    Report['ApplicationHidReturned'] = True
                Time.sleep(0.5)
            Report['ApplicationHidStable'] = bool(Hid.enumerate(0x5542, 1))
            if not Report['ApplicationHidStable'] and not Arguments.Restore and Report['ApplicationVerified']:
                Report['RecoveryTriggered'] = True
                RestorePages()
                BackupUtilities.ReadScreenFlash(OutputDirectory / 'RestoredExitEntry.bin', Transcript, Leave=True)
                Time.sleep(2)
                Report['OriginalHidReturned'] = bool(Hid.enumerate(0x5542, 1))
        except Exception as Error:
            Report['ExitError'] = str(Error)
    (OutputDirectory / 'Transcript.json').write_text(Json.dumps(Transcript, indent=2) + '\n', encoding='utf-8')
    (OutputDirectory / 'Report.json').write_text(Json.dumps(Report, indent=2) + '\n', encoding='utf-8')
    if Report.get('ApplicationHidStable') and Report.get('ApplicationVerified') and not Report.get('OriginalRestored'):
        Record = {'Mode': Report['Mode'], 'BaseSha256': Profile['ApplicationSha256'],
            'ApplicationSha256': Report['ApplicationSha256'], 'Plan': Report['Plan'],
            'Report': str(OutputDirectory / 'Report.json'), 'HardwareDisplayVerified': False}
        InstalledRecord.write_text(Json.dumps(Record, indent=2) + '\n', encoding='utf-8')
    print(Json.dumps(Report, indent=2))
    print(f'Evidence: {OutputDirectory}')
    if Report.get('Error') or Report.get('ExitError') or Report.get('RecoveryTriggered'):
        raise SystemExit(1)


if __name__ == '__main__':
    Main()
