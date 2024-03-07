# 纯手工打造代币

::: info
进一步深入研究 `ao`，您现在已经准备好创建自己的代币，这是这种去中心化媒介中价值和交换的象征。如果您发现自己想要学习如何创建代币，但尚未看过[消息传递](messaging)和[创建聊天室](chatroom) 课程，请务必去学习下，因为此页面是多部分互动教程的一部分。
:::

创建代币时，我们将继续使用 `ao` 中的 [Lua 语言](../../references/lua.md) 来挖出一个代币，并遵循 [代币规范](../../references/token.md) 中概述的原则。

## 继续深入兔子洞

在我们上一篇教程[创建聊天室](chatroom)中，我们学习了如何在 `ao` 中创建一个聊天室，邀请 `Morpheus` 和 `Trinity` 到我们创建的聊天室，然后 `Trinity` 现在要求我们为她创建一个代币，以证明我们值得继续深入兔子洞。

**让我们开始吧。**

## 构建代币的两种途径

构建代币时有两条路径可供选择：

1. **蓝图法**：这是一个预先设计的模板，可以帮助您在 `ao` 中快速构建代币。这是一种很好的入门方式，并且可以根据您的需求进行定制。

   点击此处了解有关[代币蓝图](../../guides/aos/blueprints/token.md)的更多信息。

2. **手动方法**：这是从头开始在 `ao` 中构建代币的分步指南。这条路径适合那些想要了解代币内部运作以及如何从头开始构建代币的人。

   请在此处查看完整的[构建代币](../../guides/aos/token.md)指南。

## 蓝图方法

在本教程中，我们将使用令牌蓝图为 `Trinity` 创建代币。 这是一个预先设计的模板，可帮助您在 `ao` 中快速构建代币。

### 如何使用代币蓝图

1. 确保我们在教程前面的步骤中位于同一目录中。
2. 打开终端。
3. 启动 `aos` 进程。
4. 输入 `.load-blueprint token`

这将加载 `ao` 中教程代币所需的处理程序。 请务必注意，代币蓝图并非特定于本教程，可以用作您想要创建的任何代币的基础。

### 验证蓝图是否已加载

输入 `Handlers.list` 以查看新加载的处理程序。

您应该看到已加载到 `aos` 进程中的新处理程序列表。 如果您一直遵循本教程中前面的步骤，您还应该看到聊天室的处理程序。

**例子：**

![代币处理程序](/token3.png)

### 测试代币

现在令牌蓝图已加载，我们可以通过使用 `Action = "Info"` 标签向自己发送消息来测试令牌。

```sh
Send({ Target = ao.id, Action = "Info" })
```

这将向控制台打印一条消息，但要读取该消息，我们需要从最新消息中调用 `.Data`。

```sh
Inbox[#Inbox].Data

# 将 `#Inbox` 替换为最后收到的消息的编号。
```

这会将代币信息打印到控制台。它应该显示您的进程 ID 以及可用代币的总余额。

### 向 Trinity 发送代币

现在我们已经测试了代币并且它按预期工作，我们可以将一些代币发送到 `Trinity`。 我们将使用 `Action = "Transfer"` 标签向 `Trinity` 发送 1000 个代币。

```sh
Send({ Target = ao.id, Action = "Transfer", Recipient = Trinity, Quantity = "1000"})
```

当 `Trinity` 收到代币时，她将用一条消息响应此转账，以确认她已收到代币。

她的回应看起来像这样：

`Trinity:` "Token received. Interesting. I wasn't sure you'd make it this far. I'm impressed, but we are not done yet. I want you to use this token to tokengate the chatroom. Do that, and then I will believe you could be the one."

您已经完成了创建代币并将其发送到 `Trinity` 的过程。 您现在已准备好继续本教程的下一步。 [代币门控聊天室](tokengating)。
