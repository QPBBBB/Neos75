# Agent CLI

入口为根目录 `WriteMarkdown.bat`，或直接调用便携 Python 的 `Code/Module/Screen/Utilities/WriteMarkdown.py`。CLI 不询问问题、不安装驱动、不刷写固件；只处理文档、查询状态和滚动。

## 调用

```powershell
.\WriteMarkdown.bat Note.md --Transport Wireless --Json --TimeoutSeconds 120
.\WriteMarkdown.bat --Status --Transport Wireless --Json --TimeoutSeconds 20
.\WriteMarkdown.bat --Scroll 3 --Transport Wireless --Json --TimeoutSeconds 20
```

agent 直接生成 MD 时使用 UTF-8 stdin，无需临时 MD 文件：

```python
import subprocess as Subprocess
import json as Json

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

`InputFile` 与 `--Stdin` 互斥。stdin 同样限制为 65536 个 UTF-8 字节；相对图片默认以工作目录为准，可通过 `--BaseDirectory` 指定。`--CompileOnly` 只编译，`--OutputFile` 指定编译包输出位置，`--Preview` 可选导出图片，均无需访问键盘。

## 输出与退出码

执行动作时 stdout 只输出一个 JSON 对象，进度和输入暂停提示写入 stderr。默认 JSON 带缩进，`--Json` 使用紧凑单行；`--help` 显示普通命令帮助。

成功结果含 `Ok=true`、`Action`。上传还包含 `Transport`、源文件/编译包 SHA256、字节数、行数、`DeviceState`、`ElapsedSeconds`、`ReceiptFile`。状态和滚动返回 `DeviceState`。查询成功不代表有文档，需检查 `DeviceState.Active`。

```json
{"Ok":true,"Action":"Status","Transport":"ReceiverRadio","DeviceState":{"Active":true,"Session":25864,"ReceivedBytes":606,"TotalBytes":606,"ScrollRow":0,"Rows":1,"SourceBytes":17,"Version":1,"Status":0,"Operation":3}}
```

失败结果含 `Ok=false`、`ExitCode` 和 `Error.Code/Message/Retryable`：

```json
{"Ok":false,"ExitCode":3,"Error":{"Code":"KeyboardNotResponding","Message":"Receiver is online but the keyboard did not reply; keep 2.4 GHz powered on and wake with a normal key","Retryable":true}}
```

| 退出码 | 含义 |
| --- | --- |
| 0 | 操作成功 |
| 2 | 参数、输入、资源、IO 或设备拒绝等错误，修正原因后再调用 |
| 3 | 可重试的连接、回复或命令超时 |
| 130 | 调用被取消 |

稳定错误码包括 `InvalidArguments`、`InvalidInput`、`IoError`、`DeviceNotFound`、`AmbiguousDevice`、`KeyboardNotResponding`、`TransportWrite`、`NoScreenResponse`、`Timeout`、`OperationFailed`、`Cancelled`。agent 应读取 `Retryable` 并退避重试，不应无限立即重发。

## 传输与输入优先

`--Transport Auto` 为默认值：屏幕 USB 在线时使用有线，否则使用接收器。需要确保无线数据路径时显式传 `Wireless`；此模式不会回落到 USB 写入。`Wired` 只选择独立屏幕 USB 接口。

无线默认最多每秒 8 个发送请求，键盘或鼠标输入活跃时暂停，当前 Windows 会话静止 500 ms 后继续。只读取输入时间戳，不采集按键内容；服务会话部署不在当前验收范围。

`--WirelessPacketsPerSecond` 范围 1–10，`--WirelessIdleMilliseconds` 范围 300–5000。输入活动会延长上传时间。`--TimeoutSeconds` 把输入等待和通信都计入命令时间预算，默认 0 不限时，agent 宜显式设置预算和外层进程超时。

启动时通过接收器核对键盘身份，状态丢失会进行有界重试。键盘休眠时可能只有接收器在线，需按普通键唤醒；CLI 返回可重试错误，不会自动修改省电配置。

## 生命周期与并发

V06 开机自行加载固件内置的“QPBBBB 的键盘”Markdown 及字形，顶部没有 UI 标题。默认文档状态为 `Active=true, Session=0`，无需 agent 先上传；用户上传使用非零会话。

每次更新完整文档包及字形；接收新文档时释放旧包（含默认文档的 RAM 副本），提交校验后激活。中断可能留下未完成接收状态，后续重新上传整篇即可。用户上传内容只存设备 RAM，断电或导致屏幕重启的模式/供电切换后恢复内置默认文档；需要保留上传内容时应重传。

对同一设备串行调用上传和滚动；当前没有跨进程上传锁及多 writer 仲裁。源文件上限 64 KiB，编译包/字形预算见 [容量规格](MarkdownCapacity.txt)。

2026-11-03 已实机验证：主键盘和屏幕 USB 均离线时，stdin 输入 `Agent CLI OK` 文本，606 字节包经接收器完整接收并激活，返回成功 JSON、退出码 0，上传约 5.14 秒。此前完全无线的中文/14 行列表、旋钮滚动和正常打字已由用户确认；按键延迟未做仪器测量。

随后 stdin 写入“新的一段”，包含粗体、中文及列表，90 字节源文档编译为 2514 字节、6 行；设备确认完整接收并激活，用户再次确认显示正常。含输入暂停的上传耗时 94.484 秒。
