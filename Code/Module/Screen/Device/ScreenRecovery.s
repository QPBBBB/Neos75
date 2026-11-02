.syntax unified
.thumb
.section .text.ScreenRecovery,"ax",%progbits

/* IRQ entry preserves EXC_RETURN and callee-saved registers, then tail-calls
 * the original RTX SysTick handler. The native handler owns context switching. */
.global GuardScreenSysTick
.thumb_func
GuardScreenSysTick:
    push {r0, r1}
    ldr r0, =0x20000004
    ldr r1, [r0]
    cbz r1, ContinueScreenSysTick
    subs r1, r1, #1
    str r1, [r0]
    beq RecoverFromScreenSysTick
ContinueScreenSysTick:
    pop {r0, r1}
    ldr r12, =0x0000835D
    bx r12
RecoverFromScreenSysTick:
    pop {r0, r1}
    b RecoverScreenFault

/* No stack, heap, display, RTOS or vendor function is required to recover.
 * Bootloader 0x369A checks 0xA5A5A5A5 at RAM 0x20000000 before jumping to app. */
.global RecoverScreenFault
.thumb_func
RecoverScreenFault:
    cpsid i
    ldr r0, =0x20000000
    ldr r1, =0xA5A5A5A5
    str r1, [r0]
    dsb sy
    ldr r0, =0xE000ED0C
    ldr r1, =0x05FA0004
    str r1, [r0]
    dsb sy
WaitForScreenReset:
    b WaitForScreenReset
.ltorg
