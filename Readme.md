# Neos75

NEOS75 键盘与屏幕固件定制的协议调查、原厂固件和离线分析工具。当前已完成 VIA/Vial 实机读取与 UI 资源拆分，尚未取得原厂可编译工程。

可编程屏幕 UI 已完成实机固件接入并刷入：`Code/Module/Screen/ScreenUi.c` 使用屏幕原生 LVGL 创建标题、正文和状态控件，正文显示 `hellow world`，设备端定时器更新运行时间。三页修改及整个应用区均已回读校验，屏幕 USB 持续在线；用户暂时通过远程操作，物理屏幕显示仍待现场确认。记录见 [实机刷写记录](Research/Screen/Flash20261102T071349Z/Report.json) 和 [屏幕 UI](Documentation/ScreenUi.txt)。

修改 [屏幕配置](Code/Module/Screen/Device/ScreenUiConfiguration.json) 后构建并安装：

```powershell
.\Tools\Python39\python.exe -B Code\Module\Screen\Utilities\BuildScreenUiFirmware.py
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InstallScreenUiFirmware.py --EnterDfu
```

构建只支持已双份备份确认的实机固件。原厂源码/SDK 尚未取得；设备接入采用原生函数桥接，包含故障返回 DFU 和 UI 线程超时保护。当前文字修改通过重新构建/刷写生效，电脑端运行时更新协议尚未实现。便携 Arm LLVM 已位于忽略的 `Tools/ArmCompiler/Runtime`；新检出仓库时先运行 `InstallArmCompiler.py` 下载固定版本。

Windows 预览保留，运行同一份界面代码：

```powershell
.\Tools\Python39\python.exe -B Code\Module\Screen\Utilities\BuildScreenUiPreview.py
.\Code\Module\Screen\Runtime\ScreenUiPreview.exe
```

预览构建使用已安装的 Visual Studio C 工具链及 `Tools/Lvgl` 中的 LVGL 8.3.11 源码。`Preview/LvConf.h` 仅供电脑预览，不能当作原厂硬件配置直接刷入。

```text
Code/
  Module/
    Keyboard/Utilities/   ReadKeyboard.py
    Screen/Device/        设备桥接、原生接口指纹、配置与故障恢复入口
    Screen/Utilities/     只读查询、预览构建、固件构建
    Firmware/Utilities/   固件分析、双份备份、屏幕 UI 刷写与恢复
    Vendor/Utilities/     DecodeVendorChunk.cjs、DecodeVendorIndex.cjs、VendorStringUtilities.cjs
Documentation/            调查记录和 SDK 咨询草稿
Research/
  Device/                 键盘读取快照
  Screen/                 屏幕读取快照
  Firmware/               原厂升级包与分析结果
  UiResources/            拆分的原厂 UI 资源
  Vendor/                 官方网页驱动归档与解码结果
  Reference/              Vial 协议参考源码归档
  Provenance.json         归档文件的原名称、现路径与 SHA256
Tools/
  Python39/               便携 Python 3.9.11、hidapi、Capstone
  Dfu/                    dfu-util 0.11 与上游许可证
  ArmCompiler/            便携编译器的来源与安装入口
  Environment.json        环境来源及版本
```

项目自有目录、文件名、函数、变量及参数使用 PascalCase。`.gitignore`、`AGENTS.md`、`LICENSE`、Python/Node 标准标识符、外部库 API、协议和既有数据字段遵循其规定名称；便携运行环境和第三方归档的内部内容保留原样。归档文件统一改名，原名称可通过 `Research/Provenance.json` 查回。

所有命令从仓库根目录运行。Python 已自带，无需系统安装。

```powershell
# 仅枚举键盘，不发送报文
.\Tools\Python39\python.exe -B Code\Module\Keyboard\Utilities\ReadKeyboard.py --Enumerate

# 读取键位和双旋钮映射，保存新快照
.\Tools\Python39\python.exe -B Code\Module\Keyboard\Utilities\ReadKeyboard.py --ReadEncoders

# 读取屏幕信息
.\Tools\Python39\python.exe -B Code\Module\Screen\Utilities\ReadScreen.py

# 离线分析原厂固件 / 拆分 UI 资源
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InspectFirmware.py
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\ExtractUiResources.py
```

Python 工具支持 `--help`，读取工具支持 `--OutputDirectory` 指定快照目录；离线分析支持指定输入与输出位置。默认输出目录为对应的 `Research` 子目录。

网页驱动解码工具需要 Node.js，仅读取归档文件并执行抽取出的字符串解码函数，不运行网页应用：

```powershell
node Code\Module\Vendor\Utilities\DecodeVendorChunk.cjs ScreenSettings.js KeyboardUpgrade.js
node Code\Module\Vendor\Utilities\DecodeVendorIndex.cjs
```

这两个入口也支持 `--OutputDirectory <Directory>`。原厂驱动使用的旧文件名仍可通过来源映射定位。

仓库不保留测试代码或验证产物。只读协议探测和固件分析是正式工具，运行时的边界检查会保留。

具体发现、固件来源和待确认问题见 [调查记录](Documentation/ResearchNotes.txt)。屏幕协议回报 320×320，而实机程序的 LVGL 显示初始化为 480×360；这一差异仍有保留，不能按协议尺寸推断物理面板。
