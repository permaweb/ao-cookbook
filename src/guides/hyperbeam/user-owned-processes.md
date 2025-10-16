# User-Owned Processes

When building applications on AO, you may create architectures where users own their own processes rather than your application owning a centralized process. This pattern is common in decentralized marketplaces, user-specific vaults, and personal data stores.

## The Challenge

With the deprecation of dry runs on Legacynet, you face a unique challenge: **you cannot patch processes that you don't own**. Only the process owner can send messages to update their process.

### Common Scenarios

- **Marketplace Applications**: Each vendor has their own process for managing inventory and sales
- **User Vaults**: Each user has a personal process for storing data or assets
- **Decentralized Applications**: Users spawn their own game characters, agents, or bots
- **Token Pairs**: DEX applications where users create their own trading pair processes

In these scenarios, you need to provide a way for users to migrate their own processes to use state patching.

## General Approach

The solution typically involves three key components:

1. **Process-side handler**: Add a handler to your process template that allows the owner to enable state patching
2. **Detection mechanism**: Check whether a user's process has patching enabled
3. **User interface**: Provide a way for users to trigger the update

You'll need to decide how to implement each of these based on your application's architecture and user experience requirements.

## Process Update Handler

Your process needs a handler that allows the owner to enable state patching. Here's a minimal example:

```lua
Handlers.add(
  "EnableStatePatch",
  Handlers.utils.hasMatchingTag("Action", "EnableStatePatch"),
  function(msg)
    -- Only allow process owner to enable
    if msg.From ~= ao.id then
      return
    end

    -- Sync current state to cache
    Send({
      device = 'patch@1.0',
      cache = {
        -- Your state here
        balances = Balances,
        -- ... other state
      }
    })
  end
)
```

After enabling, you'll also need to update your existing handlers to patch state when it changes. For example:

```lua
-- After updating state, sync to cache if patching is enabled
if StatePatchEnabled then
  Send({
    device = 'patch@1.0',
    cache = { balances = Balances }
  })
end
```

## Detecting Patch Status

You can check if a process has state patching enabled by attempting to access its cached state:

```javascript
async function isPatchEnabled(processId) {
  try {
    const response = await fetch(
      `https://forward.computer/${processId}~process@1.0/compute/cache/balances`,
      { method: "HEAD" },
    );
    return response.ok;
  } catch {
    return false;
  }
}
```

## Triggering the Update

Users need to send a message to their own process to enable patching. The basic approach:

```javascript
import { message, createDataItemSigner } from "@permaweb/aoconnect";

const messageId = await message({
  process: userProcessId,
  signer: createDataItemSigner(window.arweaveWallet),
  tags: [{ name: "Action", value: "EnableStatePatch" }],
});
```

How you present this to users is up to you - it could be a button in your UI, a banner notification, a setup wizard, or a CLI script.

## Related Documentation

- [State Exposure](./state-exposure.md)
- [Dynamic Reads](./dynamic-reads.md)
- [Migration Guide](./migration.md)
