"""Compile the real LVGL UI and its editable Windows preview with installed MSVC."""
import argparse as ArgumentParsing
import json as Json
import os as OperatingSystem
import subprocess as Processes
import tempfile as TemporaryFiles
from pathlib import Path

RepositoryRoot = Path(__file__).resolve().parents[4]


def FindVisualStudioEnvironment():
    Locator = Path(OperatingSystem.environ.get('ProgramFiles(x86)', r'C:\Program Files (x86)')) / 'Microsoft Visual Studio/Installer/vswhere.exe'
    if not Locator.is_file():
        raise FileNotFoundError('Visual Studio vswhere.exe not found')
    Result = Processes.run([str(Locator), '-latest', '-products', '*', '-requires', 'Microsoft.VisualStudio.Component.VC.Tools.x86.x64', '-property', 'installationPath'],
                           check=True, capture_output=True, text=True)
    Installation = Path(Result.stdout.strip())
    Environment = Installation / 'VC/Auxiliary/Build/vcvars64.bat'
    if not Environment.is_file():
        raise FileNotFoundError('MSVC environment setup not found')
    return Environment


def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Parser.add_argument('--OutputDirectory', type=Path, default=RepositoryRoot / 'Code/Module/Screen/Runtime')
    Arguments = Parser.parse_args()
    OutputDirectory = Arguments.OutputDirectory.resolve()
    OutputDirectory.mkdir(parents=True, exist_ok=True)
    LvglDirectory = RepositoryRoot / 'Tools/Lvgl'
    SourceDirectory = RepositoryRoot / 'Code/Module/Screen'
    SourceFiles = sorted((LvglDirectory / 'src').rglob('*.c'))
    if not SourceFiles:
        raise FileNotFoundError('Bundled LVGL source not found')
    SourceFiles.extend([SourceDirectory / 'ScreenUi.c', SourceDirectory / 'Preview/ScreenUiPreview.c'])
    Options = ['/nologo', '/TC', '/std:c11', '/O2', '/W2', '/utf-8', '/wd5287', '/D_CRT_SECURE_NO_WARNINGS',
               '/DLV_CONF_INCLUDE_SIMPLE', '/DLV_CONF_PATH=LvConf.h',
               '/I"' + str(LvglDirectory) + '"', '/I"' + str(SourceDirectory / 'Preview') + '"',
               '/Fe"' + str(OutputDirectory / 'ScreenUiPreview.exe') + '"']
    Options.extend('"' + str(SourceFile) + '"' for SourceFile in SourceFiles)
    Environment = FindVisualStudioEnvironment()
    with TemporaryFiles.TemporaryDirectory(prefix='Neos75Build') as TemporaryDirectory:
        ResponseFile = Path(TemporaryDirectory) / 'Compile.rsp'
        ResponseFile.write_text('\n'.join(Options), encoding='utf-8')
        CommandFile = Path(TemporaryDirectory) / 'Compile.cmd'
        CommandFile.write_text('@echo off\nchcp 65001 >nul\ncall "' + str(Environment) + '" >nul\nif errorlevel 1 exit /b %errorlevel%\ncl @"' + str(ResponseFile) + '" /link /SUBSYSTEM:WINDOWS user32.lib gdi32.lib\nexit /b %errorlevel%\n', encoding='utf-8')
        Result = Processes.run([OperatingSystem.environ.get('COMSPEC', 'cmd.exe'), '/d', '/c', str(CommandFile)], cwd=str(OutputDirectory), capture_output=True, text=True, encoding='utf-8', errors='replace')
        (OutputDirectory / 'Build.log').write_text(Result.stdout + Result.stderr, encoding='utf-8')
        if Result.returncode:
            print((Result.stdout + Result.stderr)[-12000:])
            raise RuntimeError('MSVC compilation failed with exit code ' + str(Result.returncode))
    (OutputDirectory / 'Build.json').write_text(Json.dumps({'LvglVersion': '8.3.11', 'Target': 'WindowsPreview',
        'FirmwareFlashed': False, 'SourcesCompiled': len(SourceFiles)}, indent=2), encoding='utf-8')
    print(OutputDirectory / 'ScreenUiPreview.exe')


if __name__ == '__main__':
    Main()
