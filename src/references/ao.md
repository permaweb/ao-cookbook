# ao Module

version: 0.0.3

`ao` process communication is handled by messages, each process receives messages in the form of ANS-104 DataItems, and needs to be able to do the following common operations.

- isTrusted(msg) - check to see if this message trusted?
- send(msg) - send message to another process
- spawn(module, msg) - spawn a process

The goal of this library is to provide this core functionality in the box of the `ao` developer toolkit. As a developer you have the option to leverage this library or not, but it integrated by default.

## Properties

| Name               | Description                                                                                                  | Type     |
| ------------------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| id                 | Process Identifier (TXID)                                                                                    | string   |
| \_module           | Module Identifier (TXID)                                                                                     | string   |
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

### send(msg: Message\<table>) : Message\<table>

The send function takes a Message object or partial message object, it adds additional `ao` specific tags to the object and returns a full Message object, as well as insert into the ao.outbox.Messages table.

**parameters**

- msg

Schema

```json
{
    "type": "object",
    "properties": {
        "Target": {
            "type": "string",
            "description": "Process/Wallet to send message to"
        },
        "Data": {
            "type": "any",
            "description": "data to send in message DataItem"
        },
        "Tags": {
            "type": "object or array<name,value>"
            "description": "This property can be an array of name,value objects or an object"
        }
    }
}
```

Example 1

```lua
local message = ao.send({
    Target = msg.From,
    Data = "ping",
    Tags = {
        {
            name = "Content-Type",
            value = "text/plain"
        }
    }
})
```

Example 2

```lua
local message = ao.send({
    Target = msg.From,
    Data = "ping",
    Tags = {
        "Content-Type" = "text/plain"
    }
})
```

**returns**

Schema

```json
{
    "type": "object",
    "properties": {
        "Target": {
            "type": "string"
        },
        "Data": {
            "type": "any"
        },
        "Tags": {
            "type": "array"
            "description": "name/value array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "value":{"type":"string"}
                }
            }
        }
    }
}
```

### spawn(module : string, spawn : Spawn\<table>) : Spawn\<table>

The `spawn` function takes a module TXID as the first argument and a full or parital Spawn table. The result will return a full Spawn table. The spawn function will also generate a `Ref_` tag with a unique reference identifier.

**parameters**

| Name   | Description                                                                             | Type   |
| ------ | --------------------------------------------------------------------------------------- | ------ |
| module | The TXID that identifies the module binary to use to instaniate the process with        | string |
| spawn  | The `spawn` full or parital table object that contains the `Data` and `Tags` properties | table  |

Schema

module

```json
{
  "type": "string"
}
```

spawn

```json
{
  "type": "object",
  "properties": {
    "Data": { "type": "any" },
    "Tags": {
      "type": "object or array",
      "description": "can be either <name,value> array, or object"
    }
  }
}
```

**returns**

Schema

```json
{
  "type": "object",
  "properties": {
    "Data": { "type": "any" },
    "Tags": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "value": { "type": "string" }
        }
      }
    }
  }
}
```

### assign(assignment: Assignment\<table>): void

The `assign` function assigns a message to one or more processes by taking an assignment object, validating its structure, and then adding it to the `ao.outbox.Assignments` table.

**parameters**

- `assignment` (table): The assignment to be made.

**Schema**

```json
{
  "type": "object",
  "properties": {
    "Processes": {
      "type": "array",
      "description": "List of processes to assign the message to",
      "items": {
        "type": "string"
      }
    },
    "Message": {
      "type": "string",
      "description": "The message content to be assigned"
    }
  }
}
```

**Example**

```lua
ao.assign({
    Processes = {"process-1", "process-2"},
    Message = "sample-message-id"
})
```

### result(result: Result\<table>) : Result\<table>

The `result` function returns the final outcome of a process, including outputs, messages, spawns, and assignments. If an error is encountered in the process, only the error information is returned to the caller.

**parameters**

- `result` (table): The process result details, which may include output data or error information.

**Schema**

```json
{
  "type": "object",
  "properties": {
    "Output": {
      "type": "any",
      "description": "The main output of the process, if available"
    },
    "Messages": {
      "type": "array",
      "description": "Messages generated by the process"
    },
    "Spawns": {
      "type": "array",
      "description": "Spawned processes"
    },
    "Assignments": {
      "type": "array",
      "description": "Assignments"
    },
    "Error": {
      "type": "string",
      "description": "Error message if an error occurred"
    }
  }
}
```

**Example**

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

**returns**

- `table`: Returns a table containing the process `Output`, `Messages`, `Spawns`, and `Assignments` if successful, or an `Error` if an error occurred.

### isTrusted(msg : Message\<table>) : boolean

When spawning a process, 0 or more Authority Tags can be supplied, the ao library adds each of these values to a table array on the `ao` properties called `authorities`. This set provides the `Proof of Authority` feature for ao.TN.1. When a message arrives in the `handle` function, the developer can call `ao.isTrusted` to verify if the message is from a trusted source.

**parameters**

| Name | Description                                 | Type  |
| ---- | ------------------------------------------- | ----- |
| msg  | Message to check if trusted by this process | table |

Schema

```json
{
    "type": "object",
    "properties": {
        "Target": {
            "type": "string"
        },
        "Data": {
            "type": "any"
        },
        "Tags": {
            "type": "array"
            "description": "name/value array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "value":{"type":"string"}
                }
            }
        }
    }
}
```

### isAssignment(msg: Message\<table>) : boolean

The `isAssignment` function checks if a given message is an assignment to the current process. It returns `true` if the message's `Target` does not match the current process `ao.id`, indicating that the message is assigned to a different process.

**parameters**

| Name | Description                                        | Type  |
| ---- | -------------------------------------------------- | ----- |
| msg  | Message to check if it is assigned to this process | table |

**Example**

```lua
local is_assigned_elsewhere = ao.isAssignment({
    Target = "AnotherProcess"
})
```

**returns**

- `boolean`: Returns `true` if the message is not targeted to the current process (`ao.id`), otherwise `false`.

### isAssignable(msg: Message\<table>) : boolean

The `isAssignable` function checks if a given message matches any predefined patterns in the `ao.assignables` table, indicating whether it can be assigned to the current process. Each entry in `ao.assignables` includes a pattern, and the function uses `utils.matchesSpec` to determine if the message matches any of these patterns.

**parameters**

| Name | Description                                        | Type  |
| ---- | -------------------------------------------------- | ----- |
| msg  | Message to check if it matches assignable patterns | table |

**Example**

```lua
local can_be_assigned = ao.isAssignable({
    Target = "ProcessA",
    Data = "Some content",
    Tags = {
        { name = "Category", value = "Info" }
    }
})
```

**returns**

- `boolean`: Returns `true` if the message matches an assignable pattern in `ao.assignables`; otherwise, `false`. If `ao.assignables` is empty, all messages are considered non-assignable by default.
