"""Extract the original NEOS75 LVGL UI resource container offline."""
import argparse as ArgumentParsing
import json as Json
import struct as Struct
from pathlib import Path

RepositoryRoot = Path(__file__).resolve().parents[4]
ResourceNames = {
    '/mergeFontHeaderBinFile.bin': 'MergedFontHeaders.bin',
    '/mergeImgHeaderBinFile.bin': 'MergedImageHeaders.bin',
    '/mergeJpgHeaderBinFile.bin': 'MergedJpegHeaders.bin',
    '/signature.bin': 'Signature.bin',
}


def ReadResourceEntries(Data):
    if len(Data) < 0x174 or not Data.startswith(b'LVGL ALL BIN VER NEOS '):
        raise ValueError('Unexpected or truncated UI container')
    Count = Struct.unpack_from('<I', Data, 0x40)[0]
    if Count != 4:
        raise ValueError('Unexpected resource count: ' + str(Count))
    Entries = []
    for Index in range(Count):
        RecordOffset = 0x44 + 76 * Index
        RelativeOffset, Base, Size = Struct.unpack_from('<III', Data, RecordOffset)
        Name = Data[RecordOffset + 12:RecordOffset + 76].split(b'\0', 1)[0].decode('ascii')
        if Name not in ResourceNames:
            raise ValueError('Unknown resource name: ' + Name)
        Start = RelativeOffset + Base
        IsDfuSuffix = Name == '/signature.bin' and Start == len(Data) - 16 and Size == 16
        if Start < 0x174 or Start + Size > (len(Data) if IsDfuSuffix else len(Data) - 16):
            raise ValueError('Resource bounds invalid: ' + Name)
        Entries.append({'index': Index, 'name': Name, 'file_offset': hex(Start),
                        'relative_offset': hex(RelativeOffset), 'base': hex(Base), 'bytes': Size})
    OrderedEntries = sorted(Entries, key=lambda Entry: int(Entry['file_offset'], 16))
    for Left, Right in zip(OrderedEntries, OrderedEntries[1:]):
        if int(Left['file_offset'], 16) + Left['bytes'] > int(Right['file_offset'], 16):
            raise ValueError('Overlapping resource sections')
    return Entries


def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Parser.add_argument('--InputFile', type=Path, default=RepositoryRoot / 'Research/Firmware/Neos75ScreenUiV20Build20260615.bin')
    Parser.add_argument('--OutputDirectory', type=Path, default=RepositoryRoot / 'Research/UiResources')
    Arguments = Parser.parse_args()
    Data = Arguments.InputFile.read_bytes()
    Entries = ReadResourceEntries(Data)
    Arguments.OutputDirectory.mkdir(parents=True, exist_ok=True)
    for Entry in Entries:
        Start = int(Entry['file_offset'], 16)
        (Arguments.OutputDirectory / ResourceNames[Entry['name']]).write_bytes(Data[Start:Start + Entry['bytes']])
    (Arguments.OutputDirectory / 'Manifest.json').write_text(Json.dumps(Entries, indent=2), encoding='utf-8')
    print('Extracted ' + str(len(Entries)) + ' resource sections into ' + str(Arguments.OutputDirectory))


if __name__ == '__main__':
    Main()
