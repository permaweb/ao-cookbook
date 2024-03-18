# 投票蓝图 Voting Blueprint

投票蓝图是预先设计好的模板，可帮助你在 ao 中快速构建投票系统。蓝图是入门的绝佳方式，并且可以根据你的需求进行定制。

## 前提条件

投票蓝图要求先加载 [Token 蓝图](./token.md)

## 解析投票蓝图

- **Balances**: The `Balances` 数组用于存储参与者的代币余额。

- **Votes**: `Votes` 数组用于存储投票参与者地址。

- **Vote Action Handler**: `vote` handler 用户进程进行投票。当进程发送带有标记 `Action = "Vote"` 的消息时，handler 会将投票信息添加到`Votes`数组中，并向流程发送消息，确认投票。

- **Finalization Handler**: `finalize` handler支持进程完成投票过程。当进程发送带有标签 `Action = "Finalize"`的消息时，Handler会处理投票信息并完成投票过程。

### 如何使用:

1. 打开你的文本编辑器。
2. 打开终端。
3. 启动你的`aos`进程.
4. 输入`.load-blueprint voting`

### 验证蓝图是否已加载：

输入 `Handlers.list` 查看新加载的 handlers。

## 投票蓝图包含的内容：

```lua
Balances = Balances or {}
Votes = Votes or {}

-- Vote Action Handler
Handlers.vote = function(msg)
  local quantity = Stakers[msg.From].amount
  local target = msg.Tags.Target
  local side = msg.Tags.Side
  local deadline = tonumber(msg['Block-Height']) + tonumber(msg.Tags.Deadline)
  assert(quantity > 0, "No staked tokens to vote")
  Votes[target] = Votes[target] or { yay = 0, nay = 0, deadline = deadline }
  Votes[target][side] = Votes[target][side] + quantity
end

-- Finalization Handler
local finalizationHandler = function(msg)
  local currentHeight = tonumber(msg['Block-Height'])
  -- Process voting
  for target, voteInfo in pairs(Votes) do
      if currentHeight >= voteInfo.deadline then
          if voteInfo.yay > voteInfo.nay then
              print("Handle Vote")
          end
          -- Clear the vote record after processing
          Votes[target] = nil
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

Handlers.add("vote",
  continue(Handlers.utils.hasMatchingTag("Action", "Vote")), Handlers.vote)
-- Finalization handler should be called for every message
Handlers.add("finalize", function (msg) return -1 end, finalizationHandler)
```
