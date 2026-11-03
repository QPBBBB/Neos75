"""Compile Markdown into bounded, styled text rows and a document glyph atlas.

The screen keeps structured rows and font glyphs, not a full-document image.
External parser token keys and Pillow API names retain their upstream spelling.
"""
import hashlib as Hashlib
import html as Html
import io as Io
import math as Math
import struct as Struct
import unicodedata as Unicode
import urllib.parse as UrlParsing
import urllib.request as Request
from html.parser import HTMLParser as HtmlParser
from pathlib import Path
import mistune as Mistune
from PIL import Image, ImageDraw, ImageFont

MaximumSourceBytes = 65536
MaximumPackageBytes = 262144
MaximumGlyphBytes = 98304
MaximumGlyphs = 6400
Header = Struct.Struct('<4sHH6I')
RowRecord = Struct.Struct('<IHBB')
GlyphRecord = Struct.Struct('<IHHBBH')


class HtmlText(HtmlParser):
    def __init__(Self):
        super().__init__()
        Self.Parts, Self.Hidden = [], 0

    def handle_starttag(Self, Tag, Attributes):
        if Tag in ('script', 'style'):
            Self.Hidden += 1
        if Tag in ('br', 'p', 'div', 'li', 'tr', 'h1', 'h2', 'h3', 'pre'):
            Self.Parts.append('\n')

    def handle_endtag(Self, Tag):
        if Tag in ('script', 'style'):
            Self.Hidden = max(0, Self.Hidden - 1)
        if Tag in ('p', 'div', 'li', 'tr', 'h1', 'h2', 'h3', 'pre'):
            Self.Parts.append('\n')

    def handle_data(Self, Data):
        if not Self.Hidden:
            Self.Parts.append(Data)


class MarkdownCompiler:
    def __init__(Self, Width=480, Height=360, BaseDirectory=None, AllowRemoteImages=False):
        if (Width, Height) != (480, 360):
            raise ValueError('The verified device layout is 480 x 360')
        Self.Width, Self.Height = Width, Height
        Self.ContentWidth = Width - 32
        Self.BaseDirectory = Path(BaseDirectory or Path.cwd())
        Self.AllowRemoteImages = AllowRemoteImages
        Self.Fonts, Self.GlyphKeys, Self.Glyphs, Self.Bitmaps = {}, {}, [], bytearray()
        Self.Rows, Self.Warnings = [], []
        Self.Parser = Mistune.create_markdown(renderer='ast', plugins=['table', 'strikethrough', 'task_lists', 'url'])

    def Font(Self, Size, Bold=False, Code=False):
        Key = (Size, Bold, Code)
        if Key not in Self.Fonts:
            Name = ('consolab.ttf' if Bold else 'consola.ttf') if Code else ('msyhbd.ttc' if Bold else 'msyh.ttc')
            File = Path('C:/Windows/Fonts') / Name
            if not File.is_file():
                raise FileNotFoundError('Required Windows font not found: ' + str(File))
            Self.Fonts[Key] = ImageFont.truetype(str(File), Size)
        return Self.Fonts[Key]

    def AddBitmap(Self, Key, Bitmap, Advance, Color):
        if Key in Self.GlyphKeys:
            return Self.GlyphKeys[Key]
        if len(Self.Glyphs) >= MaximumGlyphs:
            raise ValueError('Document exceeds the separate 6400-glyph resource limit')
        Width, Height = Bitmap.size if Bitmap is not None else (0, 0)
        if Width > 240 or Height > 63 or not 0 <= Advance <= 255:
            raise ValueError('Glyph dimensions exceed the device format')
        Offset = len(Self.Bitmaps)
        if Bitmap is not None:
            Pixels = Bitmap.convert('1').getdata()
            Packed = bytearray((Width * Height + 7) // 8)
            for Index, Pixel in enumerate(Pixels):
                if Pixel:
                    Packed[Index // 8] |= 128 >> (Index & 7)
            Self.Bitmaps.extend(Packed)
        if len(Self.Bitmaps) > MaximumGlyphBytes:
            raise ValueError('Document exceeds the separate 96 KiB glyph/image resource limit')
        Red, Green, Blue = Color
        Rgb565 = (Red >> 3) << 11 | (Green >> 2) << 5 | (Blue >> 3)
        Glyph = len(Self.Glyphs)
        Self.Glyphs.append((Offset, Rgb565, Width, Height, Advance, 0))
        Self.GlyphKeys[Key] = Glyph
        return Glyph

    def Glyph(Self, Character, Size=18, Bold=False, Italic=False, Strike=False, Code=False, Color=(224, 228, 235)):
        Key = ('Text', Character, Size, Bold, Italic, Strike, Code, Color)
        if Key in Self.GlyphKeys:
            return Self.GlyphKeys[Key]
        Font = Self.Font(Size, Bold, Code)
        Ascent, Descent = Font.getmetrics()
        CellHeight = Ascent + Descent
        Advance = max(1, int(Math.ceil(Font.getlength(Character))))
        if Character.isspace():
            return Self.AddBitmap(Key, None, Advance, Color)
        Bitmap = Image.new('L', (Advance + (Size // 4 if Italic else 2), CellHeight), 0)
        Drawing = ImageDraw.Draw(Bitmap)
        Drawing.text((0, 0), Character, font=Font, fill=255)
        if Strike:
            Drawing.line((0, CellHeight // 2, Advance, CellHeight // 2), fill=255, width=1)
        if Italic:
            Bitmap = Bitmap.transform(Bitmap.size, Image.Transform.AFFINE, (1, 0.18, -CellHeight * 0.18, 0, 1, 0))
        return Self.AddBitmap(Key, Bitmap, Advance, Color)

    def Text(Self, Text, **Style):
        Text = Unicode.normalize('NFC', Html.unescape(Text)).replace('\t', '    ')
        return [None if Character == '\n' else Self.Glyph(Character, **Style) for Character in Text if Character != '\r']

    def Spacer(Self, Width):
        Result = []
        while Width > 0:
            Part = min(255, Width)
            Result.append(Self.AddBitmap(('Space', Part), None, Part, (224, 228, 235)))
            Width -= Part
        return Result

    def Advance(Self, Glyphs):
        return sum(Self.Glyphs[Glyph][4] for Glyph in Glyphs if Glyph is not None)

    def Wrap(Self, Glyphs, Width):
        Rows, Current, Used = [], [], 0
        for Glyph in Glyphs:
            if Glyph is None:
                Rows.append(Current)
                Current, Used = [], 0
                continue
            Advance = Self.Glyphs[Glyph][4]
            if Current and Used + Advance > Width:
                Breaks = [Index for Index, Item in enumerate(Current) if Self.Glyphs[Item][2] == 0 and Self.Glyphs[Item][4] > 0]
                if Breaks and Breaks[-1] > 0:
                    Break = Breaks[-1]
                    Rows.append(Current[:Break])
                    Current = Current[Break + 1:]
                    Used = Self.Advance(Current)
                else:
                    Rows.append(Current)
                    Current, Used = [], 0
            Current.append(Glyph)
            Used += Advance
            if len(Current) > 512:
                raise ValueError('A text row exceeds the bounded 512-glyph layout limit')
        if Current or not Rows:
            Rows.append(Current)
        return Rows

    def AddRow(Self, Glyphs, Inset=0, Kind=0, Gap=3):
        if len(Self.Rows) >= 32768:
            raise ValueError('Document exceeds the layout-row limit')
        Height = max([Self.Glyphs[Glyph][3] for Glyph in Glyphs] + [22])
        Height = min(63, Height + Gap)
        Self.Rows.append((list(Glyphs), Height | Kind << 6, min(255, Inset // 2)))

    def AddText(Self, Glyphs, Inset=0, Kind=0, Gap=6):
        Rows = Self.Wrap(Glyphs, Self.ContentWidth - Inset)
        for Index, Row in enumerate(Rows):
            Self.AddRow(Row, Inset, Kind, Gap if Index + 1 == len(Rows) else 1)

    def Inline(Self, Tokens, Style=None):
        Style = dict(Style or {})
        Result = []
        for Token in Tokens:
            Kind = Token['type']
            if Kind in ('text', 'inline_html'):
                Raw = Token.get('raw', '')
                if Kind == 'inline_html':
                    Tag = Raw.lower().strip()
                    if Tag.startswith('<br'):
                        Result.append(None)
                    elif Tag in ('<b>', '<strong>'):
                        Style['Bold'] = True
                    elif Tag in ('</b>', '</strong>'):
                        Style['Bold'] = False
                    elif Tag in ('<i>', '<em>'):
                        Style['Italic'] = True
                    elif Tag in ('</i>', '</em>'):
                        Style['Italic'] = False
                    continue
                Result.extend(Self.Text(Raw, **Style))
            elif Kind in ('softbreak', 'linebreak'):
                Result.extend([None] if Kind == 'linebreak' else Self.Text(' ', **Style))
            elif Kind == 'codespan':
                CodeStyle = dict(Style, Code=True, Color=(244, 202, 129))
                Result.extend(Self.Text(Token['raw'], **CodeStyle))
            elif Kind == 'image':
                Result.append(('Image', Token))
            else:
                Nested = dict(Style)
                if Kind == 'strong':
                    Nested['Bold'] = True
                elif Kind == 'emphasis':
                    Nested['Italic'] = True
                elif Kind == 'strikethrough':
                    Nested['Strike'] = True
                elif Kind == 'link':
                    Nested['Color'] = (104, 192, 246)
                Result.extend(Self.Inline(Token.get('children', []), Nested))
        return Result

    def Paragraph(Self, Tokens, Style=None, Inset=0, Kind=0, Prefix=None):
        Current = list(Prefix or [])
        for Item in Self.Inline(Tokens, Style):
            if isinstance(Item, tuple):
                if Current:
                    Self.AddText(Current, Inset, Kind)
                    Current = []
                Self.Picture(Item[1], Inset)
            else:
                Current.append(Item)
        if Current:
            Self.AddText(Current, Inset, Kind)

    def Picture(Self, Token, Inset=0):
        Url = Token.get('attrs', {}).get('url', '')
        Alt = ''.join(Child.get('raw', '') for Child in Token.get('children', []))
        Parsed = UrlParsing.urlparse(Url)
        PreviousRows, PreviousGlyphs, PreviousBytes = len(Self.Rows), len(Self.Glyphs), len(Self.Bitmaps)
        try:
            if Parsed.scheme in ('http', 'https'):
                if not Self.AllowRemoteImages:
                    raise ValueError('remote image fetching disabled')
                with Request.urlopen(Url, timeout=10) as Reply:
                    Data = Reply.read(4194305)
                if len(Data) > 4194304:
                    raise ValueError('image download exceeds 4 MiB')
                Source = Io.BytesIO(Data)
            elif Parsed.scheme:
                raise ValueError('unsupported image URI scheme')
            else:
                Source = Self.BaseDirectory / UrlParsing.unquote(Parsed.path)
            with Image.open(Source) as Opened:
                if Opened.width * Opened.height > 8000000:
                    raise ValueError('decoded image exceeds 8 megapixels')
                Picture = Opened.convert('RGBA')
                Background = Image.new('RGBA', Picture.size, (0, 0, 0, 255))
                Background.alpha_composite(Picture)
                Picture = Background.convert('RGB')
            Picture.thumbnail((Self.ContentWidth - Inset, 160), Image.Resampling.LANCZOS)
            Quantized = Picture.quantize(colors=8)
            Palette = Quantized.getpalette()
            Digest = Hashlib.sha256(Picture.tobytes()).hexdigest()
            for Top in range(0, Picture.height, 16):
                Height = min(16, Picture.height - Top)
                Row = []
                for Left in range(0, Picture.width, 224):
                    Width = min(224, Picture.width - Left)
                    Tile = Quantized.crop((Left, Top, Left + Width, Top + Height))
                    Colors = sorted(set(Tile.getdata()))
                    for Index, Color in enumerate(Colors):
                        Mask = Tile.point([255 if Value == Color else 0 for Value in range(256)], mode='L')
                        Rgb = tuple(Palette[Color * 3:Color * 3 + 3])
                        Advance = Width if Index + 1 == len(Colors) else 0
                        Row.append(Self.AddBitmap(('Image', Digest, Left, Top, Color), Mask, Advance, Rgb))
                Self.Rows.append((Row, Height, min(255, Inset // 2)))
            if Alt:
                Self.AddText(Self.Text(Alt, Size=14, Italic=True, Color=(150, 160, 176)), Inset)
        except (OSError, ValueError) as Error:
            del Self.Rows[PreviousRows:]
            del Self.Glyphs[PreviousGlyphs:]
            del Self.Bitmaps[PreviousBytes:]
            Self.GlyphKeys = {Key: Value for Key, Value in Self.GlyphKeys.items() if Value < PreviousGlyphs}
            if isinstance(Error, ValueError) and 'resource limit' in str(Error):
                raise
            Self.Warnings.append('Image ' + Url + ': ' + str(Error))
            Self.AddText(Self.Text('[Image: ' + (Alt or Url) + ']', Italic=True), Inset)

    def Table(Self, Token, Inset):
        Rows = []
        for Child in Token.get('children', []):
            if Child['type'] == 'table_head':
                Rows.append((Child['children'], True))
            else:
                Rows.extend((Row['children'], False) for Row in Child.get('children', []))
        Columns = max([len(Row[0]) for Row in Rows] + [1])
        Width = (Self.ContentWidth - Inset) // Columns
        if Width < 44 or any(isinstance(Item, tuple) for Cells, Head in Rows for Cell in Cells
            for Item in Self.Inline(Cell.get('children', []))):
            for Cells, Head in Rows:
                for Index, Cell in enumerate(Cells):
                    Self.Paragraph(Cell.get('children', []), {'Bold': Head}, Inset, 3,
                        Self.Text(str(Index + 1) + ': ', Bold=True))
            return
        Separator = Self.Glyph('|', Color=(95, 107, 125))
        for Cells, Head in Rows:
            Wrapped = [Self.Wrap([Item for Item in Self.Inline(Cell.get('children', []), {'Bold': Head, 'Size': 16})
                if not isinstance(Item, tuple)], Width - 12) for Cell in Cells]
            for Line in range(max([len(Cell) for Cell in Wrapped] + [1])):
                Glyphs = []
                for Index in range(Columns):
                    Content = Wrapped[Index][Line] if Index < len(Wrapped) and Line < len(Wrapped[Index]) else []
                    Content = [Item for Item in Content if not isinstance(Item, tuple)]
                    Padding = max(0, Width - 12 - Self.Advance(Content))
                    Align = Cells[Index].get('attrs', {}).get('align') if Index < len(Cells) else None
                    Before = Padding if Align == 'right' else Padding // 2 if Align == 'center' else 0
                    Glyphs.extend(Self.Spacer(Before) + Content + Self.Spacer(Padding - Before) + [Separator])
                Self.AddRow(Glyphs, Inset, 3 if Head else 0)

    def Blocks(Self, Tokens, Inset=0, Kind=0, Depth=0):
        if Depth > 24:
            raise ValueError('Markdown nesting exceeds 24 levels')
        for Token in Tokens:
            Type = Token['type']
            if Type in ('paragraph', 'block_text'):
                Self.Paragraph(Token.get('children', []), Inset=Inset, Kind=Kind)
            elif Type == 'heading':
                Level = Token.get('attrs', {}).get('level', 1)
                Self.Paragraph(Token.get('children', []), {'Size': max(18, 32 - Level * 2), 'Bold': True}, Inset, Kind)
            elif Type == 'block_code':
                Info = Token.get('attrs', {}).get('info', '')
                if Info:
                    Self.AddText(Self.Text(Info, Size=14, Color=(136, 160, 190)), Inset, 2, 0)
                Self.AddText(Self.Text(Token.get('raw', '').rstrip('\n'), Size=16, Code=True), Inset, 2)
            elif Type == 'block_quote':
                Self.Blocks(Token.get('children', []), min(160, Inset + 16), 1, Depth + 1)
            elif Type == 'list':
                Attributes = Token.get('attrs', {})
                for Index, Item in enumerate(Token.get('children', [])):
                    Checked = Item.get('attrs', {}).get('checked')
                    Prefix = ('[x] ' if Checked else '[ ] ') if Checked is not None else str(Attributes.get('start', 1) + Index) + '. ' if Attributes.get('ordered') else '\u2022 '
                    Children = Item.get('children', [])
                    if Children and Children[0]['type'] in ('paragraph', 'block_text'):
                        Self.Paragraph(Children[0].get('children', []), Inset=Inset, Kind=Kind, Prefix=Self.Text(Prefix))
                        Children = Children[1:]
                    Self.Blocks(Children, min(160, Inset + 16), Kind, Depth + 1)
            elif Type == 'table':
                Self.Table(Token, Inset)
            elif Type == 'thematic_break':
                Self.AddText(Self.Text('\u2500' * 26, Color=(95, 107, 125)), Inset)
            elif Type == 'block_html':
                Extractor = HtmlText()
                Extractor.feed(Token.get('raw', ''))
                Self.AddText(Self.Text(''.join(Extractor.Parts).strip()), Inset, Kind)

    def Compile(Self, Source):
        Raw = Source.encode('utf-8')
        if len(Raw) > MaximumSourceBytes or '\0' in Source:
            raise ValueError('Markdown must contain no NUL and be at most 65536 UTF-8 bytes')
        Self.Blocks(Self.Parser(Source))
        if not Self.Rows:
            Self.AddText(Self.Text('(empty document)', Color=(136, 146, 164)))
        RowOffset = Header.size
        GlyphOffset = RowOffset + len(Self.Rows) * RowRecord.size
        TextOffset = GlyphOffset + len(Self.Glyphs) * GlyphRecord.size
        RowBytes, TextBytes = bytearray(), bytearray()
        for Glyphs, Height, Inset in Self.Rows:
            PreviousColor, EncodedBytes = None, len(Glyphs) * 3
            for Glyph in Glyphs:
                if Self.Glyphs[Glyph][1] != PreviousColor:
                    EncodedBytes += 9
                    PreviousColor = Self.Glyphs[Glyph][1]
            if EncodedBytes >= 4096:
                raise ValueError('A styled row exceeds the bounded device text buffer')
            RowBytes.extend(RowRecord.pack(TextOffset + len(TextBytes), len(Glyphs), Height, Inset))
            TextBytes.extend(Struct.pack('<' + 'H' * len(Glyphs), *Glyphs))
        BitmapOffset = TextOffset + len(TextBytes)
        GlyphBytes = b''.join(GlyphRecord.pack(BitmapOffset + Offset, Color, Width, Height, Advance, Reserved)
            for Offset, Color, Width, Height, Advance, Reserved in Self.Glyphs)
        Total = BitmapOffset + len(Self.Bitmaps)
        if Total > MaximumPackageBytes:
            raise ValueError('Compiled document exceeds 256 KiB device budget; reduce document complexity or image resources')
        Package = Header.pack(b'NSMD', 1, Self.Width, Self.Height, len(Raw), len(Self.Rows), len(Self.Glyphs), GlyphOffset, BitmapOffset)
        Package += RowBytes + GlyphBytes + TextBytes + Self.Bitmaps
        return Package

    def Preview(Self, File, ScrollRow=0):
        Canvas = Image.new('RGB', (Self.Width, Self.Height), (10, 13, 18))
        Drawing = ImageDraw.Draw(Canvas)
        Top = 16
        for Glyphs, PackedHeight, Inset in Self.Rows[ScrollRow:]:
            Height, Kind = PackedHeight & 63, PackedHeight >> 6
            if Top + Height > Self.Height - 20:
                break
            Left = 16 + Inset * 2
            if Kind in (2, 3):
                Drawing.rectangle((12, Top, Self.Width - 12, Top + Height - 1), fill=(24, 31, 43))
            if Kind == 1:
                Drawing.rectangle((12, Top, 14, Top + Height - 1), fill=(87, 124, 165))
            for Glyph in Glyphs:
                Offset, Color, Width, GlyphHeight, Advance, Reserved = Self.Glyphs[Glyph]
                if Width and GlyphHeight:
                    Bits = Self.Bitmaps[Offset:Offset + (Width * GlyphHeight + 7) // 8]
                    Mask = Image.new('L', (Width, GlyphHeight))
                    Mask.putdata([255 if Bits[Index // 8] & (128 >> (Index & 7)) else 0 for Index in range(Width * GlyphHeight)])
                    Rgb = ((Color >> 11) * 255 // 31, ((Color >> 5) & 63) * 255 // 63, (Color & 31) * 255 // 31)
                    Canvas.paste(Rgb, (Left, Top, Left + Width, Top + GlyphHeight), Mask)
                Left += Advance
            Top += Height
        Drawing.text((16, Self.Height - 18), str(ScrollRow + 1) + ' / ' + str(len(Self.Rows)), font=Self.Font(12), fill=(130, 147, 170))
        File = Path(File)
        File.parent.mkdir(parents=True, exist_ok=True)
        Canvas.save(File)
