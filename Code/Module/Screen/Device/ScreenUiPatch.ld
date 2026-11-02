ENTRY(EnterDeviceScreenUi)
SECTIONS
{
    .NativeHook HookAddress : { KEEP(*(.NativeHook)) }
    .NativeInformationHook InformationAddress : { KEEP(*(.NativeInformationHook)) }
    .NativePacketHook PacketAddress : { KEEP(*(.NativePacketHook)) }
    .Payload PayloadAddress : { KEEP(*(.text.ScreenRecovery)) *(.text*) *(.rodata*) }
    .UnexpectedData 0x00060000 : { *(.data*) *(.bss*) *(COMMON) }
    /DISCARD/ : { *(.ARM.exidx*) *(.ARM.extab*) *(.comment*) }
}
ASSERT(SIZEOF(.NativeHook) == 4, "Hook must replace exactly one BL instruction")
ASSERT(SIZEOF(.NativeInformationHook) == 4, "Information hook must replace exactly one BL")
ASSERT(SIZEOF(.NativePacketHook) == 4, "Packet hook must replace exactly one instruction")
ASSERT(SIZEOF(.Payload) <= 4096, "Payload exceeds its verified unused flash page")
ASSERT(SIZEOF(.UnexpectedData) == 0, "Static writable data is not supported")
