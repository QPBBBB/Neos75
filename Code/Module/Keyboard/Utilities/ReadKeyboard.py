"""Read NEOS75 identification and configuration through documented VIA/Vial queries.

Never sends reset, bootloader, unlock, keymap-set, or vendor-specific commands.
Requires hidapi installed in the portable Tools/Python39 runtime.
"""
import argparse as ArgumentParsing
import json as Json
import lzma as Lzma
import struct as Struct
import time as Time
from datetime import datetime as DateTime, timezone as TimeZone
from pathlib import Path
RepositoryRoot = Path(__file__).resolve().parents[4]
import hid as Hid
VendorId, ProductId = (7847, 18564)

def IsReadQueryAllowed(Data):
    if not Data:
        return False
    if Data[0] in (1, 17):
        return len(Data) == 1
    if Data[0] == 18:
        return len(Data) == 4 and 1 <= Data[3] <= 28
    if Data[:2] in (b'\xfe\x00', b'\xfe\x01', b'\xfe\x05'):
        return len(Data) == 2
    if Data[:2] == b'\xfe\x02':
        return len(Data) == 6
    if Data[:2] == b'\xfe\x03':
        return len(Data) == 4
    return False

def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Parser.add_argument('--Enumerate', action='store_true', help='enumerate only; send no packets')
    Parser.add_argument('--ReadEncoders', action='store_true', help='read documented Vial encoder slots 0 and 1')
    Parser.add_argument('--OutputDirectory', type=Path, help='directory for the captured snapshot')
    Arguments = Parser.parse_args()
    OutputDirectory = Arguments.OutputDirectory or RepositoryRoot / 'Research' / 'Device' / DateTime.now(TimeZone.utc).strftime('Run%Y%m%dT%H%M%SZ')
    OutputDirectory.mkdir(parents=True, exist_ok=True)
    Devices = [D for D in Hid.enumerate() if D['vendor_id'] == VendorId and D['product_id'] == ProductId]
    Serializable = [{K: V.decode(errors='replace') if isinstance(V, bytes) else V for K, V in D.items()} for D in Devices]
    (OutputDirectory / 'HidInterfaces.json').write_text(Json.dumps(Serializable, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Found {len(Devices)} NEOS75 HID collections; output: {OutputDirectory}')
    if Arguments.Enumerate:
        return
    Candidates = [D for D in Devices if D['usage_page'] == 65376 and D['usage'] == 97]
    if len(Candidates) != 1:
        raise RuntimeError(f'Expected one NEOS75 Raw HID interface; found {len(Candidates)}')
    Device = Hid.device()
    Transcript = []
    Summary = {'timestamp_utc': DateTime.now(TimeZone.utc).isoformat(), 'vid': hex(VendorId), 'pid': hex(ProductId)}

    def Query(Label, Data):
        if not IsReadQueryAllowed(Data):
            raise ValueError('Query rejected by read-only allowlist')
        Packet = b'\x00' + Data.ljust(32, b'\x00')
        Entry = {'label': Label, 'tx': Packet.hex()}
        Transcript.append(Entry)
        Stale = []
        for AttemptIndex in range(64):
            Pending = bytes(Device.read(32, timeout_ms=1))
            if not Pending:
                break
            Stale.append(Pending.hex())
        if Stale:
            Entry['pending_before_query'] = Stale
        if Device.write(Packet) != 33:
            raise RuntimeError(f'Incomplete query transmission: {Label}')
        Deadline = Time.monotonic() + 1.5
        while Time.monotonic() < Deadline:
            Response = bytes(Device.read(32, timeout_ms=100))
            if not Response:
                continue
            if len(Response) != 32:
                Entry.setdefault('unmatched', []).append(Response.hex())
                continue
            Matches = True
            if Data[0] in (1, 17, 18):
                Matches = Response[:len(Data)] == Data if Data[0] == 18 else Response[0] == Data[0]
            elif Data == b'\xfe\x00':
                Matches = 1 <= Struct.unpack('<I', Response[:4])[0] <= 6
            if Matches:
                Entry['rx'] = Response.hex()
                return Response
            Entry.setdefault('unmatched', []).append(Response.hex())
        raise RuntimeError(f'No matching reply to {Label}; see ReadTranscript.json')
    try:
        Device.open_path(Candidates[0]['path'])
        Via = Query('via_protocol', b'\x01')
        if Via[0] != 1:
            raise RuntimeError(f'Unexpected VIA protocol response: {Via.hex()}')
        Summary['via_protocol'] = Struct.unpack('>H', Via[1:3])[0]
        Ident = Query('vial_identity', b'\xfe\x00')
        Version, Uid = Struct.unpack('<IQ', Ident[:12])
        if not 1 <= Version <= 6:
            raise RuntimeError(f'Unrecognized Vial protocol version {Version}')
        Summary.update(vial_protocol=Version, keyboard_uid_hex=f'{Uid:016x}', identity_hex=Ident.hex())
        Size = Struct.unpack('<I', Query('definition_size', b'\xfe\x01')[:4])[0]
        if not 0 < Size <= 262144:
            raise RuntimeError(f'Definition size out of bounds: {Size}')
        Summary['compressed_definition_bytes'] = Size
        Blob = b''.join((Query(f'definition_block_{I}', Struct.pack('<BBI', 254, 2, I)) for I in range((Size + 31) // 32)))[:Size]
        (OutputDirectory / 'Definition.xz').write_bytes(Blob)
        Definition = Json.loads(Lzma.decompress(Blob, memlimit=64 * 1024 * 1024))
        (OutputDirectory / 'Definition.json').write_text(Json.dumps(Definition, ensure_ascii=False, indent=2), encoding='utf-8')
        Summary['definition'] = Definition
        Layers = Query('layer_count', b'\x11')
        if Layers[0] != 17 or not 1 <= Layers[1] <= 32:
            raise RuntimeError('Invalid layer count reply')
        Summary['layer_count'] = Layers[1]
        Rows, Cols = (Definition['matrix']['rows'], Definition['matrix']['cols'])
        Total = Layers[1] * Rows * Cols * 2
        if not 0 < Total <= 65535:
            raise RuntimeError('Keymap exceeds read bounds')
        Keymap = bytearray()
        for Offset in range(0, Total, 28):
            Count = min(28, Total - Offset)
            Reply = Query(f'keymap_{Offset}', Struct.pack('>BHB', 18, Offset, Count))
            if Reply[:4] != Struct.pack('>BHB', 18, Offset, Count):
                raise RuntimeError('Keymap reply header mismatch')
            Keymap.extend(Reply[4:4 + Count])
        (OutputDirectory / 'Keymap.bin').write_bytes(Keymap)
        Summary['keymap_hex_by_layer'] = [bytes(Keymap[I * Rows * Cols * 2:(I + 1) * Rows * Cols * 2]).hex() for I in range(Layers[1])]
        EncoderIndices = sorted({int(S.split(',')[0]) for Row in Definition.get('layouts', {}).get('keymap', []) if isinstance(Row, list) for S in Row if isinstance(S, str) and S.endswith('\ne')})
        if Arguments.ReadEncoders:
            EncoderIndices = sorted(set(EncoderIndices) | {0, 1})
        Summary['encoder_indices'] = EncoderIndices
        Summary['encoder_map'] = []
        for Layer in range(Layers[1]):
            for Index in EncoderIndices:
                Reply = Query(f'encoder_{Layer}_{Index}', bytes([254, 3, Layer, Index]))
                if Reply[:4] == bytes([254, 3, Layer, Index]):
                    Summary['encoder_map'].append({'layer': Layer, 'index': Index, 'status': 'request echoed; encoder query unsupported or unhandled', 'raw': Reply.hex()})
                    continue
                CounterClockwise, Clockwise = Struct.unpack('>HH', Reply[:4])
                Summary['encoder_map'].append({'layer': Layer, 'index': Index, 'ccw': f'0x{CounterClockwise:04x}', 'cw': f'0x{Clockwise:04x}'})
        print(Json.dumps({K: V for K, V in Summary.items() if K not in ('definition', 'keymap_hex_by_layer')}, ensure_ascii=False, indent=2))
    finally:
        Device.close()
        (OutputDirectory / 'ReadTranscript.json').write_text(Json.dumps(Transcript, indent=2), encoding='utf-8')
        (OutputDirectory / 'Summary.json').write_text(Json.dumps(Summary, ensure_ascii=False, indent=2), encoding='utf-8')
if __name__ == '__main__':
    Main()
