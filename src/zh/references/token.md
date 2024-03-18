# ao Token 和子账本规范

**状态:** DRAFT-1
**目标网络:** ao.TN.1

该规范描述了标准 ao Token 进程所必须的消息 handler 和功能。通常，符合此标准的实现提供用户控制可转让资产的能力，资产的稀缺性由进程维护。

每个符合标准的进程可能会实现一个余额账本，用来对进程代表的资产所有权进行编码。符合标准的进程具有一组方法允许修改账本，通常配有安全保障，来保护进程代表的Token所有权的稀缺性。

此外，该规范描述了一种名为 'subledger' 的进程类型，当实现时，可以将一定数量的 Token 从父进程移动到实现相同 Token 接口规范的子进程中。如果子账本进程的 `From-Module` 得到参与者的信任，这些子账本可以用于在 'source' Token 上进行交易，而无需直接与其交换消息。即使进程在拥堵状态，参与者也能使用进程中的 Token。如果参与者信任子账本进程，正在运行的 `Module`，他们可以认为这些进程之间的余额是同质化的。因此，任意数量的并行进程，或是交易可以同时由单个 Token 处理。

# Token 进程（ Token Processes ）

一个符合规范的 Token 进程对多种类型的消息作出响应，每种类型都在一个 `Action` 标签中指定。Token 必须支持的完整的 `Action` 消息类型如下：

| 名称     | 描述                                                                | 只读               |
| -------- | ------------------------------------------------------------------- | ------------------ |
| Balance  | 获取一个标识符（identifier) 的余额                                  | :heavy_check_mark: |
| Balances | 获取整个账本/账户的余额列表                                         | :heavy_check_mark: |
| Transfer | 从调用者的余额中向一个或多个目标发送1个或多个单位，并选择通知目标。 | :x:                |
| Mint     | 如果账本进程是根进程，并且你想增加 Token 供应量                     | :x:                |

在本节的其余部分中，描述了生成符合规范的 Token 进程所需的标签，以及每个 `Action` 消息的形式和它们的结果。

## （创建请求的参数）Spawning Parameters

每个符合规范的 Token 进程在其生成消息中必须携带以下不可变参数：

| 标签               | 描述                                                | 有没有强制性       |
| ------------------ | --------------------------------------------------- | ------------------ |
| Name               | Token 的标题，也就是显示给用户的名称。              | :heavy_check_mark: |
| Ticker             | Token 的建议缩写名称，以便快速引用。                | :heavy_check_mark: |
| Logo               | 应用程序希望在 Token 旁边显示的图片，以便快速识别。 |
| :heavy_check_mark: |
| Denomination       | 当向用户显示数量和余额时， Token 的单位数量。       | :x:                |

## 消息协议（Messaging Protocol）

### Balance(Target? : string)

如果未提供目标，则返回目标的余额，否则必须返回消息发送者的余额。

`Action` 消息的例子:

```lua=
send({
    Target = "{TokenProcess Identifier}",
    Tags = {
        Action = "Balance",
        Target = "{IDENTIFIER}"
    }
})
```

消息返回结果的例子:

```
{
    Tags = {
        Balance = "50",
        Target = "LcldyO8wwiGDzC3iXzGofdO8JdR4S1_2A6Qtz-o33-0",
        Ticker = "FUN"
    }
}
```

### Balances()

返回 Token 中所有参与者的余额。

```lua
send({
    Target = "[TokenProcess Identifier]",
    Tags = {
        Action = "Balances",
        Limit = 1000, # TODO: Is this necessary if the user is paying for the compute and response?
        Cursor? = "BalanceIdentifer"
    }
})
```

消息返回结果的例子:

```lua
{
    Data = {
        "MV8B3MAKTsUOqyCzQ0Tsa2AR3TiWTBU1Dx0xM4MO-f4": 100,
        "LcldyO8wwiGDzC3iXzGofdO8JdR4S1_2A6Qtz-o33-0": 50
    }
}
```

### Transfer(Target, Quantity)

如果发送者拥有足够的余额，则向目标发送 `Quantity`，向接收者发出 `Credit-Notice`，向发送者发出 `Debit-Notice`。如果发送者余额不足，则操作失败并通知发送者。

```lua
send({
    Target = "[TokenProcess Identifier]",
    Tags = {
        { name = "Action", value = "Transfer" },
        { name = "Recipient", value = "[ADDRESS]" },
        { name = "Quantity", value = "100" }
    }
})
```

如果发送成功，则应发送通知消息。如果未设置 `Cast`。

```lua
ao.send({
    Target = "[Recipient Address]",
    Tags = {
        { name = "Action", value = "Credit-Notice" },
        { name = "Sender", value = "[ADDRESS]" },
        { name = "Quantity", value = "100"}
    }
})
```

接收者将从消息的 `From-Process` 标签中推断出他们已收到的 Token 。

### Get-Info()

```lua
send({
    Target = "{Token}",
    Tags = {
        Action = "Info"
    }
})
```

### Mint() [optional]

实现 `Mint` 操作为进程提供了一种允许有效参与者创建新 Token 的方式。

```lua
send({
    Target ="{Token Process}",
    Tags = {
        Action = "Mint",
        Quantity = "1000"
    }
})
```

# 子账本进程（Subledger Processes）

为了能够正常运行，子账本必须实现 Token 合约的完整消息协议（不包括 `Mint` 操作）。子账本还必须为进程实现额外的功能和生成参数。这些不同在下一节中描述。

### （创建请求的参数）Spawning Parameters

每个符合规范的子账本的进程在其创建请求的消息中必须携带以下不可变参数：

| Tag          | 描述                              | 有没有强制性 |
| ------------ | --------------------------------- | ------------ |
| Source-Token | 这个子账本代表的根进程的 `ID`。   | :x:          |
| Parent-Token | 这个子账本连接到的父进程的 `ID`。 | :x:          |

### `Credit-Notice` Handler

在收到 `Credit-Notice` 消息时，符合规范的子账本进程必须检查所涉及的进程是否是 `Parent-Token`。如果是，则子账本必须将 `Sender` 的余额增加指定数量。

### Transfer(Target, Quantity)

除了正常传递给 Token 接收者的 `Credit-Notice` 消息中的标签外，符合规范的子账本进程还必须提供 `Source-Token` 和 `Parent-Token` 值。如果 `Transfer` 消息的接收者信任子账本进程的 `Module`，他们可以对类似于（可互换的） `Source-Token` 上的存款那样的收据进行记账。

修改后的 `Credit-Notice` 结构如下：

```lua
ao.send({
    Target = "[Recipient Address]",
    Tags = {
        { name = "Action", value = "Credit-Notice" },
        { name = "Quantity", value = "100"},
        { name = "Source-Token", value = "[ADDRESS]" },
        { name = "Parent-Token", value = "[ADDRESS]" }
    }
})
```

### Withdraw(Target?, Quantity)

All subledgers must allow balance holders to withdraw their tokens to the parent ledger. Upon receipt of an `Action: Withdraw` message, the subledger must send an `Action` message to its `Parent-Ledger`, transferring the requested tokens to the caller's address, while debiting their account locally. This transfer will result in a `Credit-Notice` from the `Parent-Ledger` for the caller.

所有子账本必须允许余额持有者将他们的 Token 提取到父账本中。收到一个 `Action: Withdraw` 消息后，子账本必须向其 `Parent-Ledger` 发送一个 `Action` 消息，将请求的 Token 转移到调用者的地址，同时在本地扣除他们的账户。这个转移将会让调用者收到来自 `Parent-Ledger` 的 `Credit-Notice`。

```lua
send({
    Target = "[TokenProcess Identifier]",
    Tags = {
     { name = "Action", value = "Withdraw" },
     { name = "Recipient", value = "[ADDRESS]" },
     { name = "Quantity", value = "100" }
    }
})
```

# Token 例子

> 请注意: 在实现 Token 时，重要的是要记住消息上的所有标签必须是 "string" 类型。你可以使用 `tostring` 函数将简单类型转换为字符串。

```lua
if not balances then
  balances = { [ao.id] = 100000000000000 }
end

if name ~= "Fun Coin" then
  name = "Fun Coin"
end

if ticker ~= "Fun" then
  ticker = "fun"
end

if denomination ~= 6 then
  denomination = 6
end

-- handler 处理传入的消息

handlers.add(
  "transfer",
  handlers.utils.hasMatchingTag("Action", "Transfer"),
  function (msg)
    assert(type(msg.Tags.Recipient) == 'string', 'Recipient is required!')
    assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')

    if not balances[msg.From] then
      balances[msg.From] = 0
    end

    if not balances[msg.Tags.Recipient] then
      balances[msg.Tags.Recipient] = 0
    end

    local qty = tonumber(msg.Tags.Quantity)
    assert(type(qty) == 'number', 'qty must be number')
    -- handlers.utils.reply("Transfering qty")(msg)
    if balances[msg.From] >= qty then
      balances[msg.From] = balances[msg.From] - qty
      balances[msg.Tags.Recipient] = balances[msg.Tags.Recipient] + qty
      ao.send({
        Target = msg.From,
        Tags = {
          Action = "Debit-Notice",
          Quantity = tostring(qty)
        }
      })
      ao.send({
      Target = msg.Tags.Recipient,
      Tags = {
        Action = "Credit-Notice",
        Quantity = tostring(qty)
      }})
      -- if msg.Tags.Cast and msg.Tags.Cast == "true" then
      --   return
      -- end

    end
  end
)

handlers.add(
  "balance",
  handlers.utils.hasMatchingTag("Action", "Balance"),
  function (msg)
    assert(type(msg.Tags.Target) == "string", "Target Tag is required!")
    local bal = "0"
    if balances[msg.Tags.Target] then
      bal = tostring(balances[msg.Tags.Target])
    end
    ao.send({Target = msg.From, Tags = {
      Target = msg.From,
      Balance = bal,
      Ticker = ticker or ""
    }})
  end
)

local json = require("json")

handlers.add(
  "balances",
  handlers.utils.hasMatchingTag("Action", "Balances"),
  function (msg)
    ao.send({
      Target = msg.From,
      Data = json.encode(balances)
    })
  end

)

handlers.add(
  "info",
  handlers.utils.hasMatchingTag("Action", "Info"),
  function (msg)
    ao.send({Target = msg.From, Tags = {
      Name = name,
      Ticker = ticker,
      Denomination = tostring(denomination)
    }})
  end
)
```
