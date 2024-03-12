# ao

内置全局库，用于发送消息、生成进程等。

### 示例用法

全局对象`ao`在您的进程中的任何地方都可以访问：
```lua
-- sends a message to another process ("Transfer" action)
ao.send({
  Target = "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A",
  Action = "Transfer",
  Recipient = "XjvCPN31XCLPkBo9bUeB7vAK0VC6-eY52-CS-6Iho8F",
  Quantity = tostring(1045)
})
```

## 模块变量

- `ao.id`: `{string}` 保存您进程中的 Arweave ID
- `ao.authorities`: `{table}` 可选信任的调用者数组 
- `ao._module`: `{string}` 每次调用都会执行进程的 WASM 基础模块。
- `ao._ref`: `{number}`  一个调用实例中发送的消息计数器。
- `ao._version`: `{string}` ao 全局库版本。
- `ao.env`: `{table}` 初始化消息中的进程环境。
### `ao.env`

全局变量`ao.env`保存了有关进程初始化消息的信息。它遵循以下结构:

```json
{
  "type": "object",
  "properties": {
    "Process": {
      "type": "object",
      "properties": {
        "Id": {
          "type": "string",
          "example": "A1b2C3d4E5f6G7h8I9j0K1L2M3N4O5P6Q7R8S9T0"
        },
        "Owner": {
          "type": "string",
          "example": "Xy9PqW3vR5sT8uB1nM6dK0gF2hL4jC7iE9rV3wX5"
        },
        "TagArray": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "example": "App-Name"
              },
              "value": {
                "type": "string",
                "example": "aos"
              }
            }
          },
          "example": [{ "name": "App-Name", "value": "aos" }]
        },
        "Tags": {
          "type": "object",
          "propertyNames": {
            "type": "string"
          },
          "patternProperties": {
            "": {
              "type": "string"
            }
          },
          "example": {
            "App-Name": "aos"
          }
        }
      }
    }
  }
}
```

## 模块函数

### `log()`

此功能将提供的值或消息附加到 `Results.Output` 表格中。该表格稍后可以使用 [`aoconnect`](/guides/aoconnect/aoconnect.html) 库进行读取。这对于调试和向调用者返回输出值都很有用。
- **Parameters:**
  - `txt`: `{any}` 用于输出的数值/内容
- **Returns:** `{void}`

#### Examples

```lua
...
ao.log("Breakpoint reached")
...
ao.log({
  Message = "Transferred " .. quantity .. " tokens to " .. target,
  Quantity = quantity,
  Recipient = target
})
```

### `send()`

根据 AO 规范，将指定的消息内容连同消息标签一起放入目标进程的输出队列，从而向另一个进程发送消息。
- **Parameters:**
  - `msg`: `{table}` 待发送的消息
- **Returns:** 已发送的消息，包含已应用的标签和`DataItem`字段。

> **Note:** Each field of the `msg` table will be appended as a `DataItem` tag, except the following: `"Target"`, `"Data"`, `"Anchor"`, `"Tags"`. These fields are interpreted as root level `DataItem` fields.
`msg` 表的每个字段都会作为 `DataItem` 标签附加，但以下字段除外：`"Target"`, `"Data"`, `"Anchor"`, `"Tags"`，因为这些字段将直接作为根级别的`DataItem`字段使用。
#### Example

```lua
-- sends a message to "XjvCPN31XCLPkBo9bUeB7vAK0VC6-eY52-CS-6Iho8F"
-- with the tag { "name": "Action", "value": "Ping" }
ao.send({
  Target = "XjvCPN31XCLPkBo9bUeB7vAK0VC6-eY52-CS-6Iho8F",
  Action = "Ping"
})
```

### `spawn()`

支持进程间创建新进程。

- **Parameters:**
  - `module`: `{string}` 新进程使用的模块的 Arweave 交易 ID
  - `msg`: `{table}` 初始化进程的消息，格式[如上所述] (#send)
- **Returns:** 初始化消息项

#### Example

```lua
ao.spawn("n0BFH80b73mi9VAWUzyuG9gEC3LI2zU2BFxum0N8A9s", {
  ["Custom-Tag"]: "Custom-Value"
})
```
