# Dry Run (Deprecated)

::: danger DEPRECATED
**Dry runs were deprecated on Legacynet on October 10, 2025.** This feature is no longer supported. Use [exposing process state via HTTP](../../guides/hyperbeam/core/state-exposure.md) instead for better performance.
:::

DryRun was the process of sending a message object to a specific process and getting the Result object back, but the memory was not saved. It was commonly used to create read messages to return the current value of memory, such as a token balance or transfer result.

## Why It Was Deprecated

Dry runs caused several issues:

- **Performance bottlenecks** in web applications
- **High computational overhead** for simple state reads
- **Poor user experience** due to slow response times
- **Scalability limitations** for applications with frequent state reads

## Recommended Alternative: Exposing Process State via HTTP

Use the [mechanism for exposing process state via HTTP](../../guides/hyperbeam/core/state-exposure.md) to provide immediate reading. This provides:

- **Dramatically better performance** than dry runs
- **Direct HTTP access** to process data
- **Lower computational overhead**
- **Better user experience** for web applications

## Legacy Code Example

For reference, here's how dry runs were used:

```js
import { createDataItemSigner, dryrun } from "@permaweb/aoconnect";

const result = await dryrun({
  process: "PROCESSID",
  data: "",
  tags: [{ name: "Action", value: "Balance" }],
  anchor: "1234",
  // ...rest are optional (Id, Owner, etc)
});

console.log(result.Messages[0]);
```

## Migration Path

To migrate from dry runs to state exposure:

1. **For token processes**: Use the [state patching mechanism](../../guides/hyperbeam/core/state-exposure.md) to expose balance data
2. **For user-owned processes**: Provide update handlers that users can trigger (see [State Exposure](../../guides/hyperbeam/core/state-exposure.md#patching-user-owned-processes))
3. **For complex applications**: Use [dynamic reads](../../guides/hyperbeam/core/dynamic-reads.md) for on-the-fly computations

## Alternative: Run Your Own HyperBEAM Node

If you must continue using dry runs, you can run your own HyperBEAM node infrastructure. However, state exposure is still recommended for better performance.

## Support

For help migrating away from dry runs:

- Review the [Migration Guide](../../guides/hyperbeam/migration.md)
- Join the [Discord community](https://discord.gg/qWgGxJKwNJ) for support
