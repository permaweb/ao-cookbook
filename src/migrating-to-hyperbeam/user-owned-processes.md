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

## Solution Overview

The solution involves:

1. **Adding update handlers to your process templates** so users can trigger updates
2. **Building UI components** that allow users to update their processes
3. **Providing clear instructions** and automated scripts when possible
4. **Handling edge cases** like failed updates or users who don't update

## Implementation Guide

### Step 1: Add Update Handler to Process Template

First, ensure your process template includes a handler that allows the owner to enable state patching:

```lua
-- Add this handler to your process code
Handlers.add(
  "EnableStatePatch",
  Handlers.utils.hasMatchingTag("Action", "EnableStatePatch"),
  function(msg)
    -- Security: Only allow the process owner to enable patching
    if msg.From ~= ao.id then
      Send({
        Target = msg.From,
        Data = "Error: Only the process owner can enable state patching"
      })
      return
    end

    -- Initialize the patching flag
    StatePatchEnabled = true

    -- Perform initial state sync
    Send({
      device = 'patch@1.0',
      cache = {
        -- Add your state here
        -- Example for a token/inventory:
        balances = Balances or {},
        metadata = {
          name = Name,
          ticker = Ticker,
          owner = Owner
        }
      }
    })

    Send({
      Target = msg.From,
      Data = "State patching enabled successfully"
    })

    print("State patching enabled by owner: " .. msg.From)
  end
)

-- Update your existing handlers to patch state after modifications
-- Example: After a transfer, update the cached balances
Handlers.add(
  "Transfer",
  Handlers.utils.hasMatchingTag("Action", "Transfer"),
  function(msg)
    -- Your existing transfer logic
    -- ...

    -- If state patching is enabled, update the cache
    if StatePatchEnabled then
      Send({
        device = 'patch@1.0',
        cache = {
          balances = Balances
        }
      })
    end
  end
)
```

### Step 2: Create Frontend UI Component

Build a UI component that allows users to enable state patching for their processes:

```javascript
import { message, createDataItemSigner } from "@permaweb/aoconnect";
import { useState } from "react";

export function EnablePatchButton({ processId }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  async function enableStatePatch() {
    try {
      setStatus("loading");
      setError(null);

      // User must sign this with their wallet
      const signer = createDataItemSigner(window.arweaveWallet);

      const messageId = await message({
        process: processId,
        signer,
        tags: [{ name: "Action", value: "EnableStatePatch" }],
      });

      setStatus("success");
      console.log("State patching enabled:", messageId);
    } catch (err) {
      setStatus("error");
      setError(err.message);
      console.error("Failed to enable state patching:", err);
    }
  }

  return (
    <div className="patch-update-container">
      <h3>Update Required: Enable Fast State Access</h3>
      <p>
        To continue using this application with optimal performance, please
        enable state patching for your process.
      </p>

      <button onClick={enableStatePatch} disabled={status === "loading"}>
        {status === "loading" ? "Updating..." : "Enable State Patching"}
      </button>

      {status === "success" && (
        <p className="success">State patching enabled successfully!</p>
      )}

      {status === "error" && <p className="error">Error: {error}</p>}
    </div>
  );
}
```

### Step 3: Detect and Prompt Users

Detect whether a user's process has state patching enabled and prompt them if needed:

```javascript
async function checkStatePatchEnabled(processId) {
  try {
    const hyperbeam = "forward.computer";

    // Try to access cached state
    const response = await fetch(
      `https://${hyperbeam}/${processId}~process@1.0/compute/cache/balances`,
      { method: "HEAD" }, // Use HEAD to just check if endpoint exists
    );

    return response.ok; // Returns true if patching is enabled
  } catch (err) {
    return false;
  }
}

// In your app component
function UserProcessDashboard({ userProcessId }) {
  const [patchEnabled, setPatchEnabled] = useState(null);

  useEffect(() => {
    checkStatePatchEnabled(userProcessId).then(setPatchEnabled);
  }, [userProcessId]);

  if (patchEnabled === false) {
    return (
      <div className="migration-notice">
        <EnablePatchButton processId={userProcessId} />
      </div>
    );
  }

  // Regular dashboard UI
  return <Dashboard processId={userProcessId} />;
}
```

### Step 4: Provide Migration Scripts

For power users or batch operations, provide scripts they can run:

```javascript
// migrate-process.js
import { message, createDataItemSigner } from "@permaweb/aoconnect";
import Arweave from "arweave";

async function migrateProcess(processId, walletPath) {
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });

  const wallet = JSON.parse(await fs.readFile(walletPath, "utf-8"));

  const signer = createDataItemSigner(wallet);

  console.log(`Migrating process: ${processId}`);

  const messageId = await message({
    process: processId,
    signer,
    tags: [{ name: "Action", value: "EnableStatePatch" }],
  });

  console.log(`Migration initiated: ${messageId}`);
  return messageId;
}

// Usage: node migrate-process.js <process-id> <wallet-path>
const [processId, walletPath] = process.argv.slice(2);
migrateProcess(processId, walletPath);
```

## Best Practices

### 1. Graceful Fallback

Provide fallback behavior for processes that haven't been updated yet:

```javascript
async function getBalance(processId, address) {
  try {
    // Try patched state first
    const response = await fetch(
      `https://forward.computer/${processId}~process@1.0/compute/cache/balances`,
    );

    if (response.ok) {
      const balances = await response.json();
      return balances[address] || "0";
    }
  } catch (err) {
    console.log("Patched state not available, prompting user to update");
  }

  // If patched state isn't available, prompt user to update
  return null; // Signal that update is needed
}
```

### 2. Clear Communication

Make it clear to users why they need to update:

- Explain the performance benefits (faster load times)
- Mention the deprecation timeline
- Provide step-by-step instructions
- Offer help and support channels

### 3. Backward Compatibility

Maintain backward compatibility during the transition period:

```lua
-- In your process handlers
function updateState()
  -- Always update internal state
  Balances[target] = newBalance

  -- Conditionally update cache if enabled
  if StatePatchEnabled then
    Send({
      device = 'patch@1.0',
      cache = { balances = Balances }
    })
  end
end
```

### 4. Batch Updates

For applications with many users, consider building admin tools to track migration status:

```javascript
async function getMigrationStats(processIds) {
  const results = await Promise.all(
    processIds.map(async (id) => ({
      processId: id,
      patched: await checkStatePatchEnabled(id),
    })),
  );

  const total = results.length;
  const migrated = results.filter((r) => r.patched).length;

  return {
    total,
    migrated,
    pending: total - migrated,
    percentage: (migrated / total) * 100,
  };
}
```

## Example: Marketplace Application

Here's a complete example for a marketplace where vendors own their shop processes:

```javascript
// ShopMigrationBanner.jsx
import { useState, useEffect } from "react";
import { message, createDataItemSigner } from "@permaweb/aoconnect";

export function ShopMigrationBanner({ shopProcessId }) {
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    checkIfUpdateNeeded();
  }, [shopProcessId]);

  async function checkIfUpdateNeeded() {
    try {
      const response = await fetch(
        `https://forward.computer/${shopProcessId}~process@1.0/compute/cache/inventory`,
        { method: "HEAD" },
      );
      setNeedsUpdate(!response.ok);
    } catch {
      setNeedsUpdate(true);
    }
  }

  async function performUpdate() {
    try {
      setUpdating(true);
      const signer = createDataItemSigner(window.arweaveWallet);

      await message({
        process: shopProcessId,
        signer,
        tags: [{ name: "Action", value: "EnableStatePatch" }],
      });

      // Wait a moment for the update to process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setNeedsUpdate(false);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update shop. Please try again.");
    } finally {
      setUpdating(false);
    }
  }

  if (!needsUpdate) return null;

  return (
    <div className="migration-banner">
      <h3>Action Required: Update Your Shop</h3>
      <p>
        Your shop needs to be updated for improved performance. This one-time
        update will make your shop load faster for customers.
      </p>
      <button onClick={performUpdate} disabled={updating}>
        {updating ? "Updating Shop..." : "Update My Shop Now"}
      </button>
    </div>
  );
}
```

## Handling Edge Cases

### Users Who Don't Update

Some users may not update their processes. Plan for this:

- Show degraded experience notices
- Consider temporarily supporting old processes with your own infrastructure
- Set a final deadline after which old processes won't be supported
- Send notifications through multiple channels (UI, email, Discord)

### Failed Updates

Handle cases where the update fails:

```javascript
async function enablePatchWithRetry(processId, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await enableStatePatch(processId);
      return { success: true, result };
    } catch (err) {
      if (i === maxRetries - 1) {
        return { success: false, error: err.message };
      }
      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, 2000 * (i + 1)));
    }
  }
}
```

### Version Management

Track which version of the patch logic each process is using:

```lua
-- In process
PatchVersion = PatchVersion or "1.0.0"

Handlers.add(
  "GetPatchVersion",
  Handlers.utils.hasMatchingTag("Action", "GetPatchVersion"),
  function(msg)
    Send({
      Target = msg.From,
      Data = PatchVersion
    })
  end
)
```

## Related Documentation

- [State Exposure](./state-exposure.md)
- [Dynamic Reads](./dynamic-reads.md)
- [Dry Run Deprecation](../references/deprecated/dry-run.md)
