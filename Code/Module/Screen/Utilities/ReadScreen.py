"""Read only NEOS75 screen identification, firmware version and capacity."""
import argparse as ArgumentParsing
import json as Json
import struct as Struct
import time as Time
from datetime import datetime as DateTime, timezone as TimeZone
from pathlib import Path
RepositoryRoot = Path(__file__).resolve().parents[4]
import hid as Hid

def BuildInformationPacket(Selector):
    if Selector not in (16, 17, 20):
        raise ValueError('Only documented device-information reads are allowed')
    Body = bytes([65, 0, 1, Selector])
    return bytes([0, 165]) + Body + bytes([(sum(Body) ^ 255) & 255]) + bytes(58)

def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Parser.add_argument('--OutputDirectory', type=Path, help='directory for the captured snapshot')
    Arguments = Parser.parse_args()
    OutputDirectory = Arguments.OutputDirectory or RepositoryRoot / 'Research' / 'Screen' / DateTime.now(TimeZone.utc).strftime('Run%Y%m%dT%H%M%SZ')
    OutputDirectory.mkdir(parents=True, exist_ok=True)
    Devices = Hid.enumerate(21826, 1)
    (OutputDirectory / 'Interfaces.json').write_text(Json.dumps(Devices, default=lambda B: B.decode(errors='replace'), ensure_ascii=False, indent=2), encoding='utf-8')
    if len(Devices) != 1:
        raise RuntimeError(f'Expected exactly one screen interface; found {len(Devices)}')
    Device = Hid.device()
    Transcript, Summary = ([], {})
    try:
        Device.open_path(Devices[0]['path'])
        # Official updater readFirmwareVersion; this does not prepare an upgrade.
        VersionPacket = bytes([0, 0x11, 2, 0, 0, 0, 0, 0xBC, 0x60]) + bytes(56)
        VersionEntry = {'command': 'ReadFirmwareVersion', 'tx': VersionPacket.hex()}
        Transcript.append(VersionEntry)
        if Device.write(VersionPacket) != len(VersionPacket):
            raise RuntimeError('Incomplete version query transmission')
        VersionReply = bytes(Device.read(64, timeout_ms=1500))
        VersionEntry['rx'] = VersionReply.hex()
        if len(VersionReply) >= 8 and VersionReply[:2] == bytes([0x11, 2]):
            Summary['firmware_version'] = VersionReply[8:].decode('ascii', errors='replace').replace('\0', '').strip()
        else:
            VersionEntry['error'] = 'No matching version reply'
        for Selector in (20, 16, 17):
            Packet = BuildInformationPacket(Selector)
            if len(Packet) != 65 or Packet[:6] != bytes([0, 165, 65, 0, 1, Selector]):
                raise ValueError('Invalid information packet')
            Entry = {'selector': hex(Selector), 'tx': Packet.hex()}
            Transcript.append(Entry)
            if Device.write(Packet) != len(Packet):
                raise RuntimeError('Incomplete information query transmission')
            Deadline = Time.monotonic() + 1.5
            Reply = b''
            while Time.monotonic() < Deadline:
                Candidate = bytes(Device.read(64, timeout_ms=100))
                if len(Candidate) >= 6 and Candidate[:2] == b'\xa5A' and (Candidate[4] == Selector):
                    Reply = Candidate
                    Entry['rx'] = Reply.hex()
                    break
                if Candidate:
                    Entry.setdefault('unmatched', []).append(Candidate.hex())
            if not Reply:
                Entry['error'] = 'No matching reply'
                continue
            Payload = Reply[5:]
            if Selector == 20 and len(Payload) >= 11:
                VendorId, ProductId, Width, Height = Struct.unpack('<HHHH', Payload[:8])
                Summary.update(vendor_id=hex(VendorId), product_id=hex(ProductId), width=Width, height=Height, screen_type=Payload[8], supports_winusb=Payload[9] == 1, supports_jpeg=Payload[10] == 1)
            else:
                Summary[f'selector_{Selector:02x}_payload_hex'] = Payload.hex()
    finally:
        Device.close()
        (OutputDirectory / 'Transcript.json').write_text(Json.dumps(Transcript, indent=2), encoding='utf-8')
        (OutputDirectory / 'Summary.json').write_text(Json.dumps(Summary, indent=2), encoding='utf-8')
    print(Json.dumps(Summary, indent=2))
    print(f'Evidence: {OutputDirectory}')
if __name__ == '__main__':
    Main()
