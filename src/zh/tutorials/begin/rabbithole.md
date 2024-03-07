# 进入 `The Construct` - 交互式教程

![白兔](/white_rabbit_outline.svg)

## 醒来吧，尼奥……

你准备好看看兔子洞有多深了吗？

这个交互式教程将利用您迄今为止所学到的知识并将其应用到任务中。

### 任务：冲出矩阵并进入 `The Construct`

该结构是 ao 内的一个代币门控聊天室，只有完成一系列任务的人才能访问。

**现在...让我们开始吧。**

::: warning
您必须安装最新版本的 aos 才能完成本教程。
:::

### 1. 找到墨菲斯

Morpheus 的进程 ID：

```lua
9yOQrYNwIfIOeSswRDGUMd5gvMWJKxleInD_95DEC4A
```

用这个进程 ID 在 aos 里命名为 `Morpheus`。 这是进入 `The Construct` 的第一步。

```lua
Morpheus = "9yOQrYNwIfIOeSswRDGUMd5gvMWJKxleInD_95DEC4A"
```

向 Morpheus 发送消息，并告诉他您已准备好开始。

```lua
Send({ Target = Morpheus, Data = "I'm Ready" })
```

当您发送此消息后，他将回复下一步。按照他给你的指示进行操作，你就会踏上前往 `The Construct` 的路上。

::: info
如果您需要帮助了解消息传递过程，请查看[消息传递](messaging)教程。
:::

### 2. 向墨菲斯证明自己

Morpehus会给你一系列任务来完成。这些任务将涉及：

- 建立一个[聊天室](chatroom)。
- 在聊天室中广播消息。
- 为聊天室编写自定义处理程序。

当你完成这些任务后，墨菲斯会给你下一步的指示，其中将涉及找到 Trinity。

### 3.找到 Trinity

Trinity 的进程ID只能通过完成 Morpheus 的任务来获得。

一旦您收到 Trinity 的进程 ID，您需要在 aos 中将其命名为 `Trinity`。 然后你会向她发送消息 `"White Rabbit"`。

```lua
Send({ Target = Trinity, Data = "White Rabbit" })
```

她将做出回应，教程的下一阶段将开始。

### 4. 向 Trinity 证明自己

就像 Morpheus 一样，Trinity 会给你一系列任务来完成。

这些任务将涉及：

- 创建一个[代币](token)。
- 代币化您为 Morpheus 构建的聊天室。
- 创建您自己的[游戏和机器人](../bots-and-games/index)。
- 在代币化聊天室中注册您的进程。

完成这些任务后，Trinity 将为您提供本教程下一阶段的说明。

### 5. 接收进入 `the Construct` 的代币

通过完成 Morpheus 和 Trinity 的任务，您将收到一个代币，可以让您进入 `the Construct`。

### 6. 进入 `the Construct`

然后 Trinity 将指导您如何使用该代币进入 `the Construct`。

进入 `the Construct` 后，您将能够与完成教程的其他人聊天。
