#include "NativeLvgl.h"
#include "NativeSymbols.h"

/* Standard Arm compiler ABI, used for stack aggregate initialization. */
void __aeabi_memclr4(void *Destination, size_t Length)
{
    volatile uint8_t *Bytes = Destination;
    while (Length != 0) { *Bytes++ = 0; --Length; }
}

void __aeabi_memcpy4(void *Destination, const void *Source, size_t Length)
{
    volatile uint8_t *Output = Destination;
    const volatile uint8_t *Input = Source;
    while (Length != 0) { *Output++ = *Input++; --Length; }
}

/* External LVGL API names and parameter types intentionally match upstream.
 * Only these verified entry points are imported from the backed-up image. */
static void SetNumberStyle(lv_obj_t *Object, unsigned Property, int Value, unsigned Selector)
{
    ((void (*)(lv_obj_t *, unsigned, unsigned, unsigned))NativeSetLocalStyle)(Object, Property, (unsigned)Value, Selector);
}

lv_obj_t *lv_obj_create(lv_obj_t *Parent)
{
    return ((lv_obj_t *(*)(lv_obj_t *))NativeCreateObject)(Parent);
}

lv_obj_t *lv_label_create(lv_obj_t *Parent)
{
    return ((lv_obj_t *(*)(lv_obj_t *))NativeCreateLabel)(Parent);
}

void lv_label_set_text(lv_obj_t *Object, const char *Text)
{
    ((void (*)(lv_obj_t *, const char *))NativeSetLabelText)(Object, Text);
}

void lv_obj_clear_flag(lv_obj_t *Object, lv_obj_flag_t Flags)
{
    ((void (*)(lv_obj_t *, lv_obj_flag_t))NativeClearFlags)(Object, Flags);
}

void lv_disp_load_scr(lv_obj_t *Screen)
{
    ((void (*)(lv_obj_t *))NativeLoadScreen)(Screen);
}

lv_obj_t *GetNativeActiveScreen(void)
{
    void *Display = ((void *(*)(void))NativeGetDefaultDisplay)();
    return ((lv_obj_t *(*)(void *))NativeGetActiveScreen)(Display);
}

void lv_obj_del(lv_obj_t *Object)
{
    ((void (*)(lv_obj_t *))NativeDeleteObject)(Object);
}

void lv_obj_set_width(lv_obj_t *Object, lv_coord_t Width)
{
    SetNumberStyle(Object, LV_STYLE_WIDTH, Width, LV_PART_MAIN);
}

void lv_obj_align(lv_obj_t *Object, lv_align_t Align, lv_coord_t X, lv_coord_t Y)
{
    SetNumberStyle(Object, LV_STYLE_ALIGN, Align, LV_PART_MAIN);
    SetNumberStyle(Object, LV_STYLE_X, X, LV_PART_MAIN);
    SetNumberStyle(Object, LV_STYLE_Y, Y, LV_PART_MAIN);
}

void lv_obj_set_style_bg_color(lv_obj_t *Object, lv_color_t Color, lv_style_selector_t Selector)
{
    SetNumberStyle(Object, LV_STYLE_BG_COLOR, Color.full, Selector);
}

void lv_obj_set_style_bg_opa(lv_obj_t *Object, lv_opa_t Opacity, lv_style_selector_t Selector)
{
    SetNumberStyle(Object, LV_STYLE_BG_OPA, Opacity, Selector);
}

void lv_obj_set_style_text_color(lv_obj_t *Object, lv_color_t Color, lv_style_selector_t Selector)
{
    SetNumberStyle(Object, LV_STYLE_TEXT_COLOR, Color.full, Selector);
}

void lv_obj_set_style_text_font(lv_obj_t *Object, const lv_font_t *Font, lv_style_selector_t Selector)
{
    SetNumberStyle(Object, LV_STYLE_TEXT_FONT, (int)Font, Selector);
}

void lv_obj_set_style_text_align(lv_obj_t *Object, lv_text_align_t Align, lv_style_selector_t Selector)
{
    SetNumberStyle(Object, LV_STYLE_TEXT_ALIGN, Align, Selector);
}

#define DefineCoordinateStyle(Function, Property) \
    void Function(lv_obj_t *Object, lv_coord_t Value, lv_style_selector_t Selector) \
    { SetNumberStyle(Object, Property, Value, Selector); }

DefineCoordinateStyle(lv_obj_set_style_border_width, LV_STYLE_BORDER_WIDTH)
DefineCoordinateStyle(lv_obj_set_style_radius, LV_STYLE_RADIUS)
DefineCoordinateStyle(lv_obj_set_style_pad_top, LV_STYLE_PAD_TOP)
DefineCoordinateStyle(lv_obj_set_style_pad_bottom, LV_STYLE_PAD_BOTTOM)
DefineCoordinateStyle(lv_obj_set_style_pad_left, LV_STYLE_PAD_LEFT)
DefineCoordinateStyle(lv_obj_set_style_pad_right, LV_STYLE_PAD_RIGHT)
DefineCoordinateStyle(lv_obj_set_style_text_line_space, LV_STYLE_TEXT_LINE_SPACE)

void *lv_mem_alloc(size_t Size)
{
    return ((void *(*)(size_t))NativeAllocateMemory)(Size);
}

void lv_mem_free(void *Memory)
{
    ((void (*)(void *))NativeFreeMemory)(Memory);
}

uint32_t lv_tick_get(void)
{
    return ((uint32_t (*)(void))NativeGetTick)();
}

lv_timer_t *lv_timer_create(lv_timer_cb_t Callback, uint32_t Period, void *UserData)
{
    return ((lv_timer_t *(*)(lv_timer_cb_t, uint32_t, void *))NativeCreateTimer)(Callback, Period, UserData);
}
