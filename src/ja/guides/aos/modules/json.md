# JSON

JSONモジュールは、JavaScript Object Notationを使用してオブジェクトのエンコードとデコードを可能にします。

### Example usage

```lua
local json = require("json")

json.encode({
  a_string = "This is a string",
  nums = { 1, 2, 3 }
})
```

<!-- ## Module functions

### `encode()`

This function returns a string representation of a Lua object in JSON.

- **Parameters:**
  - `val`: `{any}` The object to format as JSON
- **Returns:** JSON string representation of the provided object -->

## Module functions

### `encode()`

この関数は、LuaオブジェクトのJSON文字列表現を返します。

- **Parameters:**
  - `val`: `{any}` JSONとしてフォーマットするオブジェクト
- **Returns:** 提供されたオブジェクトのJSON文字列表現

#### Example

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

<!-- ### `decode()`

The function takes a JSON string and turns it into a Lua object.

- **Parameters:**
  - `val`: `{any}` The JSON string to decode
- **Returns:** Lua object corresponding to the JSON string (throws an error for invalid JSON strings) -->

### `decode()`

この関数は、JSON文字列を受け取り、それをLuaオブジェクトに変換します。

- **Parameters:**
  - `val`: `{any}` デコードするJSON文字列
- **Returns:** JSON文字列に対応するLuaオブジェクト（無効なJSON文字列の場合はエラーをスローします）

#### Example

```lua
--[[
  creates the following table:
  { hello = "world" }
]]--
json.decode('{ "hello": "world" }')

-- creates a boolean with true value
json.decode("true")
```
