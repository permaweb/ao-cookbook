# Calling DryRun

::: warning DEPRECATION NOTICE
This method of reading state is in the process of being deprecated for processes running on HyperBEAM. It is recommended to use the [State Patching mechanism](../migrating-to-hyperbeam/exposing-process-state.md) to expose state via HTTP for better performance, as calling `dryrun` was known to cause severe bottlenecks in web applications on `legacynet`.
:::

DryRun is the process of sending a message object to a specific process and getting the Result object back, but the memory is not saved, it is perfect to create a read message to return the current value of memory. For example, a balance of a token, or a result of a transfer, etc. You can use DryRun to obtain an output without sending an actual message.

```js
import { createDataItemSigner, dryrun } from "@permaweb/aoconnect";

const result = await dryrun({
  process: 'PROCESSID',
  data: '',
  tags: [{name: 'Action', value: 'Balance'},
  anchor: '1234',
  ...rest are optional (Id, Owner, etc)
});

console.log(result.Messages[0]);
```
