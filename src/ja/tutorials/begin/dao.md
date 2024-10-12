# DAO ガイド

このガイドでは、aos を使用して DAO を構築するプロセスを説明します。まだ行っていない場合は、最初に aos で [トークン](./token.md) を構築する必要があります。DAO コードを aos に読み込み、[トークン](./token.md) ガイドからトークンコードを読み込む予定です。ao の文脈では、DAO は MU、CU、および SU ノードを統治するために使用されることがあります。

私たちの DAO では、「スラッシング」と呼ばれるプロセスを実装します。ao の場合、ユニットが不正行為を行った場合、他のユニットはそれをスラッシュするために投票することができます。スラッシングとは、彼らが持っているステークを失うことを意味します。後でステークについて詳しく説明します。

`dao` という新しいディレクトリを作成し、トークンガイドで作成した token.lua をコピーしてください。

<!-- # DAO Guide

This guide brings you through the process of building a DAO using aos. If you have not already, you will need to first build a [token](./token.md) in aos. We will load the DAO code into aos alongside the token code from the [token](./token.md) guide. In the context of ao a DAO may be used to govern MU, CU, and SU nodes.

In our DAO we will implement a process knwon as "slashing". In the case of ao, if a unit is misbehaving, other units may vote to slash them. Slashing means they will lose their stake, we will get more into stake later.

Make a new directory called `dao` and copy in the token.lua created in the token guide. -->

```sh
mkdir dao
cd dao
cp ../token/token.lua .
```

今、`dao.lua` という新しいファイルを作成し、お気に入りのエディタで開きます。

## DAO コードを書く

### 状態の初期化

`dao.lua` を開き、以下の行を追加します。

<!--
Now create a new file called `dao.lua` and open it in your favorite editor.

## Writing the DAO code

### Initializing state

Open up dao.lua and add the following lines -->

```lua
Balances = Balances or {}
Stakers = Stakers or {}
Unstaking = Unstaking or {}
Votes = Votes or {}
```

これらのテーブルは、ユーザーの残高、ステークされたトークン、アンステーキングリクエスト、投票記録など、DAO の状態を保存します。

### ステーキング

ステーキングは、自分のトークンを預けるプロセスであり、投票する能力を与えます。誰かが投票する能力を得たい場合、彼らはトークンを所有し、ステークしなければなりません。ステーキングのためのハンドラーを追加しましょう。ao のメンバーやノードは、ノードをスラッシュするか維持するために投票する能力を得たい場合、ステークを希望します。これは後で詳しく説明します。

<!--
These tables store the state of the DAO, including user Balances, staked tokens, Unstaking requests, and voting records.

### Staking

Staking is the process of putting your tokens up to give you the ability to vote. If someone wishes to obtain the ability to vote they must possess and stake some of their tokens. Let's add a Handler for staking. A member or node in ao would want to stake if they want to obtain the ability to vote to slash or keep a node, which we will discuss further later. -->

```lua
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
```

上記のコードは、受信したメッセージから数量と遅延を取得し、もし送信者に十分な残高があれば、ステークを Stakers テーブルに追加します。遅延は、トークンがアンステークされる未来の時間を表します。

### アンステーキング

アンステーキングは、ステークされたトークンを引き出すプロセスです。誰かがすべてのトークンをアンステークすると、彼らは投票する能力を放棄することになります。ここでは、アンステーキングのためのハンドラーを提供します。

<!--
The above takes the quantity and a delay from the incoming message, and if the From has enough balance, puts the stake into the Stakers table. The delay represents a future time when the tokens can be unstaked.

### Unstaking

Unstaking is the process of withdrawing staked tokens. If someone Unstaked all their tokens they would be giving up the ability to vote. Here we provide a handler for Unstaking. -->

```lua
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
```

これにより、受信した金額を Unstaking テーブルに追加し、彼らのステークされた金額を減少させます。`stakerInfo.amount = stakerInfo.amount - quantity`。

### 投票

投票は DAO を統治するプロセスです。投票メッセージが送信されると、メンバーは彼らがステークした量に比例した投票を受け取ります。デッドライン変数は、投票が適用される時刻を表します。

<!--
This pushes into the Unstaking table, an incoming amount from the Message and reduces the amount they have staked `stakerInfo.amount = stakerInfo.amount - quantity`.

### Voting

Voting is the process which governs the DAO. When the Vote Message is sent, members receive a Vote proportional to the amount they have staked. The deadline variable represents when the vote will be applied. -->

```lua
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
```

ここでは、投票を送信するプロセスまたはユーザーがトークンを持っている場合、Votes テーブルにエントリを追加できます。`side` の yay または nay は、彼らのステークの量に設定されます。例として、"nay" 投票はスラッシュする投票であり、"yay" 投票は維持する投票です。

送信された msg.Tags.Target は、投票される対象を表します。AO の場合、これはメンバーがスラッシュすることに投票している MU、CU、または SU のウォレットアドレスである可能性があります。

### 最終化

すべてのメッセージに対して実行したいロジックがあります。これを `finalizationHandler` として定義します。スラッシュされるということは、DAO 内でのステークを失うことを意味します。

<!--
Here, if the Process or user sending the vote has some tokens they can place an entry in the Votes table. The `side` yay or nay, is set to the quantity of their stake. In our example a "nay" vote is a vote to slash and a "yay" vote is a vote to keep.

The msg.Tags.Target sent in would represent something being voted on. In the case of AO this may be the wallet address of a MU, CU, or SU which members are voting to slash.

### Finalization

There is some logic that we want to run on every Message. We will define this as the `finalizationHandler`. Getting slashed means you are losing your stake in the DAO. -->

```lua
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
  -- Process voting
  for target, voteInfo in pairs(Votes) do
      if currentHeight >= voteInfo.deadline then
          if voteInfo.nay > voteInfo.yay then
              -- Slash the target's stake
              local slashedAmount = Stakers[target] and Stakers[target].amount or 0
              Stakers[target].amount = 0
          end
          -- Clear the vote record after processing
          Votes[target] = nil
      end
  end
end
```

### 受信メッセージタグへのハンドラーの添付

ここでは、すべてのメッセージに対して `finalizationHandler` まで実行できるヘルパー関数 `continue` を追加します。

最後に、すべてのハンドラーを登録し、各 Stake、Unstake、および Vote メッセージに対して常に finalizationHandler に到達できるように `continue` でラップします。

<!--
### Attaching the Handlers to incoming Message Tags

Here we add a helper function called `continue` which will allow us to execute through to the finalizationHandler on every message. -->

```lua
-- wrap function to continue handler flow
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

最後に、すべてのハンドラーを登録し、それらを continue でラップして、すべての Stake、Unstake、Vote メッセージに対して常に finalizationHandler に到達できるようにします。

<!-- Finally we will register all the Handlers and wrap them in continue in order to always reach the finalizationHandler for every Stake, Unstake, and Vote Message. -->

```lua
-- Registering Handlers
Handlers.add("stake",
  continue(Handlers.utils.hasMatchingTag("Action", "Stake")), Handlers.stake)
Handlers.add("unstake",
  continue(Handlers.utils.hasMatchingTag("Action", "Unstake")), Handlers.unstake)
Handlers.add("vote",
  continue(Handlers.utils.hasMatchingTag("Action", "Vote")), Handlers.vote)
-- Finalization handler should be called for every message
Handlers.add("finalize", function (msg) return -1 end, finalizationHandler)
```

## 読み込みとテスト

`dao.lua` が完成したので、これをトークンガイドの `token.lua` とともに aos に読み込むことができます。`dao` という新しい aos プロセスを実行し、`dao.lua` と `token.lua` を読み込みます。

<!-- ## Loading and Testing

Now that we have dao.lua complete we can load it into aos alongside token.lua from the [token](./token.md) guide. Run a new aos Proces called `dao` while also loading dao.lua and token.lua -->

```sh
aos dao --load token.lua --load dao.lua
```

<!-- From another terminal run another aos Process called voter -->

別のターミナルから、voterという名前の別の aos プロセスを実行します。

```sh
aos voter
```

<!-- Now from the dao aos shell send that voter some tokens -->

次に、dao aos シェルからその voter にいくつかのトークンを送信します。

```lua
Send({ Target = ao.id, Tags = { Action = "Transfer", Recipient = 'process id of the voter aos', Quantity = '100000' }})
```

<!-- From another terminal run another aos Process called cu -->

別のターミナルから、cuという名前の別の aos プロセスを実行します。

```sh
aos cu
```

<!-- Now from the dao aos shell send that cu some tokens -->

次に、dao aos シェルからその cu にいくつかのトークンを送信します。

```lua
Send({ Target = ao.id, Tags = { Action = "Transfer", Recipient = 'process id of the cu aos', Quantity = '100000' }})
```

Check the Balances from the dao aos shell, we should see a balance for the voter and cu Process. In the below examples `bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s` is the dao aos, `QcGIOXJ1p2SOGzGAccOcV-nSudVRiaPYbU7SjeLx1OE` is the voter aos, and `X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s` is the cu aos.

```lua
Balances
{
  'QcGIOXJ1p2SOGzGAccOcV-nSudVRiaPYbU7SjeLx1OE': 100000,
  bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s: 99999999900000,
  X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s: 100000
}
```

<!-- From the voter aos Process, Stake some tokens -->

voter aos プロセスから、いくつかのトークンをステークします。

```lua
Send({ Target = "bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s", Tags = { Action = "Stake", Quantity = '1000', UnstakeDelay = "10" }})
```

<!-- From the cu aos Process, Stake some tokens -->

cu aos プロセスから、いくつかのトークンをステークします。

```lua
Send({ Target = "bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s", Tags = { Action = "Stake", Quantity = '1000', UnstakeDelay = "10" }})
```

<!-- This means we want to Stake 1000 tokens for 10 blocks. So after 10 blocks we have the ability to Unstake. -->

これは、10 ブロックの間に 1000 トークンをステークすることを意味します。したがって、10 ブロック後にアンステークする能力が得られます。

<!-- Check the value of the Stakers table from the dao aos shell -->

dao aos シェルから Stakers テーブルの値を確認します。

```lua
Stakers
{
  'QcGIOXJ1p2SOGzGAccOcV-nSudVRiaPYbU7SjeLx1OE': { amount: 1000, unstake_at: 1342634 },
  X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s: { amount: 1000, unstake_at: 1342634 }
}

```

<!-- Now lets vote to slash the cu from the voter aos process, our vote takes effect in 1 block -->

次に、voter aos プロセスから cu をスラッシュするための投票を行います。私たちの投票は 1 ブロック後に効力を発揮します。

```lua
Send({ Target = "bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s", Tags = { Action = "Vote", Target = "X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s(the cu aos)", Side = "nay", Deadline = "1"  }})
```

From the dao aos check the Votes

```lua
 Votes
{
  X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s: { nay: 1000, yay: 0, deadline: 1342627 }
}

```

<!-- Now wait for Arweave to reach the deadline block height and then send a Stake Message from the dao aos just to trigger the finalizationHandler. You can check the block height at [https://arweave.net/](https://arweave.net/) -->

次に、Arweave が締切の block height に達するのを待ってから、dao aos からステークメッセージを送信して finalizationHandler をトリガーします。 block height は [https://arweave.net/](https://arweave.net/) で確認できます。

```lua
Send({ Target = ao.id, Tags = { Action = "Stake", Quantity = '1000', UnstakeDelay = "10" }})
```

<!-- Now check Votes and Stakers, Votes should be empty and the cu aos Process should have lost their Stake. -->

Votes と Stakers を確認します。Votes は空で、cu aos プロセスはステークを失っているはずです。

```lua
 Votes
[]
 Stakers
{
  'QcGIOXJ1p2SOGzGAccOcV-nSudVRiaPYbU7SjeLx1OE'(voter aos process): { amount: 1000, unstake_at: 1342647 },
  bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s(dao aos process): { amount: 1000, unstake_at: 1342658 },
  X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s(cu aos process): { amount: 0, unstake_at: 1342647 }
}

```

<!-- Finally lets Unstake our tokens from the voter aos process -->

最後に、voter aos プロセスからトークンのアンステークを行います。

```lua
Send({ Target = "bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s", Tags = { Action = "Unstake", Quantity = '1000'}})
```

<!-- And check the Stakers table from the dao aos -->

そして、dao aos から Stakers テーブルを確認します。

```lua
 Stakers
{
  'QcGIOXJ1p2SOGzGAccOcV-nSudVRiaPYbU7SjeLx1OE': { amount: 0, unstake_at: 1342647 },
  bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s: { amount: 1000, unstake_at: 1342658 },
  X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s: { amount: 0, unstake_at: 1342647 }
}

```

<!-- That concludes the DAO Guide we hope it was helpful! -->

これで DAO ガイドは終了です。お役に立てたことを願っています！
