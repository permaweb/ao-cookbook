# HyperBEAM Getting Started

Get started with HyperBEAM development using modern patterns. This guide covers the essential steps to go from basic AO knowledge to building HyperBEAM-powered applications.

## Prerequisites

You should have completed the [Welcome & Quick Start](../../welcome/) guide and have:

- AOS installed and connected to HyperBEAM
- Basic understanding of AO processes and handlers
- Familiarity with Lua basics

## Step 1: Connect to HyperBEAM

Make sure you're connected to the HyperBEAM network:

```bash
aos --node https://forward.computer
```

If you're already running `aos`, you can verify your connection by checking your process ID and ensuring it's working with HyperBEAM patterns.

## Step 2: Understand State Exposure

The key difference with HyperBEAM is **state exposure** - making your process state readable via HTTP instead of requiring slow dry-run messages.

### Old Way (Legacynet)

```lua
-- Slow: Clients must send dry-run messages
Handlers.add(
  "GetCounter",
  Handlers.utils.hasMatchingTag("Action", "GetCounter"),
  function(msg)
    return msg.reply({ Data = tostring(Counter) })
  end
)
```

### New Way (HyperBEAM)

```lua
-- Fast: Expose state via HTTP
Handlers.add(
  "Increment",
  Handlers.utils.hasMatchingTag("Action", "Increment"),
  function(msg)
    Counter = Counter + 1

    -- Expose updated counter via HTTP
    Send({
      device = 'patch@1.0',
      cache = { counter = Counter }
    })
  end
)
```

## Step 3: Your First HyperBEAM Process

Let's create a simple counter process that demonstrates state exposure:

```lua
-- Initialize state
Counter = Counter or 0

-- Initial state sync - makes state available immediately
InitialSync = InitialSync or 'INCOMPLETE'
if InitialSync == 'INCOMPLETE' then
  Send({
    device = 'patch@1.0',
    cache = { counter = Counter }
  })
  InitialSync = 'COMPLETE'
end

-- Increment handler
Handlers.add(
  "Increment",
  Handlers.utils.hasMatchingTag("Action", "Increment"),
  function(msg)
    Counter = Counter + 1

    -- Expose new value via HTTP
    Send({
      device = 'patch@1.0',
      cache = {
        counter = Counter,
        lastUpdate = os.time(),
        updatedBy = msg.From
      }
    })

    print("Counter incremented to:", Counter)
  end
)

-- Get current value (for completeness)
Handlers.add(
  "GetCounter",
  Handlers.utils.hasMatchingTag("Action", "GetCounter"),
  function(msg)
    return msg.reply({
      Data = tostring(Counter),
      Counter = Counter
    })
  end
)
```

## Step 4: Test Your Process

1. **Load the process** into your AOS session
2. **Increment the counter:**
   ```lua
   Send({ Target = ao.id, Tags = { Action = "Increment" } })
   ```
3. **Read via HTTP:**
   ```bash
   curl https://forward.computer/YOUR_PROCESS_ID~process@1.0/cache/counter
   ```

You should see the counter value returned instantly via HTTP!

## Step 5: Access Multiple State Values

You can expose multiple values at once:

```lua
-- Expose multiple related values
Send({
  device = 'patch@1.0',
  cache = {
    counter = Counter,
    status = "active",
    metadata = {
      version = "1.0.0",
      owner = ao.id,
      created = os.time()
    }
  }
})
```

Access them via:

- `/cache/counter` - Returns the counter value
- `/cache/status` - Returns the status
- `/cache/metadata` - Returns the metadata object

## Step 6: Update State on Changes

Always expose updated state after modifications:

```lua
Handlers.add(
  "UpdateStatus",
  Handlers.utils.hasMatchingTag("Action", "UpdateStatus"),
  function(msg)
    local newStatus = msg.Tags.Status

    if not newStatus then
      return msg.reply({ Error = "Status required" })
    end

    Status = newStatus

    -- Expose updated status
    Send({
      device = 'patch@1.0',
      cache = {
        status = Status,
        statusUpdated = os.time(),
        updatedBy = msg.From
      }
    })

    return msg.reply({ Status = "Updated" })
  end
)
```

## Common Patterns

### Token Balances

```lua
Balances = Balances or {}

-- Initial sync
InitialSync = InitialSync or 'INCOMPLETE'
if InitialSync == 'INCOMPLETE' then
  Send({
    device = 'patch@1.0',
    cache = { balances = Balances }
  })
  InitialSync = 'COMPLETE'
end

-- Transfer with state exposure
Handlers.add(
  "Transfer",
  Handlers.utils.hasMatchingTag("Action", "Transfer"),
  function(msg)
    local amount = tonumber(msg.Tags.Amount)
    local target = msg.Tags.Target

    -- Transfer logic here...
    Balances[msg.From] = tostring(tonumber(Balances[msg.From]) - amount)
    Balances[target] = tostring(tonumber(Balances[target]) + amount)

    -- Expose updated balances
    Send({
      device = 'patch@1.0',
      cache = { balances = Balances }
    })
  end
)
```

### Chat Messages

```lua
Messages = Messages or {}

-- Add message with state exposure
Handlers.add(
  "AddMessage",
  Handlers.utils.hasMatchingTag("Action", "AddMessage"),
  function(msg)
    local message = {
      id = tostring(#Messages + 1),
      user = msg.From,
      content = msg.Data,
      timestamp = os.time()
    }

    table.insert(Messages, message)

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

## Best Practices

1. **Always use lowercase keys** in cache tables (HTTP paths are case-insensitive)
2. **Avoid reserved keywords** like `state`, `info`, `test`, `now`, `compute`
3. **Batch updates** when possible for efficiency
4. **Initialize state sync** for critical data that should be available immediately
5. **Expose derived values** (like counts, totals) for easier frontend access

## Next Steps

Now that you understand the basics of HyperBEAM state exposure, explore:

- **[Core Concepts](./core/state-exposure.md)** - Deep dive into state exposure, dynamic reads, and advanced patterns
- **[Building Applications](./building/javascript-sdk.md)** - Learn to integrate with web frontends, external data, and JavaScript SDKs
- **[Migration Guide](./migration.md)** - If you have existing Legacynet processes to migrate

## Need Help?

- Join the [Discord community](https://discord.gg/qWgGxJKwNJ)
- Check the [HyperBEAM documentation](https://hyperbeam.arweave.net)
- Browse the [Tutorials](../../tutorials/) for hands-on projects
