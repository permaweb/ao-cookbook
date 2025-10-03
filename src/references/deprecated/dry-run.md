# Dry Run Deprecation

::: danger URGENT
**Legacynet will stop supporting dry runs on October 10, 2025.** If you are running processes on Legacynet, you must migrate immediately.
:::

## Overview

The `dryrun` function from `@permaweb/aoconnect` has been deprecated for processes running on HyperBEAM. This change is part of a broader migration to improve performance and reduce infrastructure costs.

## Why Was It Deprecated?

The `dryrun` method had several significant limitations:

1. **Performance Bottlenecks**: Dry runs were known to cause severe performance issues in web applications, with response times of 8-10 seconds per request.

2. **Infrastructure Costs**: Running dry runs required massive infrastructure. For example, the AO token alone required 9 machines with 256GB RAM each (2TB total) just to serve balance queries.

3. **Scalability Issues**: The dry run architecture didn't scale well with increased usage, leading to slow response times and high costs.

## Migration Timeline

- **October 2024**: Deprecation announced
- **October 10, 2025**: Legacynet stops supporting dry runs
- **Action Required**: Migrate all processes immediately

## Migration Paths

You have two options for migrating away from dry runs:

### Option 1: State Patching (Recommended)

Migrate to HyperBEAM's state exposure mechanism using the `patch` device. This is the recommended approach and provides significant performance improvements.

**Benefits**:

- Near-instant response times (vs 8-10 seconds with dry run)
- Dramatically reduced infrastructure costs
- Standard HTTP access to process state
- Better user experience

**Migration Guide**: See [State Exposure](../../migrating-to-hyperbeam/state-exposure.md)

**Example**:

Instead of using dry run to get a balance:

```javascript
// OLD: Using dryrun (deprecated)
import { dryrun } from "@permaweb/aoconnect";

const result = await dryrun({
  process: "PROCESS_ID",
  tags: [{ name: "Action", value: "Balance" }],
});

const balance = result.Messages[0].Data;
```

Use state patching and direct HTTP access:

```javascript
// NEW: Using state patching
const processId = "YOUR_PROCESS_ID";
const hyperbeam = "forward.computer";

const response = await fetch(
  `https://${hyperbeam}/${processId}~process@1.0/compute/cache/balances`,
);
const balances = await response.json();
```

### Option 2: Run Your Own HyperBEAM Node

If you need to continue using dry runs, you can run your own HyperBEAM node infrastructure. This gives you full control over dry run availability but requires managing your own infrastructure.

**When to Consider**:

- You have specific infrastructure requirements
- You need complete control over compute units
- You're running high-volume operations

**Note**: This option requires significant technical expertise and infrastructure management.

## Special Cases

### Token Processes

If you have a token process, HyperBEAM will automatically manage your balance state. You can still patch your token to get the same performance benefits as the AO token experienced (1 node vs 9 machines, 64GB vs 2TB).

### User-Owned Processes

If your application spawns processes that users own (e.g., marketplace apps, user-specific processes), you'll need to provide a way for users to patch their own processes.

See the [User-Owned Processes guide](../../migrating-to-hyperbeam/user-owned-processes.md) for implementation strategies.

## Code Examples

### Before: Reading State with Dry Run

```javascript
import { createDataItemSigner, dryrun } from "@permaweb/aoconnect";

async function getBalance(processId, walletAddress) {
  const result = await dryrun({
    process: processId,
    tags: [
      { name: "Action", value: "Balance" },
      { name: "Target", value: walletAddress },
    ],
  });

  return result.Messages[0].Data;
}
```

### After: Reading State with Patch

First, update your process to expose state:

```lua
-- In your process code
Handlers.add(
  "UpdateBalance",
  Handlers.utils.hasMatchingTag("Action", "Transfer"),
  function(msg)
    -- Your transfer logic here
    -- ...

    -- After updating balances, expose the new state
    Send({
      device = 'patch@1.0',
      cache = {
        balances = Balances,
        totalsupply = TotalSupply
      }
    })
  end
)
```

Then, read state via HTTP:

```javascript
async function getBalance(processId, walletAddress) {
  const hyperbeam = "forward.computer";
  const response = await fetch(
    `https://${hyperbeam}/${processId}~process@1.0/compute/cache/balances`,
  );

  const balances = await response.json();
  return balances[walletAddress] || "0";
}
```

## Performance Comparison

| Method                     | Response Time | Infrastructure Required               |
| -------------------------- | ------------- | ------------------------------------- |
| Dry Run (Legacy)           | 8-10 seconds  | 9 machines, 256GB each (for AO token) |
| State Patching (HyperBEAM) | < 1 second    | 1 node, 64GB (for AO token)           |

## Getting Help

If you need assistance migrating:

- Review the [Migrating to HyperBEAM](../../migrating-to-hyperbeam/why-migrate.md) guide
- Check the [State Exposure documentation](../../migrating-to-hyperbeam/state-exposure.md)
- Join the [Discord community](https://discord.gg/qWgGxJKwNJ) for support
- Ask questions in the community channels

## Related Documentation

- [State Exposure](../../migrating-to-hyperbeam/state-exposure.md)
- [Dynamic Reads](../../migrating-to-hyperbeam/dynamic-reads.md)
- [User-Owned Processes](../../migrating-to-hyperbeam/user-owned-processes.md)
- [Why Migrate to HyperBEAM](../../migrating-to-hyperbeam/why-migrate.md)
