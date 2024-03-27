# 使用 ao 访问 Arweave 上的数据

在你的 ao 开发工作流程中，可能有时候你想要访问 arweave 上的数据。你的进程可以使用 ao 发送一条消息，然后 ao 网络会通过一个 Message 对象将数据提供给你的 Process 对象。

为了从 arweave 请求数据，你只需包含一个名为 `Load` 的 `Tag`，在该标签中，你可以使用数据的 TXID 来检索。

```lua

Send({
  Target = ao.id,
  Tags = {
    Load = "WFM_Mi2FUNGCeP7r99XyeE3ySurt07LHxEGfW-wuIdY",
    Action = "Data"
  }
})

```

这条消息通过处理到达进程时，在传入消息的 `Data` 属性中，有一个 DataItem 的引用。同时，DataItem 的 `Data` 将以 base64 的类型传递。

```lua
{
  Owner = "[Owner Address]"
  Target = "[Process Identifier]",
  Data = {
    Owner = "xDKpdiZ7H9n_SsdX_CMpkybMGIdin5AUciM00mQgxRE",
    Tags = {
      "Content-Type": "application/json"
    },
    Data = "[base64]",
    ...
  }
  ...
}

```

在 lua 中，你可以使用 “.base64” 模块将你的数据从 base64 解码回原始格式。

```lua
local base64 = require(".base64")


local data = base64.decode(Msg.Data.Data)
```

## 为什么从 Arweave 上面取数据

你的进程可能需要访问数据来做决策，或者你可能想要通过 `data` 加载功能，为你的进程添加特性。
