"""Build a native LVGL UI patch for the exact twice-read NEOS75 screen image.

Offline only. Produces two changed flash pages and the corresponding original
pages for recovery. It never opens a USB/HID device or invokes a flash command.
"""
import argparse as ArgumentParsing
import hashlib as Hash
import json as Json
import subprocess as Subprocess
import struct as Struct
from pathlib import Path
import capstone as Capstone

RepositoryRoot = Path(__file__).resolve().parents[4]
ScreenDirectory = RepositoryRoot / 'Code/Module/Screen'


def RunCompiler(Arguments, OutputDirectory):
    Result = Subprocess.run([str(Argument) for Argument in Arguments], capture_output=True)
    with (OutputDirectory / 'Build.log').open('ab') as Log:
        Log.write(Result.stdout + Result.stderr)
    if Result.returncode:
        raise RuntimeError((Result.stdout + Result.stderr).decode('utf-8', errors='replace'))


def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Parser.add_argument('--BackupFile', type=Path)
    Parser.add_argument('--Configuration', type=Path, default=ScreenDirectory / 'Device/ScreenUiConfiguration.json')
    Parser.add_argument('--OutputDirectory', type=Path, default=ScreenDirectory / 'Runtime/Device')
    Arguments = Parser.parse_args()
    Profile = Json.loads((ScreenDirectory / 'Device/NativeProfile.json').read_text(encoding='utf-8'))
    BackupFile = Arguments.BackupFile or RepositoryRoot / Profile['Evidence']
    Original = BackupFile.read_bytes()
    if len(Original) != Profile['ApplicationLength'] or Hash.sha256(Original).hexdigest() != Profile['ApplicationSha256']:
        raise ValueError('Backup does not match the exact supported native firmware; refusing to guess addresses')
    Bootloader = (RepositoryRoot / Profile['BootloaderEvidence']).read_bytes()
    if Hash.sha256(Bootloader).hexdigest() != Profile['BootloaderSha256']:
        raise ValueError('Recovery bootloader fingerprint mismatch')
    Base = int(Profile['ApplicationAddress'], 16)
    HookAddress = int(Profile['HookAddress'], 16)
    PayloadAddress = int(Profile['PayloadAddress'], 16)
    PageSize = Profile['PageSize']
    HookOffset = HookAddress - Base
    Decoder = Capstone.Cs(Capstone.CS_ARCH_ARM, Capstone.CS_MODE_THUMB | Capstone.CS_MODE_MCLASS)
    Instruction = next(Decoder.disasm(Original[HookOffset:HookOffset + 4], HookAddress))
    if Instruction.mnemonic != 'bl' or int(Instruction.op_str.lstrip('#'), 16) != int(Profile['HookOriginalTarget'], 16):
        raise ValueError('Native hook instruction does not call the verified UI initialization')
    PayloadOffset = PayloadAddress - Base
    if Original[PayloadOffset:PayloadOffset + PageSize] != b'\xff' * PageSize:
        raise ValueError('Payload page is not unused in the original backup')
    Configuration = Json.loads(Arguments.Configuration.read_text(encoding='utf-8'))
    if set(Configuration) != {'Title', 'Message', 'Status', 'ShowUptime'} or type(Configuration['ShowUptime']) is not bool:
        raise ValueError('Configuration requires Title, Message, Status and boolean ShowUptime')
    for Name in ('Title', 'Message', 'Status'):
        Value = Configuration[Name]
        if not isinstance(Value, str) or '\0' in Value or len(Value.encode('utf-8')) > 256:
            raise ValueError(f'{Name} must be text without NUL, at most 256 UTF-8 bytes')
    OutputDirectory = Arguments.OutputDirectory.resolve()
    OutputDirectory.mkdir(parents=True, exist_ok=True)
    (OutputDirectory / 'Build.log').write_bytes(b'')
    SymbolsHeader = '\n'.join(f'#define {Name} {Value}u' for Name, Value in Profile['NativeSymbols'].items())
    (OutputDirectory / 'NativeSymbols.h').write_text(SymbolsHeader + '\n', encoding='utf-8')
    ConfigurationHeader = '\n'.join(f'static const char ScreenUi{Name}[] = {Json.dumps(Configuration[Name], ensure_ascii=False)};' for Name in ('Title', 'Message', 'Status'))
    ConfigurationHeader += f'\n#define ScreenUiShowUptime {int(Configuration["ShowUptime"])}\n'
    (OutputDirectory / 'ScreenUiConfiguration.h').write_text(ConfigurationHeader, encoding='utf-8')
    CompilerDirectory = RepositoryRoot / 'Tools/ArmCompiler/Runtime/bin'
    Compiler = CompilerDirectory / 'clang.exe'
    LinkerScript = ScreenDirectory / 'Device/ScreenUiPatch.ld'
    if not Compiler.is_file():
        raise FileNotFoundError('Install the pinned compiler with InstallArmCompiler.py first')
    ElfFile = OutputDirectory / 'ScreenUi.elf'
    Sources = [ScreenDirectory / 'ScreenUi.c', ScreenDirectory / 'Device/NativeLvgl.c',
        ScreenDirectory / 'Device/DeviceScreenUi.c', ScreenDirectory / 'Device/ApplicationHook.s',
        ScreenDirectory / 'Device/ScreenRecovery.s']
    Command = [Compiler, '--target=arm-none-eabi', '-mcpu=cortex-m4', '-mthumb', '-mfloat-abi=soft',
        '-std=c11', '-Os', '-ffreestanding', '-fno-builtin', '-ffunction-sections', '-fdata-sections',
        '-fno-unwind-tables', '-fno-asynchronous-unwind-tables', '-nostdlib', '-Wall', '-Wextra', '-Werror',
        '-DNativeScreenUi', '-I', ScreenDirectory,
        '-I', ScreenDirectory / 'Device', '-I', OutputDirectory, *Sources,
        '-Wl,--gc-sections', f'-Wl,-T,{LinkerScript}', f'-Wl,-Map,{OutputDirectory / "ScreenUi.map"}', '-o', ElfFile]
    RunCompiler(Command, OutputDirectory)
    for Section, Name in (('.NativeHook', 'Hook.bin'), ('.Payload', 'Payload.bin')):
        RunCompiler([CompilerDirectory / 'llvm-objcopy.exe', '--only-section', Section, '-O', 'binary', ElfFile,
            OutputDirectory / Name], OutputDirectory)
    Hook = (OutputDirectory / 'Hook.bin').read_bytes()
    Payload = (OutputDirectory / 'Payload.bin').read_bytes()
    if len(Hook) != 4 or not 0 < len(Payload) <= PageSize:
        raise ValueError('Compiled patch section size is invalid')
    HookPageAddress = HookAddress & ~(PageSize - 1)
    HookPageOffset = HookPageAddress - Base
    OriginalHook = Original[HookPageOffset:HookPageOffset + PageSize]
    HookPage = bytearray(OriginalHook)
    WithinPage = HookAddress - HookPageAddress
    HookPage[WithinPage:WithinPage + 4] = Hook
    SymbolOutput = Subprocess.run([str(CompilerDirectory / 'llvm-nm.exe'), str(ElfFile)], capture_output=True, check=True).stdout.decode('ascii')
    Symbols = {Parts[2]: int(Parts[0], 16) for Line in SymbolOutput.splitlines() if len(Parts := Line.split()) == 3}
    VectorPage = bytearray(Original[:PageSize])
    for VectorOffset in (12, 16, 20, 24):
        Struct.pack_into('<I', VectorPage, VectorOffset, Symbols['RecoverScreenFault'] | 1)
    Struct.pack_into('<I', VectorPage, 60, Symbols['GuardScreenSysTick'] | 1)
    Pages = [
        ('Payload', PayloadAddress, Payload + b'\xff' * (PageSize - len(Payload)), Original[PayloadOffset:PayloadOffset + PageSize]),
        ('Vector', Base, bytes(VectorPage), Original[:PageSize]),
        ('Hook', HookPageAddress, bytes(HookPage), OriginalHook),
    ]
    Plan = {'Device': Profile['Device'], 'BaseBackup': str(BackupFile.resolve()),
        'BaseSha256': Profile['ApplicationSha256'], 'FirmwareWritten': False,
        'HardwareDisplayVerified': False, 'Configuration': Configuration,
        'PayloadLength': len(Payload), 'HookAddress': hex(HookAddress),
        'RecoverySymbols': {Name: hex(Symbols[Name]) for Name in ('GuardScreenSysTick', 'RecoverScreenFault')},
        'Pages': []}
    Patched = bytearray(Original)
    for Name, Address, Modified, Restore in Pages:
        ModifiedName, RestoreName = f'{Name}Page.bin', f'Restore{Name}Page.bin'
        (OutputDirectory / ModifiedName).write_bytes(Modified)
        (OutputDirectory / RestoreName).write_bytes(Restore)
        Patched[Address - Base:Address - Base + PageSize] = Modified
        Plan['Pages'].append({'Name': Name, 'Address': hex(Address), 'Length': PageSize,
            'File': ModifiedName, 'Sha256': Hash.sha256(Modified).hexdigest(),
            'RestoreFile': RestoreName, 'RestoreSha256': Hash.sha256(Restore).hexdigest()})
    Plan['PatchedApplicationSha256'] = Hash.sha256(Patched).hexdigest()
    (OutputDirectory / 'ScreenUiPatchPlan.json').write_text(Json.dumps(Plan, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    Disassembly = Subprocess.run([str(CompilerDirectory / 'llvm-objdump.exe'), '-d', str(ElfFile)], capture_output=True, check=True)
    (OutputDirectory / 'ScreenUiDisassembly.txt').write_bytes(Disassembly.stdout)
    print(Json.dumps(Plan, ensure_ascii=False, indent=2))
    print(f'Offline build: {OutputDirectory}')


if __name__ == '__main__':
    Main()
