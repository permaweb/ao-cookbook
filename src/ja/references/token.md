# aoトークンおよびサブレッジャー仕様

**ステータス:** DRAFT-1  
**対象ネットワーク:** ao.TN.1

この仕様は、標準のaoトークンプロセスに必要なメッセージハンドラと機能を説明します。この標準の実装は通常、プロセスによって維持される希少性を持つ転送可能な資産を制御する能力をユーザーに提供します。

各準拠プロセスは、プロセスが表す資産の所有権を符号化するために、残高の台帳を実装することが期待されます。準拠プロセスには、通常、トークンの所有権の希少性を保証するための安全策を伴って、この台帳を変更するためのメソッドのセットがあります。

さらに、この仕様では「サブレッジャー」プロセスタイプを説明しています。これは、実装されると、親プロセスから子プロセスにトークンの数を分割移動する能力を提供します。この子プロセスは同じトークンインターフェース仕様を実装します。サブレッジャープロセスの`From-Module`が参加者によって信頼される場合、これらのサブレッジャーを使って「ソース」トークンで取引することができます。これは、直接メッセージを交換することなく行えます。これにより、プロセスが混雑している場合でも、参加者はそのプロセスからトークンを使用できます。オプションとして、参加者がサブレッジャープロセスが実行されている`Module`を信頼している場合、これらのプロセス間での残高を*代替可能*として扱うことができます。この結果、任意の数の並列プロセス、およびそれに伴う取引を単一のトークンで同時に処理できます。

# トークンプロセス

仕様に準拠したトークンプロセスは、さまざまな形式のメッセージに応答し、各形式は`Action`タグで指定されます。トークンがサポートしなければならない`Action`メッセージの完全なセットは以下の通りです：

<!-- # ao Token and Subledger Specification

**Status:** DRAFT-1
**Targeting Network:** ao.TN.1

This specification describes the necessary message handlers and functionality required for a standard ao token process. Implementations of this standard typically offer users the ability to control a transferrable asset, whose scarcity is maintained by the process.

Each compliant process will likely implement a ledger of balances in order to encode ownership of the asset that the process represents. Compliant processes have a set of methods that allow for the modification of this ledger, typically with safe-guards to ensure the scarcity of ownership of the token represented by the process.

Additionally, this specification describes a 'subledger' process type which, when implemented, offers the ability to split move a number of the tokens from the parent into a child process that implements the same token interface specification. If the `From-Module` of the subledger process is trusted by the participants, these subledgers can be used to transact in the 'source' token, without directly exchanging messages with it. This allows participants to use the tokens from a process, even if that process is congested. Optionally, if the participants trust the `Module` a subledger process is running, they are able to treat balances across these processes as _fungible_. The result of this is that an arbitrary numbers of parallel processes -- and thus, transactions -- can be processed by a single token at any one time.

# Token Processes

A specification-compliant token process responds to a number of different forms of messages, with each form specified in an `Action` tag. The full set of `Action` messages that the token must support are as follows: -->

| Name     | Description                                                                                            | Read-Only          |
| -------- | ------------------------------------------------------------------------------------------------------ | ------------------ |
| Balance  | get the balance of an identifer                                                                        | :heavy_check_mark: |
| Balances | get a list of all ledger/account balances                                                              | :heavy_check_mark: |
| Transfer | send 1 or more units from the callers balance to one or move targets with the option to notify targets | :x:                |
| Mint     | if the ledger process is the root and you would like to increase token supply                          | :x:                |

このセクションの残りでは、準拠トークンプロセスを生成するために必要なタグと、各`Action`メッセージの形式およびその結果について説明します。

## 生成パラメータ

すべての準拠トークンプロセスは、その生成メッセージに以下の不変パラメータを含める必要があります：

<!-- In the remainder of this section the tags necessary to spawn a compliant token process, along with the form of each of the `Action` messages and their results is described.

## Spawning Parameters

Every compliant token process must carry the following immutable parameters upon its spawning message: -->

| Tag          | Description                                                                                                           | Optional?          |
| ------------ | --------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Name         | The title of the token, as it should be displayed to users.                                                           | :heavy_check_mark: |
| Ticker       | A suggested shortened name for the token, such that it can be referenced quickly.                                     | :heavy_check_mark: |
| Logo         | An image that applications may deserire to show next to the token, in order to make it quickly visually identifiable. | :heavy_check_mark: |
| Denomination | The number of the token that should be treated as a single unit when quantities and balances are displayed to users.  | :x:                |

## メッセージングプロトコル

### Balance(Target? : string)

ターゲットの残高を返します。ターゲットが指定されていない場合は、メッセージの送信者の残高を返す必要があります。

例 `Action` メッセージ：

<!-- ## Messaging Protocol

### Balance(Target? : string)

Returns the balance of a target, if a target is not supplied then the balance of the sender of the message must be returned.

Example `Action` message: -->

```lua=
send({
    Target = "{TokenProcess Identifier}",
    Tags = {
        Action = "Balance",
        Target = "{IDENTIFIER}"
    }
})
```

Example response message:

```
{
    Tags = {
        Balance = "50",
        Target = "LcldyO8wwiGDzC3iXzGofdO8JdR4S1_2A6Qtz-o33-0",
        Ticker = "FUN"
    }
}
```

<!--
### Balances()

Returns the balance of all participants in the token. -->

### Balances()

トークンのすべての参加者の残高を返します。

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

Example response message:

```lua
{
    Data = {
        "MV8B3MAKTsUOqyCzQ0Tsa2AR3TiWTBU1Dx0xM4MO-f4": 100,
        "LcldyO8wwiGDzC3iXzGofdO8JdR4S1_2A6Qtz-o33-0": 50
    }
}
```

<!-- ### Transfer(Target, Quantity)

If the sender has a sufficient balance, send the `Quantity` to the `Target`, issuing a `Credit-Notice` to the recipient and a `Debit-Notice` to the sender. The `Credit-` and `Debit-Notice` should forward any and all tags from the original `Transfer` message with the `X-` prefix. If the sender has an insufficient balance, fail and notify the sender. -->

### Transfer(Target, Quantity)

送信者に十分な残高がある場合、`Quantity`を`Target`に送信し、受取人に`Credit-Notice`を発行し、送信者に`Debit-Notice`を発行します。`Credit-`および`Debit-Notice`は、元の`Transfer`メッセージからすべてのタグを`X-`プレフィックス付きで転送する必要があります。送信者に残高が不足している場合は、失敗し、送信者に通知します。

```lua
send({
    Target = "[TokenProcess Identifier]",
    Tags = {
        { name = "Action", value = "Transfer" },
        { name = "Recipient", value = "[ADDRESS]" },
        { name = "Quantity", value = "100" },
        { name = "X-[Forwarded Tag(s) Name]", value= "[VALUE]" }
    }
})
```

<!-- If a successful transfer occurs a notification message should be sent if `Cast` is not set. -->

成功した転送が行われた場合、`Cast`が設定されていない場合は通知メッセージを送信する必要があります。

```lua
ao.send({
    Target = "[Recipient Address]",
    Tags = {
        { name = "Action", value = "Credit-Notice" },
        { name = "Sender", value = "[ADDRESS]" },
        { name = "Quantity", value = "100"},
        { name = "X-[Forwarded Tag(s) Name]", value= "[VALUE]" }
    }
})
```

<!-- Recipients will infer from the `From-Process` tag of the message which tokens they have received. -->

受取人は、メッセージの`From-Process`タグから、どのトークンを受け取ったかを推測します。

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

<!-- Implementing a `Mint` action gives the process a way of allowing valid participants to create new tokens. -->

`Mint`アクションを実装することで、プロセスは有効な参加者に新しいトークンを作成する方法を提供します。

```lua
send({
    Target ="{Token Process}",
    Tags = {
        Action = "Mint",
        Quantity = "1000"
    }
})
```

<!-- # Subledger Processes

In order to function appropriately, subledgers must implement the full messaging protocol of token contracts (excluding the `Mint` action). Subledgers must also implement additional features and spawn parameters for their processes. These modifications are described in the following section. -->

# サブレッジャープロセス

適切に機能するために、サブレッジャーはトークン契約の完全なメッセージングプロトコルを実装する必要があります（`Mint`アクションを除く）。サブレッジャーはまた、プロセスのために追加の機能や生成パラメータを実装する必要があります。これらの変更は、次のセクションで説明されます。

<!--
### Spawning Parameters

Every compliant subledger process must carry the following immutable parameters upon its spawning message: -->

### 生成パラメータ

すべての準拠したサブレッジャープロセスは、その生成メッセージに以下の不変パラメータを含める必要があります：

| Tag          | Description                                                        | Optional? |
| ------------ | ------------------------------------------------------------------ | --------- |
| Source-Token | The `ID` of the top-most process that this subledger represents.   | :x:       |
| Parent-Token | The `ID` of the parent process that this subledger is attached to. | :x:       |

<!-- ### `Credit-Notice` Handler

Upon receipt of a `Credit-Notice` message, a compliant subledger process must check if the process in question is the `Parent-Token`. If it is, the subledger must increase the balance of the `Sender` by the specified quantity.

### Transfer(Target, Quantity)

In addition to the normal tags that are passed in the `Credit-Notice` message to the recipient of tokens, a compliant subledger process must also provide both of the `Source-Token` and `Parent-Token` values. This allows the recipient of the `Transfer` message -- if they trust the `Module` of the subledger process -- to credit a receipt that is analogous (fungible with) deposits from the `Source-Token`.

The modified `Credit-Notice` should be structured as follows:
 -->

### `Credit-Notice`ハンドラ

`Credit-Notice`メッセージを受信した際、準拠したサブレッジャープロセスは、対象のプロセスが`Parent-Token`であるかどうかを確認する必要があります。もしそうであれば、サブレッジャーは`Sender`の残高を指定された数量だけ増加させる必要があります。

### Transfer(Target, Quantity)

トークンの受取人に渡される`Credit-Notice`メッセージに含まれる通常のタグに加えて、準拠したサブレッジャープロセスは、`Source-Token`と`Parent-Token`の両方の値も提供する必要があります。これにより、`Transfer`メッセージの受取人は、サブレッジャープロセスの`Module`を信頼している場合、`Source-Token`からの預金と同様の（代替可能な）受領をクレジットできるようになります。

修正された`Credit-Notice`は以下のように構成されるべきです：

```lua
ao.send({
    Target = "[Recipient Address]",
    Tags = {
        { name = "Action", value = "Credit-Notice" },
        { name = "Quantity", value = "100"},
        { name = "Source-Token", value = "[ADDRESS]" },
        { name = "Parent-Token", value = "[ADDRESS]" },
        { name = "X-[Forwarded Tag(s) Name]", value= "[VALUE]" }
    }
})
```

<!--
### Withdraw(Target?, Quantity)

All subledgers must allow balance holders to withdraw their tokens to the parent ledger. Upon receipt of an `Action: Withdraw` message, the subledger must send an `Action` message to its `Parent-Ledger`, transferring the requested tokens to the caller's address, while debiting their account locally. This transfer will result in a `Credit-Notice` from the `Parent-Ledger` for the caller. -->

### Withdraw(Target?, Quantity)

すべてのサブレッジャーは、残高保有者がトークンを親台帳に引き出すことを許可する必要があります。`Action: Withdraw`メッセージを受信した際、サブレッジャーはその`Parent-Ledger`に`Action`メッセージを送り、要求されたトークンを呼び出し元のアドレスに転送し、ローカルでアカウントから引き落とします。この転送により、呼び出し元に対して`Parent-Ledger`から`Credit-Notice`が発行されます。

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
