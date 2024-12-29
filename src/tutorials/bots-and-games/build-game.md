---
next:
  text: "Guides"
  link: "/guides/index"
---

# Expanding the Arena

Welcome to the final guide of Chapter 2, where you'll learn to build your own game on top of the arena framework introduced in the [previous tutorial](arena-mechanics). In this guide, we'll take you through the process of creating the ["ao-effect" game](ao-effect), which you experienced at the beginning of this chapter. As you progress through this example, you'll gain insights into structuring your game's logic and interacting with the arena's core code.

Whether you're a seasoned developer or an aspiring game creator, this guide will empower you to unleash your creativity and bring your unique game ideas to life within the `aos` environment.

## Setting up the Development Environment

Start by creating a new file named `ao-effect.lua` in your preferred directory.

> [!Note]
> Ideally, this file should be placed in the same directory where your game process runs to ease the loading of the code. Else, you'll need to use relative paths to access the file.

## Writing the Code

Now, let's dive into the logic.

You'll notice that your game logic will involve calling functions and variables defined in the arena's logic. This showcases the power of composability, where your game builds on top of the existing arena logic, allowing seamless integration of variables and functions between the two. Because both logic become part of a unified logic for the game process.

### Initializing Game Mechanics

First, define essential variables and functions that set the stage for your game's mechanics:

```lua
-- AO EFFECT: Game Mechanics for AO Arena Game

-- Game grid dimensions
Width = 40 -- Width of the grid
Height = 40 -- Height of the grid
Range = 1 -- The distance for blast effect

-- Player energy settings
MaxEnergy = 100 -- Maximum energy a player can have
EnergyPerSec = 1 -- Energy gained per second

-- Attack settings
AverageMaxStrengthHitsToKill = 3 -- Average number of hits to eliminate a player

-- Initializes default player state
-- @return Table representing player's initial state
function playerInitState()
    return {
        x = math.random(Width/8),
        y = math.random(Height/8),
        health = 100,
        energy = 0
    }
end

-- Function to incrementally increase player's energy
-- Called periodically to update player energy
function onTick()
    if GameMode ~= "Playing" then return end  -- Only active during "Playing" state

    if LastTick == undefined then LastTick = Now end

    local Elapsed = Now - LastTick
    if Elapsed >= 1000 then  -- Actions performed every second
        for player, state in pairs(Players) do
            local newEnergy = math.floor(math.min(MaxEnergy, state.energy + (Elapsed * EnergyPerSec // 2000)))
            state.energy = newEnergy
        end
        LastTick = Now
    end
end
```

This code initializes your game's mechanics, including grid dimensions, player energy, and attack settings. The `playerInitState` function sets up the initial state for players when the game begins.

### Player Movement

Next, add the code for player movement:

```lua
-- Handles player movement
-- @param msg: Message request sent by player with movement direction and player info
function move(msg)
    local playerToMove = msg.From
    local direction = msg.Tags.Direction

    local directionMap = {
        Up = {x = 0, y = -1}, Down = {x = 0, y = 1},
        Left = {x = -1, y = 0}, Right = {x = 1, y = 0},
        UpRight = {x = 1, y = -1}, UpLeft = {x = -1, y = -1},
        DownRight = {x = 1, y = 1}, DownLeft = {x = -1, y = 1}
    }

    -- calculate and update new coordinates
    if directionMap[direction] then
        local newX = Players[playerToMove].x + directionMap[direction].x
        local newY = Players[playerToMove].y + directionMap[direction].y

        -- updates player coordinates while checking for grid boundaries
        Players[playerToMove].x = (newX - 1) % Width + 1
        Players[playerToMove].y = (newY - 1) % Height + 1

        announce("Player-Moved", playerToMove .. " moved to " .. Players[playerToMove].x .. "," .. Players[playerToMove].y .. ".")
    else
        ao.send({Target = playerToMove, Action = "Move-Failed", Reason = "Invalid direction."})
    end
    onTick()  -- Optional: Update energy each move
end
```

The `move` function calculates new player coordinates based on the chosen direction while ensuring that players remain within the grid boundaries. Player movement adds dynamic interaction to your game and is announced to all players and listeners.

### Player Attacks

Then you must implement the logic for player attacks:

```lua
-- Handles player attacks
-- @param msg: Message request sent by player with attack info and player state
function attack(msg)
    local player = msg.From
    local attackEnergy = tonumber(msg.Tags.AttackEnergy)

    -- get player coordinates
    local x = Players[player].x
    local y = Players[player].y

    -- check if player has enough energy to attack
    if Players[player].energy < attackEnergy then
        ao.send({Target = player, Action = "Attack-Failed", Reason = "Not enough energy."})
        return
    end

    -- update player energy and calculate damage
    Players[player].energy = Players[player].energy - attackEnergy
    local damage = math.floor((math.random() * 2 * attackEnergy) * (1/AverageMaxStrengthHitsToKill))

    announce("Attack", player .. " has launched a " .. damage .. " damage attack from " .. x .. "," .. y .. "!")

    -- check if any player is within range and update their status
    for target, state in pairs(Players) do
        if target ~= player and inRange(x, y, state.x, state.y, Range) then
            local newHealth = state.health - damage
            if newHealth <= 0 then
                eliminatePlayer(target, player)
            else
                Players[target].health = newHealth
                ao.send({Target = target, Action = "Hit", Damage = tostring(damage), Health = tostring(newHealth)})
                ao.send({Target = player, Action = "Successful-Hit", Recipient = target, Damage = tostring(damage), Health = tostring(newHealth)})
            end
        end
    end
end

-- Helper function to check if a target is within range
-- @param x1, y1: Coordinates of the attacker
-- @param x2, y2: Coordinates of the potential target
-- @param range: Attack range
-- @return Boolean indicating if the target is within range
function inRange(x1, y1, x2, y2, range)
    return x2 >= (x1 - range) and x2 <= (x1 + range) and y2 >= (y1 - range) and y2 <= (y1 + range)
end
```

The `attack` function calculates damage based on attack energy, checks player energy, and updates player health accordingly. Player attacks add the competitive element in your game, allowing players to engage with each other. The attacks are also announced to the players and listeners for real-time updates of the game.

### Handling the Logic

Lastly, you must setup handlers:

```lua
-- HANDLERS: Game state management for AO-Effect

-- Handler for player movement
Handlers.add("PlayerMove", { Action = "PlayerMove" }, move)

-- Handler for player attacks
Handlers.add("PlayerAttack", { Action = "PlayerAttack" }, attack)
```

As seen in earlier guides, the handlers help trigger functions when their respective patterns are met.

You can refer to the final code for `ao-effect.lua` in the dropdown below:

<details>
  <summary><strong>Final ao-effect.lua file</strong></summary>

```lua
-- AO EFFECT: Game Mechanics for AO Arena Game

-- Game grid dimensions
Width = 40 -- Width of the grid
Height = 40 -- Height of the grid
Range = 1 -- The distance for blast effect

-- Player energy settings
MaxEnergy = 100 -- Maximum energy a player can have
EnergyPerSec = 1 -- Energy gained per second

-- Attack settings
AverageMaxStrengthHitsToKill = 3 -- Average number of hits to eliminate a player

-- Initializes default player state
-- @return Table representing player's initial state
function playerInitState()
    return {
        x = math.random(0, Width),
        y = math.random(0, Height),
        health = 100,
        energy = 0
    }
end

-- Function to incrementally increase player's energy
-- Called periodically to update player energy
function onTick()
    if GameMode ~= "Playing" then return end  -- Only active during "Playing" state

    if LastTick == undefined then LastTick = Now end

    local Elapsed = Now - LastTick
    if Elapsed >= 1000 then  -- Actions performed every second
        for player, state in pairs(Players) do
            local newEnergy = math.floor(math.min(MaxEnergy, state.energy + (Elapsed * EnergyPerSec // 2000)))
            state.energy = newEnergy
        end
        LastTick = Now
    end
end

-- Handles player movement
-- @param msg: Message request sent by player with movement direction and player info
function move(msg)
    local playerToMove = msg.From
    local direction = msg.Tags.Direction

    local directionMap = {
        Up = {x = 0, y = -1}, Down = {x = 0, y = 1},
        Left = {x = -1, y = 0}, Right = {x = 1, y = 0},
        UpRight = {x = 1, y = -1}, UpLeft = {x = -1, y = -1},
        DownRight = {x = 1, y = 1}, DownLeft = {x = -1, y = 1}
    }

    -- calculate and update new coordinates
    if directionMap[direction] then
        local newX = Players[playerToMove].x + directionMap[direction].x
        local newY = Players[playerToMove].y + directionMap[direction].y

        -- updates player coordinates while checking for grid boundaries
        Players[playerToMove].x = (newX - 1) % Width + 1
        Players[playerToMove].y = (newY - 1) % Height + 1

        announce("Player-Moved", playerToMove .. " moved to " .. Players[playerToMove].x .. "," .. Players[playerToMove].y .. ".")
    else
        ao.send({Target = playerToMove, Action = "Move-Failed", Reason = "Invalid direction."})
    end
    onTick()  -- Optional: Update energy each move
end

-- Handles player attacks
-- @param msg: Message request sent by player with attack info and player state
function attack(msg)
    local player = msg.From
    local attackEnergy = tonumber(msg.Tags.AttackEnergy)

    -- get player coordinates
    local x = Players[player].x
    local y = Players[player].y

    -- check if player has enough energy to attack
    if Players[player].energy < attackEnergy then
        ao.send({Target = player, Action = "Attack-Failed", Reason = "Not enough energy."})
        return
    end

    -- update player energy and calculate damage
    Players[player].energy = Players[player].energy - attackEnergy
    local damage = math.floor((math.random() * 2 * attackEnergy) * (1/AverageMaxStrengthHitsToKill))

    announce("Attack", player .. " has launched a " .. damage .. " damage attack from " .. x .. "," .. y .. "!")

    -- check if any player is within range and update their status
    for target, state in pairs(Players) do
        if target ~= player and inRange(x, y, state.x, state.y, Range) then
            local newHealth = state.health - damage
            if newHealth <= 0 then
                eliminatePlayer(target, player)
            else
                Players[target].health = newHealth
                ao.send({Target = target, Action = "Hit", Damage = tostring(damage), Health = tostring(newHealth)})
                ao.send({Target = player, Action = "Successful-Hit", Recipient = target, Damage = tostring(damage), Health = tostring(newHealth)})
            end
        end
    end
end

-- Helper function to check if a target is within range
-- @param x1, y1: Coordinates of the attacker
-- @param x2, y2: Coordinates of the potential target
-- @param range: Attack range
-- @return Boolean indicating if the target is within range
function inRange(x1, y1, x2, y2, range)
    return x2 >= (x1 - range) and x2 <= (x1 + range) and y2 >= (y1 - range) and y2 <= (y1 + range)
end

-- HANDLERS: Game state management for AO-Effect

-- Handler for player movement
Handlers.add("PlayerMove", { Action = "PlayerMove" }, move)

-- Handler for player attacks
Handlers.add("PlayerAttack", { Action = "PlayerAttack" }, attack)
```

</details>

## Loading and Testing

Once you've written your game code, it's time to load it into the `aos` game process and test your game:

```lua
.load ao-effect.lua
```

> [!Important]
> Make sure to load the arena blueprint in the same process as well.

Invite friends or create test player processes to experience your game and make any necessary adjustments for optimal performance.

## What's Next

Congratulations! You've successfully expanded the arena by building your own game on top of its core functionalities. Armed with the knowledge and tools acquired in this guide, you're now equipped to build games on `aos` independently.

The possibilities are endless. Continue adding more features to existing games or create entirely new ones. The sky's the limit! ⌃◦🚀
