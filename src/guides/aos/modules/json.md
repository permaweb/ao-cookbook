# JSON

The JSON module allows you to encode and decode objects using JavaScript Object Notation.

### Example usage

```lua
local json = require("json")

json.encode({
  a_string = "This is a string",
  nums = { 1, 2, 3 }
})
```

## Module functions

### `encode()`

This function returns a string representation of a Lua object in JSON.

- **Parameters:**
  - `val`: `{any}` The object to format as JSON
- **Returns:** JSON string representation of the provided object

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

### `decode()`

The function takes a JSON string and turns it into a Lua object.

- **Parameters:**
  - `val`: `{any}` The JSON string to decode
- **Returns:** Lua object corresponding to the JSON string (throws an error for invalid JSON strings)

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
