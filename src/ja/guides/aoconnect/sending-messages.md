# プロセスへのメッセージの送信

メッセージの概念についての詳細は、[aoメッセージ](../../concepts/messages.md)のコンセプトを参照してください。このガイドでは、ao connectを使用してプロセスにメッセージを送信する方法に焦点を当てています。

メッセージを送信することは、アプリがaoと対話する中心的な方法です。メッセージはプロセスへの入力です。メッセージには、"target"、"data"、"tags"、"anchor"、そして最後にメッセージの"signature"の5つの部分があります。

メッセージがその計算でどのように使用されるかを確認するには、プロセスモジュールのソースコードまたはドキュメントを参照してください。ao connectライブラリは、以下のコードで渡されたパラメータを変換し、メッセージを構築して送信します。

## NodeJSでのメッセージの送信

<!-- # Sending a Message to a Process

A deep dive into the concept of Messages can be found in the [ao Messages](../../concepts/messages.md) concept. This guide focuses on using ao connect to send a message to a process.

Sending a message is the central way in which your app can interact with ao. A message is input to a process. There are 5 parts of a message that you can specify which are "target", "data", "tags", "anchor", and finally the messages "signature".

Refer to your process module's source code or documentation to see how the message is used in its computation. The ao connect library will translate the parameters you pass it in the code below, construct a message, and send it.

## Sending a Message in NodeJS -->

```js
import { readFileSync } from "node:fs";

import { message, createDataItemSigner } from "@permaweb/aoconnect";

const wallet = JSON.parse(
  readFileSync("/path/to/arweave/wallet.json").toString(),
);

// The only 2 mandatory parameters here are process and signer
await message({
  /*
    The arweave TXID of the process, this will become the "target".
    This is the process the message is ultimately sent to.
  */
  process: "process-id",
  // Tags that the process will use as input.
  tags: [
    { name: "Your-Tag-Name-Here", value: "your-tag-value" },
    { name: "Another-Tag", value: "another-value" },
  ],
  // A signer function used to build the message "signature"
  signer: createDataItemSigner(wallet),
  /*
    The "data" portion of the message
    If not specified a random string will be generated
  */
  data: "any data",
})
  .then(console.log)
  .catch(console.error);
```

## Sending a Message in a browser

```js
import { message, createDataItemSigner } from "@permaweb/aoconnect";

// The only 2 mandatory parameters here are process and signer
await message({
  /*
    The arweave TXID of the process, this will become the "target".
    This is the process the message is ultimately sent to.
  */
  process: "process-id",
  // Tags that the process will use as input.
  tags: [
    { name: "Your-Tag-Name-Here", value: "your-tag-value" },
    { name: "Another-Tag", value: "another-value" },
  ],
  // A signer function used to build the message "signature"
  signer: createDataItemSigner(globalThis.arweaveWallet),
  /*
    The "data" portion of the message.
    If not specified a random string will be generated
  */
  data: "any data",
})
  .then(console.log)
  .catch(console.error);
```
