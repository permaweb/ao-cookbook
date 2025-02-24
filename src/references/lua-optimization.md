# Lua Optimization Guide for AO Platform

This guide provides practical tips for writing efficient, fast, and performant Lua code for on-chain programs on the AO platform.

## Table Operations

### Appending Elements

```lua
-- ❌ Inefficient: Up to 7x slower in tight loops
table.insert(t, v)

-- ✅ Efficient: Direct indexing is ~2x faster
t[#t + 1] = v
```

### Removing Elements

```lua
-- ❌ Inefficient: Shifts all elements left
table.remove(t, 1)

-- ✅ Efficient: Remove from end
local x = t[#t]
t[#t] = nil
```

## Variable Access

### Local Variables

```lua
-- ❌ Inefficient: Global lookup each time
for i = 1, 1000 do
  math.sin(i)
end

-- ✅ Efficient: Cache the function
local sin = math.sin
for i = 1, 1000 do
  sin(i)  -- ~30% faster in loops
end
```

### Upvalues

```lua
-- ❌ Inefficient: Config lookup on each call
Handlers.add("ValidateGameToken",
  function(msg)
    local config = ao.config
    validateToken(msg, config)
  end
)

-- ✅ Efficient: Cache config as upvalue
local config = ao.config
Handlers.add("ValidateGameToken",
  function(msg)
    validateToken(msg, config)
  end
)
```

## String Operations

### String Concatenation

```lua
-- ❌ Inefficient: Creates many intermediate strings
local str = ""
for i = 1, N do
  str = str .. "line" .. i
end

-- ✅ Efficient: Single concatenation at end
local lines = {}
for i = 1, N do
  lines[i] = "line" .. i
end
local str = table.concat(lines)
```

### Pattern Matching

```lua
-- ❌ Inefficient: Recompiles pattern on each iteration
for line in io.lines() do
  if line:match("^%s*(%w+)%s*=%s*(%w+)") then
    -- Process match
  end
end

-- ✅ Efficient: Compile pattern once
local pattern = "^%s*(%w+)%s*=%s*(%w+)"
for line in io.lines() do
  if line:match(pattern) then
    -- Process match
  end
end
```

## Memory Management

### Table Reuse

```lua
-- ❌ Inefficient: Creates new table on each call
Handlers.add("ComputeGameResults",
  function(msg)
    local results = {}
    -- Fill results
    return results
  end
)

-- ✅ Efficient: Reuse and clear table
local results = {}
Handlers.add("ComputeGameResults",
  function(msg)
    for k in pairs(results) do results[k] = nil end
    -- Fill results
    return results
  end
)
```

### Minimize Garbage Creation

```lua
-- ❌ Inefficient: Creates new response table on every transfer
local function createTransferResponse(sender, recipient, amount)
  return {
    from = sender,
    to = recipient,
    quantity = amount,
    success = true,
    newBalance = Balances[sender],
    tags = {
      Action = "Transfer-Complete",
      Type = "Token"
    }
  }
end

-- ✅ Efficient: Reuse template table
local transferResponse = {
  from = nil,
  to = nil,
  quantity = 0,
  success = false,
  newBalance = 0,
  tags = {
    Action = "Transfer-Complete",
    Type = "Token"
  }
}

local function createTransferResponse(sender, recipient, amount)
  transferResponse.from = sender
  transferResponse.to = recipient
  transferResponse.quantity = amount
  transferResponse.success = true
  transferResponse.newBalance = Balances[sender]
  return transferResponse
end
```

## Blockchain-Specific Optimizations

### State Management

```lua
-- ❌ Inefficient: Multiple separate state updates
for _, item in ipairs(items) do
  ao.send({ Target = "processID", Action = "Update", Data = item })
end

-- ✅ Efficient: Batch updates into single message
local updates = {}
for _, item in ipairs(items) do
  table.insert(updates, item)
end
ao.send({ Target = "processID", Action = "BatchUpdate", Data = updates })
```

## Additional Resources

- [Lua Performance Guide](https://www.lua.org/gems/sample.pdf)
- Special thanks to [@allquantor](https://x.com/allquantor/status/1887370546259644728?s=12) for sharing optimization tips
