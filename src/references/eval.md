# Eval 

Each AO process includes an onboard `Eval` Handler, which evaluates any new code sent to it. This Handler enables the process to determine the appropriate action for code being added and checks if the message came from the process owner.

The `Eval` handler can also be manually triggered to evaluate received data, such as when a parent process sends a message to upload new handlers to its child process.

## Sending The Eval Action To Load Code Into A Child Process
```lua
Send({
    Target = Child_Process,
    Action = "Eval",
    Data = [[
        Handlers.add("ping", Handlers.utils.reply("pong"))
    ]]
})
```

## Eval Handler (_eval)
```sh
local stringify = require(".stringify")
-- handler for eval
return function (ao)
  return function (msg)
    -- exec expression
    local expr = msg.Data
    local func, err = load("return " .. expr, 'aos', 't', _G)
    local output = ""
    local e = nil
    if err then
      func, err = load(expr, 'aos', 't', _G)
    end
    if func then
      output, e = func()
    else
      ao.outbox.Error = err
      return
    end
    if e then 
      ao.outbox.Error = e
      return 
    end
    if HANDLER_PRINT_LOGS and output then
      table.insert(HANDLER_PRINT_LOGS, type(output) == "table" and stringify.format(output) or tostring(output))
    else 
      -- set result in outbox.Output (Left for backwards compatibility)
      ao.outbox.Output = {  
        json = type(output) == "table" and pcall(function () return json.encode(output) end) and output or "undefined",
        data = {
          output = type(output) == "table" and stringify.format(output) or output,
          prompt = Prompt()
        }, 
        prompt = Prompt() 
      }

    end
  end 
end
```
