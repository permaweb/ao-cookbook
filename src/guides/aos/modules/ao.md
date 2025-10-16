# ao

Built-in global library for process communication and management. The `ao` object provides core functionality for sending messages, spawning processes, and logging.

## Core Functions

### `ao.send(msg)`

Sends a message to another process. See the [ao.send](/references/api/ao.md#ao-send-msg-message) reference for more information.

```lua
-- Send a simple message
ao.send({
  Target = "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A",
  Data = "Hello!",
  Tags = {
    Action = "Greeting"
  }
})

-- Root-level fields are automatically converted to tags
ao.send({
  Target = "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A",
  Data = "Transfer tokens",
  Action = "Transfer",     -- Becomes a tag
  Quantity = "1045"       -- Becomes a tag
})
```

### `ao.spawn(module: string, spawn: table)`

Creates a new process from a module. See the [ao.spawn](/references/api/ao.md#ao-spawn-module-string-spawn-spawn) reference for more information.

```lua
-- Spawn a calculator process
ao.spawn("n0BFH80b73mi9VAWUzyuG9gEC3LI2zU2BFxum0N8A9s", {
  Data = { initial = "state" },
  Tags = {
    ["Process-Type"] = "calculator"
  }
})
```

### `ao.log(string|table)`

Logs messages or data that can be read by process callers.

```lua
-- Log a debug message
ao.log("Processing transfer...")

-- Log structured data
ao.log({
  event = "transfer_complete",
  amount = 100,
  recipient = "addr123..."
})
```

## Environment

The `ao.env` variable contains process initialization info like ID, owner, and tags.

```lua
-- Access process info
local processId = ao.env.Process.Id
local owner = ao.env.Process.Owner
```

For the complete API reference including all properties and functions, see the [ao reference documentation](/references/api/ao.md).
