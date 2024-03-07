# 竞技场机制

本指南全面概述了在 `aos` 中设计和管理竞技场风格游戏所必需的基本机制。在竞技场游戏中，参与者进行回合比赛，有策略地相互竞争以消灭对方，直到出现唯一的胜利者。

这里介绍的框架为制作各种游戏奠定了基础，所有游戏都共享相同的核心功能。 探索游戏开发的复杂性，并在这个多功能的舞台上释放您的创造力。

## 核心功能

现在，让我们深入了解竞技场风格游戏的核心功能：

1. **游戏进展模式：**

   竞技场游戏被打造为循环运行的回合，具有以下进展模式：`"Not-Started"` → `"Waiting"` → `"Playing"` → `[Someone wins or timeout]` → `"Waiting"`...

   > 注意：如果等待状态后没有足够的玩家开始游戏，则循环超时。

   回合为玩家提供了明确的参与时间范围，从而增强了游戏的刺激性。

2. **代币质押：**

   玩家必须存入指定数量的代币（由 `PaymentQty` 定义）才能参与游戏。 这些代币为游戏添加了有形的赌注元素。

3. **奖金奖励：**

   除了胜利的兴奋之外，玩家还被额外奖励的前景所吸引。 构建者可以灵活地提供由 `BonusQty` 定义的奖励代币，每轮分配。 玩家所下的任何赌注也会添加到这些奖金中。 这些奖金作为额外的激励，增强了游戏的竞争精神。

4. **玩家管理：**

   - 等待加入下一场比赛的玩家会在 `Waiting` 表中进行跟踪。
   - 正在比赛的玩家及其游戏状态存储在 `Players` 表中。
   - 被淘汰的玩家会立即从 `Players` 表中删除，并放入 `Waiting` 表中进行下一场比赛。

5. **每轮获胜者奖励：**

   当一个玩家淘汰另一个玩家时，他们不仅可以获得吹牛的权利，还可以获得被淘汰玩家的质押代币作为奖励。 此外，每轮的获胜者都会分享一部分奖金代币以及他们的原始质押的代币，进一步激励玩家争取胜利。

6. **监听器模式：**

   对于那些喜欢观看行动展开的人来说，`Listen` 模式提供了一个无需实际参与即可了解情况的机会。 进程可以注册为侦听器，授予它们访问游戏中所有公告的权限。 虽然他们不作为玩家参与，但听众可以继续观察游戏的进度，除非他们明确要求删除。

7. **游戏状态管理：**

   为了维持竞技场游戏的流畅性和公平性，自动化系统会监督游戏状态的转换。 这些转换包括等待、游戏中和结束阶段。 每个状态的持续时间（例如 `WaitTime` 和 `GameTime`）可确保回合遵守定义的时间范围，从而防止游戏无限期地持续。

您可以在下面的下拉展开块中参考竞技场的代码：

<details>
  <summary><strong>竞技场游戏蓝图</strong></summary>

```lua

-- 竞技场游戏蓝图。

-- 该蓝图提供了在 ao 进程内运行 `竞技场` 风格游戏的框架。
-- 游戏以回合形式进行，玩家的目标是互相消灭，直到只剩下一个，或者直到比赛时间结束。
-- 游戏进程会随着玩家的加入和离开而无限循环。

-- 当一个玩家淘汰另一个玩家时，他们会收到被淘汰玩家的质押代币作为奖励。
-- 此外，建造者可以提供这些代币的奖励作为每轮额外的激励分配。
-- 如果游戏中的目标玩家类型是机器人，提供额外的`奖励`创造让程序员争相生产最佳代理来`挖`到进程的代币的机会

-- 建造者还可以在他们的游戏逻辑中控制框架, 提供类似这样的处理程序：允许玩家执行游戏中的动作，在适当的时刻调用 `eliminatePlayer()`。

-- 进程还可以在 `监听` 模式下注册，在该模式下它们将接收游戏中的所有公告，但他们自己不加入本轮对战。
-- 除非他们明确要求，否则他们也不会取消注册。

-- 全局变量。

-- 一轮循环包含的游戏进度模式：

-- [Not-Started] -> Waiting -> Playing -> [Someone wins or timeout] -> Waiting...
-- 在等待状态之后如果还没有足够玩家则此循环结束。
GameMode = GameMode or "Not-Started"
StateChangeTime = StateChangeTime or undefined

-- 状态持续时间 （毫秒）
WaitTime = WaitTime or 2 * 60 * 1000 -- 2 分钟
GameTime = GameTime or 20 * 60 * 1000 -- 20 分钟
Now = Now or undefined -- 当前时间，每条消息更新一次。

-- 玩家质押的代币信息。
UNIT = 1000
PaymentToken = PaymentToken or "ADDR"  -- 代币地址
PaymentQty = PaymentQty or tostring(math.floor(UNIT))    -- 注册需要的代币数量
BonusQty = BonusQty or tostring(math.floor(UNIT))        -- 赢家的代币奖金数量

-- 等待进入下一轮游戏的玩家及其支付状态。
Waiting = Waiting or {}
-- 已激活玩家及其状态。
Players = Players or {}
-- 当前游戏的赢家数量。
Winners = 0
-- 订阅了游戏公告的进程。
Listeners = Listeners or {}
-- 开始一个游戏的最小玩家数。
MinimumPlayers = MinimumPlayers or 2

-- 玩家默认状态初始化。
PlayerInitState = PlayerInitState or {}

-- 向所有注册的侦听器发送状态更改公告。
-- @param event: 事件类型或名称。
-- @param description: 事件描述。
function announce(event, description)
    for ix, address in pairs(Listeners) do
        ao.send({
            Target = address,
            Action = "Announcement",
            Event = event,
            Data = description
        })
    end
    return print(Colors.gray .. "Announcement: " .. Colors.red .. event .. " " .. Colors.blue .. description .. Colors.reset)
end

-- 给玩家发送奖励。
-- @param recipient: 获得奖励的玩家。
-- @param qty: 奖励数量。
-- @param reason: 奖励原因。
function sendReward(recipient, qty, reason)
    if type(qty) ~= number then
      qty = tonumber(qty)
    end
    ao.send({
        Target = PaymentToken,
        Action = "Transfer",
        Quantity = tostring(qty),
        Recipient = recipient,
        Reason = reason
    })
    return print(Colors.gray .. "Sent Reward: " ..
      Colors.blue .. tostring(qty) ..
      Colors.gray .. ' tokens to ' ..
      Colors.green .. recipient .. " " ..
      Colors.blue .. reason .. Colors.reset
    )
end

-- 开始玩家准备玩游戏的倒计时。
function startWaitingPeriod()
    GameMode = "Waiting"
    StateChangeTime = Now + WaitTime
    announce("Started-Waiting-Period", "The game is about to begin! Send your token to take part.")
    print('Starting Waiting Period')
end

-- 如果有足够的玩家，则开始游戏。
function startGamePeriod()
    local paidPlayers = 0
    for player, hasPaid in pairs(Waiting) do
        if hasPaid then
            paidPlayers = paidPlayers + 1
        end
    end

    if paidPlayers < MinimumPlayers then
        announce("Not-Enough-Players", "Not enough players registered! Restarting...")
        for player, hasPaid in pairs(Waiting) do
            if hasPaid then
                Waiting[player] = false
                sendReward(player, PaymentQty, "Refund")
            end
        end
        startWaitingPeriod()
        return
    end

    LastTick = undefined
    GameMode = "Playing"
    StateChangeTime = Now + GameTime
    for player, hasPaid in pairs(Waiting) do
        if hasPaid then
            Players[player] = playerInitState()
        else
            ao.send({
                Target = player,
                Action = "Ejected",
                Reason = "Did-Not-Pay"
            })
            removeListener(player) -- 如果玩家未付款，则将其从监听器中删除
        end
    end
    announce("Started-Game", "The game has started. Good luck!")
    print("Game Started....")
end

-- 从游戏中淘汰玩家的处理程序。
-- @param eliminated: 要被淘汰的玩家。
-- @param eliminator: 发起淘汰的玩家。
function eliminatePlayer(eliminated, eliminator)
    sendReward(eliminator, PaymentQty, "Eliminated-Player")
    Waiting[eliminated] = false
    Players[eliminated] = nil

    ao.send({
        Target = eliminated,
        Action = "Eliminated",
        Eliminator = eliminator
    })

    announce("Player-Eliminated", eliminated .. " was eliminated by " .. eliminator .. "!")

    local playerCount = 0
    for player, _ in pairs(Players) do
        playerCount = playerCount + 1
    end
    print("Eliminating player: " .. eliminated .. " by: " .. eliminator) -- 对于跟踪淘汰很有用

    if playerCount < MinimumPlayers then
        endGame()
    end

end

-- 结束当前游戏并开始一个新的。
function endGame()
    print("Game Over")

    Winners = 0
    Winnings = tonumber(BonusQty) / Winners -- 计算每位玩家的奖金

    for player, _ in pairs(Players) do
        Winners = Winners + 1
    end

    Winnings = tonumber(BonusQty) / Winners

    for player, _ in pairs(Players) do
        -- addLog("EndGame", "Sending reward of:".. Winnings + PaymentQty .. "to player: " .. player) -- Useful for tracking rewards
        sendReward(player, Winnings + tonumber(PaymentQty), "Win")
        Waiting[player] = false
    end

    Players = {}
    announce("Game-Ended", "Congratulations! The game has ended. Remaining players at conclusion: " .. Winners .. ".")
    startWaitingPeriod()
end

-- 从监听器列表移除一个监听器。
-- @param listener: 待移除的监听器。
function removeListener(listener)
    local idx = 0
    for i, v in ipairs(Listeners) do
        if v == listener then
            idx = i
            break
        end
    end
    if idx > 0 then
        table.remove(Listeners, idx)
    end
end

-- 处理程序: 游戏状态管理

-- 定时消息处理程序，管理游戏状态切换。
Handlers.add(
    "Game-State-Timers",
    function(Msg)
        return "continue"
    end,
    function(Msg)
        Now = Msg.Timestamp
        if GameMode == "Not-Started" then
            startWaitingPeriod()
        elseif GameMode == "Waiting" then
            if Now > StateChangeTime then
                startGamePeriod()
            end
        elseif GameMode == "Playing" then
            if onTick and type(onTick) == "function" then
              onTick()
            end
            if Now > StateChangeTime then
                endGame()
            end
        end
    end
)

-- 玩家质押以参与下一轮游戏的处理程序。
Handlers.add(
    "Transfer",
    function(Msg)
        return
            Msg.Action == "Credit-Notice" and
            Msg.From == PaymentToken and
            tonumber(Msg.Quantity) >= tonumber(PaymentQty) and "continue"
    end,
    function(Msg)
        Waiting[Msg.Sender] = true
        ao.send({
            Target = Msg.Sender,
            Action = "Payment-Received"
        })
        announce("Player-Ready", Msg.Sender .. " is ready to play!")
    end
)

-- 为下轮游戏注册新玩家并为其订阅事件信息。
Handlers.add(
    "Register",
    Handlers.utils.hasMatchingTag("Action", "Register"),
    function(Msg)
        if Msg.Mode ~= "Listen" and Waiting[Msg.From] == undefined then
            Waiting[Msg.From] = false
        end
        removeListener(Msg.From)
        table.insert(Listeners, Msg.From)
        ao.send({
            Target = Msg.From,
            Action = "Registered"
        })
        announce("New Player Registered", Msg.From .. " has joined in waiting.")
    end
)

-- 注销玩家并停止向他们发送事件信息。
Handlers.add(
    "Unregister",
    Handlers.utils.hasMatchingTag("Action", "Unregister"),
    function(Msg)
        removeListener(Msg.From)
        ao.send({
            Target = Msg.From,
            Action = "Unregistered"
        })
    end
)

-- 将投注金额添加到 BonusQty
Handlers.add(
    "AddBet",
    Handlers.utils.hasMatchingTag("Reason", "AddBet"),
    function(Msg)
        BonusQty = tonumber(BonusQty) + tonumber(Msg.Tags.Quantity)
        announce("Bet-Added", Msg.From .. "has placed a bet. " .. "BonusQty amount increased by " .. Msg.Tags.Quantity .. "!")
    end
)

-- 检索当前游戏状态。
Handlers.add(
    "GetGameState",
    Handlers.utils.hasMatchingTag("Action", "GetGameState"),
    function (Msg)
        local json = require("json")
        local TimeRemaining = StateChangeTime - Now
        local GameState = json.encode({
            GameMode = GameMode,
            TimeRemaining = TimeRemaining,
            Players = Players,
            })
        ao.send({
            Target = Msg.From,
            Action = "GameState",
            Data = GameState})
    end
)

-- 提醒用户每个游戏状态的剩余时间。
Handlers.add(
    "AnnounceTick",
    Handlers.utils.hasMatchingTag("Action", "Tick"),
    function (Msg)
        local TimeRemaining = StateChangeTime - Now
        if GameMode == "Waiting" then
            announce("Tick", "The game will start in " .. (TimeRemaining/1000) .. " seconds.")
        elseif GameMode == "Playing" then
            announce("Tick", "The game will end in " .. (TimeRemaining/1000) .. " seconds.")
        end
    end
)

-- 根据请求向没有余额的玩家发送代币
Handlers.add(
    "RequestTokens",
    Handlers.utils.hasMatchingTag("Action", "RequestTokens"),
    function (Msg)
        print("Transfering Tokens: " .. tostring(math.floor(10000 * UNIT)))
        ao.send({
            Target = ao.id,
            Action = "Transfer",
            Quantity = tostring(math.floor(10000 * UNIT)),
            Recipient = Msg.From,
        })
    end
)
```

</details>

## 竞技场游戏蓝图

对于那些有兴趣使用此 arena 框架的人，我们已通过蓝图轻松访问此代码。 只需在终端中运行以下代码：

```lua
.load-blueprint arena
```

## 总结

了解竞技场的机制不仅可以帮助您改进上一节中创建的自主代理，还可以让您利用核心功能来打造独特的游戏。

在接下来的 `Building a Game` 部分中，我们将深入探讨利用这些机制在此框架内构建迷人且独一无二的游戏的艺术。 准备好踏上游戏开发动态领域的旅程吧！ 🎮
