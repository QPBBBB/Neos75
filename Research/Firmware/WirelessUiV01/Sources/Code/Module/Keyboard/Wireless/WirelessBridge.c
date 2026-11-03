#include <stdint.h>
#include "NativeBridgeSymbols.h"

extern unsigned ContinueNativeKeyboardPacket(const uint8_t *Packet, unsigned Length);

static unsigned FrameIsValid(const uint8_t *Frame, unsigned PayloadLength)
{
    unsigned Sum = 0;
    for (unsigned Index = 1; Index < PayloadLength + 4; ++Index) Sum += Frame[Index];
    return (uint8_t)(Sum ^ 255) == Frame[PayloadLength + 4];
}

/* This replaces only the native unknown-command callback, after native VIA
 * routing and standard commands have already been handled. No keymap write,
 * raw memory access, DFU command or stock screen command is forwarded. */
void HandleUnknownWirelessCommand(uint8_t *Report, unsigned Length)
{
    if (Report == 0) return;
    unsigned Source = *(volatile uint8_t *)NativeRawSourceAddress;
    unsigned Forwarded = 0, WriteResult = 0xFF;
    if (Length == 32 && (Source == 2 || Source == 3) &&
        Report[0] == 0xA5 && Report[1] == 0x41 && Report[2] == 0 &&
        Report[3] >= 2 && Report[3] <= 27 && Report[4] == 0x7C) {
        unsigned PayloadLength = Report[3], Operation = Report[5];
        unsigned Shape = (Operation == 0 && PayloadLength == 2) ||
            (Operation == 1 && PayloadLength == 16) ||
            (Operation == 2 && PayloadLength >= 9) ||
            (Operation == 3 && PayloadLength == 4) ||
            (Operation == 4 && PayloadLength == 6);
        if (Shape && FrameIsValid(Report, PayloadLength)) {
            uint8_t Frame[32];
            for (unsigned Index = 0; Index < PayloadLength + 5; ++Index) Frame[Index] = Report[Index];
            /* Reuse the stock synchronous screen-UART service with a bounded
             * timeout. Reception and rendering remain in the screen module. */
            Forwarded = 1;
            WriteResult = (unsigned)((int (*)(unsigned, const uint8_t *, unsigned, unsigned))NativeWritePort)(1, Frame, PayloadLength + 5, 10);
        }
    }
    if (Length == 32 && Report[0] == 0xA5 && Report[1] == 0x41 && Report[2] == 0 &&
        Report[3] == 2 && Report[4] == 0x7C && Report[5] == 0 && FrameIsValid(Report, 2)) {
        /* The native immediate echo carries bounded bridge diagnostics for a
         * read-only status request. The real document ACK still comes MDUW. */
        Report[24] = 'N'; Report[25] = 'W'; Report[26] = 'B'; Report[27] = '2';
        Report[28] = (uint8_t)Source; Report[29] = (uint8_t)Forwarded;
        Report[30] = (uint8_t)WriteResult; Report[31] = 0;
    }
    /* Preserve the native default response, including for rejected requests.
     * The host ignores this immediate echo and waits for the screen's MDUW. */
    Report[0] = 0xFF;
}

/* Only a complete compact screen response is sent over the existing native
 * radio-control transport. All original rotary/ready/status traffic retains
 * the original interpreter and its register/stack context. No owned RAM or
 * new thread is introduced into the main keyboard. */
unsigned HandleWirelessScreenPacket(const uint8_t *Packet, unsigned Length)
{
    if (Packet != 0 && Length >= 32 && Length <= 128) {
        for (unsigned Position = 0; Position + 32 <= Length; ++Position) {
            const uint8_t *Frame = Packet + Position;
            if (Frame[0] != 0xA5 || Frame[1] != 0x41 || Frame[2] != 0 || Frame[3] != 27 ||
                Frame[4] != 0x7C || Frame[5] != 'M' || Frame[6] != 'D' ||
                Frame[7] != 'U' || Frame[8] != 'W' || Frame[9] != 1 || !FrameIsValid(Frame, 27)) continue;
            uint8_t Reply[32];
            for (unsigned Index = 0; Index < 32; ++Index) Reply[Index] = Frame[Index];
            ((void (*)(const uint8_t *, unsigned))NativeSendWirelessRaw)(Reply, 32);
            return 0;
        }
    }
    return ContinueNativeKeyboardPacket(Packet, Length);
}
