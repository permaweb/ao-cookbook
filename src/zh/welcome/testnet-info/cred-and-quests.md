# CRED 及 任务板 FAQ

::: info

`ao` 生态系统正处于非常早期的阶段，充满机遇。 有一个社区任务板，其中包含各种方法，您可以参与测试和构建软件以发展生态系统，同时赚取其原生货币：CRED。

:::

## 视频教程

<iframe width="680" height="350" src="https://www.youtube.com/embed/QA3OmkLcdRs?si=CLAZrIUhJ0aEGYxM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 什么是 CRED?

CRED 是 `ao` 测试网的原生货币。它奖励给那些完成任务的人。

## CRED 有什么用处？

> CRED 代币是个人社会信用的数字表示。
>
> 无可否认，谁拥有最多的信用，谁就是最酷、最值得信赖的人
>
> -Bobinstein (bobinstein)，来自 [Discord](https://discord.com/channels/1210396395643863101/1210606156582752436/1215723479672815647)

> [CRED] 的未来尚未确定……
>
> -Ros (rosmcmahon)，来自 [Discord](https://discord.com/channels/1210396395643863101/1210606156582752436/1217101371472478318)

## 我如何赚取 CRED？

您可以通过完成 `ao` 核心开发人员和社区贡献者定义的可用任务来赚取 CRED。

## 有哪些任务可供选择？

`ao` localnet 中有一个开发者聊天室，您可以在其中查询任务信息。
首先，启动`aos`：

```sh
$ aos
```

接下来，加入 `Quests` 聊天室（如果您还没有这样做）。 您可以选择提供您的昵称作为第二个参数。

```lua
aos> Join("Quests")
# 或
aos> Join("Quests", "MyScreenName")
```

然后您可以将 `/Quests` 斜线命令发送到该聊天室。 如果您已加入多个聊天室，第二个参数按名称仅将消息发送到一个特定的聊天室。

```lua
aos> Say("/Quests")
# 或
aos> Say("/Quests", "Quests")
```

几秒钟后，机器人将通过向聊天室广播可用任务列表来做出响应。

## 如何查看详细的任务描述？

您可以通过发送 `/Quests:[index]` 斜杠命令进入 `Quests` 聊天室来了解有关特定任务的详细信息，其中 `[index]` 应替换为任务编号，例如：

```lua
aos> Say("/Quests:1", "Quests")
# 或
aos> Say("/Quests:2", "Quests")
```

### 任务 1：`Begin`

任务 1 的详细步骤可在本说明书的 [开始](../../tutorials/begin/index) 教程中找到。

### 任务 2：`Bots-and-Games`

任务 2 的详细步骤可在本说明书的 [机器人和游戏](../../tutorials/bots-and-games/index) 教程中找到。

## 我如何完成任务？

请遵循任务描述中的 _所有_ 步骤，包括提交认领申请。

## 我如何获得我的 CRED？

每个任务的文字描述将为您提供有关如何提交认领申请的详细信息。
_完全完成任务后_，请务必 _按照任务描述中的说明_ 提交认领。
您必须完成任务的所有步骤并提交索赔请求才能收到您的 CRED。
手动处理您的索赔请求需要一些时间。

## 我什么时候可以获得我的 CRED？

您的请求将被手动审核，以验证您是否遵循了所有必要的步骤。
请在工作日大约 24 小时内处理您的认领申请。

## 我如何查看/验证我当前的 CRED 余额？

您可以将 `credUtils` 蓝图加载到 `ao` 进程中，以快速查询您的CRED余额，甚至将 CRED 发送给朋友！

```lua
aos> .load-blueprint credUtils
Loading...  credUtils                                        # sample output
undefined                                                    # sample output
aos> CRED.balance
Your CRED balance has not been checked yet. Updating now.    # sample output
CRED Balance updated: 500.000                                # sample output
```

阅读有关 [aos 蓝图](../../guides/aos/blueprints/index) 的更多信息。
