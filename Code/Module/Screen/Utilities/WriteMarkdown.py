"""Compile Markdown and upload through screen USB or the optional radio bridge.

No keyboard or receiver configuration is written. Source files stay on the PC;
generated document data and receipts go under the ignored Screen/Runtime tree.
Wireless mode requires the matching main/screen bridge firmware, limits requests
and pauses during Windows input. It never falls back to screen USB writes.
"""
import argparse as ArgumentParsing
import ctypes as Native
import hashlib as Hashlib
import importlib.util as ImportUtilities
import json as Json
import secrets as Secrets
import sys as Sys
import struct as Struct
import time as Time
import zlib as Zlib
from pathlib import Path
import hid as Hid

RepositoryRoot = Path(__file__).resolve().parents[4]
Specification = ImportUtilities.spec_from_file_location('MarkdownUtilities', Path(__file__).with_name('MarkdownUtilities.py'))
MarkdownUtilities = ImportUtilities.module_from_spec(Specification)
Specification.loader.exec_module(MarkdownUtilities)
CommandDeadline = None


class CommandFailure(RuntimeError):
    def __init__(Self, Code, Message, Retryable=False):
        super().__init__(Message)
        Self.Code, Self.Retryable = Code, Retryable


class CommandArgumentParser(ArgumentParsing.ArgumentParser):
    def error(Self, Message):
        raise CommandFailure('InvalidArguments', Message)


def CheckDeadline():
    if CommandDeadline is not None and Time.monotonic() >= CommandDeadline:
        raise CommandFailure('Timeout', 'Command time budget exceeded, including input-idle waits', True)


def WriteProgress(Message):
    print(Message, file=Sys.stderr, flush=True)


class ScreenReplyTimeout(RuntimeError):
    pass


class WirelessTrafficGate:
    """Pause background radio traffic during Windows input; read timestamps only."""
    class LastInputInformation(Native.Structure):
        _fields_ = [('Size', Native.c_uint32), ('Tick', Native.c_uint32)]

    def __init__(Self, PacketsPerSecond, IdleMilliseconds):
        Self.Interval = 1 / PacketsPerSecond
        Self.IdleMilliseconds = IdleMilliseconds
        Self.NextSend = 0
        Self.Paused = False
        Self.User32 = Native.WinDLL('user32', use_last_error=True)
        Self.Kernel32 = Native.WinDLL('kernel32', use_last_error=True)
        Self.User32.GetLastInputInfo.argtypes = [Native.POINTER(Self.LastInputInformation)]
        Self.User32.GetLastInputInfo.restype = Native.c_int
        Self.Kernel32.GetTickCount.argtypes = []
        Self.Kernel32.GetTickCount.restype = Native.c_uint32

    def Wait(Self):
        while True:
            CheckDeadline()
            Information = Self.LastInputInformation()
            Information.Size = Native.sizeof(Information)
            if not Self.User32.GetLastInputInfo(Native.byref(Information)):
                raise RuntimeError('Cannot determine input-idle time; refuse background wireless traffic')
            Idle = (Self.Kernel32.GetTickCount() - Information.Tick) & 0xFFFFFFFF
            if Idle >= Self.IdleMilliseconds and Time.monotonic() >= Self.NextSend:
                if Self.Paused:
                    WriteProgress('Input is idle; wireless transfer resumed.')
                    Self.Paused = False
                Self.NextSend = Time.monotonic() + Self.Interval
                return
            if Idle < Self.IdleMilliseconds and not Self.Paused:
                WriteProgress('Input active; wireless transfer paused.')
                Self.Paused = True
            Time.sleep(0.05)


def BuildPacket(Body, Wireless=False):
    ReportBytes = 32 if Wireless else 64
    if not 1 <= len(Body) <= ReportBytes - 5:
        raise ValueError('Screen packet payload exceeds one report')
    Frame = b'\xA5\x41' + len(Body).to_bytes(2, 'big') + Body
    Frame += bytes([(sum(Frame[1:]) ^ 255) & 255])
    return b'\0' + Frame.ljust(ReportBytes, b'\0')


def Exchange(Device, Body, Wireless=False, Gate=None):
    CheckDeadline()
    if Wireless and Gate is None:
        raise ValueError('Wireless exchanges require an input-idle traffic gate')
    if Gate:
        Gate.Wait()
    ReportBytes = 32 if Wireless else 64
    if Device.write(BuildPacket(Body, Wireless=Wireless)) != ReportBytes + 1:
        raise RuntimeError('Incomplete screen HID report write')
    Deadline = Time.monotonic() + 2
    while Time.monotonic() < Deadline:
        CheckDeadline()
        Reply = bytes(Device.read(ReportBytes, timeout_ms=100))
        if len(Reply) < 6 or Reply[:2] != b'\xA5\x41':
            continue
        Length = int.from_bytes(Reply[2:4], 'big')
        if Length < 1 or Length + 5 > len(Reply) or Reply[4] != Body[0]:
            continue
        if Wireless and (Length != 27 or Reply[5:9] != b'MDUW'):
            # Ignore the native immediate echo and other applications' replies;
            # only the delayed response from the real screen acknowledges data.
            continue
        if ((sum(Reply[1:4 + Length]) ^ 255) & 255) != Reply[4 + Length]:
            raise RuntimeError('Screen response checksum mismatch')
        return Reply[5:4 + Length]
    if Wireless:
        raise ScreenReplyTimeout('No 2.4 GHz screen reply: wake the keyboard with a normal key and verify the matching main/screen firmware')
    raise ScreenReplyTimeout('Screen did not reply; install the Markdown-capable screen firmware first')


def DecodeStatus(Reply, Wireless=False):
    if Wireless:
        if len(Reply) != 26 or Reply[:4] != b'MDUW' or Reply[4] != 1:
            raise RuntimeError('Screen does not implement the compact wireless Markdown protocol')
        Magic, Version, Status, Operation, Flags, Session, Received, Total, Row, Rows, SourceBytes = Struct.unpack('<4s4BHIIHHI', Reply)
    elif len(Reply) == 32 and Reply[:4] == b'MDUI' and Reply[4] == 1:
        Magic, Version, Status, Operation, Flags, Session, Reserved, Received, Total, Row, Rows, SourceBytes = Struct.unpack('<4s4BHH5I', Reply)
    else:
        raise RuntimeError('Screen does not implement the expected Markdown protocol')
    return {'Version': Version, 'Status': Status, 'Operation': Operation, 'Active': bool(Flags & 1),
        'Session': Session, 'ReceivedBytes': Received, 'TotalBytes': Total, 'ScrollRow': Row,
        'Rows': Rows, 'SourceBytes': SourceBytes}


def ReadStatus(Device, Wireless=False, Gate=None):
    Selector = b'\x7C' if Wireless else b'\x7E'
    for Attempt in range(3 if Wireless else 1):
        try:
            return DecodeStatus(Exchange(Device, Selector + b'\x00', Wireless=Wireless, Gate=Gate), Wireless=Wireless)
        except ScreenReplyTimeout:
            if not Wireless or Attempt == 2:
                raise
            WriteProgress('Screen status reply missing; retrying a read-only query.')


def VerifyWirelessKeyboard(Device, Gate):
    for Attempt in range(2):
        CheckDeadline()
        Gate.Wait()
        if Device.write(b'\0\xFE\0' + bytes(30)) != 33:
            raise CommandFailure('TransportWrite', 'Incomplete wireless identity query', True)
        Deadline = Time.monotonic() + 1.5
        while Time.monotonic() < Deadline:
            CheckDeadline()
            Reply = bytes(Device.read(32, timeout_ms=100))
            if Reply[:12] == bytes.fromhex('06000000b03054a132103319'):
                return
    raise CommandFailure('KeyboardNotResponding', 'Receiver is online but the keyboard did not reply; keep 2.4 GHz powered on and wake with a normal key', True)


def SendOperation(Device, Operation, Session, Data=b'', Wireless=False, Gate=None):
    Selector = b'\x7C' if Wireless else b'\x7E'
    Request = Selector + bytes([Operation]) + Struct.pack('<H', Session) + Data
    ExpectedReceived = int.from_bytes(Data[:4], 'little') + len(Data) - 4 if Operation == 2 else None
    Attempts = 3 if Wireless and Operation in (1, 2, 3) else 1
    for Attempt in range(Attempts):
        try:
            Status = DecodeStatus(Exchange(Device, Request, Wireless=Wireless, Gate=Gate), Wireless=Wireless)
        except ScreenReplyTimeout:
            if not Wireless:
                raise
            # A radio reply may be lost after the block was accepted. Read back
            # before retrying; strict device offsets prevent duplicated data.
            Status = ReadStatus(Device, Wireless=True, Gate=Gate)
        Deadline = Time.monotonic() + 5
        while Time.monotonic() < Deadline:
            Matches = Status['Session'] == Session and Status['Operation'] == Operation
            Received = Status['ReceivedBytes']
            if Matches and Status['Status'] != 1:
                if Operation == 2 and Received == ExpectedReceived and Status['Status'] in (0, 3):
                    Status['Status'] = 0
                    return Status
                if Status['Status'] == 0 and (Operation != 2 or Received == ExpectedReceived):
                    return Status
                if Status['Status'] != 0:
                    Errors = {3: 'invalid document or operation', 4: 'insufficient screen memory',
                        5: 'incomplete document or CRC mismatch', 6: 'wrong upload session'}
                    raise RuntimeError('Screen rejected operation: ' + Errors.get(Status['Status'], str(Status['Status'])))
            if Wireless and Operation == 2 and Status['Status'] != 1 and Status['Session'] == Session and Received == ExpectedReceived - len(Data) + 4:
                break
            if Wireless and Operation == 1 and Status['Status'] != 1 and Status['Session'] != Session:
                break
            Time.sleep(0.005)
            Status = ReadStatus(Device, Wireless=Wireless, Gate=Gate)
    raise RuntimeError('Screen operation timed out')


def Main():
    global CommandDeadline
    Parser = CommandArgumentParser(description=__doc__)
    Parser.add_argument('InputFile', nargs='?', type=Path, help='UTF-8 Markdown file, at most 65536 bytes')
    Parser.add_argument('--Stdin', action='store_true', help='read bounded UTF-8 Markdown from standard input')
    Parser.add_argument('--BaseDirectory', type=Path, help='base directory for relative images, including stdin input')
    Parser.add_argument('--Json', action='store_true', help='compact JSON result on stdout; progress always goes to stderr')
    Parser.add_argument('--TimeoutSeconds', type=float, default=0, help='whole command time budget, including input-idle waits; 0 is unlimited')
    Parser.add_argument('--CompileOnly', action='store_true', help='produce the device package without opening HID')
    Parser.add_argument('--OutputFile', type=Path)
    Parser.add_argument('--Preview', type=Path, help='export a layout preview PNG without changing the source')
    Parser.add_argument('--AllowRemoteImages', action='store_true', help='allow bounded HTTP(S) image downloads')
    Parser.add_argument('--BytesPerSecond', type=int, default=8192, help='USB document payload throttle, 256..16384')
    Parser.add_argument('--Transport', choices=('Auto', 'Wired', 'Wireless'), default='Auto',
        help='Auto uses screen USB when connected, otherwise the 2.4 GHz receiver')
    Parser.add_argument('--WirelessPacketsPerSecond', type=int, default=8, help='background radio query cap, 1..10')
    Parser.add_argument('--WirelessIdleMilliseconds', type=int, default=500, help='pause radio traffic during input; 300..5000 ms quiet window')
    Actions = Parser.add_mutually_exclusive_group()
    Actions.add_argument('--Status', action='store_true', help='read Markdown runtime state only')
    Actions.add_argument('--Scroll', type=int, help='scroll the device document by a bounded number of rows')
    Arguments = Parser.parse_args()
    if not 0 <= Arguments.TimeoutSeconds <= 86400:
        Parser.error('TimeoutSeconds must be 0..86400')
    CommandDeadline = Time.monotonic() + Arguments.TimeoutSeconds if Arguments.TimeoutSeconds else None
    if not 256 <= Arguments.BytesPerSecond <= 16384:
        Parser.error('BytesPerSecond must be 256..16384')
    if not 1 <= Arguments.WirelessPacketsPerSecond <= 10 or not 300 <= Arguments.WirelessIdleMilliseconds <= 5000:
        Parser.error('WirelessPacketsPerSecond must be 1..10; WirelessIdleMilliseconds must be 300..5000')
    if Arguments.Scroll is not None and not -1000 <= Arguments.Scroll <= 1000:
        Parser.error('Scroll must be -1000..1000 rows')
    if Arguments.Stdin and Arguments.InputFile:
        Parser.error('InputFile and Stdin are mutually exclusive')
    if (Arguments.Status or Arguments.Scroll is not None) and (Arguments.InputFile or Arguments.Stdin or Arguments.CompileOnly or Arguments.Preview):
        Parser.error('Status/Scroll do not accept document input, CompileOnly or Preview')
    Package, Receipt = None, {}
    if not Arguments.Status and Arguments.Scroll is None:
        if Arguments.InputFile is None and not Arguments.Stdin:
            Parser.error('provide a Markdown file, --Stdin, --Status or --Scroll')
        if Arguments.Stdin and Sys.stdin.isatty():
            Parser.error('Stdin requires piped UTF-8 input; interactive input is not supported')
        Raw = Sys.stdin.buffer.read(65537) if Arguments.Stdin else Arguments.InputFile.read_bytes()
        if len(Raw) > 65536:
            raise ValueError('Markdown source exceeds the agreed 64 KiB limit')
        Source = Raw.decode('utf-8-sig')
        BaseDirectory = Arguments.BaseDirectory or (Arguments.InputFile.resolve().parent if Arguments.InputFile else Path.cwd())
        Compiler = MarkdownUtilities.MarkdownCompiler(BaseDirectory=BaseDirectory,
            AllowRemoteImages=Arguments.AllowRemoteImages)
        Package = Compiler.Compile(Source)
        OutputFile = Arguments.OutputFile or RepositoryRoot / 'Code/Module/Screen/Runtime/Markdown/Document.nsmd'
        OutputFile.parent.mkdir(parents=True, exist_ok=True)
        OutputFile.write_bytes(Package)
        if Arguments.Preview:
            Compiler.Preview(Arguments.Preview)
        CheckDeadline()
        Receipt = {'SourceBytes': len(Raw), 'SourceSha256': Hashlib.sha256(Raw).hexdigest(),
            'PackageBytes': len(Package), 'PackageSha256': Hashlib.sha256(Package).hexdigest(),
            'Rows': len(Compiler.Rows), 'Glyphs': len(Compiler.Glyphs), 'Warnings': Compiler.Warnings}
        WriteProgress('Compiled ' + str(Receipt['SourceBytes']) + ' source bytes into ' + str(Receipt['PackageBytes']) + ' package bytes.')
        if Arguments.CompileOnly:
            return dict(Receipt, Action='Compile', PackageFile=str(OutputFile.resolve()))
    SelectedTransport = Arguments.Transport
    if SelectedTransport == 'Auto':
        ScreenInterfaces = [Item for Item in Hid.enumerate(0x5542, 1) if Item['usage_page'] == 0xFF60 and Item['usage'] == 0x61]
        SelectedTransport = 'Wired' if ScreenInterfaces else 'Wireless'
    Wireless = SelectedTransport == 'Wireless'
    WriteProgress('Selected transport: ' + ('2.4 GHz receiver' if Wireless else 'screen USB'))
    Vendor, Product = (0x6D66, 0x8572) if Wireless else (0x5542, 1)
    Gate = WirelessTrafficGate(Arguments.WirelessPacketsPerSecond, Arguments.WirelessIdleMilliseconds) if Wireless else None
    Devices = [Item for Item in Hid.enumerate(Vendor, Product) if Item['usage_page'] == 0xFF60 and Item['usage'] == 0x61]
    if len(Devices) != 1:
        raise CommandFailure('DeviceNotFound' if not Devices else 'AmbiguousDevice',
            'Expected one NEOS75 receiver' if Wireless else 'Expected one separate NEOS75 screen USB interface', not Devices)
    Device = Hid.device()
    try:
        Device.open_path(Devices[0]['path'])
        if Wireless:
            VerifyWirelessKeyboard(Device, Gate)
        Status = ReadStatus(Device, Wireless=Wireless, Gate=Gate)
        TransportName = 'ReceiverRadio' if Wireless else 'ScreenUsbHid'
        if Arguments.Status:
            return {'Action': 'Status', 'Transport': TransportName, 'DeviceState': Status}
        if Arguments.Scroll is not None:
            State = SendOperation(Device, 4, Status['Session'], Struct.pack('<h', Arguments.Scroll), Wireless=Wireless, Gate=Gate)
            return {'Action': 'Scroll', 'Transport': TransportName, 'DeviceState': State}
        Session = Secrets.randbelow(65535) + 1
        Started = Time.monotonic()
        Status = SendOperation(Device, 1, Session, Struct.pack('<III', len(Package), Zlib.crc32(Package), Receipt['SourceBytes']), Wireless=Wireless, Gate=Gate)
        LastProgress = 0
        BlockBytes = 19 if Wireless else 51
        for Offset in range(0, len(Package), BlockBytes):
            Due = Started + Offset / Arguments.BytesPerSecond
            if Due > Time.monotonic():
                Time.sleep(Due - Time.monotonic())
            Block = Package[Offset:Offset + BlockBytes]
            Status = SendOperation(Device, 2, Session, Struct.pack('<I', Offset) + Block, Wireless=Wireless, Gate=Gate)
            if Status['ReceivedBytes'] != Offset + len(Block):
                raise RuntimeError('Screen acknowledged a different byte offset')
            Progress = Status['ReceivedBytes'] * 100 // len(Package)
            if Progress >= LastProgress + 10:
                print('Upload ' + str(Progress) + '%', file=Sys.stderr, flush=True)
                LastProgress = Progress
        Status = SendOperation(Device, 3, Session, Wireless=Wireless, Gate=Gate)
        if not Status['Active']:
            raise RuntimeError('Document validated but did not become active')
        Receipt.update(DeviceState=Status, ElapsedSeconds=round(Time.monotonic() - Started, 3),
            Transport='ReceiverRadio' if Wireless else 'ScreenUsbHid')
        if Wireless:
            Receipt.update(WirelessPacketsPerSecond=Arguments.WirelessPacketsPerSecond, WirelessIdleMilliseconds=Arguments.WirelessIdleMilliseconds)
        ReceiptFile = RepositoryRoot / 'Code/Module/Screen/Runtime/Markdown/UploadReceipt.json'
        ReceiptFile.parent.mkdir(parents=True, exist_ok=True)
        ReceiptFile.write_text(Json.dumps(Receipt, ensure_ascii=True, indent=2) + '\n', encoding='utf-8')
        return dict(Receipt, Action='Upload', ReceiptFile=str(ReceiptFile.resolve()))
    finally:
        Device.close()


if __name__ == '__main__':
    try:
        Result = dict(Main(), Ok=True)
        print(Json.dumps(Result, ensure_ascii=True, indent=None if '--Json' in Sys.argv else 2))
    except KeyboardInterrupt:
        print(Json.dumps({'Ok': False, 'ExitCode': 130, 'Error': {'Code': 'Cancelled', 'Message': 'Command interrupted; reupload to replace an incomplete document', 'Retryable': True}}))
        raise SystemExit(130)
    except (OSError, ValueError, RuntimeError) as Error:
        Code = Error.Code if isinstance(Error, CommandFailure) else 'NoScreenResponse' if isinstance(Error, ScreenReplyTimeout) else 'IoError' if isinstance(Error, OSError) else 'InvalidInput' if isinstance(Error, ValueError) else 'OperationFailed'
        Retryable = Error.Retryable if isinstance(Error, CommandFailure) else isinstance(Error, ScreenReplyTimeout)
        ExitCode = 3 if Retryable else 2
        print(Json.dumps({'Ok': False, 'ExitCode': ExitCode, 'Error': {'Code': Code, 'Message': str(Error), 'Retryable': Retryable}}, ensure_ascii=True))
        raise SystemExit(ExitCode)
