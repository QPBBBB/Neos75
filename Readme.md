# Neos75

NEOS75 键盘屏幕的自定义固件、Markdown CLI 与设备研究归档。当前屏幕 V06 和主控 WirelessBridgeV02 支持有线 USB 及 2.4G 接收器写入，由键盘端原生控件显示和滚动；电脑程序结束后仍可阅读。底层显示、USB、RTX 与 LVGL 复用已核验的原厂二进制，尚未取得完整厂商 SDK。

开机自动显示内置 Markdown“QPBBBB 的键盘”，正文从顶部 16 像素处开始，不再创建顶部 UI 标题控件。默认文档和中文字形随屏幕固件保存，已由用户确认断电重启后显示正常；后续 CLI 上传会替换默认文档。

用户已确认中文、粗斜体、代码块和表格显示正常，正常打字未观察到卡顿；2026-11-03 确认下方旋钮顺时针下滚、逆时针上滚。原厂页面对象数为 0，保留自定义页面。有线格式验收见 [V04 实机验收](Research/Screen/Flash20261102T144227Z/Commissioning.json)，当前完全无线与 agent CLI 记录见 [无线验收](Research/Device/WirelessMarkdown20261103T082057Z/Commissioning.json)。

## 快速使用

本设备已安装配套固件。面向 agent 的 CLI 从 Windows x64 仓库根目录调用：

```powershell
.\WriteMarkdown.bat "D:\Documents\Note.md" --Transport Wireless --Json --TimeoutSeconds 120
```

支持 UTF-8 文件参数或 `--Stdin`，stdout 只返回一份 JSON，进度写到 stderr，退出码明确区分成功、输入错误和可重试错误。完整调用约定见 [AgentCli.md](Documentation/AgentCli.md)。使用仓库内便携 Python，无需系统 Python，也无需为正文更新重新刷固件。

agent 可直接通过标准输入发送正文，无需创建 MD 文件：

```python
import json as Json
import subprocess as Subprocess

Markdown = "# Agent\n\n需要显示的内容。\n"
Result = Subprocess.run([
    "D:/Git/Neos75/Tools/Python39/python.exe", "-B",
    "D:/Git/Neos75/Code/Module/Screen/Utilities/WriteMarkdown.py",
    "--Stdin", "--Transport", "Wireless", "--Json", "--TimeoutSeconds", "120"
], input=Markdown.encode("utf-8"), capture_output=True, timeout=130)
Response = Json.loads(Result.stdout)
if Result.returncode != 0:
    raise RuntimeError(Response["Error"])
```

上传完成后整篇新文档激活，上传器可以退出。用户上传的文档只保存在设备 RAM，断电后恢复内置默认 Markdown；需要继续阅读上传内容时重新发送。新上传会释放旧文档，上传失败时需重传。当前每次上传完整文档包及字形，尚未实现增量更新。

| 操作 | 功能 |
| --- | --- |
| 下方旋钮顺时针 | 向下滚动 |
| 下方旋钮逆时针 | 向上滚动 |
| 下方旋钮按压 | 保持禁用 |
| 上方旋钮 | 保留原有音量功能 |
| 页脚 | 当前行号和全文总行数 |

**有线与完全无线的 2.4G 均已跑通。** 2026-11-03 用户确认 USB 拔线后，中文和列表显示、旋钮上下滚动及正常打字均正常。按键延迟未做仪器测量。

无线默认最多每秒发送 8 个请求，输入活跃时暂停，静止 500 ms 后继续；仅读取当前 Windows 会话的输入时间戳。`Auto` 默认优先使用在线的屏幕 USB，否则选择接收器；显式 `--Transport Wireless` 不会回落到 USB。部署与恢复见 [无线适配说明](Documentation/WirelessMarkdown.md)。

## 常用命令

```powershell
# 写入一篇文档
.\WriteMarkdown.bat "D:\Documents\Note.md"

# 只查询设备中的文档状态
.\WriteMarkdown.bat --Status

# 设备端向下滚动 5 行；负数向上
.\WriteMarkdown.bat --Scroll 5

# 离线编译并导出排版预览，不访问设备
.\WriteMarkdown.bat "D:\Documents\Note.md" --CompileOnly --Preview "D:\Documents\Preview.png"

# 允许文档引用有界的 HTTP(S) 图片
.\WriteMarkdown.bat "D:\Documents\Note.md" --AllowRemoteImages
```

运行时编译包和上传回执保存在被 Git 忽略的 `Code/Module/Screen/Runtime/Markdown`，不会自动把用户正文加入设备研究归档。`--BytesPerSecond` 设置载荷发送上限，范围 256–16384 字节/秒，默认 8192；实际速度还受逐包确认影响。

## 格式与容量

支持标题、段落、粗体、斜体、删除线、行内代码、代码块、引用、有序/无序/嵌套列表、任务列表、表格、链接文字及图片。表格按列换行，过宽时逐单元格显示；链接显示文字，不提供网页跳转。

| 资源 | 上限 |
| --- | --- |
| 单篇 UTF-8 MD 源文件 | 65536 字节（64 KiB，包含标记、空格和换行） |
| 编译后的完整文档包 | 256 KiB |
| 字形及图片位图 | 96 KiB，计入文档包 |
| 字形记录 | 6400 个 |
| 排版行数 | 32768 行 |
| 设备可见行控件 | 最多 24 个，按当前窗口复用 |

资源超限会明确报错，不静默截断。即使源文件小于 64 KiB，包含大量不同字形或图片时也可能先达到资源上限。

字体来自本机 Windows 的微软雅黑和 Consolas，不随仓库分发字体文件。图片路径相对于 MD 所在目录，按内容宽度缩放、单张高最多 160 像素，当前最多 8 色量化。远程图片默认显示替代文字，显式开启后单次下载最多 4 MiB、解码最多 800 万像素。

原始 HTML 仅处理静态文字和常用行内标签，不执行脚本或 CSS；公式与 Mermaid 当前按普通文字或代码显示。具体用法见 [Markdown 说明](Documentation/ScreenMarkdown.md)，资源依据见 [容量规格](Documentation/MarkdownCapacity.txt)。

## 实测更新时间

下表来自本设备的有线及完全无线写入。编译包包含排版数据和字形，因此源文件大小不能直接换算成传输耗时。

| 内容 | MD 源文件 | 编译包 | 上传至激活 | 含解析排版的总耗时 |
| --- | ---: | ---: | ---: | ---: |
| 第一段中文演示，含列表、代码和表格 | 595 字节 | 14215 字节 | 4.406 秒 | 5.135 秒 |
| 第二段中文演示，含任务列表、代码和表格 | 618 字节 | 13808 字节 | 3.969 秒 | 4.229 秒 |
| 完全无线中文/列表，含输入暂停 | 156 字节 | 2120 字节 | 66.156 秒 | 66.470 秒 |
| Agent stdin/JSON，完全无线、无暂停 | 17 字节 | 606 字节 | 5.140 秒 | 未单独记录 |
| 中文 Agent CLI，含输入暂停，用户确认显示正常 | 90 字节 | 2514 字节 | 94.484 秒 | 未单独记录 |
| 64 KiB 密集短段落容量验收，21846 行 | 65536 字节 | 218542 字节 | 约 59 秒 | 未单独记录 |

两段有线短文档的有效编译包传输约为 **3.15–3.40 KiB/s**。无线主动节流并等待输入空闲，含暂停的耗时不代表满载带宽。64 KiB 容量已通过有线接收、CRC 校验、激活和末行滚动验收；无线本次实测为短文档。

此前完全无线的配置读取约为 0.6 kB/s、查询往返中位数约 42–48 ms；这是配置读回结果，不能当作文档写入带宽，也不能代替按键延迟测量。详细数据见 [研究记录](Documentation/ResearchNotes.txt)。

## 环境与模块

所有命令从仓库根目录运行。既有生产计划使用 `D:\Git\Neos75` 的绝对备份路径；换位置检出时应重新构建计划。

| 组件 | 位置与用途 |
| --- | --- |
| Python 3.9.11 x64 | `Tools/Python39`，便携运行环境 |
| hidapi 0.15.0、Capstone 5.0.6 | 设备通信与离线固件分析 |
| Mistune 3.3.4、Pillow 11.3.0、typing_extensions 4.15.0 | MD 解析、排版和字形/图片编译 |
| dfu-util 0.11 | `Tools/Dfu`，屏幕备份、安装与恢复 |
| Arm LLVM 19.1.5 | 按固定来源安装到忽略的 `Tools/ArmCompiler/Runtime` |
| LVGL 8.3.11 与本机 Visual Studio C/C++ | 仅用于旧初始 UI 的 Windows 预览；未据此确认设备 LVGL 版本 |
| 本机 Node.js | 仅供离线网页驱动归档解码，无 npm 依赖 |

依赖版本、下载来源和 SHA256 见 [Environment.json](Tools/Environment.json)，第三方许可证保留在各工具目录。

```text
WriteMarkdown.bat                   日常 MD 写入入口
Code/Module/
  Keyboard/Utilities/               配置读取、下方旋钮映射
  Keyboard/Wireless/                主控受限转发补丁与固定接口指纹
  Screen/Markdown/                  设备端文档接收、原生显示和滚动
  Screen/Device/                    原生接口、固件 hook、初始化和恢复保护
  Screen/Utilities/                 MD 编译/上传、只读状态、构建入口
  Screen/ScreenUi.c                 初始画面的共用控件代码
  Firmware/Utilities/               备份、安装、恢复与离线分析
  Vendor/Utilities/                 网页驱动归档解码
Documentation/                      使用说明、容量依据与研究记录
Research/                           固件备份、实际采集、生产页及恢复页
Tools/                              便携运行环境和工具
```

MD 在电脑端解析为结构化行、字形记录和掩码，设备端缓存文档并复用可见窗口控件；全文不生成一张长图。[WriteMarkdown.py](Code/Module/Screen/Utilities/WriteMarkdown.py) 负责传输，[MarkdownUtilities.py](Code/Module/Screen/Utilities/MarkdownUtilities.py) 负责编译，[MarkdownDocument.c](Code/Module/Screen/Markdown/MarkdownDocument.c) 负责设备端接收和滚动。

## 固件构建与安装

日常更新正文使用 BAT。本节仅用于新设备部署或修改设备程序。

屏幕构建只支持 [NativeProfile.json](Code/Module/Screen/Device/NativeProfile.json) 对应的实机镜像：官方 MCU build `Sep 6 2026 20:47:09`。无线还需基于实机 `SV3.0.4` 双份备份的主控转发补丁，只改三个固定应用页，保留配置区及原厂 ROM。接收器固件保持原样。更换官方固件后必须重新备份、定位接口，详情见无线适配说明。

使用已归档的当前成套页面包无需编译器。主控安装会短暂停止键盘输入，部署条件和恢复顺序见 [无线适配说明](Documentation/WirelessMarkdown.md)：

```powershell
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InstallWirelessBridgeFirmware.py --Plan Research\Firmware\WirelessUiV02\Keyboard\WirelessBridgePlan.json --EnterDfu
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InstallScreenUiFirmware.py --Plan Research\Firmware\WirelessUiV02\Screen\ScreenUiPatchPlan.json --EnterDfu
```

主控 DFU `2E3C:DF11` 与屏幕 DFU `5542:1000` 均需要各自的 WinUSB 驱动，本设备已安装；安装入口分别为 [InstallKeyboardDriver.ps1](Code/Module/Firmware/Utilities/InstallKeyboardDriver.ps1) 和 [InstallScreenDriver.ps1](Code/Module/Firmware/Utilities/InstallScreenDriver.ps1)。安装器核验已有程序与页面指纹，逐页及完整应用区回读核对；屏幕不写 Bootloader，保留当前 `0x7F000` 配置页。设备已处于对应 DFU 时省略 `--EnterDfu`。

需要修改设备程序时，先安装固定编译器，再构建和安装：

```powershell
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InstallArmCompiler.py
.\Tools\Python39\python.exe -B Code\Module\Keyboard\Utilities\BuildWirelessBridgeFirmware.py
.\Tools\Python39\python.exe -B Code\Module\Screen\Utilities\BuildScreenUiFirmware.py
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InstallWirelessBridgeFirmware.py --EnterDfu
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InstallScreenUiFirmware.py --EnterDfu
```

V06 屏幕计划沿用七个 4 KiB 页面：四个 payload 页 `0x50000..0x54000`，以及 Vector、Information、Hook。安装跳过已相同页，带有故障返回 DFU 和 UI 超时保护。本次只更新屏幕，已安装 WirelessBridgeV02 的主控无需重刷。

启动默认内容来自 [Default.md](Code/Module/Screen/Markdown/Default.md)，路径由 [ScreenUiConfiguration.json](Code/Module/Screen/Device/ScreenUiConfiguration.json) 的 `DefaultMarkdownFile` 指定。构建时通过同一个 Markdown 编译器生成排版包及中文字形，并嵌入屏幕程序；更改默认内容需重新构建和安装屏幕固件。默认包与程序共用 16 KiB 扩展区，超限时构建报错。当前默认包 984 字节，首次上传时释放其 RAM 副本，用户文档容量规格保持不变。

## 旋钮配置、诊断与恢复

本设备的下方旋钮已适配。需要重新设置时，工具只修改固定下方旋钮位置，保留其按压禁用；保存完整前后映射并关闭、重开接口回读，确认其他按键和上方音量映射未改变。

```powershell
# 下方旋转发送屏幕事件，交由自定义 UI 处理滚动
.\Tools\Python39\python.exe -B Code\Module\Keyboard\Utilities\ConfigureScreenKnob.py --Scroll

# 禁用下方旋转和按压
.\Tools\Python39\python.exe -B Code\Module\Keyboard\Utilities\ConfigureScreenKnob.py --Disable

# 恢复最初的下方旋钮映射
.\Tools\Python39\python.exe -B Code\Module\Keyboard\Utilities\ConfigureScreenKnob.py --Restore Research\Device\ScreenKnob20261102T090653Z\Before.json

# 只读查询屏幕状态和最近控制事件
.\Tools\Python39\python.exe -B Code\Module\Screen\Utilities\ReadScreenUiState.py
.\Tools\Python39\python.exe -B Code\Module\Screen\Utilities\ReadScreenControls.py --Seconds 2
```

配置工具固定本设备 UID 和已确认映射，过滤其他应用的无关响应，遇到未知映射会拒绝修改。恢复本次官方更新后的屏幕应用时，使用当前计划中的恢复页：

```powershell
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InstallScreenUiFirmware.py --Plan Research\Firmware\WirelessUiV02\Screen\ScreenUiPatchPlan.json --EnterDfu --Restore
```

屏幕恢复保留当前配置页，不自动恢复主键盘的旋钮映射。完整协议、保护机制和恢复说明见 [ScreenUi.txt](Documentation/ScreenUi.txt)。

## 生产归档与只读研究

| 内容 | 位置 |
| --- | --- |
| 当前成套主控/屏幕页面、恢复页与源码快照 | [WirelessUiV02](Research/Firmware/WirelessUiV02) |
| V06 默认 Markdown 与断电重启验收 | [Flash20261103T143022Z](Research/Screen/Flash20261103T143022Z) |
| 当前主控指纹与无线验收索引 | [InstalledWirelessBridge.json](Research/Device/InstalledWirelessBridge.json) |
| 当前安装指纹与验收索引 | [InstalledUi.json](Research/Screen/InstalledUi.json) |
| V04 修改页、恢复页、ELF、反汇编、源文件指纹 | [MarkdownUiV04](Research/Screen/MarkdownUiV04) |
| V04 完整回读及物理滚动验收 | [Flash20261102T144227Z](Research/Screen/Flash20261102T144227Z) |
| 下方旋钮写入与全键位回读 | [ScreenKnob20261102T142424Z](Research/Device/ScreenKnob20261102T142424Z) |
| 官方更新后的应用区双份备份 | [Backup20261102T084907Z](Research/Screen/Backup20261102T084907Z) |
| 对应 Bootloader 双份备份 | [Backup20261102T084911Z](Research/Screen/Backup20261102T084911Z) |
| 历史 V03 页面包与源文件指纹 | [CustomUiV03](Research/Screen/CustomUiV03) |
| 归档来源、原名称与 SHA256 | [Provenance.json](Research/Provenance.json) |

当前版本的 45 份源码快照、指纹及对应 Git 提交保存在 [WirelessUiV02/Source.json](Research/Firmware/WirelessUiV02/Source.json) 的 `SourceFilesSha256`、`SourceCommit` 及同目录 `Sources`，已与提交中的原始字节逐一核对。V05 对应提交与原始源码保留在 [WirelessUiV01/Source.json](Research/Firmware/WirelessUiV01/Source.json)；V04 的记录在 [Source.json](Research/Screen/MarkdownUiV04/Source.json) 中。历史页面包保持独立，当前恢复采用 WirelessUiV02 成套计划。

只读设备与离线分析入口：

```powershell
.\Tools\Python39\python.exe -B Code\Module\Keyboard\Utilities\ReadKeyboard.py --Enumerate
.\Tools\Python39\python.exe -B Code\Module\Keyboard\Utilities\ReadKeyboard.py --ReadEncoders
.\Tools\Python39\python.exe -B Code\Module\Keyboard\Utilities\ReadKeyboard.py --Transport Wireless --ReadEncoders
.\Tools\Python39\python.exe -B Code\Module\Screen\Utilities\ReadScreen.py
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InspectFirmware.py
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\ExtractUiResources.py
node Code\Module\Vendor\Utilities\DecodeVendorIndex.cjs
```

无线查询前先唤醒键盘；接收器在线不能保证休眠键盘应答，agent 会得到可重试错误。有线配置接口在无线模式下可能仍枚举但不回应。本版转发已基于现用主控实机备份适配，接收器固件保持原样；旧参考镜像地址不用于当前程序刷写。

原厂页面初始化、专用定时器和业务事件链已移出运行路径，底层库和原始恢复资源保留。屏幕 HID 回报 `320×320`，实机程序的 LVGL 初始化为 `480×360`；保留这一差异，不根据协议值推断物理面板。

旧初始 UI 的 Windows 预览使用 `BuildScreenUiPreview.py` 和 `Runtime/ScreenUiPreview.exe`；Markdown 预览使用上文 `--CompileOnly --Preview`。二者均不代替实机验收。

## 仓库约定

项目自有目录、文件名、函数、变量和参数遵循 PascalCase，模块位于 `Code/Module`，工具实现放各模块 `Utilities`，便携 Python 放 `Tools/Python39`。标准 Git/法律文件名、语言与外部 API 标识符、协议键、未修改第三方内容保留规定命名。

全仓库只维护根目录的一份 [.gitignore](.gitignore)：忽略模块 `Runtime`、下载的编译器、字节码、缓存、临时输出及编辑器状态。生产固件、ELF、恢复页、真实设备采集及便携依赖继续保留在 Git，不用全局二进制后缀规则误忽略。仓库不保留测试代码、临时验证脚本或样例测试数据。

[.gitattributes](.gitattributes) 保留生产源文件、固件归档和便携依赖的原始字节，避免换行转换破坏 SHA256。`Runtime` 可重建或重新上传生成，编译器可用固定安装脚本恢复。生产来源、验收范围和未解决问题分别以归档和 [研究记录](Documentation/ResearchNotes.txt) 为准。
