# 质押蓝图 Staking Blueprint

质押蓝图是预先设计好的模板，可帮助你在 ao 中快速构建质押系统。蓝图是入门的绝佳方式，并且可以根据你的需求进行定制。

## 前提条件

质押蓝图要求先加载 [token 蓝图](./token.md)。

## 解析 staking 蓝图

- **Stakers**: `Stakers` 数组用于存储质押者。

- **Unstaking**:`Unstaking` 数组用于存储参与者的解除质押请求。

- **Stake Action Handler**: `stake`handler 用于进程质押代币。当进程发送带有标签`Action = "Stake"`的消息时，处理程序会将质押代币添加到`Stakers` 数组中，并向进程发送一条消息确认质押。

- **Unstake Action Handler**: `unstake` handler 用于进程解除质押代币。当进程发送带有标签`Action = "Unstake"`的消息时，处理程序会将解除质押请求添加到 `Unstaking` 数组中，并向进程发送一条消息确认解除质押。

- **Finalization Handler**: `finalize` handler支持进程完成质押过程。当进程发送带有标签 `Action = "Finalize"`的消息时，处理程序会处理解除质押请求并完成质押过程。

### 如何使用:

1. 打开文本编辑器。

2. 打开终端。

3. 启动`aos`流程。

4. 输入 `.load-blueprint staking`

### 验证蓝图已加载:

输入`Handlers.list`查看新加载的Handler。

## 质押蓝图中的内容:

```lua
Stakers = Stakers or {}
Unstaking = Unstaking or {}

-- Stake Action Handler
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

-- Unstake Action Handler
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

-- Finalization Handler
local finalizationHandler = function(msg)
  local currentHeight = tonumber(msg['Block-Height'])
  -- Process unstaking
  for address, unstakeInfo in pairs(Unstaking) do
      if currentHeight >= unstakeInfo.release_at then
          Balances[address] = (Balances[address] or 0) + unstakeInfo.amount
          Unstaking[address] = nil
      end
  end

end

-- wrap function to continue handler flow
local function continue(fn)
  return function (msg)
    local result = fn(msg)
    if (result) == -1 then
      return 1
    end
    return result
  end
end

-- Registering Handlers
Handlers.add("stake",
  continue(Handlers.utils.hasMatchingTag("Action", "Stake")), Handlers.stake)
Handlers.add("unstake",
  continue(Handlers.utils.hasMatchingTag("Action", "Unstake")), Handlers.unstake)
-- Finalization handler should be called for every message
Handlers.add("finalize", function (msg) return -1 end, finalizationHandler)
```
