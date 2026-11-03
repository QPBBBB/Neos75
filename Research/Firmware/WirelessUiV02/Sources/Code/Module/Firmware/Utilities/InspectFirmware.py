"""Inspect downloaded firmware headers, strings, SHA256 hashes and DFU checksums offline."""
import argparse as ArgumentParsing
import binascii as Binascii
import hashlib as Hashlib
import json as Json
import math as Math
import re as RegularExpressions
import struct as Struct
from collections import Counter
from pathlib import Path

RepositoryRoot = Path(__file__).resolve().parents[4]


def InspectBinary(FirmwarePath):
    Data = FirmwarePath.read_bytes()
    if len(Data) < 16:
        raise ValueError('Firmware file is shorter than a DFU suffix: ' + str(FirmwarePath))
    Counts = Counter(Data)
    Entropy = -sum(Count / len(Data) * Math.log2(Count / len(Data)) for Count in Counts.values())
    Strings = [{'offset': hex(Match.start()), 'text': Match.group().decode('ascii')}
               for Match in RegularExpressions.finditer(rb'[\x20-\x7e]{8,}', Data)]
    Interesting = [Record for Record in Strings if RegularExpressions.search(
        r'QMK|VIAL|Venus|Neos|AULA|ARM|Cortex|STM|AT32|UB32|ZB48|FreeRTOS|LVGL|LV_|\.c\b|\.h\b|GCC|Chibi|build|[A-Z]:\\',
        Record['text'], RegularExpressions.I)]
    Vectors = []
    for Offset in (0, 0x100, 0x1000, 0x2000, 0x4000, 0x4400, 0x6000, 0x8000):
        if Offset + 16 <= len(Data):
            Words = Struct.unpack('<4I', Data[Offset:Offset + 16])
            Vectors.append({'offset': hex(Offset), 'words': [hex(Word) for Word in Words]})
    Suffix = Data[-16:]
    StoredCrc = Struct.unpack('<I', Suffix[12:])[0]
    CalculatedCrc = (Binascii.crc32(Data[:-4]) ^ 0xFFFFFFFF) & 0xFFFFFFFF
    if Suffix[8:12] != b'UFD\x10' or StoredCrc != CalculatedCrc:
        raise ValueError('Invalid DFU suffix or CRC: ' + str(FirmwarePath))
    Record = {
        'file': FirmwarePath.name, 'bytes': len(Data), 'sha256': Hashlib.sha256(Data).hexdigest(),
        'entropy_bits_per_byte': Entropy, 'first_64_hex': Data[:64].hex(), 'last_64_hex': Data[-64:].hex(),
        'candidate_vectors': Vectors, 'interesting_ascii_strings': Interesting,
        'dfu_suffix': {
            'vid': hex(Struct.unpack('<H', Suffix[4:6])[0]), 'pid': hex(Struct.unpack('<H', Suffix[2:4])[0]),
            'signature': Suffix[8:11].decode('ascii'), 'crc_stored': hex(StoredCrc),
            'crc_calculated': hex(CalculatedCrc), 'crc_valid': True,
        },
    }
    return Record, Strings


def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Parser.add_argument('--InputDirectory', type=Path, default=RepositoryRoot / 'Research/Firmware')
    Parser.add_argument('--OutputDirectory', type=Path, default=RepositoryRoot / 'Research/Firmware')
    Arguments = Parser.parse_args()
    FirmwarePaths = sorted(Arguments.InputDirectory.glob('*.bin'))
    if not FirmwarePaths:
        raise FileNotFoundError('No firmware binaries found in ' + str(Arguments.InputDirectory))
    Arguments.OutputDirectory.mkdir(parents=True, exist_ok=True)
    Results = []
    for FirmwarePath in FirmwarePaths:
        Record, Strings = InspectBinary(FirmwarePath)
        Results.append(Record)
        (Arguments.OutputDirectory / (FirmwarePath.stem + 'Strings.json')).write_text(
            Json.dumps(Strings, ensure_ascii=False, indent=2), encoding='utf-8')
        print(FirmwarePath.name + ': DFU CRC valid; SHA256 ' + Record['sha256'])
    (Arguments.OutputDirectory / 'Inspection.json').write_text(
        Json.dumps(Results, ensure_ascii=False, indent=2), encoding='utf-8')


if __name__ == '__main__':
    Main()
