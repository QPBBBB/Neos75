#include "ScreenUi.h"

static void SetLabelText(lv_obj_t *Label, const char *Text)
{
    lv_label_set_text(Label, Text != NULL ? Text : "");
}

void CreateScreenUi(ScreenUi *Ui, const lv_font_t *MessageFont)
{
    CreateScreenUiOnScreen(Ui, NULL, MessageFont);
}

void CreateScreenUiOnScreen(ScreenUi *Ui, lv_obj_t *Screen, const lv_font_t *MessageFont)
{
    if (Ui == NULL) return;
    Ui->Screen = Screen != NULL ? Screen : lv_obj_create(NULL);
    lv_obj_set_style_border_width(Ui->Screen, 0, LV_PART_MAIN);
    lv_obj_set_style_radius(Ui->Screen, 0, LV_PART_MAIN);
    lv_obj_set_style_pad_all(Ui->Screen, 0, LV_PART_MAIN);
    lv_obj_set_style_bg_color(Ui->Screen, lv_color_black(), LV_PART_MAIN);
    lv_obj_set_style_bg_opa(Ui->Screen, LV_OPA_COVER, LV_PART_MAIN);
    lv_obj_clear_flag(Ui->Screen, LV_OBJ_FLAG_SCROLLABLE);

    Ui->Message = lv_label_create(Ui->Screen);
    lv_obj_set_width(Ui->Message, lv_pct(90));
    lv_obj_set_style_text_align(Ui->Message, LV_TEXT_ALIGN_CENTER, LV_PART_MAIN);
    lv_obj_set_style_text_color(Ui->Message, lv_color_white(), LV_PART_MAIN);
    if (MessageFont != NULL) lv_obj_set_style_text_font(Ui->Message, MessageFont, LV_PART_MAIN);
    lv_obj_set_style_text_line_space(Ui->Message, 6, LV_PART_MAIN);
    lv_obj_center(Ui->Message);

    Ui->Status = lv_label_create(Ui->Screen);
    lv_obj_set_width(Ui->Status, lv_pct(90));
    lv_obj_set_style_text_align(Ui->Status, LV_TEXT_ALIGN_CENTER, LV_PART_MAIN);
    lv_obj_set_style_text_color(Ui->Status, lv_color_hex(0x808080), LV_PART_MAIN);
    lv_obj_align(Ui->Status, LV_ALIGN_BOTTOM_MID, 0, -16);

    SetScreenUiMessage(Ui, "");
    SetScreenUiStatus(Ui, "");
}

void LoadScreenUi(ScreenUi *Ui)
{
    if (Ui != NULL && Ui->Screen != NULL) lv_scr_load(Ui->Screen);
}

void SetScreenUiMessage(ScreenUi *Ui, const char *Text)
{
    if (Ui != NULL && Ui->Message != NULL) SetLabelText(Ui->Message, Text);
}

void SetScreenUiStatus(ScreenUi *Ui, const char *Text)
{
    if (Ui != NULL && Ui->Status != NULL) SetLabelText(Ui->Status, Text);
}

void DeleteScreenUi(ScreenUi *Ui)
{
    if (Ui == NULL) return;
    if (Ui->Screen != NULL) lv_obj_del(Ui->Screen);
    Ui->Screen = NULL;
    Ui->Message = NULL;
    Ui->Status = NULL;
}
