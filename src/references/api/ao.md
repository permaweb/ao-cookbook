# ao Module

version: 0.0.3

`ao` process communication is handled by messages, each process receives messages in the form of [ANS-104 DataItems](https://specs.arweave.net/view/xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw), and needs to be able to do the following common operations.

- [ao.send(msg)](#ao-send-msg-message) - send message to another process
- [ao.spawn(module, msg)](#ao-spawn-module-string-spawn-spawn) - spawn a process

The goal of this library is to provide this core functionality in the box of the `ao` developer toolkit. As a developer you have the option to leverage this library or not, but it integrated by default.

## Properties

| Name               | Description                                                                                                  | Type     |
| ------------------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| id                 | Process Identifier (TxID)                                                                                    | string   |
| \_module           | Module Identifier (TxID)                                                                                     | string   |
| authorities        | Set of Trusted TXs                                                                                           | string   |
| Authority          | Identifiers that the process is able to accept transactions from that are not the owner or the process (0-n) | string   |
| \_version          | The version of the library                                                                                   | string   |
| reference          | Reference number of the process                                                                              | number   |
| env                | Evaluation Environment                                                                                       | object   |
| outbox             | Holds Messages and Spawns for response                                                                       | object   |
| assignables        | List of assignables of the process                                                                           | list     |
| nonExtractableTags | List of non-extractable tags of the process                                                                  | list     |
| nonForwardableTags | List of non-forwardable tags of the process                                                                  | list     |
| init               | Initializes the AO environment                                                                               | function |
| send               | Sends a message to a target process                                                                          | function |
| assign             | Assigns a message to the process                                                                             | function |
| spawn              | Spawns a process                                                                                             | function |
| result             | Returns the result of a message                                                                              | function |
| isTrusted          | Checks if a message is trusted                                                                               | function |
| isAssignment       | Checks if a message is an assignment                                                                         | function |
| isAssignable       | Checks if a message is assignable                                                                            | function |
| addAssignable      | Adds an assignable to the assignables list                                                                   | function |
| removeAssignable   | Removes an assignable from the assignables list                                                              | function |
| clearOutbox        | Clears the outbox                                                                                            | function |
| normalize          | Normalizes a message by extracting tags                                                                      | function |
| sanitize           | Sanitizes a message by removing non-forwardable tags                                                         | function |
| clone              | Clones a table recursively                                                                                   | function |

### Environment Schema

The `ao.env` variable contains information about the initializing message of the process. It follows this schema:

```lua
ao.env = {
  Process = {
    Id = string,      -- Process ID
    Owner = string,   -- Process owner
    TagArray = {      -- Array of name-value pairs
      { name = string, value = string }
    },
    Tags = {          -- Tags as key-value pairs
      [string] = string
    }
  }
}
```

#### Example

```lua
{
  Process = {
    Id = "A1b2C3d4E5f6G7h8I9j0K1L2M3N4O5P6Q7R8S9T0",
    Owner = "Xy9PqW3vR5sT8uB1nM6dK0gF2hL4jC7iE9rV3wX5",
    TagArray = {
      { name = "App-Name", value = "aos" }
    },
    Tags = {
      ["App-Name"] = "aos"
    }
  }
}
```

## Methods

### `ao.send(msg: Message)`

Takes a [Message](#message) as input. The function adds `ao`-specific tags and stores the message in `ao.outbox.Messages`.

#### Example

```lua
local message = ao.send({
    Target = msg.From,
    Data = "ping",
    Tags = {
        ["Content-Type"] = "text/plain",
        ["Action"] = "Ping"
    }
})

-- or

local message = ao.send({
    Target = msg.From,
    Data = "ping",
    Action = "Ping",               -- will be converted to Tags
    ["Content-Type"] = "text/plain"  -- will be converted to Tags
})
```

### `ao.spawn(module: string, spawn: Spawn)`

Takes a module ID string and [Spawn](#spawn) as input. Returns a Spawn table with a generated `Ref_` tag.

#### Example

```lua
local process = ao.spawn("processId", {
    Data = { initial = "state" },
    Tags = {
        ["Process-Type"] = "calculator"
    }
})
```

### `ao.assign(assignment: Assignment)`

Takes an [Assignment](#assignment) as input. Adds the assignment to `ao.outbox.Assignments`.

#### Example

```lua
ao.assign({
    Processes = {"process-1", "process-2"},
    Message = "sample-message-id"
})
```

### `ao.result(result: Result)`

Takes a [Result](#result) as input. Returns the final process execution result.

#### Example

```lua
local process_result = ao.result({
    Output = "Process completed successfully",
    Messages = {
        { Target = "ProcessY", Data = "Result data", Tags = { ["Status"] = "Success" } }
    },
    Spawns = { "spawned-process-1" },
    Assignments = { {Processes = { "process-1" }, Message = "assignment-message-id"} }
})
```

### `ao.isAssignable(msg: Message)`

Takes a [Message](#message) as input. Returns `true` if the message matches a pattern in `ao.assignables`.

#### Example

```lua
local can_be_assigned = ao.isAssignable({
    Target = "ProcessA",
    Data = "Some content",
    Tags = {
         ["Category"] = "Info"
    }
})
```

### `ao.isAssignment(msg: Message)`

Takes a [Message](#message) as input. Returns `true` if the message is assigned to a different process.

#### Example

```lua
local is_assigned_elsewhere = ao.isAssignment({
    Target = "AnotherProcess"
})
```

### `ao.addAssignable(name: string, condition: function)`

Adds a named condition function to the process's list of assignables. Messages matching any condition will be accepted when assigned.

> **Note:** The `condition` parameter uses a similar pattern matching approach as the `pattern` parameter in `Handlers.add()`. For more advanced pattern matching techniques, see the [Handlers Pattern Matching documentation](./handlers.md#pattern-matching-tables).

#### Example

```lua
-- Allow transactions from ArDrive
ao.addAssignable("allowArDrive", function (msg)
    return msg.Tags["App-Name"] == "ArDrive-App"
end)

-- Allow transactions with specific content type
ao.addAssignable("allowJson", function (msg)
    return msg.Tags["Content-Type"] == "application/json"
end)
```

### `ao.removeAssignable(name: string)`

Removes a previously added assignable condition from the process's list of assignables.

#### Example

```lua
ao.removeAssignable("allowArDrive")
```

### `ao.isTrusted(msg: Message)`

Takes a [Message](#message) as input. Returns `true` if the message is from a trusted source.

#### Example

```lua
if ao.isTrusted(msg) then
    -- Process trusted message
else
    -- Handle untrusted message
end
```

## Custom `ao` Table Structures

### Tags

Used by: `ao.send()`, `ao.spawn()`, `ao.normalize()`, `ao.sanitize()`

All of the below syntaxes are valid, but each syntax gets converted to `{ name = string, value = string }` tables behind the scenes. We use **alternative 1** throughout the documentation for brevity and consistency.

```lua
-- Default: Array of name-value pair tables
Tags = {
    { name = "Content-Type", value = "text/plain" },
    { name = "Action", value = "Ping" }
}

-- Alternative 1: Direct key-value pairs in Tags table using string keys
Tags = {
    ["Content-Type"] = "text/plain",
    ["Action"] = "Ping"
}

-- Alternative 2: Direct key-value pairs in Tags table using dot notation
Tags = {
    Category = "Info",
    Action = "Ping"
}
```

::: info Root-level Tag Conversion
Any keys in the root message object that are not one of: `Target`, `Data`, `Anchor`, `Tags`, or `From` will automatically be converted into Tags using the key as the tag name and its value as the tag value.

```lua
-- These root-level keys will be automatically converted to Tags
{
    Target = "process-id",
    Data = "Hello",
    ["Content-Type"] = "text/plain",  -- Will become a Tag
    Action = "Ping"                   -- Will become a Tag
}
```

:::

### Message

Used by: `ao.send()`, `ao.isTrusted()`, `ao.isAssignment()`, `ao.isAssignable()`, `ao.normalize()`, `ao.sanitize()`

```lua
-- Message structure
{
    Target = string,     -- Required: Process/wallet address
    Data = any,          -- Required: Message payload
    Tags = Tag<table>
}
```

### Spawn

Used by: `ao.spawn()`

```lua
-- Spawn structure
{
    Data = any,          -- Required: Initial process state
    Tags = Tag<table>    -- Required: Process tags
}
```

### Assignment

Used by: `ao.assign()`, `ao.result()`

```lua
-- Assignment configuration table structure
{
    Processes = { string }, -- Required: List of target process ID strings
    Message = string       -- Required: Message to assign
}
```

### Result

Used by: `ao.result()`

```lua
-- Process result structure
{
    Output = string,           -- Optional: Process output
    Messages = Message<table>,   -- Optional: Generated messages
    Spawns = Spawn<table>,        -- Optional: Spawned processes
    Assignments = Assignment<table>,    -- Optional: Process assignments
    Error = string         -- Optional: Error information
}
```
