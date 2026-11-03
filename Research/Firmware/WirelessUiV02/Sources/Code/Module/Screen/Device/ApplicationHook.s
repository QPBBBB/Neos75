.syntax unified
.thumb
.section .NativeHook,"ax",%progbits
.global ScreenUiNativeHook
.thumb_func
ScreenUiNativeHook:
    bl EnterDeviceScreenUi
