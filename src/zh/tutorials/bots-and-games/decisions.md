# 战略决策

有了[最新游戏状态](game-state)的辅助，您的机器人就可以进化为 `自主代理`。 这一转变标志着功能的升级，不仅支持对游戏状态的响应，还可以根据上下文、能量和邻近度来制定决策的策略行为。

## 编写代码

返回到 `bot.lua` 文件并添加以下函数：

```lua
-- 确定两点之间的接近度。
function inRange(x1, y1, x2, y2, range)
    return math.abs(x1 - x2) <= range and math.abs(y1 - y2) <= range
end

-- 根据距离和能量来战略性地决定下一步行动。
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

`decideNextAction` 函数现在证明了我们的代理（机器人）基于对其环境的全面了解进行思考和行动的能力。 它会分析最新的游戏状态，如果您有足够的能量并且对手处于 `inRange`（攻击范围内），则进行攻击，否则进行移动。

现在再加个handler `handler` 即可确保该函数自行运行。

```lua
Handlers.add(
  "decideNextAction",
  Handlers.utils.hasMatchingTag("Action", "UpdatedGameState"),
  function ()
    if LatestGameState.GameMode ~= "Playing" then
      return
    end
    print("Deciding next action.")
    decideNextAction()
  end
)
```

最新游戏状态更新时，该handler被触发。 且仅当游戏处于 `Playing` 模式时才会执行操作。

您可以在下面的下拉展开块中参考 `bot.lua` 的最新代码：

<details>
  <summary><strong>更新后的 bot.lua 文件</strong></summary>

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
  Handlers.utils.hasMatchingTag("Action", "Announcement"),
  function (msg)
    ao.send({Target = Game, Action = "GetGameState"})
    print(msg.Event .. ": " .. msg.Data)
  end
)

Handlers.add(
  "UpdateGameState",
  Handlers.utils.hasMatchingTag("Action", "GameState"),
  function (msg)
    local json = require("json")
    LatestGameState = json.decode(msg.Data)
    ao.send({Target = ao.id, Action = "UpdatedGameState"})
  end
)

Handlers.add(
  "decideNextAction",
  Handlers.utils.hasMatchingTag("Action", "UpdatedGameState"),
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

## 加载和测试

再次，要测试最新的升级，请在 aos 玩家终端中加载文件，如下所示：

```lua
.load bot.lua
```

观察您的进程输出，以了解您的自主代理实时做出的决策，利用当前的游戏状态获得战略优势。 但是，如果在您决定下一步行动时另一个玩家攻击您并逃跑怎么办？ 在下一节中，您将学习在受到攻击后立即自动反击🤺
