---
prev:
  text: "Play a Game"
  link: "/guides/tutorials/build-a-game/announcements"
next:
  text: "Interpreting Announcements"
  link: "/guides/tutorials/build-a-game/moving"
---

# Fetching Game State

With the announcements being printed in your terminal, it becomes easier to understand what is happening in the game. However, you only receive insights into the state of the game when some action occurred.

What if you wanted more comprehensive information on demand? For example, knowing all the players' current positions, their health, and energy to better judge whether you are under threat, have a chance to attack, or are running out of time.

If you thought of adding another handler to the bot created in the [previous guide](announcements), you're absolutely right!

## Writing the Code

Go back to your `bot.lua` file and update your existing handler as follows:

```lua
Handlers.add(
  "HandleAnnouncements",
  Handlers.utils.hasMatchingTag("Action", "Announcements"),
  function (msg)
    ao.send({Target = Game, Action = "GetGameState"})
    print(msg.Event .. ": " .. msg.Data)
  end
)
```

A few changes have been made to your handler:

- The `name` has been updated to `"HandleAnnouncements"` because you're not just printing the details anymore.
- An extra operation has been added to the handle function where you're sending a message to the game. When the game receives this message, it's designed to respond with a message that includes the game's state.

## Loading and Testing

As usual, to test this new feature, load the file in your aos player terminal as follows:

```lua
.load bot.lua
```

And when you get a print of an announcement, you can check the latest message in your `Inbox` as follows:

```lua
Inbox[#Inbox]
```

The `Data` field of this message will contain the latest state of the game which includes:
- `GameMode` : Whether the game is in `Waiting` or `Playing` state.
- `TimeRemaining` : The time remaining for the game to start or end.
- `Players` : A table containing every player's stats like position, health and energy.

Now you have access to the latest state of the game each time some action takes places so you have better information to decide your next action. Let's try automating movements next 🚶
