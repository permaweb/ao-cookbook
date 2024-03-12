# Utils 工具库

该工具库提供了通用的表格操作和验证功能。它同时支持链式调用 (curry-style) 和传统编程方式。

> **注意**: 务必确保提供给以下函数的输入与期望的类型相匹配。

### 使用示例

```lua
local utils = require(".utils")

local totalSupply = utils.reduce(
  function (acc, v) return acc + v end,
  0,
  { 2, 4, 9 }
)

print(totalSupply) -- prints 15
```

## 模块函数

### `concat()`

此函数将数组 `b` 连接到数组 `a`。

- **Parameters:**
  - `a`: `{table}` 基础数组
  - `b`: `{table}` 要连接到基础数组的数组
- **Returns:** 由 `a` 和 `b` 合并而成的统一数组

#### 示例

```lua
-- returns { 1, 2, 3, 4, 5, 6 }
concat({ 1, 2, 3 })({ 4, 5, 6 })

-- returns { "hello", "world", "and", "you" }
concat({ "hello", "world" }, { "and", "you" })
```

### `reduce()`

此函数对数组中的所有元素执行 reducer 函数，最终返回一个 (统一的) 结果。

- **Parameters:**
  - `fn`: `{function}`  reducer 函数,它按顺序接收之前的结果、当前元素的值和键。
  - `initial`: `{any}` (可选) 初始值
  - `t`: `{table}` 要处理的数组
- **Returns:** 通过对所有表格元素运行 reducer 函数所得的单个结果

#### 示例

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

此函数创建一个新数组，其中包含了对提供的数组中的每个元素调用指定映射函数的结果。

- **Parameters:**
  - `fn`: `{function}` map 函数,接收当前数组元素和键。
  - `data`: `{table}` 要映射的数组
- **Returns:** 由映射函数处理后的结果组成的的新数组

#### 示例

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

此函数根据提供的过滤函数来处理原数组，并创建一个只包含通过过滤条件的元素的新数组。

- **Parameters:**
  - `fn`: `{function}` 过滤函数。它接收当前数组中的元素作为参数，并应该返回一个布尔值,以决定该元素应被保留 (`true`) 还是过滤掉(`false`)。
  - `data`: `{table}` 要过滤的数组
- **Returns:** 经过过滤的新数组

#### 示例

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

该函数查找匹配指定条件的第一个元素并返回。

- **Parameters:**
  - `fn`: `{function}` 查找函数。它接收当前数组元素作为参数，如果该元素满足条件则返回`true`，否则返回 `false`。
  - `t`: `{table}`  要查找元素的数组
- **Returns:** 找到的符合条件的第一个元素，如果没有找到则返回 `nil` (表示空值)。
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

将数组转换为反序。

- **Parameters:**
  - `data`: `{table}` 需要反序的数组
- **Returns:** 反序的数组

#### 示例

```lua
-- is: { 3, 2, 1 }
utils.reverse({ 1, 2, 3 })
```

### `includes()`

判断值是否在数组中。

- **Parameters:**
  - `val`: `{any}` 需要检查的元素
  - `t`: `{table}` 需要检查的数组
- **Returns:** 一个布尔值，判断提供的 val 值是否属于该数组。true 表示存在，false 表示不存在。

#### 示例

```lua
-- this is true
utils.includes("John", { "Victor", "John", "Maria" })
```

```lua
-- this is false
utils.includes(4)({ 3, 5, 7 })
```

### `keys()`

返回表格的键值。

- **Parameters:**
  - `table`: `{table}` 要获取键值的表格
- **Returns:**  键数组

#### 示例

```lua
-- returns { "hello", "name" }
utils.keys({ hello = "world", name = "John" })
```

### `values()`

返回表格的值。

- **Parameters:**
  - `table`: `{table}` 需要获取值的表格
- **Returns:** 值数组

#### 示例

```lua
-- returns { "world", "John" }
utils.values({ hello = "world", name = "John" })
```

### `propEq()`

该函数检查表格中指定属性的值是否等于提供的数值。

- **Parameters:**
  - `propName`: `{string}` 要比较的属性名称
  - `value`: `{any}` 要比较的值
  - `object`: `{table}` 要从中选择属性的对象（表格）
- **Returns:** 一个布尔值，判断属性值是否等于提供的数值，如果属性值存在且等于提供的数值，则返回 True，否则返回 False。

#### 示例

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

该函数的作用是从对象（表格）中获取指定属性的值。

- **Parameters:**
  - `propName`: `{string}` 要获取的属性名称
  - `object`: `{table}` 要从中选择属性值的对象
- **Returns:** 属性值，如果未找到，则返回 `nil`。

#### 示例

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

此函数支持您将多个数组操作链接在一起，然后以逆序的方式对提供的数组执行这些操作。

- **Parameters:**
  - `...`: `{function[]}` 一组数组操作函数
  - `v`: `{table}` 要执行这些函数的数组
- **Returns:** 来自所提供操作的最终结果

#### 示例

```lua
-- returns 12
utils.compose(
  utils.reduce(function (acc, val) return acc + val end, 0),
  utils.map(function (val) return val * 2 end)
)({ 1, 2, 3 })
```
