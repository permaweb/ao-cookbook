# ao Token and Subledger Specification

**Status:** DRAFT-1
**Targeting Network:** ao.TN.1

This specification describes the necessary message handlers and functionality required for a standard ao token process. Implementations of this standard typically offer users the ability to control a transferrable asset, whose scarcity is maintained by the process.

Each compliant process will likely implement a ledger of balances in order to encode ownership of the asset that the process represents. Compliant processes have a set of methods that allow for the modification of this ledger, typically with safe-guards to ensure the scarcity of ownership of the token represented by the process.

Additionally, this specification describes a 'subledger' process type which, when implemented, offers the ability to split move a number of the tokens from the parent into a child process that implements the same token interface specification. If the `From-Module` of the subledger process is trusted by the participants, these subledgers can be used to transact in the 'source' token, without directly exchanging messages with it. This allows participants to use the tokens from a process, even if that process is congested. Optionally, if the participants trust the `Module` a subledger process is running, they are able to treat balances across these processes as _fungible_. The result of this is that an arbitrary numbers of parallel processes -- and thus, transactions -- can be processed by a single token at any one time.

# Token Processes

A specification-compliant token process responds to a number of different forms of messages, with each form specified in an `Action` tag. The full set of `Action` messages that the token must support are as follows:

| Name     | Description                                                                                            | Read-Only          |
| -------- | ------------------------------------------------------------------------------------------------------ | ------------------ |
| Balance  | get the balance of an identifier                                                                       | :heavy_check_mark: |
| Balances | get a list of all ledger/account balances                                                              | :heavy_check_mark: |
| Transfer | send 1 or more units from the callers balance to one or move targets with the option to notify targets | :x:                |
| Mint     | if the ledger process is the root and you would like to increase token supply                          | :x:                |

In the remainder of this section the tags necessary to spawn a compliant token process, along with the form of each of the `Action` messages and their results is described.

## Spawning Parameters

Every compliant token process must carry the following immutable parameters upon its spawning message:

| Tag          | Description                                                                                                          | Optional?          |
| ------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Name         | The title of the token, as it should be displayed to users.                                                          | :heavy_check_mark: |
| Ticker       | A suggested shortened name for the token, such that it can be referenced quickly.                                    | :heavy_check_mark: |
| Logo         | An image that applications may desire to show next to the token, in order to make it quickly visually identifiable.  | :heavy_check_mark: |
| Denomination | The number of the token that should be treated as a single unit when quantities and balances are displayed to users. | :x:                |

## Messaging Protocol

### Balance(Target? : string)

- Returns the balance of a target, if a target is not supplied then the balance of the sender of the message must be returned.

**Example `Action` message:**

```lua
ao.send({
    Target = "{TokenProcess Identifier}",
    Tags = {
        ["Action"] = "Balance",
        ["Target"] = "{IDENTIFIER}"
    }
})
```

**Example response message:**

```lua
{
    Tags = {
        ["Balance"] = "50",
        ["Target"] = "LcldyO8wwiGDzC3iXzGofdO8JdR4S1_2A6Qtz-o33-0",
        ["Ticker"] = "FUN"
    }
}
```

### Balances()

- Returns the balance of all participants in the token.

```lua
ao.send({
    Target = "[TokenProcess Identifier]",
    Tags = {
        ["Action"] = "Balances",
        ["Limit"] = 1000, # TODO: Is this necessary if the user is paying for the compute and response?
        ["Cursor"] = "BalanceIdentifier"
    }
})
```

**Example response message:**

```lua
{
    Data = {
        "MV8B3MAKTsUOqyCzQ0Tsa2AR3TiWTBU1Dx0xM4MO-f4": 100,
        "LcldyO8wwiGDzC3iXzGofdO8JdR4S1_2A6Qtz-o33-0": 50
    }
}
```

### Transfer(Target, Quantity)

If the sender has a sufficient balance, send the `Quantity` to the `Target`, issuing a `Credit-Notice` to the recipient and a `Debit-Notice` to the sender. The `Credit-` and `Debit-Notice` should forward any and all tags from the original `Transfer` message with the `X-` prefix. If the sender has an insufficient balance, fail and notify the sender.

```lua
ao.send({
    Target = "[TokenProcess Identifier]",
    Tags = {
        ["Action"] = "Transfer",
        ["Recipient"] = "[ADDRESS]",
        ["Quantity"] = "100",
        ["X-[Forwarded Tag(s) Name]"] = "[VALUE]"
    }
})
```

If a successful transfer occurs a notification message should be sent if `Cast` is not set.

```lua
ao.send({
    Target = "[Recipient Address]",
    Tags = {
        ["Action"] = "Credit-Notice",
        ["Sender"] = "[ADDRESS]",
        ["Quantity"] = "100",
        ["X-[Forwarded Tag(s) Name]"] = "[VALUE]"
    }
})
```

Recipients will infer from the `From-Process` tag of the message which tokens they have received.

### Get-Info()

```lua
ao.send({
    Target = "{Token}",
    Tags = {
        ["Action"] = "Info"
    }
})
```

### Mint() [optional]

Implementing a `Mint` action gives the process a way of allowing valid participants to create new tokens.

```lua
ao.send({
    Target ="{Token Process}",
    Tags = {
        ["Action"] = "Mint",
        ["Quantity"] = "1000"
    }
})
```

# Subledger Processes

In order to function appropriately, subledgers must implement the full messaging protocol of token contracts (excluding the `Mint` action). Subledgers must also implement additional features and spawn parameters for their processes. These modifications are described in the following section.

### Spawning Parameters

Every compliant subledger process must carry the following immutable parameters upon its spawning message:

| Tag          | Description                                                        | Optional? |
| ------------ | ------------------------------------------------------------------ | --------- |
| Source-Token | The `ID` of the top-most process that this subledger represents.   | :x:       |
| Parent-Token | The `ID` of the parent process that this subledger is attached to. | :x:       |

### `Credit-Notice` Handler

Upon receipt of a `Credit-Notice` message, a compliant subledger process must check if the process in question is the `Parent-Token`. If it is, the subledger must increase the balance of the `Sender` by the specified quantity.

### Transfer(Target, Quantity)

In addition to the normal tags that are passed in the `Credit-Notice` message to the recipient of tokens, a compliant subledger process must also provide both of the `Source-Token` and `Parent-Token` values. This allows the recipient of the `Transfer` message -- if they trust the `Module` of the subledger process -- to credit a receipt that is analogous (fungible with) deposits from the `Source-Token`.

The modified `Credit-Notice` should be structured as follows:

```lua
ao.send({
    Target = "[Recipient Address]",
    Tags = {
        ["Action"] = "Credit-Notice",
        ["Quantity"] = "100",
        ["Source-Token"] = "[ADDRESS]",
        ["Parent-Token"] = "[ADDRESS]",
        ["X-[Forwarded Tag(s) Name]"] = "[VALUE]"
    }
})
```

### Withdraw(Target?, Quantity)

All subledgers must allow balance holders to withdraw their tokens to the parent ledger. Upon receipt of an `Action: Withdraw` message, the subledger must send an `Action` message to its `Parent-Ledger`, transferring the requested tokens to the caller's address, while debiting their account locally. This transfer will result in a `Credit-Notice` from the `Parent-Ledger` for the caller.

```lua
ao.send({
    Target = "[TokenProcess Identifier]",
    Tags = {
        ["Action"] = "Withdraw",
        ["Recipient"] = "[ADDRESS]",
        ["Quantity"] = "100"
    }
})
```

# Token Example

> NOTE: When implementing a token it is important to remember that all Tags on a message MUST be "string"s. Using the`tostring` function you can convert simple types to strings.

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

-- handlers that handler incoming msg
Handlers.add(
  "Transfer",
  Handlers.utils.hasMatchingTag("Action", "Transfer"),
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
    -- handlers.utils.reply("Transferring qty")(msg)
    if balances[msg.From] >= qty then
      balances[msg.From] = balances[msg.From] - qty
      balances[msg.Tags.Recipient] = balances[msg.Tags.Recipient] + qty
      ao.send({
        Target = msg.From,
        Tags = {
          ["Action"] = "Debit-Notice",
          ["Quantity"] = tostring(qty)
        }
      })
      ao.send({
        Target = msg.Tags.Recipient,
        Tags = {
          ["Action"] = "Credit-Notice",
          ["Quantity"] = tostring(qty)
        }
      })
      -- if msg.Tags.Cast and msg.Tags.Cast == "true" then
      --   return
      -- end

    end
  end
)

Handlers.add(
  "Balance",
  Handlers.utils.hasMatchingTag("Action", "Balance"),
  function (msg)
    assert(type(msg.Tags.Target) == "string", "Target Tag is required!")
    local bal = "0"
    if balances[msg.Tags.Target] then
      bal = tostring(balances[msg.Tags.Target])
    end
    ao.send({
      Target = msg.From,
      Tags = {
        ["Balance"] = bal,
        ["Ticker"] = ticker or ""
      }
    })
  end
)

local json = require("json")

Handlers.add(
  "Balances",
  Handlers.utils.hasMatchingTag("Action", "Balances"),
  function (msg)
    ao.send({
      Target = msg.From,
      Data = json.encode(balances)
    })
  end

)

Handlers.add(
  "Info",
  Handlers.utils.hasMatchingTag("Action", "Info"),
  function (msg)
    ao.send({
      Target = msg.From,
      Tags = {
        ["Name"] = name,
        ["Ticker"] = ticker,
        ["Denomination"] = tostring(denomination)
      }
    })
  end
)
```
