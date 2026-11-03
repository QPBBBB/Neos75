.syntax unified
.thumb
.section .NativeInformationHook,"ax",%progbits
.global ScreenUiInformationHook
.thumb_func
ScreenUiInformationHook:
    bl HandleScreenInformation
