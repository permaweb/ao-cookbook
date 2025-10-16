# Exposing Process State via HTTP

HyperBEAM enables direct HTTP access to process state, providing efficient data reads for web frontends and data services that need to access process data. This is the standard approach for reading process state in HyperBEAM.

## The Patch Device

The [`~patch@1.0`](https://hyperbeam.arweave.net/build/devices/hyperbeam-devices.html) device is the mechanism that allows AO processes to make parts of their internal state readable via direct HTTP GET requests.

### How Exposing Process State via HTTP Works

State exposure follows a simple four-step pattern:

1.  **Process Logic:** From your process (e.g., in Lua or WASM), send an outbound message to the `~patch@1.0` device.
2.  **Patch Message Format:** The message must include the `device` tag and data to expose.
    ```lua
    Send({ Target = ao.id, device = 'patch@1.0', mydatakey = MyValue })
    ```
3.  **HyperBEAM Execution:** HyperBEAM's `dev_patch` module processes this message, mapping the key-value pairs from the `cache` table to a URL path.
4.  **HTTP Access:** The exposed data is then immediately available via a standard HTTP GET request to the process's endpoint.
    ```HyperBEAM
    GET /<process-id>~process@1.0/compute/<mydatakey>
    ```

### Initial State Sync

Make data available immediately on process creation by patching initial state:

```lua
Balances = { token1 = 100, token2 = 200 }
TotalSupply = 1984

InitialSync = InitialSync or 'INCOMPLETE'
if InitialSync == 'INCOMPLETE' then
  Send({
    device = 'patch@1.0',
    balances = Balances,
    totalsupply = TotalSupply
  })
  InitialSync = 'COMPLETE'
  print("Initial state sync complete")
end
```

This makes essential data queryable upon process creation, boosting responsiveness.

### Basic Handler Example

Expose state when actions occur:

```lua
Handlers.add(
  "PublishData",
  Handlers.utils.hasMatchingTag("Action", "PublishData"),
  function(msg)
    local data = "Important state: " .. math.random()
    Send({ device = 'patch@1.0', currentstatus = data })
    print("Published data to /compute/currentstatus")
  end
)
```

For comprehensive patterns, see **[Building with HyperBEAM](../../../welcome/building.md)**.

### Avoiding Key Conflicts

Keys in the patch message become URL path segments. To avoid conflicts with reserved HyperBEAM paths, use descriptive, specific keys. Avoid using reserved keywords such as:

```
now, compute, state, info, test
```

For instance, prefer a key like `myappstate` over a generic key like `state`.

::: warning
HTTP paths are case-insensitive. While the `patch` device stores keys with case sensitivity (e.g., `MyKey` vs `mykey`), HTTP access to paths like the following is ambiguous and may lead to unpredictable results.

To prevent conflicts, **always use lowercase keys** in your patch messages (e.g., `mykey`, `usercount`).

```HyperBEAM
  GET /<process-id>~process@1.0/compute/mykey
```

:::

## Key Points

- **Path Structure:** Data is exposed at a path structured like this, where `<key>` is a key from your patch message:
  ```HyperBEAM
  /<process-id>~process@1.0/compute/<key>
  ```
- **Data Types:** Basic data types like strings and numbers work best. Complex objects may require serialization.
- **`compute` vs `now`:** Accessing exposed data can be done via two main paths:
  ```HyperBEAM
  GET /<process-id>~process@1.0/compute/<key>
  GET /<process-id>~process@1.0/now/<key>
  ```
  The `compute` endpoint serves the last known value quickly, while `now` may perform additional computation to get the most recent state.
- **Read-Only Exposure:** State exposure is for efficient reads and does not replace your process's core state management logic.

Using the `patch` device enables efficient, standard HTTP access to your process state, seamlessly connecting decentralized logic with web applications.

## Patching User-Owned Processes

If your application spawns processes owned by users, you need to provide ways for them to enable state patching since only process owners can update their processes.

### Common Scenarios

- **Marketplace Applications**: Each vendor manages their own inventory process
- **User Vaults**: Personal processes for storing data or assets
- **Decentralized Applications**: Users spawn game characters, agents, or bots
- **Token Pairs**: DEX applications with user-created trading pair processes

### Implementation

#### 1. Enable State Patching

Add a handler to enable patching and sync current state:

```lua
Handlers.add(
  "EnableStatePatch",
  Handlers.utils.hasMatchingTag("Action", "EnableStatePatch"),
  function(msg)
    if msg.From ~= ao.id then return end

    -- Sync current state
    Send({
      device = 'patch@1.0',
      balances = Balances,
      -- ... other state
    })

    -- Set flag to enable auto-patching in other handlers
    StatePatchEnabled = true
  end
)
```

#### 2. Update Existing Handlers

Modify existing handlers to automatically expose state when it changes:

```lua
-- Before: Simple transfer handler
Handlers.add(
  "Transfer",
  Handlers.utils.hasMatchingTag("Action", "Transfer"),
  function(msg)
    -- Transfer logic
    Balances[msg.From] = (Balances[msg.From] or 0) - msg.Quantity
    Balances[msg.Target] = (Balances[msg.Target] or 0) + msg.Quantity
  end
)

-- After: Transfer handler with state exposure
Handlers.add(
  "Transfer",
  Handlers.utils.hasMatchingTag("Action", "Transfer"),
  function(msg)
    -- Transfer logic
    Balances[msg.From] = (Balances[msg.From] or 0) - msg.Quantity
    Balances[msg.Target] = (Balances[msg.Target] or 0) + msg.Quantity

    -- Auto-expose state if patching is enabled
    if StatePatchEnabled then
      Send({ device = 'patch@1.0', balances = Balances })
    end
  end
)
```

#### 3. Detection & Triggering

```javascript
// Check if patching is enabled
async function isPatchEnabled(processId) {
  try {
    const response = await fetch(
      `https://forward.computer/${processId}~process@1.0/compute/balances`,
      { method: "HEAD" },
    );
    return response.ok;
  } catch {
    return false;
  }
}

// User enables patching
import { message, createDataItemSigner } from "@permaweb/aoconnect";

await message({
  process: userProcessId,
  signer: createDataItemSigner(window.arweaveWallet),
  tags: [{ name: "Action", value: "EnableStatePatch" }],
});
```

This approach maintains user ownership while ensuring state stays synchronized automatically.

## Next Steps

With state exposure configured, you can now add [dynamic reads](./dynamic-reads.md) to compute values on-the-fly without modifying your process state.
