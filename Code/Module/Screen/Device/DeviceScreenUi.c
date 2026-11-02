#include "ScreenUi.h"
#include "NativeSymbols.h"
#include "ScreenUiConfiguration.h"
#include <stddef.h>

typedef struct DeviceScreenUiState
{
    ScreenUi Ui;
    uint32_t StartTick;
    char RunningText[24];
} DeviceScreenUiState;

/* The original application reserves its first two RAM words for boot flags;
 * native reset writes the second at 0x39558, bootloader reads it at 0x36B6.
 * SysTick decrements this word. Only the LVGL thread feeds it. */
static void FeedScreenRecoveryGuard(void)
{
    *(volatile uint32_t *)0x20000004 = 10000;
}

_Static_assert(offsetof(lv_timer_t, user_data) == 12, "Native timer ABI mismatch");
_Static_assert(sizeof(lv_color_t) == 2, "Native color ABI mismatch");
_Static_assert(sizeof(lv_coord_t) == 2, "Native coordinate ABI mismatch");

static void UpdateDeviceScreenUi(lv_timer_t *Timer)
{
    DeviceScreenUiState *State = Timer->user_data;
    FeedScreenRecoveryGuard();
    if (ScreenUiShowUptime) {
        uint32_t Seconds = (lv_tick_get() - State->StartTick) / 1000;
        uint32_t Hours = (Seconds / 3600) % 100;
        uint32_t Minutes = (Seconds / 60) % 60;
        Seconds %= 60;
        char *Text = State->RunningText;
        Text[0] = 'R'; Text[1] = 'u'; Text[2] = 'n'; Text[3] = 'n';
        Text[4] = 'i'; Text[5] = 'n'; Text[6] = 'g'; Text[7] = ' ';
        Text[8] = '0' + Hours / 10; Text[9] = '0' + Hours % 10;
        Text[10] = ':';
        Text[11] = '0' + Minutes / 10; Text[12] = '0' + Minutes % 10;
        Text[13] = ':';
        Text[14] = '0' + Seconds / 10; Text[15] = '0' + Seconds % 10;
        Text[16] = '\0';
        SetScreenUiStatus(&State->Ui, Text);
    }
}

/* Called once from task_lvgl, after the vendor's display/USB/RTOS startup.
 * Keep vendor page objects alive because its other tasks still reference them.
 * State belongs to the native LVGL heap; no extra static RAM/linker guess. */
void EnterDeviceScreenUi(void *OriginalArgument)
{
    FeedScreenRecoveryGuard();
    ((void (*)(void *))NativeOriginalUiInit)(OriginalArgument);
    DeviceScreenUiState *State = lv_mem_alloc(sizeof(DeviceScreenUiState));
    if (State == NULL) return;
    CreateScreenUi(&State->Ui, NULL);
    SetScreenUiTitle(&State->Ui, ScreenUiTitle);
    SetScreenUiMessage(&State->Ui, ScreenUiMessage);
    SetScreenUiStatus(&State->Ui, ScreenUiStatus);
    State->StartTick = lv_tick_get();
    LoadScreenUi(&State->Ui);
    lv_timer_t FirstTimer;
    FirstTimer.user_data = State;
    UpdateDeviceScreenUi(&FirstTimer);
    lv_timer_create(UpdateDeviceScreenUi, 1000, State);
}
