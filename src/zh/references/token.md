# ao Token 和子账本规范

**状态:** DRAFT-1
**目标网络:** ao.TN.1

该规范描述了标准 ao Token 进程所必须的消息 handler 和函数。该标准提供用户控制和转移资产的能力，资产的稀缺性由进程维护。

每个符合标准的进程会实现一个余额账本，用来对进程代表的资产所有权进行编码。标准中提供了一系列函数进行账本修改，这些函数包含安全保护代码，保护 Token 所有权的稀缺性。

此外，该规范描述了一种名为 '子账本' 的进程类型。实现子账本后，可以将一定数量的 Token 从父进程转移到相同 Token 接口规范的子进程中。如果子账本进程的 `From-Module` 得到参与者的信任，这些子账本可以直接进行交易，而无需与父进程交换消息。即使父进程在拥堵状态，参与者也能使用子进程中的 Token。如果参与者信任子账本进程，可以认为这些进程之间的余额是等价的。因此，同一个 Token 可以由任意数量的进程并行处理。

# Token 进程（ Token Processes ）

Token 进程可以对多种类型的消息作出响应，类型在 `Action` 标签中指定。Token 支持的所有的 `Action` 消息类型如下：

| 名称     | 描述                                                          | 只读               |
| -------- | ------------------------------------------------------------- | ------------------ |
| Balance  | 获取一个标志符（identifier) 的余额                            | :heavy_check_mark: |
| Balances | 获取整个账本/账户的余额列表                                   | :heavy_check_mark: |
| Transfer | 函数调用者向一个或多个目标发送1个或多个单位，并选择通知目标。 | :x:                |
| Mint     | 如果你使用了具备 root 权限的进程，你可以增加 Token 供应量     | :x:                |

在本节的其余部分中，描述了生成符合规范和 Token 进程所需的标签，描述了每个 `Action` 消息的形式和它们的结果。

## （创建请求的参数）Spawning Parameters

每个符合规范的 Token 进程在其生成消息中必须携带以下特定的参数：

| 标签         | 描述                                                | 有没有强制性       |
| ------------ | --------------------------------------------------- | ------------------ |
| Name         | Token 的名称，也就是显示给用户的名称。              | :heavy_check_mark: |
| Ticker       | Token 的缩写名称，以便快速引用。                    | :heavy_check_mark: |
| Logo         | 应用程序希望在 Token 旁边显示的图片，以便快速识别。 | :heavy_check_mark: |
| Denomination | 当向用户显示数量和余额时， Token 精度度量。         | :x:                |

## 消息协议（Messaging Protocol）

### Balance(Target? : string)

返回目标的余额。如果未提供目标参数，返回消息发送者的余额。

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

如果发送者拥有足够的余额，则向目标发送 `Quantity`，向接收者发出 `Credit-Notice`，向发送者发出 `Debit-Notice`。如果发送者余额不足，操作失败并通知发送者。

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

在未设置 `Cast` 时，如果发送成功，则应发送通知消息。

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

接收者将从消息的 `From-Process` 标签中知道他们已收到该 Token 。

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

实现 `Mint` 操作，允许特定用户创建更多 Token 余额。

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

子账本必须实现 Token 合约的完整消息协议（不包括 `Mint` 操作）。子账本必须为进程实现额外的功能和生成参数。接下来描述子账本和父账本的区别。

### （创建请求的参数）Spawning Parameters

每个符合规范的子账本的进程在其创建请求的消息中必须携带以下特定参数：

| Tag          | 描述                              | 有没有强制性 |
| ------------ | --------------------------------- | ------------ |
| Source-Token | 这个子账本代表的根进程的 `ID`。   | :x:          |
| Parent-Token | 这个子账本连接到的父进程的 `ID`。 | :x:          |

### `Credit-Notice` Handler

在收到 `Credit-Notice` 消息时，符合规范的子账本进程必须检查所涉及的进程是否是 `Parent-Token`。如果是，则子账本必须将 `Sender` 的余额增加指定数量。

### Transfer(Target, Quantity)

除了常规的 `Credit-Notice` 标签外，子账本进程还必须提供 `Source-Token` 和 `Parent-Token` 两个标签。接受者如果信任子账本进程的 `Module`，用户就可以在子账本中进行 `Source-Token` 上的存款那样的转账和进行借贷动作。

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

> 请注意: 在实现 Token 时，消息上的所有标签必须是 "string" 类型。你可以使用 `tostring` 函数将简单类型转换为字符串。

```lua
if not balances then
  balances = { [ao.id] = 100000000000000 }
end

if name ~= "Fun Coin" then
  name = "Fun Coin"
end

if ticker ~= "Fun" then
  ticker = "Fun"
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
