---
prev:
  text: "Building with HyperBEAM"
  link: "./building"
---

# Concepts & Migration

Deep dive into AO's architecture, the actor model, and migration strategies for legacy applications.

## AO-Core Protocol

AO-Core is the fundamental protocol that enables trustless, distributed computation across the world. Inspired by Erlang's actor model, it defines standards for how processes interact and maintain state in a decentralized environment.

### What is AO-Core?

AO-Core provides:

- **Trustless computation standards** distributed across the world
- **Mathematical guarantees** about program execution
- **Composable, modular development** through devices
- **Multiple execution environments** beyond just Lua
- **Actor model implementation** for concurrent, message-passing computation

### The Actor Model in AO

AO implements the actor model where:

- **Each actor (process)** is an independent unit of computation
- **Actors communicate exclusively** through message passing
- **Actors can create other actors**, send messages, and make local decisions
- **The system is inherently concurrent** and distributed

This approach provides natural scalability and resilience in distributed systems.

### Key Features

- **Resilient**: No single point of failure. AO-Core exists across many machines distributed worldwide.
- **Permanent**: Computations are stored permanently on Arweave, allowing recall and continuation at any time.
- **Permissionless**: No registration required. Your right to use it is guaranteed by the underlying protocol.
- **Trustless**: State is mathematically guaranteed, enabling services without central authorities.

## AO Processes

AO Processes are persistent, programmable smart contracts that live inside the AO computer. They embody the actor model as independent computational units with their own state.

### Core Characteristics

- **Stateful**: Each process has private state and memory that persists across interactions.
- **Persistent**: All processes and their entire message history are permanently stored on Arweave.
- **Generative**: Processes can dynamically spawn new processes, enabling complex and evolving systems.

### Actor Model Benefits

The actor model provides several key advantages:

- **Concurrency & Isolation**: Processes execute independently and are isolated from each other, enabling parallelism and preventing cascading failures.
- **Message-Passing**: All communication happens exclusively through asynchronous messages, simplifying interactions.
- **Location Transparency & Fault Tolerance**: Processes can interact without knowing each other's physical location, and the system continues operating even if individual processes fail.

### AOS: The Operating System

AOS (AO Operating System) is an abstraction layer that simplifies interaction with AO Processes. It provides:

- **Powerful shell interface** for sending commands
- **State management tools** for process development
- **Libraries for common functionalities**
- **Streamlined development experience**

### Use Cases

AO Processes are ideal for:

- **Autonomous Agents & Bots**: Price-monitoring bots, arbitrage traders, marketplace agents
- **Decentralized Finance (DeFi)**: Automated market makers, lending protocols, token exchanges
- **On-Chain Games & Social Platforms**: Game state management, decentralized chat, social networks

## Network Information

AO has evolved through multiple network phases, with HyperBEAM representing the current state-of-the-art.

### HyperBEAM Mainnet

**Launched: February 8, 2025**

The current production network providing:

- **High-performance message processing**
- **HTTP state exposure** for real-time data access
- **Direct internet connectivity**
- **Production-ready reliability**

**Default Node:** `https://forward.computer`

### AO Legacynet

**Launched: February 27, 2024**

The original AO network that:

- **Provided the foundation** for AO's hyper-parallel architecture
- **Enabled early experimentation** and development
- **Continues to operate** for legacy applications

### Choosing the Right Network

#### For New Development

Always use **HyperBEAM Mainnet** for:

- New applications and services
- Production deployments
- Modern development patterns

#### For Legacy Applications

Use **Legacynet** only when:

- Maintaining existing legacy code
- Migrating legacy applications to HyperBEAM
- Educational purposes

## Migration Guide

Transition your processes from Legacynet to HyperBEAM to enable significant advancements in performance, features, and developer experience.

### Why Migrate?

HyperBEAM provides:

- **Enhanced Performance**: Architecture optimized for concurrency with faster message scheduling
- **Direct State Access**: HTTP access to process state, eliminating dry-run bottlenecks
- **Easy Extensibility**: Core feature extensibility through modular devices

### Key Changes

The most impactful change is exposing your process state via HTTP for immediate reading. This dramatically improves web frontend and data service performance.

### Migration Steps

#### 1. Update Your Connection

**From Legacynet:**

```bash
aos
```

**To HyperBEAM:**

```bash
aos --node https://forward.computer
```

#### 2. Replace Dry-Run Patterns

**Old Pattern (Dry-Run):**

```lua
-- Expensive and slow
Handlers.add(
  "GetState",
  Handlers.utils.hasMatchingTag("Action", "GetState"),
  function(msg)
    return msg.reply({ Data = tostring(MyState) })
  end
)
```

**New Pattern (Exposing Process State via HTTP):**

```lua
-- Fast and efficient
Handlers.add(
  "UpdateState",
  Handlers.utils.hasMatchingTag("Action", "UpdateState"),
  function(msg)
    MyState = MyState + 1

    -- Expose via HTTP
    Send({
      device = 'patch@1.0',
      cache = { mystate = MyState }
    })
  end
)
```

#### 3. Add Initial State Sync

```lua
-- Make state available immediately
InitialSync = InitialSync or 'INCOMPLETE'
if InitialSync == 'INCOMPLETE' then
  Send({
    device = 'patch@1.0',
    cache = {
      balances = Balances,
      totalsupply = TotalSupply
    }
  })
  InitialSync = 'COMPLETE'
end
```

#### 4. Update Frontend Integration

**Old Pattern:**

```javascript
// Slow dry-run calls
const result = await dryrun({
  process: processId,
  tags: [{ name: "Action", value: "GetState" }],
});
```

**New Pattern:**

```javascript
// Fast HTTP calls
const response = await fetch(
  `https://forward.computer/${processId}~process@1.0/cache/mystate`,
);
const result = await response.text();
```

### Common Migration Scenarios

#### Token Process Migration

**Legacy Approach:**

```lua
-- State kept private, expensive reads
Balances = { alice = 1000, bob = 500 }

Handlers.add(
  "GetBalance",
  Handlers.utils.hasMatchingTag("Action", "GetBalance"),
  function(msg)
    local balance = Balances[msg.Tags.Target] or 0
    return msg.reply({ Data = tostring(balance) })
  end
)
```

**HyperBEAM Approach:**

```lua
-- State exposed for instant access
Balances = { alice = 1000, bob = 500 }

-- Initial sync
InitialSync = InitialSync or 'INCOMPLETE'
if InitialSync == 'INCOMPLETE' then
  Send({
    device = 'patch@1.0',
    cache = { balances = Balances }
  })
  InitialSync = 'COMPLETE'
end

-- Update state and expose
Handlers.add(
  "Transfer",
  Handlers.utils.hasMatchingTag("Action", "Transfer"),
  function(msg)
    -- Transfer logic here

    -- Expose updated balances
    Send({
      device = 'patch@1.0',
      cache = { balances = Balances }
    })
  end
)
```

#### Chat Process Migration

**Legacy Approach:**

```lua
-- Messages stored privately
Messages = {}

Handlers.add(
  "GetMessages",
  Handlers.utils.hasMatchingTag("Action", "GetMessages"),
  function(msg)
    return msg.reply({ Data = json.encode(Messages) })
  end
)
```

**HyperBEAM Approach:**

```lua
-- Messages exposed via HTTP
Messages = {}

-- Initial sync
InitialSync = InitialSync or 'INCOMPLETE'
if InitialSync == 'INCOMPLETE' then
  Send({
    device = 'patch@1.0',
    cache = { messages = Messages }
  })
  InitialSync = 'COMPLETE'
end

-- Add message and update exposure
Handlers.add(
  "AddMessage",
  Handlers.utils.hasMatchingTag("Action", "AddMessage"),
  function(msg)
    table.insert(Messages, {
      user = msg.From,
      content = msg.Data,
      timestamp = os.time()
    })

    -- Expose updated messages
    Send({
      device = 'patch@1.0',
      cache = { messages = Messages }
    })
  end
)
```

### Testing Your Migration

1. **Deploy to HyperBEAM** with `--node https://forward.computer`
2. **Test state exposure** by accessing HTTP endpoints
3. **Verify message handling** works correctly
4. **Update frontend code** to use HTTP calls instead of dry-runs
5. **Monitor performance** improvements

### Migration Resources

- [Exposing Process State via HTTP](../guides/hyperbeam/core/state-exposure.md) - Learn modern patterns
- [Dynamic Reads](../guides/hyperbeam/core/dynamic-reads.md) - Advanced state computation
- [Deprecated Features](../references/deprecated/) - Understanding legacy functionality
- [HyperBEAM Documentation](https://hyperbeam.arweave.net) - Technical specifications

## Advanced Topics

### Device System

HyperBEAM's modular device system allows extending core functionality:

- **~patch@1.0**: HTTP state exposure device
- **~lua@5.3a**: Lua execution device for dynamic reads
- **Custom devices**: Build your own extensions

### Path Language

HyperBEAM uses a sophisticated path language for composing operations:

```
/process-id~process@1.0/now/~lua@5.3a&module={tx-id}/function/serialize~json@1.0
```

This enables powerful data transformation pipelines.

### Performance Considerations

- **Exposing process state via HTTP** is faster than dry-run by orders of magnitude
- **Dynamic reads** move computation to the network edge
- **Batch operations** when possible for efficiency
- **Cache expensive computations** in transformation functions

## Next Steps

You now have a solid understanding of AO's architecture and migration strategies. Explore these resources:

- [Tutorials](../tutorials/) - Hands-on projects
- [Guides](../guides/) - Specific patterns and techniques
- [References](../references/) - API documentation and specifications
- [Discord Community](https://discord.gg/qWgGxJKwNJ) - Get help and share ideas

## Need Help?

- Join the [Discord community](https://discord.gg/qWgGxJKwNJ)
- Check the [HyperBEAM documentation](https://hyperbeam.arweave.net)
- Browse existing [community projects](https://marketverse.arweave.net/) for inspiration
