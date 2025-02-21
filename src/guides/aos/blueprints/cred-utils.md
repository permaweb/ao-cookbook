# CRED Utils Blueprint

::: warning CRED is now deprecated
CRED was a token used during ao's legacynet phase to reward early developers. It is no longer earnable or redeemable.
:::

The CRED Utils Blueprint is a predesigned template that helps you quickly check your CRED balance in `ao` legacynet.

## Unpacking the CRED Utils Blueprint

### The `CRED` Metatable

- **CRED.balance**: Evaluating `CRED.balance` will print your process's last known balance of your CRED.
  If you have never fetched your CRED balance before, it will be fetched automatically.
  If you think your CRED has recently changed, consider running `CRED.update` first.

- **CRED.process**: Evaluating `CRED.process` will print the process ID of the CRED token issuer.

- **CRED.send**: Invoking `CRED.send(targetProcessId, amount)` like a function will transfer CRED from your `ao` process
  to another `ao` process.

  - `targetProcessId`: **string**: the 43-character process ID of the recipient.
  - `amount`: **integer**: The quantity of CRED units to send. 1 CRED === 1000 CRED units.

- **CRED.update**: Evaluating `CRED.update` will fetch your latest CRED balance by sending a message to the CRED
  issuer process. The `UpdateCredBalance` handler (see below) will ingest the response message.

### Handler Definitions

- **Credit Handler**: The `CRED_Credit` handler allows the CRED issuer process (and `aos`) to automatically notify you when your
  CRED balance increase.

- **Debit Handler**: The `CRED_Debit` handler allows the CRED issuer process (and `aos`) to automatically notify you when your
  CRED balance decreases.

- **Update Balance Handler**: The `UpdateCredBalance` handler ingests the response to any `CRED.update` requests.

## How To Use the Blueprint

1. Open the Terminal.
2. Start your `aos` process.
3. Type in `.load-blueprint credUtils`
4. Type in `CRED.balance`

## What's in the CRED Utils Blueprint:

See the `aos` [source code on GitHub](https://github.com/permaweb/aos/blob/main/blueprints/credUtils.lua)
for the blueprint shipped in the latest version of `aos`.

```lua
CRED_PROCESS = "Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc"

_CRED = { balance = "Your CRED balance has not been checked yet. Updating now." }

local credMeta = {
    __index = function(t, key)
        -- sends CRED balance request
        if key == "update" then
            Send({ Target = CRED_PROCESS, Action = "Balance", Tags = { ["Target"] = ao.id } })
            return "Balance update requested."
            -- prints local CRED balance, requests it if not set
        elseif key == "balance" then
            if _CRED.balance == "Your CRED balance has not been checked yet. Updating now." then
                Send({ Target = CRED_PROCESS, Action = "Balance", Tags = { ["Target"] = ao.id } })
            end
            return _CRED.balance
            -- prints CRED process ID
        elseif key == "process" then
            return CRED_PROCESS
            -- tranfers CRED
        elseif key == "send" then
            return function(target, amount)
                -- ensures amount is string
                amount = tostring(amount)
                print("sending " .. amount .. "CRED to " .. target)
                Send({ Target = CRED_PROCESS, Action = "Transfer", ["Recipient"] = target, ["Quantity"] = amount })
            end
        else
            return nil
        end
    end
}


CRED = setmetatable({}, credMeta)

-- Function to evaluate if a message is a balance update
local function isCredBalanceMessage(msg)
    if msg.From == CRED_PROCESS and msg.Tags.Balance then
        return true
    else
        return false
    end
end

-- Function to evaluate if a message is a Debit Notice
local function isDebitNotice(msg)
    if msg.From == CRED_PROCESS and msg.Tags.Action == "Debit-Notice" then
        return true
    else
        return false
    end
end

-- Function to evaluate if a message is a Credit Notice
local function isCreditNotice(msg)
    if msg.From == CRED_PROCESS and msg.Tags.Action == "Credit-Notice" then
        return true
    else
        return false
    end
end

local function formatBalance(balance)
    -- Ensure balance is treated as a string
    balance = tostring(balance)
    -- Check if balance length is more than 3 to avoid unnecessary formatting
    if #balance > 3 then
        -- Insert dot before the last three digits
        balance = balance:sub(1, -4) .. "." .. balance:sub(-3)
    end
    return balance
end

-- Handles Balance messages
Handlers.add(
    "UpdateCredBalance",
    isCredBalanceMessage,
    function(msg)
        local balance = nil
        if msg.Tags.Balance then
            balance = msg.Tags.Balance
        end
        -- Format the balance if it's not set
        if balance then
            -- Format the balance by inserting a dot after the first three digits from the right
            local formattedBalance = formatBalance(balance)
            _CRED.balance = formattedBalance
            print("CRED Balance updated: " .. _CRED.balance)
        else
            print("An error occurred while updating CRED balance")
        end
    end
)

-- Handles Debit notices
Handlers.add(
    "CRED_Debit",
    isDebitNotice,
    function(msg)
        print(msg.Data)
    end
)

-- Handles Credit notices
Handlers.add(
    "CRED_Credit",
    isCreditNotice,
    function(msg)
        print(msg.Data)
    end
)
```
