"""Install the pinned portable Arm LLVM compiler subset used by screen builds."""
import hashlib as Hash
import json as Json
import tempfile as TemporaryFiles
import urllib.request as Request
import zipfile as Zip
from pathlib import Path

RepositoryRoot = Path(__file__).resolve().parents[4]


def Main():
    ToolDirectory = RepositoryRoot / 'Tools/ArmCompiler'
    Source = Json.loads((ToolDirectory / 'Source.json').read_text(encoding='utf-8'))
    Runtime = ToolDirectory / 'Runtime'
    SelectedFiles = {'bin/clang.exe', 'bin/ld.lld.exe', 'bin/llvm-objcopy.exe',
        'bin/llvm-objdump.exe', 'bin/llvm-nm.exe'}
    Url = Source['DownloadUrl']
    with TemporaryFiles.TemporaryDirectory(prefix='Neos75ArmCompiler') as TemporaryDirectory:
        ArchivePath = Path(TemporaryDirectory) / 'ArmCompiler.zip'
        Digest, Total, LastProgress = Hash.sha256(), 0, 0
        with Request.urlopen(Url, timeout=60) as Reply, ArchivePath.open('wb') as Output:
            while True:
                Block = Reply.read(4 * 1024 * 1024)
                if not Block:
                    break
                Digest.update(Block)
                Output.write(Block)
                Total += len(Block)
                if Total - LastProgress >= 64 * 1024 * 1024:
                    print(f'Downloaded {Total // 1024 // 1024} MiB', flush=True)
                    LastProgress = Total
        if Digest.hexdigest() != Source['Sha256']:
            raise ValueError('Compiler archive fingerprint mismatch')
        with Zip.ZipFile(ArchivePath) as Archive:
            for Member in Archive.infolist():
                Relative = Member.filename.partition('/')[2]
                if Member.is_dir() or not (Relative in SelectedFiles or
                    Relative.startswith('lib/clang/19/include/') or
                    Relative in ('LICENSE.txt', 'THIRD-PARTY-LICENSES.txt')):
                    continue
                Target = (Runtime / Relative).resolve()
                if Runtime.resolve() not in Target.parents:
                    raise ValueError('Archive member escapes compiler runtime')
                Target.parent.mkdir(parents=True, exist_ok=True)
                Target.write_bytes(Archive.read(Member))
    print(f'Installed pinned Arm LLVM {Source["Version"]}: {Runtime}')


if __name__ == '__main__':
    Main()
