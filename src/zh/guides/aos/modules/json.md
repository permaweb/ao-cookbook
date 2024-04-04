# JSON

JSON 模块支持你使用 JavaScript 对象表示法对对象进行编码和解码。

### 示例用法

```lua
local json = require("json")

json.encode({
  a_string = "This is a string",
  nums = { 1, 2, 3 }
})
```

## 模块函数

### `encode()`

将 Lua 对象转换为 JSON 字符串。

- **参数:**
  - `val`: `{any}` 需要格式化的对象
- **返回值:** 对象的 JSON 格式字符串

#### 示例

```lua
--[[
  prints:
  "[{"name":"John Doe","age":23},{"name":"Bruce Wayne",age:34}]"
]]--
print(json.encode({
  { name = "John Doe", age = 23 },
  { name = "Bruce Wayne", age = 34 }
}))

-- prints "false"
print(json.encode(false))
```

### `decode()`

此函数用于解析 JSON 字符串并转换为 Lua 对象。

- **参数:**
  - `val`: `{any}` 待解码的 JSON 字符串
- **返回值:** JSON 字符串对应的 Lua 对象（对于无效的 JSON 字符串会抛出错误）

#### 示例

```lua
--[[
  creates the following table:
  { hello = "world" }
]]--
json.decode('{ "hello": "world" }')

-- creates a boolean with true value
json.decode("true")
```
