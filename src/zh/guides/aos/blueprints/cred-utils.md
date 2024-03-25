# CRED Utils 蓝图

CRED Utils 蓝图是一个预先设计的模板，可帮助你快速的在`ao`测试网中查看你的 CRED 余额。

## 解密 CRED 工具蓝图

### `CRED` 信息表

- **CRED.balance**: 运行 `CRED.balance` 会显示您进程已知的最新 CRED 余额。如果您之前从未查询过余额，它将自动获取。如果你认为你的CRED最近发生变动，建议先运行`CRED.update`更新余额。

- **CRED.process**: 运行此命令会打印发行CRED代币的进程ID。

- **CRED.send**: 就像调用函数一样使用 `CRED.send(targetProcessId, amount)` 可以将 CRED 从您的 ao 进程发送到另一个 ao 进程。

  - `targetProcessId`: **string**: 接收方的43位字符的进程 ID。
  - `amount`: **integer**: 要发送的 CRED 单位数量。1 CRED等于1000份CRED。

- **CRED.update**: 运行`CRED.update`命令会向 CRED 发行方的进程发送消息，从而获取您最新的 CRED 余额。更新后的余额将由下文提到的 `UpdateCredBalance` 处理程序接收处理。

### Handler 定义

- **Credit Handler**: `CRED_Credit` handler支持 CRED 发行方进程（以及aos）在你的 CRED 余额增加时自动通知你。

- **Debit Handler**: `CRED_Debit` Handler支持 CRED 发行方进程（以及aos）在你的 CRED 余额减少时自动通知你。

- **Update Balance Handler**: `UpdateCredBalance` handler 接收所有 CRED.update 请求的响应。

## 如何使用蓝图

1. 打开终端。
2. 启动你的`aos` 进程。
3. 输入 `.load-blueprint credUtils`。
4. 输入 `CRED.balance`

## CRED 工具蓝图中包含的内容：

有关 `aos` 最新版本中提供的蓝图，请参阅 github 上`aos` [source code on GitHub](https://github.com/permaweb/aos/blob/main/blueprints/credUtils.lua)的源代码。

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
