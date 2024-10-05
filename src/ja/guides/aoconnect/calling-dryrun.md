# DryRunの呼び出し

DryRunは、メッセージオブジェクトを特定のプロセスに送信し、結果オブジェクトを取得するプロセスですが、メモリは保存されません。これは、現在のメモリの値を返す読み取りメッセージを作成するのに最適です。例えば、トークンの残高や転送の結果などです。DryRunを使用すると、実際のメッセージを送信せずに出力を取得できます。

<!-- # Calling DryRun

DryRun is the process of sending a message object to a specific process and getting the Result object back, but the memory is not saved, it is perfect to create a read message to return the current value of memory. For example, a balance of a token, or a result of a transfer, etc. You can use DryRun to obtain an output without sending an actual message. -->

```js
import { createDataItemSigner, dryrun } from "@permaweb/aoconnect";

const result = await dryrun({
  process: 'PROCESSID',
  data: '',
  tags: [{name: 'Action', value: 'Balance'},
  anchor: '1234',
  ...rest are optional (Id, Owner, etc)
});

console.log(result.Messages[0]);
```
