---
next:
  text: "Guides"
  link: "/guides/index"
---

# アリーナの拡張

第2章の最終ガイドへようこそ。ここでは、前回のチュートリアルで紹介したアリーナフレームワークの上に自分自身のゲームを構築する方法を学びます。このガイドでは、章の初めに体験した["ao-effect"ゲーム](ao-effect)の作成プロセスを説明します。例を進めることで、ゲームのロジックを構造化し、アリーナのコアコードと対話する方法について洞察を得ることができます。

経験豊富な開発者でも、新しいゲームクリエイターでも、このガイドはあなたの創造性を発揮し、`aos`環境内でユニークなゲームアイデアを実現する力を与えてくれます。

## 開発環境のセットアップ

まず、好みのディレクトリに`ao-effect.lua`という名前の新しいファイルを作成します。

<!-- ---
next:
  text: "Guides"
  link: "/guides/index"
---

# Expanding the Arena

Welcome to the final guide of Chapter 2, where you'll learn to build your own game on top of the arena framework introduced in the [previous tutorial](arena-mechanics). In this guide, we'll take you through the process of creating the ["ao-effect" game](ao-effect), which you experienced at the beginning of this chapter. As you progress through this example, you'll gain insights into structuring your game's logic and interacting with the arena's core code.

Whether you're a seasoned developer or an aspiring game creator, this guide will empower you to unleash your creativity and bring your unique game ideas to life within the `aos` environment.

## Setting up the Development Environment

Start by creating a new file named `ao-effect.lua` in your preferred directory. -->

> [!Note]
> 理想的には、このファイルはゲームプロセスが実行されるのと同じディレクトリに配置されるべきです。そうすることで、コードの読み込みが容易になります。そうでない場合は、ファイルにアクセスするために相対パスを使用する必要があります。

## コードの記述

さて、ロジックに深く入りましょう。

ゲームのロジックには、アリーナのロジックで定義された関数や変数を呼び出すことが含まれます。これは、ゲームが既存のアリーナロジックの上に構築され、二つの間で変数や関数をシームレスに統合できるというコンポーザビリティの力を示しています。両方のロジックは、ゲームプロセスのための統一されたロジックの一部になります。

### ゲームメカニクスの初期化

まず、ゲームメカニクスの舞台を整えるために、重要な変数や関数を定義します：

<!-- > [!Note]
> Ideally, this file should be placed in the same directory where your game process runs to ease the loading of the code. Else, you'll need to use relative paths to access the file.

## Writing the Code

Now, let's dive into the logic.

You'll notice that your game logic will involve calling functions and variables defined in the arena's logic. This showcases the power of composability, where your game builds on top of the existing arena logic, allowing seamless integration of variables and functions between the two. Because both logic become part of a unified logic for the game process.

### Intializing Game Mechanics

First, define essential variables and functions that set the stage for your game's mechanics: -->

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

このコードは、ゲームのメカニクスを初期化し、グリッドの寸法、プレイヤーのエネルギー、および攻撃設定を含みます。`playerInitState`関数は、ゲームが始まるときにプレイヤーの初期状態を設定します。

### プレイヤーの移動

次に、プレイヤーの移動に関するコードを追加します：

<!-- This code initializes your game's mechanics, including grid dimensions, player energy, and attack settings. The `playerInitState` function sets up the initial state for players when the game begins.

### Player Movement

Next, add the code for player movement: -->

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

`move`関数は、選択した方向に基づいて新しいプレイヤーの座標を計算し、プレイヤーがグリッドの境界内に留まることを保証します。プレイヤーの移動は、ゲームに動的なインタラクションを追加し、すべてのプレイヤーとリスナーに通知されます。

### プレイヤーの攻撃

次に、プレイヤーの攻撃に関するロジックを実装する必要があります：

<!--
The `move` function calculates new player coordinates based on the chosen direction while ensuring that players remain within the grid boundaries. Player movement adds dynamic interaction to your game and is announced to all players and listeners.

### Player Attacks

Then you must implement the logic for player attacks: -->

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

`attack`関数は、攻撃エネルギーに基づいてダメージを計算し、プレイヤーのエネルギーを確認し、健康状態を適切に更新します。プレイヤーの攻撃は、ゲームにおける競争要素を追加し、プレイヤー同士が相互作用できるようにします。攻撃は、プレイヤーとリスナーに通知され、ゲームのリアルタイム更新を行います。

### ロジックの処理

最後に、ハンドラーを設定する必要があります：

<!-- The `attack` function calculates damage based on attack energy, checks player energy, and updates player health accordingly. Player attacks add the competitive element in your game, allowing players to engage with each other. The attacks are also announced to the players and listeners for real-time updates of the game.

### Handling the Logic

Lastly, you must setup handlers: -->

```lua
-- HANDLERS: Game state management for AO-Effect

-- Handler for player movement
Handlers.add("PlayerMove", { Action = "PlayerMove" }, move)

-- Handler for player attacks
Handlers.add("PlayerAttack", { Action = "PlayerAttack" }, attack)
```

以前のガイドで見たように、ハンドラーはそれぞれのパターンが満たされたときに関数をトリガーするのに役立ちます。

以下のドロップダウンで、`ao-effect.lua`の最終コードを参照できます：

<!-- As seen in earlier guides, the handlers help trigger functions when their respective patterns are met.

You can refer to the final code for `ao-effect.lua` in the dropdown below:
 -->
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

## 読み込みとテスト

ゲームコードを書き終えたら、それを`aos`ゲームプロセスに読み込み、ゲームをテストする時が来ました：

<!-- ## Loading and Testing

Once you've written your game code, it's time to load it into the `aos` game process and test your game: -->

```lua
.load ao-effect.lua
```

> [!Important]
> アリーナのブループリントも同じプロセスに読み込むことを忘れないでください。

友達を招待したり、テストプレイヤープロセスを作成して、ゲームを体験し、最適なパフォーマンスのために必要な調整を行ってください。

## 次のステップ

おめでとうございます！ アリーナの拡張に成功し、そのコア機能の上に独自のゲームを構築しました。このガイドで得た知識とツールを駆使して、今や独立して`aos`上でゲームを構築することができます。

可能性は無限大です。既存のゲームにさらに機能を追加したり、まったく新しいゲームを作成したりしてください。限界はありません！ ⌃◦🚀

<!-- > [!Important]
> Make sure to load the arena blueprint in the same process as well.

Invite friends or create test player processes to experience your game and make any necessary adjustments for optimal performance.

## What's Next

Congratulations! You've successfully expanded the arena by building your own game on top of its core functionalities. Armed with the knowledge and tools acquired in this guide, you're now equipped to build games on `aos` independently.

The possibilities are endless. Continue adding more features to existing games or create entirely new ones. The sky's the limit! ⌃◦🚀 -->
