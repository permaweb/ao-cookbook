# ao 模块

版本: 0.0.3

`ao` 进程通信通过消息进行处理，每个进程用 ANS-104 DataItems 的格式接收消息，并且需要能够执行以下常见操作。

- isTrusted(msg) - 检查消息是否可信
- send(msg) - 将消息发给另一个进程
- spawn(module, msg) - 创建一个进程

这个 library 为 `ao` 开发者工具包提供了这些核心功能。开发者可以按需使用这个 library，但它是默认集成在开发者工具包里的。

## 属性

| 名称        | 描述                             | 类型   |
| ----------- | -------------------------------- | ------ |
| id          | 进程标识符 (TXID)                | string |
| \_module    | 模块标识符 (TXID)                | string |
| authorities | 可信任的交易集合                 | string |
| \_version   | library 的版本                   | string |
| env         | 交易评估环境                     | string |
| outbox      | 传出消息和生成新进程请求的发件箱 | object |

## 方法

### send(msg: Message\<table>) : Message\<table>

send 方法接收一个完整的 Message 对象，或者包含部分属性的 Message 对象作为参数。它会在这个对象上另外添加特定的 `ao` 标签，并返回一个完整的消息对象，同时将它插入到 ao.outbox.Messages 的表中。

**传入参数**

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

例子 1

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

例子 2

```lua
local message = ao.send({
    Target = msg.From,
    Data = "ping",
    Tags = {
        "Content-Type" = "text/plain"
    }
})
```

**返回值**

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

`spawn` 方法接收一个 TXID 模块作为第一个参数，以及一个完整的 Spawn 表，或者包含部分属性的 Spawn 表作为第二个参数。结果将返回一个完整的 Spawn 表。spawn 方法还会生成一个带有唯一引用标识符的 `Ref_` 标签。

**传入参数**

| 名称   | 描述                                              | 类型   |
| ------ | ------------------------------------------------- | ------ |
| module | TXID 是一个模块二进制文件的标识符，用于实例化进程 | string |
| spawn  | 包含完整或部分 `Data` 和 `Tags` 属性的 `spawn` 表 | table  |

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

**返回值**

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

在生成进程时，可以提供 0 个或多个 Authority 标签，ao library 会将这些值添加到 `ao` 属性中名为 `authorities` 的 table 数组中。这个数组为 ao.TN.1 提供了“权威证明”（Proof of Authority）功能。当消息到达 `handle` 方法时，开发者可以调用 `ao.isTrusted` 来验证消息是否来自可信来源。

**传入参数**

| 名称 | 描述                               | 类型  |
| ---- | ---------------------------------- | ----- |
| msg  | 用于检测这个进程是否可信的 Message | table |

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
