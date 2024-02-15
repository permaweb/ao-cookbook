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

Let's break down what we've done here:

# COMMIT 2/14/2024 7:29PM ENDS HERE **WORK IN PROGRESS**

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
```

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
