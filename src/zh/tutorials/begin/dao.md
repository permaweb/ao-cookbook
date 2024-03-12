# DAO 指南

本指南将带您完成使用 aos 构建 DAO 的过程。如果您还没有，您需要首先在 aos 中构建一个 [代币](token)。 我们会将 DAO 代码与 [token](./token) 指南中的令牌代码一起加载到 aos 中。 在 ao 的上下文中，DAO 可用于管理 MU、CU 和 SU 节点。

在我们的 DAO 中，我们将实施一个称为 `slashing` 的进程。 在 ao 的情况下，如果一个单位行为不当，其他单位可能会投票削减它。 削减意味着他们将失去他们的质押，我们稍后将进一步讨论质押的话题。

创建一个名为 `dao` 的新目录，并将其复制到代币指南中创建的 `token.lua` 中。

```sh
mkdir dao
cd dao
cp ../token/token.lua .
```

现在创建一个名为 `dao.lua` 的新文件并在您喜欢的编辑器中打开它。

## 编写 DAO 代码

### 初始化状态

打开 `dao.lua` 并添加以下行

```lua
Balances = Balances or {}
Stakers = Stakers or {}
Unstaking = Unstaking or {}
Votes = Votes or {}
```

这些表存储 DAO 的状态，包括用户余额、质押代币、取消质押请求和投票记录。

### 质押

质押是放置您的代币以使您能够投票的过程。 如果有人希望获得投票能力，他们必须拥有并抵押一些代币。让我们添加一个用于质押的handler。 ao 中的成员或节点如果想要获得投票削减或保留节点的能力，他们就会想要进行质押，我们将在稍后进一步讨论。

```lua
-- 质押动作handler
Handlers.stake = function(msg)
    local quantity = tonumber(msg.Tags.Quantity)
    local delay = tonumber(msg.Tags.UnstakeDelay)
    local height = tonumber(msg['Block-Height'])
    assert(Balances[msg.From] and Balances[msg.From] >= quantity, "Insufficient balance to stake")
    Balances[msg.From] = Balances[msg.From] - quantity
    Stakers[msg.From] = Stakers[msg.From] or {}
    Stakers[msg.From].amount = (Stakers[msg.From].amount or 0) + quantity
    Stakers[msg.From].unstake_at = height + delay
end
```

上面的代码从传入消息中获取数量和延迟，如果 `From` 有足够的余额，则将质押放入 Stakers 表中。 延迟代表未来可以取消质押代币的时间。

### 取消质押

取消质押是撤回质押代币的过程。 如果有人取消了所有代币的质押，他们将放弃投票的能力。在这里，我们提供了一个取消质押的handler。

```lua
-- 取消质押动作handler
Handlers.unstake = function(msg)
    local quantity = tonumber(msg.Tags.Quantity)
    local stakerInfo = Stakers[msg.From]
    assert(stakerInfo and stakerInfo.amount >= quantity, "Insufficient staked amount")
    stakerInfo.amount = stakerInfo.amount - quantity
    Unstaking[msg.From] = {
        amount = quantity,
        release_at = stakerInfo.unstake_at
    }
end
```

这会将来自消息的传入金额推送到取消抵押表中，并减少他们抵押的金额 `stakerInfo.amount = voterInfo.amount - amount`。

### 投票

投票是管理 DAO 的过程。发送投票消息后，成员会收到与他们质押金额成比例的投票。截止日期变量表示何时进行投票。

```lua
-- 投票动作handler
Handlers.vote = function(msg)
    local quantity = Stakers[msg.From].amount
    local target = msg.Tags.Target
    local side = msg.Tags.Side
    local deadline = tonumber(msg['Block-Height']) + tonumber(msg.Tags.Deadline)
    assert(quantity > 0, "No staked tokens to vote")
    Votes[target] = Votes[target] or { yay = 0, nay = 0, deadline = deadline }
    Votes[target][side] = Votes[target][side] + quantity
end
```

在这里，如果发送投票的进程或用户有一些代币，他们可以在投票表中放置一个条目。 `side` 是或否，设置为他们的股份数量。在我们的示例中，`nay` 票是对削减的投票，`yay` 票是对保留的投票。

发送的 msg.Tags.Target 代表正在投票的内容。 在 AO 的情况下，这可能是成员投票削减的 MU、CU 或 SU 的钱包地址。

### 最终确定

我们希望在每条消息上运行一些逻辑。 我们将其定义为 `finalizationHandler`。被削减意味着你将失去在 DAO 中的质押。

```lua
-- Finalization handler
local finalizationHandler = function(msg)
  local currentHeight = tonumber(msg['Block-Height'])
  -- 处理取消质押
  for address, unstakeInfo in pairs(Unstaking) do
      if currentHeight >= unstakeInfo.release_at then
          Balances[address] = (Balances[address] or 0) + unstakeInfo.amount
          Unstaking[address] = nil
      end
  end
  -- 处理投票
  for target, voteInfo in pairs(Votes) do
      if currentHeight >= voteInfo.deadline then
          if voteInfo.nay > voteInfo.yay then
              -- 取消目标的质押
              local slashedAmount = Stakers[target] and Stakers[target].amount or 0
              Stakers[target].amount = 0
          end
          -- 在处理结束后清理投票记录
          Votes[target] = nil
      end
  end
end
```

### 将handler附加到传入消息标签

这里我们添加了一个名为 `continue` 的辅助函数，它将允许我们在每条消息上执行到 `finalizationHandler`。

```lua
-- 包装函数以继续handler流程
function continue(fn)
    return function (msg)
      local result = fn(msg)
      if (result) == -1 then
        return 1
      end
      return result
    end
end
```

最后，我们将注册所有handler并将它们包装在 `continue` 中，以便每个 Stake、Unstake 和 Vote 消息都会被 `finalizationHandler` 处理到。

```lua
-- 注册handler
Handlers.add("stake",
  continue(Handlers.utils.hasMatchingTag("Action", "Stake")), Handlers.stake)
Handlers.add("unstake",
  continue(Handlers.utils.hasMatchingTag("Action", "Unstake")), Handlers.unstake)
Handlers.add("vote",
  continue(Handlers.utils.hasMatchingTag("Action", "Vote")), Handlers.vote)
-- 最终handler要被每一条消息调用
Handlers.add("finalize", function (msg) return -1 end, finalizationHandler)
```

## 加载和测试

现在我们已经完成了 `dao.lua`，我们可以将它与 [token](./token.md) 指南中的 `token.lua` 一起加载到 aos 中。 运行一个名为 `dao` 的新 aos 进程，同时加载 `dao.lua` 和 `token.lua`

```sh
aos dao --load token.lua --load dao.lua
```

从另一个终端运行另一个名为 voter 的 aos 进程

```sh
aos voter
```

现在从 dao aos shell 向投票者发送一些代币

```lua
aos> Send({ Target = ao.id, Tags = { Action = "Transfer", Recipient = 'process id of the voter aos', Quantity = '100000' }})
```

从另一个终端运行另一个名为 cu 的 aos 进程

```sh
aos cu
```

现在从 dao aos shell 向 cu 发送一些代币

```lua
aos> Send({ Target = ao.id, Tags = { Action = "Transfer", Recipient = 'process id of the cu aos', Quantity = '100000' }})
```

从 dao aos shell 检查余额，我们应该看到 voter 和 cu 进程的余额。 在下面的示例中， `bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s` 是 dao aos，`QcGIOXJ1p2SOGzGAccOcV-nSudVRiaPYbU7SjeLx1OE` 是投票者 aos，`X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s` 是 cu aos。

```lua
aos> Balances
{
  'QcGIOXJ1p2SOGzGAccOcV-nSudVRiaPYbU7SjeLx1OE': 100000,
  bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s: 99999999900000,
  X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s: 100000
}
aos>
```

从投票者 aos 进程中，质押一些代币

```lua
aos> Send({ Target = "bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s", Tags = { Action = "Stake", Quantity = '1000', UnstakeDelay = "10" }})
```

从 cu aos 进程中，质押一些代币

```lua
aos> Send({ Target = "bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s", Tags = { Action = "Stake", Quantity = '1000', UnstakeDelay = "10" }})
```

这意味着我们想要为 10 个区块投入 1000 个代币。 因此，10 个区块后我们就有能力取消质押。

从 dao aos shell 检查 Stakers 表的值

```lua
aos> Stakers
{
  'QcGIOXJ1p2SOGzGAccOcV-nSudVRiaPYbU7SjeLx1OE': { amount: 1000, unstake_at: 1342634 },
  X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s: { amount: 1000, unstake_at: 1342634 }
}
aos>
```

现在让我们投票从投票者 aos 进程中削减cu，我们的投票在1个区块后生效

```lua
aos> Send({ Target = "bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s", Tags = { Action = "Vote", Target = "X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s(the cu aos)", Side = "nay", Deadline = "1"  }})
```

从 dao aos 检查投票

```lua
aos> Votes
{
  X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s: { nay: 1000, yay: 0, deadline: 1342627 }
}
aos>
```

现在等待 Arweave 达到截止时间块高度，然后从 dao aos 发送 Stake 消息以触发 `finalizationHandler`。 您可以在 [https://arweave.net/](https://arweave.net/) 检查块高度

```lua
Send({ Target = ao.id, Tags = { Action = "Stake", Quantity = '1000', UnstakeDelay = "10" }})
```

现在检查投票和质押者，投票应该为空，cu aos 进程应该已经失去了质押。

```lua
aos> Votes
[]
aos> Stakers
{
  'QcGIOXJ1p2SOGzGAccOcV-nSudVRiaPYbU7SjeLx1OE'(voter aos process): { amount: 1000, unstake_at: 1342647 },
  bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s(dao aos process): { amount: 1000, unstake_at: 1342658 },
  X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s(cu aos process): { amount: 0, unstake_at: 1342647 }
}
aos>
```

最后让我们从投票者 aos 进程中取消质押我们的代币

```lua
Send({ Target = "bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s", Tags = { Action = "Unstake", Quantity = '1000'}})
```

并从 dao aos 检查 Stakers 表

```lua
aos> Stakers
{
  'QcGIOXJ1p2SOGzGAccOcV-nSudVRiaPYbU7SjeLx1OE': { amount: 0, unstake_at: 1342647 },
  bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s: { amount: 1000, unstake_at: 1342658 },
  X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s: { amount: 0, unstake_at: 1342647 }
}
aos>
```

DAO 指南到此结束，我们希望它对您有所帮助！
