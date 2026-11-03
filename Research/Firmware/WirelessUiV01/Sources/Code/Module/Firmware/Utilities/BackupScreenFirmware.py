"""Back up the NEOS75 screen application twice using official dfu-util.

--EnterDfu temporarily restarts only the screen. This wrapper exposes no erase,
unprotect or firmware download arguments; the finally block reads eight bytes
at the application entry and asks DfuSe to boot that existing application.
"""
import argparse as ArgumentParsing
import hashlib as Hash
import json as Json
import subprocess as Subprocess
import tempfile as TemporaryFiles
import time as Time
from datetime import datetime as DateTime, timezone as TimeZone
from pathlib import Path
import hid as Hid

RepositoryRoot = Path(__file__).resolve().parents[4]


def EnterScreenDfu(Transcript):
    Devices = [Device for Device in Hid.enumerate(0x5542, 1)
        if Device['usage_page'] == 0xFF60 and Device['usage'] == 0x61]
    if len(Devices) != 1:
        raise RuntimeError(f'Expected exactly one NEOS75 screen; found {len(Devices)}')
    Device = Hid.device()
    try:
        Device.open_path(Devices[0]['path'])
        Packet = bytes.fromhex('0013020000000078B7') + bytes(56)
        Transcript.append({'Action': 'EnterScreenDfu', 'HidPacket': Packet.hex(),
            'SerialNumber': Devices[0]['serial_number']})
        if Device.write(Packet) != 65:
            raise RuntimeError('Incomplete screen DFU entry command')
    finally:
        Device.close()
    Time.sleep(1.5)


def ReadScreenFlash(OutputFile, Transcript, Leave=False, Region='Application'):
    # Fixed application address and bounded reads. dfu-util's upload/leave path
    # sends SET_ADDRESS, UPLOAD, ABORT and empty manifestation, never ERASE or
    # nonempty data DNLOAD. Do not expose arbitrary dfu-util arguments here.
    if Region not in ('Application', 'Bootloader'):
        raise ValueError('Only application and read-only bootloader backup regions are supported')
    Address = '0x8000:8:leave' if Leave else ('0x0:32768' if Region == 'Bootloader' else '0x8000:491520')
    Arguments = [str(RepositoryRoot / 'Tools/Dfu/dfu-util.exe'),
        '--device', ',5542:1000', '--alt', '0',
        '--dfuse-address', Address, '--upload', str(OutputFile)]
    Result = Subprocess.run(Arguments, capture_output=True, timeout=60)
    Output = (Result.stdout + Result.stderr).decode('utf-8', errors='replace')
    Transcript.append({'Action': 'ReadAndLeave' if Leave else f'Read{Region}',
        'Arguments': Arguments[1:], 'ExitCode': Result.returncode, 'Output': Output})
    if Result.returncode:
        raise RuntimeError(f'dfu-util failed ({Result.returncode}): {Output[-1200:]}')


def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Parser.add_argument('--EnterDfu', action='store_true', help='restart the screen into its official DFU mode')
    Parser.add_argument('--Region', choices=('Application', 'Bootloader'), default='Application')
    Parser.add_argument('--OutputDirectory', type=Path)
    Arguments = Parser.parse_args()
    OutputDirectory = Arguments.OutputDirectory or RepositoryRoot / 'Research/Screen' / DateTime.now(TimeZone.utc).strftime('Backup%Y%m%dT%H%M%SZ')
    OutputDirectory.mkdir(parents=True, exist_ok=False)
    Transcript = []
    Summary = {'EraseSent': False, 'FirmwareDataWritten': False, 'BackupVerified': False}
    try:
        if Arguments.EnterDfu:
            EnterScreenDfu(Transcript)
        with TemporaryFiles.TemporaryDirectory(prefix='Neos75Backup') as TemporaryDirectory:
            print(f'Reading screen {Arguments.Region.lower()} twice; no erase or firmware data download.', flush=True)
            FirstFile = OutputDirectory / f'Screen{Arguments.Region}.bin'
            ReadScreenFlash(FirstFile, Transcript, Region=Arguments.Region)
            SecondFile = Path(TemporaryDirectory) / 'SecondRead.bin'
            ReadScreenFlash(SecondFile, Transcript, Region=Arguments.Region)
            First, Second = FirstFile.read_bytes(), SecondFile.read_bytes()
            ExpectedLength = 32768 if Arguments.Region == 'Bootloader' else 491520
            if len(First) != ExpectedLength or First != Second:
                raise RuntimeError('Screen backup is short or repeated reads differ')
            Summary.update(BackupVerified=True, Region=Arguments.Region,
                Address='0x0' if Arguments.Region == 'Bootloader' else '0x8000', Length=len(First),
                Sha256=Hash.sha256(First).hexdigest())
    except Exception as Error:
        Summary['Error'] = str(Error)
        raise
    finally:
        try:
            with TemporaryFiles.TemporaryDirectory(prefix='Neos75Exit') as TemporaryDirectory:
                ReadScreenFlash(Path(TemporaryDirectory) / 'Entry.bin', Transcript, Leave=True)
            Summary['ExitRequested'] = True
        except Exception as Error:
            Summary['ExitError'] = str(Error)
        for Attempt in range(40):
            if Hid.enumerate(0x5542, 1):
                Summary['ApplicationHidReturned'] = True
                break
            Time.sleep(0.25)
        (OutputDirectory / 'Transcript.json').write_text(Json.dumps(Transcript, indent=2) + '\n', encoding='utf-8')
        (OutputDirectory / 'Summary.json').write_text(Json.dumps(Summary, indent=2) + '\n', encoding='utf-8')
        print(Json.dumps(Summary, indent=2))
        print(f'Evidence: {OutputDirectory}')


if __name__ == '__main__':
    Main()
