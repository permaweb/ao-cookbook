# 聊天室蓝图

聊天室蓝图是预先设计好的模板，可帮助您在 ao 中快速构建。蓝图是入门的绝佳方式，并且可以根据您的需求进行定制。

## 解析聊天室蓝图

- **成员**: `Members`数组用于存储已注册聊天室的用户。

- **注册 Handler**: `register` handler 支持进程加入聊天室。当进程发送带有标签 `Action = "Register"` 的消息时，handler会将进程添加到 `Members` 数组中，并向进程发送一条消息确认注册。
注册处理程序：

- **广播 Handler**: `broadcast` handler支持进程向聊天室的所有成员发送消息。当进程发送带有标签 Action = "Broadcast" 的消息时，handler会将该消息发送给聊天室的所有成员。

### 如何使用：

1. 打开文本编辑器。
2. 打开终端。
3. 启动您的 `aos` 进程。
4. 输入 `.load-blueprint chatroom`

### 验证蓝图是否已加载：

输入 `Handlers.list` 查看新加载的Handlers。

## 聊天室蓝图中包含的内容：

```lua
Members = Members or {}

Handlers.add(
  "register",
  Handlers.utils.hasMatchingTag("Action", "Register"),
  function (msg)
    table.insert(Members, msg.From)
    Handlers.utils.reply("registered")(msg)
  end
)

Handlers.add(
  "broadcast",
  Handlers.utils.hasMatchingTag("Action", "Broadcast"),
  function (msg)
    for _, recipient in ipairs(Members) do
      ao.send({Target = recipient, Data = msg.Data})
    end
    Handlers.utils.reply("Broadcasted.")(msg)
  end
)
```
