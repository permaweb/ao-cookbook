# Messaging Patterns in ao

This reference guide explains the different messaging patterns available in ao and when to use each one.

## Key Points

### Sending Messages

- `ao.send` is non-blocking and returns immediately, enables direct **_A → B_** messaging patterns
- `msg.reply` is non-blocking, enables **_B → A_** response patterns with message reference tracking
- `msg.forward` is non-blocking, enables multi-process routing **_A → B → C → A_** patterns
- `Handlers.utils.reply` creates automated response handlers for common **_B → A_** patterns

### Receiving Messages

- `Receive` (capital R) is blocking, enables waiting for any matching message from any sender
- `.receive` (lowercase) is blocking, enables completion of **_A → B → A_** request-response cycles

### Message Properties

- `X-Reference` tracks message chains across reply and forward operations
- `X-Origin` preserves the original sender ID throughout forwarding chains
- `Reply-To` determines where responses should be directed

## Summary Table

| Function               | Behavior     | Pattern             | Key Features                                                                                   | Best For                                                                                   |
| ---------------------- | ------------ | ------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `ao.send`              | Non-blocking | **_A → B_**         | • Returns immediately<br>• Returns a promise-like object<br>• Can be chained with `.receive()` | • Fire-and-forget notifications<br>• Starting async conversations<br>• Parallel processing |
| `msg.reply`            | Non-blocking | **_B → A_**         | • Auto-tracks via `X-Reference`<br>• Sets `Target` to original sender<br>• Used in handlers    | • Responding to requests<br>• Async request-response<br>• Handler-based flows              |
| `msg.forward`          | Non-blocking | **_A → B → C → A_** | • Preserves message chain<br>• Sets `X-Origin` to original sender<br>• Sanitizes message copy  | • Multi-process pipelines<br>• Service composition<br>• Request delegation                 |
| `Handlers.utils.reply` | Non-blocking | **_B → A_**         | • Automatic handler creation<br>• Simplified syntax<br>• Wraps `msg.reply`                     | • Simple responses<br>• Standard reply patterns<br>• Reducing boilerplate                  |
| `Receive` (capital R)  | Blocking     | Any → Process       | • Waits for any matching message<br>• Pattern-based matching<br>• Sender-agnostic              | • Event listeners<br>• Waiting for updates<br>• Synchronous flows                          |
| `.receive` (lowercase) | Blocking     | **_A → B → A_**     | • Waits for specific reply<br>• Reference-based matching<br>• Can target specific responder    | • Request-response cycles<br>• Waiting for results<br>• Synchronous processing             |

## What is Each Function For?

### `ao.send`: Asynchronous Message Sending

- Non-blocking: returns immediately after sending
- Enables direct **_A → B_** unidirectional message patterns
- Use for fire-and-forget notifications or starting async conversations
- Returns a promise-like object that can be chained with `.receive()` if needed
- Good for parallel processing since it doesn't block execution
- Automatically serializes table data to JSON with proper `Content-Type` headers

```lua
-- Non-blocking send
local serviceId = "process-789" -- Process ID of the target service

ao.send({
  Target = serviceId,
  Data = "Hello!",
  Action = "Greeting"
})
-- Code here runs immediately after sending

-- Blocking send with response waiting
local response = ao.send({
  Target = serviceId,
  Data = "Hello!",
  Action = "Greeting"
}).receive() -- Blocks until response received
```

```
Client (A) → Service (B)
   ↓           ↓
Continues    Processes
 execution    message
```

### `msg.reply`: Asynchronous Response Sending

- Non-blocking: returns immediately after sending reply
- Enables **_B → A_** direct response patterns with automatic reference tracking
- Automatically links response to original message via [`X-Reference`](#message-property-propagation)
- Used within handlers to respond to incoming messages
- Enables asynchronous request-response patterns
- Preserves message correlation chain for proper request-response tracking
- Automatically sets `Target` to the original sender or `Reply-To` address if specified

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

```
Client (A) → Service (B)
          ←
Response tagged with X-Reference
```

### `msg.forward`: Message Forwarding

- Enables multi-process message routing **_A → B → C → A_** patterns
- Takes a `target` and a partial message to overwrite forwarded message fields
- Preserves message reference chain for response tracking
- Useful for building process pipelines and service composition
- Creates a sanitized copy of the entire original message (not just partial data)
- Preserves `Reply-To` and `X-Reference` properties for complete message tracking
- Sets `X-Origin` to original sender, enabling final service to reply directly to originator

See [Multi-Process Pipeline](#multi-process-pipeline) pattern for a complete example.

```
Client (A) → Service (B) → Backend (C)
       ↖                       ↙
    Response with X-Reference
```

### `Handlers.utils.reply`: Simple Reply Handler Creation

- Creates a handler function that automatically replies with a fixed response
- Enables standardized **_B → A_** response patterns with minimal code
- Wrapper around `msg.reply` for common use cases
- Useful for simple request-response handlers
- Takes either a string (converted to `{ Data: string }`) or a [message table](/references/ao#message)

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

-- Message table response handler
Handlers.add("status-handler",
  { Action = "Status" },
  Handlers.utils.reply({
    Data = "OK",
    Action = "Status-Response"
  })
)
```

```
           Incoming
              ↓
Service (B) → Handler → Auto-Reply
              ↓
         Continues execution
```

## Message Reception Methods

### `Receive` (Capital R): Blocking Pattern Matcher

- Blocks execution until a matching message arrives
- Enables "wait for any sender" patterns where messages can come from multiple sources
- Waits for any message matching the pattern, regardless of sender
- Use for synchronous message processing flows

```lua
-- Blocks until matching message received
local msg = Receive({
  Action = "Update"
})

if msg then
  -- Process message
end
```

```
     ↓ Any matching message
Process
     ↓ Blocks until match
Continues execution
```

### `ao.send().receive` (Lowercase r): Blocking Reference Matcher

- Blocks execution until specific reply arrives
- Enables completion of **_A → B → A_** request-response cycles with guaranteed matching
- Only matches messages linked by [`X-Reference`](#message-property-propagation)
- Can specify a target process ID to indicate which process will reply
- Use for synchronous request-response patterns
- Implicitly waits for the proper response based on message reference chains

```lua
-- Basic usage: wait for reply from target
local serviceId = "process-789" -- Process ID of the target service

local reply = ao.send({
  Target = serviceId,
  Action = "Query",
  Data = { query: "select" }
}).receive() -- Default: waits for reply from the target

-- Advanced usage: specify a different responder
-- See Multi-Process Pipeline pattern for a complete example
```

```
Client (A) → Service (B)
          ←
Process blocks until response
```

## Common Messaging Patterns

These common patterns demonstrate complete solutions to messaging scenarios.

| Pattern                          | Behavior     | Flow                | Key Components                                                      | Use Cases                                                                           |
| -------------------------------- | ------------ | ------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Asynchronous Notification**    | Non-blocking | **_A → B_**         | • `ao.send`<br>• No response expected                               | • System alerts<br>• Event broadcasts<br>• Log messages                             |
| **Synchronous Request-Response** | Blocking     | **_A → B → A_**     | • `ao.send().receive()`<br>• Waits for response                     | • Database queries<br>• API requests<br>• Validated operations                      |
| **Asynchronous Service Handler** | Non-blocking | **_B → A_**         | • `Handlers.add`<br>• `msg.reply`                                   | • Background processing<br>• Compute-intensive tasks<br>• Event handling            |
| **Multi-Process Pipeline**       | Mixed        | **_A → B → C → A_** | • `ao.send().receive()`<br>• `msg.forward`<br>• `X-Origin` tracking | • Data transformation chains<br>• Microservice orchestration<br>• Complex workflows |

### Asynchronous Notification (Non-blocking)

A simple fire-and-forget pattern with no response expected.

```lua
-- Fire-and-forget notification
local notificationServiceId = "notification-process-001" -- Process ID of notification service

ao.send({
  Target = notificationServiceId,
  Action = "Alert",
  Data = "System maintenance in 5 minutes"
})
-- Continues executing immediately
```

### Synchronous Request-Response (Blocking)

A blocking pattern that waits for a response before continuing.

```lua
-- Blocks until response received
local databaseServiceId = "database-process-001" -- Process ID of database service

local response = ao.send({
  Target = databaseServiceId,
  Action = "Query",
  Data = { table = "users", id = 123 }
}).receive()

if not response then
  error("Request failed")
end
```

### Asynchronous Service Handler

A non-blocking handler that processes requests and sends back responses.

```lua
-- Non-blocking handler setup
Handlers.add("async-processor",
  { Action = "Process" },
  function(msg)
    -- Async processing
    local result = heavyComputation()
    msg.reply({
      Data = result,
      Action = "Process-Result"
    })
  end
)
```

### Multi-Process Pipeline

This pattern demonstrates a complete message forwarding chain with three services.

```lua
-- Service chaining through multiple processes
-- This comprehensive example shows how to use msg.forward in a real-world scenario

-- In client process
-- Store process IDs as variables
local middlewareProcessId = "process-123" -- Process ID of the middleware service
local finalProcessId = "process-456"      -- Process ID of the final service

-- Send to middleware and wait for response from final service
local response = ao.send({
  Target = middlewareProcessId,
  Action = "Transform",
  Data = "raw-data"
}).receive(finalProcessId)  -- Explicitly wait for response from final service, not middleware

-- In middleware service
Handlers.add("transform-middleware",
  { Action = "Transform" },
  function(msg)
    -- We have the final service ID stored
    local finalProcessId = "process-456" -- Same ID as defined in the client

    -- Pre-process data then forward to final service
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
    -- Process data and send result directly back to original requester
    -- No need to know the client ID - it's stored in X-Origin
    msg.forward(msg['X-Origin'], {
      Data = msg.Data .. " (final processing complete)",
      Action = "Transform-Complete"
    })
    -- X-Origin contains the original sender's ID, completing the chain
  end
)
```

```
Client (A) → Middleware (B) → Backend (C)
       ↖                            ↙
        X-Origin enables direct reply
```

## Technical Details

### Message Property Propagation

When building multi-process communication flows, special properties ensure proper message routing:

1. `X-Reference`: Unique identifier maintaining message correlation across the entire chain
2. `X-Origin`: Original message sender ID, preserved throughout forwarding
3. `Reply-To`: Optional override for where responses should be directed

These properties work together to enable complex messaging patterns with minimal code:

```
Client (A) → Service (B) → Backend (C)
       ↖                       ↙
         Reply flows directly back
```

### Automatic Data Handling

The messaging system handles various data types automatically:

- Table data is serialized to JSON with proper `Content-Type` headers
- JSON responses are parsed back into Lua tables when received
- Message chains maintain their correlation metadata internally

## Conclusion

Understanding the blocking/non-blocking nature of each pattern is crucial:

- Use non-blocking `ao.send` and `msg.reply` for responsive, parallel processing
- Use blocking `Receive` and `.receive` when synchronous flow is required
- Be cautious with blocking operations as they will wait indefinitely
- Use async patterns for long-running operations to maintain responsiveness

Choose patterns based on your specific needs for synchronous vs. asynchronous execution.

### Quick Reference: Choosing the Right Pattern

| If you need to...                                    | Use this pattern             | Key function(s)                       |
| ---------------------------------------------------- | ---------------------------- | ------------------------------------- |
| Send a message without waiting for a response        | Asynchronous Notification    | `ao.send`                             |
| Send a message and wait for a response               | Synchronous Request-Response | `ao.send().receive()`                 |
| Process messages and respond to the sender           | Asynchronous Service Handler | `Handlers.add` + `msg.reply`          |
| Create a chain of processing services                | Multi-Process Pipeline       | `msg.forward` + `ao.send().receive()` |
| Wait for any matching message regardless of sender   | Event Listener               | `Receive` (capital R)                 |
| Create a standard automated response                 | Auto-Reply                   | `Handlers.utils.reply`                |
| Ensure message correlation across process boundaries | Message Reference Tracking   | Use `X-Reference` and `X-Origin`      |
