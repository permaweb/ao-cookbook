# Bringing it Together

この最終ガイドでは、シリーズを締めくくります。ここでは、あなたが自律エージェントを少しずつ構築してきました。さて、エージェントの動作を最適化することで、その精度を高めていきましょう。ここでは、主な改善点の概要を示します。

- **順次コマンド実行:** `InAction`フラグの導入により、エージェントのアクションが順次実行されるようになりました（前のアクションが成功裏に実行されたときのみ次のアクションが発生します）。この重要な追加により、エージェントが古いゲーム状態に基づいて行動することが防止され、反応性と正確性が向上しました。最終的な`bot.lua`ファイルのコードは以下に示します。

<!-- # Bringing it Together

This final guide wraps up our series, where you've built up an autonomous agent piece by piece. Now, let's refine your agent with some optimizations that fine-tune its operations. Here's a quick overview of the key improvements made:

- **Sequential Command Execution:** The introduction of an `InAction` flag ensures that your agent's actions are sequential (next action occurs only when the previous is successfully executed). This critical addition prevents your agent from acting on outdated game states, enhancing its responsiveness and accuracy. The full implementation can be found in the final code for the `bot.lua` file below. -->

```lua
InAction = InAction or false -- Prevents the agent from taking multiple actions at once.
```

<!-- - **Dynamic State Updates and Decisions:** The agent now employs an automatic tick logic, allowing for dynamic updates and decisions. This logic enables the agent to self-trigger state updates and make subsequent decisions either upon receiving a Tick message or upon completing an action, promoting autonomous operation. -->

- **動的な状態更新と意思決定:** エージェントは現在、自動ティックロジックを採用しており、動的な更新と意思決定が可能になりました。このロジックにより、エージェントは状態更新を自動的にトリガーし、ティックメッセージを受信するか、アクションを完了した際に次の決定を行うことができ、独立した操作が促進されます。

```lua
Handlers.add("GetGameStateOnTick", { Action = "Tick" }, function ()
  if not InAction then
    InAction = true
    ao.send({Target = Game, Action = "GetGameState"})
  end
end)
```

- **自動手数料転送:** 操作をさらに効率化し、ゲームへの参加が途切れないようにするために、自律エージェントは確認手数料の転送を自動的に処理します。

<!-- - **Automated Fee Transfer:** To further streamline its operation and ensure uninterrupted participation in games, the autonomous agent now autonomously handles the transfer of confirmation fees. -->

```lua
Handlers.add("AutoPay", { Action = "AutoPay" }, function ()
  ao.send({Target = Game, Action = "Transfer", Recipient = Game, Quantity = "1000"})
end)
```

これらの機能に加えて、デバッグ目的のためにロギング機能を追加し、ゲームイベントの理解を向上させるためにカラープリントも導入しました。これらの強化により、あなたの自律エージェントはゲーム環境でより効率的かつ適応性を持つものとなります。

新たに追加された機能が強調された完全な`bot.lua`コードを以下のドロップダウンで確認してください。

<!-- In addition to these features, we've also added a logging function for debugging purposes and colored prints for better comprehension of game events. These enhancements collectively make your autonomous agent more efficient and adaptable in the game environment.
 -->
<!-- Check out the complete bot.lua code in the dropdown below, with all new additions highlighted accordingly: -->

<details>
  <summary><strong>Updated bot.lua file</strong></summary>

```lua
-- Initializing global variables to store the latest game state and game host process.
LatestGameState = LatestGameState or nil
InAction = InAction or false -- Prevents the agent from taking multiple actions at once.

Logs = Logs or {}

colors = {
  red = "\27[31m",
  green = "\27[32m",
  blue = "\27[34m",
  reset = "\27[0m",
  gray = "\27[90m"
}

function addLog(msg, text) -- Function definition commented for performance, can be used for debugging
  Logs[msg] = Logs[msg] or {}
  table.insert(Logs[msg], text)
end

-- Checks if two points are within a given range.
-- @param x1, y1: Coordinates of the first point.
-- @param x2, y2: Coordinates of the second point.
-- @param range: The maximum allowed distance between the points.
-- @return: Boolean indicating if the points are within the specified range.
function inRange(x1, y1, x2, y2, range)
    return math.abs(x1 - x2) <= range and math.abs(y1 - y2) <= range
end

-- Decides the next action based on player proximity and energy.
-- If any player is within range, it initiates an attack; otherwise, moves randomly.
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
    print(colors.red .. "Player in range. Attacking." .. colors.reset)
    ao.send({Target = Game, Action = "PlayerAttack", Player = ao.id, AttackEnergy = tostring(player.energy)})
  else
    print(colors.red .. "No player in range or insufficient energy. Moving randomly." .. colors.reset)
    local directionMap = {"Up", "Down", "Left", "Right", "UpRight", "UpLeft", "DownRight", "DownLeft"}
    local randomIndex = math.random(#directionMap)
    ao.send({Target = Game, Action = "PlayerMove", Player = ao.id, Direction = directionMap[randomIndex]})
  end
  InAction = false -- InAction logic added
end

-- Handler to print game announcements and trigger game state updates.
Handlers.add(
  "PrintAnnouncements",
  { Action = "Announcement" },
  function (msg)
    if msg.Event == "Started-Waiting-Period" then
      ao.send({Target = ao.id, Action = "AutoPay"})
    elseif (msg.Event == "Tick" or msg.Event == "Started-Game") and not InAction then
      InAction = true -- InAction logic added
      ao.send({Target = Game, Action = "GetGameState"})
    elseif InAction then -- InAction logic added
      print("Previous action still in progress. Skipping.")
    end
    print(colors.green .. msg.Event .. ": " .. msg.Data .. colors.reset)
  end
)

-- Handler to trigger game state updates.
Handlers.add(
  "GetGameStateOnTick",
  { Action =  "Tick" },
  function ()
    if not InAction then -- InAction logic added
      InAction = true -- InAction logic added
      print(colors.gray .. "Getting game state..." .. colors.reset)
      ao.send({Target = Game, Action = "GetGameState"})
    else
      print("Previous action still in progress. Skipping.")
    end
  end
)

-- Handler to automate payment confirmation when waiting period starts.
Handlers.add(
  "AutoPay",
  { Action =  "AutoPay" },
  function (msg)
    print("Auto-paying confirmation fees.")
    ao.send({ Target = Game, Action = "Transfer", Recipient = Game, Quantity = "1000"})
  end
)

-- Handler to update the game state upon receiving game state information.
Handlers.add(
  "UpdateGameState",
  { Action =  "GameState" },
  function (msg)
    local json = require("json")
    LatestGameState = json.decode(msg.Data)
    ao.send({Target = ao.id, Action = "UpdatedGameState"})
    print("Game state updated. Print \'LatestGameState\' for detailed view.")
  end
)

-- Handler to decide the next best action.
Handlers.add(
  "decideNextAction",
  { Action =  "UpdatedGameState" },
  function ()
    if LatestGameState.GameMode ~= "Playing" then
      InAction = false -- InAction logic added
      return
    end
    print("Deciding next action.")
    decideNextAction()
    ao.send({Target = ao.id, Action = "Tick"})
  end
)

-- Handler to automatically attack when hit by another player.
Handlers.add(
  "ReturnAttack",
  { Action =  "Hit" },
  function (msg)
    if not InAction then -- InAction logic added
      InAction = true -- InAction logic added
      local playerEnergy = LatestGameState.Players[ao.id].energy
      if playerEnergy == undefined then
        print(colors.red .. "Unable to read energy." .. colors.reset)
        ao.send({Target = Game, Action = "Attack-Failed", Reason = "Unable to read energy."})
      elseif playerEnergy == 0 then
        print(colors.red .. "Player has insufficient energy." .. colors.reset)
        ao.send({Target = Game, Action = "Attack-Failed", Reason = "Player has no energy."})
      else
        print(colors.red .. "Returning attack." .. colors.reset)
        ao.send({Target = Game, Action = "PlayerAttack", Player = ao.id, AttackEnergy = tostring(playerEnergy)})
      end
      InAction = false -- InAction logic added
      ao.send({Target = ao.id, Action = "Tick"})
    else
      print("Previous action still in progress. Skipping.")
    end
  end
)
```

</details>

## 次は何か？

あなたは今、知識を持ってインテリジェントな自律エージェントを作成する準備が整いました。これらの洞察をゲームの世界に応用する時です。ゲームの複雑さを理解し、あなたのエージェントの能力を駆使してアリーナを制覇しましょう。しかし、まだまだ続きがあります。

今後のセクションでは、ゲームアリーナにさらに深く入り込み、エージェントのパフォーマンスを向上させるための高度な戦略を提供します。挑戦を受けて立つ準備はできていますか？あなたが何を創造できるか見てみましょう！ 🕹️

<!-- ## What's next?

You're now equipped with the knowledge to craft intelligent autonomous agents. It's time to apply these insights into the game world. Understand the game's intricacies and leverage your agent's capabilities to dominate the arena. But there's more to come.

In future sections, we'll dive deeper into the game arena, offering advanced strategies to elevate your agent's performance. Ready to take on the challenge? Let's see what you can create! 🕹️ -->
