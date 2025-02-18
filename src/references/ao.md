# ao Module

version: 0.0.3

`ao` process communication is handled by messages, each process receives messages in the form of ANS-104 DataItems, and needs to be able to do the following common operations.

- `isTrusted(msg)` - check to see if this message trusted?
- `send(msg)` - send message to another process
- `spawn(module, msg)` - spawn a process

The goal of this library is to provide this core functionality in the box of the `ao` developer toolkit. As a developer you have the option to leverage this library or not, but it integrated by default.

## Properties

| Name        | Description                                                                                                  | Type   |
| ----------- | ------------------------------------------------------------------------------------------------------------ | ------ |
| id          | Process Identifier (TxID)                                                                                    | string |
| \_module    | Module Identifier (TxID)                                                                                     | string |
| authorities | Set of Trusted TXs                                                                                           | string |
| Authority   | Identifiers that the process is able to accept transactions from that are not the owner or the process (0-n) | string |
| \_version   | The version of the library                                                                                   | string |
| env         | Evaluation Environment                                                                                       | string |
| outbox      | Holds Messages and Spawns for response                                                                       | object |

## Methods

### `ao.send(msg)`

The send function takes a Message object or partial message object, it adds additional `ao` specific tags to the object and returns a full Message object, as well as insert into the ao.outbox.Messages table.

**Parameters:**

- `msg` - Lua table containing:
  ```lua
  {
    Target = "string", -- Process/wallet address
    Data = any,        -- Message payload
    Tags = table       -- Optional message tags
  }
  ```

**Send Schema:**

- `ao.send` implements the following JSON schema:

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

**Example 1:**

```lua
local message = ao.send({
    Target = msg.From,
    Data = "ping",
    Tags = {
        name = "Content-Type",
        value = "text/plain"
    }
})
```

**Example 2:**

```lua
local message = ao.send({
    Target = msg.From,
    Data = "ping",
    Tags = {
        ["Content-Type"] = "text/plain"
    }
})
```

**Returns:**

- The returned message object follows this JSON schema:

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

### `ao.spawn(module, spawn)`

The spawn function takes a module TxID and a spawn configuration to create a new process. It returns a full Spawn table and generates a unique `Ref_` tag.

**Parameters:**

- `module` - Process module identifier (TxID)
- `spawn` - Lua table containing:
  ```lua
  {
    Data = any,        -- Spawn payload
    Tags = table       -- Optional spawn tags
  }
  ```

**Spawn Schema:**

- `ao.spawn` implements the following JSON schema:

```json
{
  "type": "object",
  "properties": {
    "Data": {
      "type": "any",
      "description": "data to initialize process with"
    },
    "Tags": {
      "type": "object or array<name,value>",
      "description": "This property can be an array of name,value objects or an object"
    }
  }
}
```

**Example:**

```lua
local process = ao.spawn("processId", {
    Data = { initial = "state" },
    Tags = {
        name = "Process-Type",
        value = "calculator"
    }
})
```

**Returns:**

- The returned spawn object follows this JSON schema:

```json
{
  "type": "object",
  "properties": {
    "Data": { "type": "any" },
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

### `ao.isTrusted(msg)`

Verifies if a message comes from a trusted source based on the process's authorities list.

**Parameters:**

- `msg` - Message table to verify, containing:
  ```lua
  {
    Target = "string", -- Process/wallet address
    Data = any,        -- Message payload
    Tags = table       -- Message tags
  }
  ```

**isTrusted Schema:**

- `ao.isTrusted` implements the following JSON schema:

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
}
```

**Example:**

```lua
if ao.isTrusted(msg) then
    -- Process trusted message
else
    -- Handle untrusted message
end
```

**Returns:**

- `boolean` - True if the message is from a trusted source, false otherwise
