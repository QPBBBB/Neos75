ENTRY(HandleUnknownWirelessCommand)
SECTIONS
{
    .UnknownHook UnknownAddress : { KEEP(*(.UnknownHook)) }
    .PacketHook PacketAddress : { KEEP(*(.PacketHook)) }
    .Payload PayloadAddress : {
        *(.text*)
        *(.rodata*)
        . = ALIGN(4);
    }
    .UnsupportedRam : { *(.data*) *(.bss*) *(COMMON) }
    /DISCARD/ : { *(.comment) *(.ARM.attributes) *(.ARM.exidx*) *(.ARM.extab*) }
}
ASSERT(SIZEOF(.UnknownHook) == 4, "Unknown-command hook size changed")
ASSERT(SIZEOF(.PacketHook) == 4, "Packet hook size changed")
ASSERT(SIZEOF(.Payload) <= PayloadCapacity, "Main bridge payload exceeds the single verified blank page")
ASSERT(SIZEOF(.UnsupportedRam) == 0, "Main bridge must not introduce RAM storage")
