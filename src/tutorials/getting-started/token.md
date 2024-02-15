# Crafting a Token in aos

::: info
Diving deeper into the `ao`, you're now ready to create your own token, a symbol of value and exchange within this decentralized medium. If you've found yourself wanting to learn how to create a token, but haven't visited the [Messaging](messaging) and [Build a Chatroom](chatroom) lessons, be sure to do so as this page is part of a multi-part interactive tutorial.
:::

When creating tokens, we'll continue to use the [Lua Language](../../references/lua.md) within `ao` to mint a token, guided by the principles outlined in the [Token Specification](../../references/token.md).

### Continuing Down the Rabbit Hole

In our last tutorial, [Build a Chatroom](chatroom), we learned how to create a chatroom within `ao`, invited both `Morpheus` and `Trinity` to the chatroom we created, and then `Trinity` has now asked for us to create a token for her as a way of proving ourselves worthy of continuing down the rabbit hole.

**Let us begin.**

## Preparations

### **Step 1: Initializing the Token**

- Open our preferred text editor, preferrably from within the same folder you used fduring the previous tutorial.
- Create a new file named `token.lua`.
- Within `token.lua`, you'll begin by initializing the token's state, defining its balance, name, ticker, and more:

```lua
local json = require('json')

if not Balances then Balances = { [ao.id] = 100000000000000 } end

if Name ~= 'My Coin' then Name = 'My Coin' end

if Ticker ~= 'COIN' then Ticker = 'COIN' end

if Denomination ~= 10 then Denomination = 10 end

if not Logo then Logo = 'optional arweave TXID of logo image' end
```

![token.lua image 1](/token1.png)

Let's break down what we've done here:

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

```lua
Handlers.add('info', Handlers.utils.hasMatchingTag('Action', 'Info'), function(msg)
  ao.send(
      { Target = msg.From, Tags = { Name = Name, Ticker = Ticker, Logo = Logo, Denomination = tostring(Denomination) } })
end)
```

![Token.lua image 2](/token2.png)

::: tip
At this point, you've probably noticed that I'm all of my handlers inside the `token.lua` file.

With many handlers and processes, it's perfectly fine to create your Handlers using `.editor`, but because we're creating a full process for initizialing a token, setting up info and balances handlers, transfer handlers, and a minting handler, it's best to keep everything in one file.

This also allows us to maintain consistency since each handler will be updated every time we reload the `token.lua` file into `aos`.
:::

This code means that if someone Sends a message with the Tag, Action = "info", our token will Send back a message with all of the information defined above. Note the Target = msg.From, this tells ao we are replying to the process that sent us this message.

#### Info & Token Balance Handlers

Now we can add 2 Handlers which provide information about token Balances.

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

The first Handler above `Handlers.add('balance'` handles a process or person requesting their own balance or the balance of a Target. Then replies with a message containing the info. The second Handler `Handlers.add('balances'` just replies with the entire Balances table.

### **Step 3: Transfer Handlers**

Before we begin testing we will add 2 more Handlers one which allows for the transfer of tokens between processes or users.

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
    end
  else
    ao.send({
      Target = msg.Tags.From,
      Tags = { Action = 'Transfer-Error', ['Message-Id'] = msg.Id, Error = 'Insufficient Balance!' }
    })
  end
end)
```

In summary, this code checks to make sure the Recipient and Quantity Tags have been provided, initializes the balances of the person sending the message and the Recipient if they dont exist and then attempts to transfer the specified quantity to the Recipient in the Balances table.

```lua
Balances[msg.From] = Balances[msg.From] - qty
Balances[msg.Tags.Recipient] = Balances[msg.Tags.Recipient] + qty
```

If the transfer was successful a Debit-Notice is sent to the sender of the original message and a Credit-Notice is sent to the Recipient.

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

If there was insufficient balance for the transfer it sends back a failure message

```lua
ao.send({
    Target = msg.Tags.From,
    Tags = { Action = 'Transfer-Error', ['Message-Id'] = msg.Id, Error = 'Insufficient Balance!' }
})
```

The line `if not msg.Tags.Cast then` Means were not producing any messages to crank if the Cast tag was set. This is part of the ao protocol.

### **Step 4: Mint Handler**

Finally, we will add a Handler to allow the minting of new tokens.

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

This code checks to make sure the Quantity Tag has been provided and then adds the specified quantity to the Balances table.

## Loading & Testing

---

# COMMIT - FEB 15, 2024 (17:08) [WORK IN PROGRESS]

NOTES: This is a work in progress. Will be gamifyin' the verbiage. I've added a few screenshots, but I will be adding more infographic visuals. Also, need to add the final steps for testing the token. After that, the process of transferring a token to `Trinity` will be the conclusion of this module.

<!-- ## Inscribing the Token's Essence

With your environment ready, let's channel the essence of your token into `token.lua`.

### **Step 1: Setting the Stage**

- In `token.lua`, weave the initial state of your token, defining its balance, name, ticker, and more:

```lua
local json = require('json')

-- Initial token balance for the creator
if not Balances then Balances = { [ao.id] = 100000000000000 } end

-- Token attributes
if Name ~= 'My Coin' then Name = 'My Coin' end
if Ticker ~= 'COIN' then Ticker = 'COIN' end
if Denomination ~= 10 then Denomination = 10 end
if not Logo then Logo = 'optional arweave TXID of logo image' end
````

### **Step 2: Crafting the Handlers**

- **Information Beacon**:

Summon a handler to reveal your token's nature upon request:

```lua
Handlers.add('info', Handlers.utils.hasMatchingTag('Action', 'Info'), function(msg)
  ao.send({ Target = msg.From, Tags = { Name, Ticker, Logo, tostring(Denomination) } })
end)
```

- **Balance Inquiry**:

Invoke handlers to enlighten others of their wealth or the collective riches:

```lua
Handlers.add('balance', Handlers.utils.hasMatchingTag('Action', 'Balance'), function(msg)
  local bal = Balances[msg.From] or '0'
  ao.send({ Target = msg.From, Data = json.encode({ Balance = bal, Ticker }) })
end)

Handlers.add('balances', Handlers.utils.hasMatchingTag('Action', 'Balances'), function(msg)
  ao.send({ Target = msg.From, Data = json.encode(Balances) })
end)
```

- **Transference Ritual**:

Enable the flow of value between beings:

```lua
Handlers.add('transfer', Handlers.utils.hasMatchingTag('Action', 'Transfer'), function(msg)
  -- Validate and execute the transfer
end)
```

- **Minting Power**:

Reserve the ability to mint more tokens, a privilege of the creator:

```lua
Handlers.add('mint', Handlers.utils.hasMatchingTag('Action', 'Mint'), function(msg)
  -- Mint tokens, ensuring only the creator can perform this action
end)
```

## Testing the Magic

### **Step 1: Awakening Your Token**

- From the heart of `aos`, breathe life into your creation:

```sh
.load token.lua
```

### **Step 2: Engaging with Your Creation**

- Query your token's essence, transfer wealth, and behold the balances change as you interact with your creation.

- **Reveal the Token's Nature**:

```sh
Send({ Target = ao.id, Tags = { Action = "Info" }})
```

- **Perform a Transference**:

```sh
Send({ Target = ao.id, Tags = { Action = "Transfer", Recipient = 'another identity', Quantity = '10000' }})
```

- **Inspect the Wealth**:

```sh
Send({ Target = ao.id, Tags = { Action = "Balances" }})
```

- **Expand the Treasury**:

```sh
Send({ Target = ao.id, Tags = { Action = "Mint", Quantity = '1000' }})
```

## Conclusion

Through these incantations and scripts, you've not only forged a token but have also touched upon the power of decentralized technology. Your journey through `ao` has begun, and with it, the endless possibilities that await.

May your token thrive in the `ao

` universe, a testament to your understanding and creativity. -->
