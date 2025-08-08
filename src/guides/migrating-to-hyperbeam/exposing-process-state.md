# Exposing Process State to HyperBEAM

HyperBEAM introduces a powerful feature for exposing parts of a process's state for immediate reading over HTTP. This improves performance for web frontends and data services by replacing the need for `dryrun` calls, which were a known bottleneck on `legacynet`.

## The Patch Device

The [`~patch@1.0`](https://hyperbeam.arweave.net/build/devices/source-code/dev_patch.md) device is the mechanism that allows AO processes to make parts of their internal state readable via direct HTTP GET requests.

### How it Works

Exposing state is a four-step process involving your process and HyperBEAM:

1.  **Process Logic:** From your process (e.g., in Lua or WASM), send an outbound message to the `~patch@1.0` device.
2.  **Patch Message Format:** The message must include `device` and `cache` tags.
    ```lua
    Send({ Target = ao.id, device = 'patch@1.0', cache = { mydatakey = MyValue } })
    ```
3.  **HyperBEAM Execution:** HyperBEAM's `dev_patch` module processes this message, mapping the key-value pairs from the `cache` table to a URL path.
4.  **HTTP Access:** The exposed data is then immediately available via a standard HTTP GET request to the process's endpoint.
    ```HyperBEAM
    GET /<process-id>~process@1.0/compute/cache/<mydatakey>
    ```

### Initial State Sync (Optional)

To make data available immediately on process creation, you can patch its initial state. A common pattern is to use a flag to ensure this sync only runs once, as shown in this example for a token's `Balances` and `TotalSupply`.

```lua
-- Place this logic at the top level of your process script,
-- outside of specific handlers, so it runs on load.

Balances = { token1 = 100, token2 = 200 } -- A table of balances
TotalSupply = 1984 -- A single total supply value

-- 1. Initialize Flag:
-- Initializes a flag if it doesn't exist.
InitialSync = InitialSync or 'INCOMPLETE'

-- 2. Check Flag:
-- Checks if the sync has already run.
if InitialSync == 'INCOMPLETE' then
  -- 3. Patch State:
  -- The `Send` call patches the state, making it available at endpoints like:
  -- /cache/balances
  -- /cache/totalsupply
  Send({ device = 'patch@1.0', cache = { balances = Balances, totalsupply = TotalSupply } })
  -- 4. Update Flag:
  -- Updates the flag to prevent the sync from running again.
  InitialSync = 'COMPLETE'
  print("Initial state sync complete. Balances and TotalSupply patched.")
end
```

This pattern makes essential data queryable upon process creation, boosting application responsiveness.

### Example (Lua in `aos`)

This handler exposes a `currentstatus` key that can be read via HTTP after the `PublishData` action is called.

```lua
-- In your process code (e.g., loaded via .load)
Handlers.add(
  "PublishData",
  Handlers.utils.hasMatchingTag("Action", "PublishData"),
  function (msg)
    local dataToPublish = "Some important state: " .. math.random()
    -- Expose 'currentstatus' key under the 'cache' path
    Send({ device = 'patch@1.0', cache = { currentstatus = dataToPublish } })
    print("Published data to /cache/currentstatus")
  end
)
```

### Avoiding Key Conflicts

Keys in the `cache` table become URL path segments. To avoid conflicts with reserved HyperBEAM paths, use descriptive, specific keys. Avoid using reserved keywords such as:

```
now, compute, state, info, test
```

For instance, prefer a key like `myappstate` over a generic key like `state`.

::: warning
HTTP paths are case-insensitive. While the `patch` device stores keys with case sensitivity (e.g., `MyKey` vs `mykey`), HTTP access to paths like the following is ambiguous and may lead to unpredictable results.

To prevent conflicts, **always use lowercase keys** in your `cache` table (e.g., `mykey`, `usercount`).

```HyperBEAM
GET /<process-id>~process@1.0/cache/mykey
```

:::

## Key Points

- **Path Structure:** Data is exposed at a path structured like this, where `<key>` is a key from your `cache` table:
  ```HyperBEAM
  /<process-id>~process@1.0/cache/<key>
  ```
- **Data Types:** Basic data types like strings and numbers work best. Complex objects may require serialization.
- **`compute` vs `now`:** Accessing patched data can be done via two main paths:
  ```HyperBEAM
  GET /<process-id>~process@1.0/compute/cache/...
  GET /<process-id>~process@1.0/now/cache/...
  ```
  The `compute` endpoint serves the last known value quickly, while `now` may perform additional computation to get the most recent state.
- **Read-Only Exposure:** Patching is for efficient reads and does not replace your process's core state management logic.

Using the `patch` device enables efficient, standard HTTP access to your process state, seamlessly connecting decentralized logic with web applications.

## Next Steps

Now that you know how to expose static state, learn how to perform on-the-fly computations on that state by [reading dynamic state](./reading-dynamic-state.md).
