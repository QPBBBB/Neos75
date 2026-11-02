#include "NativeSymbols.h"
.syntax unified
.thumb
.section .NativePacketHook,"ax",%progbits
.global ScreenUiPacketHook
.thumb_func
ScreenUiPacketHook:
    b.w HandleScreenPacket

.section .text.PacketContinuation,"ax",%progbits
.global ContinueNativeScreenPacket
.thumb_func
ContinueNativeScreenPacket:
    /* Exact original prologue displaced by the four-byte tail branch. */
    push.w {r4, r5, r6, r7, r8, r9, r10, r11, lr}
    ldr r12, =NativePacketContinuation
    bx r12
