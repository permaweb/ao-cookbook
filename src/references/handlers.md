# Handlers (Version 0.0.5)

## Overview

The Handlers library provides a flexible way to manage and execute a series of process functions based on pattern matching. An AO process responds based on receiving Messages, these messages are defined using the Arweave DataItem specification which consists of Tags, and Data. Using the Handlers library, you can define a pipeline of process evaluation based on the attributes of the AO Message. Each handler items consists of a pattern function, a handle function, and a name. This library is suitable for scenarios where different actions need to be taken based on varying input criteria.

## Concepts

### Pattern Matching Tables

Pattern Matching Tables is a concept of providing a Table representation of the matching shape of the incoming message. Here are the rules:

```lua

{ "Action" = "Do-Something" } -- Match any message via a table of tags it must contain

{ "Recipient" = '_' } -- Match messages that have a recipient tag with any value..

{ "Quantity" = "%d+" } -- Validate a tag against a Lua string match (similar to regular expressions)

{ "Quantity" = function(v) return tonumber(v) ~= Nil end } -- Apply a function to the tag to check it. Nil or false do not match
```

Example:

if you want to match on every message with the Action equal to "Balance"

```lua
{ Action = "Balance" }
```

if you want to match on every message with the Quantity being a Number

```lua
{ Quantity = "%d+" }
```

### Resolvers

Resolvers are tables in which each key is a pattern matching table and the value is a function that is executed based on the matching key. This allows developers to create case like statements in the resolver property.

```lua
Handlers.add("foobarbaz",
  { Action = "Update" }, {
  [{ Status = "foo" }] = function (msg) print("foo") end,
  [{ Status = "bar" }] = function (msg) print("bar") end,
  [{ Status = "baz" }] = function (msg) print("baz") end
})
```

## Module Structure

- `Handlers._version`: String representing the version of the Handlers library.
- `Handlers.list`: Table storing the list of registered handlers.

## Handler method common function signature

| Parameter          | Type                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name               | string                       | The identifier of the handler item in the handlers list.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| pattern            | Table or Function            | This parameter can take a table that specifies a pattern that the message MUST match, for example `{ Action = "Balance", Recipient = "_" }` this table describes a message that has a Tag called action and it equals the string "Balance", and the message MUST have a Recipient Tag with a value. If you are unable to add a pattern via a table, you can also use the `function` which receives the message DataItem as its argument and you can return a `true`, `false` or `"continue"` result. The `true` result tells the Handlers evaluation pipeline to invoke this handler and exit out of the pipeline. The `false` result tells the Handlers evaluation pipeline to skip this handler and try to find a pattern matched by the next Handler item in the pipeline. Finally, the `"continue"` informs the Handlers evaluation to invoke this handler and continue evaluating. |
| handler            | Table (Resolver) or Function | This parameter can take a table that acts as a conditional that invokes a function based on a pattern matched key. or a Function that takes the message DataItem as an argument and performs some business logic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| maxRuns (optional) | number                       | As of 0.0.5, each handler function takes an optional function to define the amount of times the handler should match before it is removed. The default is infinity.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

## Functions

### `Handlers.add(name, pattern, handler)`

adds a new handler or updates an existing handler by name

### `Handlers.append(name, pattern, handle)`

Appends a new handler to the end of the handlers list.

### `Handlers.once(name, pattern, handler)`

Only runs once when the pattern is matched.

### `Handlers.prepend(name, pattern, handle)`

Prepends a new handler to the beginning of the handlers list.

### `Handlers.before(handleName)`

Returns an object that allows adding a new handler before a specified handler.

### `Handlers.after(handleName)`

Returns an object that allows adding a new handler after a specified handler.

### `Handlers.remove(name)`

Removes a handler from the handlers list by name.

## Examples

### Using pattern Table

```lua
Handlers.add("ping",
  { Action = "ping" },
  function (msg)
    print('ping')
    msg.reply({Data = "pong" })
  end
)
```

### Using resolvers

```lua
Handlers.add(
  "foobarbaz",
  { Action = "Speak" }, {
  [{Status = "foo"}] = function (msg) print("foo") end,
  [{Status = "bar"}] = function (msg) print("bar") end,
  [{Status = "baz"}] = function (msg) print("baz") end
})
```

### Using functions

```lua
Handlers.add("example",
  function (msg)
    return msg.Action == "Speak"
  end,
  function (msg)
    print(msg.Status)
  end
)
```

## Notes

- Handlers are executed in the order they appear in `handlers.list`.
- The pattern function should return false to skip the handler, true to break after the handler is executed, or `"continue"` to execute handler and continue with the next handler.

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
