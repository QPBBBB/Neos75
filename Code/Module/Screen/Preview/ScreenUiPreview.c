#define UNICODE
#define _UNICODE
#include <windows.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>
#include <wchar.h>
#include "../ScreenUi.h"

static ScreenUi Ui;
static lv_color_t DrawPixels[480 * 24];
static lv_color_t FramePixels[480 * 480];
static lv_disp_draw_buf_t DrawBuffer;
static lv_disp_drv_t DisplayDriver;
static HWND PreviewWindow;
static HWND TitleEditor;
static HWND MessageEditor;
static HWND StatusEditor;
static int ScreenWidth = 320;
static int ScreenHeight = 320;
static ULONGLONG LastTick;
static BOOL Ready;

static void FlushPreview(lv_disp_drv_t *Driver, const lv_area_t *Area, lv_color_t *Colors)
{
    for (int Row = Area->y1; Row <= Area->y2; Row++)
    {
        for (int Column = Area->x1; Column <= Area->x2; Column++)
        {
            if (Row >= 0 && Row < ScreenHeight && Column >= 0 && Column < ScreenWidth)
                FramePixels[Row * ScreenWidth + Column] = *Colors;
            Colors++;
        }
    }
    lv_disp_flush_ready(Driver);
    if (PreviewWindow != NULL) InvalidateRect(PreviewWindow, NULL, FALSE);
}

static void ApplyEditor(HWND Editor, void (*Apply)(ScreenUi *Ui, const char *Text))
{
    WCHAR WideText[512];
    char Utf8Text[2048];
    GetWindowTextW(Editor, WideText, 512);
    WideCharToMultiByte(CP_UTF8, 0, WideText, -1, Utf8Text, sizeof(Utf8Text), NULL, NULL);
    Apply(&Ui, Utf8Text);
    lv_refr_now(NULL);
}

static void SetEditors(void)
{
    ApplyEditor(TitleEditor, SetScreenUiTitle);
    ApplyEditor(MessageEditor, SetScreenUiMessage);
    ApplyEditor(StatusEditor, SetScreenUiStatus);
}

static void WriteSnapshot(const WCHAR *FileName)
{
    BITMAPFILEHEADER FileHeader = {0};
    BITMAPINFOHEADER ImageHeader = {0};
    FILE *File = NULL;
    WCHAR FilePath[MAX_PATH];
    DWORD PathLength = GetModuleFileNameW(NULL, FilePath, MAX_PATH);
    if (PathLength == 0 || PathLength >= MAX_PATH) return;
    WCHAR *FileNameStart = wcsrchr(FilePath, L'\\');
    if (FileNameStart == NULL) return;
    if (wcscpy_s(FileNameStart + 1, MAX_PATH - (FileNameStart + 1 - FilePath), FileName) != 0) return;
    _wfopen_s(&File, FilePath, L"wb");
    if (File == NULL) return;
    FileHeader.bfType = 0x4D42;
    FileHeader.bfOffBits = sizeof(FileHeader) + sizeof(ImageHeader);
    FileHeader.bfSize = FileHeader.bfOffBits + ScreenWidth * ScreenHeight * 4;
    ImageHeader.biSize = sizeof(ImageHeader);
    ImageHeader.biWidth = ScreenWidth;
    ImageHeader.biHeight = -ScreenHeight;
    ImageHeader.biPlanes = 1;
    ImageHeader.biBitCount = 32;
    ImageHeader.biCompression = BI_RGB;
    fwrite(&FileHeader, sizeof(FileHeader), 1, File);
    fwrite(&ImageHeader, sizeof(ImageHeader), 1, File);
    fwrite(FramePixels, 4, ScreenWidth * ScreenHeight, File);
    fclose(File);
}

static LRESULT CALLBACK HandleWindow(HWND Window, UINT Message, WPARAM FirstParameter, LPARAM SecondParameter)
{
    switch (Message)
    {
        case WM_CREATE:
        {
            int EditorLeft = ScreenWidth + 40;
            CreateWindowW(L"STATIC", L"Live LVGL content", WS_CHILD | WS_VISIBLE, EditorLeft, 16, 280, 24, Window, NULL, NULL, NULL);
            CreateWindowW(L"STATIC", L"Title", WS_CHILD | WS_VISIBLE, EditorLeft, 52, 280, 20, Window, NULL, NULL, NULL);
            TitleEditor = CreateWindowExW(WS_EX_CLIENTEDGE, L"EDIT", L"", WS_CHILD | WS_VISIBLE | WS_TABSTOP | ES_AUTOHSCROLL,
                                         EditorLeft, 76, 280, 28, Window, (HMENU)101, NULL, NULL);
            CreateWindowW(L"STATIC", L"Message", WS_CHILD | WS_VISIBLE, EditorLeft, 116, 280, 20, Window, NULL, NULL, NULL);
            MessageEditor = CreateWindowExW(WS_EX_CLIENTEDGE, L"EDIT", L"hellow world", WS_CHILD | WS_VISIBLE | WS_TABSTOP | ES_AUTOHSCROLL,
                                           EditorLeft, 140, 280, 28, Window, (HMENU)102, NULL, NULL);
            CreateWindowW(L"STATIC", L"Status / live value", WS_CHILD | WS_VISIBLE, EditorLeft, 180, 280, 20, Window, NULL, NULL, NULL);
            StatusEditor = CreateWindowExW(WS_EX_CLIENTEDGE, L"EDIT", L"", WS_CHILD | WS_VISIBLE | WS_TABSTOP | ES_AUTOHSCROLL,
                                          EditorLeft, 204, 280, 28, Window, (HMENU)103, NULL, NULL);
            CreateWindowW(L"STATIC", L"Edits update real LVGL labels immediately.\r\nPreview runs on this PC; device integration is pending.",
                          WS_CHILD | WS_VISIBLE, EditorLeft, 254, 290, 64, Window, NULL, NULL, NULL);
            CreateWindowW(L"BUTTON", L"Export current UI as BMP", WS_CHILD | WS_VISIBLE | WS_TABSTOP,
                          EditorLeft, 328, 280, 28, Window, (HMENU)104, NULL, NULL);
            SetTimer(Window, 1, 16, NULL);
            return 0;
        }
        case WM_COMMAND:
            if (Ready && HIWORD(FirstParameter) == EN_CHANGE) SetEditors();
            if (Ready && LOWORD(FirstParameter) == 104 && HIWORD(FirstParameter) == BN_CLICKED)
                WriteSnapshot(L"ScreenUiPreview.bmp");
            return 0;
        case WM_TIMER:
            if (Ready)
            {
                ULONGLONG CurrentTick = GetTickCount64();
                lv_tick_inc((uint32_t)(CurrentTick - LastTick));
                LastTick = CurrentTick;
                lv_timer_handler();
            }
            return 0;
        case WM_PAINT:
        {
            PAINTSTRUCT Paint;
            HDC DeviceContext = BeginPaint(Window, &Paint);
            BITMAPINFO Information = {0};
            Information.bmiHeader.biSize = sizeof(BITMAPINFOHEADER);
            Information.bmiHeader.biWidth = ScreenWidth;
            Information.bmiHeader.biHeight = -ScreenHeight;
            Information.bmiHeader.biPlanes = 1;
            Information.bmiHeader.biBitCount = 32;
            Information.bmiHeader.biCompression = BI_RGB;
            StretchDIBits(DeviceContext, 16, 16, ScreenWidth, ScreenHeight, 0, 0, ScreenWidth, ScreenHeight,
                          FramePixels, &Information, DIB_RGB_COLORS, SRCCOPY);
            EndPaint(Window, &Paint);
            return 0;
        }
        case WM_DESTROY:
            KillTimer(Window, 1);
            PostQuitMessage(0);
            return 0;
    }
    return DefWindowProcW(Window, Message, FirstParameter, SecondParameter);
}

int WINAPI wWinMain(HINSTANCE Instance, HINSTANCE PreviousInstance, PWSTR CommandLine, int ShowCommand)
{
    (void)PreviousInstance;
    (void)CommandLine;
    lv_init();
    lv_disp_draw_buf_init(&DrawBuffer, DrawPixels, NULL, ScreenWidth * 24);
    lv_disp_drv_init(&DisplayDriver);
    DisplayDriver.hor_res = ScreenWidth;
    DisplayDriver.ver_res = ScreenHeight;
    DisplayDriver.draw_buf = &DrawBuffer;
    DisplayDriver.flush_cb = FlushPreview;
    lv_disp_drv_register(&DisplayDriver);
    CreateScreenUi(&Ui, &lv_font_montserrat_28);
    LoadScreenUi(&Ui);
    lv_refr_now(NULL);

    WNDCLASSW WindowClass = {0};
    WindowClass.lpfnWndProc = HandleWindow;
    WindowClass.hInstance = Instance;
    WindowClass.lpszClassName = L"Neos75ScreenUiPreview";
    WindowClass.hbrBackground = (HBRUSH)(COLOR_BTNFACE + 1);
    WindowClass.hCursor = LoadCursor(NULL, IDC_ARROW);
    RegisterClassW(&WindowClass);
    RECT WindowBounds = {0, 0, ScreenWidth + 350, ScreenHeight + 80};
    AdjustWindowRect(&WindowBounds, WS_OVERLAPPEDWINDOW, FALSE);
    PreviewWindow = CreateWindowW(WindowClass.lpszClassName, L"NEOS75 - Editable LVGL UI",
                                   WS_OVERLAPPEDWINDOW, CW_USEDEFAULT, CW_USEDEFAULT,
                                   WindowBounds.right - WindowBounds.left, WindowBounds.bottom - WindowBounds.top,
                                   NULL, NULL, Instance, NULL);
    if (PreviewWindow == NULL) return 1;
    LastTick = GetTickCount64();
    Ready = TRUE;
    SetEditors();
    ShowWindow(PreviewWindow, ShowCommand);
    UpdateWindow(PreviewWindow);
    MSG Event;
    while (GetMessageW(&Event, NULL, 0, 0) > 0)
    {
        TranslateMessage(&Event);
        DispatchMessageW(&Event);
    }
    DeleteScreenUi(&Ui);
    lv_deinit();
    return 0;
}
