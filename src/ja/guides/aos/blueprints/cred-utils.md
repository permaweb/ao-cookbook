# CRED ユーティリティブループリント

CRED ユーティリティブループリントは、`ao` テストネットで CRED 残高を迅速に確認するのに役立つ事前設計されたテンプレートです。

## CRED ユーティリティブループリントの内容

### `CRED` メタテーブル

- **CRED.balance**: `CRED.balance` を評価すると、プロセスの CRED の最後の既知の残高が表示されます。
  以前に CRED 残高を取得したことがない場合、自動的に取得されます。
  最近 CRED が変わったと思われる場合は、まず `CRED.update` を実行することを検討してください。

- **CRED.process**: `CRED.process` を評価すると、CRED トークン発行者のプロセス ID が表示されます。

- **CRED.send**: `CRED.send(targetProcessId, amount)` を関数のように呼び出すと、`ao` プロセスから別の `ao` プロセスに CRED を転送します。

  - `targetProcessId`: **string**: 受信者の 43 文字のプロセス ID。
  - `amount`: **integer**: 送信する CRED 単位の数量。1 CRED === 1000 CRED 単位。

- **CRED.update**: `CRED.update` を評価すると、CRED 発行者プロセスにメッセージを送信して最新の CRED 残高を取得します。
  `UpdateCredBalance` ハンドラー（下記参照）が応答メッセージを受け取ります。

### ハンドラー定義

- **クレジットハンドラー**: `CRED_Credit` ハンドラーは、CRED 発行者プロセス（および `aos`）が CRED 残高の増加を自動的に通知できるようにします。

- **デビットハンドラー**: `CRED_Debit` ハンドラーは、CRED 発行者プロセス（および `aos`）が CRED 残高の減少を自動的に通知できるようにします。

- **残高更新ハンドラー**: `UpdateCredBalance` ハンドラーは、任意の `CRED.update` リクエストへの応答を受け取ります。

## ブループリントの使用方法

1. ターミナルを開きます。
2. `aos` プロセスを開始します。
3. `.load-blueprint credUtils` と入力します。
4. `CRED.balance` と入力します。

## CRED ユーティリティブループリントの内容:

最新バージョンの `aos` に付属するブループリントについては、`aos` の [GitHub ソースコード](https://github.com/permaweb/aos/blob/main/blueprints/credUtils.lua) を参照してください。

<!-- # CRED Utils Blueprint

The CRED Utils Blueprint is a predesigned template that helps you quickly check your CRED balance in `ao` legacynet.

## Unpacking the CRED Utils Blueprint

### The `CRED` Metatable

- **CRED.balance**: Evaluating `CRED.balance` will print your process's last known balance of your CRED.
  If you have never fetched your CRED balance before, it will be fetched automatically.
  If you think your CRED has recently changed, consider running `CRED.update` first.

- **CRED.process**: Evaluating `CRED.process` will print the process id of the CRED token issuer.

- **CRED.send**: Invoking `CRED.send(targetProcessId, amount)` like a function will transfer CRED from your `ao` process
  to another `ao` process.

  - `targetProcessId`: **string**: the 43-character process id of the recipient.
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
for the blueprint shipped in the latest version of `aos`. -->

```lua
CRED_PROCESS = "Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc"

_CRED = { balance = "Your CRED balance has not been checked yet. Updating now." }

local credMeta = {
    __index = function(t, key)
        -- sends CRED balance request
        if key == "update" then
            Send({ Target = CRED_PROCESS, Action = "Balance", Tags = { Target = ao.id } })
            return "Balance update requested."
            -- prints local CRED balance, requests it if not set
        elseif key == "balance" then
            if _CRED.balance == "Your CRED balance has not been checked yet. Updating now." then
                Send({ Target = CRED_PROCESS, Action = "Balance", Tags = { Target = ao.id } })
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
                Send({ Target = CRED_PROCESS, Action = "Transfer", Recipient = target, Quantity = amount })
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
