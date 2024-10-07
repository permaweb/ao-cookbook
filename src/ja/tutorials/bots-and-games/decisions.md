<!-- # Strategic Decicions

With the [latest game state](game-state) at your disposal, your bot can evolve into an `autonomous agent`. This transition marks an upgrade in functionality, enabling not just reactions to game states but strategic actions that consider context, energy, and proximity to make decisions.

## Writing the Code

Return to your `bot.lua` file and add the following functions: -->

# 戦略的決定

[最新のゲーム状態](game-state)を利用して、あなたのボットは「自律エージェント」に進化することができます。この移行は機能の向上を示しており、ゲーム状態に反応するだけでなく、文脈、エネルギー、近接性を考慮して戦略的な行動を決定します。

## コードを書く

`bot.lua`ファイルに戻り、次の関数を追加します。

```lua
-- Determines proximity between two points.
function inRange(x1, y1, x2, y2, range)
    return math.abs(x1 - x2) <= range and math.abs(y1 - y2) <= range
end

-- Strategically decides on the next move based on proximity and energy.
function decideNextAction()
  local player = LatestGameState.Players[ao.id]
  local targetInRange = false

  for target, state in pairs(LatestGameState.Players) do
      if target ~= ao.id and inRange(player.x, player.y, state.x, state.y, 1) then
          targetInRange = true
          break
      end
  end

  if player.energy > 5 and targetInRange then
    print("Player in range. Attacking.")
    ao.send({Target = Game, Action = "PlayerAttack", Player = ao.id, AttackEnergy = tostring(player.energy)})
  else
    print("No player in range or insufficient energy. Moving randomly.")
    local directionMap = {"Up", "Down", "Left", "Right", "UpRight", "UpLeft", "DownRight", "DownLeft"}
    local randomIndex = math.random(#directionMap)
    ao.send({Target = Game, Action = "PlayerMove", Player = ao.id, Direction = directionMap[randomIndex]})
  end
end
```

The `decideNextAction`関数は、エージェントがその環境を包括的に理解した上で思考し、行動する能力を証明するものとなりました。この関数は、最新のゲーム状態を分析し、エネルギーが十分で、かつ相手が`inRange`にいる場合に攻撃するか、そうでない場合は移動します。

この関数が自動的に実行されるようにするためには、ハンドラーが必要です。

<!-- The `decideNextAction` function is now a testament to our agent's ability to think and act based on a comprehensive understanding of its environment. It analyzes the latest game state to either attack if you have sufficient energy and an opponent is `inRange` or move otherwise.

Now all you need is a handler to make sure this function runs on its own. -->

```lua
Handlers.add(
  "decideNextAction",
  { Action = "UpdatedGameState" },
  function ()
    if LatestGameState.GameMode ~= "Playing" then
      return
    end
    print("Deciding next action.")
    decideNextAction()
  end
)
```

このハンドラーは、最新のゲーム状態が取得され更新されたことを示すメッセージを受信した際にトリガーされます。アクションは、ゲームが`Playing`モードのときのみ実行されます。

以下のドロップダウンで、`bot.lua`の最新のコードを参照できます：

<!--
This handler triggers upon receiving a message that the latest game state has been fetched and updated. An action is taken only when the game is in `Playing` mode.

You can refer to the latest code for `bot.lua` in the dropdown below: -->

<details>
  <summary><strong>Updated bot.lua file</strong></summary>

```lua
LatestGameState = LatestGameState or nil

function inRange(x1, y1, x2, y2, range)
    return math.abs(x1 - x2) <= range and math.abs(y1 - y2) <= range
end

function decideNextAction()
  local player = LatestGameState.Players[ao.id]
  local targetInRange = false

  for target, state in pairs(LatestGameState.Players) do
      if target ~= ao.id and inRange(player.x, player.y, state.x, state.y, 1) then
          targetInRange = true
          break
      end
  end

  if player.energy > 5 and targetInRange then
    print("Player in range. Attacking.")
    ao.send({Target = Game, Action = "PlayerAttack", Player = ao.id, AttackEnergy = tostring(player.energy)})
  else
    print("No player in range or insufficient energy. Moving randomly.")
    local directionMap = {"Up", "Down", "Left", "Right", "UpRight", "UpLeft", "DownRight", "DownLeft"}
    local randomIndex = math.random(#directionMap)
    ao.send({Target = Game, Action = "PlayerMove", Player = ao.id, Direction = directionMap[randomIndex]})
  end
end

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
end
)

Handlers.add(
"decideNextAction",
{ Action = "UpdatedGameState" },
function ()
  if LatestGameState.GameMode ~= "Playing" then
    return
  end
  print("Deciding next action.")
  decideNextAction()
end
)
```

</details>

## ローディングとテスト

もう一度、最新のアップグレードをテストするために、次のようにしてファイルをあなたの aos プレイヤー端末にロードします：

<!-- ## Loading and Testing

Once again, to test out the latest upgrades, load the file in your aos player terminal as follows: -->

```lua
.load bot.lua
```

<!-- Observe your process output to see the decisions your autonomous agent makes in real-time, leveraging the current game state for strategic advantage. But what if another player attacks you and runs away while you are deciding the next move? In the next section you'll learn to automatically counter as soon as you have been attacked 🤺 -->

あなたのプロセスの出力を観察して、自律エージェントがリアルタイムでどのように決定を下すかを確認してください。しかし、別のプレイヤーが攻撃し、あなたが次の動きを決定している間に逃げてしまったらどうしますか？次のセクションでは、攻撃された瞬間に自動的に反撃する方法を学びます🤺
