# プロセスへのアサインメントの送信

アサインメントは、別のメッセージからデータをプロセスにロードするために使用できます。また、メッセージを重複させないためにも使用できます。1つのメッセージを作成し、それを任意の数のプロセスにアサインすることができます。これにより、アサインメントを送信したプロセスで利用可能になります。

## NodeJSでのアサインメントの送信

<!-- # Sending an Assignment to a Process

Assignments can be used to load Data from another Message into a Process. Or to not duplicate Messages. You can create one Message and then assign it to any number of processes. This will make it available to the Processes you have sent an Assignment to.

## Sending an Assignment in NodeJS -->

```js
import { readFileSync } from "node:fs";

import { assign } from "@permaweb/aoconnect";

await assign({
  process: "process-id",
  message: "message-id",
})
  .then(console.log)
  .catch(console.error);
```

## DataItemフィールドの除外

ほとんどのDataItemフィールドを除外することもでき、これによりCUにそれらをプロセスにロードしないよう指示します。タグなどのヘッダーデータのみが必要な場合は、データ自体を除外したいことがあります。オーナーを除外しても効果はありません。CUはオーナーを要求するため、オーナーを除外してもCUは無視します。大文字で始まるDataItem/MessageフィールドのみがCUに影響を与えます。

<!-- ## Excluding DataItem fields

You can also exclude most DataItem fields which will tell the CU not to load them into your process. You may want to do this if you need only the header data like the Tags and not the Data itself etc... If you exclude the Owner it wont have any effect because the CU requires the Owner, so excluding Owner will be ignored by the CU. Only capitalized DataItem/Message fields will have an effect in the CU. -->

```js
import { readFileSync } from "node:fs";

import { assign } from "@permaweb/aoconnect";

await assign({
  process: "process-id",
  message: "message-id",
  exclude: ["Data", "Anchor"],
})
  .then(console.log)
  .catch(console.error);
```

## L1トランザクションのアサイン

`baseLayer`パラメータをassignに渡すことで、レイヤー1トランザクションをアサインすることもできます。これは、基本レイヤーを使用してトークンをミントする際などに便利です。デフォルトでは、L1トランザクションが少なくとも20回の確認を持っていない場合、SUはそれを拒否します。これは、プロセスを作成する際に`Settlement-Depth`タグを別の数値に設定することで変更できます。

<!-- ## Assigning L1 Transactions

You can also assign a layer 1 transaction by passing the baseLayer param into assign. This is useful for minting tokens etc... using the base layer. By default, if the L1 tx does not have at least 20 confirmations the SU will reject it. This can be changed by setting the `Settlement-Depth` tag to a different number on the Process when it is created. -->

```js
import { readFileSync } from "node:fs";

import { assign } from "@permaweb/aoconnect";

await assign({
  process: "process-id",
  message: "layer 1 tx id",
  baseLayer: true,
})
  .then(console.log)
  .catch(console.error);
```
