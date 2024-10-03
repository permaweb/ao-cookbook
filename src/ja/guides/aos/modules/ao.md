# ao

Built in global library for sending messages, spawning processes, etc.

### Example usage

The global `ao` object is accessible anywhere in your process:

```lua
-- sends a message to another process ("Transfer" action)
ao.send({
  Target = "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A",
  Action = "Transfer",
  Recipient = "XjvCPN31XCLPkBo9bUeB7vAK0VC6-eY52-CS-6Iho8F",
  Quantity = tostring(1045)
})
```

## Module variables

- `ao.id`: `{string}` Holds the Arweave ID of your process
- `ao.authorities`: `{table}` An array of optionally trusted callers
- `ao._module`: `{string}` The WASM base module of the process that is executed on each call
- `ao._ref`: `{number}` The counter of the messages sent out in one call instance
- `ao._version`: `{string}` The ao global library version
- `ao.env`: `{table}` The process environment from the initializing message

### `ao.env`

The `ao.env` global variable holds informationg about the initializing message of the process. It follows the schema below:

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

## Module functions

### `log()`

Appends the provided value/message to the `Results.Output` table which can later be read using the [`aoconnect`](/guides/aoconnect/aoconnect.html) library. Useful for debugging as well as returning an output value to a caller.

- **Parameters:**
  - `txt`: `{any}` The value/message to be appended to the output table
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

Sends a message to another process by inserting the provided message item into the process' outbox along with the _ao specs compliant_ message tags.

- **Parameters:**
  - `msg`: `{table}` The message to be sent
- **Returns:** The sent message item with the applied tags and `DataItem` fields.

> **Note:** Each field of the `msg` table will be appended as a `DataItem` tag, except the following: `"Target"`, `"Data"`, `"Anchor"`, `"Tags"`. These fields are interpreted as root level `DataItem` fields.

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

Allows spawning a new process, from within another process.

- **Parameters:**
  - `module`: `{string}` Arweave transaction ID of the module used by the new process
  - `msg`: `{table}` The message that initializes the process, with the format described [above](#send)
- **Returns:** The initializing message item

#### Example

```lua
ao.spawn("n0BFH80b73mi9VAWUzyuG9gEC3LI2zU2BFxum0N8A9s", {
  ["Custom-Tag"]: "Custom-Value"
})
```
