---
next:
  text: "Building with HyperBEAM"
  link: "./building"
---

# Welcome to AO

![ao logo](/ao-logo-grey.svg)

AO is a decentralized compute system where countless parallel processes interact within a single, cohesive environment. Built on the **AO-Core protocol**, it uses the actor model inspired by Erlang - each process operates independently yet connects through native message-passing, creating a web of autonomous computation.

**HyperBEAM** is the current production network that provides high-performance message processing and instant HTTP access to your process state.

## Start Building in Minutes

Get hands-on immediately with AO development using modern HyperBEAM patterns.

### Prerequisites

- [NodeJS](https://nodejs.org) version 20+
- A code editor of your choice

### Step 1: Install AOS

```sh
npm i -g https://get_ao.arweave.net
```

### Step 2: Start AOS with HyperBEAM

Connect directly to a HyperBEAM node for the best experience:

```sh
aos --node https://forward.computer
```

For development, you can also use the default:

```sh
aos
```

You authenticate using a keyfile. If you have an Arweave wallet, specify it with `--wallet [location]`. Otherwise, a new keyfile is generated at `~/.aos.json`.

### Step 3: Your First Process

After connecting, you'll see the AOS welcome screen and your personal process prompt:

```lua
default@aos-2.0.10[Inbox:1]>
```

This is your personal server in the AO computer! Try your first command:

```lua
default@aos-2.0.10[Inbox:1]>
```

You just sent a message that was **permanently stored on Arweave** and **processed by a distributed compute network**. Your process is a decentralized server that's resilient, permanent, permissionless, and trustless.

### Step 4: Try Exposing State via HTTP

Unlike older systems, modern AO development uses HyperBEAM to expose process state via HTTP. Try this simple example:

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
      counter = Counter
    })
  end
)
```

### Step 5: Test Your Process

Send a message to increment the counter:

```lua
Send({ Target = ao.id, Tags = { Action = "Increment" } })
```

### Step 6: Read State via HTTP

Your counter value is now instantly available at:

```
  https://forward.computer/<process-id>~process@1.0/compute/counter
```

This is the power of HyperBEAM - **instant HTTP access to your process state!**

### Step 7: Load a Blueprint

Start with a community blueprint to learn more patterns:

```lua
.load-blueprint chat
```

## What's Next?

Continue to [**Building with HyperBEAM**](./building) to learn advanced patterns, or explore [**Concepts & Migration**](./concepts) for deeper understanding.

## Need Help?

- Join the [Discord community](https://discord.gg/qWgGxJKwNJ)
- Browse the [Tutorials](../tutorials/) for hands-on projects
- Check the [Guides](../guides/) for step-by-step patterns
