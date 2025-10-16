# Interpreting Announcements

Welcome back to your coding journey. It's time to use the skills you've acquired from previous tutorials to enhance your gaming experience.

During the game, you've likely noticed announcements appearing in your terminal. These announcements are the game's way of communicating important events to players. However, these messages can sometimes seem cryptic or you might find yourself checking your inbox frequently for further details.

Wouldn't it be convenient to access this information directly from your terminal? Well, there's a way to do that!

By using [handlers](/references/api/handlers.md), you can create an autonomous agent to retrieve this information for you, marking the progression from simple bots to entities capable of interpreting and acting on game events directly.

## Setting up the Development Environment

Start by creating a new file named `bot.lua` in your preferred directory.

> Ideally, this file should be placed in the same directory where your player process runs to ease the loading of the code. Else, you'll need to use relative paths to access the file.

## Writing the Code

Let's dive into the logic.

Each handler in aos requires three key pieces of information:

- `name`: A unique name for the handler
- `pattern`: A pattern for the handler to identify, triggering its operation
- `handle`: The operations to perform when the desired pattern is found.

Here's how you can write a handler for printing announcement details:

```lua
-- Handler to print game announcements directly in the terminal.
Handlers.add(
  "PrintAnnouncements",
  { Action = "Announcement" },
  function (msg)
    print(msg.Event .. ": " .. msg.Data)
  end
)
```

In this case, the name of the handler is `"PrintAnnouncements"`. It uses a special in-built utility (`hasMatchingTags`) represented by `{ Action = "Announcement" }` to check if the incoming message has been tagged as an announcement. If true, the handler prints the Event and Data, which represent the title and description of the announcement.

> [!Note]
> Once a message is "handled", it will be discarded from your `Inbox`.

## Loading and Testing

Now, let's bring this to life in the game.

Navigate to your aos player terminal and enter a game session.

Activate the handler by loading your `bot.lua` file with:

```lua
.load bot.lua
```

You'll now see game announcements appear directly in your terminal, offering real-time insights without the need to sift through your inbox.

Congratulations! You have just taken the first step in building a bot on `aos`. But let's keep working on adding more features to it 🌐
