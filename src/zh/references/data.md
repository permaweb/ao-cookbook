# 使用 ao 访问 Arweave 上的数据

在您的 ao 开发工作流程中，可能有时候您想要从 Arweave 访问数据。使用 ao，您的进程可以发送一个任务指示网络将该数据提供给您的进程。

为了从 Arweave 请求数据，您只需调用 Assign，提供您想要分配数据的进程列表，以及一个消息，该消息是一个消息的 txid。

```lua

Assign({
  Processes = { ao.id },
  Message = 'message-id'
})

```

您还可以在 Assignments 参数中调用 Send，并提供一个进程 ID 的列表。这将告诉网络生成消息，然后将其分配给 Assignments 列表中的所有进程 ID。

```lua
Send({
  Target = ao.id,
  Data = 'Hello World',
  Assignments = { 'process-id-1', 'process-id-2' }
})
```

## 为什么从 Arweave 上面取数据?

您的进程可能需要访问消息中的数据以做出决策，或者您可能希望通过 `data` 载入功能为您的进程添加功能。或者您可能希望从进程中访问消息，而不复制整个消息。
