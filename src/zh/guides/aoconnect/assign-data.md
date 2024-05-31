# 发送一个分配给一个进程

分配可用于将另一条消息中的数据加载到一个进程中，或避免重复消息。你可以创建一条消息，然后将其分配给任意数量的进程。这将使得你已发送分配的进程能够访问该消息。

## 在 NodeJS 中发送一个分配

```js
import { readFileSync } from "node:fs";

import { assign } from "@permaweb/aoconnect";

await assign({
  process: "process-id",
  message: "message-id",
})
  .then(console.log)
  .catch(console.error);
```

## 排除 DataItem 字段

您还可以排除大多数 DataItem 字段，这将告诉 CU 不将它们加载到您的进程中。如果您只需要标头数据，比如标签，而不需要数据本身等等，您可能希望这样做。如果您排除了所有者，那么它将不会产生任何影响，因为 CU 需要所有者，所以排除所有者将被 CU 忽略。只有大写的 DataItem/Message 字段会在 CU 中产生影响。

```js
import { readFileSync } from "node:fs";

import { assign } from "@permaweb/aoconnect";

await assign({
  process: "process-id",
  message: "message-id",
  exclude: ["Data", "Anchor"],
})
  .then(console.log)
  .catch(console.error);
```

## 分配 L1 交易

您还可以通过将 baseLayer 参数传递给分配函数来分配一个层 1 交易。这对使用基础层进行代币铸造等操作非常有用。默认情况下，如果 L1 交易没有至少 20 个确认，SU 将拒绝它。这可以通过在创建进程时将 `Settlement-Depth` 标签设置为不同的数字来更改。

```js
import { readFileSync } from "node:fs";

import { assign } from "@permaweb/aoconnect";

await assign({
  process: "process-id",
  message: "layer 1 tx id",
  baseLayer: true,
})
  .then(console.log)
  .catch(console.error);
```
