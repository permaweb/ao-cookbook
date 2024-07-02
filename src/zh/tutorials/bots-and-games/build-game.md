---
next:
  text: "指南"
  link: "/zh/guides/index"
---

# 扩建竞技场

欢迎来到第 2 章的最终指南，你将学习在[上一篇教程](arena-mechanics)中介绍的竞技场框架之上构建自己的游戏。 在本指南中，我们将带你完成创建[ ao-effect ](ao-effect)游戏的过程，即你在本章开始时玩的。 随着你逐步完成此示例，你将深入了解构建游戏逻辑以及与竞技场的核心代码进行交互。

无论你是经验丰富的开发人员还是有抱负的游戏创作者，本指南都将帮助你释放创造力，并在 `aos` 环境中将你独特的游戏创意变为现实。

## 设置开发环境

首先在你的首选目录中创建一个名为 `ao-effect.lua` 的新文件。

> 理想情况下，该文件应放置在游戏进程运行的同一目录中，以方便代码的加载。 否则，你需要使用相对路径来访问该文件。

## 编写代码

现在，让我们深入研究其中的逻辑。

你会注意到你的游戏逻辑将涉及调用竞技场逻辑中定义的函数和变量。 这展示了可组合性的力量，你的游戏构建在现有竞技场逻辑之上，允许两者之间的变量和函数无缝集成。 因为这两种逻辑都成为游戏进程完整逻辑的一部分。

### 初始化游戏机制

首先，定义为游戏机制奠定基础的基本变量和函数：

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

此代码初始化游戏的机制，包括网格尺寸、玩家能量和攻击设置。 `playerInitState` 函数在游戏开始时为玩家设置初始状态。

### 玩家移动

接下来，添加玩家移动的代码：

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

`move` 函数根据所选方向计算玩家新的坐标，同时确保玩家保持在网格边界内。 玩家的移动为你的游戏添加了动态交互，并向所有玩家和听众同步。

### 玩家攻击

然后你必须实现玩家攻击的逻辑：

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

`attack` 函数根据攻击能量计算伤害，检查玩家能量，并相应更新玩家生命值。 玩家攻击会在游戏中添加竞争元素，让玩家能够相互互动。 这些攻击也会向玩家和听众同步，以获取游戏的实时更新。

### 处理逻辑

最后，你必须设置handler：

```lua
-- HANDLERS: Game state management for AO-Effect

-- Handler for player movement
Handlers.add("PlayerMove", Handlers.utils.hasMatchingTag("Action", "PlayerMove"), move)

-- Handler for player attacks
Handlers.add("PlayerAttack", Handlers.utils.hasMatchingTag("Action", "PlayerAttack"), attack)
```

正如前面的指南中所见，handler在满足各自的模式时帮助触发功能。

你可以参考下面的 `ao-effect.lua` 最终代码：

<details>
  <summary><strong>最终的 ao-effect.lua 文件</strong></summary>
  
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
Handlers.add("PlayerMove", Handlers.utils.hasMatchingTag("Action", "PlayerMove"), move)

-- Handler for player attacks
Handlers.add("PlayerAttack", Handlers.utils.hasMatchingTag("Action", "PlayerAttack"), attack)
```

</details>

## 加载和测试

编写完游戏代码后，就可以将其加载到 `aos` 游戏进程中并测试你的游戏了：

```lua
.load ao-effect.lua
```

> 注意：确保在同一进程中加载竞技场蓝图。

邀请朋友或创建测试玩家流程来体验你的游戏并进行必要的调整以获得最佳性能。

## 下一步是什么

恭喜！通过在其核心功能之上构建自己的游戏，你已经成功扩建了竞技场。 有了本指南中获得的知识和工具，你现在就可以在 `aos` 上独立构建游戏了。

无限的可能性。 继续向现有游戏添加更多功能或创建全新游戏。 天马行空无所限制！ 🚀
