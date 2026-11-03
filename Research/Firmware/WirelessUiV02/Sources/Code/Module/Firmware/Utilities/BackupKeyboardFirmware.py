"""Read the NEOS75 main keyboard application twice through the official DFU API.

--EnterDfu temporarily stops the main keyboard, including 2.4 GHz typing.
The fixed 2E3C:DF11 WinUSB interface must already be installed. This utility
exposes no erase, unprotect, arbitrary address or firmware data download.
"""
import argparse as ArgumentParsing
import hashlib as Hash
import json as Json
import os as Os
import re as Re
import subprocess as Subprocess
import tempfile as TemporaryFiles
import time as Time
from datetime import datetime as DateTime, timezone as TimeZone
from pathlib import Path
import hid as Hid

RepositoryRoot = Path(__file__).resolve().parents[4]
ApplicationAddress = 0x08000000
MaximumApplicationLength = 262144
ExpectedVersion = b'SV3.0.4 20261029_044228'


def HasKeyboardDfuDriver():
    Directory = Path(Os.environ.get('SystemRoot', 'C:/Windows')) / 'INF'
    for File in Directory.glob('oem*.inf'):
        try:
            Data = File.read_bytes().replace(b'\0', b'').upper()
        except OSError:
            continue
        if b'VID_2E3C&PID_DF11' in Data and b'WINUSB' in Data:
            return True
    return False


def GetKeyboardInterfaces():
    return [Item for Item in Hid.enumerate(0x1EA7, 0x4884)
        if Item['usage_page'] == 0xFF60 and Item['usage'] == 0x61]


def EnterKeyboardDfu(Transcript):
    if not HasKeyboardDfuDriver():
        raise RuntimeError('Install the approved WinUSB driver for main keyboard DFU 2E3C:DF11 first')
    Devices = GetKeyboardInterfaces()
    if len(Devices) != 1 or Devices[0]['serial_number'] != 'vial:f64c2b3c':
        raise RuntimeError('Expected the single pinned NEOS75 main keyboard USB interface')
    Device = Hid.device()
    try:
        Device.open_path(Devices[0]['path'])
        for Index in range(32):
            if not Device.read(32, timeout_ms=1):
                break
        Query = bytes.fromhex('00110200000000BC60') + bytes(24)
        if Device.write(Query) != 33:
            raise RuntimeError('Incomplete main keyboard version read')
        Deadline = Time.monotonic() + 1.5
        Version = None
        while Time.monotonic() < Deadline:
            Reply = bytes(Device.read(32, timeout_ms=100))
            if len(Reply) == 32 and Reply[:2] == b'\x11\x02':
                Transcript.append({'Action': 'ReadMainVersion', 'Tx': Query.hex(), 'Rx': Reply.hex()})
                Version = Reply[8:].rstrip(b'\0')
                break
        if Version != ExpectedVersion:
            raise RuntimeError('Main keyboard version differs from the reviewed live SV3.0.4; do not enter DFU')
        # Official generic main-controller command. The screen uses a different
        # CRC/report length and is never selected by this utility. The vendor
        # prepare command is a lighting write; it is intentionally unnecessary.
        Packet = bytes.fromhex('0013020000000030D2') + bytes(24)
        Transcript.append({'Action': 'EnterMainKeyboardDfu', 'Tx': Packet.hex(),
            'SerialNumber': Devices[0]['serial_number']})
        if Device.write(Packet) != 33:
            raise RuntimeError('Incomplete main keyboard DFU entry command')
    finally:
        Device.close()
    Time.sleep(0.5)


def RunDfu(Arguments, Transcript, Action):
    Command = [str(RepositoryRoot / 'Tools/Dfu/dfu-util.exe'),
        '--device', ',2e3c:df11', '--alt', '0'] + Arguments
    Result = Subprocess.run(Command, capture_output=True, timeout=60)
    Output = (Result.stdout + Result.stderr).decode('utf-8', errors='replace')
    Transcript.append({'Action': Action, 'Arguments': Command[1:],
        'ExitCode': Result.returncode, 'Output': Output})
    if Result.returncode:
        raise RuntimeError('Main DFU operation failed: ' + Output[-1500:])
    return Output


def ParseApplicationLength(Listing):
    Lines = [Line for Line in Listing.splitlines() if 'Found DFU:' in Line and 'alt=0' in Line]
    if len(Lines) != 1 or '[2e3c:df11]' not in Lines[0].lower():
        raise RuntimeError('Expected one main-controller DFU alt 0')
    Regions = Re.findall(r'/0x([0-9a-fA-F]+)/([^/\"]+)', Lines[0])
    for Start, Layout in Regions:
        if int(Start, 16) != ApplicationAddress:
            continue
        Total = 0
        for Part in Layout.split(','):
            Match = Re.fullmatch(r'\s*(\d+)\*(\d+)\s*([BKM ])([a-g])\s*', Part)
            if not Match or not ((ord(Match[4]) - ord('a') + 1) & 1):
                raise RuntimeError('Main DFU flash layout is invalid or not readable')
            Total += int(Match[1]) * int(Match[2]) * {'B': 1, ' ': 1, 'K': 1024, 'M': 1048576}[Match[3]]
        if Total not in (131072, MaximumApplicationLength):
            raise RuntimeError('Unreviewed main flash size; expected a 128 or 256 KiB readable application region')
        return Total
    raise RuntimeError('Main DFU descriptor does not expose the reviewed 0x08000000 flash region')


def ReadKeyboardFlash(OutputFile, Transcript, Length=MaximumApplicationLength, Leave=False):
    if Length not in (131072, MaximumApplicationLength):
        raise ValueError('Only the descriptor-confirmed 128/256 KiB main application is supported')
    Length = 8 if Leave else Length
    Address = hex(ApplicationAddress) + ':' + str(Length) + (':leave' if Leave else '')
    RunDfu(['--dfuse-address', Address, '--upload', str(OutputFile)], Transcript,
        'ReadAndLeaveMainDfu' if Leave else 'ReadMainApplication')


def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Parser.add_argument('--EnterDfu', action='store_true', help='temporarily stop the main keyboard and enter official DFU')
    Parser.add_argument('--OutputDirectory', type=Path)
    Arguments = Parser.parse_args()
    Output = Arguments.OutputDirectory or RepositoryRoot / 'Research/Device' / DateTime.now(TimeZone.utc).strftime('KeyboardBackup%Y%m%dT%H%M%SZ')
    Output.mkdir(parents=True, exist_ok=False)
    Transcript = []
    Summary = {'EraseSent': False, 'FirmwareDataWritten': False, 'BackupVerified': False,
        'ApplicationAddress': hex(ApplicationAddress), 'MaximumApplicationLength': MaximumApplicationLength,
        'DfuIdentity': '2E3C:DF11', 'ScreenDfuUsed': False}
    EnterAttempted = False
    DfuReady = False
    try:
        Listing = RunDfu(['--list'], Transcript, 'ListMainDfuBefore')
        if Arguments.EnterDfu:
            if 'Found DFU:' in Listing:
                raise RuntimeError('Another main-controller DFU is already present; refuse ambiguous entry')
            # Check the driver before allowing an operation that interrupts typing.
            if not HasKeyboardDfuDriver():
                raise RuntimeError('Main keyboard DFU WinUSB driver is not installed')
            EnterAttempted = True
            EnterKeyboardDfu(Transcript)
        elif 'Found DFU:' not in Listing:
            raise RuntimeError('Main keyboard is not in DFU; --EnterDfu requires an agreed typing interruption')
        else:
            EnterAttempted = True
        Deadline = Time.monotonic() + 12
        while True:
            Listing = RunDfu(['--list'], Transcript, 'ListMainDfuReady')
            Matches = [Line for Line in Listing.splitlines() if 'Found DFU:' in Line and 'alt=0' in Line]
            DfuReady = len(Matches) == 1 and '[2e3c:df11]' in Matches[0].lower()
            if DfuReady or Matches or Time.monotonic() >= Deadline:
                break
            Time.sleep(0.3)
        ApplicationLength = ParseApplicationLength(Listing)
        Summary['ApplicationLength'] = ApplicationLength
        with TemporaryFiles.TemporaryDirectory(prefix='Neos75KeyboardBackup') as TemporaryDirectory:
            FirstFile = Output / 'KeyboardApplication.bin'
            SecondFile = Path(TemporaryDirectory) / 'SecondRead.bin'
            print('Reading main keyboard flash twice without erase or firmware download.', flush=True)
            ReadKeyboardFlash(FirstFile, Transcript, Length=ApplicationLength)
            ReadKeyboardFlash(SecondFile, Transcript, Length=ApplicationLength)
            First, Second = FirstFile.read_bytes(), SecondFile.read_bytes()
            if len(First) != ApplicationLength or First != Second:
                raise RuntimeError('Main backup is short or repeated reads differ')
            if First[0x4400:0x4408] != bytes.fromhex('b03054a132103319'):
                raise RuntimeError('Main backup UID does not match the NEOS75')
            Summary.update(BackupVerified=True, Sha256=Hash.sha256(First).hexdigest(),
                OfficialReferenceByteMatch=False)
    except Exception as Error:
        Summary['Error'] = str(Error)
        raise
    finally:
        if EnterAttempted:
            if DfuReady:
                try:
                    with TemporaryFiles.TemporaryDirectory(prefix='Neos75KeyboardExit') as TemporaryDirectory:
                        ReadKeyboardFlash(Path(TemporaryDirectory) / 'Entry.bin', Transcript, Leave=True)
                    Summary['ExitRequested'] = True
                except Exception as Error:
                    Summary['ExitError'] = str(Error)
            for Index in range(40):
                if GetKeyboardInterfaces():
                    Summary['MainApplicationHidReturned'] = True
                    break
                Time.sleep(0.25)
        (Output / 'Transcript.json').write_text(Json.dumps(Transcript, indent=2) + '\n', encoding='utf-8')
        (Output / 'Summary.json').write_text(Json.dumps(Summary, indent=2) + '\n', encoding='utf-8')
        print(Json.dumps(Summary, indent=2))
        print('Evidence: ' + str(Output))


if __name__ == '__main__':
    Main()
