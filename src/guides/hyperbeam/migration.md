# Migration Guide: From Legacynet to HyperBEAM

Migrating your process to HyperBEAM is primarily about exposing your process state via HTTP. This single change provides the biggest performance improvement and is the core of the HyperBEAM experience.

## The Migration is Simple: Expose Process State via HTTP

**The only real step to migrate your process to HyperBEAM is exposing your process state via HTTP.**

Your existing process logic, handlers, and message handling work exactly the same. The difference is that instead of forcing clients to use slow dry-run messages to read your state, you expose it via HTTP for instant access.

### Before (Legacynet Pattern)

```lua
-- Slow: Clients must send dry-run messages to read state
Handlers.add(
  "GetBalance",
  Handlers.utils.hasMatchingTag("Action", "GetBalance"),
  function(msg)
    local balance = Balances[msg.Tags.Target] or 0
    return msg.reply({ Data = tostring(balance) })
  end
)

-- Client side (slow and expensive)
const result = await dryrun({
  process: processId,
  tags: [{ name: "Action", value: "GetBalance" }]
});
```

### After (HyperBEAM Pattern)

```lua
-- Fast: Expose state via HTTP for instant access
Handlers.add(
  "Transfer",
  Handlers.utils.hasMatchingTag("Action", "Transfer"),
  function(msg)
    -- Your existing transfer logic
    Balances[msg.From] = tostring(tonumber(Balances[msg.From]) - amount)
    Balances[msg.Tags.Target] = tostring(tonumber(Balances[msg.Tags.Target]) + amount)

    -- NEW: Expose updated balances via HTTP
    Send({
      device = 'patch@1.0',
      balances = Balances
    })
  end
)

-- Client side (instant and free)
  const response = await fetch(`https://forward.computer/${processId}~process@1.0/compute/balances`);
const balances = await response.json();
```

## Step-by-Step Migration

### Step 1: Connect to HyperBEAM

**Change your connection:**

```bash
# From Legacynet
aos

# To HyperBEAM
aos --node https://forward.computer
```

That's it for the connection - your process works the same way.

### Step 2: Add Initial State Sync

Make your existing state available immediately:

```lua
-- Add this to the top of your process
Balances = Balances or { alice = 1000, bob = 500 }
TotalSupply = TotalSupply or 1500

-- Initial sync - runs once when process loads
InitialSync = InitialSync or 'INCOMPLETE'
if InitialSync == 'INCOMPLETE' then
  Send({
    device = 'patch@1.0',
    balances = Balances,
    totalsupply = tostring(TotalSupply)
  })
  InitialSync = 'COMPLETE'
end
```

### Step 3: Update Your Handlers to Expose State

For each handler that modifies state, add a `Send` call to expose the updated state:

```lua
-- Example: Token transfer handler
Handlers.add(
  "Transfer",
  Handlers.utils.hasMatchingTag("Action", "Transfer"),
  function(msg)
    -- Your existing transfer logic (unchanged)
    local amount = tonumber(msg.Tags.Amount)
    local target = msg.Tags.Target

    -- Validate and update balances (your existing logic)
    local senderBalance = tonumber(Balances[msg.From]) or 0
    if senderBalance < amount then
      return msg.reply({ Error = "Insufficient balance" })
    end

    Balances[msg.From] = tostring(senderBalance - amount)
    Balances[target] = tostring((tonumber(Balances[target]) or 0) + amount)

    -- NEW: Expose updated state via HTTP
    Send({
      device = 'patch@1.0',
      balances = Balances,
      totalsupply = tostring(TotalSupply)
    })

    return msg.reply({ Status = "Success" })
  end
)
```

### Step 4: Update Your Frontend

Replace dry-run calls with HTTP requests:

```javascript
// Old way (slow and expensive)
async function getBalance(address) {
  const result = await dryrun({
    process: processId,
    tags: [
      { name: "Action", value: "GetBalance" },
      { name: "Target", value: address },
    ],
  });
  return result.Messages[0].Data;
}

// New way (instant and free)
async function getBalance(address) {
  const response = await fetch(
    `https://forward.computer/${processId}~process@1.0/compute/balances`,
  );
  const balances = await response.json();
  return balances[address] || "0";
}
```

## Common Migration Patterns

### Token Process

```lua
-- Add state exposure to your existing token handlers
Handlers.add(
  "Mint",
  Handlers.utils.hasMatchingTag("Action", "Mint"),
  function(msg)
    -- Your existing mint logic
    Balances[msg.Tags.Target] = tostring(tonumber(Balances[msg.Tags.Target]) + tonumber(msg.Tags.Amount))
    TotalSupply = TotalSupply + tonumber(msg.Tags.Amount)

    -- Expose updated state
    Send({
      device = 'patch@1.0',
      messages = Messages,
      messageCount = tostring(#Messages)
    })
  end
)
```

### Chat Process

```lua
-- Add state exposure to your existing chat handlers
Handlers.add(
  "AddMessage",
  Handlers.utils.hasMatchingTag("Action", "AddMessage"),
  function(msg)
    -- Your existing message logic
    table.insert(Messages, {
      user = msg.From,
      content = msg.Data,
      timestamp = os.time()
    })

    -- Expose updated messages
    Send({
      device = 'patch@1.0',
      cache = {
        messages = Messages,
        messageCount = tostring(#Messages)
      }
    })
  end
)
```

### Counter Process

```lua
-- Add state exposure to your existing counter handlers
Handlers.add(
  "Increment",
  Handlers.utils.hasMatchingTag("Action", "Increment"),
  function(msg)
    -- Your existing counter logic
    Counter = Counter + 1

    -- Expose updated counter
    Send({
      device = 'patch@1.0',
      counter = Counter,
      lastUpdate = os.time()
    })
  end
)
```

## That's It!

**Your process is now migrated to HyperBEAM.**

The key benefits you now have:

- **Instant state reads** via HTTP instead of slow dry-runs
- **Better performance** for web frontends and data services
- **Lower costs** (no more expensive dry-run messages)
- **Simpler client code** (standard HTTP requests)

## Advanced (Optional)

Once you're comfortable with basic state exposure, you can explore:

- [Dynamic Reads](./core/dynamic-reads.md) - Compute values on-the-fly
- [State Exposure](./core/state-exposure.md#patching-user-owned-processes) - Patterns for marketplace applications
- [HyperBEAM Devices](https://hyperbeam.arweave.net/build/devices/hyperbeam-devices.md) - Advanced extensibility

But the core migration is complete - you've successfully moved your process to HyperBEAM by adding state exposure!
