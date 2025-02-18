# ao Module

version: 0.0.3

`ao` process communication is handled by messages, each process receives messages in the form of ANS-104 DataItems, and needs to be able to do the following common operations.

- `isTrusted(msg)` - check to see if this message trusted?
- `send(msg)` - send message to another process
- `spawn(module, msg)` - spawn a process
- `isTrusted(msg)` - check to see if this message trusted?
- `send(msg)` - send message to another process
- `spawn(module, msg)` - spawn a process

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

## `ao.send(msg: Message)`

The `ao.send` function transmits messages between processes. It takes a Message object, adds `ao`-specific tags, and returns an enhanced Message object while also storing it in the `ao.outbox.Messages` table.

### Parameters

| Parameter | Type  | Description                 |
| --------- | ----- | --------------------------- |
| `msg`     | table | Message configuration table |

#### Message Table Structure

```lua
{
    Target = "string", -- Process/wallet address
    Data = any,        -- Message payload
    Tags = table       -- Optional message tags
}
```

### Send Schema

The `ao.send` function implements the following JSON schema:

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
      "type": "object or array<name,value>",
      "description": "This property can be an array of name,value objects or an object"
    }
  }
}
```

### Examples

**Using name-value pairs (array style):**

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

**Using object notation (key-value style):**

```lua
local message = ao.send({
    Target = msg.From,
    Data = "ping",
    Tags = {
        ["Content-Type"] = "text/plain",
        ["Action"] = "Ping"
    }
})
```

**Using mixed style (not recommended):**

```lua
local message = ao.send({
    Target = msg.From,
    Data = "ping",
    Tags = {
        ["Content-Type"] = "text/plain",
        { name = "Action", value = "Ping" }
    }
})
```

**Using single tag (array style):**

```lua
local message = ao.send({
    Target = msg.From,
    Data = "ping",
    Tags = { name = "Content-Type", value = "text/plain" }
})
```

> Note: While all these syntaxes are valid, it's recommended to stick to one style consistently throughout your code. The object notation (key-value style) is generally more concise and readable.

### Returns

| Type  | Description                                    |
| ----- | ---------------------------------------------- |
| table | Enhanced message object with standardized tags |

#### Return Object Schema

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
      "type": "array",
      "description": "name/value array",
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

## `ao.spawn(module: string, spawn: SpawnConfig)`

The `ao.spawn` function creates a new process using a module TxID and spawn configuration. It returns a full Spawn table and generates a unique `Ref_` tag.

### Parameters

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `module`  | string | Process module identifier (TxID) |
| `spawn`   | table  | Spawn configuration table        |

#### Spawn Table Structure

```lua
{
    Data = any,        -- Spawn payload
    Tags = table       -- Optional spawn tags
}
```

### Spawn Schema

The `ao.spawn` function implements the following JSON schema:

```json
{
  "type": "object",
  "properties": {
    "Data": {
      "type": "any",
      "description": "data to initialize process with"
    },
    "Data": {
      "type": "any",
      "description": "data to initialize process with"
    },
    "Tags": {
      "type": "object or array<name,value>",
      "description": "This property can be an array of name,value objects or an object"
      "type": "object or array<name,value>",
      "description": "This property can be an array of name,value objects or an object"
    }
  }
}
```

### Example

```lua
local process = ao.spawn("processId", {
    Data = { initial = "state" },
    Tags = {
        name = "Process-Type",
        value = "calculator"
    }
})
```

### Returns

| Type  | Description                           |
| ----- | ------------------------------------- |
| table | Spawn object with generated Ref\_ tag |

#### Return Object Schema

```json
{
  "type": "object",
  "properties": {
    "Data": { "type": "any" },
    "Tags": {
      "type": "array",
      "description": "name/value array",
      "description": "name/value array",
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

## `ao.isTrusted(msg: Message)`

The `ao.isTrusted` function verifies if a message comes from a trusted source based on the process's authorities list.

### Parameters

| Parameter | Type  | Description                    |
| --------- | ----- | ------------------------------ |
| `msg`     | table | Message to verify trust status |

#### Message Table Structure

```lua
{
    Target = "string", -- Process/wallet address
    Data = any,        -- Message payload
    Tags = table       -- Message tags
}
```

### Schema

The `ao.isTrusted` function implements the following JSON schema:

```json
{
  "type": "object",
  "properties": {
    "Target": {
      "type": "string",
      "description": "Process/Wallet address"
    },
    "Data": {
      "type": "any",
      "description": "Message payload"
    },
    "Tags": {
      "type": "array",
      "description": "Message tags as name/value pairs",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "value": { "type": "string" }
        }
      }
    }
  }
  "type": "object",
  "properties": {
    "Target": {
      "type": "string",
      "description": "Process/Wallet address"
    },
    "Data": {
      "type": "any",
      "description": "Message payload"
    },
    "Tags": {
      "type": "array",
      "description": "Message tags as name/value pairs",
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

### Example

```lua
if ao.isTrusted(msg) then
    -- Process trusted message
else
    -- Handle untrusted message
end
```

### Returns

| Type    | Description                              |
| ------- | ---------------------------------------- |
| boolean | True if message is from a trusted source |

## `ao.assign(assignment: Assignment)`

The `ao.assign` function assigns a message to one or more processes by validating and adding it to the `ao.outbox.Assignments` table.

### Parameters

| Parameter    | Type  | Description                    |
| ------------ | ----- | ------------------------------ |
| `assignment` | table | Assignment configuration table |

#### Assignment Table Structure

```lua
{
    Processes = {"string"},  -- List of processes to assign to
    Message = "string"       -- Message content to be assigned
}
```

### Assign Schema

The `ao.assign` function implements the following JSON schema:

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

### Example

```lua
ao.assign({
    Processes = {"process-1", "process-2"},
    Message = "sample-message-id"
})
```

## `ao.result(result: Result)`

The `ao.result` function processes and returns the final outcome of a process execution, including outputs, messages, spawns, and assignments.

### Parameters

| Parameter | Type  | Description            |
| --------- | ----- | ---------------------- |
| `result`  | table | Process result details |

#### Result Table Structure

```lua
{
    Output = any,           -- Main process output
    Messages = table,       -- Generated messages
    Spawns = table,        -- Spawned processes
    Assignments = table,    -- Process assignments
    Error = string         -- Optional error information
}
```

### Result Schema

The `ao.result` function implements the following JSON schema:

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

### Example

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

### Returns

| Type  | Description                                                                    |
| ----- | ------------------------------------------------------------------------------ |
| table | Process result containing Output, Messages, Spawns, and Assignments (or Error) |

## `ao.isAssignable(msg: Message)`

The `ao.isAssignable` function checks if a given message matches any predefined patterns in the `ao.assignables` table.

### Parameters

| Parameter | Type  | Description                        |
| --------- | ----- | ---------------------------------- |
| `msg`     | table | Message to check for assignability |

#### Message Table Structure

```lua
{
    Target = "string",     -- Process/wallet address
    Data = any,            -- Message payload
    Tags = table           -- Message tags
}
```

### Example

```lua
local can_be_assigned = ao.isAssignable({
    Target = "ProcessA",
    Data = "Some content",
    Tags = {
         ["Category"] = "Info"
    }
})
```

### Returns

| Type    | Description                                   |
| ------- | --------------------------------------------- |
| boolean | True if message matches an assignable pattern |

## `ao.isAssignment(msg: Message)`

The `ao.isAssignment` function checks if a given message is an assignment to the current process by verifying if the message's Target differs from the current process ID.

### Parameters

| Parameter | Type  | Description                     |
| --------- | ----- | ------------------------------- |
| `msg`     | table | Message to check for assignment |

#### Message Table Structure

```lua
{
    Target = "string",     -- Process/wallet address
    Data = any,            -- Message payload
    Tags = table           -- Message tags
}
```

### Example

```lua
local is_assigned_elsewhere = ao.isAssignment({
    Target = "AnotherProcess"
})
```

### Returns

| Type    | Description                                        |
| ------- | -------------------------------------------------- |
| boolean | True if message is not targeted to current process |
