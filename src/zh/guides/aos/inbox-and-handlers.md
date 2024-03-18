# 理解收件箱(Inbox)

在 aos 中，进程通过 handlers 获取消息并且执行。未处理的消息将进入进程的收件箱(Inbox)

## 什么是 Handlers?

Handler 是一个函数，接收并且处理进程消息。它处理这些消息是通过将消息作为参数来进行的。

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

`main` 函数返回一个 lua Table，包含 `Output, Message, Spawns` 或者 `Error`。在 aos 中你可以给进程添加 `Handler` 方法来处理逻辑，`Handler` 中有三个参数：

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

收件箱会存储尚未处理的消息，它们在这里等待被处理。一旦消息被处理，它就会被从收件箱中移除。

> 示例：将收件箱视为语音邮件。 正如未接听的电话会被转至语音信箱，让你稍后处理一样，你的进程不立即处理的消息都会进入收件箱。未处理的消息将被存储在这里，直到你处理他们。

## 总结

一开始似乎所有邮件都会进入你的收件箱，如果它们在处理后就被删除，这可能会令人疑惑。 语音邮件的类比应该可以解释这种设计：就像你接听的电话不会转到语音邮件一样，你处理过的消息也不会出现在收件箱中。 这说明了收件箱和 Handler 的功能。
