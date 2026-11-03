"""Disable, enable document scrolling, or restore the lower screen knob mappings.

Writes Vial encoder index 1 and matrix row 5, column 8 on three layers. Captures
the complete keymap and both encoders, verifies every other mapping unchanged,
and restores the previous target mappings if verification fails. No unlock,
reset, bootloader, macro, lighting or other configuration command is exposed.
"""
import argparse as ArgumentParsing
import json as Json
import struct as Struct
import time as Time
from datetime import datetime as DateTime, timezone as TimeZone
from pathlib import Path
import hid as Hid

RepositoryRoot = Path(__file__).resolve().parents[4]


def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Mode = Parser.add_mutually_exclusive_group(required=True)
    Mode.add_argument('--Disable', action='store_true')
    Mode.add_argument('--Scroll', action='store_true', help='restore only LCD rotation events; keep push disabled')
    Mode.add_argument('--Restore', type=Path, help='Before.json from a previous run')
    Parser.add_argument('--Transport', choices=('Wired', 'Wireless'), default='Wired')
    Arguments = Parser.parse_args()
    OutputDirectory = RepositoryRoot / 'Research/Device' / DateTime.now(TimeZone.utc).strftime('ScreenKnob%Y%m%dT%H%M%SZ')
    OutputDirectory.mkdir(exist_ok=False)
    Vendor, Product = (0x1EA7, 0x4884) if Arguments.Transport == 'Wired' else (0x6D66, 0x8572)
    Devices = [Item for Item in Hid.enumerate(Vendor, Product) if Item['usage_page'] == 0xFF60 and Item['usage'] == 0x61]
    if len(Devices) != 1:
        raise RuntimeError('Expected exactly one NEOS75 configuration interface')
    Device = Hid.device()
    Transcript, Report = [], {'Mode': 'Disable' if Arguments.Disable else 'Scroll' if Arguments.Scroll else 'Restore',
        'Transport': Arguments.Transport, 'ReadbackVerified': False}

    def Exchange(Label, Data):
        Allowed = Data in (b'\xFE\x00', b'\x11')
        Allowed |= len(Data) == 4 and Data[0] == 0x12 and int.from_bytes(Data[1:3], 'big') + Data[3] <= 630 and 1 <= Data[3] <= 28
        Allowed |= len(Data) == 4 and Data[:2] == b'\xFE\x03' and Data[2] < 3 and Data[3] < 2
        Allowed |= len(Data) == 7 and Data[:2] == b'\xFE\x04' and Data[2] < 3 and Data[3] == 1 and Data[4] < 2
        Allowed |= len(Data) == 6 and Data[0] == 5 and Data[1] < 3 and Data[2:4] == bytes([5, 8])
        if not Allowed:
            raise ValueError('Packet outside lower-knob configuration allowlist')
        for Attempt in range(32):
            if not Device.read(32, timeout_ms=1): break
        Packet = b'\0' + Data.ljust(32, b'\0')
        Entry = {'Label': Label, 'Tx': Packet.hex()}
        Transcript.append(Entry)
        if Device.write(Packet) != 33:
            raise RuntimeError('Incomplete keyboard packet')
        Deadline = Time.monotonic() + 1.5
        while Time.monotonic() < Deadline:
            Reply = bytes(Device.read(32, timeout_ms=100))
            if not Reply:
                continue
            Matches = len(Reply) == 32
            if Data[0] in (5, 0x12) or Data[:2] == b'\xFE\x04':
                Matches &= Reply[:len(Data)] == Data
            elif Data == b'\x11':
                Matches &= Reply[:2] == b'\x11\x03'
            elif Data == b'\xFE\x00':
                Matches &= Reply[:12] == bytes.fromhex('06000000b03054a132103319')
            elif Data[:2] == b'\xFE\x03':
                # Encoder replies carry no request ID. Pin the observed mappings
                # before any write instead of mistaking another app's lighting
                # poll for a keycode pair. Upper mappings are never written.
                Expected = [bytes.fromhex('00000000'), bytes.fromhex('7e107e0f')] if Data[3] == 1 else [
                    bytes.fromhex('00aa00a9') if Data[2] == 0 else bytes.fromhex('78287827')]
                Matches &= Reply[:4] in Expected and not any(Reply[4:])
            if Matches:
                Entry['Rx'] = Reply.hex()
                return Reply
            Entry.setdefault('Unmatched', []).append(Reply.hex())
        raise RuntimeError(f'No correlated reply for the pinned NEOS75 mapping: {Label}')

    def ReadMappings():
        Keymap = bytearray()
        for Offset in range(0, 630, 28):
            Count = min(28, 630 - Offset)
            Reply = Exchange(f'ReadKeymap{Offset}', Struct.pack('>BHB', 0x12, Offset, Count))
            Keymap.extend(Reply[4:4 + Count])
        Encoders = []
        for Layer in range(3):
            for Index in range(2):
                Reply = Exchange(f'ReadEncoder{Layer}_{Index}', bytes([0xFE, 3, Layer, Index]))
                if Reply[:4] == bytes([0xFE, 3, Layer, Index]):
                    raise RuntimeError('Encoder query was echoed instead of handled')
                Encoders.append({'Layer': Layer, 'Index': Index, 'Codes': list(Struct.unpack('>HH', Reply[:4]))})
        return {'Uid': '19331032a15430b0', 'KeymapHex': Keymap.hex(), 'Encoders': Encoders}

    def WriteTargets(Target):
        Keymap = bytes.fromhex(Target['KeymapHex'])
        for Entry in Target['Encoders']:
            if Entry['Index'] != 1: continue
            for Direction, Code in enumerate(Entry['Codes']):
                Exchange(f'SetEncoder{Entry["Layer"]}_{Direction}', Struct.pack('>BBBBBH', 0xFE, 4, Entry['Layer'], 1, Direction, Code))
        for Layer in range(3):
            Offset = (Layer * 105 + 5 * 15 + 8) * 2
            Code = Struct.unpack_from('>H', Keymap, Offset)[0]
            Exchange(f'SetLowerPush{Layer}', Struct.pack('>BBBBH', 5, Layer, 5, 8, Code))

    Before, WritesStarted = None, False
    try:
        Device.open_path(Devices[0]['path'])
        Ident = Exchange('ReadIdentity', b'\xFE\x00')
        Version, Uid = Struct.unpack('<IQ', Ident[:12])
        if Version != 6 or f'{Uid:016x}' != '19331032a15430b0':
            raise ValueError('Keyboard identity does not match this NEOS75')
        Layers = Exchange('ReadLayerCount', b'\x11')
        if Layers[:2] != bytes([0x11, 3]):
            raise ValueError('Expected exactly three keyboard layers')
        Before = ReadMappings()
        (OutputDirectory / 'Before.json').write_text(Json.dumps(Before, indent=2) + '\n', encoding='utf-8')
        Desired = Json.loads(Json.dumps(Before))
        Restore = Json.loads(Arguments.Restore.read_text(encoding='utf-8')) if Arguments.Restore else None
        if Restore and (Restore.get('Uid') != Before['Uid'] or len(bytes.fromhex(Restore['KeymapHex'])) != 630):
            raise ValueError('Restore snapshot identity/size mismatch')
        Keymap = bytearray.fromhex(Before['KeymapHex'])
        for Entry in Desired['Encoders']:
            if Entry['Index'] == 1:
                Entry['Codes'] = [0, 0] if Arguments.Disable else [0x7E10, 0x7E0F] if Arguments.Scroll else next(Item['Codes'] for Item in Restore['Encoders'] if Item['Layer'] == Entry['Layer'] and Item['Index'] == 1)
        for Layer in range(3):
            Offset = (Layer * 105 + 5 * 15 + 8) * 2
            Keymap[Offset:Offset + 2] = b'\0\0' if Arguments.Disable or Arguments.Scroll else bytes.fromhex(Restore['KeymapHex'])[Offset:Offset + 2]
        Desired['KeymapHex'] = Keymap.hex()
        if Desired != Before:
            WritesStarted = True
            WriteTargets(Desired)
        After = ReadMappings()
        if After != Desired:
            raise RuntimeError('Full keymap/encoder verification failed')
        Device.close()
        Device = Hid.device()
        Device.open_path(Devices[0]['path'])
        if ReadMappings() != Desired:
            raise RuntimeError('Mappings changed after reopening the configuration interface')
        (OutputDirectory / 'After.json').write_text(Json.dumps(After, indent=2) + '\n', encoding='utf-8')
        Report.update(ReadbackVerified=True, ReopenVerified=True, UpperKnobUnchanged=True,
            OtherKeysUnchanged=True, Layers=3, LowerEncoderIndex=1, LowerPushRow=5, LowerPushColumn=8,
            WritesSent=WritesStarted, PowerCycleVerified=False)
    except Exception as Error:
        Report['Error'] = str(Error)
        if WritesStarted and Before is not None:
            try:
                WriteTargets(Before)
                Report['RollbackVerified'] = ReadMappings() == Before
            except Exception as RestoreError:
                Report['RollbackError'] = str(RestoreError)
        raise
    finally:
        Device.close()
        (OutputDirectory / 'Transcript.json').write_text(Json.dumps(Transcript, indent=2) + '\n', encoding='utf-8')
        (OutputDirectory / 'Report.json').write_text(Json.dumps(Report, indent=2) + '\n', encoding='utf-8')
        print(Json.dumps(Report, indent=2))
        print(f'Evidence: {OutputDirectory}')


if __name__ == '__main__':
    Main()
