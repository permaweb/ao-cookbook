# 理解收件箱 Inbox

In aos, processes are executed in response to messages via handlers. Unhandled messages are routed to the process's Inbox.

在 aos 中，进程通过 handlers 获取消息并且执行。未处理的消息将进入进程的收件箱(Inbox)

## 什么是 Handlers?

Handler 是一个函数，接收并且处理进程消息。它通过将消息作为参数来执行动作。

```lua
function main(Message, ao)
  ...dostuff
  return {
    Output = ...,
    Messages = {},
    Spawns = {}
  }

end
```

And the `main` function returns a lua Table providing `Output, Messages, and Spawns` or an `Error`. With aos you can add functionality to your process by using a Handler. The Handler takes three parameters:

`main` 函数返回一个 lua Table，包含 `Output, Message, Spawns` 或者 `Error`。在 aos 中您可以给进程添加 `Handler` 方法来处理逻辑，`Handler` 中有三个参数：

1. Handler 名字
2. 匹配函数
3. 处理函数

```lua
Handlers.add("name",
  function (Msg)
    -- Does this message match (return true or false)
    return Msg.Action == "Register"
  end,
  function (Msg)
    print("Registered User.")
    table.insert(Members, Msg.From)
    ao.send({Target = Msg.From, Data = "Registered."})
  end
)
```

## 关于收件箱

An inbox is a storage area for messages that have not yet been processed. Think of it as a holding zone for incoming, or "inbound," items awaiting handling. Once a message is processed, it's no longer considered "inbound" and thus leaves the inbox.

收件箱会存储尚未处理的消息，它们在这里等待被处理。一旦消息被处理，它就会被从收件箱中移除。

> 示例：将收件箱视为语音邮件。 正如未接听的电话会被转至语音信箱，让您稍后处理一样，您的进程不立即处理的消息都会进入收件箱。未处理的消息将被存储在这里，直到您处理他们。

## 总结

一开始似乎所有邮件都会进入您的收件箱，如果它们在处理后就被删除，这可能会令人疑惑。 语音邮件的类比应该可以解释这种设计：就像您接听的电话不会转到语音邮件一样，您处理的消息也不会出现在收件箱中。 这说明了收件箱和 Handler 的功能。