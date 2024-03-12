# Handlers (Version 0.0.3)

## Overview

The Handlers library provides a flexible way to manage and execute a series of handlers based on patterns. Each handler consists of a pattern function, a handle function, and a name. This library is suitable for scenarios where different actions need to be taken based on varying input criteria.

## Module Structure

- `Handlers._version`: String representing the version of the Handlers library.
- `Handlers.list`: Table storing the list of registered handlers.

## Functions

### `Handlers.add(name, pattern, handler)`

adds a new handler or updates an existing handler by name

### `Handlers.append(name, pattern, handle)`

Appends a new handler to the end of the handlers list.

#### Parameters

- `pattern` (function): Function that determines if the handler should be executed.
- `handle` (function): The handler function to execute.
- `name` (string): A unique name for the handler.

### `Handlers.prepend(name, pattern, handle)`

Prepends a new handler to the beginning of the handlers list.

#### Parameters

- Same as `handlers.append`.

### `Handlers.before(handleName)`

Returns an object that allows adding a new handler before a specified handler.

#### Parameters

- `handleName` (string): The name of the handler before which the new handler will be added.

#### Returns

- An object with an `add` method to insert the new handler.

### `Handlers.after(handleName)`

Returns an object that allows adding a new handler after a specified handler.

#### Parameters

- `handleName` (string): The name of the handler after which the new handler will be added.

#### Returns

- An object with an `add` method to insert the new handler.

### `Handlers.remove(name)`

Removes a handler from the handlers list by name.

#### Parameters

- `name` (string): The name of the handler to be removed.

### `Handlers.evaluate(msg, env)`

Evaluates each handler against a given message and environment. Handlers are called in the order they appear in the handlers list.

#### Parameters

- `msg` (table): The message to be processed by the handlers.
- `env` (table): The environment in which the handlers are executed.

#### Returns

- `response` (varies): The response from the handler(s). Returns a default message if no handler matches.

## Usage Example

```lua
-- Define pattern and handle functions
local function myPattern(msg)
    -- Determine if the handler should be executed
end

local function myHandle(msg, env, response)
    -- Handler logic
end

-- Add a new handler
Handlers.add("myHandler", myPattern, myHandle)

-- Evaluate a message
local response = handlers.evaluate({ key = "value" }, { envKey = "envValue" })
```

## Notes

- Handlers are executed in the order they appear in `handlers.list`.
- The pattern function should return `0` to skip the handler, `-1` to break after the handler is executed, or `1` to continue with the next handler.
- The `evaluate` function can concatenate responses from multiple handlers.

## Handlers.utils

The Handlers.utils module provides two functions that are common matching patterns and one function that is a common handle function.

- hasMatchingData(data)
- hasMatchingTag(name, value)
- reply(txt)

### Handlers.utils.hasMatchingData(data : string)

This helper returns a function that requires a message argument, so you can drop this into the pattern argument of any handler. The function compares the data on the incoming message with the string provided as an argument.

```lua
Handlers.add("ping",
    Handlers.utils.hasMatchingData("ping"),
    ...
)
```

If a message comes into the process with data set to ping, this handler will match on it and invoke the handle function.

### Handlers.hasMatchingTag(name : string, value : string)

This helper returns a function that requires a message argument, so you can drop this into any pattern argument on the Handlers module. The function compares the Tag Name and Value, if they are equal then it invokes the handle function.

```lua
Handlers.add("ping",
    Handlers.utils.hasMatchingData("ping"),
    ...
)
```

### Handlers.reply(text : string)

This helper is a simple handle function, it basically places the text value in to the Data property of the outbound message.

```lua
Handlers.add("ping",
    Handlers.utils.hasMatchingData("ping"),
    Handlers.utils.reply("pong")
)
```
