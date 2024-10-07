# 自動応答

前回の[ガイド](decisions)を経て、私たちの創造物は単純なボットから洗練された自律エージェントへと進化しました。今回は、カウンターアタック機能を追加してその能力をさらに強化し、相手の攻撃に対して即座に反撃できるようにします。これにより、相手が安全な場所に逃げる前に驚かせる可能性があります。

## コードを書く

次のハンドラーを`bot.lua`ファイルに追加すれば準備完了です。

<!-- # Automated Responses

Following our [last guide](decisions), our creation has progressed from a simple bot to a sophisticated autonomous agent. Now, let's further enhance its capabilities by adding a counterattack feature, allowing it to instantly retaliate against an opponent's attack, potentially catching them off-guard before they can retreat to safety.

## Writing the code

Add the following handler to your `bot.lua` file and you're set: -->

```lua
-- Handler to automatically attack when hit by another player.
Handlers.add(
  "ReturnAttack",
  { Action = "Hit" },
  function (msg)
      local playerEnergy = LatestGameState.Players[ao.id].energy
      if playerEnergy == undefined then
        print("Unable to read energy.")
        ao.send({Target = Game, Action = "Attack-Failed", Reason = "Unable to read energy."})
      elseif playerEnergy == 0 then
        print("Player has insufficient energy.")
        ao.send({Target = Game, Action = "Attack-Failed", Reason = "Player has no energy."})
      else
        print("Returning attack.")
        ao.send({Target = Game, Action = "PlayerAttack", Player = ao.id, AttackEnergy = tostring(playerEnergy)})
      end
      InAction = false
      ao.send({Target = ao.id, Action = "Tick"})
  end
)
```

プレイヤーが攻撃されると、Action `Hit`のメッセージを受け取ります。この設定により、エージェントは十分なエネルギーがある限り迅速にカウンターアタックを行うことができます。

最新の`bot.lua`コードを以下のドロップダウンで参照できます。

<!-- Whenever your player is under attack you receive a message with the Action `Hit`. This setup ensures your agent can make a swift counter attack, given it has sufficient energy.

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
  { Action =  "Announcement" },
  function (msg)
    ao.send({Target = Game, Action = "GetGameState"})
    print(msg.Event .. ": " .. msg.Data)
  end
)

Handlers.add(
  "UpdateGameState",
  { Action =  "GameState" },
  function (msg)
    local json = require("json")
    LatestGameState = json.decode(msg.Data)
    ao.send({Target = ao.id, Action = "UpdatedGameState"})
  end
)

Handlers.add(
  "decideNextAction",
  { Action =  "UpdatedGameState" },
  function ()
    if LatestGameState.GameMode ~= "Playing" then
      return
    end
    print("Deciding next action.")
    decideNextAction()
  end
)

Handlers.add(
  "ReturnAttack",
  { Action =  "Hit" },
  function (msg)
      local playerEnergy = LatestGameState.Players[ao.id].energy
      if playerEnergy == undefined then
        print("Unable to read energy.")
        ao.send({Target = Game, Action = "Attack-Failed", Reason = "Unable to read energy."})
      elseif playerEnergy == 0 then
        print("Player has insufficient energy.")
        ao.send({Target = Game, Action = "Attack-Failed", Reason = "Player has no energy."})
      else
        print("Returning attack.")
        ao.send({Target = Game, Action = "PlayerAttack", Player = ao.id, AttackEnergy = tostring(playerEnergy)})
      end
      InAction = false
      ao.send({Target = ao.id, Action = "Tick"})
  end
)
```

</details>

## ローディングとテスト

カウンターアタック機能を有効化しテストするために、aosプレイヤーターミナルでボットファイルをロードします。

<!-- ## Loading and Testing

To activate and test the counter attack feature, load the bot file in your aos player terminal: -->

```lua
.load bot.lua
```

ターミナルで自律エージェントの反応を観察してください。今や、即座に反撃する能力が追加されています。この機能は、エージェントの進化した戦略的深さと自律性を示しています。次のセクションでは、これまでに集めたすべての知識を統合し、最適化のための機能を追加します。

<!-- Watch your terminal for the autonomous agent's reactions, now with the added ability to retaliate instantly. This feature showcases the agent's evolving strategic depth and autonomy. In the upcoming section, we'll consolidate all the knowledge we've gathered so far and add some features for optimization. -->
