# FAQ

## 所有权 (Ownership)

<details>
  <summary><strong>进程的所有权</strong></summary>

使用 aos 控制台创建一个新的进程，你的钱包地址就是进程的所有者。**aos** 使用 **Owner** 全局变量来标记进程的所有者。如果你想转移进程的所有权，或者将它变成无人可以控制的进程，你可以重定义 **Owner** 变量将它给其他钱包地址，或者设置为 **nil**。

</details>

## JSON

<details>
  <summary><strong>将数据编码为 json 格式</strong></summary>

当你向其他进程或者外部服务发送数据，你可能希望使用 JSON 作为数据编码格式。使用 lua 的 json 模块，可以对 lua Table 中的值进行 **encode** 和 **decode** 操作。

```lua
Send({Target = Router, Data = require('json').encode({hello = "world"})})
```

</details>

## Send 和 ao.send 对比

<details>
  <summary><strong>什么时候使用 Send 或 ao.send</strong></summary>

这两个方法都会将消息发送到一个进程，区别是 `ao.send` 可以返回消息，以便于记录日志或者进行故障排查。`Send` 函数通常在控制台中使用，更方便访问。在 `handlers` 中更推荐使用 `ao.send`，但他们在 `aos`中是可以相互替换的。

</details>
