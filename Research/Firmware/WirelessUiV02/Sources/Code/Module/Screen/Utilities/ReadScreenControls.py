"""Observe bounded, read-only screen-controller packet snapshots (A5 41 / 7D).

Records only the keyboard-to-screen legacy control channel, not Markdown data.
"""
import argparse as ArgumentParsing
import importlib.util as ImportUtilities
import json as Json
import time as Time
from datetime import datetime as DateTime, timezone as TimeZone
from pathlib import Path
import hid as Hid

RepositoryRoot = Path(__file__).resolve().parents[4]
Specification = ImportUtilities.spec_from_file_location('ScreenDocumentTransport', Path(__file__).with_name('WriteMarkdown.py'))
Transport = ImportUtilities.module_from_spec(Specification)
Specification.loader.exec_module(Transport)


def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Parser.add_argument('--Seconds', type=float, default=5)
    Parser.add_argument('--OutputDirectory', type=Path)
    Arguments = Parser.parse_args()
    if not 0 < Arguments.Seconds <= 120:
        raise ValueError('Observation duration must be within 0..120 seconds')
    Output = Arguments.OutputDirectory or RepositoryRoot / 'Research/Screen' / DateTime.now(TimeZone.utc).strftime('Controls%Y%m%dT%H%M%SZ')
    Output.mkdir(parents=True, exist_ok=False)
    Candidates = [Item for Item in Hid.enumerate(0x5542, 1) if Item['usage_page'] == 0xFF60 and Item['usage'] == 0x61]
    if len(Candidates) != 1:
        raise RuntimeError('Expected one screen HID interface')
    Device = Hid.device()
    Seen, Count = set(), 0
    try:
        Device.open_path(Candidates[0]['path'])
        Deadline = Time.monotonic() + Arguments.Seconds
        with (Output / 'Packets.jsonl').open('w', encoding='utf-8') as Log:
            while Time.monotonic() < Deadline:
                Latest = Transport.Exchange(Device, b'\x7D\x00')
                if len(Latest) != 24:
                    raise RuntimeError('Unexpected control snapshot format')
                Total = int.from_bytes(Latest[:4], 'little')
                for Index in range(min(Total, 8)):
                    Reply = Latest if Index == 0 else Transport.Exchange(Device, bytes([0x7D, Index]))
                    Serial = (int.from_bytes(Reply[:4], 'little') - Index - 1) & 0xFFFFFFFF
                    if Serial in Seen:
                        continue
                    Seen.add(Serial)
                    Packet = Reply[8:8 + min(16, Reply[4])]
                    Entry = {'Utc': DateTime.now(TimeZone.utc).isoformat(), 'Serial': Serial, 'Packet': Packet.hex()}
                    Log.write(Json.dumps(Entry) + '\n')
                    Log.flush()
                    Count += 1
                    print(Json.dumps(Entry), flush=True)
                Time.sleep(0.15)
    finally:
        Device.close()
    print('Captured ' + str(Count) + ' control packets: ' + str(Output))


if __name__ == '__main__':
    Main()
