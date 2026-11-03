#include "ScreenUi.h"
#include "NativeSymbols.h"
#include "DefaultMarkdown.h"
#include "Markdown/MarkdownDocument.h"
#include <stddef.h>

typedef struct DeviceScreenUiState
{
    uint32_t Magic;
    volatile uint32_t Countdown;
    ScreenUi Ui;
    uint32_t StartTick;
    volatile uint32_t UpdateCount;
    volatile uint32_t ActivationCount;
    volatile uint32_t Ready;
    volatile uint32_t IgnoredLegacyPackets;
    MarkdownState Markdown;
    volatile uint32_t WirelessReplyPending;
} DeviceScreenUiState;

/* Reset clears the first boot flag before RTX starts. During application
 * runtime it anchors our owned heap state. Native DFU entry replaces it with
 * A5A5A5A5. The second flag word also belongs to the vendor packet parser. */
static void FeedScreenRecoveryGuard(DeviceScreenUiState *State)
{
    State->Countdown = 10000;
}

_Static_assert(offsetof(lv_timer_t, user_data) == 12, "Native timer ABI mismatch");
_Static_assert(sizeof(lv_color_t) == 2, "Native color ABI mismatch");
_Static_assert(sizeof(lv_coord_t) == 2, "Native coordinate ABI mismatch");
_Static_assert(offsetof(DeviceScreenUiState, Countdown) == 4, "Recovery state ABI mismatch");

static DeviceScreenUiState *GetDeviceScreenUiState(void)
{
    uintptr_t Address = *(volatile uintptr_t *)0x20000000;
    if ((Address & 3) != 0 || !((Address >= 0x20000008 && Address <= 0x2000FFC0) ||
        (Address >= 0x80000000 && Address <= 0x801FFFC0))) return NULL;
    DeviceScreenUiState *State = (DeviceScreenUiState *)Address;
    return State->Magic == 0x4955534E ? State : NULL;
}

static void WriteStatusWord(uint8_t *Destination, uint32_t Value)
{
    Destination[0] = (uint8_t)Value;
    Destination[1] = (uint8_t)(Value >> 8);
    Destination[2] = (uint8_t)(Value >> 16);
    Destination[3] = (uint8_t)(Value >> 24);
}

static unsigned GetLegacyPageRootCount(void)
{
    const unsigned Offsets[] = {0, 16, 64, 116, 168, 204, 228};
    unsigned Count = 0;
    for (unsigned Index = 0; Index < 7; ++Index) {
        if (*(volatile uintptr_t *)(NativeLegacyGuiAddress + Offsets[Index]) != 0) ++Count;
    }
    return Count;
}

extern unsigned ContinueNativeScreenPacket(const uint8_t *Packet, unsigned Length);

/* Compact MDUW status fits the receiver's 32-byte HID report. Reply explicitly
 * on the keyboard UART so an unrelated USB status poll cannot change routing.
 * Non-status operations reply only after the UI timer has processed them. */
static void SendWirelessMarkdownReply(DeviceScreenUiState *State)
{
    uint8_t Status[32], Frame[32];
    GetMarkdownStatus(&State->Markdown, Status);
    Frame[0] = 0xA5; Frame[1] = 0x41; Frame[2] = 0; Frame[3] = 27; Frame[4] = 0x7C;
    Frame[5] = 'M'; Frame[6] = 'D'; Frame[7] = 'U'; Frame[8] = 'W';
    for (unsigned Index = 0; Index < 6; ++Index) Frame[9 + Index] = Status[4 + Index];
    for (unsigned Index = 0; Index < 8; ++Index) Frame[15 + Index] = Status[12 + Index];
    Frame[23] = Status[20]; Frame[24] = Status[21];
    Frame[25] = Status[24]; Frame[26] = Status[25];
    for (unsigned Index = 0; Index < 4; ++Index) Frame[27 + Index] = Status[28 + Index];
    unsigned Sum = 0;
    for (unsigned Index = 1; Index < 31; ++Index) Sum += Frame[Index];
    Frame[31] = (uint8_t)(Sum ^ 255);
    ((unsigned (*)(unsigned, const void *, unsigned, unsigned))NativeWriteScreenPort)(1, Frame, 32, 50);
}

/* The original GUI packet interpreter is no longer an entry point for page,
 * menu, theme, weather or clock commands. Only read-only information queries
 * enter its preserved framing/response path. Raw DFU is a separate service. */
unsigned HandleScreenPacket(const uint8_t *Packet, unsigned Length)
{
    if (Packet == NULL) return 1;
    unsigned Position = 0;
    while (Position < Length && Packet[Position] != 0xA5) ++Position;
    if (Length - Position < 6) return 1;
    if (Packet[Position + 1] == 0x41) {
        unsigned PayloadLength = Packet[Position + 3];
        if (Packet[Position + 2] != 0 || PayloadLength < 1 || PayloadLength > 59 || PayloadLength + 5 > Length - Position) return 1;
        return ContinueNativeScreenPacket(Packet, Length);
    }
    DeviceScreenUiState *State = GetDeviceScreenUiState();
    if (State != NULL) {
        State->IgnoredLegacyPackets++;
        unsigned FrameLength = ((unsigned)Packet[Position + 2] << 8) | Packet[Position + 3];
        if (FrameLength <= Length - Position - 5) {
            unsigned Sum = 0;
            for (unsigned Index = 1; Index < FrameLength + 4; ++Index) Sum += Packet[Position + Index];
            if ((uint8_t)(Sum ^ 255) == Packet[Position + 4 + FrameLength]) {
                RecordMarkdownControl(&State->Markdown, Packet + Position, FrameLength + 5);
                if (Packet[Position + 1] == 0x39 && FrameLength == 2 &&
                    (Packet[Position + 5] == 1 || Packet[Position + 5] == 2)) {
                    const uint8_t Acknowledgement[7] = {0xA5, 0x39, 0, 2, 0xFE, 0, 0xC6};
                    ((unsigned (*)(unsigned, const void *, unsigned, unsigned))NativeWriteScreenPort)(1, Acknowledgement, 7, 50);
                }
            }
        }
    }
    return 0;
}

/* A5 41 / selector 7F is read only. The existing parser checks the packet
 * checksum before this call; all original selectors keep their native path. */
unsigned HandleScreenInformation(const uint8_t *Request)
{
    unsigned PayloadLength = ((unsigned)Request[2] << 8) | Request[3];
    DeviceScreenUiState *State = GetDeviceScreenUiState();
    if (State != NULL && Request[0] == 0xA5 && Request[1] == 0x41 && PayloadLength >= 2 && PayloadLength <= 59) {
        if (Request[4] == 0x7C && PayloadLength <= 27) {
            if (Request[5] == 0 && PayloadLength == 2) SendWirelessMarkdownReply(State);
            else if (!State->WirelessReplyPending) {
                QueueMarkdown(&State->Markdown, Request + 5, PayloadLength - 1);
                State->WirelessReplyPending = 1;
            }
            return 0;
        }
        if (Request[4] == 0x7E) {
            if (Request[5] != 0) QueueMarkdown(&State->Markdown, Request + 5, PayloadLength - 1);
            uint8_t MarkdownReply[33];
            GetMarkdownStatus(&State->Markdown, MarkdownReply);
            ((unsigned (*)(unsigned, unsigned, const uint8_t *, unsigned))NativeSendInformation)(0x41, 0x7E, MarkdownReply, 32);
            return 0;
        }
        if (Request[4] == 0x7D && PayloadLength == 2) {
            uint8_t ControlReply[25];
            GetMarkdownControl(&State->Markdown, Request[5], ControlReply);
            ((unsigned (*)(unsigned, unsigned, const uint8_t *, unsigned))NativeSendInformation)(0x41, 0x7D, ControlReply, 24);
            return 0;
        }
    }
    if (Request[0] != 0xA5 || Request[1] != 0x41 || Request[3] != 1 || Request[4] != 0x7F) {
        return ((unsigned (*)(const uint8_t *))NativeOriginalInformation)(Request);
    }
    uint8_t Reply[33];
    for (unsigned Index = 0; Index < sizeof(Reply); ++Index) Reply[Index] = 0;
    Reply[0] = 'N'; Reply[1] = 'S'; Reply[2] = 'U'; Reply[3] = 'I';
    Reply[4] = 6;
    unsigned LegacyRoots = GetLegacyPageRootCount();
    Reply[5] = 0x10 | 0x20 | (LegacyRoots == 0 ? 0x40 : 0);
    Reply[6] = (uint8_t)LegacyRoots;
    lv_obj_t *ActiveScreen = GetNativeActiveScreen();
    WriteStatusWord(Reply + 24, (uint32_t)ActiveScreen);
    if (State != NULL) {
        Reply[5] |= 1 | (State->Ready ? 2 : 0) |
            (State->Ready && ActiveScreen == State->Ui.Screen ? 4 : 0);
        Reply[7] = (uint8_t)State->IgnoredLegacyPackets;
        WriteStatusWord(Reply + 8, (lv_tick_get() - State->StartTick) / 1000);
        WriteStatusWord(Reply + 12, State->UpdateCount);
        WriteStatusWord(Reply + 16, State->ActivationCount);
        WriteStatusWord(Reply + 20, (uint32_t)State->Ui.Screen);
        WriteStatusWord(Reply + 28, State->Countdown);
    }
    ((unsigned (*)(unsigned, unsigned, const uint8_t *, unsigned))NativeSendInformation)(0x41, 0x7F, Reply, 32);
    return 0;
}

static void UpdateDeviceScreenUi(lv_timer_t *Timer)
{
    DeviceScreenUiState *State = Timer->user_data;
    FeedScreenRecoveryGuard(State);
    State->UpdateCount++;
    UpdateMarkdown(&State->Markdown);
    if (State->WirelessReplyPending && !__atomic_load_n(&State->Markdown.Pending, __ATOMIC_ACQUIRE)) {
        State->WirelessReplyPending = 0;
        SendWirelessMarkdownReply(State);
    }
    if (GetNativeActiveScreen() != State->Ui.Screen) {
        LoadScreenUi(&State->Ui);
        State->ActivationCount++;
    }
}

/* Only storage capacity/decoder setup is retained. Do not call the original
 * GUI initializer: it creates a stock screen and registers stock page timers.
 * Reuse LVGL's empty initial screen so there is only our application page. */
void EnterDeviceScreenUi(void *OriginalArgument)
{
    (void)OriginalArgument;
    ((void (*)(void))NativeStorageInit)();
    DeviceScreenUiState *State = lv_mem_alloc(sizeof(DeviceScreenUiState));
    if (State == NULL) return;
    State->Magic = 0x4955534E;
    State->Countdown = 10000;
    State->Ui = (ScreenUi){0};
    State->StartTick = lv_tick_get();
    State->UpdateCount = 0;
    State->ActivationCount = 0;
    State->Ready = 0;
    State->IgnoredLegacyPackets = 0;
    State->WirelessReplyPending = 0;
    for (unsigned Index = 0; Index < sizeof(State->Markdown); ++Index)
        ((volatile uint8_t *)&State->Markdown)[Index] = 0;
    *(DeviceScreenUiState * volatile *)0x20000000 = State;
    CreateScreenUiOnScreen(&State->Ui, GetNativeActiveScreen(), NULL);
    InitializeMarkdown(&State->Markdown, &State->Ui);
    if (!LoadDefaultMarkdown(&State->Markdown, ScreenUiDefaultMarkdown, sizeof(ScreenUiDefaultMarkdown)))
        SetScreenUiMessage(&State->Ui, "Default Markdown unavailable");
    State->Ready = 1;
    LoadScreenUi(&State->Ui);
    State->ActivationCount = 1;
    ((void (*)(unsigned))NativeAnnounceScreenState)(2);
    lv_timer_t FirstTimer;
    FirstTimer.user_data = State;
    UpdateDeviceScreenUi(&FirstTimer);
    lv_timer_create(UpdateDeviceScreenUi, 10, State);
}
