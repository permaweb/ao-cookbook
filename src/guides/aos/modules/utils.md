# Utils

A utility library for generic table manipulation and validation. It supports both curry-styled and traditional programming.

### Example usage

```lua
local utils = require(".utils")

local totalSupply = utils.reduce(
  function (acc, v) return acc + v end,
  0,
  { 2, 4, 9 }
)

print(totalSupply) -- prints 15
```

## Module functions

### `concat()`

This function concatenates array `b` to array `a`.

- **Parameters:**
  - `a`: `{table}` The base array
  - `b`: `{table}` The array to concat to the base array
- **Returns:** An unified array of `a` and `b`

#### Examples

```lua
-- returns { 1, 2, 3, 4, 5, 6 }
concat({ 1, 2, 3 })({ 4, 5, 6 })

-- returns { "hello", "world", "and", "you" }
concat({ "hello", "world" }, { "and", "you" })
```

### `reduce()`

This function executes the provided reducer function for all array elements, finally providing one (unified) result.

- **Parameters:**
  - `fn`: `{function}` The reducer function. It receives the previous result, the current element's value and key in this order
  - `initial`: `{any}` An optional initial value
  - `t`: `{table}` The array to reduce
- **Returns:** A single result from running the reducer across all table elements

#### Examples

```lua

```
