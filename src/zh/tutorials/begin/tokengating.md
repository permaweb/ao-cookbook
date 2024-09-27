# 支持 token 的聊天室

::: info
现在我们已经创建了一个 token 并将其发送到 `Trinity`，我们可以使用该 token 来对我们的聊天室进行控制：只允许拥有 token 的人进入聊天室。
:::

## 如何创建支持 token 的聊天室

让我们创建一个 handler，允许我们对聊天室进行准入控制。该 handler 将响应标签 `Action = "Broadcast"`，这意味着它将替换我们原始的 `Broadcast` handler。

## 步骤 1：启动相同的 `aos` 进程

确保你使用的 `aos` 进程与你在整个教程中使用的进程相同。

## 步骤2：打开 `chatroom.lua` 文件

这与我们在 [聊天室](chatroom) 教程中用于创建聊天室的文件相同。

## 步骤 3：编辑你的 `Broadcast` handler

将原来的 `Broadcast` handler替换为以下代码：

```lua
Handlers.add(
    "Broadcast",
    Handlers.utils.hasMatchingTag("Action", "Broadcast"),
    function(m)
        if Balances[m.From] == nil or tonumber(Balances[m.From]) < 1 then
            print("UNAUTH REQ: " .. m.From)
            return
        end
        local type = m.Type or "Normal"
        print("Broadcasting message from " .. m.From .. ". Content: " .. m.Data)
        for i = 1, #Members, 1 do
            ao.send({
                Target = Members[i],
                Action = "Broadcasted",
                Broadcaster = m.From,
                Data = m.Data
            })
        end
    end
)
```

该 handler 现在将在将消息广播到聊天室之前会检查发送者 token 的余额。 如果发送者没有 token ，则消息将不会被广播。

保存文件。

## 步骤 4：重新加载 `chatroom.lua` 文件

要将原始的 `Broadcast` handler 替换为新的 handler，你需要重新加载 `chatroom.lua` 文件。

```lua
.load chatroom.lua
```

## 步骤 5：测试支持 token 的聊天室

现在聊天室已经是支持 token 的聊天室，让我们通过向聊天室发送消息来测试它。

### 来自原来的 aos 进程

首先，我们将从原始的 aos 进程进行测试。

```lua
Send({ Target = ao.id , Action = "Broadcast", Data = "Hello" })
-- 预期结果:
message added to outbox
Broadcasting message from Neo. Content: Hello.
```

记住，当你不知道怎么查看最新的消息的时，一定使用：

```lua
Inbox[#Inbox].Data
```

## 用另一个进程 ID 进行测试

另外打开一个终端创建新的进程：

```sh
aos name1
```

现在，让我们使用这个没有 token 的新 aos 进程来测试。

我们首先需要注册到聊天室。

```lua
Send({ Target = [聊天室的 Process ID], Action = "Register" })
-- 预期结果:
message added to outbox
New Message From [Your Process ID]: Data = registered
```

现在，让我们尝试向聊天室发送消息。

```lua
Send({ Target = [聊天室的 Process ID], Action = "Broadcast", Data = "Hello?" })
-- 预期结果:
message added to outbox
UNAUTH REQ: [New Process ID]
```

如你所见，该消息未广播，因为新进程没有 token 。

## 告诉 Trinity "It is done"

回到原来的聊天室 aos 进程中，向聊天室发送一条广播消息，表示“已完成”。

```lua
Send({ Target = ao.id , Action = "Broadcast", Data = "It is done" })
```

::: warning
了解精确匹配数据和区分大小写非常重要。 如果你没有收到 Morpheus 或 Trinity 的回复，请务必检查你的数据和标签的内容。
:::

然后 Trinity 将响应聊天室已经成功完成 token 准入控制。

### 预期结果

Trinity 会发送一条消息说："I guess Morpheus was right. You are the one. Consider me impressed. You are now ready to join The Construct, an exclusive chatroom available to only those that have completed this tutorial. Now, go join the others by using the same tag you used `Register`, with this process ID: [Construct Process ID]. Good luck."

## 结论

你做到了！ 你已成功对聊天室进行 token 控制。现在已经解锁了对 `Construct` 的访问，只有那些完全完成本教程的人才能进入。

### 恭喜你!

你已经表现出了巨大的潜力。 我希望你喜欢本教程。 现在你已准备好在 `ao` 中自由构建。
