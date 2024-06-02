# Monitoring Cron

When using cron messages, ao users need a way to start ingesting the messages, using this monitor method, ao users can initiate the subscription service for cron messages. Setting cron tags means that your process will start producing cron results in its outbox, but you need to monitor these results if you want messages from those results to be pushed through the network.

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

You can stop monitoring by calling unmonitor

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
