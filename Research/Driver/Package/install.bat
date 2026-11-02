@echo off
rem UB32 Bootloader WinUSB driver installer (single-file package)
rem driver_installer.exe (libwdi) borrowed from UBEST Toolbox

rem --- self-elevate to administrator (-Wait keeps the package temp folder alive) ---
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting administrator rights, please confirm the UAC prompt...
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath '%~f0' -Verb RunAs -Wait"
    exit /b
)

cd /d "%~dp0"

echo.
echo Installing WinUSB driver, device will show as "UB32 Bootloader" ...
echo.

driver_installer.exe --all --force "%~dp0drivers.txt"

echo.
echo ==============================================================
echo Done. If installation succeeded, go back to the web page and
echo click "Retry Upgrade".
echo Tip: if it still fails, replug the keyboard or re-enter DFU
echo mode, then retry.
echo ==============================================================
pause
