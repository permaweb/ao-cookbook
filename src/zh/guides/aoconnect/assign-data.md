# 向进程赋值消息

消息赋值可用于将数据从一条消息加载到另一个进程中，或者用于避免消息重复。您可以创建一条消息，然后将其赋值给任意数量的进程，使这些进程都能使用该消息。

## 在 NodeJS 中赋值消息

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

## 排除数据项字段

您还可以排除大多数数据项字段，这将指示 CU（控制单元）不要将它们加载到您的进程中。如果您只需要标题数据（如标签）而不需要数据本身等，则可能需要这样做。 需要注意的是，排除“所有者”字段将不起作用，因为 CU 需要用到它。 只有大写的 DataItem/Message 字段才会在 CU 中生效。

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

## 赋值 L1 交易

您还可以通过将 baseLayer 参数传递给 assign 来赋值第一层交易。 这对于使用基础层铸造代币等很有用。 默认情况下，如果 L1 交易没有至少 20 个确认，SU（存储单元）将拒绝它。您可以通过在创建进程时设置 `Settlement-Depth` 标签来更改此默认值。

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
