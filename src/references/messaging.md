# Messaging Patterns in ao

This reference guide explains the different messaging patterns available in ao and when to use each one.

## Key Points

- `ao.send` is non-blocking and returns immediately, good for fire-and-forget messaging
- `msg.reply` is non-blocking, sends a response linked to the original message
- `Handlers.utils.reply` creates non-blocking automated reply handlers
- `Receive` (capital R) is blocking and waits for the next matching message
- `.receive` (lowercase) is blocking and waits for a specific reply by reference

## What is Each Function For?

### `ao.send`: Asynchronous Message Sending

- Non-blocking: returns immediately after sending
- Use for fire-and-forget notifications or starting async conversations
- Returns a promise-like object that can be chained with `.receive()` if needed
- Good for parallel processing since it doesn't block execution

```lua
-- Non-blocking send
ao.send({
  Target = "process123",
  Data = "Hello!",
  Tags = { Type = "Greeting" }
})
-- Code here runs immediately after sending

-- Blocking send with response waiting
local response = ao.send({
  Target = "process123",
  Data = "Hello!",
  Tags = { Type = "Greeting" }
}).receive() -- Blocks until response received
```

### `msg.reply`: Asynchronous Response Sending

- Non-blocking: returns immediately after sending reply
- Automatically links response to original message via [X-Reference](https://hackmd.io/@ao-docs/rk_R2S_O0#-Message-object-enhancements-replynewMsg-and-forwardtarget-newMsg)
- Used within handlers to respond to incoming messages
- Enables asynchronous request-response patterns

```lua
-- Non-blocking reply in a handler
Handlers.add("greet",
  { Tags = { Type = "Greeting" } },
  function(msg)
    msg.reply({ Data = "Hi back!" }) -- Returns immediately
    -- Handler continues executing here
  end
)
```

### `Handlers.utils.reply`: Simple Reply Handler Creation

- Creates a handler function that automatically replies with a fixed response
- Wrapper around `msg.reply` for common use cases
- Useful for simple request-response handlers
- Takes either a string (converted to `{ Data: string }`) or a [message table](/references/ao#message)

```lua
-- Simple string response handler
Handlers.add("echo",
  "Echo",
  Handlers.utils.reply("Echo reply!")
)

-- Equivalent to:
Handlers.add("echo",
  { Action = "Echo" },
  function(msg)
    msg.reply({ Data = "Echo reply!" })
  end
)

-- Message table response handler
Handlers.add("status",
  { Tags = { Type = "Status" } },
  Handlers.utils.reply({
    Data = "OK",
    Tags = { Status = "Success" }
  })
)
```

## Message Reception Methods

### `Receive` (Capital R): Blocking Pattern Matcher

- Blocks execution until a matching message arrives
- Waits for any message matching the pattern, regardless of sender
- Use for synchronous message processing flows

```lua
-- Blocks until matching message received
local msg = Receive({
  Tags = { Action = "Update" }
})

if msg then
  -- Process message
end
```

### `ao.send().receive` (Lowercase): Blocking Reference Matcher

- Blocks execution until specific reply arrives
- Only matches messages linked by X-Reference
- Use for synchronous request-response patterns

```lua
-- Blocks until specific reply received
local reply = ao.send({
  Target = "service123",
  Tags = { Action = "Query" }
}).receive()

if reply then
  -- Process reply
end
```

## Common Messaging Patterns

### 1. Asynchronous Notification (Non-blocking)

```lua
-- Fire-and-forget notification
ao.send({
  Target = "notifications",
  Tags = { Type = "Alert" },
  Data = "System maintenance in 5 minutes"
})
-- Continues executing immediately
```

### 2. Synchronous Request-Response (Blocking)

```lua
-- Blocks until response received
local response = ao.send({
  Target = "database",
  Tags = { Action = "Query" },
  Data = { table = "users", id = 123 }
}).receive()

if not response then
  error("Request failed")
end
```

### 3. Asynchronous Service Handler

```lua
-- Non-blocking handler setup
Handlers.add("async-service",
  { Action = "Process" },
  function(msg)
    -- Async processing
    local result = heavyComputation()
    msg.reply({ Data = result })
  end
)
```

## Conclusion

Understanding the blocking/non-blocking nature of each pattern is crucial:

- Use non-blocking `ao.send` and `msg.reply` for responsive, parallel processing
- Use blocking `Receive` and `.receive` when synchronous flow is required
- Be cautious with blocking operations as they will wait indefinitely
- Use async patterns for long-running operations to maintain responsiveness

Choose patterns based on your specific needs for synchronous vs asynchronous execution.
