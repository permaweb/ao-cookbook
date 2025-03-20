# Handlers (Version 0.0.5)

## Overview

The Handlers library provides a flexible way to manage and execute a series of process functions based on pattern matching. An AO process responds based on receiving Messages, these messages are defined using the Arweave DataItem specification which consists of Tags, and Data. Using the Handlers library, you can define a pipeline of process evaluation based on the attributes of the AO Message. Each Handler is instantiated with a name, a pattern matching function, and a function to execute on the incoming message. This library is suitable for scenarios where different actions need to be taken based on varying input criteria.

## Concepts

### Handler Arguments Overview

When adding a handler using `Handlers.add()`, you provide three main arguments:

1. `name` (string): The identifier for your handler
2. `pattern` (table or function): Defines how to match incoming messages
3. `handler` (function or resolver table): Defines what to do with matched messages

### Pattern Matching Tables

Pattern Matching Tables provide a declarative way to match incoming messages based on their attributes. This is used as the second argument in `Handlers.add()` to specify which messages your handler should process.

#### Basic Pattern Matching Rules

1. **Simple Tag Matching**

   ```lua
   { "Action" = "Do-Something" }  -- Match messages that have an exact Action tag value
   ```

2. **Wildcard Matching**

   ```lua
   { "Recipient" = '_' }  -- Match messages with any Recipient tag value
   ```

3. **Pattern Matching**

   ```lua
   { "Quantity" = "%d+" }  -- Match using Lua string patterns (similar to regex)
   ```

4. **Function-based Matching**
   ```lua
   { "Quantity" = function(v) return tonumber(v) ~= nil end }  -- Custom validation function
   ```

#### Common Pattern Examples

1. **Balance Action Handler**

   ```lua
   { Action = "Balance" }  -- Match messages with Action = "Balance"
   ```

2. **Numeric Quantity Handler**
   ```lua
   { Quantity = "%d+" }  -- Match messages where Quantity is a number
   ```

### Default Action Handlers (AOS 2.0+)

AOS 2.0 introduces simplified syntax for Action-based handlers. Instead of writing explicit pattern functions, you can use these shorthand forms:

```lua
-- Traditional syntax
Handlers.add("Get-Balance", function (msg) return msg.Action == "Balance", doBalance)

-- Simplified syntax options:
Handlers.add("Balance", "Balance", doBalance)  -- Explicit action matching
Handlers.add("Balance", doBalance)             -- Implicit action matching
```

### Resolvers

Resolvers are special tables that can be used as the third argument in `Handlers.add()` to enable conditional execution of functions based on additional pattern matching. Each key in a resolver table is a pattern matching table, and its corresponding value is a function that executes when that pattern matches.

```lua
Handlers.add("Update",
  {
    [{ Status = "Ready" }] = function (msg) print("Ready") end,
    [{ Status = "Pending" }] = function (msg) print("Pending") end,
    [{ Status = "Failed" }] = function (msg) print("Failed") end
  }
)
```

This structure allows developers to create switch/case-like statements where different functions are triggered based on which pattern matches the incoming message. Resolvers are particularly useful when you need to handle a group of related messages differently based on additional criteria.

## Module Structure

- `Handlers._version`: String representing the version of the Handlers library.
- `Handlers.list`: Table storing the list of registered handlers.

## Common Handler Function Parameters

| Parameter            | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`               | `string`                         | The identifier of the handler item in the handlers list.                                                                                                                                                                                                                                                                                                                                                                |
| `pattern`            | `table` or `function`            | Specifies how to match messages. As a table, defines required message tags with string values (e.g. `{ Action = "Balance", Recipient = "_" }` requires an "Action" tag with string value "Balance" and any string "Recipient" tag value). As a function, takes a message DataItem and returns: "true" (invoke handler and exit pipeline), "false" (skip handler), or "continue" (invoke handler and continue pipeline). |
| `handler`            | (Resolver) `table` or `function` | Either a resolver table containing pattern-function pairs for conditional execution, or a single function that processes the message. When using a resolver table, each key is a pattern matching table and its value is the function to execute when that pattern matches. When using a function, it takes the message DataItem as an argument and executes business logic.                                            |
| `maxRuns` (optional) | number                           | As of 0.0.5, each handler function takes an optional function to define the amount of times the handler should match before it is removed. The default is infinity.                                                                                                                                                                                                                                                     |

## Functions

### `Handlers.add(name, pattern, handler)`

Adds a new handler or updates an existing handler by name

### `Handlers.append(name, pattern, handler)`

Appends a new handler to the end of the handlers list.

### `Handlers.once(name, pattern, handler)`

Only runs once when the pattern is matched. Equivalent to setting `maxRuns = 1`. This is the underlying implementation used by the `Receive` function in the messaging system.

### `Handlers.prepend(name, pattern, handler)`

Prepends a new handler to the beginning of the handlers list.

### `Handlers.before(handleName)`

Returns an object that allows adding a new handler before a specified handler.

### `Handlers.after(handleName)`

Returns an object that allows adding a new handler after a specified handler.

### `Handlers.remove(name)`

Removes a handler from the handlers list by name.

## Handler Execution Notes

### Execution Order

- Handlers are executed in the order they appear in `Handlers.list`.
- When a message arrives, each handler's pattern function is called sequentially to determine if it should process the message.

### Pattern Function Return Values

Pattern functions determine the message handling flow based on their return values:

1. **Skip Handler (No Match)**

   - **Return**: `0`, `false`, or any string except "continue" or "break"
   - **Effect**: Skips current handler and proceeds to the next one in the list

2. **Handle and Continue**

   - **Return**: `1` or `"continue"`
   - **Effect**: Processes the message and continues checking subsequent handlers
   - **Use Case**: Ideal for handlers that should always execute (e.g., logging)

3. **Handle and Stop**
   - **Return**: `-1`, `true`, or `"break"`
   - **Effect**: Processes the message and stops checking further handlers
   - **Use Case**: Most common scenario where a handler exclusively handles its matched message

### Practical Examples

- **Logging Handler**: Place at the start of the list and return `"continue"` to log all messages while allowing other handlers to process them.
- **Specific Message Handler**: Return `"break"` to handle matched messages exclusively and prevent further processing by other handlers.

## Handlers.utils

The `Handlers.utils` module provides two functions that are common matching patterns and one function that is a common handle function.

- `hasMatchingData(data: string)`
- `hasMatchingTag(name: string, value: string)`
- `reply(text: string)`

### `Handlers.utils.hasMatchingData(data: string)`

- This helper function returns a pattern matching function that takes a message as input. The returned function checks if the message's `Data` field contains the specified string. You can use this helper directly as the pattern argument when adding a new handler.

  ```lua
  Handlers.add("ping",
      Handlers.utils.hasMatchingData("ping"),
      ...
  )
  ```

### `Handlers.utils.hasMatchingTag(name: string, value: string)`

- This helper function returns a pattern matching function that takes a message as input. The returned function checks if the message has a tag with the specified `name` and `value`. If they match exactly, the pattern returns true and the handler function will be invoked. This helper can be used directly as the pattern argument when adding a new handler.

  ```lua
  Handlers.add("ping",
      Handlers.utils.hasMatchingTag("Action", "Ping"),
      ...
  )
  ```

### `Handlers.utils.reply(text: string)`

- This helper is a simple handle function, it basically places the text value in to the `Data` property of the outbound message.

  ```lua
  Handlers.add("ping",
      Handlers.utils.hasMatchingData("ping"),
      Handlers.utils.reply("pong")
  )
  ```

## Example Handlers

### Pattern Matching Table

```lua
Handlers.add("Ping",    -- Name of the handler
  { Action = "Ping" },  -- Matches messages with Action = "Ping" tag
  function(msg)         -- Business logic to execute on Message
    print("ping")
    msg.reply({ Data = "pong" })
  end
)
```

### Resolver Table Handler

```lua
Handlers.add("Foobarbaz",  -- Name of the handler
  { Action = "Speak" },    -- Matches messages with Action = "Speak" tag
  {
    -- Resolver with pattern-function pairs
    [{ Status = "foo" }] = function(msg) print("foo") end,
    [{ Status = "bar" }] = function(msg) print("bar") end,
    [{ Status = "baz" }] = function(msg) print("baz") end
  }
)
```

### Function-Based Pattern Matching & Handler

```lua
Handlers.add("Example",    -- Name of the handler
  function(msg)           -- Pattern function matches messages with Action = "Speak" tag
    return msg.Action == "Speak"
  end,
  function(msg)           -- Handler function that executes business logic
    print(msg.Status)
  end
)
```
