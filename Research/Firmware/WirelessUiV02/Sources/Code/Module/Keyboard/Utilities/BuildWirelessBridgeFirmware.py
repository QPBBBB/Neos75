"""Build a bounded radio-to-screen bridge for the twice-read live main firmware.

Offline only; produces three application pages and exact recovery originals.
No vector/startup/scan/scheduler/configuration bytes are changed.
"""
import argparse as ArgumentParsing
import hashlib as Hash
import json as Json
import subprocess as Subprocess
from pathlib import Path
import capstone as Capstone

RepositoryRoot = Path(__file__).resolve().parents[4]
ModuleDirectory = RepositoryRoot / 'Code/Module/Keyboard'


def Run(Arguments, OutputDirectory):
    Result = Subprocess.run([str(Item) for Item in Arguments], capture_output=True)
    with (OutputDirectory / 'Build.log').open('ab') as Log:
        Log.write(Result.stdout + Result.stderr)
    if Result.returncode:
        raise RuntimeError((Result.stdout + Result.stderr).decode('utf-8', errors='replace'))
    return Result.stdout


def Main():
    Parser = ArgumentParsing.ArgumentParser(description=__doc__)
    Parser.add_argument('--OutputDirectory', type=Path, default=ModuleDirectory / 'Runtime/WirelessBridge')
    Arguments = Parser.parse_args()
    Profile = Json.loads((ModuleDirectory / 'Wireless/BridgeProfile.json').read_text())
    Backup = RepositoryRoot / Profile['Evidence']
    Original = Backup.read_bytes()
    if len(Original) != Profile['ApplicationLength'] or Hash.sha256(Original).hexdigest() != Profile['ApplicationSha256']:
        raise ValueError('Main backup does not match the exact twice-read firmware')
    Base = int(Profile['ApplicationAddress'], 16)
    PageSize = Profile['PageSize']
    PayloadAddress = int(Profile['PayloadAddress'], 16)
    PayloadOffset = PayloadAddress - Base
    if PageSize != 2048 or Profile['PayloadCapacity'] != PageSize or Original[PayloadOffset:PayloadOffset + PageSize] != b'\xFF' * PageSize:
        raise ValueError('Main payload must occupy only the single verified blank 2 KiB page')
    for Name in ('Unknown', 'Packet'):
        Address = int(Profile[Name + 'HookAddress'], 16)
        if Original[Address - Base:Address - Base + 4].hex() != Profile[Name + 'HookExpectedHex']:
            raise ValueError('Native ' + Name + ' hook fingerprint mismatch')
    Output = Arguments.OutputDirectory.resolve()
    Output.mkdir(parents=True, exist_ok=True)
    (Output / 'Build.log').write_bytes(b'')
    Header = '\n'.join('#define ' + Name + ' ' + Value + 'u' for Name, Value in Profile['NativeSymbols'].items())
    (Output / 'NativeBridgeSymbols.h').write_text(Header + '\n', encoding='utf-8')
    Assembly = (ModuleDirectory / 'Wireless/BridgeHooks.s').read_text()
    Assembly = Assembly.replace('NativePacketContinuation', hex(int(Profile['PacketContinuation'], 16) | 1))
    (Output / 'BridgeHooks.s').write_text(Assembly, encoding='utf-8')
    CompilerDirectory = RepositoryRoot / 'Tools/ArmCompiler/Runtime/bin'
    Elf = Output / 'WirelessBridge.elf'
    Run([CompilerDirectory / 'clang.exe', '--target=arm-none-eabi', '-mcpu=cortex-m4', '-mthumb', '-mfloat-abi=soft',
        '-std=c11', '-Os', '-ffreestanding', '-fno-builtin', '-nostdlib', '-ffunction-sections', '-fdata-sections',
        '-fno-unwind-tables', '-fno-asynchronous-unwind-tables', '-Wall', '-Wextra', '-Werror',
        '-I', Output, ModuleDirectory / 'Wireless/WirelessBridge.c', Output / 'BridgeHooks.s',
        '-Wl,--gc-sections', '-Wl,--defsym,UnknownAddress=' + Profile['UnknownHookAddress'],
        '-Wl,--defsym,PacketAddress=' + Profile['PacketHookAddress'],
        '-Wl,--defsym,PayloadAddress=' + Profile['PayloadAddress'],
        '-Wl,--defsym,PayloadCapacity=2048', '-Wl,-T,' + str(ModuleDirectory / 'Wireless/BridgePatch.ld'),
        '-Wl,-Map,' + str(Output / 'WirelessBridge.map'), '-o', Elf], Output)
    for Section, Name in (('.UnknownHook', 'UnknownHook.bin'), ('.PacketHook', 'PacketHook.bin'), ('.Payload', 'Payload.bin')):
        Run([CompilerDirectory / 'llvm-objcopy.exe', '--only-section', Section, '-O', 'binary', Elf, Output / Name], Output)
    Payload = (Output / 'Payload.bin').read_bytes()
    if not 0 < len(Payload) <= PageSize:
        raise ValueError('Main payload size is invalid')
    Pages = [('Payload', PayloadAddress, Payload + b'\xFF' * (PageSize - len(Payload)))]
    Decoder = Capstone.Cs(Capstone.CS_ARCH_ARM, Capstone.CS_MODE_THUMB | Capstone.CS_MODE_MCLASS)
    for Name in ('Packet', 'Unknown'):
        Address = int(Profile[Name + 'HookAddress'], 16)
        Hook = (Output / (Name + 'Hook.bin')).read_bytes()
        Instruction = next(Decoder.disasm(Hook, Address))
        if len(Hook) != 4 or Instruction.mnemonic != 'b.w' or not PayloadAddress <= int(Instruction.op_str.lstrip('#'), 16) < PayloadAddress + PageSize:
            raise ValueError('Main hook must branch within the verified payload page')
        PageAddress = Address & ~(PageSize - 1)
        Page = bytearray(Original[PageAddress - Base:PageAddress - Base + PageSize])
        Page[Address - PageAddress:Address - PageAddress + 4] = Hook
        Pages.append((Name, PageAddress, bytes(Page)))
    Patched = bytearray(Original)
    Plan = {'Version': Profile['Version'], 'BaseBackup': str(Backup.resolve()), 'BaseSha256': Profile['ApplicationSha256'],
        'FirmwareWritten': False, 'PayloadLength': len(Payload), 'Pages': [],
        'ConfigurationAddress': Profile['ConfigurationAddress'], 'ConfigurationLength': Profile['ConfigurationLength'],
        'VectorsChanged': False, 'KeyScanChanged': False, 'RadioSchedulerChanged': False}
    for Name, Address, Data in Pages:
        Offset = Address - Base
        Restore = Original[Offset:Offset + PageSize]
        FileName, RestoreName = Name + 'Page.bin', 'Restore' + Name + 'Page.bin'
        (Output / FileName).write_bytes(Data)
        (Output / RestoreName).write_bytes(Restore)
        Plan['Pages'].append({'Name': Name, 'Address': hex(Address), 'Length': PageSize,
            'File': FileName, 'Sha256': Hash.sha256(Data).hexdigest(),
            'RestoreFile': RestoreName, 'RestoreSha256': Hash.sha256(Restore).hexdigest()})
        Patched[Offset:Offset + PageSize] = Data
    ConfigurationOffset = int(Profile['ConfigurationAddress'], 16) - Base
    if Patched[:PageSize] != Original[:PageSize] or Patched[ConfigurationOffset:] != Original[ConfigurationOffset:]:
        raise ValueError('Main vectors or configuration region unexpectedly changed')
    Plan['PatchedApplicationSha256'] = Hash.sha256(Patched).hexdigest()
    (Output / 'WirelessBridgePlan.json').write_text(Json.dumps(Plan, indent=2) + '\n', encoding='utf-8')
    Disassembly = Run([CompilerDirectory / 'llvm-objdump.exe', '-d', Elf], Output)
    (Output / 'WirelessBridgeDisassembly.txt').write_bytes(Disassembly)
    print(Json.dumps(Plan, indent=2))
    print('Offline build: ' + str(Output))


if __name__ == '__main__':
    Main()
