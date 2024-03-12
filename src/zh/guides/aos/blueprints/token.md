# 代币蓝图

代币蓝图是预先设计好的模板，可帮助您在 ao 中快速构建。蓝图是入门的绝佳方式，并且可以根据您的需求进行定制。

## 解析代币蓝图

- **余额**: `Balances` 数组用于存储参与者的代币余额。

- **信息 Handler**: `info` handler 支持流程进程检索代币参数，例如名称、代码、徽标和面值。

- **余额 Handler**: `balance` Handler支持进程检索参与者的代币余额。
: 
- **总余额 Handler**: `balances` Handler支持进程检索所有参与者的代币余额。
:
- **转移 Handler**: `transfer` Handler支持进程向其他参与者发送代币。
: 
- **铸币 Handler**: `mint` Handler支持进程铸造新的代币。
: 
### 如何使用：

1. 打开您的文本编辑器。
2. 打开终端。
3. 启动您的`aos`进程.
4. 输入`.load-blueprint token`

### 验证蓝图是否已加载：

输入 `Handlers.list` 查看新加载的handlers。

## 代币蓝图包含的内容：

```lua
local bint = require('.bint')(256)
local ao = require('ao')
--[[
  This module implements the ao Standard Token Specification.

  Terms:
    Sender: the wallet or Process that sent the Message

  It will first initialize the internal state, and then attach handlers,
    according to the ao Standard Token Spec API:

    - Info(): return the token parameters, like Name, Ticker, Logo, and Denomination

    - Balance(Target?: string): return the token balance of the Target. If Target is not provided, the Sender
        is assumed to be the Target

    - Balances(): return the token balance of all participants

    - Transfer(Target: string, Quantity: number): if the Sender has a sufficient balance, send the specified Quantity
        to the Target. It will also issue a Credit-Notice to the Target and a Debit-Notice to the Sender

    - Mint(Quantity: number): if the Sender matches the Process Owner, then mint the desired Quantity of tokens, adding
        them the Processes' balance
]]
--
local json = require('json')

--[[
     Initialize State

     ao.id is equal to the Process.Id
   ]]
--
if not Balances then Balances = { [ao.id] = tostring(bint(10000 * 1e12)) } end

if Name ~= 'Points Coin' then Name = 'Points Coin' end

if Ticker ~= 'Points' then Ticker = 'PNTS' end

if Denomination ~= 12 then Denomination = 12 end

if not Logo then Logo = 'SBCCXwwecBlDqRLUjb8dYABExTJXLieawf7m2aBJ-KY' end

--[[
     Add handlers for each incoming Action defined by the ao Standard Token Specification
   ]]
--

--[[
     Info
   ]]
--
Handlers.add('info', Handlers.utils.hasMatchingTag('Action', 'Info'), function(msg)
  ao.send({
    Target = msg.From,
    Name = Name,
    Ticker = Ticker,
    Logo = Logo,
    Denomination = tostring(Denomination)
  })
end)

--[[
     Balance
   ]]
--
Handlers.add('balance', Handlers.utils.hasMatchingTag('Action', 'Balance'), function(msg)
  local bal = '0'

  -- If not Target is provided, then return the Senders balance
  if (msg.Tags.Target and Balances[msg.Tags.Target]) then
    bal = Balances[msg.Tags.Target]
  elseif Balances[msg.From] then
    bal = Balances[msg.From]
  end

  ao.send({
    Target = msg.From,
    Balance = bal,
    Ticker = Ticker,
    Account = msg.Tags.Target or msg.From,
    Data = bal
  })
end)

--[[
     Balances
   ]]
--
Handlers.add('balances', Handlers.utils.hasMatchingTag('Action', 'Balances'),
  function(msg) ao.send({ Target = msg.From, Data = json.encode(Balances) }) end)

--[[
     Transfer
   ]]
--
Handlers.add('transfer', Handlers.utils.hasMatchingTag('Action', 'Transfer'), function(msg)
  assert(type(msg.Recipient) == 'string', 'Recipient is required!')
  assert(type(msg.Quantity) == 'string', 'Quantity is required!')
  assert(bint.__lt(0, bint(msg.Quantity)), 'Quantity must be greater than 0')

  if not Balances[msg.From] then Balances[msg.From] = "0" end
  if not Balances[msg.Recipient] then Balances[msg.Recipient] = "0" end

  local qty = bint(msg.Quantity)
  local balance = bint(Balances[msg.From])
  if bint.__le(qty, balance) then
    Balances[msg.From] = tostring(bint.__sub(balance, qty))
    Balances[msg.Recipient] = tostring(bint.__add(Balances[msg.Recipient], qty))

    --[[
         Only send the notifications to the Sender and Recipient
         if the Cast tag is not set on the Transfer message
       ]]
    --
    if not msg.Cast then
      -- Send Debit-Notice to the Sender
      ao.send({
        Target = msg.From,
        Action = 'Debit-Notice',
        Recipient = msg.Recipient,
        Quantity = tostring(qty),
        Data = Colors.gray .. "You transferred " .. Colors.blue .. msg.Quantity .. Colors.gray .. " to " .. Colors.green .. msg.Recipient .. Colors.reset
      })
      -- Send Credit-Notice to the Recipient
      ao.send({
        Target = msg.Recipient,
        Action = 'Credit-Notice',
        Sender = msg.From,
        Quantity = tostring(qty),
        Data = Colors.gray .. "You received " .. Colors.blue .. msg.Quantity .. Colors.gray .. " from " .. Colors.green .. msg.Recipient .. Colors.reset
      })
    end
  else
    ao.send({
      Target = msg.From,
      Action = 'Transfer-Error',
      ['Message-Id'] = msg.Id,
      Error = 'Insufficient Balance!'
    })
  end
end)

--[[
    Mint
   ]]
--
Handlers.add('mint', Handlers.utils.hasMatchingTag('Action', 'Mint'), function (msg)
  assert(type(msg.Quantity) == 'string', 'Quantity is required!')
  assert(bint.__lt(0, msg.Quantity), 'Quantity must be greater than zero!')

  if not Balances[ao.id] then Balances[ao.id] = "0" end

  if msg.From == ao.id then
    -- Add tokens to the token pool, according to Quantity
    Balances[msg.From] = tostring(bint.__add(Balances[Owner], msg.Quantity))
    ao.send({
      Target = msg.From,
      Data = Colors.gray .. "Successfully minted " .. Colors.blue .. msg.Quantity .. Colors.reset
    })
  else
    ao.send({
      Target = msg.From,
      Action = 'Mint-Error',
      ['Message-Id'] = msg.Id,
      Error = 'Only the Process Owner can mint new ' .. Ticker .. ' tokens!'
    })
  end
end)

```
