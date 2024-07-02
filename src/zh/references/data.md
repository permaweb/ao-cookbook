# 使用 ao 访问 Arweave 上的数据

在使用 ao 进行开发的过程中，您可能需要访问 Arweave 上的数据。使用 ao，您的进程可以发送一个赋值指令，指示网络将该数据提供给您的进程。

如需请求 Arweave 上的数据，您只需调用 Assign 函数，并传入一个进程列表（您希望将数据赋值给这些进程）和一个 Message 参数（该参数是消息的交易 ID）。

```lua

Assign({
  Processes = { ao.id },
  Message = 'message-id'
})

```

您也可以调用 Send 函数，并在 Assignments 参数中传入一个进程 ID 列表。这将指示网络生成消息，然后将其赋值给 Assignments 列表中的所有进程 ID。

```lua
Send({
  Target = ao.id,
  Data = 'Hello World',
  Assignments = { 'process-id-1', 'process-id-2' }
})
```

在 lua 中，你可以使用 “.base64” 模块将你的数据从 base64 解码回原始格式。

```lua
local base64 = require(".base64")


local data = base64.decode(Msg.Data.Data)
```

## 为什么从 Arweave 上面取数据

您的进程可能需要访问消息中的数据来进行决策，或者您可能希望通过`数据加载`功能为进程添加功能。 此外，您可能希望在不复制整个消息的情况下从进程访问消息。
