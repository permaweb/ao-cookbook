# Eval

Each AO process includes an onboard `Eval` handler that evaluates any new code it receives. This handler enables the process to determine the appropriate action for the incoming code and verifies if the message originates from the process owner.

The `Eval` handler can also be manually triggered to evaluate received Data from an incoming message.

## Sending an Eval Message in NodeJS

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

## Sending an Eval Message in a Browser

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
