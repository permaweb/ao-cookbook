# Sending a Message to a Process

可以在 [ao Messages](../../concepts/messages.md) 概念中找到关于消息的深入探讨。本指南着重于使用 ao connect 向进程发送消息。

发送消息是你的应用与 ao 交互的核心方式。消息是输入到一个进程的。消息有五个部分你可以指定，分别是“目标（target）”，“数据（data）”，“标签（tags）”，“锚点（anchor）”，以及最后的消息“签名（signature）”。

请参考你的进程模块的源代码或文档，以了解消息如何在其计算中使用。ao connect 库将解析你在下面的代码中传递的参数，构造一个消息，并发送它。

## 在 NodeJS 中发送消息

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

## 在浏览器中发送消息

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
