# ステーキングブループリント

ステーキングブループリントは、`ao`でステーキングシステムを迅速に構築するための事前設計されたテンプレートです。これは、始めるのに最適な方法であり、ニーズに合わせてカスタマイズできます。

## 前提条件

ステーキングブループリントを使用するには、最初に[トークンブループリント](./token.md)をロードする必要があります。

## ステーキングブループリントの内容

- **ステーカー**: `Stakers`配列は、参加者のステークされたトークンを保存するために使用されます。

- **アンステーキング**: `Unstaking`配列は、参加者のアンステーキングリクエストを保存するために使用されます。

- **ステークアクションハンドラー**: `stake`ハンドラーは、プロセスがトークンをステークできるようにします。プロセスがタグ`Action = "Stake"`のメッセージを送信すると、ハンドラーはステークされたトークンを`Stakers`配列に追加し、ステーキングを確認するメッセージをプロセスに返します。

- **アンステークアクションハンドラー**: `unstake`ハンドラーは、プロセスがトークンをアンステークできるようにします。プロセスがタグ`Action = "Unstake"`のメッセージを送信すると、ハンドラーはアンステーキングリクエストを`Unstaking`配列に追加し、アンステーキングを確認するメッセージをプロセスに返します。

- **最終化ハンドラー**: `finalize`ハンドラーは、プロセスがステーキングプロセスを最終化できるようにします。プロセスがタグ`Action = "Finalize"`のメッセージを送信すると、ハンドラーはアンステーキングリクエストを処理し、ステーキングプロセスを最終化します。

### 使用方法:

1. 好みのテキストエディタを開きます。
2. ターミナルを開きます。
3. `aos`プロセスを開始します。
4. `.load-blueprint staking`と入力します。

### ブループリントがロードされたか確認する:

`Handlers.list`と入力して、新しくロードされたハンドラーを確認します。

## ステーキングブループリントの内容:

<!-- # Staking Blueprint

The Staking Blueprint is a predesigned template that helps you quickly build a staking system in `ao`. It is a great way to get started and can be customized to fit your needs.

## Prerequisites

The Staking Blueprint requires the [Token Blueprint](./token.md) to be loaded, first.

## Unpacking the Staking Blueprint

- **Stakers**: The `Stakers` array is used to store the staked tokens of the participants.

- **Unstaking**: The `Unstaking` array is used to store the unstaking requests of the participants.

- **Stake Action Handler**: The `stake` handler allows processes to stake tokens. When a process sends a message with the tag `Action = "Stake"`, the handler will add the staked tokens to the `Stakers` array and send a message back to the process confirming the staking.

- **Unstake Action Handler**: The `unstake` handler allows processes to unstake tokens. When a process sends a message with the tag `Action = "Unstake"`, the handler will add the unstaking request to the `Unstaking` array and send a message back to the process confirming the unstaking.

- **Finalization Handler**: The `finalize` handler allows processes to finalize the staking process. When a process sends a message with the tag `Action = "Finalize"`, the handler will process the unstaking requests and finalize the staking process.

### How To Use:

1. Open your preferred text editor.
2. Open the Terminal.
3. Start your `aos` process.
4. Type in `.load-blueprint staking`

### Verify the Blueprint is Loaded:

Type in `Handlers.list` to see the newly loaded handlers.

## What's in the Staking Blueprint: -->

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
