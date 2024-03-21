# 整合在一起

本最终指南总结了我们的系列（教程），你已经逐步构建了一个自主代理。现在，让我们通过一些优化来完善你的代理，以微调其运行。 以下是关键改进的概述：

- **顺序命令执行：** `InAction` 标志的引入确保你的代理的操作是有序的（仅当上一个操作成功执行时才会发生下一个操作）。 这一重要的补充可以防止你的代理对过时的游戏状态采取行动，从而增强其响应能力和准确性。 完整的实现可以在下面的 `bot.lua` 文件的最终代码中找到。

```lua
InAction = InAction or false -- 防止代理同时执行多个操作。
```

- **动态状态更新和决策：** 代理现在采用自动计时逻辑，允许动态更新和决策。 这种逻辑使代理能够自触发状态更新，并在收到 Tick 消息或完成操作时做出后续决策，从而促进自主操作。

```lua
Handlers.add("GetGameStateOnTick", Handlers.utils.hasMatchingTag("Action", "Tick"), function ()
  if not InAction then
    InAction = true
    ao.send({Target = Game, Action = "GetGameState"})
  end
end)
```

- **自动费用转账：** 为了进一步简化其操作并确保不间断地参与游戏，自主代理现在自主处理入场费的转账。

```lua
Handlers.add("AutoPay", Handlers.utils.hasMatchingTag("Action", "AutoPay"), function ()
  ao.send({Target = Game, Action = "Transfer", Recipient = Game, Quantity = "1000"})
end)
```

除了这些功能之外，我们还添加了用于调试目的的日志记录功能和彩色打印以便更好地理解游戏事件。 这些增强功能共同使你的自主代理在游戏环境中更加高效且适应性更强。

你可以在下面的下拉展开块中参考 `bot.lua` 的完整代码，所有新增的内容都额外注释了：

<details>
  <summary><strong>更新后的 bot.lua 文件</strong></summary>

```lua
-- 初始化全局变量来存储最新的游戏状态和游戏主机进程。
LatestGameState = LatestGameState or nil
InAction = InAction or false -- 防止代理同时采取多个操作。

Logs = Logs or {}

colors = {
  red = "\27[31m",
  green = "\27[32m",
  blue = "\27[34m",
  reset = "\27[0m",
  gray = "\27[90m"
}

function addLog(msg, text) -- 函数定义注释用于性能，可用于调试
  Logs[msg] = Logs[msg] or {}
  table.insert(Logs[msg], text)
end

-- 检查两个点是否在给定范围内。
-- @param x1, y1: 第一个点的坐标
-- @param x2, y2: 第二个点的坐标
-- @param range: 点之间允许的最大距离
-- @return: Boolean 指示点是否在指定范围内
function inRange(x1, y1, x2, y2, range)
    return math.abs(x1 - x2) <= range and math.abs(y1 - y2) <= range
end

-- 根据玩家的距离和能量决定下一步行动。
-- 如果有玩家在范围内，则发起攻击； 否则，随机移动。
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
  InAction = false -- InAction 逻辑添加
end

-- 打印游戏公告并触发游戏状态更新的handler。
Handlers.add(
  "PrintAnnouncements",
  Handlers.utils.hasMatchingTag("Action", "Announcement"),
  function (msg)
    if msg.Event == "Started-Waiting-Period" then
      ao.send({Target = ao.id, Action = "AutoPay"})
    elseif (msg.Event == "Tick" or msg.Event == "Started-Game") and not InAction then
      InAction = true --  InAction 逻辑添加
      ao.send({Target = Game, Action = "GetGameState"})
    elseif InAction then --  InAction 逻辑添加
      print("Previous action still in progress. Skipping.")
    end
    print(colors.green .. msg.Event .. ": " .. msg.Data .. colors.reset)
  end
)

-- 触发游戏状态更新的handler。
Handlers.add(
  "GetGameStateOnTick",
  Handlers.utils.hasMatchingTag("Action", "Tick"),
  function ()
    if not InAction then -- InAction 逻辑添加
      InAction = true -- InAction 逻辑添加
      print(colors.gray .. "Getting game state..." .. colors.reset)
      ao.send({Target = Game, Action = "GetGameState"})
    else
      print("Previous action still in progress. Skipping.")
    end
  end
)

-- 等待期开始时自动付款确认的handler。
Handlers.add(
  "AutoPay",
  Handlers.utils.hasMatchingTag("Action", "AutoPay"),
  function (msg)
    print("Auto-paying confirmation fees.")
    ao.send({ Target = Game, Action = "Transfer", Recipient = Game, Quantity = "1000"})
  end
)

-- 接收游戏状态信息后更新游戏状态的handler。
Handlers.add(
  "UpdateGameState",
  Handlers.utils.hasMatchingTag("Action", "GameState"),
  function (msg)
    local json = require("json")
    LatestGameState = json.decode(msg.Data)
    ao.send({Target = ao.id, Action = "UpdatedGameState"})
    print("Game state updated. Print \'LatestGameState\' for detailed view.")
  end
)

-- 决策下一个最佳操作的handler。
Handlers.add(
  "decideNextAction",
  Handlers.utils.hasMatchingTag("Action", "UpdatedGameState"),
  function ()
    if LatestGameState.GameMode ~= "Playing" then
      InAction = false -- InAction 逻辑添加
      return
    end
    print("Deciding next action.")
    decideNextAction()
    ao.send({Target = ao.id, Action = "Tick"})
  end
)

-- 被其他玩家击中时自动攻击的handler。
Handlers.add(
  "ReturnAttack",
  Handlers.utils.hasMatchingTag("Action", "Hit"),
  function (msg)
    if not InAction then --  InAction 逻辑添加
      InAction = true --  InAction 逻辑添加
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
      InAction = false --  InAction 逻辑添加
      ao.send({Target = ao.id, Action = "Tick"})
    else
      print("Previous action still in progress. Skipping.")
    end
  end
)
```

</details>

## 下一步是什么？

你现在已经具备了构建智能自主代理的知识。 是时候将这些知识应用到游戏世界中了。 了解游戏的复杂性并利用你的代理的能力来统治竞技场。 但还有更多的事情要做。

在接下来的部分中，我们将更深入地研究游戏竞技场，提供高级策略来提高代理的性能。 准备好接受挑战了吗？ 让我们看看你能创造什么！ 🕹️
