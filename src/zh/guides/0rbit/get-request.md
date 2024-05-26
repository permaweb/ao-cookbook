---
prev:
  text: "0rbit"
  link: "/guides/0rbit/index"
next:
  text: "Post Data"
  link: "/guides/0rbit/post-request"
---

# 获取任意数据

本教程将构建一个简单的 `ao` 进程，利用 `0rbit` 预言机网络从网上获取数据。

## 开始使用 `aos`

使用 `ao` 计算机需要一个本地环境来运行 `ao` 进程，aos 将为你提供这个环境。

1. **安装 aos**
   打开你的终端并运行：

```bash
npm i -g https://get_ao.g8way.io
```

2. **启动 aos**
   接下来，创建你的 aos 实例：

```bash
aos
```

3. **保存 0rcale `processId`**
   这将初始化一个变量，存储 0rcale 的 `processId`。

```lua
_0rbit = "WSXUI2JjYUldJ7CKq9wE1MGwXs-ldzlUlHOQszwQe0s"
```

_一切准备就绪！让我们开始获取数据吧！_

## 获取数据

1. 打开编辑器

```bash
.editor
```

2. 创建获取数据的命令。

```lua
Send({
    Target = _0RBIT,
    Action = "Get-Real-Data",
    Url = "https://dummyjson.com/products"
})
```

在这个命令中：

- `TARGET` 是用户想要交互的 `ao` 进程 ID，也就是 0rbit 的 GET `ao` 进程。
- `Action` 是 0rbit 执行 Get 请求所需的特定标签。
- `Url` 是我们要获取数据的网站 URL。

3. 执行命令

这将退出编辑器并执行命令。

```bash
.done
```

你会在几秒钟内收到一条新消息，其中包含你请求的数据。

_太棒了！你已成功使用 `0rbit` 预言机网络从网络获取数据。_

如果您有任何疑问，请随时在  [0rbit Discord](https://discord.gg/4SddWhvvJw) 中提问。
