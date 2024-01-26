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
