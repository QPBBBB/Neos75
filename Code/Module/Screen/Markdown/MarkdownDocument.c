#include "MarkdownDocument.h"
#include <stddef.h>

_Static_assert(sizeof(MarkdownHeader) == 32, "Document header ABI");
_Static_assert(sizeof(MarkdownRow) == 8, "Document row ABI");
_Static_assert(sizeof(MarkdownGlyph) == 12, "Document glyph ABI");
#ifdef NativeScreenUi
_Static_assert(sizeof(lv_font_t) == 24, "Observed native font ABI");
_Static_assert(offsetof(lv_font_glyph_dsc_t, adv_w) == 4, "Observed native glyph ABI");
#endif

static uint16_t Read16(const uint8_t *Data)
{ return (uint16_t)(Data[0] | Data[1] << 8); }
static uint32_t Read32(const uint8_t *Data)
{ return Data[0] | (uint32_t)Data[1] << 8 | (uint32_t)Data[2] << 16 | (uint32_t)Data[3] << 24; }
static void Write32(uint8_t *Data, uint32_t Value)
{ for (unsigned Index = 0; Index < 4; ++Index) Data[Index] = (uint8_t)(Value >> (Index * 8)); }
static uint32_t UpdateCrc(uint32_t Crc, const uint8_t *Data, unsigned Length)
{
    for (unsigned Index = 0; Index < Length; ++Index) {
        Crc ^= Data[Index];
        for (unsigned Bit = 0; Bit < 8; ++Bit) Crc = (Crc >> 1) ^ (0xEDB88320u & (0u - (Crc & 1)));
    }
    return Crc;
}

static const MarkdownGlyph *GetGlyph(const MarkdownState *State, uint32_t Letter)
{
    if (!State->Active || Letter < 0xE000 || Letter - 0xE000 >= State->GlyphCount) return NULL;
    return (const MarkdownGlyph *)(State->Package + State->GlyphOffset) + (Letter - 0xE000);
}
static bool GetGlyphDescription(const lv_font_t *Font, lv_font_glyph_dsc_t *Description,
    uint32_t Letter, uint32_t Next)
{
    (void)Next;
    const MarkdownGlyph *Glyph = GetGlyph(Font->dsc, Letter);
    if (Glyph == NULL) return false;
    Description->resolved_font = Font;
    Description->adv_w = Glyph->Advance;
    Description->box_w = Glyph->Width;
    Description->box_h = Glyph->Height;
    Description->ofs_x = 0;
    Description->ofs_y = 0;
    Description->bpp = 1;
    Description->is_placeholder = 0;
    return true;
}
static const uint8_t *GetGlyphBitmap(const lv_font_t *Font, uint32_t Letter)
{
    const MarkdownState *State = Font->dsc;
    const MarkdownGlyph *Glyph = GetGlyph(State, Letter);
    return Glyph == NULL ? NULL : State->Package + Glyph->Offset;
}

static void ClearRows(MarkdownState *State)
{
    for (unsigned Index = 0; Index < MarkdownVisibleRows; ++Index) {
        lv_obj_set_style_bg_opa(State->Labels[Index], 0, LV_PART_MAIN);
        lv_label_set_text(State->Labels[Index], "");
    }
}
static bool ValidateDocument(MarkdownState *State)
{
    if (State->Total < sizeof(MarkdownHeader)) return false;
    const MarkdownHeader *Header = (const MarkdownHeader *)State->Package;
    if (Header->Magic[0] != 'N' || Header->Magic[1] != 'S' || Header->Magic[2] != 'M' || Header->Magic[3] != 'D' ||
        Header->Version != 1 || Header->Width != 480 || Header->Height != 360 ||
        Header->SourceBytes > 65536 || Header->Rows == 0 || Header->Rows > 32768 ||
        Header->Glyphs == 0 || Header->Glyphs > 6400 ||
        Header->GlyphOffset != 32 + Header->Rows * sizeof(MarkdownRow) ||
        Header->GlyphOffset > State->Total || Header->GlyphOffset % 4 != 0 ||
        Header->BitmapOffset > State->Total || Header->Glyphs * sizeof(MarkdownGlyph) > State->Total - Header->GlyphOffset ||
        Header->BitmapOffset < Header->GlyphOffset + Header->Glyphs * sizeof(MarkdownGlyph)) return false;
    const MarkdownGlyph *Glyphs = (const MarkdownGlyph *)(State->Package + Header->GlyphOffset);
    for (unsigned Index = 0; Index < Header->Glyphs; ++Index) {
        const MarkdownGlyph *Glyph = Glyphs + Index;
        unsigned Bytes = (Glyph->Width * Glyph->Height + 7) / 8;
        if (Glyph->Width > 240 || Glyph->Height > 63 || Glyph->Offset < Header->BitmapOffset ||
            Glyph->Offset > State->Total || Bytes > State->Total - Glyph->Offset) return false;
    }
    const MarkdownRow *Rows = (const MarkdownRow *)(State->Package + 32);
    unsigned TextStart = Header->GlyphOffset + Header->Glyphs * sizeof(MarkdownGlyph);
    for (unsigned Index = 0; Index < Header->Rows; ++Index) {
        const MarkdownRow *Row = Rows + Index;
        if ((Row->Height & 63) == 0 || Row->Count > 512 || Row->Offset < TextStart ||
            Row->Offset > Header->BitmapOffset || Row->Count * 2u > Header->BitmapOffset - Row->Offset) return false;
        unsigned TextBytes = 0, PreviousColor = 0x10000;
        for (unsigned Position = 0; Position < Row->Count; ++Position) {
            unsigned Glyph = Read16(State->Package + Row->Offset + Position * 2);
            if (Glyph >= Header->Glyphs) return false;
            TextBytes += 3;
            if (Glyphs[Glyph].Color != PreviousColor) { TextBytes += 9; PreviousColor = Glyphs[Glyph].Color; }
        }
        if (TextBytes >= sizeof(State->LineText)) return false;
    }
    State->RowCount = Header->Rows;
    State->GlyphCount = Header->Glyphs;
    State->GlyphOffset = Header->GlyphOffset;
    State->SourceBytes = Header->SourceBytes;
    return true;
}

static void FormatPosition(MarkdownState *State)
{
    char Text[40], Digits[12];
    unsigned Length = 0, Count = 0, Value = State->ScrollRow + 1;
    Text[Length++] = 'R'; Text[Length++] = 'o'; Text[Length++] = 'w'; Text[Length++] = ' ';
    do { Digits[Count++] = '0' + Value % 10; Value /= 10; } while (Value);
    while (Count) Text[Length++] = Digits[--Count];
    Text[Length++] = ' '; Text[Length++] = '/'; Text[Length++] = ' ';
    Value = State->RowCount;
    do { Digits[Count++] = '0' + Value % 10; Value /= 10; } while (Value);
    while (Count) Text[Length++] = Digits[--Count];
    Text[Length] = 0;
    SetScreenUiStatus(State->Ui, Text);
}
static void RenderMarkdown(MarkdownState *State)
{
    ClearRows(State);
    if (!State->Active) return;
    const MarkdownRow *Rows = (const MarkdownRow *)(State->Package + 32);
    const MarkdownGlyph *Glyphs = (const MarkdownGlyph *)(State->Package + State->GlyphOffset);
    int Top = 38;
    unsigned Visible = 0, TextBudget = 24576;
    for (unsigned Index = State->ScrollRow; Index < State->RowCount && Visible < MarkdownVisibleRows; ++Index) {
        const MarkdownRow *Row = Rows + Index;
        unsigned Height = Row->Height & 63, Kind = Row->Height >> 6;
        if (Top + (int)Height > 338) break;
        unsigned Length = 0, Color = 0x10000, FontHeight = 1;
        for (unsigned Position = 0; Position < Row->Count; ++Position) {
            unsigned GlyphId = Read16(State->Package + Row->Offset + Position * 2);
            const MarkdownGlyph *Glyph = Glyphs + GlyphId;
            if (Glyph->Height > FontHeight) FontHeight = Glyph->Height;
            if (Color != Glyph->Color) {
                if (Color != 0x10000) State->LineText[Length++] = '#';
                Color = Glyph->Color;
                unsigned Rgb = ((Color >> 11) * 255 / 31) << 16 |
                    (((Color >> 5) & 63) * 255 / 63) << 8 | (Color & 31) * 255 / 31;
                State->LineText[Length++] = '#';
                for (int Shift = 20; Shift >= 0; Shift -= 4)
                    State->LineText[Length++] = "0123456789ABCDEF"[(Rgb >> Shift) & 15];
                State->LineText[Length++] = ' ';
            }
            unsigned Letter = 0xE000 + GlyphId;
            State->LineText[Length++] = (char)(0xE0 | (Letter >> 12));
            State->LineText[Length++] = (char)(0x80 | ((Letter >> 6) & 63));
            State->LineText[Length++] = (char)(0x80 | (Letter & 63));
        }
        if (Color != 0x10000) State->LineText[Length++] = '#';
        State->LineText[Length] = 0;
        if (Length > TextBudget) break;
        TextBudget -= Length;
        State->Fonts[Visible].line_height = (int16_t)FontHeight;
        lv_obj_t *Label = State->Labels[Visible];
        lv_obj_set_width(Label, 448 - Row->Inset * 2);
        lv_obj_align(Label, 1, 16 + Row->Inset * 2, (lv_coord_t)Top);
        lv_obj_set_style_bg_color(Label, lv_color_hex(Kind == 1 ? 0x111C2A : 0x181F2B), LV_PART_MAIN);
        lv_obj_set_style_bg_opa(Label, Kind ? 255 : 0, LV_PART_MAIN);
        lv_label_set_text(Label, State->LineText);
        Top += Height;
        ++Visible;
    }
    FormatPosition(State);
}

static void ScrollMarkdown(MarkdownState *State, int Delta)
{
    if (!State->Active || State->RowCount == 0) return;
    int Position = (int)State->ScrollRow + Delta;
    if (Position < 0) Position = 0;
    if ((unsigned)Position >= State->RowCount) Position = (int)State->RowCount - 1;
    State->ScrollRow = (unsigned)Position;
    State->RenderPending = 1;
}

void InitializeMarkdown(MarkdownState *State, ScreenUi *Ui)
{
    State->Ui = Ui;
    for (unsigned Index = 0; Index < MarkdownVisibleRows; ++Index) {
        State->Fonts[Index] = (lv_font_t){0};
        State->Fonts[Index].get_glyph_dsc = GetGlyphDescription;
        State->Fonts[Index].get_glyph_bitmap = GetGlyphBitmap;
        State->Fonts[Index].line_height = 24;
        State->Fonts[Index].dsc = State;
        lv_obj_t *Label = lv_label_create(Ui->Screen);
        State->Labels[Index] = Label;
        lv_obj_set_style_text_font(Label, State->Fonts + Index, LV_PART_MAIN);
        lv_obj_set_style_text_align(Label, 1, LV_PART_MAIN);
        lv_obj_set_style_pad_all(Label, 0, LV_PART_MAIN);
        lv_obj_set_style_text_line_space(Label, 0, LV_PART_MAIN);
#ifdef NativeScreenUi
        /* The native label static-text/recolor bits at +0x38 match the observed
         * setter and bundled LVGL layout; only the recolor bit is enabled. */
        *(uint8_t *)((uintptr_t)Label + 0x38) |= 0x10;
#else
        lv_label_set_recolor(Label, true);
#endif
        lv_label_set_text(Label, "");
    }
}

void QueueMarkdown(MarkdownState *State, const uint8_t *Request, unsigned Length)
{
    if (Length == 0 || Length > sizeof(State->Request)) { State->LastError = 3; return; }
    if (__atomic_load_n(&State->Pending, __ATOMIC_ACQUIRE)) return;
    for (unsigned Index = 0; Index < Length; ++Index) State->Request[Index] = Request[Index];
    State->RequestLength = Length;
    State->LastOperation = Request[0];
    State->LastError = 1;
    __atomic_store_n(&State->Pending, 1, __ATOMIC_RELEASE);
}
void GetMarkdownStatus(MarkdownState *State, uint8_t Reply[32])
{
    for (unsigned Index = 0; Index < 32; ++Index) Reply[Index] = 0;
    Reply[0] = 'M'; Reply[1] = 'D'; Reply[2] = 'U'; Reply[3] = 'I';
    Reply[4] = 1;
    Reply[5] = __atomic_load_n(&State->Pending, __ATOMIC_ACQUIRE) ? 1 : (uint8_t)State->LastError;
    Reply[6] = (uint8_t)State->LastOperation;
    Reply[7] = (uint8_t)State->Active;
    Reply[8] = (uint8_t)State->Session; Reply[9] = (uint8_t)(State->Session >> 8);
    Write32(Reply + 12, State->Received);
    Write32(Reply + 16, State->Total);
    Write32(Reply + 20, State->ScrollRow);
    Write32(Reply + 24, State->RowCount);
    Write32(Reply + 28, State->SourceBytes);
}
void UpdateMarkdown(MarkdownState *State)
{
    int32_t Delta = __atomic_exchange_n(&State->ScrollDelta, 0, __ATOMIC_ACQ_REL);
    if (Delta) ScrollMarkdown(State, Delta);
    if (__atomic_load_n(&State->Pending, __ATOMIC_ACQUIRE)) {
        const uint8_t *Request = State->Request;
        unsigned Length = State->RequestLength, Operation = Request[0], Error = 0;
        unsigned Session = Length >= 3 ? Read16(Request + 1) : 0;
        if (Operation == 1 && Length == 15) {
            unsigned Total = Read32(Request + 3), SourceBytes = Read32(Request + 11);
            if (Total < 32 || Total > MarkdownMaximumBytes || SourceBytes > 65536 || !Session) Error = 3;
            else {
                ClearRows(State);
                State->Active = 0;
                if (State->Package) lv_mem_free(State->Package);
                State->Package = lv_mem_alloc(Total);
                State->Total = Total; State->Received = 0; State->RowCount = 0; State->ScrollRow = 0;
                State->ExpectedCrc = Read32(Request + 7); State->Crc = 0xFFFFFFFF;
                State->Session = (uint16_t)Session; State->SourceBytes = SourceBytes;
                SetScreenUiMessage(State->Ui, "Receiving Markdown...");
                SetScreenUiStatus(State->Ui, "USB transfer");
                if (!State->Package) Error = 4;
            }
        } else if (Length < 3 || Session != State->Session) Error = 6;
        else if (Operation == 2 && Length > 7 && State->Package && !State->Active) {
            unsigned Offset = Read32(Request + 3), Count = Length - 7;
            if (Offset != State->Received || Count > State->Total - State->Received) Error = 3;
            else {
                for (unsigned Index = 0; Index < Count; ++Index) State->Package[Offset + Index] = Request[7 + Index];
                State->Crc = UpdateCrc(State->Crc, Request + 7, Count);
                State->Received += Count;
            }
        } else if (Operation == 3 && Length == 3 && State->Package && !State->Active) {
            if (State->Received != State->Total || (State->Crc ^ 0xFFFFFFFFu) != State->ExpectedCrc) Error = 5;
            else if (!ValidateDocument(State)) Error = 3;
            else {
                State->Active = 1;
                State->RenderPending = 1;
                SetScreenUiTitle(State->Ui, "NEOS75 Markdown");
                SetScreenUiMessage(State->Ui, "");
            }
        } else if (Operation == 4 && Length == 5 && State->Active) ScrollMarkdown(State, (int16_t)Read16(Request + 3));
        else Error = 3;
        State->LastError = Error;
        __atomic_store_n(&State->Pending, 0, __ATOMIC_RELEASE);
    }
    if (State->RenderPending) {
        State->RenderPending = 0;
        RenderMarkdown(State);
    }
}
void RecordMarkdownControl(MarkdownState *State, const uint8_t *Packet, unsigned Length)
{
    if (Length < 5 || Packet[1] == 0x35) return;
    unsigned Index = State->LegacyCount & 7;
    if (Length > 16) Length = 16;
    for (unsigned Position = 0; Position < Length; ++Position) State->LegacyPackets[Index][Position] = Packet[Position];
    State->LegacyLengths[Index] = (uint8_t)Length;
    State->LegacyCount++;
    if (Length == 7 && Packet[1] == 0x39 && Packet[2] == 0 && Packet[3] == 2 &&
        (Packet[5] == 1 || Packet[5] == 2)) {
        State->LastKnobValue = Packet[5];
        State->KnobEvents++;
        __atomic_fetch_add(&State->ScrollDelta, Packet[5] == 1 ? 1 : -1, __ATOMIC_RELEASE);
    }
}
void GetMarkdownControl(MarkdownState *State, unsigned Index, uint8_t Reply[24])
{
    for (unsigned Position = 0; Position < 24; ++Position) Reply[Position] = 0;
    Write32(Reply, State->LegacyCount);
    Reply[5] = (uint8_t)State->LastKnobValue;
    Reply[6] = (uint8_t)State->KnobEvents;
    if (Index > 7 || Index >= State->LegacyCount) return;
    unsigned Slot = (State->LegacyCount - 1 - Index) & 7;
    Reply[4] = State->LegacyLengths[Slot];
    for (unsigned Position = 0; Position < Reply[4]; ++Position) Reply[8 + Position] = State->LegacyPackets[Slot][Position];
}
