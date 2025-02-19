# ao Module

version: 0.0.3

`ao` process communication is handled by messages, each process receives messages in the form of [ANS-104 DataItems](https://specs.arweave.net/view/xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw), and needs to be able to do the following common operations.

- [ao.send(msg)](#ao-send-msg-messageconfig) - send message to another process
- [ao.spawn(module, msg)](#ao-spawn-module-string-spawn-spawnconfig) - spawn a process
- [ao.isTrusted(msg)](#ao-istrusted-msg-messageconfig) - check to see if this message trusted?

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

## Methods

### `ao.send(msg: MessageConfig)`

Takes a [MessageConfig](#messageconfig) as input. The function adds `ao`-specific tags and stores the message in `ao.outbox.Messages`.

#### Example

```lua
local message = ao.send({
    Target = msg.From,
    Data = "ping",
    Tags = {
        { name = "Content-Type", value = "text/plain" },
        { name = "Action", value = "Ping" }
    }
})
```

### `ao.spawn(module: string, spawn: SpawnConfig)`

Takes a module ID string and [SpawnConfig](#spawnconfig) as input. Returns a Spawn table with a generated `Ref_` tag.

#### Example

```lua
local process = ao.spawn("processId", {
    Data = { initial = "state" },
    Tags = {
        name = "Process-Type",
        value = "calculator"
    }
})
```

### `ao.isTrusted(msg: MessageConfig)`

Takes a [MessageConfig](#messageconfig) as input. Returns `true` if the message is from a trusted source.

#### Example

```lua
if ao.isTrusted(msg) then
    -- Process trusted message
else
    -- Handle untrusted message
end
```

### `ao.assign(assignment: AssignmentConfig)`

Takes an [AssignmentConfig](#assignmentconfig) as input. Adds the assignment to `ao.outbox.Assignments`.

#### Example

```lua
ao.assign({
    Processes = {"process-1", "process-2"},
    Message = "sample-message-id"
})
```

### `ao.result(result: ResultConfig)`

Takes a [ResultConfig](#resultconfig) as input. Returns the final process execution result.

#### Example

```lua
local process_result = ao.result({
    Output = "Process completed successfully",
    Messages = {
        { Target = "ProcessY", Data = "Result data", Tags = { {name = "Status", value = "Success"} } }
    },
    Spawns = { "spawned-process-1" },
    Assignments = { {Processes = { "process-1" }, Message = "assignment-message-id"} }
})
```

### `ao.isAssignable(msg: MessageConfig)`

Takes a [MessageConfig](#messageconfig) as input. Returns `true` if the message matches a pattern in `ao.assignables`.

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

### `ao.isAssignment(msg: MessageConfig)`

Takes a [MessageConfig](#messageconfig) as input. Returns `true` if the message is assigned to a different process.

#### Example

```lua
local is_assigned_elsewhere = ao.isAssignment({
    Target = "AnotherProcess"
})
```

## Custom `ao` Table Structures

### MessageConfig

```lua
-- Message configuration table structure
{
    Target = string,     -- Required: Process/wallet address
    Data = any,          -- Required: Message payload
    Tags = {             -- Required: Message tags
        { name = string, value = string }
    }
}
```

### SpawnConfig

```lua
-- Spawn configuration table structure
{
    Data = any,          -- Required: Initial process state
    Tags = {             -- Required: Process tags
        { name = string, value = string }
    }
}
```

### AssignmentConfig

```lua
-- Assignment configuration table structure
{
    Processes = { string }, -- Required: List of target process ID strings
    Message = string       -- Required: Message to assign
}
```

### ResultConfig

```lua
-- Process result configuration table structure
{
    Output = string,           -- Optional: Process output
    Messages = MessageConfig<table>,   -- Optional: Generated messages
    Spawns = SpawnConfig<table>,        -- Optional: Spawned processes
    Assignments = AssignmentConfig<table>,    -- Optional: Process assignments
    Error = string         -- Optional: Error information
}
```
