# `ao`でのトークンの構築

トークンを作成する際には、`ao`内で[Lua言語](../../references/lua.md)を引き続き使用してトークンをミントします。これは、[トークンスペシフィケーション](../../references/token.md)で概説された原則に従います。

### トークンを作成する2つの方法：

**1 - トークンブループリントを使用する:**

`.load-blueprint token`

トークンブループリントを使用すると、すでにすべてのハンドラと状態が定義されたトークンが作成されます。これはトークンを作成する最も簡単な方法です。ブループリントを読み込んだ後、これらのハンドラと状態をカスタマイズすることができます。

利用可能なブループリントについてさらに学ぶには、こちらを参照してください: [ブループリント](../aos/blueprints/index.md)

::: info
トークンブループリントを使用すると迅速にトークンが作成できますが、ニーズに合わせてカスタマイズできるように、トークンの[読み込みとテスト](token.html#loading-and-testing)方法も理解しておく必要があります。
:::

**2 - ゼロから構築する:**

以下のガイドでは、ゼロからトークンを作成するプロセスを案内します。これはトークンを作成するより高度な方法ですが、トークンの仕組みをより深く理解するのに役立ちます。

## 準備

### **ステップ1: トークンの初期化**

- 好きなテキストエディタを開きます。できれば、前回のチュートリアルで使用したフォルダー内から開いてください。
- `token.lua`という新しいファイルを作成します。
- `token.lua`内で、トークンの状態を初期化し、残高、名前、ティッカーなどを定義します。

<!--
# Building a Token in `ao`

When creating tokens, we'll continue to use the [Lua Language](../../references/lua.md) within `ao` to mint a token, guided by the principles outlined in the [Token Specification](../../references/token.md).

### Two Ways to Create Tokens:

**1 - Use the token blueprint:**

`.load-blueprint token`

Using the token blueprint will create a token with all the handlers and state already defined. This is the easiest way to create a token. You'll be able to customize those handlers and state to your after loading the blueprint.

You can learn more about available blueprints here: [Blueprints](../aos/blueprints/index.md)

::: info
Using the token blueprint will definitely get quickly, but you'll still want to understand how to [load and test](token.html#loading-and-testing) the token, so you can customize it to your needs.
:::

**2 - Build from Scratch:**

The following guide will guide you through the process of creating a token from scratch. This is a more advanced way to create a token, but it will give you a better understanding of how tokens work.

## Preparations

### **Step 1: Initializing the Token**

- Open our preferred text editor, preferrably from within the same folder you used during the previous tutorial.
- Create a new file named `token.lua`.
- Within `token.lua`, you'll begin by initializing the token's state, defining its balance, name, ticker, and more:
-->

```lua
local json = require('json')

if not Balances then Balances = { [ao.id] = 100000000000000 } end

if Name ~= 'My Coin' then Name = 'My Coin' end

if Ticker ~= 'COIN' then Ticker = 'COIN' end

if Denomination ~= 10 then Denomination = 10 end

if not Logo then Logo = 'optional arweave TXID of logo image' end
```

![token.lua image 1](/token1.png)

ここで行ったことを分解してみましょう：

- `local json = require('json')`: このコードの最初の行は、後で使用するためのモジュールをインポートします。

- `if not Balances then Balances = { [ao.id] = 100000000000000 } end`: この2行目は、トークンを所有する人を追跡するためのBalancesテーブルを初期化しています。トークンプロセス`ao.id`を初期状態で全残高を持つように初期化します。

- 次の4行、`if Name`、`if Ticker`、`if Denomination`、`if not Logo`はすべてオプションですが、`if Denomination`を除いて、トークンの名前、ティッカー、単位、ロゴをそれぞれ定義するために使用されます。

::: info
コード`if Denomination ~= 10 then Denomination = 10 end`は、単位として扱うべきトークンの数を示しています。
:::

### **ステップ2: InfoおよびBalancesハンドラ**

<br>

#### 受信メッセージハンドラ

次に、受信メッセージを処理するための最初のハンドラを追加しましょう。

<!-- Let's break down what we've done here:

- `local json = require('json')`: This first line of this code imports a module for later use.

- `if not Balances then Balances = { [ao.id] = 100000000000000 } end`: This second line is initializing a Balances table which is the way the Process tracks who posses the token. We initialize our token process `ao.id` to start with all the balance.

- The Next 4 Lines, `if Name`, `if Ticker`, `if Denomination`, and `if not Logo` are all optional, except for `if Denomination`, and are used to define the token's name, ticker, denomination, and logo respectively.

::: info
The code `if Denomination ~= 10 then Denomination = 10 end` tells us the number of the token that should be treated as a single unit.
:::

### **Step 2: Info and Balances Handlers**

<br>

#### Incoming Message Handler

Now lets add our first Handler to handle incoming Messages.
-->

```lua
Handlers.add('info', Handlers.utils.hasMatchingTag('Action', 'Info'), function(msg)
  ao.send(
      { Target = msg.From, Tags = { Name = Name, Ticker = Ticker, Logo = Logo, Denomination = tostring(Denomination) } })
end)
```

![Token.lua image 2](/token2.png)

::: info
この時点で、私たちがすべてのハンドラを`token.lua`ファイル内に構築していることに気付いたかもしれません。`.editor`を使用していない理由です。

多くのハンドラやプロセスがある場合、`.editor`を使用してハンドラを作成することは完全に問題ありませんが、トークンの初期化、情報および残高ハンドラ、転送ハンドラ、ミントハンドラを設定する完全なプロセスを作成しているため、すべてを1つのファイルにまとめるのが最善です。

これにより、一貫性を保つこともできます。なぜなら、`token.lua`ファイルを`aos`に再読み込みするたびに、各ハンドラが更新されるからです。
:::

このコードは、誰かがタグ`Action = "info"`のメッセージを送信した場合、私たちのトークンが上記で定義されたすべての情報を含むメッセージを返すことを意味します。`Target = msg.From`に注意してください。これは、aoがこのメッセージを送信したプロセスに返信していることを示します。

#### 情報およびトークン残高ハンドラ

次に、トークンの残高に関する情報を提供する2つのハンドラを追加できます。

<!--
::: info
At this point, you've probably noticed that we're building all of the handlers inside the `token.lua` file rather than using .`editor`.

With many handlers and processes, it's perfectly fine to create your handlers using `.editor`, but because we're creating a full process for initizialing a token, setting up info and balances handlers, transfer handlers, and a minting handler, it's best to keep everything in one file.

This also allows us to maintain consistency since each handler will be updated every time we reload the `token.lua` file into `aos`.
:::

This code means that if someone Sends a message with the Tag, Action = "info", our token will Send back a message with all of the information defined above. Note the Target = msg.From, this tells ao we are replying to the process that sent us this message.

#### Info & Token Balance Handlers

Now we can add 2 Handlers which provide information about token Balances.
-->

```lua
Handlers.add('balance', Handlers.utils.hasMatchingTag('Action', 'Balance'), function(msg)
  local bal = '0'

  -- If not Target is provided, then return the Senders balance
  if (msg.Tags.Target and Balances[msg.Tags.Target]) then
    bal = tostring(Balances[msg.Tags.Target])
  elseif Balances[msg.From] then
    bal = tostring(Balances[msg.From])
  end

  ao.send({
    Target = msg.From,
    Tags = { Target = msg.From, Balance = bal, Ticker = Ticker, Data = json.encode(tonumber(bal)) }
  })
end)

Handlers.add('balances', Handlers.utils.hasMatchingTag('Action', 'Balances'),
             function(msg) ao.send({ Target = msg.From, Data = json.encode(Balances) }) end)

```

<!-- The first Handler above `Handlers.add('balance'` handles a process or person requesting their own balance or the balance of a Target. Then replies with a message containing the info. The second Handler `Handlers.add('balances'` just replies with the entire Balances table.

### **Step 3: Transfer Handlers**

Before we begin testing we will add 2 more Handlers one which allows for the transfer of tokens between processes or users.
-->

最初のハンドラ`Handlers.add('balance'`は、自分の残高またはターゲットの残高を要求しているプロセスや人に対応します。その後、情報を含むメッセージで返信します。2つ目のハンドラ`Handlers.add('balances'`は、残高テーブル全体で返信します。

### **ステップ3: 転送ハンドラ**

テストを開始する前に、プロセスやユーザー間でトークンを転送するための2つのハンドラを追加します。

```lua
Handlers.add('transfer', Handlers.utils.hasMatchingTag('Action', 'Transfer'), function(msg)
  assert(type(msg.Tags.Recipient) == 'string', 'Recipient is required!')
  assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')

  if not Balances[msg.From] then Balances[msg.From] = 0 end

  if not Balances[msg.Tags.Recipient] then Balances[msg.Tags.Recipient] = 0 end

  local qty = tonumber(msg.Tags.Quantity)
  assert(type(qty) == 'number', 'qty must be number')

  if Balances[msg.From] >= qty then
    Balances[msg.From] = Balances[msg.From] - qty
    Balances[msg.Tags.Recipient] = Balances[msg.Tags.Recipient] + qty

    --[[
      Only Send the notifications to the Sender and Recipient
      if the Cast tag is not set on the Transfer message
    ]] --
    if not msg.Tags.Cast then
      -- Debit-Notice message template, that is sent to the Sender of the transfer
      local debitNotice = {
        Target = msg.From,
        Action = 'Debit-Notice',
        Recipient = msg.Recipient,
        Quantity = tostring(qty),
        Data = Colors.gray ..
            "You transferred " ..
            Colors.blue .. msg.Quantity .. Colors.gray .. " to " .. Colors.green .. msg.Recipient .. Colors.reset
      }
      -- Credit-Notice message template, that is sent to the Recipient of the transfer
      local creditNotice = {
        Target = msg.Recipient,
        Action = 'Credit-Notice',
        Sender = msg.From,
        Quantity = tostring(qty),
        Data = Colors.gray ..
            "You received " ..
            Colors.blue .. msg.Quantity .. Colors.gray .. " from " .. Colors.green .. msg.From .. Colors.reset
      }

      -- Add forwarded tags to the credit and debit notice messages
      for tagName, tagValue in pairs(msg) do
        -- Tags beginning with "X-" are forwarded
        if string.sub(tagName, 1, 2) == "X-" then
          debitNotice[tagName] = tagValue
          creditNotice[tagName] = tagValue
        end
      end

      -- Send Debit-Notice and Credit-Notice
      ao.send(debitNotice)
      ao.send(creditNotice)
    end
  else
    ao.send({
      Target = msg.Tags.From,
      Tags = { Action = 'Transfer-Error', ['Message-Id'] = msg.Id, Error = 'Insufficient Balance!' }
    })
  end
end)
```

<!-- In summary, this code checks to make sure the Recipient and Quantity Tags have been provided, initializes the balances of the person sending the message and the Recipient if they dont exist and then attempts to transfer the specified quantity to the Recipient in the Balances table. -->

このコードは、受取人と数量のタグが提供されていることを確認し、メッセージを送信している人と受取人の残高を初期化します（存在しない場合）そして、指定された数量を残高テーブル内の受取人に転送しようとします。

```lua
Balances[msg.From] = Balances[msg.From] - qty
Balances[msg.Tags.Recipient] = Balances[msg.Tags.Recipient] + qty
```

<!-- If the transfer was successful a Debit-Notice is sent to the sender of the original message and a Credit-Notice is sent to the Recipient. -->

転送が成功した場合、元のメッセージの送信者にデビット通知が送信され、受取人にはクレジット通知が送信されます。

```lua
-- Send Debit-Notice to the Sender
ao.send({
    Target = msg.From,
    Tags = { Action = 'Debit-Notice', Recipient = msg.Tags.Recipient, Quantity = tostring(qty) }
})
-- Send Credit-Notice to the Recipient
ao.send({
    Target = msg.Tags.Recipient,
    Tags = { Action = 'Credit-Notice', Sender = msg.From, Quantity = tostring(qty) }
})
```

<!-- If there was insufficient balance for the transfer it sends back a failure message -->

転送のための残高が不足している場合、失敗メッセージを返します。

```lua
ao.send({
    Target = msg.Tags.From,
    Tags = { Action = 'Transfer-Error', ['Message-Id'] = msg.Id, Error = 'Insufficient Balance!' }
})
```

`if not msg.Tags.Cast then`という行は、キャストタグが設定されている場合、メッセージをプッシュしないことを意味します。これはaoプロトコルの一部です。

### **ステップ4: ミントハンドラ**

最後に、新しいトークンをミントするためのハンドラを追加します。

<!-- The line `if not msg.Tags.Cast then` Means were not producing any messages to push if the Cast tag was set. This is part of the ao protocol.

### **Step 4: Mint Handler**

Finally, we will add a Handler to allow the minting of new tokens. -->

```lua
Handlers.add('mint', Handlers.utils.hasMatchingTag('Action', 'Mint'), function(msg, env)
  assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')

  if msg.From == env.Process.Id then
    -- Add tokens to the token pool, according to Quantity
    local qty = tonumber(msg.Tags.Quantity)
    Balances[env.Process.Id] = Balances[env.Process.Id] + qty
  else
    ao.send({
      Target = msg.Tags.From,
      Tags = {
        Action = 'Mint-Error',
        ['Message-Id'] = msg.Id,
        Error = 'Only the Process Owner can mint new ' .. Ticker .. ' tokens!'
      }
    })
  end
end)
```

このコードは、数量タグが提供されていることを確認し、指定された数量を残高テーブルに追加します。

## ロードとテスト

`token.lua`ファイルを作成したら、または`.load-blueprint token`を使用したら、テストを開始する準備が整いました。

<!-- This code checks to make sure the Quantity Tag has been provided and then adds the specified quantity to the Balances table.

## Loading and Testing

Once you've created your `token.lua` file, or you've used `.load-blueprint token`, you're now ready to begin testing. -->

#### 1 - aosプロセスを開始

ターミナルで`aos`を実行して、aosプロセスを開始したことを確認してください。

#### 2 - token.luaファイルをロード

ガイドに従った場合、aosプロセスと同じディレクトリに`token.lua`ファイルがあるはずです。aosプロンプトからファイルをロードします。

<!-- #### 1 - Start the aos process

Make sure you've started your aos process by running `aos` in your terminal.

#### 2 - Loading the token.lua file

If you've followd along with the guide, you'll have a `token.lua` file in the same directory as your aos process. From the aos prompt, load in the file. -->

```lua
.load token.lua
```

#### 3 - トークンのテスト

今、aosプロセスIDにメッセージを送信して動作しているかどうか確認できます。ターゲットに`ao.id`を使用すると、自分自身にメッセージを送信していることになります。

<!-- #### 3 - Testing the Token

Now we can send Messages to our aos process id, from the same aos prompt to see if is working. If we use ao.id as the Target we are sending a message to ourselves. -->

```lua
Send({ Target = ao.id, Action = "Info" })
```

これにより、契約で定義された情報が表示されるはずです。最新の受信ボックスメッセージで応答を確認してください。

<!-- This should print the Info defined in the contract. Check the latest inbox message for the response. -->

```lua
Inbox[#Inbox].Tags
```

契約で定義された情報が表示されるはずです。

<!-- This should print the Info defined in the contract. -->

<!-- ::: info
Make sure you numerically are checking the last message. To do so, run `#Inbox` first to see the total number of messages are in the inbox. Then, run the last message number to see the data.
-->

::: info
最後のメッセージを数値で確認することを忘れないでください。そのために、まず`#Inbox`を実行して受信ボックス内のメッセージの合計数を確認します。その後、最後のメッセージ番号を実行してデータを確認します。
:::

**Example:**

If `#Inbox` returns `5`, then run `Inbox[5].Data` to see the data.
:::

#### 4 - 転送

次に、他のウォレットまたはプロセスIDにトークンの残高を転送してみてください。

::: info
別のプロセスIDが必要な場合は、別のターミナルウィンドウで`aos [name]`を実行して新しいプロセスIDを取得できます。同じ`aos [name]`ではないことを確認してください。
:::

<!--
#### 4 - Transfer

Now, try to transfer a balance of tokens to another wallet or process id.

::: info
If you need another process id, you can run `aos [name]` in another terminal window to get a new process id. Make sure it's not the same `aos [name]` as the one you're currently using. -->

**Example:**

If you're using `aos` in one terminal window, you can run `aos test` in another terminal window to get a new process id.
:::

```lua
Send({ Target = ao.id, Tags = { Action = "Transfer", Recipient = 'another wallet or processid', Quantity = '10000' }})
```

<!-- After sending, you'll receive a printed message in the terminal similar to `Debit-Notice` on the sender's side and `Credit-Notice` on the recipient's side. -->

送信後、ターミナルに`Debit-Notice`が送信者側に、`Credit-Notice`が受取人側に表示されるメッセージが印刷されます。

#### 5 - 残高を確認

トークンを転送したので、残高を確認してみましょう。

<!--
#### 5 - Check the Balances

Now that you've transferred some tokens, let's check the balances.
-->

```lua
Send({ Target = ao.id, Tags = { Action = "Balances" }})
```

```lua
Inbox[#Inbox].Data
```

2つのプロセスIDまたはウォレットアドレスが表示され、それぞれが残高を表示します。最初は送信プロセスID、2番目は受取人のプロセスIDである必要があります。

#### 6 - トークンのミント

最後に、いくつかのトークンをミントしようとしてください。

<!-- You will see two process IDs or wallet addresses, each displaying a balance. The first should be your sending process ID, the second should be the recipient's process ID.

#### 6 - Minting Tokens

Finally, attempt to mint some tokens.
-->

```lua
Send({ Target = ao.id, Tags = { Action = "Mint", Quantity = '1000' }})
```

And check the balances again.

```lua
Send({ Target = ao.id, Tags = { Action = "Balances" }})
Inbox[#Inbox].Data
```

<!--
You'll then see the balance of the process ID that minted the tokens has increased.

## Conclusion

That concludes the "Build a Token" guide. Learning out to build custom tokens will unlock a great deal of potential for your projects; whether that be creating a new currency, a token for a game, a governance token, or anything else you can imagine.
-->

その後、トークンをミントしたプロセスIDの残高が増加したことが確認できます。

## 結論

これで「トークンを作成する」ガイドは終了です。カスタムトークンを作成する方法を学ぶことで、プロジェクトに大きな可能性が開かれます。それは新しい通貨を作成すること、ゲーム用のトークンを作成すること、ガバナンストークンを作成すること、または想像できるすべてのことです。
