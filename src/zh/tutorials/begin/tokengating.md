# 代币门控这个聊天室

::: info
现在我们已经创建了一个代币并将其发送到 `Trinity`，我们可以使用该代币来对我们的聊天室进行代币门控。 这将只允许那些拥有代币的人进入聊天室。
:::

## 如何对聊天室进行代币门控

让我们创建一个handler，允许我们对聊天室进行代币门控。该handler将响应标签 `Action = "Broadcast"`，这意味着它将替换我们为聊天室构建的原始 `Broadcast` handler。

## 步骤 1：启动相同的 `aos` 进程

确保您使用的 `aos` 进程与您在整个教程中使用的进程相同。

## 步骤2：打开 `chatroom.lua` 文件

这与我们在 [聊天室](chatroom) 教程中用于创建聊天室的文件相同。

## 步骤 3：编辑您的 `Broadcast` handler

将原来的 `Broadcast` handler替换为以下代码：

```lua
Handlers.add(
    "Broadcast",
    Handlers.utils.hasMatchingTag("Action", "Broadcast"),
    function(m)
        if tonumber(Balances[m.From]) < 1 then
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

该handler现在将在将消息广播到聊天室之前检查发送者代币的余额。 如果发送者没有代币，则消息将不会被广播。

保存文件。

## 步骤 4：重新加载 `chatroom.lua` 文件

要将原始的 `Broadcast` handler替换为新的handler，您需要重新加载 `chatroom.lua` 文件。

```sh
.load chatroom.lua
```

## 步骤 5：测试代币门控

现在聊天室已进行代币门控，让我们通过向聊天室发送消息来测试它。

### 来自原来的 aos 进程

首先，我们将从原始的 aos 进程进行测试。

```sh
Send({ Target = ao.id , Action = "Broadcast", Data = "Hello" })
# 预期结果:
message added to outbox
Broadcasting message from Neo. Content: Hello.
```

## 从新的 aos 进程的另一个进程 ID 进行测试

现在，让我们从一个没有代币的新 aos 进程来测试它。

我们首先需要注册到聊天室。

```sh
.load chatroom.lua
Send({ Target = ao.id, Action = "Register" })
# 预期结果:
message added to outbox
New Message From [Your Process ID]: Data = registered
```

现在，让我们尝试向聊天室发送消息。

```sh
Send({ Target = ao.id, Action = "Broadcast", Data = "Hello?" })
# 预期结果:
message added to outbox
UNAUTH REQ: [New Process ID]
```

如您所见，该消息未广播，因为新进程没有代币。

## 告诉 Trinity "It is done"

从原始的 aos 进程中，向聊天室发送一条广播消息，表示“已完成”。

```lua
Send({ Target = ao.id , Action = "Broadcast", Data = "It is done" })
```

::: warning
了解精确匹配数据和区分大小写非常重要。 如果您没有收到 Morpheus 或 Trinity 的回复，请务必检查您的数据和标签的内容。
:::

然后 Trinity 将响应聊天室已经成功代币门控。

### 预期结果

Trinity 会发送一条消息说："I guess Morpheus was right. You are the one. Consider me impressed. You are now ready to join The Construct, an exclusive chatroom available to only those that have completed this tutorial. Now, go join the others by using the same tag you used `Register`, with this process ID: [Construct Process ID]. Good luck."

## 结论

你已经做到了！ 您已成功对聊天室进行代币门控。现在已经解锁了对 `Construct` 的访问，只有那些完全完成本教程的人才能进入。

### 恭喜你!

你已经表现出了很大的希望。 我希望您喜欢本教程。 现在您已准备好在 `ao` 中自由构建。
