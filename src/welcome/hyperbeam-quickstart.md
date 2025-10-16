# HyperBEAM Quick Start

Get started with AO development using HyperBEAM in just a few minutes. This guide focuses on current best practices and modern patterns.

## Prerequisites

- [NodeJS](https://nodejs.org) version 20+
- A code editor of your choice

## Step 1: Install AOS

```sh
npm i -g https://get_ao.arweave.net
```

## Step 2: Start AOS with HyperBEAM

For the best experience, connect directly to a HyperBEAM node:

```sh
aos --node https://forward.computer
```

For development, you can also use the default:

```sh
aos
```

## Step 3: Load a Blueprint

Start with a community blueprint to learn the patterns:

```lua
.load-blueprint chat
```

## Step 4: Explore State Exposure

Modern AO development uses state exposure instead of dry runs. Try this example:

```lua
-- Create a simple counter
Counter = Counter or 0

Handlers.add(
  "Increment",
  Handlers.utils.hasMatchingTag("Action", "Increment"),
  function(msg)
    Counter = Counter + 1
    -- Expose the counter value via HTTP
    Send({
      device = 'patch@1.0',
      cache = { counter = Counter }
    })
  end
)

Handlers.add(
  "GetCounter",
  Handlers.utils.hasMatchingTag("Action", "GetCounter"),
  function(msg)
    return msg.reply({ Data = tostring(Counter) })
  end
)
```

## Step 5: Test Your Process

Send a message to increment the counter:

```lua
Send({ Target = ao.id, Tags = { Action = "Increment" } })
```

## Step 6: Read State via HTTP

Your counter value is now available at:

```
https://forward.computer/<process-id>~process@1.0/cache/counter
```

## Next Steps

- Learn more about [State Exposure](../migrating-to-hyperbeam/state-exposure.md)
- Explore [Dynamic Reads](../migrating-to-hyperbeam/dynamic-reads.md)
- Build your first [Token](../tutorials/begin/token.md)
- Create a [Chatroom](../tutorials/begin/chatroom.md)

## Need Help?

- Join the [Discord community](https://discord.gg/qWgGxJKwNJ)
- Check the [Concepts](../concepts/index.md) section
- Browse the [Tutorials](../tutorials/index.md)

---

**Note**: This guide uses HyperBEAM patterns. If you need to migrate from Legacynet, see the [Migration Guide](../migrating-to-hyperbeam/why-migrate.md).
