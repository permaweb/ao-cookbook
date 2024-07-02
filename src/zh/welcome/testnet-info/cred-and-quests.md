
# CRED 和任务 FAQ

::: info

`ao`生态系统目前还处于非常早期的阶段，充满机遇。社区任务板提供了许多参与测试和构建软件以发展生态系统的方法，同时还能赚取`ao`生态系统的原生货币：CRED。

:::

## 视频教程

<iframe width="680" height="350" src="https://www.youtube.com/embed/QA3OmkLcdRs?si=CLAZrIUhJ0aEGYxM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 什么是CRED?

CRED是`ao`测试网的原生货币，用于奖励完成任务的用户。

## CRED有什么用？

> CRED 代币是你的社交江湖地位，数字化身。
>
> 无论是谁，谁拥有最多的 CRED 代币，谁就是当之无愧的社交达人、也是你最值得信任的人。
>
> -Bobinstein (bobinstein), 来自 [Discord](https://discord.com/channels/1210396395643863101/1210606156582752436/1215723479672815647)

> [CRED] 的未来，充满无限可能。
>
> -Ros (rosmcmahon), 来自 [Discord](https://discord.com/channels/1210396395643863101/1210606156582752436/1217101371472478318)

## 如何获得 CRED？

你可以通过完成`ao`核心开发人员和社区贡献者制定的任务赚取 CRED。

## 想知道有哪些任务可以做吗？

ao 本地网络中有一个开发聊天室，您可以在那里查询任务信息。首先，启动 aos：

```sh
$ aos
```

接下来，加入 `Quests` 聊天室（如果你还没有加入的话）。你还可以将你的用户名/昵称作为第二个参数加入聊天室（可选）。

```lua
aos> Join("Quests")
# OR
aos> Join("Quests", "MyScreenName")
```

然后，你可以向聊天室发送 `/Quests` 命令。如果你加入了多个聊天室，还可以把第二个参数作为指定的聊天室名称，发送消息。

```lua
aos> Say("/Quests")
# OR
aos> Say("/Quests", "Quests")
```

几秒钟后，机器人会自动向聊天室发送所有可以做的任务信息。

## 如何查看任务详情？

你可以通过向`Quests` 聊天室发送命令 /Quests:[index] 了解更多详细信息，其中 [index] 应该替换为任务编号，例如：

```lua
aos> Say("/Quests:1", "Quests")
# OR
aos> Say("/Quests:2", "Quests")
```

### 任务1： "开始"

本文档的 [开始](/tutorials/begin/index) 教程将详细介绍任务1的操作步骤。

### 任务 2：“机器人和游戏”

本教程的 [机器人和游戏](/tutorials/bots-and-games/index) 将详细介绍任务2的操作步骤

## 如何完成任务？

只要按照任务描述中的所有步骤操作，包括提交领取奖励，就算完成任务啦！

## 如何获得 CRED？

每个任务的文本描述都会详细说明如何提交领取奖励的请求。 完成任务后，请务必按照任务描述中的指示提交领取奖励的请求。 只有完成任务的所有步骤，并提交请求，你才能获得CRED奖励。审核领取奖励的请求需要一些手动处理时间，请耐心等待。

## 我什么时候可以拿到我的CRED？

你的领取奖励请求会经过人工审核，以确认你是否完成了所有必要步骤。请在工作日耐心等待约 24 小时，以便处理你的请求。

## 如何查看/核实我当前的 CRED 余额？

你可以将`credUtils` 蓝图加载到你的 ao 进程中，以便快速查询你的 CRED 余额，也可以将 CRED 发送给朋友！

```lua
aos> .load-blueprint credUtils
Loading...  credUtils                                        # sample output
undefined                                                    # sample output
aos> CRED.balance
Your CRED balance has not been checked yet. Updating now.    # sample output
CRED Balance updated: 500.000                                # sample output
```

了解有关 [aos 蓝图](/guides/aos/blueprints/index) 的更多信息。
