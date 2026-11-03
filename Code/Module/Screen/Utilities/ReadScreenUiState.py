"""Read device-side UI state using the custom read-only A5 41 / 7F query."""
import argparse as ArgumentParsing
import json as Json
import struct as Struct
import time as Time
from datetime import datetime as DateTime, timezone as TimeZone
from pathlib import Path
import hid as Hid

RepositoryRoot = Path(__file__).resolve().parents[4]


def ReadState(Device, Transcript):
    Body = bytes([0x41, 0, 1, 0x7F])
    Packet = bytes([0, 0xA5]) + Body + bytes([(sum(Body) ^ 255) & 255]) + bytes(58)
    Entry = {'Tx': Packet.hex()}
    Transcript.append(Entry)
    if Device.write(Packet) != 65:
        raise RuntimeError('Incomplete UI status read query')
    Deadline = Time.monotonic() + 1.5
    while Time.monotonic() < Deadline:
        Reply = bytes(Device.read(64, timeout_ms=100))
        if len(Reply) < 38 or Reply[:2] != b'\xA5\x41' or Reply[4] != 0x7F:
            if Reply:
                Entry.setdefault('Unmatched', []).append(Reply.hex())
            continue
        Entry['Rx'] = Reply.hex()
        Length = int.from_bytes(Reply[2:4], 'big')
        if Length != 33 or ((sum(Reply[1:4 + Length]) ^ 255) & 255) != Reply[4 + Length]:
            raise RuntimeError('Invalid UI status length or checksum')
        Magic, Version, Flags, Reserved, Seconds, Updates, Activations, UiScreen, ActiveScreen, Countdown = Struct.unpack('<4sBBH6I', Reply[5:37])
        if Magic != b'NSUI' or Version not in (2, 3, 4):
            raise RuntimeError('Unexpected UI status protocol identity')
        return {'Version': Version, 'StateFound': bool(Flags & 1), 'UiCreated': bool(Flags & 2),
            'UiActive': bool(Flags & 4), 'ShowUptime': bool(Flags & 8),
            'CustomPagesOnly': bool(Flags & 16), 'LegacyPacketFilterActive': bool(Flags & 32),
            'LegacyRootsAbsent': bool(Flags & 64),
            'LegacyPageRootCount': Reserved & 255 if Version >= 3 else None,
            'IgnoredLegacyPacketsModulo256': Reserved >> 8 if Version >= 3 else None,
            'ElapsedSeconds': Seconds, 'UpdateCount': Updates, 'ActivationCount': Activations,
            'UiScreenAddress': hex(UiScreen), 'ActiveScreenAddress': hex(ActiveScreen),
            'RecoveryCountdown': Countdown}
    raise RuntimeError('No UI status reply; original/v01 firmware does not implement this read query')


def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Parser.add_argument('--Samples', type=int, default=3)
    Parser.add_argument('--IntervalSeconds', type=float, default=1.2)
    Parser.add_argument('--OutputDirectory', type=Path)
    Arguments = Parser.parse_args()
    if not 1 <= Arguments.Samples <= 10 or not 0.1 <= Arguments.IntervalSeconds <= 5:
        raise ValueError('Samples must be 1..10 and IntervalSeconds must be 0.1..5')
    OutputDirectory = Arguments.OutputDirectory or RepositoryRoot / 'Research/Screen' / DateTime.now(TimeZone.utc).strftime('UiState%Y%m%dT%H%M%SZ')
    OutputDirectory.mkdir(parents=True, exist_ok=False)
    Devices = [Device for Device in Hid.enumerate(0x5542, 1) if Device['usage_page'] == 0xFF60 and Device['usage'] == 0x61]
    if len(Devices) != 1:
        raise RuntimeError(f'Expected exactly one NEOS75 screen; found {len(Devices)}')
    Device = Hid.device()
    Transcript, Samples, Summary = [], [], {}
    try:
        Device.open_path(Devices[0]['path'])
        for Index in range(Arguments.Samples):
            Samples.append(ReadState(Device, Transcript))
            if Index + 1 < Arguments.Samples:
                Time.sleep(Arguments.IntervalSeconds)
        Summary = {'Samples': Samples,
            'UiCreatedAndActive': all(Sample['UiCreated'] and Sample['UiActive'] for Sample in Samples),
            'DeviceTimerAdvancing': len(Samples) > 1 and Samples[-1]['UpdateCount'] > Samples[0]['UpdateCount'],
            'PhysicalDisplayVerified': False}
    finally:
        Device.close()
        (OutputDirectory / 'Transcript.json').write_text(Json.dumps(Transcript, indent=2) + '\n', encoding='utf-8')
        (OutputDirectory / 'Summary.json').write_text(Json.dumps(Summary, indent=2) + '\n', encoding='utf-8')
    print(Json.dumps(Summary, indent=2))
    print(f'Evidence: {OutputDirectory}')


if __name__ == '__main__':
    Main()
