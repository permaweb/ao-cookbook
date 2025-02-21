# Sending a Message to a Process

A deep dive into the concept of Messages can be found in the [ao Messages](../../concepts/messages.md) concept. This guide focuses on using ao connect to send a message to a process.

Sending a message is the central way in which your app can interact with ao. A message is input to a process. There are 5 parts of a message that you can specify which are "target", "data", "tags", "anchor", and finally the messages "signature".

Refer to your process module's source code or documentation to see how the message is used in its computation. The ao connect library will translate the parameters you pass it in the code below, construct a message, and send it.

> 🎓 To Learn more about Wallets visit the [Permaweb Cookbook](https://cookbook.g8way.io/concepts/keyfiles-and-wallets.html)

## Sending a Message in NodeJS

> Need a test wallet, use `npx -y @permaweb/wallet > /path/to/wallet.json` to create a wallet keyfile.

```js
import { readFileSync } from "node:fs";

import { message, createDataItemSigner } from "@permaweb/aoconnect";

const wallet = JSON.parse(
  readFileSync("/path/to/arweave/wallet.json").toString(),
);

// The only 2 mandatory parameters here are process and signer
await message({
  /*
    The arweave TxID of the process, this will become the "target".
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

> New to building permaweb apps check out the [Permaweb Cookbook](https://cookbook.arweave.net)

```js
import { message, createDataItemSigner } from "@permaweb/aoconnect";

// The only 2 mandatory parameters here are process and signer
await message({
  /*
    The arweave TxID of the process, this will become the "target".
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

If you would like to learn more about signers, [click here](signers)
