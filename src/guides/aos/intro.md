# Introduction

aos introduces a new approach to building `processes` — asynchronous, parallel-executing smart contracts. The ao computer is a decentralized computer network that allows compute to run anywhere and aos in a unique, interactive shell. You can use aos as your personal operating system, your development environment for building ao processes, and your bot army.

Lets go over some basic commands.

## Variables

If you want to display the contents of any variable through the console, simply type the variable name.

```lua
Name
```

## Inbox

the `Inbox` is a collection of messages that your Process has received.

```lua
Inbox[1]
```

If you want to get a count of messages, just add the `#` infront of `Inbox`.

```lua
#Inbox
```

The process of checking how many messages are in the inbox is a very common pattern. To make this easier, you can create a function that returns the number of messages within the inbox and displays it in the prompt.

Use either `.editor` or `.load file` to load this function on your process.

```lua
function Prompt()
  return "Inbox: " .. #Inbox .. " > "
end
```

**The Expected Results:**

```lua
undefined
Inbox: 2 >
```

Your prompt now has changed to include the number of messages in your inbox.

::: info
The `Inbox` is a Lua table (similar to an array) that contains messages received by your process that were not handled by any Handlers. The `#` operator is used to get the length of a table in Lua - so `#Inbox` returns the total number of unhandled messages currently in your inbox. This is a common Lua syntax pattern for getting the size/length of tables and strings.
:::

## Globals

In aos process there are some Globals that can make development a little more intuitive.

| Name                   | Description                                                                                                                                                                       | Type         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Inbox                  | This is a lua Table that stores all the messages that are received and not handlers by any handlers.                                                                              | Table(Array) |
| Send(Message)          | This is a global function that is available in the interactive environment that allows you to send messages to Processes                                                          | function     |
| Spawn(Module, Message) | This is a global function that is available in the aos interactive environment that allows you to spawn processes                                                                 |
| Name                   | a string that is set on init that describes the name of your process                                                                                                              | string       |
| Owner                  | a string that is set on the init of the process that documents the owner of the process, warning if you change this value, it can brick you ability to interact with your process | string       |
| Handlers               | a lua Table that contains helper functions that allows you to create handlers that execute functionality based on the pattern matching function on inbound messages               | table        |
| Dump                   | a function that takes any lua Table and generates a print friendly output of the data                                                                                             | function     |
| Utils                  | a functional utility library with functions like map, reduce, filter                                                                                                              | module       |
| ao                     | this is a core function library for sending messages and spawing processes                                                                                                        | module       |

## Modules

In aos there are some built in common lua modules that are already available for you to work with, these modules can be referenced with a "require" function.

| Name    | Description                                                                |
| ------- | -------------------------------------------------------------------------- |
| json    | a json module that allows you to encode and decode json documents          |
| ao      | contains ao specific functions like send and spawn                         |
| .base64 | a base64 module that allows you to encode and decode base64 text           |
| .pretty | a pretty print module using the function tprint to output formatted syntax |
| .utils  | an utility function library                                                |
