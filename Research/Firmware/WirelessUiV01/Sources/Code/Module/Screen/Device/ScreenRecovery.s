.syntax unified
.thumb
.section .text.ScreenRecovery,"ax",%progbits

.global InitializeScreenRecovery
.thumb_func
InitializeScreenRecovery:
    ldr r0, =0x20000000
    movs r1, #0
    str r1, [r0]
    ldr r0, =0x000081BD
    bx r0

/* Preserve EXC_RETURN and the original RTX interrupt context. The owned state
 * lives in native LVGL SRAM/SDRAM; boot flags and invalid anchors are ignored. */
.global GuardScreenSysTick
.thumb_func
GuardScreenSysTick:
    push {r0, r1, r2, r3}
    ldr r0, =0x20000000
    ldr r0, [r0]
    tst r0, #3
    bne ContinueScreenSysTick
    lsrs r1, r0, #16
    movw r2, #0x2000
    cmp r1, r2
    beq CheckScreenState
    lsrs r1, r0, #21
    cmp r1, #0x400
    bne ContinueScreenSysTick
CheckScreenState:
    ldr r1, [r0]
    ldr r2, =0x4955534E
    cmp r1, r2
    bne ContinueScreenSysTick
    ldr r1, [r0, #4]
    cbz r1, ContinueScreenSysTick
    subs r1, r1, #1
    str r1, [r0, #4]
    beq RecoverFromScreenSysTick
ContinueScreenSysTick:
    pop {r0, r1, r2, r3}
    ldr r12, =0x0000835D
    bx r12
RecoverFromScreenSysTick:
    pop {r0, r1, r2, r3}
    b RecoverScreenFault

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
