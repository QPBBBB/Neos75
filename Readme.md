# Neos75

NEOS75 键盘屏幕的设备端自定义 UI、VIA/Vial 配置工具与固件研究归档。UI 使用原生控件和设备定时器，在键盘屏幕独立运行；当前未取得原厂可编译工程，底层显示、USB、RTX 与 LVGL 仍复用原厂固件。

V03 已适配用户更新后的官方屏幕固件并在实机运行。启动只创建我们的自定义页面，正文为 `hellow world`，设备定时器更新运行时间；原厂页面初始化和专用定时器已从执行链移除，设备回报原厂页面对象数为 0。下方旋钮三层的旋转、按压映射均已清空，上方音量及其他按键保持原样。用户已确认彻底断电重启后全部正常。记录见 [实机刷写记录](Research/Screen/Flash20261102T090614Z/Report.json)、[旋钮记录](Research/Device/ScreenKnob20261102T090653Z/Report.json) 和 [屏幕 UI](Documentation/ScreenUi.txt)。

## 环境准备

在 Windows x64 下将仓库检出到 `D:\Git\Neos75`，下文命令均从仓库根目录运行。归档刷写计划保留了实机工作目录的绝对路径；在其他位置检出时，应重新构建计划。

| 工具 | 仓库提供 | 用途 |
| --- | --- | --- |
| Python 3.9.11、hidapi、Capstone | `Tools/Python39` | 设备读取、配置和固件工具，无需系统 Python |
| dfu-util 0.11 | `Tools/Dfu` | 屏幕应用区备份、刷写与恢复 |
| Arm LLVM 19.1.5 | 安装脚本及固定来源指纹 | 编译设备端 UI，运行环境不提交 Git |
| LVGL 8.3.11 | `Tools/Lvgl` | Windows 预览；不是原厂 LVGL 版本的确认结果 |
| Visual Studio C/C++ 工具链 | 需本机安装 | 仅构建 Windows 预览时使用，脚本通过 vswhere 查找 |
| Node.js | 需本机安装 | 仅离线解码网页驱动归档时使用，无额外 npm 依赖 |

新检出仓库先安装固定版本编译器，脚本从官方来源下载并核验 SHA256：

```powershell
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InstallArmCompiler.py
```

普通读取使用 HID。屏幕备份和刷写需要屏幕 DFU 接口 `5542:1000` 的 WinUSB 驱动；本设备已安装，相关记录见 [屏幕 UI 说明](Documentation/ScreenUi.txt)。环境来源及版本见 [Environment.json](Tools/Environment.json)，第三方许可证保留在各工具目录。

## 自定义内容与构建

修改 [屏幕配置](Code/Module/Screen/Device/ScreenUiConfiguration.json)：

```json
{
  "Title": "NEOS75 UI",
  "Message": "hellow world",
  "Status": "",
  "ShowUptime": true
}
```

`ShowUptime=true` 时由设备每秒更新 `Running HH:MM:SS`，设为 `false` 时显示 `Status`。布局和控件代码在 [ScreenUi.c](Code/Module/Screen/ScreenUi.c)，设备初始化、定时器与协议入口在 [DeviceScreenUi.c](Code/Module/Screen/Device/DeviceScreenUi.c)。

先离线构建，再安装；只有第二条命令会刷写屏幕应用区：

```powershell
.\Tools\Python39\python.exe -B Code\Module\Screen\Utilities\BuildScreenUiFirmware.py
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InstallScreenUiFirmware.py --EnterDfu
# 只读查询页面对象、活动页面和设备定时器状态
.\Tools\Python39\python.exe -B Code\Module\Screen\Utilities\ReadScreenUiState.py
```

构建只支持 [NativeProfile.json](Code/Module/Screen/Device/NativeProfile.json) 固定的、已双份读取核对的实机镜像（官方屏幕 MCU build `Sep 6 2026 20:47:09`）。更换官方固件后需要重新备份并定位接口。当前文字修改通过重新构建/刷写生效，电脑端运行时文字更新协议尚未实现。

刷写四个 4 KiB 页面，逐页与完整应用区回读核对；不写 Bootloader，并保留当前 `0x7F000` 配置页。故障入口及 UI 超时保护可返回 DFU，安装工具保留恢复页及部署记录。原厂页面构建、专用定时器和业务事件入口已移出执行链，原厂底层库字节及恢复资源仍保留。

## 生产归档与恢复

| 内容 | 位置 |
| --- | --- |
| 当前安装索引 | [InstalledUi.json](Research/Screen/InstalledUi.json) |
| V03 生产页、恢复页、ELF 与源文件指纹 | [CustomUiV03](Research/Screen/CustomUiV03) |
| 官方更新后的应用区备份 | [Backup20261102T084907Z](Research/Screen/Backup20261102T084907Z) |
| 对应 Bootloader 备份 | [Backup20261102T084911Z](Research/Screen/Backup20261102T084911Z) |
| 刷写、回读与用户断电重启确认 | [Flash20261102T090614Z](Research/Screen/Flash20261102T090614Z) |
| 下方旋钮原始映射、修改后映射及回读 | [ScreenKnob20261102T090653Z](Research/Device/ScreenKnob20261102T090653Z) |

使用归档的 V03 页面包安装无需先编译：

```powershell
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InstallScreenUiFirmware.py --Plan Research\Screen\CustomUiV03\ScreenUiPatchPlan.json --EnterDfu
```

恢复本次官方更新后的屏幕应用，保留当前配置页：

```powershell
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InstallScreenUiFirmware.py --Plan Research\Screen\CustomUiV03\ScreenUiPatchPlan.json --EnterDfu --Restore
```

已处于 `5542:1000` DFU 时省略 `--EnterDfu`。屏幕恢复与主键盘旋钮映射分别管理，恢复屏幕不会恢复旋钮映射。

## 下方旋钮配置

`ConfigureScreenKnob.py` 只操作已确认设备的下方旋钮：三层、双方向以及按压均写入 `KC_NO`。它保存完整前后键位，写入后关闭并重开接口回读，确认其他按键及上方旋钮未改变。

```powershell
# 禁用下方旋钮，配置保存到键盘
.\Tools\Python39\python.exe -B Code\Module\Keyboard\Utilities\ConfigureScreenKnob.py --Disable

# 恢复本次修改前的下方旋钮映射
.\Tools\Python39\python.exe -B Code\Module\Keyboard\Utilities\ConfigureScreenKnob.py --Restore Research\Device\ScreenKnob20261102T090653Z\Before.json
```

## Windows 预览

Windows 预览保留，运行同一份界面代码：

```powershell
.\Tools\Python39\python.exe -B Code\Module\Screen\Utilities\BuildScreenUiPreview.py
.\Code\Module\Screen\Runtime\ScreenUiPreview.exe
```

预览构建使用已安装的 Visual Studio C 工具链及 `Tools/Lvgl` 中的 LVGL 8.3.11 源码。`Preview/LvConf.h` 仅供电脑预览，不能当作原厂硬件配置直接刷入。

## 目录约定

```text
Code/
  Module/
    Keyboard/Utilities/   ReadKeyboard.py、ConfigureScreenKnob.py
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
  Lvgl/                   预览源码与上游许可证
  Dfu/                    dfu-util 0.11 与上游许可证
  ArmCompiler/            便携编译器的来源与安装入口
  Environment.json        环境来源及版本
.gitignore                全仓库唯一的忽略规则文件
AGENTS.md                 项目组织、命名和归档约定
```

项目自有目录、文件名、函数、变量及参数使用 PascalCase。`.gitignore`、`AGENTS.md`、`LICENSE`、Python/Node 标准标识符、外部库 API、协议和既有数据字段遵循其规定名称；便携运行环境和第三方归档的内部内容保留原样。归档文件统一改名，原名称可通过 `Research/Provenance.json` 查回。

## 读取与离线调查

下面的设备读取入口不包含配置写入；固件分析和网页解码仅处理本地文件：

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

读取、分析、构建和刷写工具支持 `--help`，读取工具支持 `--OutputDirectory` 指定快照目录；离线分析支持指定输入与输出位置。默认输出目录为对应的 `Research` 子目录。`InstallArmCompiler.py` 是直接执行安装的入口，不提供命令行选项。

网页驱动解码工具需要 Node.js，仅读取归档文件并执行抽取出的字符串解码函数，不运行网页应用：

```powershell
node Code\Module\Vendor\Utilities\DecodeVendorChunk.cjs ScreenSettings.js KeyboardUpgrade.js
node Code\Module\Vendor\Utilities\DecodeVendorIndex.cjs
```

这两个入口也支持 `--OutputDirectory <Directory>`。原厂驱动使用的旧文件名仍可通过来源映射定位。

## Git 保留与忽略规则

全仓库只在根目录维护一份 [.gitignore](.gitignore)。忽略 Python 字节码及工具缓存、模块 `Runtime`、下载的 Arm 编译器、C/C++ 中间产物、编辑器状态和系统临时文件；清理缓存时同时检查已跟踪文件，已跟踪缓存必须移除后才能由规则生效。

`Code/Module/Screen/Runtime` 可删除后重新构建，`Tools/ArmCompiler/Runtime` 可用安装脚本重新下载。便携 Python、dfu-util、LVGL 源码、原厂固件、真实设备采集、生产刷写包和恢复页均保留在 Git；不使用全局 `*.bin`、`*.elf`、`*.exe`、`*.dll` 或 `*.log` 规则误忽略这些文件。

原厂与设备归档的原名称和 SHA256 由 [Provenance.json](Research/Provenance.json) 索引，[.gitattributes](.gitattributes) 保留源码、归档和便携依赖字节，避免自动换行转换改变生产源文件指纹。仓库不保留测试代码、临时验证脚本、临时检查报告或缓存；生产刷写与回读记录属于设备归档，继续保留。V03 已通过设备构建、应用区回读、运行状态查询和用户彻底断电重启后的实物确认。

具体发现、固件来源和待确认问题见 [调查记录](Documentation/ResearchNotes.txt)。屏幕协议回报 320×320，而实机程序的 LVGL 显示初始化为 480×360；这一差异仍有保留，不能按协议尺寸推断物理面板。
