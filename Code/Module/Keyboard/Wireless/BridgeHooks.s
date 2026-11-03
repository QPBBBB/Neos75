.syntax unified
.thumb
.section .UnknownHook,"ax",%progbits
.global UnknownWirelessHook
.thumb_func
UnknownWirelessHook:
    b.w HandleUnknownWirelessCommand

.section .PacketHook,"ax",%progbits
.global WirelessScreenPacketHook
.thumb_func
WirelessScreenPacketHook:
    b.w HandleWirelessScreenPacket

.section .text.PacketContinuation,"ax",%progbits
.global ContinueNativeKeyboardPacket
.thumb_func
ContinueNativeKeyboardPacket:
    push.w {r4, r5, r6, r7, r8, r9, r10, r11, r12, lr}
    ldr r12, =NativePacketContinuation
    bx r12
