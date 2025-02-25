# Load Lua Files with `.load <filename>`

This feature allows you to load lua code from a source file on your local machine, this simple feature gives you a nice DX experience for working with aos processes.

When creating handlers you may have a lot of code and you want to take advantage of a rich development environment like vscode. You can even install the lua extension to get some syntax checking.

So how do you publish your local lua source code to your ao process? This is where the `.load` command comes into play.

hello.lua

```lua
Handlers.add(
  "ping",
  Handlers.utils.hasMatchingData("ping"),
  Handlers.utils.reply("pong")
)
```

aos shell

```lua
.load hello.lua
```

Easy Peasy! 🐶
