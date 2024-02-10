# Token Guide

This guide brings you through the process of building a token using aos. It is based on the ao standard token [spec](../../references/token).

To begin you will need to have aos [installed](../../guides/aos/installing.md). Now you are ready to build.

## Setting up the development environment

This guide will load code from the local file system into aos. So you will want to create a directory to edit the .lua files and run aos.

```sh
mkdir token
cd token
```

Now create a file from your favorite editor inside the token directory called token.lua, now we are ready to run aos. From within the token directory run.

```sh
aos mytoken
```

The second part of this command (mytoken) creates a named aos on your local machine which will tie a process id to that name. This feature of naming in aos allows us to run multiple aos processes on one machine. You are now in the aos shell.

## Writing the Token code

Lets write the Lua code that will be the token. This code will run in aos so we have access to the aos libraries and globals, see [intro](../../guides/aos/intro) for an outline of these.

### Initializing the Token state

Open up token.lua in your editor and add the following code.

```lua
local json = require('json')

if not Balances then Balances = { [ao.id] = 100000000000000 } end

if Name ~= 'My Coin' then Name = 'My Coin' end

if Ticker ~= 'COIN' then Ticker = 'COIN' end

if Denomination ~= 10 then Denomination = 10 end

if not Logo then Logo = 'optional arweave TXID of logo image' end
```

The first line of this code imports a module for later use. The second line `if not Balances then Balances = { [ao.id] = 100000000000000 } end` is initializing a Balances table which is the way the Process tracks who posses the token. We initialize our token process `ao.id` to start with all the balance.

The next 4 lines define the initialization parameters of the token including an optional arweave tx containing an image for the token. The Denomination variable is not optional while Name, Ticker, and Logo are. The code `if Denomination ~= 10 then Denomination = 10 end` tells us the number of the token that should be treated as a single unit.

### Info and Balances Handlers

Now lets add our first Handler to handle incoming Messages.

```lua
Handlers.add('info', Handlers.utils.hasMatchingTag('Action', 'Info'), function(msg)
  ao.send(
      { Target = msg.From, Tags = { Name = Name, Ticker = Ticker, Logo = Logo, Denomination = tostring(Denomination) } })
end)
```

This code means that if someone Sends a message with the Tag, Action = "info", our token will Send back a message with all of the information defined above. Note the `Target = msg.From`, this tells ao we are replying to the process that sent us this message.

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

### Handling Token Transfers

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

In summary, this code checks to make sure the Recipient and Quantity Tags have been provided, initializes the balances of the person sending the message and the Recipient if they dont exist and then attempts to transfer the specified quantity to the Recipient in the Balances table

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

### Minting

We will add 1 final Handler that allows the creator of this token to mint more of the token.

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

## Loading and Testing

Ok now we are ready to load this file into aos and test. From the aos prompt load in the file.

```sh
aos> .load token.lua
```

Now we can send Messages to our aos process id, from the same aos prompt to see if is working. If we use ao.id as the Target we are sending a message to ourselves.

```sh
aos> Send({ Target = ao.id, Tags = { Action = "Info" }})
```

Check the latest inbox message, if its not there yet wait a few seconds and check again.

```sh
aos> Inbox[#Inbox].Data
```

This should print the Info defined in the contract.

Now try a transfer

```sh
aos> Send({ Target = ao.id, Tags = { Action = "Transfer", Recipient = 'another wallet or processid', Quantity = '10000' }})
```

And check the balances

```sh
aos> Send({ Target = ao.id, Tags = { Action = "Balances" }})
aos> Inbox[#Inbox].Data
```

You should see a balance for the Recipient you sent to.

Finally, attempt to mint some tokens

```sh
Send({ Target = ao.id, Tags = { Action = "Mint", Quantity = '1000' }})
```

And check the balances

```sh
aos> Send({ Target = ao.id, Tags = { Action = "Balances" }})
aos> Inbox[#Inbox].Data
```

That concludes the token example we hope it was helpful!
