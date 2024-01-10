```

          _____                   _______                   _____
         /\    \                 /::\    \                 /\    \
        /::\    \               /::::\    \               /::\    \
       /::::\    \             /::::::\    \             /::::\    \
      /::::::\    \           /::::::::\    \           /::::::\    \
     /:::/\:::\    \         /:::/~~\:::\    \         /:::/\:::\    \
    /:::/__\:::\    \       /:::/    \:::\    \       /:::/__\:::\    \
   /::::\   \:::\    \     /:::/    / \:::\    \      \:::\   \:::\    \
  /::::::\   \:::\    \   /:::/____/   \:::\____\   ___\:::\   \:::\    \
 /:::/\:::\   \:::\    \ |:::|    |     |:::|    | /\   \:::\   \:::\    \
/:::/  \:::\   \:::\____\|:::|____|     |:::|    |/::\   \:::\   \:::\____\
\::/    \:::\  /:::/    / \:::\    \   /:::/    / \:::\   \:::\   \::/    /
 \/____/ \:::\/:::/    /   \:::\    \ /:::/    /   \:::\   \:::\   \/____/
          \::::::/    /     \:::\    /:::/    /     \:::\   \:::\    \
           \::::/    /       \:::\__/:::/    /       \:::\   \:::\____\
           /:::/    /         \::::::::/    /         \:::\  /:::/    /
          /:::/    /           \::::::/    /           \:::\/:::/    /
         /:::/    /             \::::/    /             \::::::/    /
        /:::/    /               \::/____/               \::::/    /
        \::/    /                 ~~                      \::/    /
         \/____/                                           \/____/


```

## Requirements

- [NodeJS](https://nodejs.org) version 20+

## Getting Started

```sh
npm i -g https://sh_ao.g8way.io && aos
```

> NOTE: after the first time you run `aos` it installs it to your local machine, so the next time you want to run `aos`, just type `aos` + [enter]

## About

aos is a command-line app that connects to your `aos` Process on the ao Permaweb Computer Grid. The ao Computer Grid, is like the internet, but for compute. Each Process on the Grid can receive messages and send messages. This cli will allow you to pass LUA expressions to your Process, and those expressions get evaluated and return output to your system.

## Examples

When you boot up the aos, you can use https://lua.org to run expressions on your `aos` Process.

First try "Hello aos" - the return keyword sets the output variable that is passed to the output on the screen.

```lua
"Hello aos"
```

You should get `Hello aos`

> What is happening here? Your input, is getting wrapped in an signed `ao` message and submitted to a messenger unit, which then forwards it to a Scheduler Unit, then the app, calls a compute unit to evaluate the `ao` Message with your Process. This generates output to be returned for display.

Lets try another expression:

```lua
1 + 41
```

You should get `42` the answer to the universe 😛

So, thats cool, you can send expressions to the `ao` Permaweb Computer to your Process, and you get returned a response.

You `aOS` process also has memory, so you can set `variables`

```lua
a = "Hello aos"
```

Then type `return a` and you should get `Hello aos`, neat

You can also create functions:

```lua
sayHi = function (name) return "Hello " .. name end
return sayHi("Sam")
```

You should get `Hello Sam`

Woohoo! 🚀

We can also pass messages to other `aos` Processes!

```lua
send({ Target = "ohc9mIsNs3CFmMu7luiazRDLCFpiFJCfGVomJNMNHdU", Tags = { body = "ping" } })
```

Check the number of items in your `inbox`:

```
#inbox
```

Check the body Tag of the last message in your inbox:

```
inbox[#inbox].Data
```

> Should be `pong`

Or you can check your messages ( by a `list()`)

```lua
list()
```

```
1:
 Target: ohc9mIsNs3CFmMu7luiazRDLCFpiFJCfGVomJNMNHdU
 ...
 Tags:
  From-Process: ohc9mIsNs3CFmMu7luiazRDLCFpiFJCfGVomJNMNHdU
  Type: Message
  body: pong
  Variant: ao.TN.1
  Data-Protocol: ao
```

### handlers

With `aos` you can add handlers to handle incoming messages, in this example, we will create a handler for "ping" - "pong".

In the `aos`, type `.editor`

```lua
handlers.add(
  "pingpong",
  handlers.utils.hasMatchingData("ping"),
  handlers.utils.reply("pong")
)
```

Then type `.done`

> This will submit a handler to listen for messages that have a `body` tag with a value of `ping` then send back a message `pong`.

Once added you can ping yourself!

```lua
send({Target = ao.id, Data = "ping" })
```

And check your inbox, you should have gotten a `pong` message.

```lua
inbox[#inbox].Data
```

You should see `pong`

:tada:

For more information about `handlers` check out the handlers [docs](../concepts/handlers)

## Chatroom Example

Lets build a chatroom in aos, this chatroom will have three handlers:

1. Register - Allows other aos processes to register for the chatroom
2. Broadcast - When a process sends a message it is broadcasts to all of the registered processes
3. Unregister - aos process can unregister from the chatroom

When building this Process we are going to an iterative workflow, because `aos` has a `.load` feature that allows us to load our lua code via a file. Using this feature we can use our favorite code editor to write our source code.

Open up your favorite code editor and create a file called `chatroom.lua`.

In that file lets first start by initializaing our participant list, lets call the list weavers.

```lua
weavers = weavers or {}
```

Save the file, and go to your aos shell and type:

```sh
.load chatroom.lua
```

This command loads our source file into our aos process, to confirm we have added our weavers array, we can just type `weavers` in the aos shell and press enter

```sh
weavers
```

It should return an empty array `[]`

### Register

We want to allow processes to register themselves to our chatroom, so we need to create a handler that allows them to register. In our `chatroom.lua` file lets add:

```lua
handlers.add(
  "register",
  handlers.utils.hasMatchingTag("Action", "Register"),
  function (msg)
    -- insert process into weavers
    table.insert(weavers, msg.From)
    -- reply letting process know they are registered
    handlers.utils.reply("registered")(msg)
  end
)
```

Save your file, and then on aos type `.load chatroom.lua` - this will send the changes to our Process.

Now we can test those changes:

```lua
send({ Target = ao.id, Tags = { Action = "Register" }})
```

Lets verify we are added to the `weavers` list, in `aos` type:

```lua
weavers
```

### Broadcast

Lets do the same pattern with the `Broadcast` handler, type the following code in your `chatroom.lua` file

```lua
handlers.add(
  "broadcast",
  handlers.utils.hasMatchingTag("Action", "Broadcast"),
  function (msg)
    for index, recipient in ipairs(weavers) do
      ao.send({Target = recipient, Data = msg.Data})
    end
    handlers.utils.reply("Broadcasted.")(msg)
  end
)
```

Save and type `.load chatroom.lua` in your aos console, and lets test:

```lua
send({Target = ao.id, Tags = { Action = "Broadcast" }, Data = "Hello World" })
```

Check you inbox. You should have the message:

```lua
inbox[#inbox].Data
```

Now, go and get some aos friends to register and start chatting...

give this this onboarding script:

Hey lets chat on ao!

```sh
npm i -g https://sh_ao.g8way.io && aos
```

Register by typing this send command in your aos shell

```lua
send({Target = "{Your Process Id}", Tags = { Action = "Register" }})
```

Check for received messages by typing `#inbox` and `inbox[#inbox].Data` to get the most recent.

Send messages:

```lua
send({Target = "{Your Process Id}", Tags = { Action = "Broadcast", Data = "{your message}"}})
```

### Congrats! You just published a chatroom Process on the ao computer!

## Summary

Hopefully, you are able to see the power of aOS in this demo, access to compute from anywhere in the world.

Welcome to the `ao` Permaweb Computer Grid! We are just getting started! 🐰
