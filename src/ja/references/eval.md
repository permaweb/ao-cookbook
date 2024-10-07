# Eval

各AOプロセスには、受信した新しいコードを評価するオンボードの`Eval`ハンドラが含まれています。このハンドラにより、プロセスは受信コードに対して適切なアクションを決定し、そのメッセージがプロセスの所有者からのものであるかを確認します。

`Eval`ハンドラは、受信メッセージから受け取ったデータを評価するために手動でトリガーすることもできます。

## NodeJSでEvalメッセージを送信する

```js
import { readFileSync } from "node:fs";
import { message, createDataItemSigner } from "@permaweb/aoconnect";

const wallet = JSON.parse(
  readFileSync("/path/to/arweave/wallet.json").toString(),
);

await message({
  // The arweave TXID of the process, this will become the "target".
  process: "process-id", // Replace with the actual process ID

  // Tagging the Eval Action so the recieving process evaluates and adds the new Handler from the Data field.
  tags: [
    { name: "Action", value: "Eval" },
    {
      name: "Data",
      value: 'Handlers.add("ping", Handlers.utils.reply("pong"))',
    },
  ],

  // A signer function used to build the message "signature"
  signer: createDataItemSigner(wallet),
})
  .then(console.log)
  .catch(console.error);
```

## ブラウザでEvalメッセージを送信する

```js
import { message, createDataItemSigner } from "@permaweb/aoconnect";

await message({
  // The arweave TXID of the process, this will become the "target".
  process: "process-id", // Replace with the actual process ID

  // Tagging the Eval Action so the recieving process evaluates and adds the new Handler from the Data field.
  tags: [
    { name: "Action", value: "Eval" },
    {
      name: "Data",
      value: 'Handlers.add("ping", Handlers.utils.reply("pong"))',
    },
  ],

  // A signer function used to build the message "signature"
  signer: createDataItemSigner(globalThis.arweaveWallet),
})
  .then(console.log)
  .catch(console.error);
```
