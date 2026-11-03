"""Compile and upload a Markdown document to the separate NEOS75 screen USB HID.

No keyboard or receiver configuration is written. Source files stay on the PC;
generated document data and receipts go under the ignored Screen/Runtime tree.
"""
import argparse as ArgumentParsing
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


def BuildPacket(Body):
    if not 1 <= len(Body) <= 59:
        raise ValueError('Screen packet payload exceeds one report')
    Frame = b'\xA5\x41' + len(Body).to_bytes(2, 'big') + Body
    Frame += bytes([(sum(Frame[1:]) ^ 255) & 255])
    return b'\0' + Frame.ljust(64, b'\0')


def Exchange(Device, Body):
    if Device.write(BuildPacket(Body)) != 65:
        raise RuntimeError('Incomplete screen HID report write')
    Deadline = Time.monotonic() + 2
    while Time.monotonic() < Deadline:
        Reply = bytes(Device.read(64, timeout_ms=100))
        if len(Reply) < 6 or Reply[:2] != b'\xA5\x41':
            continue
        Length = int.from_bytes(Reply[2:4], 'big')
        if Length < 1 or Length + 5 > len(Reply) or Reply[4] != Body[0]:
            continue
        if ((sum(Reply[1:4 + Length]) ^ 255) & 255) != Reply[4 + Length]:
            raise RuntimeError('Screen response checksum mismatch')
        return Reply[5:4 + Length]
    raise RuntimeError('Screen did not reply; install the Markdown-capable screen firmware first')


def ReadStatus(Device):
    Reply = Exchange(Device, b'\x7E\x00')
    if len(Reply) != 32 or Reply[:4] != b'MDUI' or Reply[4] != 1:
        raise RuntimeError('Screen does not implement the expected Markdown protocol')
    Magic, Version, Status, Operation, Flags, Session, Reserved, Received, Total, Row, Rows, SourceBytes = Struct.unpack('<4s4BHH5I', Reply)
    return {'Version': Version, 'Status': Status, 'Operation': Operation, 'Active': bool(Flags & 1),
        'Session': Session, 'ReceivedBytes': Received, 'TotalBytes': Total, 'ScrollRow': Row,
        'Rows': Rows, 'SourceBytes': SourceBytes}


def SendOperation(Device, Operation, Session, Data=b''):
    Exchange(Device, b'\x7E' + bytes([Operation]) + Struct.pack('<H', Session) + Data)
    Deadline = Time.monotonic() + 5
    while Time.monotonic() < Deadline:
        Status = ReadStatus(Device)
        if Status['Status'] == 1:
            Time.sleep(0.005)
            continue
        if Status['Status'] != 0:
            Errors = {3: 'invalid document or operation', 4: 'insufficient screen memory',
                5: 'incomplete document or CRC mismatch', 6: 'wrong upload session'}
            raise RuntimeError('Screen rejected operation: ' + Errors.get(Status['Status'], str(Status['Status'])))
        if Status['Session'] != Session or Status['Operation'] != Operation:
            raise RuntimeError('Screen operation acknowledgement does not match the request')
        return Status
    raise RuntimeError('Screen operation timed out')


def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Parser.add_argument('InputFile', nargs='?', type=Path, help='UTF-8 Markdown file, at most 65536 bytes')
    Parser.add_argument('--CompileOnly', action='store_true', help='produce the device package without opening HID')
    Parser.add_argument('--OutputFile', type=Path)
    Parser.add_argument('--Preview', type=Path, help='export a layout preview PNG without changing the source')
    Parser.add_argument('--AllowRemoteImages', action='store_true', help='allow bounded HTTP(S) image downloads')
    Parser.add_argument('--BytesPerSecond', type=int, default=8192, help='USB document payload throttle, 256..16384')
    Actions = Parser.add_mutually_exclusive_group()
    Actions.add_argument('--Status', action='store_true', help='read Markdown runtime state only')
    Actions.add_argument('--Scroll', type=int, help='scroll the device document by a bounded number of rows')
    Arguments = Parser.parse_args()
    if not 256 <= Arguments.BytesPerSecond <= 16384:
        Parser.error('BytesPerSecond must be 256..16384')
    if Arguments.Scroll is not None and not -1000 <= Arguments.Scroll <= 1000:
        Parser.error('Scroll must be -1000..1000 rows')
    if (Arguments.Status or Arguments.Scroll is not None) and Arguments.InputFile:
        Parser.error('Status/Scroll do not accept an input file')
    Package, Receipt = None, {}
    if not Arguments.Status and Arguments.Scroll is None:
        if Arguments.InputFile is None:
            Parser.error('provide a Markdown file, --Status or --Scroll')
        Raw = Arguments.InputFile.read_bytes()
        if len(Raw) > 65536:
            raise ValueError('Markdown source exceeds the agreed 64 KiB limit')
        Source = Raw.decode('utf-8-sig')
        Compiler = MarkdownUtilities.MarkdownCompiler(BaseDirectory=Arguments.InputFile.resolve().parent,
            AllowRemoteImages=Arguments.AllowRemoteImages)
        Package = Compiler.Compile(Source)
        OutputFile = Arguments.OutputFile or RepositoryRoot / 'Code/Module/Screen/Runtime/Markdown/Document.nsmd'
        OutputFile.parent.mkdir(parents=True, exist_ok=True)
        OutputFile.write_bytes(Package)
        if Arguments.Preview:
            Compiler.Preview(Arguments.Preview)
        Receipt = {'SourceBytes': len(Raw), 'SourceSha256': Hashlib.sha256(Raw).hexdigest(),
            'PackageBytes': len(Package), 'PackageSha256': Hashlib.sha256(Package).hexdigest(),
            'Rows': len(Compiler.Rows), 'Glyphs': len(Compiler.Glyphs), 'Warnings': Compiler.Warnings}
        print(Json.dumps(Receipt, ensure_ascii=True, indent=2))
        if Arguments.CompileOnly:
            return
    Devices = [Item for Item in Hid.enumerate(0x5542, 1) if Item['usage_page'] == 0xFF60 and Item['usage'] == 0x61]
    if len(Devices) != 1:
        raise RuntimeError('Connect the keyboard USB cable; expected one separate NEOS75 screen interface')
    Device = Hid.device()
    try:
        Device.open_path(Devices[0]['path'])
        Status = ReadStatus(Device)
        if Arguments.Status:
            print(Json.dumps(Status, indent=2))
            return
        if Arguments.Scroll is not None:
            print(Json.dumps(SendOperation(Device, 4, Status['Session'], Struct.pack('<h', Arguments.Scroll)), indent=2))
            return
        Session = Secrets.randbelow(65535) + 1
        Started = Time.monotonic()
        Status = SendOperation(Device, 1, Session, Struct.pack('<III', len(Package), Zlib.crc32(Package), Receipt['SourceBytes']))
        LastProgress = 0
        for Offset in range(0, len(Package), 51):
            Due = Started + Offset / Arguments.BytesPerSecond
            if Due > Time.monotonic():
                Time.sleep(Due - Time.monotonic())
            Block = Package[Offset:Offset + 51]
            Status = SendOperation(Device, 2, Session, Struct.pack('<I', Offset) + Block)
            if Status['ReceivedBytes'] != Offset + len(Block):
                raise RuntimeError('Screen acknowledged a different byte offset')
            Progress = Status['ReceivedBytes'] * 100 // len(Package)
            if Progress >= LastProgress + 10:
                print('Upload ' + str(Progress) + '%', flush=True)
                LastProgress = Progress
        Status = SendOperation(Device, 3, Session)
        if not Status['Active']:
            raise RuntimeError('Document validated but did not become active')
        Receipt.update(DeviceState=Status, ElapsedSeconds=round(Time.monotonic() - Started, 3), Transport='ScreenUsbHid')
        ReceiptFile = RepositoryRoot / 'Code/Module/Screen/Runtime/Markdown/UploadReceipt.json'
        ReceiptFile.parent.mkdir(parents=True, exist_ok=True)
        ReceiptFile.write_text(Json.dumps(Receipt, ensure_ascii=True, indent=2) + '\n', encoding='utf-8')
        print(Json.dumps(Status, indent=2))
        print('Markdown is resident on the screen; the uploader can exit.')
    finally:
        Device.close()


if __name__ == '__main__':
    try:
        Main()
    except (OSError, ValueError, RuntimeError) as Error:
        print('Markdown: ' + str(Error), file=Sys.stderr)
        raise SystemExit(2)
