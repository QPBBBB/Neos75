# 2.4G Markdown 与 Agent CLI

当前版本为屏幕 V06 + 主控 WirelessBridgeV02。V06 仅更新屏幕的启动默认 Markdown 和无顶部标题布局，协议与主控程序沿用 V05 无线基线；用户已确认“QPBBBB 的键盘”和断电重启显示正常。

无线基线验收：2026-11-03 在主键盘与屏幕 USB 均离线时，接收器完整传入中文和 14 行列表；用户确认显示、旋钮双向滚动及正常打字均正常，随后完成 stdin + JSON CLI 的真实无线调用。调用接口见 [AgentCli.md](AgentCli.md)。

## 已确认的实机情况

- 接收器 `6D66:8572` 可通过 2.4G 查询键盘，VIA 12、Vial 6、UID `19331032a15430b0`，往返约 42–52 ms。
- 适配前把屏幕查询直接发给接收器，会得到 `FF` 未支持响应，耗时约 42 ms；原厂链路没有现成的屏幕协议透传。
- 用户已授权安装仅主控 DFU `2E3C:DF11` 的官方 WinUSB 驱动，并短暂停止主键盘读取备份；该备份阶段未刷写主控固件，后续经另行授权部署转发补丁。
- 主控 Flash 从 `0x08000000` 起 256 KiB，读取两遍完全一致，SHA256 为 `843d8df0bd118bedd40cd42dc52c37e30ea0b87cc47db9ce2135b1d422adcc62`。
- 实机包含 `SV3.0.4 Oct 29 2026 04:42:28`；公开下载仍是旧版，不能直接沿用旧固件地址。

备份见 [KeyboardBackup20261103T073805Z](../Research/Device/KeyboardBackup20261103T073805Z)。首次进入 DFU 的 USB 枚举晚于固定等待时间，工具已改为轮询；完整备份随后成功。ROM 退出时 dfu-util 在设备断开后报告 get_status 错误，后续无线身份查询成功，见 [恢复回查](../Research/Device/KeyboardBackupRecovery20261103T074209Z)。

## 现用方案

```text
WriteMarkdown.bat --Transport Wireless
  → 6D66:8572 接收器的 32 字节 HID
  → 原生 2.4G 配置链路
  → 主控新增的受限屏幕转发
  → 键盘内部 UART
  → 屏幕原生 Markdown UI
```

电脑只向接收器发送文档，不使用屏幕 USB 写入作为替代。主控只接受 `A5 41 / 7C` 的文档状态、开始、数据、提交和滚动操作，校验长度、操作形状和帧校验和；不增加任意内存写入、键位写入或 DFU 转发。

屏幕返回 26 字节 `MDUW` 状态，包含会话、接收量、总长度、行号及源文件长度，外层帧恰好 32 字节。写操作在 UI 定时器实际处理后才确认；客户端过滤即时回显，丢失确认时先查进度，防止重复写入同一块数据。原有有线 `7E / MDUI` 协议保留。

## 主控修改范围

主控新增代码 516 字节，不引入自有 RAM、后台线程或启动向量修改。只允许写入下列三个 2 KiB 页，均带原始恢复页：

| 页 | 地址 | 用途 |
| --- | --- | --- |
| Payload | `0x0801F000` | 原本全 FF 的应用页，放置转发代码 |
| Packet | `0x08014000` | 仅修改屏幕报文入口的 4 字节跳转 |
| Unknown | `0x08012000` | 仅修改未支持命令回调的 4 字节跳转 |

`0x0801F800..0x08040000` 配置区、启动向量、原厂 ROM、其他键位及按键扫描/无线调度代码保持原始字节。安装前重新读取并核对程序区，保留当时配置区；逐页和整镜像回读失败时使用本次读取的原页回退。

屏幕配套固件增加紧凑确认协议，仍使用现有七页安装布局、保留 Bootloader 和 `0x7F000` 配置页。主控和屏幕必须成套部署；接收器固件未修改。

现用成套页面、恢复页及源码快照见 [WirelessUiV02](../Research/Firmware/WirelessUiV02)，其中主控页与先前 WirelessUiV01 完全相同。初版只放行一种原生无线来源，实机回程隔离确认后，主控 V02 改为接受原生的两种无线来源并提供 `NWB2` 状态回显诊断。主控两次整镜像回读通过，配置区逐字节保留。

## 打字优先与速度口径

初版无线模式默认每秒最多发送 8 个请求，每块文档载荷最多 19 字节；键盘或鼠标输入活跃时暂停后台发送，静止 500 ms 后继续。只读取 Windows 最后输入时间戳，不采集按键内容。即使程序异常退出，也不会写入主键盘配置或改变扫描参数。

完全无线显示、滚动和正常打字已由用户确认，发送暂停/恢复在实机调用中发生。8 次/秒对应的文档载荷理论上限约 152 字节/秒，编译包还包含字形和排版。2120 字节包含多次输入暂停耗时 66.156 秒；无暂停的 606 字节 agent 包耗时 5.14 秒。它们不是满载无线带宽或按键延迟的仪器测量。

CLI 使用：

```powershell
.\WriteMarkdown.bat Note.md --Transport Wireless
.\WriteMarkdown.bat --Status --Transport Wireless
```

`--WirelessPacketsPerSecond` 范围 1–10，默认 8；`--WirelessIdleMilliseconds` 范围 300–5000，默认 500。输入会延长整篇上传时间。V06 断电后自动恢复内置默认 Markdown，用户上传内容需要重传。

## 部署、恢复与验收

主控部署记录：`Research/Device/KeyboardFlash20261103T081321Z`；当前 V06 屏幕部署及断电验收：`Research/Screen/Flash20261103T143022Z`；V05 屏幕部署：`Research/Screen/Flash20261103T080728Z`；完全无线及 CLI 基线验收：`Research/Device/WirelessMarkdown20261103T082057Z/Commissioning.json`。

主控安装/恢复会短暂停止键盘输入，应在明确的停键窗口进行。日常 agent 更新只调用文档 CLI，不执行下列固件命令：

```powershell
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InstallWirelessBridgeFirmware.py --Plan Research\Firmware\WirelessUiV02\Keyboard\WirelessBridgePlan.json --EnterDfu
.\Tools\Python39\python.exe -B Code\Module\Firmware\Utilities\InstallScreenUiFirmware.py --Plan Research\Firmware\WirelessUiV02\Screen\ScreenUiPatchPlan.json --EnterDfu
```

为对应命令加 `--Restore` 可恢复各自基准备份中的应用页，保留当时配置区。接收器及主控原厂 ROM 均不写入。已安装 WirelessBridgeV02 的设备更新 V06 时只需刷屏幕。用户上传内容不在 Flash 持久化；V06 在启动时从 Flash 内置包加载“QPBBBB 的键盘”，并由正常 Markdown 控件显示。
