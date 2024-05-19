# 创建一个 Pingpong 进程

这个教程将指导你在 aos 中创建一个简单的“ping-pong”过程。 在此过程中，每当进程收到带有数据“ping”的消息时，它都会自动回复“pong”。 这是 aos 中消息处理和进程间交互的基本示例。

## 步骤 1: 打开 `aos` CLI

- 首先打开命令行界面并输入 `aos` 进入 aos 环境。

## 步骤 2: 打开内置编辑器

- 在 aos CLI 中输入 `.editor` 打开内置文本编辑器。 你将在此处编写 pingpong 处理程序代码。

## 步骤 3: 添加 Pingpong Handler

- 在编辑器中，输入以下 Lua 代码来添加 pingpong 模式的处理程序：

  ```lua
  Handlers.add(
    "pingpong",
    Handlers.utils.hasMatchingData("ping"),
    Handlers.utils.reply("pong")
  )
  ```

- 这个 lua 脚本做了三个操作:
  1. 添加一个新的名为"pingpong"的 handler。
  2. 它使用 `Handlers.utils.hasMatchingData("ping")` 来检查收到的消息中是否有 "ping" 字段.
  3. 如果消息中包含 "ping", `Handlers.utils.reply("pong")` 会自动返回 "pong" 的消息.

## 步骤 4: 退出编辑器

- 在编写完代码后，输入 `.done` 并输入 Enter 来退出编辑器并运行脚本。

## 步骤 5: 测试 Pingpong 进程

- 为了测试进程，需要向进程发送带有 `ping` 的消息。你可以在 CLI 中使用下面的命令：
  ```lua
  Send({ Target = ao.id, Data = "ping" })
  ```
- 进程将在收件箱 `Inbox` 中收到带有 "pong" 的恢复消息。

## 步骤 6: 查看收件箱 Inbox

- 查看你的收件箱中是否有 "ping" 的消息，并确认是否发出了 “pong” 的回复消息。

```lua
Inbox[#Inbox].Data
```

## 步骤 7: 测试和观察

- 发送不同的消息进行测试，并观察“ping”消息如何触发“pong”响应。

## 步骤 8: 保存进程 (可选)

- 如果你想在将来使用此过程，请将处理程序代码保存在Lua文件中以便于加载

进入 aos 会话。

::: info

**额外提示:**

- **处理程序效率**: 简单的处理函数是关键. 确保它的执行效率并且只在正确的时候触发。

:::

## 结论

恭喜！ 您已经在 aos 中创建了一个基础的"ping-pong"进程。 本教程给理解 在aos 环境中的消息处理和进程交互奠定了基础。 随着您对这些概念越来越熟悉，您可以扩展到更复杂的流程和交互，探索 aos 的全部潜力。
