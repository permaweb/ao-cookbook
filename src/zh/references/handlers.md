# Handlers (版本 0.0.3)

## 概览

Handlers library 提供了一种灵活的方式来管理和执行一系列基于模式的 handler。每个 handler 由一个匹配函数、一个处理函数和一个名称组成。这个 library 适用于需要根据不同的输入条件采取不同行动的场景。

## 模块结构

- `Handlers._version`: 代表 Handlers library 版本的字符串。
- `Handlers.list`: 存储注册的 handler 列表的表。

## 方法

### `Handlers.add(name, pattern, handler)`

添加一个新的 handler 或者根据名称更新已有的 handler。

### `Handlers.append(name, pattern, handle)`

在 handler 列表的末尾插入一个新的 handler。

#### 传入参数

- `pattern` (function 类型): 判断 handler 是否被执行的方法。
- `handle` (function 类型): handler 方法的执行函数。
- `name` (string 类型): handler 的唯一命名。

### `Handlers.prepend(name, pattern, handle)`

把一个新的 handler 加到 handler 列表的开头.

#### 传入参数

- 和 `handlers.append` 的一样。

### `Handlers.before(handleName)`

返回一个对象，可以在特定的 handler 前加入一个新的 handler。

#### 传入参数

- `handleName` (string 类型): 在新的 handler 加入前，需要给 handler 的命名。

#### 返回值

- 一个拥有 `add` 方法的对象，可以插入新的 handler。

### `Handlers.after(handleName)`

返回一个对象，可以在特定的 handler 后加入一个新的 handler。

#### 传入参数

- `handleName` (string 类型): 在新的 handler 加入后，需要给 handler 的命名。

#### 返回值

- 一个拥有 `add` 方法的对象，可以插入新的 handler。

### `Handlers.remove(name)`

根据名称从 handler 列表里移除一个 handler。

#### 传入参数

- `name` (string 类型): 要被移除的 handler 的名称。

### `Handlers.evaluate(msg, env)`

根据给定的消息和环境对每个 handler 进行评估。handler 按照它们在 handler 列表中出现的顺序依次调用。

#### 传入参数

- `msg` (table 类型): handler 要处理的消息。
- `env` (table 类型): handler 执行的环境。

#### 返回值

- `response` (类型取决于 handler 是否匹配): handler 的响应。如果没有匹配的 handler，返回一个默认消息。

## 使用案例

```lua
-- 定义模式和处理函数
local function myPattern(msg)
    -- 判断 handler 是否被执行
end

local function myHandle(msg, env, response)
    -- Handler 逻辑
end

-- 加一个新的 handler
Handlers.add("myHandler", myPattern, myHandle)

-- 评估一条消息
local response = handlers.evaluate({ key = "value" }, { envKey = "envValue" })
```

## 说明

- 根据 Handler 在 `handlers.list` 中的顺序执行
- 匹配函数返回 `0` 代表跳过 handler，返回 `-1` 代表在 handler 执行后中断，或者返回 `1` 代表继续执行下一个 handler。
- `evaluate` 方法可以从多个 handler 上连接响应。

## Handlers.utils

Handlers.utils 模块提供了两个常见的匹配模式函数和一个常见的处理函数。

- hasMatchingData(data)
- hasMatchingTag(name, value)
- reply(txt)

### Handlers.utils.hasMatchingData(data : string)

这个辅助函数返回一个需要消息参数的函数，因此你可以将它放入任何 handler 的匹配参数中。该函数会将传入消息的数据与作为参数提供的字符串进行比较。

```lua
Handlers.add("ping",
    Handlers.utils.hasMatchingData("ping"),
    ...
)
```

如果这个进入进程的消息有设置成 ”ping" 的数据，那么这个 handler 会匹配上它，并调用处理函数。

### Handlers.hasMatchingTag(name : string, value : string)

这个辅助函数返回一个需要消息参数的函数，因此你可以将它放入 Handlers 模块的任何匹配参数中。该函数会比较 Tag 的名称和数值，如果它们相等，则调用处理函数。

```lua
Handlers.add("ping",
    Handlers.utils.hasMatchingData("ping"),
    ...
)
```

### Handlers.reply(text : string)

这个辅助函数是一个简单的处理函数，就是将 text 的值放入发送消息的 Data 属性中。

```lua
Handlers.add("ping",
    Handlers.utils.hasMatchingData("ping"),
    Handlers.utils.reply("pong")
)
```
