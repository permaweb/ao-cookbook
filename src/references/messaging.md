# Messaging Patterns in ao

This reference guide explains the messaging patterns available in ao and when to use each one.

## Quick Reference: Choosing the Right Pattern

| If you need to...                                  | Process Flow        | Key function(s)                                                                                                                     |
| -------------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Send a message without waiting for a response      | **_A → B_**         | [`ao.send`](#ao-send-asynchronous-message-sending)                                                                                  |
| Send a message and wait for a response             | **_A → B → A_**     | [`ao.send().receive()`](#ao-send-receive-lowercase-r-blocking-reference-matcher)                                                    |
| Process messages and respond to the sender         | **_B → A_**         | [`Handlers.add`](#msg-reply-asynchronous-response-sending) + [`msg.reply`](#msg-reply-asynchronous-response-sending)                |
| Create a chain of processing services              | **_A → B → C → A_** | [`msg.forward`](#msg-forward-message-forwarding) + [`ao.send().receive()`](#ao-send-receive-lowercase-r-blocking-reference-matcher) |
| Wait for any matching message regardless of sender | **_Any → A_**       | [`Receive`](#receive-capital-r-blocking-pattern-matcher) (capital R)                                                                |
| Create a standard automated response               | **_B → A_**         | [`Handlers.utils.reply`](#handlers-utils-reply-simple-reply-handler-creation)                                                       |

## Sending Messages

### `ao.send`: Asynchronous Message Sending

Non-blocking direct **_A → B_** messaging that returns immediately after sending.

- Use for fire-and-forget notifications or starting async conversations
- Returns a promise-like object that can be chained with [`.receive()`](#ao-send-receive-lowercase-r-blocking-reference-matcher) if needed
- Good for parallel processing since it doesn't block execution

```
Client (A) → Service (B)
   ↓           ↓
Continues    Processes
 execution    message
```

**Basic Send Example:**

```lua
-- Non-blocking send example
local serviceId = "process-789" -- Process ID of the target service

ao.send({
  Target = serviceId,
  Data = "Hello!",
  Action = "Greeting"
})
-- Code here runs immediately after sending
```

### `msg.reply`: Asynchronous Response Sending

Non-blocking **_B → A_** response with automatic reference tracking. Used within handlers to respond to incoming messages.

- Automatically links response to original message via [`X-Reference`](#message-properties)
- Enables asynchronous request-response patterns
- Automatically sets `Target` to the original sender or [`Reply-To`](#message-properties) address if specified

```
Client (A) → Service (B)
          ←
Response tagged with X-Reference
```

**Handler Reply Example:**

```lua
-- Non-blocking reply in a handler
Handlers.add("greeting-handler",
  { Action = "Greeting" },
  function(msg)
    msg.reply({ Data = "Hi back!" }) -- Returns immediately
    -- Handler continues executing here
  end
)
```

### `msg.forward`: Message Forwarding

Non-blocking multi-process routing for **_A → B → C → A_** patterns. Creates a sanitized copy of the original message.

- Takes a `target` and a partial message to overwrite forwarded message fields
- Preserves [`Reply-To`](#message-properties) and [`X-Reference`](#message-properties) properties for complete message tracking
- Sets [`X-Origin`](#message-properties) to original sender, enabling final service to reply directly to originator

```
Client (A) → Service (B) → Backend (C)
       ↖                       ↙
    Response with X-Reference
```

**Multi-Process Pipeline Example:**

```lua
-- In client process
local middlewareProcessId = "process-123"
local finalProcessId = "process-456"

-- Send to middleware and wait for response from final service
local response = ao.send({
  Target = middlewareProcessId,
  Action = "Transform",
  Data = "raw-data"
}).receive(finalProcessId)  -- Explicitly wait for response from final service

-- In middleware service
Handlers.add("transform-middleware",
  { Action = "Transform" },
  function(msg)
    local finalProcessId = "process-456"

    msg.forward(finalProcessId, {
      Data = msg.Data .. " (pre-processed)",
      Action = "Transform-Processed"
    })
  end
)

-- In final service
Handlers.add("final-processor",
  { Action = "Transform-Processed" },
  function(msg)
    -- No need to know the client ID - it's stored in X-Origin
    msg.forward(msg['X-Origin'], {
      Data = msg.Data .. " (final processing complete)",
      Action = "Transform-Complete"
    })
  end
)
```

### `Handlers.utils.reply`: Simple Reply Handler Creation

Creates a handler function that automatically replies with a fixed response. A wrapper around [`msg.reply`](#msg-reply-asynchronous-response-sending) for common use cases.

**Simple String Response Example:**

```lua
-- Simple string response handler
Handlers.add("echo-handler",
  { Action = "Echo" },
  Handlers.utils.reply("Echo reply!")
)

-- Equivalent to:
Handlers.add("echo-handler",
  { Action = "Echo" },
  function(msg)
    msg.reply({ Data = "Echo reply!" })
  end
)
```

**Message Table Response Example:**

```lua
-- Message table response handler
Handlers.add("status-handler",
  { Action = "Status" },
  Handlers.utils.reply({
    Data = "OK",
    Action = "Status-Response"
  })
)
```

## Receiving Messages

### `Receive` (Capital R): Blocking Pattern Matcher

Blocks execution until any matching message arrives from any sender. Under the hood, this is implemented using `Handlers.once`, making it a one-time pattern matcher that automatically removes itself after execution.

- Waits for any message matching the pattern, regardless of origin
- Use for synchronous message processing flows or event listening
- Automatically removes the handler after first match (using `Handlers.once` internally)

```
        Process (A)
            ↓
Blocks until match received
            ↓
    Continues execution
```

**Message Pattern Matching Example:**

```lua
-- Blocks until matching message received
local msg = Receive({
  Action = "Update"
})

if msg then
  -- Process message
end
```

### `ao.send().receive` (Lowercase r): Blocking Reference Matcher

Blocks execution until a specific reply arrives, enabling **_A → B → A_** and **_A → B → C → A_** request-response cycles.

- Only matches messages linked by [`X-Reference`](#message-properties)
- Can specify a target process ID to indicate which process will reply
- Implicitly waits for the proper response based on message reference chains
- For **_A → B → A_** flows, process B uses [`msg.reply`](#msg-reply-asynchronous-response-sending)
- For **_A → B → C → A_** flows, processes B and C use [`msg.forward`](#msg-forward-message-forwarding)

**Basic Request-Response Example:**

```lua
-- Basic usage: wait for reply from target
local serviceId = "process-789"

local reply = ao.send({
  Target = serviceId,
  Action = "Query",
  Data = { query: "select" }
}).receive() -- Blocks until response received
```

## Message Properties

The following properties track message chains and ensure proper routing:

- `Reference`: Unique identifier automatically assigned to each message.
- `Reply-To`: Specifies the destination for responses.
- `X-`: Any property starting with `X-` denotes a 'forwarded' tag and is automatically managed by the system.
  - `X-Reference`: Maintains the conversation chain across replies and forwards.
  - `X-Origin`: Tracks the conversation originator.

The system automatically manages these properties when using `msg.reply` and `msg.forward`. Check
out the [source code](https://github.com/permaweb/aos/blob/e9fc10c54b4f21302ee8d084d31f3383b46857b2/process/process.lua#L377-L406) to see exactly how these
properties are managed.

## Blocking vs. Non-Blocking

Functions either pause your code or let it continue running:

- **Non-blocking** ([`ao.send`](#ao-send-asynchronous-message-sending), [`msg.reply`](#msg-reply-asynchronous-response-sending), [`msg.forward`](#msg-forward-message-forwarding)): Send and continue execution
- **Blocking** ([`Receive`](#receive-capital-r-blocking-pattern-matcher), [`.receive()`](#ao-send-receive-lowercase-r-blocking-reference-matcher)): Pause until response arrives
