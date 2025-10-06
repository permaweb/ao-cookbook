# Calling DryRun

::: danger URGENT DEPRECATION NOTICE
**Legacynet will stop supporting dry runs on October 10, 2025.** If you are running processes on Legacynet, you must take action now.

This method of reading state is being deprecated for all processes. After deprecation, you have two options:

1. **Recommended: Migrate to State Patching** - Use the [State Patching mechanism](../../migrating-to-hyperbeam/state-exposure.md) to expose state via HTTP for better performance. This is the recommended approach as `dryrun` was known to cause severe bottlenecks in web applications.

2. **Alternative: Run Your Own HyperBEAM Node** - You can continue using dry runs by running your own HyperBEAM node infrastructure.

**Exception for Token Processes**: If you have a token process, HyperBEAM can manage your balance state. You can still patch your token for improved performance.

**Important for User-Owned Processes**: If your application spawns processes owned by users (not your app), users will need to patch their own processes. See the [User-Owned Processes guide](../../migrating-to-hyperbeam/user-owned-processes.md) for implementation strategies.
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
