# Cronの監視

cronメッセージを使用する際、aoユーザーはメッセージの取り込みを開始する方法が必要です。この監視メソッドを使用することで、aoユーザーはcronメッセージのサブスクリプションサービスを開始できます。cronタグを設定すると、プロセスはそのアウトボックスにcron結果を生成し始めますが、ネットワークを通じてこれらの結果からメッセージをプッシュするには、これらの結果を監視する必要があります。

<!-- # Monitoring Cron

When using cron messages, ao users need a way to start injesting the messages, using this monitor method, ao users can initiate the subscription service for cron messages. Setting cron tags means that your process will start producing cron results in its outbox, but you need to monitor these results if you want messages from those results to be pushed through the network. -->

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

<!-- You can stop monitoring by calling unmonitor -->

監視を停止するには、`unmonitor`を呼び出します。

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
