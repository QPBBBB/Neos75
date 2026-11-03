"""Build a native LVGL UI patch for the exact twice-read NEOS75 screen image.

Offline only. Produces the changed flash pages and the corresponding original
pages for recovery. It never opens a USB/HID device or invokes a flash command.
"""
import argparse as ArgumentParsing
import hashlib as Hash
import importlib.util as Importing
import json as Json
import subprocess as Subprocess
import struct as Struct
from pathlib import Path
import capstone as Capstone

RepositoryRoot = Path(__file__).resolve().parents[4]
ScreenDirectory = RepositoryRoot / 'Code/Module/Screen'
Specification = Importing.spec_from_file_location('MarkdownUtilities', Path(__file__).with_name('MarkdownUtilities.py'))
MarkdownUtilities = Importing.module_from_spec(Specification)
Specification.loader.exec_module(MarkdownUtilities)


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
    InformationAddress = int(Profile['InformationHookAddress'], 16)
    InformationOffset = InformationAddress - Base
    InformationInstruction = next(Decoder.disasm(Original[InformationOffset:InformationOffset + 4], InformationAddress))
    if InformationInstruction.mnemonic != 'bl' or int(InformationInstruction.op_str.lstrip('#'), 16) != int(Profile['InformationHookOriginalTarget'], 16):
        raise ValueError('Native information hook does not match the supported firmware')
    PayloadOffset = PayloadAddress - Base
    PayloadOriginal = Original[PayloadOffset:PayloadOffset + PageSize]
    if PayloadOriginal != b'\xff' * PageSize and Hash.sha256(PayloadOriginal).hexdigest() != Profile.get('PayloadPageSha256'):
        raise ValueError('Payload page is neither unused nor the verified inactive former payload')
    PayloadCapacity = Profile.get('PayloadCapacity', PageSize)
    if PayloadCapacity not in (4096, 16384) or Original[PayloadOffset + PageSize:PayloadOffset + PayloadCapacity] != b'\xff' * (PayloadCapacity - PageSize):
        raise ValueError('Application extension must use only the exactly verified blank pages')
    PacketAddress = int(Profile['PacketHookAddress'], 16)
    PacketOffset = PacketAddress - Base
    if Original[PacketOffset:PacketOffset + 4].hex() != Profile['PacketHookExpectedHex']:
        raise ValueError('Packet prologue does not match the supported firmware')
    Configuration = Json.loads(Arguments.Configuration.read_text(encoding='utf-8'))
    if set(Configuration) != {'DefaultMarkdownFile'} or not isinstance(Configuration['DefaultMarkdownFile'], str) or not Configuration['DefaultMarkdownFile'] or '\0' in Configuration['DefaultMarkdownFile']:
        raise ValueError('Configuration requires a DefaultMarkdownFile path relative to the repository or absolute')
    DefaultFile = (RepositoryRoot / Configuration['DefaultMarkdownFile']).resolve()
    DefaultSource = DefaultFile.read_bytes()
    if len(DefaultSource) > 65536:
        raise ValueError('Built-in Markdown source exceeds the 64 KiB limit')
    DefaultCompiler = MarkdownUtilities.MarkdownCompiler(BaseDirectory=DefaultFile.parent)
    DefaultPackage = DefaultCompiler.Compile(DefaultSource.decode('utf-8-sig'))
    if len(DefaultPackage) > PayloadCapacity:
        raise ValueError('Built-in Markdown exceeds the application extension before accounting for code')
    OutputDirectory = Arguments.OutputDirectory.resolve()
    OutputDirectory.mkdir(parents=True, exist_ok=True)
    (OutputDirectory / 'Build.log').write_bytes(b'')
    SymbolsHeader = '\n'.join(f'#define {Name} {Value}u' for Name, Value in Profile['NativeSymbols'].items())
    (OutputDirectory / 'NativeSymbols.h').write_text(SymbolsHeader + '\n', encoding='utf-8')
    DefaultHeader = '_Alignas(4) static const uint8_t ScreenUiDefaultMarkdown[] = {\n'
    DefaultHeader += '\n'.join('    ' + ', '.join(f'0x{Byte:02X}' for Byte in DefaultPackage[Offset:Offset + 16]) + ','
        for Offset in range(0, len(DefaultPackage), 16))
    (OutputDirectory / 'DefaultMarkdown.h').write_text(DefaultHeader + '\n};\n', encoding='utf-8')
    (OutputDirectory / 'DefaultMarkdown.nsmd').write_bytes(DefaultPackage)
    CompilerDirectory = RepositoryRoot / 'Tools/ArmCompiler/Runtime/bin'
    Compiler = CompilerDirectory / 'clang.exe'
    LinkerScript = ScreenDirectory / 'Device/ScreenUiPatch.ld'
    if not Compiler.is_file():
        raise FileNotFoundError('Install the pinned compiler with InstallArmCompiler.py first')
    ElfFile = OutputDirectory / 'ScreenUi.elf'
    PacketAssembly = OutputDirectory / 'PacketHook.s'
    PacketSource = (ScreenDirectory / 'Device/PacketHook.s').read_text(encoding='utf-8')
    PacketSource = PacketSource.replace('#include "NativeSymbols.h"', '').replace('NativePacketContinuation', hex(int(Profile['PacketContinuationAddress'], 16) | 1))
    PacketAssembly.write_text(PacketSource, encoding='utf-8')
    Sources = [ScreenDirectory / 'ScreenUi.c', ScreenDirectory / 'Device/NativeLvgl.c',
        ScreenDirectory / 'Markdown/MarkdownDocument.c',
        ScreenDirectory / 'Device/DeviceScreenUi.c', ScreenDirectory / 'Device/ApplicationHook.s',
        ScreenDirectory / 'Device/ScreenRecovery.s', ScreenDirectory / 'Device/InformationHook.s', PacketAssembly]
    Command = [Compiler, '--target=arm-none-eabi', '-mcpu=cortex-m4', '-mthumb', '-mfloat-abi=soft',
        '-std=c11', '-Os', '-ffreestanding', '-fno-builtin', '-ffunction-sections', '-fdata-sections',
        '-fno-unwind-tables', '-fno-asynchronous-unwind-tables', '-nostdlib', '-Wall', '-Wextra', '-Werror',
        '-DNativeScreenUi', '-I', ScreenDirectory,
        '-I', ScreenDirectory / 'Device', '-I', OutputDirectory, *Sources,
        '-Wl,--gc-sections', f'-Wl,--defsym,HookAddress={HookAddress}',
        f'-Wl,--defsym,InformationAddress={InformationAddress}', f'-Wl,--defsym,PacketAddress={PacketAddress}',
        f'-Wl,--defsym,PayloadAddress={PayloadAddress}', f'-Wl,--defsym,PayloadCapacity={PayloadCapacity}',
        f'-Wl,-T,{LinkerScript}', f'-Wl,-Map,{OutputDirectory / "ScreenUi.map"}', '-o', ElfFile]
    RunCompiler(Command, OutputDirectory)
    for Section, Name in (('.NativeHook', 'Hook.bin'), ('.NativeInformationHook', 'InformationHook.bin'), ('.NativePacketHook', 'PacketHook.bin'), ('.Payload', 'Payload.bin')):
        RunCompiler([CompilerDirectory / 'llvm-objcopy.exe', '--only-section', Section, '-O', 'binary', ElfFile,
            OutputDirectory / Name], OutputDirectory)
    Hook = (OutputDirectory / 'Hook.bin').read_bytes()
    Payload = (OutputDirectory / 'Payload.bin').read_bytes()
    if len(Hook) != 4 or not 0 < len(Payload) <= PayloadCapacity:
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
    Struct.pack_into('<I', VectorPage, 4, Symbols['InitializeScreenRecovery'] | 1)
    for VectorOffset in (12, 16, 20, 24):
        Struct.pack_into('<I', VectorPage, VectorOffset, Symbols['RecoverScreenFault'] | 1)
    Struct.pack_into('<I', VectorPage, 60, Symbols['GuardScreenSysTick'] | 1)
    InformationPageAddress = InformationAddress & ~(PageSize - 1)
    InformationPageOffset = InformationPageAddress - Base
    InformationOriginal = Original[InformationPageOffset:InformationPageOffset + PageSize]
    InformationPage = bytearray(InformationOriginal)
    InformationWithinPage = InformationAddress - InformationPageAddress
    InformationHook = (OutputDirectory / 'InformationHook.bin').read_bytes()
    if len(InformationHook) != 4:
        raise ValueError('Information hook must be exactly one BL instruction')
    InformationPage[InformationWithinPage:InformationWithinPage + 4] = InformationHook
    LengthGateAddress = int(Profile['InformationLengthGateAddress'], 16)
    LengthGateOffset = LengthGateAddress - Base
    if Original[LengthGateOffset:LengthGateOffset + 2].hex() != Profile['InformationLengthGateExpectedHex']:
        raise ValueError('Original one-byte information length gate does not match')
    if LengthGateAddress // PageSize != InformationAddress // PageSize:
        raise ValueError('Information length gate must remain in the verified information page')
    # BNE -> BLO after CMP length,#1. The packet hook separately bounds length
    # to 1..59 before the preserved checksum/parser path is entered.
    InformationPage[LengthGateAddress - InformationPageAddress:LengthGateAddress - InformationPageAddress + 2] = bytes.fromhex('0dd3')
    PacketPatch = (OutputDirectory / 'PacketHook.bin').read_bytes()
    if len(PacketPatch) != 4 or PacketAddress // PageSize != InformationAddress // PageSize:
        raise ValueError('Packet and information hooks must fit the same verified page')
    PacketWithinPage = PacketAddress - InformationPageAddress
    InformationPage[PacketWithinPage:PacketWithinPage + 4] = PacketPatch
    PayloadPadded = Payload + b'\xff' * (PayloadCapacity - len(Payload))
    Pages = [('Payload' + (f'{Index // PageSize:02}' if Index else ''), PayloadAddress + Index,
        PayloadPadded[Index:Index + PageSize], Original[PayloadOffset + Index:PayloadOffset + Index + PageSize])
        for Index in range(0, PayloadCapacity, PageSize)]
    Pages.extend([
        ('Vector', Base, bytes(VectorPage), Original[:PageSize]),
        ('Information', InformationPageAddress, bytes(InformationPage), InformationOriginal),
        ('Hook', HookPageAddress, bytes(HookPage), OriginalHook),
    ])
    Plan = {'Device': Profile['Device'], 'BaseBackup': str(BackupFile.resolve()),
        'BaseSha256': Profile['ApplicationSha256'], 'FirmwareWritten': False,
        'HardwareDisplayVerified': False, 'Configuration': Configuration,
        'DefaultMarkdown': {'SourceFile': str(DefaultFile), 'SourceBytes': len(DefaultSource),
            'SourceSha256': Hash.sha256(DefaultSource).hexdigest(), 'PackageBytes': len(DefaultPackage),
            'PackageSha256': Hash.sha256(DefaultPackage).hexdigest(),
            'Rows': len(DefaultCompiler.Rows), 'Glyphs': len(DefaultCompiler.Glyphs)},
        'UiVersion': 6, 'TitleLabelCreated': False,
        'PayloadLength': len(Payload), 'HookAddress': hex(HookAddress),
        'StatusSelector': '0x7F',
        'CustomPagesOnly': True,
        'PreservedConfigurationAddress': Profile['PreservedConfigurationAddress'],
        'RecoverySymbols': {Name: hex(Symbols[Name]) for Name in ('InitializeScreenRecovery', 'GuardScreenSysTick', 'RecoverScreenFault')},
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
