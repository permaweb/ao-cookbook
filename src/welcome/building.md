---
prev:
  text: "Welcome & Quick Start"
  link: "./index"
next:
  text: "Concepts & Migration"
  link: "./concepts"
---

# Building with HyperBEAM

<div style="width: 100%; max-width: 100vw; margin-bottom: 2em;">
  <video class="theme-invert-video" src="https://arweave.net/pc73dj9tZtj7AOeIKBGiiOm5ta13FYXzgsqWSePAxiM" style="width: 100%; height: auto; display: block;" autoplay="" muted="" playsinline="" loop="" controlslist="nodownload nofullscreen noremoteplayback" disablepictureinpicture="" preload="auto"></video>
</div>

Master modern AO development patterns with HyperBEAM's high-performance features. This guide covers exposing process state via HTTP, dynamic reads, and practical patterns for building decentralized applications.

## Exposing Process State via HTTP: The Foundation

HyperBEAM enables direct HTTP access to your process state, replacing the old dry-run pattern with instant data access. For the basics, see the [Welcome Guide](./index) - this section covers comprehensive patterns for real applications.

### The Patch Device

The `~patch@1.0` device makes process state readable via HTTP GET requests:

```lua
-- Expose data via HTTP
Send({
  device = 'patch@1.0',
  counter = 42,
  status = "active",
  users = { alice = 100, bob = 200 }
})
```

Access immediately at:

```
  https://forward.computer/<process-id>~process@1.0/compute/counter
  https://forward.computer/<process-id>~process@1.0/compute/status
  https://forward.computer/<process-id>~process@1.0/compute/users
```

### Initial State Sync Pattern

Make critical data available immediately on process creation:

```lua
-- Initialize state
Balances = { alice = 1000, bob = 500 }
TotalSupply = 1500

-- Sync once on process load
InitialSync = InitialSync or 'INCOMPLETE'
if InitialSync == 'INCOMPLETE' then
  Send({
    device = 'patch@1.0',
    balances = Balances,
    totalsupply = TotalSupply
  })
  InitialSync = 'COMPLETE'
end
```

## Dynamic Reads: Compute on Demand

Dynamic reads enable on-the-fly computations without modifying process state.

### Transformation Functions

Create Lua scripts that process cached state:

```lua
-- circulating-supply.lua
function calculate(base, req)
  local totalSupply = 0
  local holderCount = 0

  if base.balances then
    for address, balance in pairs(base.balances) do
      local numBalance = tonumber(balance) or 0
      totalSupply = totalSupply + numBalance
      holderCount = holderCount + 1
    end
  end

  return {
    CirculatingSupply = tostring(math.floor(totalSupply)),
    HolderCount = tostring(holderCount),
    LastCalculated = os.time()
  }
end
```

### Publishing and Using Functions

1. **Upload your script to Arweave:**

```bash
npm i -g @permaweb/arx
arx upload circulating-supply.lua -w wallet.json -t arweave --content-type application/lua
```

2. **Call via HyperBEAM URL:**

```
GET /<process-id>~process@1.0/now/~lua@5.3a&module={SCRIPT_TX_ID}/calculate/serialize~json@1.0
```

3. **Use in JavaScript:**

```javascript
async function getCirculatingSupply(processId, scriptTxId) {
  const url = `https://forward.computer/${processId}~process@1.0/now/~lua@5.3a&module=${scriptTxId}/calculate/serialize~json@1.0`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    supply: data.circulatingsupply,
    holders: data.holdercount,
  };
}
```

## Common Patterns

### Token Process Pattern

```lua
-- Token state
Balances = Balances or {}
TotalSupply = TotalSupply or 0
Name = "MyToken"
Ticker = "MTK"

-- Initial state sync
InitialSync = InitialSync or 'INCOMPLETE'
if InitialSync == 'INCOMPLETE' then
  Send({
    device = 'patch@1.0',
    cache = {
      balances = Balances,
      totalsupply = tostring(TotalSupply),
      name = Name,
      ticker = Ticker
    }
  })
  InitialSync = 'COMPLETE'
end

-- Transfer handler
Handlers.add(
  "Transfer",
  Handlers.utils.hasMatchingTag("Action", "Transfer"),
  function(msg)
    local target = msg.Tags.Target
    local amount = tonumber(msg.Tags.Amount)

    if not target or not amount or amount <= 0 then
      return msg.reply({ Error = "Invalid transfer parameters" })
    end

    local senderBalance = tonumber(Balances[msg.From]) or 0
    if senderBalance < amount then
      return msg.reply({ Error = "Insufficient balance" })
    end

    -- Update balances
    Balances[msg.From] = tostring(senderBalance - amount)
    Balances[target] = tostring((tonumber(Balances[target]) or 0) + amount)

    -- Expose updated state
    Send({
      device = 'patch@1.0',
      balances = Balances,
      totalsupply = tostring(TotalSupply)
    })

    return msg.reply({
      Status = "Success",
      From = msg.From,
      To = target,
      Amount = tostring(amount)
    })
  end
)
```

### Chat Process Pattern

```lua
-- Chat state
Messages = Messages or {}
Users = Users or {}

-- Add message handler
Handlers.add(
  "AddMessage",
  Handlers.utils.hasMatchingTag("Action", "AddMessage"),
  function(msg)
    local content = msg.Data
    local user = msg.From

    if not content or content == "" then
      return msg.reply({ Error = "Message cannot be empty" })
    end

    -- Add message
    local messageId = tostring(#Messages + 1)
    Messages[messageId] = {
      id = messageId,
      user = user,
      content = content,
      timestamp = os.time()
    }

    -- Track user
    Users[user] = (Users[user] or 0) + 1

    -- Expose updated state
    Send({
      device = 'patch@1.0',
      messages = Messages,
      users = Users,
      messageCount = tostring(#Messages),
      userCount = tostring(table.getn(Users))
    })

    return msg.reply({
      Status = "Message added",
      MessageId = messageId
    })
  end
)

-- Get messages handler
Handlers.add(
  "GetMessages",
  Handlers.utils.hasMatchingTag("Action", "GetMessages"),
  function(msg)
    local limit = tonumber(msg.Tags.Limit) or 50
    local result = {}

    -- Get latest messages
    local count = 0
    for i = #Messages, 1, -1 do
      if count >= limit then break end
      table.insert(result, Messages[i])
      count = count + 1
    end

    return msg.reply({
      Data = json.encode(result),
      Count = tostring(count)
    })
  end
)
```

## Integration with External Systems

### Web Frontend Integration

```javascript
class AOProcessClient {
  constructor(processId, hyperbeamUrl = "https://forward.computer") {
    this.processId = processId;
    this.hyperbeamUrl = hyperbeamUrl;
  }

  // Read state via HTTP
  async getState(key) {
    const url = `${this.hyperbeamUrl}/${this.processId}~process@1.0/compute/${key}`;
    const response = await fetch(url);
    return await response.text();
  }

  // Send message to process
  async sendMessage(action, tags = {}, data = "") {
    const message = {
      target: this.processId,
      tags: [
        { name: "Action", value: action },
        ...Object.entries(tags).map(([k, v]) => ({ name: k, value: v })),
      ],
      data,
    };

    // Use aoconnect to send message
    const result = await message({
      process: this.processId,
      signer: this.signer,
      ...message,
    });

    return result;
  }

  // Get dynamic computation result
  async getDynamicResult(scriptTxId, functionName) {
    const url = `${this.hyperbeamUrl}/${this.processId}~process@1.0/now/~lua@5.3a&module=${scriptTxId}/${functionName}/serialize~json@1.0`;
    const response = await fetch(url);
    return await response.json();
  }
}

// Usage example
const client = new AOProcessClient("your-process-id");

// Read counter value
const counter = await client.getState("counter");

// Send increment message
await client.sendMessage("Increment");

// Get computed circulating supply
const supply = await client.getDynamicResult("script-tx-id", "calculate");
```

### API Gateway Pattern

Create an API gateway that aggregates data from multiple processes:

```javascript
class AOGateway {
  constructor() {
    this.processes = new Map();
  }

  registerProcess(name, processId) {
    this.processes.set(name, processId);
  }

  async getAggregatedState() {
    const results = {};

    for (const [name, processId] of this.processes) {
      try {
        const response = await fetch(
          `https://forward.computer/${processId}~process@1.0/compute/status`,
        );
        results[name] = await response.text();
      } catch (error) {
        results[name] = "Error: " + error.message;
      }
    }

    return results;
  }
}
```

## Best Practices

### State Management

- **Use descriptive keys** in cache tables (avoid `state`, `info`, `test`)
- **Always use lowercase** for cache keys (HTTP paths are case-insensitive)
- **Batch updates** when possible for efficiency
- **Initialize state sync** for critical data

### Performance

- **Patch frequently updated data** for real-time access
- **Use dynamic reads** for complex computations
- **Cache expensive calculations** in transformation functions
- **Minimize payload sizes** for better performance

### Security

- **Validate inputs** in all handlers
- **Check permissions** before state modifications
- **Use rate limiting** for expensive operations
- **Never expose sensitive data** via HTTP state access

## Next Steps

Continue to [**Concepts & Migration**](./concepts) to understand the underlying architecture, or explore the [Tutorials](../tutorials/) for hands-on projects.

## Need Help?

- Join the [Discord community](https://discord.gg/qWgGxJKwNJ)
- Check the [HyperBEAM documentation](https://hyperbeam.arweave.net)
- Browse the [Guides](../guides/) for specific patterns
