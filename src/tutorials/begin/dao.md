# DAO Guide

This guide brings you through the process of building a DAO using aos. If you have not already, you will need to first build a [token](./token.md) in aos. We will load the DAO code into aos alongside the token code from the [token](./token.md) guide. In the context of ao a DAO may be used to govern MU, CU, and SU nodes.

In our DAO we will implement a process known as "slashing". In the case of ao, if a unit is misbehaving, other units may vote to slash them. Slashing means they will lose their stake, we will get more into stake later.

Make a new directory called `dao` and copy in the token.lua created in the token guide.

```sh
mkdir dao
cd dao
cp ../token/token.lua .
```

Now create a new file called `dao.lua` and open it in your favorite editor.

## Writing the DAO code

### Initializing state

Open up dao.lua and add the following lines

```lua
Balances = Balances or {}
Stakers = Stakers or {}
Unstaking = Unstaking or {}
Votes = Votes or {}
```

These tables store the state of the DAO, including user Balances, staked tokens, Unstaking requests, and voting records.

### Staking

Staking is the process of putting your tokens up to give you the ability to vote. If someone wishes to obtain the ability to vote they must possess and stake some of their tokens. Let's add a Handler for staking. A member or node in ao would want to stake if they want to obtain the ability to vote to slash or keep a node, which we will discuss further later.

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

The above takes the quantity and a delay from the incoming message, and if the From has enough balance, puts the stake into the Stakers table. The delay represents a future time when the tokens can be unstaked.

### Unstaking

Unstaking is the process of withdrawing staked tokens. If someone Unstaked all their tokens they would be giving up the ability to vote. Here we provide a handler for Unstaking.

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

This pushes into the Unstaking table, an incoming amount from the Message and reduces the amount they have staked `stakerInfo.amount = stakerInfo.amount - quantity`.

### Voting

Voting is the process which governs the DAO. When the Vote Message is sent, members receive a Vote proportional to the amount they have staked. The deadline variable represents when the vote will be applied.

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

Here, if the Process or user sending the vote has some tokens they can place an entry in the Votes table. The `side` yay or nay, is set to the quantity of their stake. In our example a "nay" vote is a vote to slash and a "yay" vote is a vote to keep.

The msg.Tags.Target sent in would represent something being voted on. In the case of AO this may be the wallet address of a MU, CU, or SU which members are voting to slash.

### Finalization

There is some logic that we want to run on every Message. We will define this as the `finalizationHandler`. Getting slashed means you are losing your stake in the DAO.

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

### Attaching the Handlers to incoming Message Tags

Here we add a helper function called `continue` which will allow us to execute through to the finalizationHandler on every message.

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

Finally we will register all the Handlers and wrap them in continue in order to always reach the finalizationHandler for every Stake, Unstake, and Vote Message.

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

## Loading and Testing

Now that we have dao.lua complete we can load it into aos alongside token.lua from the [token](./token.md) guide. Run a new aos Process called `dao` while also loading dao.lua and token.lua

```sh
aos dao --load token.lua --load dao.lua
```

From another terminal run another aos Process called voter

```sh
aos voter
```

Now from the dao aos shell send that voter some tokens

```lua
Send({ Target = ao.id, Tags = { ["Action"] = "Transfer", ["Recipient"] = 'process ID of the voter aos', ["Quantity"] = '100000' }})
```

From another terminal run another aos Process called cu

```sh
aos cu
```

Now from the dao aos shell send that cu some tokens

```lua
Send({ Target = ao.id, Tags = { ["Action"] = "Transfer", ["Recipient"] = 'process ID of the cu aos', ["Quantity"] = '100000' }})
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

From the voter aos Process, Stake some tokens

```lua
Send({ Target = "bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s", Tags = { ["Action"] = "Stake", ["Quantity"] = '1000', ["UnstakeDelay"] = "10" }})
```

From the cu aos Process, Stake some tokens

```lua
Send({ Target = "bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s", Tags = { ["Action"] = "Stake", ["Quantity"] = '1000', ["UnstakeDelay"] = "10" }})
```

This means we want to Stake 1000 tokens for 10 blocks. So after 10 blocks we have the ability to Unstake.

Check the value of the Stakers table from the dao aos shell

```lua
Stakers
{
  'QcGIOXJ1p2SOGzGAccOcV-nSudVRiaPYbU7SjeLx1OE': { amount: 1000, unstake_at: 1342634 },
  X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s: { amount: 1000, unstake_at: 1342634 }
}

```

Now lets vote to slash the cu from the voter aos process, our vote takes effect in 1 block

```lua
Send({ Target = "bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s", Tags = { ["Action"] = "Vote", ["Target"] = "X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s(the cu aos)", ["Side"] = "nay", ["Deadline"] = "1"  }})
```

From the dao aos check the Votes

```lua
 Votes
{
  X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s: { nay: 1000, yay: 0, deadline: 1342627 }
}

```

Now wait for Arweave to reach the deadline block height and then send a Stake Message from the dao aos just to trigger the finalizationHandler. You can check the block height at [https://arweave.net/](https://arweave.net/)

```lua
Send({ Target = ao.id, Tags = { ["Action"] = "Stake", ["Quantity"] = '1000', ["UnstakeDelay"] = "10" }})
```

Now check Votes and Stakers, Votes should be empty and the cu aos Process should have lost their Stake.

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

Finally lets Unstake our tokens from the voter aos process

```lua
Send({ Target = "bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s", Tags = { ["Action"] = "Unstake", ["Quantity"] = '1000'}})
```

And check the Stakers table from the dao aos

```lua
 Stakers
{
  'QcGIOXJ1p2SOGzGAccOcV-nSudVRiaPYbU7SjeLx1OE': { amount: 0, unstake_at: 1342647 },
  bclTw5QOm5soeMXoaBfXLvzjheT1_kwc2vLfDntRE4s: { amount: 1000, unstake_at: 1342658 },
  X6mkYwt87mIsfsQzDAJr54S0BBxLrDwWMdq7seBcS6s: { amount: 0, unstake_at: 1342647 }
}

```

That concludes the DAO Guide we hope it was helpful!
