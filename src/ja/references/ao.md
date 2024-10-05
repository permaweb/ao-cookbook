# ao Module

version: 0.0.3

`ao` process communication is handled by messages, each process receives messages in the form of ANS-104 DataItems, and needs to be able to do the following common operations.

- isTrusted(msg) - check to see if this message trusted?
- send(msg) - send message to another process
- spawn(module, msg) - spawn a process

The goal of this library is to provide this core functionality in the box of the `ao` developer toolkit. As a developer you have the option to leverage this library or not, but it integrated by default.

## Properties

| Name        | Description                                                                                                  | Type   |
| ----------- | ------------------------------------------------------------------------------------------------------------ | ------ |
| id          | Process Identifier (TXID)                                                                                    | string |
| \_module    | Module Identifier (TXID)                                                                                     | string |
| authorities | Set of Trusted TXs                                                                                           | string |
| Authority   | Identifiers that the process is able to accept transactions from that are not the owner or the process (0-n) | string |
| \_version   | The version of the library                                                                                   | string |
| env         | Evaluation Environment                                                                                       | string |
| outbox      | Holds Messages and Spawns for response                                                                       | object |

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
