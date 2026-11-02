ENTRY(EnterDeviceScreenUi)
SECTIONS
{
    .NativeHook 0x0003C608 : { KEEP(*(.NativeHook)) }
    .Payload 0x00050000 : { KEEP(*(.text.ScreenRecovery)) *(.text*) *(.rodata*) }
    .UnexpectedData 0x00060000 : { *(.data*) *(.bss*) *(COMMON) }
    /DISCARD/ : { *(.ARM.exidx*) *(.ARM.extab*) *(.comment*) }
}
ASSERT(SIZEOF(.NativeHook) == 4, "Hook must replace exactly one BL instruction")
ASSERT(SIZEOF(.Payload) <= 4096, "Payload exceeds its verified unused flash page")
ASSERT(SIZEOF(.UnexpectedData) == 0, "Static writable data is not supported")
