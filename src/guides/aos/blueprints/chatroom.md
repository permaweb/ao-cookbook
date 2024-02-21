# Chatroom Blueprint

The Chatroom Blueprint is a predesigned template that helps you quickly build a chatroom in `ao`. It is a great way to get started and can be customized to fit your needs.

## Unpacking the Chatroom Blueprint

- **Members**: The `Members` array is used to store the users who have registered to the chatroom.

- **Register Handler**: The `register` handler allows processes to join the chatroom. When a process sends a message with the tag `Action = "Register"`, the handler will add the process to the `Members` array and send a message back to the process confirming the registration.

- **Broadcast Handler**: The `broadcast` handler allows processes to send messages to all the members of the chatroom. When a process sends a message with the tag `Action = "Broadcast"`, the handler will send the message to all the members of the chatroom.

### How To Use:

1. Open your preferred text editor.
2. Open the Terminal.
3. Start your `aos` process.
4. Type in `.load-blueprint chatroom`

### Verify the Blueprint is Loaded:

Type in `Handlers.list` to see the newly loaded handlers.

## What's in the Chatroom Blueprint:

```lua
Members = Members or {}

Handlers.add(
  "register",
  Handlers.utils.hasMatchingTag("Action", "Register"),
  function (msg)
    table.insert(Members, msg.From)
    Handlers.utils.reply("registered")(msg)
  end
)

Handlers.add(
  "broadcast",
  Handlers.utils.hasMatchingTag("Action", "Broadcast"),
  function (msg)
    for _, recipient in ipairs(Members) do
      ao.send({Target = recipient, Data = msg.Data})
    end
    Handlers.utils.reply("Broadcasted.")(msg)
  end
)
```
