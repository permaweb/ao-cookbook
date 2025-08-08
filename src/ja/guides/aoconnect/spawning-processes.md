# プロセスの生成

プロセスの概念についての詳細は、[aoプロセス](../../concepts/processes.md)のコンセプトを参照してください。このガイドでは、ao connectを使用してプロセスを生成する方法に焦点を当てています。

プロセスを生成するには、ArweaveにアップロードされたaoモジュールのTXIDが必要です。このモジュールはプロセスのソースコードです。プロセス自体は、そのソースのインスタンス化です。

また、スケジューラーユニット（SU）のウォレットアドレスも必要です。この指定されたSUは、このプロセスのスケジューラとして機能します。つまり、システム内のすべてのノードは、このプロセスに対してこのSUに読み書きする必要があることを知ることができます。以下のアドレスを使用できます。

## 利用可能なスケジューラのウォレットアドレス

<!-- # Spawning a Process

A deep dive into the concept of Processes can be found in the [ao Processes](../../concepts/processes.md) concept. This guide focuses on using ao connect to spawn a Process.

In order to spawn a Process you must have the TXID of an ao Module that has been uploaded to Arweave. The Module is the source code for the Process. The Process itself is an instantiation of that source.

You must also have the wallet address of a Scheduler Unit (SU). This specified SU will act as the scheduler for this Process. This means that all nodes in the system can tell that they need to read and write to this SU for this Process. You can use the address below.

## Wallet address of an available Scheduler -->

```lua
TZ7o7SIZ06ZEJ14lXwVtng1EtSx60QkPy-kh-kdAXog
```

## Spawning a Process in NodeJS

```js
import { readFileSync } from "node:fs";

import { createDataItemSigner, spawn } from "@permaweb/aoconnect";

const wallet = JSON.parse(
  readFileSync("/path/to/arweave/wallet.json").toString(),
);

const processId = await spawn({
  // The Arweave TXID of the ao Module
  module: "module TXID",
  // The Arweave wallet address of a Scheduler Unit
  scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",
  // A signer function containing your wallet
  signer: createDataItemSigner(wallet),
  /*
    Refer to a Processes' source code or documentation
    for tags that may effect its computation.
  */
  tags: [
    { name: "Your-Tag-Name-Here", value: "your-tag-value" },
    { name: "Another-Tag", value: "another-value" },
  ],
});
```

## Spawning a Process in a browser

```js
import { createDataItemSigner, spawn } from "@permaweb/aoconnect";

const processId = await spawn({
  // The Arweave TXID of the ao Module
  module: "module TXID",
  // The Arweave wallet address of a Scheduler Unit
  scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",
  // A signer function containing your wallet
  signer: createDataItemSigner(globalThis.arweaveWallet),
  /*
    Refer to a Processes' source code or documentation
    for tags that may effect its computation.
  */
  tags: [
    { name: "Your-Tag-Name-Here", value: "your-tag-value" },
    { name: "Another-Tag", value: "another-value" },
  ],
});
```
