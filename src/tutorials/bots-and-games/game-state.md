# Fetching Game State

Now that you're seeing game announcements directly in your terminal, you have a better grasp of the game's dynamics. However, these insights are limited to specific actions occurring within the game.

Wouldn't it be more useful to have on-demand access to comprehensive game data, like the positions, health, and energy of all players? This information could significantly improve your strategic planning, helping you assess threats, opportunities, and timing more effectively.

If you thought of adding another handler to the bot created in the [previous guide](announcements), you're absolutely right!

## Writing the Code

Go back to your `bot.lua` file and update your existing handler as follows:

```lua
Handlers.add(
  "HandleAnnouncements",
  { Action = "Announcement" },
  function (msg)
    ao.send({Target = Game, Action = "GetGameState"})
    print(msg.Event .. ": " .. msg.Data)
  end
)
```

Adjustments to your handler include:

- Renaming to `"HandleAnnouncements"` to reflect its broader role.
- Addition of an extra operation to request the game for the updated state. The game is designed to respond to the `GetGameState` action tag.

When you get a print of the announcement, you can check the latest message in your `Inbox` as follows:

```lua
Inbox[#Inbox]
```

The `Data` field of this message contains the latest state of the game which includes:

- `GameMode` : Whether the game is in `Waiting` or `Playing` state.
- `TimeRemaining` : The time remaining for the game to start or end.
- `Players` : A table containing every player's stats like position, health and energy.

But this can be taken a step further so that you can not just read but also use information from the latest state for other automations.

Let's define a new variable that stores the latest state as follows:

```lua
LatestGameState = LatestGameState or nil
```

The syntax preserves existing values of the variable when you load successive iterations of the `bot.lua` file in your terminal, instead of overwriting it. If there is no pre-existing value then a `nil` value is assigned to the variable.

Then implement another handler as follows:

```lua
-- Handler to update the game state upon receiving game state information.
Handlers.add(
  "UpdateGameState",
  { Action = "Announcement" },
  function (msg)
    local json = require("json")
    LatestGameState = json.decode(msg.Data)
    ao.send({Target = ao.id, Action = "UpdatedGameState"})
    print("Game state updated. Print \'LatestGameState\' for detailed view.")
  end
)
```

The response from the game process from the previous handler has an action tag with the value `GameState` that helps us trigger this second handler. Once triggered, the handle function loads the in-built `json` package that parses the data into json and stores it in the `LatestGameState` variable.

This handler additionally sends a message to your process indicating when the state has been updated. The significance of this feature will be explained in the following section.

You can refer to the latest code for `bot.lua` in the dropdown below:

<details>
  <summary><strong>Updated bot.lua file</strong></summary>

```lua
LatestGameState = LatestGameState or nil

Handlers.add(
"HandleAnnouncements",
{ Action = "Announcement" },
function (msg)
  ao.send({Target = Game, Action = "GetGameState"})
  print(msg.Event .. ": " .. msg.Data)
end
)

Handlers.add(
"UpdateGameState",
{ Action = "GameState" },
function (msg)
  local json = require("json")
  LatestGameState = json.decode(msg.Data)
  ao.send({Target = ao.id, Action = "UpdatedGameState"})
  print("Game state updated. Print \'LatestGameState\' for detailed view.")
end
)
```

</details>

## Loading and Testing

As usual, to test this new feature, load the file in your aos player terminal as follows:

```lua
.load bot.lua
```

Then check the `LatestStateVariable` to see if it has updated correctly by simply passing its name as follows:

```lua
LatestGameState
```

With real-time access to the latest state of the game you bot is equipped to make informed decisions decide your next action. Next let's try automating actions with the help of this data 🚶
