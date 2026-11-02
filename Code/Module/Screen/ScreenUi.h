#ifndef ScreenUiH
#define ScreenUiH

#if defined(NativeScreenUi)
#include "Device/NativeLvgl.h"
#else
#include "lvgl.h"
#endif

#ifdef __cplusplus
extern "C" {
#endif

typedef struct ScreenUi
{
    lv_obj_t *Screen;
    lv_obj_t *Title;
    lv_obj_t *Message;
    lv_obj_t *Status;
} ScreenUi;

/* All calls belong on the LVGL/UI thread, after registering a display driver. */
void CreateScreenUi(ScreenUi *Ui, const lv_font_t *MessageFont);
void LoadScreenUi(ScreenUi *Ui);
void SetScreenUiTitle(ScreenUi *Ui, const char *Text);
void SetScreenUiMessage(ScreenUi *Ui, const char *Text);
void SetScreenUiStatus(ScreenUi *Ui, const char *Text);
void DeleteScreenUi(ScreenUi *Ui);

#ifdef __cplusplus
}
#endif

#endif
