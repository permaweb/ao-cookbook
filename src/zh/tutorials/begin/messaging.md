# `ao` 中的消息传递

## 消息是如何为 `ao` 提供并行计算能力的

`ao` 是一个高度可扩展的环境，每个进程并行运行。每个进程独立且异步运行，所以在进程之间直接函数调用是不可行的。

我们使用异步通信来解决这个问题。 进程之间通过发送和接收消息，而不是直接相互调用函数。 这种方法允许灵活高效的交互，进程可以响应消息，增强系统的可扩展性和响应能力。

我们将首先探索 `aos` 中消息传递的基础知识，如何查看收件箱中收到的消息，以及如何将消息发送到其他进程。

## 视频教程

<iframe width="680" height="350" src="https://www.youtube.com/embed/6aCjKK6F1yQ?si=3Ny7U-GgyNsRWlXS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 步骤 1：理解消息结构

- **消息基础知识：** `ao` 中的消息是使用 Lua 表构建的，Lua 表是可以保存多个值的通用数据结构。 在这些表中，`数据` 字段至关重要，因为它包含消息的内容或 `payload`。使用这种结构可以在进程之间高效地发送和接收信息，示例中展示了 `ao` 原语如何利用 Arweave 的底层功能进行复杂的、可组合的操作。

  规范详情请参考[G8way 规范页面](https://specs.g8way.io/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw)上的原始文档。

- **示例**：`{ Data = "Hello from Process A!" }` 是一条简单的消息。

## 步骤 2：打开 aos CLI

- 在终端中输入 `aos` 并按 Enter 键，以启动 aos 命令行界面 (CLI)。

```sh
aos
```

## 步骤 3：如何发送消息

```lua
  Send({ Target = "process ID", Data = "Hello World!" })
```

- **Send**：`Send` 是 aos 中全局函数，用于发送消息。
- **Target**：如果要将消息发送到特定进程，请在消息中包含 `Target` 字段。
- **Data**：`Data` 是你希望目标进程接收的文本消息。 在此示例中，消息是 `Hello World！`。

## 步骤 4：存储 `Morpheus` 的进程 ID

我们将使用下面提供的进程 ID 并将其存储为名为 `Morpheus` 的变量。

```lua
wu_tAUDUveetQZpcN8UxHt51d9dyUkI4Z-MfQV8LnUU
```

通过复制上面的进程 ID 并在 aos CLI 中运行以下命令以便将其存储为变量：

```lua
Morpheus = "wu_tAUDUveetQZpcN8UxHt51d9dyUkI4Z-MfQV8LnUU"
```

这会将进程 ID 存储为名为 `Morpheus` 的变量，从而更轻松地与特定进程 ID 进行交互。

::: info
创建 `Morpheus` 变量时，你应该看到的唯一响应是 `undefined`。 这是预料之中的。 要检查变量是否已成功创建，请输入 `Morpheus` 并按 Enter。 你应该会看到你存储的进程 ID。
:::

### 检查 `Morpheus` 变量

```lua
-- 通过输入 `Morpheus` 检查 Morpheus 变量
Morpheus
-- 预期结果:
wu_tAUDUveetQZpcN8UxHt51d9dyUkI4Z-MfQV8LnUU


-- 如果 `undefined` 被返回,
-- 那么变量没有创建成功。
```

## 步骤 5：向 Morpheus 发送消息

获取 Morpheus 的进程 ID 并将其存储在变量中后，你就可以与它进行通信了。 为此，你可以使用 `Send` 函数。 Morpheus 本身就是 ao 中运行的一个并行进程。 他使用一系列 handler 接收和发送消息。 让我们向他发送消息，看看会发生什么。

```lua
Send({ Target = Morpheus, Data = "Morpheus?" })
```

- 你的 `Target` 是 `Morpheus`，这是我们之前使用 `Morpheus` 进程 ID 定义的变量。
- `Data` 是你要发送给 Morpheus 的消息。 在这里，它是 `Morpheus?`。

**预期结果：**

```lua
-- 你的消息命令
Send({ Target = Morpheus, Data = "Morpheus?"})
-- 消息已添加到发件箱
message added to outbox
-- 从 `Morpheus` 的进程 ID 收到一条新消息
New Message From BWM...ulw: Data = I am here. You are f
```

你已向 Morpheus 发送了一条消息并收到了回复，但你无法阅读完整的消息。 让我们了解 `收件箱` 以及如何阅读消息。

## 步骤 6：收件箱

`收件箱` 是你从其他进程接收消息的地方。
::: info
要进一步深入了解收件箱的消息结构，请转到 [消息](../../concepts/messages) 概念页面。
:::

让我们检查你的收件箱，看看你收到了多少条消息。

在 aos CLI 中，键入以下命令：

```lua
#Inbox
```

如果你完全按照本教程进行操作，收件箱中不会有太多消息。 但是，如果你一直在尝试 aos 环境，则收件箱中可能会多于 1 条消息。

**返回值示范:**

```lua
-- 你的 `收件箱` 命令
#Inbox
-- 该命令将返回你收件箱中的消息数量
4
```

在上面的示例中，返回为 `4`，表示收件箱中有四封邮件。

由于我们主要是为了寻找 `Morpheus` 的回复，因此我们假设他的消息是最后收到的消息。要阅读收件箱中的最后一条消息，请键入以下命令：

```lua
Inbox[#Inbox].Data
```

该命令允许你将数据与消息分离，并且仅读取特定数据字段的内容。

预期返回：

```lua
-- 你的 Inbox[x].Data 命令
Inbox[#Inbox].Data
-- 该命令将返回消息的 `Data` 字段。
-- Data 通常代表基于文本的消息
-- 从一个进程接收到另一进程。
I am here. You are finally awake. Are you ready to see how far the rabbit hole goes?
```

你现在正在使用自己的进程与 Morpheus 进行通信，Morpheus 是 ao 中运行的另一个并行进程。 你现在已准备好继续本教程的下一步。

## 步骤 7：发送带有标签的消息

**标签的用途**：aos 消息中的标签用于有效地分类、路由和处理消息。它们在消息处理中发挥着至关重要的作用，尤其是在处理多个进程或复杂的工作流程时。

某些进程仅与使用特定标签的消息进行交互的 `Handlers`。 例如，一个进程可能有一个 handler，仅与具有特定标签的消息交互，我们将在[聊天室](chatroom)教程中看到一个示例。

### 如何在消息中使用标签

就 Morpheus 而言，我们可以使用标签对消息进行分类，并且由于 Morpheus 是一个自治进程，因此他拥有可以与具有特定标签的消息进行交互的 handler。

**向消息添加标签**：

- 我们已经知道消息的 `Data` 是你想要发送到另一个进程的文本的消息。此前，我们向 Morpheus 发送了一条没有任何标签的消息，Morpheus 进程使用 handler 响应该数据。

### 让 Morpheus 知道我们已经准备好了

向 Morpheus 发送一条带有标签 `Action`，Data 值包含 `rabbithole` 的消息。

**例子：**

```lua
Send({ Target = Morpheus, Data = "Code: rabbithole", Action = "Unlock" })
```

**预期返回:**
![Morpheus 的回应 2](./messaging2.png)

### 使用标签的一些建议

- **一致的标记**：为你的应用程序开发一致的标记系统，使消息处理更具备规则。
- **标签命名**：为标签选择清晰且具有描述性的名称。 让开发者一目了然地更容易理解消息的目的和上下文。
- **标签安全**：请记住，标签未加密或隐藏，因此请避免使用敏感信息作为标签。

### 标签的高级用法

- **工作流程管理**：标签有助于管理工作流程，特别是在消息经过多个进程的系统中。

## 消息传递的其他建议

- **消息结构**：可以使用更多字段，如 `Epoch`、 `From` 和 `Nonce`，以满足更复杂的消息传递需求。
- **调试**：使用 [`Dump`](/zh/concepts/tour#_6-使用-dump-进行数据展示) 函数打印消息以进行调试。
- **安全注意事项**：谨慎对待消息的内容和处理，切勿发送任何私人或敏感的内容。

## 结论

现在你已经学习了如何发送带标签的消息，这是 aos 中用于分类和路由消息的强大工具。

墨菲斯正式邀请你进入下一阶段的旅程。 你现在已准备好继续本教程的下一步，[创建聊天室](chatroom)。
