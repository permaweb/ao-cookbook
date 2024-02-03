---
prev:
  text: "Play a Game"
  link: "/guides/tutorials/build-a-game/announcements"
next:
  text: "Interpreting Announcements"
  link: "/guides/tutorials/build-a-game/decisions"
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

When you get a print of an announcement, you can check the latest message in your `Inbox` as follows:

```lua
Inbox[#Inbox]
```

The `Data` field of this message will contain the latest state of the game which includes:
- `GameMode` : Whether the game is in `Waiting` or `Playing` state.
- `TimeRemaining` : The time remaining for the game to start or end.
- `Players` : A table containing every player's stats like position, health and energy.

But this can be taken a step further so that you can not just read but also use information from the latest state for other automations.

Let's define a new variable that stores the latest state as follows:

```lua
LatestGameState = LatestGameState or nil
```

The syntax indicates that pre-exisitng values of the variable will be carried forward in our player process when you load successive iterations of the `bot.lua` file instead of overwriting the variable. If there is no pre-existing value then a `nil` value is assigned to the variable.

Then implement another handler as follows:


```lua
-- Handler to update the game state upon receiving game state information.
Handlers.add(
  "UpdateGameState",
  Handlers.utils.hasMatchingTag("Action", "GameState"),
  function (msg)
    local json = require("json")
    LatestGameState = json.decode(msg.Data)
    ao.send({Target = ao.id, Action = "UpdatedGameState"})
  end
)
```

The response from the game process from the previous handler has an action tag with the value `GameState` that helps us trigger this second handler. Once triggered, the handle function loads the `json` package that parses the data into json and stores it in the `LatestGameState` variable.

## Loading and Testing

As usual, to test this new feature, load the file in your aos player terminal as follows:

```lua
.load bot.lua
```

Then check the `LatestStateVariable` to see if it has updated correctly by simply passing its name as follows:

```lua
LatestGameState
```

With real-time access to the latest state of the game you're better equipped to decide your next action. Next let's try automating actions with the help of this data 🚶
