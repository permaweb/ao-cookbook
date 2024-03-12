# JSON

JSON 模块支持您使用 JavaScript 对象表示法对对象进行编码和解码。

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

返回一个将 Lua 对象转换为JSON字符串的函数。

- **参数:**
  - `val`: `{any}` 将对象按照 JSON 格式进行编码
- **返回值:** 已提供对象的 JSON 字符串

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

The function takes a JSON string and turns it into a Lua object.
此函数用于解析 JSON 字符串并转换为 Lua 对象。

- **参数:**
  - `val`: `{any}` 待解码的 JSON 字符串
- **返回值:** 与 JSON 字符串对应的 Lua 对象（对于无效的 JSON 字符串会抛出错误）

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
