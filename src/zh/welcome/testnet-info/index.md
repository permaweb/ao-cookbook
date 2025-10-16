---
prev:
  text: "入门"
  link: "../getting-started"
next:
  text: "CRED 和任务 FAQ"
  link: "./cred-and-quests"
---

# 参与 ao 测试网

2024年2月27日，`ao` 测试网上线，供开发者和早期用户探索这台超并行计算机。

## 什么是 ao 测试网？

ao 测试网允许用户免费与 ao 计算机交互，共同测试和构建主网。

你可以通过 aos 控制台连接 ao 计算机。 在接下来的文档中，你会发现许多可以尝试的任务，这些任务可以帮助你赚取 CRED 代币（测试网的代币）。

## 安装 aos 客户端

如果你已经装好 [NodeJS](https://nodejs.org)，你所需要做的就是安装 aos 并运行它：

```sh
npm i -g https://get_ao.g8way.io
```

安装后，我们只需运行以下命令即可启动新的 aos 进程！

```sh
aos
```

## 加入 ao 的原生社区聊天

ao 网络托管着许多聊天服务器，你可以直接从 aos 控制台与其他开发人员交谈。 要加载聊天客户端，请运行以下命令：

```lua
.load-blueprint chat
```

查看可用房间，你可以运行：

```lua
List()
```

加入房间并与其他开发者聊天，如下所示：

```lua
Join("Getting-Started", "yourName")
Say("Hi")
```

## AO 测试网的第一步

为了加快在 ao 中的构建速度，查看以下教程：

- 学习 [开始](/zh/tutorials/begin/) 教程来构建你自己的代币化聊天室
- 学习 [机器人和游戏](/zh/tutorials/bots-and-games/) 教程，构建一个在 ao-effect 竞技场中玩耍的机器人

## 帮助构建 ao 生态系统并赚取 CRED

ao 生态处于非常早期的阶段，充满机遇。 社区里有一个 `quest` 板块（任务板块），其中包含各种方法让你可以参与测试和构建软件以发展生态，同时赚 ao 原生代币 - legacynet CRED。

要列出当前可用的任务，请使用 `Join("Quests")` 和 `Say "/Quests"` 加入 `Quests` 聊天频道以接收任务列表。

玩得开心，如果需要帮助，请随时在 ao 聊天中向其他构建者寻求帮助！
