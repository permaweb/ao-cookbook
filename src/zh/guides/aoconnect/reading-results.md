# 从 ao 进程读取结果

在 ao 中，消息产生的结果通过计算单元（CU）提供。结果是包含以下字段的 JSON 对象：messages, spawns, output 和 error。

结果包含ao系统用来发送消息和生成进程的返回值。一个进程可以发送消息，就像你作为开发者可以通过在结果中返回消息和返回值一样。

你可能想要访问一个结果，以显示由你的消息生成的输出。或者，你可能想要看看生成了哪些消息等。你不需要自己取出结果中的消息和返回值并发送它们。它们由消息单元（MU）自动处理。对结果的调用还可以为你提供多个结果的分页列表。

## 获取单个结果

```js
import { result } from "@permaweb/aoconnect";

let { Messages, Spawns, Output, Error } = await result({
  // the arweave TXID of the message
  message: "message-id",
  // the arweave TXID of the process
  process: "process-id",
});
```

## 获取一组结果

```js
import { results } from "@permaweb/aoconnect";

// fetching the first page of results
let resultsOut = await results({
  process: "process-id",
  sort: "ASC",
  limit: 25,
});

// calling more with a cursor
let resultsOut2 = await results({
  process: "process-id",
  from: resultsOut.edges?.[resultsOut.edges.length - 1]?.cursor ?? null,
  sort: "ASC",
  limit: 25,
});
```
