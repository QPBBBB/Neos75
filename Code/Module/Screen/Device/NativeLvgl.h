#ifndef NativeLvglH
#define NativeLvglH

#include <stdint.h>
#include <stddef.h>

/* Narrow LVGL ABI declaration, verified against NativeProfile.json. External
 * API/type/field names follow LVGL, whose MIT license is in Tools/Lvgl.
 * This is not a claim that the vendor uses the complete LVGL 8.3.11 ABI. */
typedef struct _lv_obj_t lv_obj_t;
typedef struct _lv_font_t lv_font_t;
typedef int16_t lv_coord_t;
typedef uint8_t lv_opa_t;
typedef unsigned lv_obj_flag_t;
typedef unsigned lv_style_selector_t;
typedef unsigned lv_align_t;
typedef unsigned lv_text_align_t;
typedef union { uint16_t full; } lv_color_t;
typedef struct _lv_timer_t lv_timer_t;
typedef void (*lv_timer_cb_t)(lv_timer_t *Timer);
struct _lv_timer_t {
    uint32_t period;
    uint32_t last_run;
    lv_timer_cb_t timer_cb;
    void *user_data;
    int32_t repeat_count;
    uint32_t paused;
};

enum {
    LV_PART_MAIN = 0, LV_OPA_COVER = 255, LV_OBJ_FLAG_SCROLLABLE = 16,
    LV_ALIGN_TOP_MID = 2, LV_ALIGN_BOTTOM_MID = 5, LV_ALIGN_CENTER = 9,
    LV_TEXT_ALIGN_CENTER = 2,
    LV_STYLE_WIDTH = 1, LV_STYLE_X = 7, LV_STYLE_Y = 8, LV_STYLE_ALIGN = 9,
    LV_STYLE_RADIUS = 11, LV_STYLE_PAD_TOP = 16, LV_STYLE_PAD_BOTTOM = 17,
    LV_STYLE_PAD_LEFT = 18, LV_STYLE_PAD_RIGHT = 19,
    LV_STYLE_BG_COLOR = 32, LV_STYLE_BG_OPA = 33, LV_STYLE_BORDER_WIDTH = 50,
    LV_STYLE_TEXT_COLOR = 85, LV_STYLE_TEXT_FONT = 87,
    LV_STYLE_TEXT_LINE_SPACE = 89, LV_STYLE_TEXT_ALIGN = 91
};

lv_obj_t *lv_obj_create(lv_obj_t *Parent);
lv_obj_t *lv_label_create(lv_obj_t *Parent);
void lv_label_set_text(lv_obj_t *Object, const char *Text);
void lv_obj_clear_flag(lv_obj_t *Object, lv_obj_flag_t Flags);
void lv_disp_load_scr(lv_obj_t *Screen);
void lv_obj_del(lv_obj_t *Object);
void lv_obj_set_width(lv_obj_t *Object, lv_coord_t Width);
void lv_obj_align(lv_obj_t *Object, lv_align_t Align, lv_coord_t X, lv_coord_t Y);
void lv_obj_set_style_bg_color(lv_obj_t *Object, lv_color_t Color, lv_style_selector_t Selector);
void lv_obj_set_style_bg_opa(lv_obj_t *Object, lv_opa_t Opacity, lv_style_selector_t Selector);
void lv_obj_set_style_text_color(lv_obj_t *Object, lv_color_t Color, lv_style_selector_t Selector);
void lv_obj_set_style_text_font(lv_obj_t *Object, const lv_font_t *Font, lv_style_selector_t Selector);
void lv_obj_set_style_text_align(lv_obj_t *Object, lv_text_align_t Align, lv_style_selector_t Selector);
void lv_obj_set_style_border_width(lv_obj_t *Object, lv_coord_t Value, lv_style_selector_t Selector);
void lv_obj_set_style_radius(lv_obj_t *Object, lv_coord_t Value, lv_style_selector_t Selector);
void lv_obj_set_style_pad_top(lv_obj_t *Object, lv_coord_t Value, lv_style_selector_t Selector);
void lv_obj_set_style_pad_bottom(lv_obj_t *Object, lv_coord_t Value, lv_style_selector_t Selector);
void lv_obj_set_style_pad_left(lv_obj_t *Object, lv_coord_t Value, lv_style_selector_t Selector);
void lv_obj_set_style_pad_right(lv_obj_t *Object, lv_coord_t Value, lv_style_selector_t Selector);
void lv_obj_set_style_text_line_space(lv_obj_t *Object, lv_coord_t Value, lv_style_selector_t Selector);
void *lv_mem_alloc(size_t Size);
uint32_t lv_tick_get(void);
lv_timer_t *lv_timer_create(lv_timer_cb_t Callback, uint32_t Period, void *UserData);
lv_obj_t *GetNativeActiveScreen(void);

static inline lv_coord_t lv_pct(lv_coord_t Percent)
{
    return (lv_coord_t)(0x2000 | (Percent < 0 ? 1000 - Percent : Percent));
}
static inline lv_color_t lv_color_hex(uint32_t Color)
{
    return (lv_color_t){ .full = ((Color >> 8) & 0xF800) | ((Color >> 5) & 0x7E0) | ((Color >> 3) & 31) };
}
static inline lv_color_t lv_color_black(void) { return (lv_color_t){ .full = 0 }; }
static inline lv_color_t lv_color_white(void) { return (lv_color_t){ .full = 0xFFFF }; }
static inline void lv_scr_load(lv_obj_t *Screen) { lv_disp_load_scr(Screen); }
static inline void lv_obj_center(lv_obj_t *Object) { lv_obj_align(Object, LV_ALIGN_CENTER, 0, 0); }
static inline void lv_obj_set_style_pad_all(lv_obj_t *Object, lv_coord_t Value, lv_style_selector_t Selector)
{
    lv_obj_set_style_pad_top(Object, Value, Selector);
    lv_obj_set_style_pad_bottom(Object, Value, Selector);
    lv_obj_set_style_pad_left(Object, Value, Selector);
    lv_obj_set_style_pad_right(Object, Value, Selector);
}

#endif
