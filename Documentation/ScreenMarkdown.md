# NEOS75 Markdown

在电脑上运行 BAT，把 Markdown 写入键盘屏幕。上传完成后，电脑程序可以退出，屏幕继续保存文档并独立滚动。

## 写入文件

在仓库根目录运行：

```bat
WriteMarkdown.bat "D:\Documents\Note.md"
```

agent 可用 `--Stdin --Transport Wireless --Json --TimeoutSeconds 120` 直接传入 UTF-8 Markdown，调用约定见 [AgentCli.md](AgentCli.md)。文件输入同样使用 UTF-8，单篇最多 **64 KiB**，原文件不会被修改。

## 阅读与滚动

- 下方旋钮顺时针：向下滚动。
- 下方旋钮逆时针：向上滚动。
- 上方旋钮：继续控制音量。
- 下方按压：保持禁用。
- 页脚显示当前行号与全文总行数。

## Markdown 排版

支持 **粗体**、*斜体*、~~删除线~~、`行内代码` 和 [链接文字](https://spec.commonmark.org/)。

> 引用使用缩进和背景区分；长段落按屏幕宽度自动换行。

### 列表

1. 有序列表
2. 多行内容与嵌套列表

- [x] UTF-8 中文
- [x] 标题、段落、引用、列表、代码块
- [x] 表格和图片

| 项目 | 说明 |
| :--- | :--- |
| 文本上限 | 65536 个 UTF-8 字节，包含语法标记 |
| 文档位置 | 设备 RAM；重启后需要重新上传 |
| 当前传输 | 屏幕独立 USB HID 接口 |
| 主键盘 | 不改扫描和无线固件 |

表格会按列换行；列数太多时改为逐单元格排列，避免内容挤出屏幕。

## 图片与资源

相对图片路径以 MD 文件所在目录为准。图片按屏幕宽度缩放，当前使用最多 8 色量化，单张高度最多 160 像素。

图片及字形使用独立资源预算：最多 6400 个字形记录、96 KiB 位图数据；编译后的整包最多 256 KiB。资源超限会报错，正文不会被静默截断。

远程图片默认显示替代文字。需要下载图片时显式添加 `--AllowRemoteImages`；单次下载限制 4 MiB，解码限制 800 万像素。

## 命令选项

```bat
WriteMarkdown.bat Note.md --Preview Preview.png --CompileOnly
WriteMarkdown.bat --Status
WriteMarkdown.bat --Scroll 5
```

`--Preview` 导出排版预览，`--CompileOnly` 只编译、不访问设备。运行时文档包、上传回执保存在被 Git 忽略的 `Code/Module/Screen/Runtime/Markdown`。

## 当前边界

有线与完全无线 2.4G 流程均已验证。无线固定使用 `--Transport Wireless`，输入活跃时暂停，静止 500 ms 后继续，默认每秒最多发送 8 个请求；休眠时需按普通键唤醒。读取带宽不等于文档写入带宽，也不能代替按键延迟验收。

Markdown 由标准解析器处理，屏幕显示结构化文字行及字形；原始 HTML 只提供静态文本/常用行内标签处理，不运行网页脚本或 CSS。公式与 Mermaid 暂按代码或普通文本显示。

首次使用或屏幕固件尚未更新时，请先查看 `Documentation/ScreenUi.txt` 的构建、备份与恢复说明。
