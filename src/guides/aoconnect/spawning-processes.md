# Spawning a Process

A deep dive into the concept of Processes can be found in the [ao Processes](../../concepts/processes.md) concept. This guide focuses on using ao connect to spawn a Process.

In order to spawn a Process you must have the TxID of an ao Module that has been uploaded to Arweave. The Module is the source code for the Process. The Process itself is an instantiation of that source.

You must also have the wallet address of a Scheduler Unit (SU). This specified SU will act as the scheduler for this Process. This means that all nodes in the system can tell that they need to read and write to this SU for this Process. You can use the address below.

### Wallet address of an available Scheduler

```lua
_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA
```

In addition, in order to receive messages from other processes an `Authority` tag must be supplied with the wallet address of an authorised Messaging Unit (MU).

### Wallet address of the legacynet MU

```lua
fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY
```

## Spawning a Process in NodeJS

```js
import { readFileSync } from "node:fs";

import { createDataItemSigner, spawn } from "@permaweb/aoconnect";

const wallet = JSON.parse(
  readFileSync("/path/to/arweave/wallet.json").toString(),
);

const processId = await spawn({
  // The Arweave TxID of the ao Module
  module: "module TxID",
  // The Arweave wallet address of a Scheduler Unit
  scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",
  // A signer function containing your wallet
  signer: createDataItemSigner(wallet),
  /*
    Refer to a Processes' source code or documentation
    for tags that may effect its computation.
  */
  tags: [
    { name: "Authority", value: "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY" },
    { name: "Another-Tag", value: "another-value" },
  ],
});
```

## Spawning a Process in a browser

```js
import { createDataItemSigner, spawn } from "@permaweb/aoconnect";

const processId = await spawn({
  // The Arweave TxID of the ao Module
  module: "module TxID",
  // The Arweave wallet address of a Scheduler Unit
  scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",
  // A signer function containing your wallet
  signer: createDataItemSigner(globalThis.arweaveWallet),
  /*
    Refer to a Processes' source code or documentation
    for tags that may effect its computation.
  */
  tags: [
    { name: "Authority", value: "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY" },
    { name: "Another-Tag", value: "another-value" },
  ],
});
```
