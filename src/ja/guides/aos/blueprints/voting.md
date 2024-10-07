# 投票ブループリント

投票ブループリントは、`ao`で迅速に投票システムを構築するための事前設計されたテンプレートです。これは、始めるのに最適な方法であり、ニーズに合わせてカスタマイズできます。

## 前提条件

投票ブループリントを使用するには、まず[トークンブループリント](./token.md)をロードする必要があります。

## 投票ブループリントの内容

- **バランス**: `Balances`配列は、参加者のトークンバランスを保存するために使用されます。

- **投票**: `Votes`配列は、参加者の投票を保存するために使用されます。

- **投票アクションハンドラー**: `vote`ハンドラーは、プロセスが投票できるようにします。プロセスが`Action = "Vote"`というタグのメッセージを送信すると、ハンドラーは投票を`Votes`配列に追加し、投票が確認されたことを示すメッセージをプロセスに返します。

- **最終化ハンドラー**: `finalize`ハンドラーは、プロセスが投票プロセスを最終化できるようにします。プロセスが`Action = "Finalize"`というタグのメッセージを送信すると、ハンドラーは投票を処理し、投票プロセスを最終化します。

### 使用方法:

1. 好みのテキストエディタを開きます。
2. ターミナルを開きます。
3. `aos`プロセスを開始します。
4. `.load-blueprint voting`と入力します。

### ブループリントがロードされたか確認する:

`Handlers.list`と入力して、新しくロードされたハンドラーを確認します。

## 投票ブループリントの内容:

<!-- # Voting Blueprint

The Voting Blueprint is a predesigned template that helps you quickly build a voting system in `ao`. It is a great way to get started and can be customized to fit your needs.

## Prerequisites

The Staking Blueprint requires the [Token Blueprint](./token.md) to be loaded, first.

## Unpacking the Voting Blueprint

- **Balances**: The `Balances` array is used to store the token balances of the participants.

- **Votes**: The `Votes` array is used to store the votes of the participants.

- **Vote Action Handler**: The `vote` handler allows processes to vote. When a process sends a message with the tag `Action = "Vote"`, the handler will add the vote to the `Votes` array and send a message back to the process confirming the vote.

- **Finalization Handler**: The `finalize` handler allows processes to finalize the voting process. When a process sends a message with the tag `Action = "Finalize"`, the handler will process the votes and finalize the voting process.

### How To Use:

1. Open your preferred text editor.
2. Open the Terminal.
3. Start your `aos` process.
4. Type in `.load-blueprint voting`

### Verify the Blueprint is Loaded:

Type in `Handlers.list` to see the newly loaded handlers.

## What's in the Voting Blueprint: -->

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
