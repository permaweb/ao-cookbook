# aoモジュール

バージョン: 0.0.3

`ao`プロセスの通信はメッセージによって処理され、各プロセスはANS-104 DataItems形式でメッセージを受信し、以下の一般的な操作を実行できる必要があります。

- isTrusted(msg) - このメッセージが信頼できるかどうかを確認
- send(msg) - 別のプロセスにメッセージを送信
- spawn(module, msg) - プロセスを生成

このライブラリの目的は、`ao`開発者ツールキットの中でこのコア機能を提供することです。開発者として、このライブラリを利用するかどうかは任意ですが、デフォルトで統合されています。

## プロパティ

<!-- # ao Module

version: 0.0.3

`ao` process communication is handled by messages, each process receives messages in the form of ANS-104 DataItems, and needs to be able to do the following common operations.

- isTrusted(msg) - check to see if this message trusted?
- send(msg) - send message to another process
- spawn(module, msg) - spawn a process

The goal of this library is to provide this core functionality in the box of the `ao` developer toolkit. As a developer you have the option to leverage this library or not, but it integrated by default.

## Properties -->

| Name        | Description                                                                                                  | Type   |
| ----------- | ------------------------------------------------------------------------------------------------------------ | ------ |
| id          | Process Identifier (TXID)                                                                                    | string |
| \_module    | Module Identifier (TXID)                                                                                     | string |
| authorities | Set of Trusted TXs                                                                                           | string |
| Authority   | Identifiers that the process is able to accept transactions from that are not the owner or the process (0-n) | string |
| \_version   | The version of the library                                                                                   | string |
| env         | Evaluation Environment                                                                                       | string |
| outbox      | Holds Messages and Spawns for response                                                                       | object |

## メソッド

### send(msg: Message\<table>) : Message\<table>

send関数は、メッセージオブジェクトまたは部分的なメッセージオブジェクトを受け取り、オブジェクトに追加の`ao`特有のタグを追加して完全なメッセージオブジェクトを返します。また、ao.outbox.Messagesテーブルにも挿入されます。

**パラメータ**

- msg

スキーマ

<!-- ## Methods

### send(msg: Message\<table>) : Message\<table>

The send function takes a Message object or partial message object, it adds additional `ao` specific tags to the object and returns a full Message object, as well as insert into the ao.outbox.Messages table.

**parameters**

- msg

Schema -->

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

`spawn`関数は、最初の引数としてモジュールのTXIDと、完全または部分的なSpawnテーブルを受け取ります。結果として、完全なSpawnテーブルが返されます。また、spawn関数は一意の参照識別子を持つ`Ref_`タグも生成します。

**パラメータ**

<!-- ### spawn(module : string, spawn : Spawn\<table>) : Spawn\<table>

The `spawn` function takes a module TXID as the first argument and a full or parital Spawn table. The result will return a full Spawn table. The spawn function will also generate a `Ref_` tag with a unique reference identifier.

**parameters** -->

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

プロセスを生成する際に、0個以上の権限タグを指定できます。aoライブラリは、これらの値を`authorities`と呼ばれる`ao`プロパティのテーブル配列に追加します。このセットは、ao.TN.1の`Proof of Authority`機能を提供します。メッセージが`handle`関数に到着すると、開発者は`ao.isTrusted`を呼び出して、そのメッセージが信頼できるソースからのものであるかを確認できます。

<!-- ### isTrusted(msg : Message\<table>) : boolean

When spawning a process, 0 or more Authority Tags can be supplied, the ao library adds each of these values to a table array on the `ao` properties called `authorities`. This set provides the `Proof of Authority` feature for ao.TN.1. When a message arrives in the `handle` function, the developer can call `ao.isTrusted` to verify if the message is from a trusted source.
 -->

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
