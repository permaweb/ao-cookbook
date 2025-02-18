# Utils

A utility library for generic table manipulation and validation. It supports both curry-styled and traditional programming.

> **Note**: It is important to verify that the inputs provided to the following functions match the expected types.

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
concat({ 1, 2, 3 })({ 4, 5, 6 }) -- curry syntax

-- returns { "hello", "world", "and", "you" }
concat({ "hello", "world" }, { "and", "you" }) -- traditional syntax
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
local sum = utils.reduce(
  function (acc, v) return acc + v end,
  0,
  { 1, 2, 3 }
)

print(sum) -- prints 6
```

```lua
local sum = utils
  .reduce(function (acc, v) return acc + v end)(0)({ 5, 4, 3 })

print(sum) -- prints 12
```

### `map()`

This function creates a new array filled with the results of calling the provided map function on each element in the provided array.

- **Parameters:**
  - `fn`: `{function}` The map function. It receives the current array element and key
  - `data`: `{table}` The array to map
- **Returns:** A new array composed of the results of the map function

#### Examples

```lua
-- returns { "Odd", "Even", "Odd" }
utils.map(
  function (val, key)
    return (val % 2 == 0 and "Even") or "Odd"
  end,
  { 3, 4, 7 }
)
```

```lua
-- returns { 4, 8, 12 }
utils.map(function (val, key) return val * 2 end)({ 2, 4, 6 })
```

### `filter()`

This function creates a new array from a portion of the original, only keeping the elements that passed a provided filter function's test.

- **Parameters:**
  - `fn`: `{function}` The filter function. It receives the current array element and should return a boolean, deciding whether the element should be kept (`true`) or filtered out (`false`)
  - `data`: `{table}` The array to filter
- **Returns:** The new filtered array

#### Examples

```lua
-- keeps even numbers
utils.filter(
  function (val) return val % 2 == 0 end,
  { 3, 4, 7 }
)
```

```lua
-- keeps only numbers
utils.filter(
  function (val) return type(val) == "number" end,
  { "hello", "world", 13, 44 }
)
```

### `find()`

This function returns the first element that matches in a provided function.

- **Parameters:**
  - `fn`: `{function}` The find function that receives the current element and returns `true` if it matches, `false` if it doesn't
  - `t`: `{table}` The array to find an element in
- **Returns:** The found element or `nil` if no element matched

#### Examples

```lua
local users = {
  { name = "John", age = 50 },
  { name = "Victor", age = 37 },
  { name = "Maria", age = 33 }
}

-- returns the user "John"
utils.find(
  function (val) return user.name == "John" end,
  users
)
```

```lua
-- returns the user "Maria"
utils.find(function (val) return user.age == 33 end)(users)
```

### `reverse()`

Transforms an array into reverse order.

- **Parameters:**
  - `data`: `{table}` The array to reverse
- **Returns:** The original array in reverse order

#### Example

```lua
-- is: { 3, 2, 1 }
utils.reverse({ 1, 2, 3 })
```

### `includes()`

Determines whether a value is part of an array.

- **Parameters:**
  - `val`: `{any}` The element to check for
  - `t`: `{table}` The array to check in
- **Returns:** A boolean indicating whether or not the provided value is part of the array

#### Examples

```lua
-- this is true
utils.includes("John", { "Victor", "John", "Maria" })
```

```lua
-- this is false
utils.includes(4)({ 3, 5, 7 })
```

### `keys()`

Returns the keys of a table.

- **Parameters:**
  - `table`: `{table}` The table to get the keys for
- **Returns:** An array of keys

#### Example

```lua
-- returns { "hello", "name" }
utils.keys({ hello = "world", name = "John" })
```

### `values()`

Returns the values of a table.

- **Parameters:**
  - `table`: `{table}` The table to get the values for
- **Returns:** An array of values

#### Example

```lua
-- returns { "world", "John" }
utils.values({ hello = "world", name = "John" })
```

### `propEq()`

Checks if a specified property of a table equals with the provided value.

- **Parameters:**
  - `propName`: `{string}` The name of the property to compare
  - `value`: `{any}` The value to compare to
  - `object`: `{table}` The object to select the property from
- **Returns:** A boolean indicating whether the property value equals with the provided value or not

#### Examples

```lua
local user = { name = "John", age = 50 }

-- returns true
utils.propEq("age", 50, user)
```

```lua
local user = { name = "Maria", age = 33 }

-- returns false
utils.propEq("age", 45, user)
```

### `prop()`

Returns the property value that belongs to the property name provided from an object.

- **Parameters:**
  - `propName`: `{string}` The name of the property to get
  - `object`: `{table}` The object to select the property value from
- **Returns:** The property value or `nil` if it was not found

#### Examples

```lua
local user = { name = "Maria", age = 33 }

-- returns "Maria"
utils.prop("name", user)
```

```lua
local user = { name = "John", age = 50 }

-- returns 50
utils.prop("age")(user)
```

### `compose()`

This function allows you to chain multiple array mutations together and execute them in reverse order on the provided array.

- **Parameters:**
  - `...`: `{function[]}` The array mutations
  - `v`: `{table}` The object to execute the provided functions on
- **Returns:** The result from the provided mutations

#### Examples

```lua
-- returns 12
utils.compose(
  utils.reduce(function (acc, val) return acc + val end, 0),
  utils.map(function (val) return val * 2 end)
)({ 1, 2, 3 })
```
