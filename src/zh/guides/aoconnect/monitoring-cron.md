# 监控 Cron

当使用 cron 消息时，ao 用户需要一种方式开始接收这些消息，通过使用这个监控方法，ao 用户可以启动 cron 消息的订阅服务。设置 cron 标签意味着你的进程将开始在其发件箱中生成 cron 结果，但如果你希望这些结果中的消息通过网络被推送，则需要监控这些结果。

```js
import { readFileSync } from "node:fs";
import { createDataItemSigner, monitor } from "@permaweb/aoconnect";

const wallet = JSON.parse(
  readFileSync("/path/to/arweave/wallet.json").toString(),
);

const result = await monitor({
  process: "process-id",
  signer: createDataItemSigner(wallet),
});
```

你可以通过调用 unmonitor 来停止监控

```js
import { readFileSync } from "node:fs";
import { createDataItemSigner, unmonitor } from "@permaweb/aoconnect";

const wallet = JSON.parse(
  readFileSync("/path/to/arweave/wallet.json").toString(),
);

const result = await unmonitor({
  process: "process-id",
  signer: createDataItemSigner(wallet),
});
```
