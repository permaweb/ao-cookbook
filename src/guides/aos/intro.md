# Introduction

aos is a different approach to building Processes or Contracts, the ao computer is a decentralized computer network that allows compute to run anywhere and aos in a unique
interactive shell. You can use aos as your personal operating system, your development environment for building ao Processes, and your bot Army.

Lets go over some basic commands.

If you want to display the contents of any variable through the console, simply type the variable name.

```lua
name
```

Inbox is a collection of messages that your Process has received.

```lua
inbox[1]
```

If you want to get a count of messages, just add the `#` infront of inbox

```lua
#inbox
```

You can personalize you `aos` Process, for example, if you want a custom prompt, just
overwrite the `prompt` function.

Use either `.editor` or `.load file` to load this function on your process.

```lua
function prompt()
  return "inbox: " .. #inbox .. "> "
end
```
