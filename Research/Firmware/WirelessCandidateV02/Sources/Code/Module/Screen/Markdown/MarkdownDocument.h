#ifndef MarkdownDocumentH
#define MarkdownDocumentH
#include "ScreenUi.h"

enum { MarkdownMaximumBytes = 262144, MarkdownVisibleRows = 24 };
typedef struct {
    char Magic[4];
    uint16_t Version, Width;
    uint32_t Height, SourceBytes, Rows, Glyphs, GlyphOffset, BitmapOffset;
} MarkdownHeader;
typedef struct { uint32_t Offset; uint16_t Count; uint8_t Height, Inset; } MarkdownRow;
typedef struct {
    uint32_t Offset;
    uint16_t Color, Width;
    uint8_t Height, Advance;
    uint16_t Reserved;
} MarkdownGlyph;
typedef struct {
    ScreenUi *Ui;
    uint8_t *Package;
    uint32_t Total, Received, ExpectedCrc, Crc, SourceBytes;
    uint32_t ScrollRow, RowCount, GlyphCount, GlyphOffset, Active;
    uint32_t RenderPending, LastOperation, LastError;
    uint16_t Session;
    uint16_t Reserved;
    volatile uint32_t Pending;
    uint32_t RequestLength;
    uint8_t Request[60];
    lv_obj_t *Labels[MarkdownVisibleRows];
    lv_font_t Fonts[MarkdownVisibleRows];
    char LineText[4096];
    uint8_t LegacyPackets[8][16];
    uint8_t LegacyLengths[8];
    volatile uint32_t LegacyCount;
    uint32_t LastKnobValue, KnobInitialized, KnobEvents;
    volatile int32_t ScrollDelta;
} MarkdownState;

void InitializeMarkdown(MarkdownState *State, ScreenUi *Ui);
void UpdateMarkdown(MarkdownState *State);
void QueueMarkdown(MarkdownState *State, const uint8_t *Request, unsigned Length);
void GetMarkdownStatus(MarkdownState *State, uint8_t Reply[32]);
void RecordMarkdownControl(MarkdownState *State, const uint8_t *Packet, unsigned Length);
void GetMarkdownControl(MarkdownState *State, unsigned Index, uint8_t Reply[24]);
#endif
