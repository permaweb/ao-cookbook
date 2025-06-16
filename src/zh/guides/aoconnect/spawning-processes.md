# 创建一个进程

可以在[ao Processes](../../concepts/processes.md) 概念中找到关于进程的深入介绍。本指南聚焦于使用 ao connect 创建一个进程。

为了创建一个进程，你必须拥有已经上传到 Arweave 的一个 ao 模块的 TXID。模块是进程的源代码。进程本身是那个源码的实例化。

你还必须拥有一个调度单元（Scheduler Unit, SU）的钱包地址。指定的 SU 将作为此进程的调度器。这意味着系统中的所有节点都可以知道它们需要为此进程读写到这个 SU。你可以使用下面的地址。

## 调度器的钱包地址

```sh
_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA
```

## 在 NodeJS 中创建一个进程

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
    { name: "Authority", value: "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY" },
    { name: "Another-Tag", value: "another-value" },
  ],
});
```

## 在浏览器中创建一个进程

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
    { name: "Authority", value: "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY" },
    { name: "Another-Tag", value: "another-value" },
  ],
});
```
