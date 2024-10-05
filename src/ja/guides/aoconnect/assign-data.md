# Sending an Assignment to a Process

Assignments can be used to load Data from another Message into a Process. Or to not duplicate Messages. You can create one Message and then assign it to any number of processes. This will make it available to the Processes you have sent an Assignment to.

## Sending an Assignment in NodeJS

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

## Excluding DataItem fields

You can also exclude most DataItem fields which will tell the CU not to load them into your process. You may want to do this if you need only the header data like the Tags and not the Data itself etc... If you exclude the Owner it wont have any effect because the CU requires the Owner, so excluding Owner will be ignored by the CU. Only capitalized DataItem/Message fields will have an effect in the CU.

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

## Assigning L1 Transactions

You can also assign a layer 1 transaction by passing the baseLayer param into assign. This is useful for minting tokens etc... using the base layer. By default, if the L1 tx does not have at least 20 confirmations the SU will reject it. This can be changed by setting the `Settlement-Depth` tag to a different number on the Process when it is created.

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
