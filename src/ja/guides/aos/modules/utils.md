# Utils

汎用のテーブル操作と検証のためのユーティリティライブラリです。カリー形式と従来のプログラミングの両方をサポートしています。

> **Note**: 次の関数に提供される入力が期待されるタイプと一致していることを確認することが重要です。

<!-- # Utils

A utility library for generic table manipulation and validation. It supports both curry-styled and traditional programming.

> **Note**: It is important to verify that the inputs provided to the following functions match the expected types. -->

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

この関数は配列 `b` を配列 `a` に連結します。

- **Parameters:**
  - `a`: `{table}` 基本配列
  - `b`: `{table}` 基本配列に連結する配列
- **Returns:** `a` と `b` の統合された配列

<!-- ## Module functions

### `concat()`

This function concatenates array `b` to array `a`.

- **Parameters:**
  - `a`: `{table}` The base array
  - `b`: `{table}` The array to concat to the base array
- **Returns:** An unified array of `a` and `b` -->

#### Examples

```lua
-- returns { 1, 2, 3, 4, 5, 6 }
concat({ 1, 2, 3 })({ 4, 5, 6 })

-- returns { "hello", "world", "and", "you" }
concat({ "hello", "world" }, { "and", "you" })
```

<!--
### `reduce()`

This function executes the provided reducer function for all array elements, finally providing one (unified) result.

- **Parameters:**
  - `fn`: `{function}` The reducer function. It receives the previous result, the current element's value and key in this order
  - `initial`: `{any}` An optional initial value
  - `t`: `{table}` The array to reduce
- **Returns:** A single result from running the reducer across all table elements -->

### `reduce()`

この関数は、すべての配列要素に対して提供されたリデューサ関数を実行し、最終的に1つの（統合された）結果を提供します。

- **Parameters:**
  - `fn`: `{function}` リデューサ関数。前の結果、現在の要素の値、およびキーをこの順序で受け取ります。
  - `initial`: `{any}` オプションの初期値
  - `t`: `{table}` 簡略化する配列
- **Returns:** すべてのテーブル要素に対してリデューサを実行した結果としての単一の結果

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

<!--
### `map()`

This function creates a new array filled with the results of calling the provided map function on each element in the provided array.

- **Parameters:**
  - `fn`: `{function}` The map function. It receives the current array element and key
  - `data`: `{table}` The array to map
- **Returns:** A new array composed of the results of the map function -->

### `map()`

この関数は、提供された配列内の各要素に対して提供されたマップ関数を呼び出した結果で満たされた新しい配列を作成します。

- **Parameters:**
  - `fn`: `{function}` マップ関数。現在の配列要素とキーを受け取ります。
  - `data`: `{table}` マッピングする配列
- **Returns:** マップ関数の結果で構成された新しい配列

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

<!--
### `filter()`

This function creates a new array from a portion of the original, only keeping the elements that passed a provided filter function's test.

- **Parameters:**
  - `fn`: `{function}` The filter function. It receives the current array element and should return a boolean, deciding whether the element should be kept (`true`) or filtered out (`false`)
  - `data`: `{table}` The array to filter
- **Returns:** The new filtered array -->

### `filter()`

この関数は、元の配列の一部から新しい配列を作成し、提供されたフィルタ関数のテストに合格した要素のみを保持します。

- **Parameters:**
  - `fn`: `{function}` フィルタ関数。現在の配列要素を受け取り、要素を保持するか（`true`）フィルタリングするか（`false`）を決定するためにブール値を返す必要があります。
  - `data`: `{table}` フィルタリングする配列
- **Returns:** 新しいフィルタリングされた配列

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

<!--
### `find()`

This function returns the first element that matches in a provided function.

- **Parameters:**
  - `fn`: `{function}` The find function that receives the current element and returns `true` if it matches, `false` if it doesn't
  - `t`: `{table}` The array to find an element in
- **Returns:** The found element or `nil` if no element matched -->

### `find()`

この関数は、提供された関数で一致する最初の要素を返します。

- **Parameters:**
  - `fn`: `{function}` 現在の要素を受け取り、一致する場合は`true`、一致しない場合は`false`を返すfind関数。
  - `t`: `{table}` 要素を検索する配列
- **Returns:** 見つかった要素、または一致する要素がない場合は`nil`

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

<!--
### `reverse()`

Transforms an array into reverse order.

- **Parameters:**
  - `data`: `{table}` The array to reverse
- **Returns:** The original array in reverse order -->

### `reverse()`

配列を逆順に変換します。

- **Parameters:**
  - `data`: `{table}` 逆順にする配列
- **Returns:** 元の配列を逆順にしたもの

#### Example

```lua
-- is: { 3, 2, 1 }
utils.reverse({ 1, 2, 3 })
```

<!--
### `includes()`

Determinates whether a value is part of an array.

- **Parameters:**
  - `val`: `{any}` The element to check for
  - `t`: `{table}` The array to check in
- **Returns:** A boolean indicating whether or not the provided value is part of the array -->

### `includes()`

配列に値が含まれているかどうかを判定します。

- **Parameters:**
  - `val`: `{any}` 確認する要素
  - `t`: `{table}` 確認する配列
- **Returns:** 提供された値が配列に含まれているかどうかを示すブール値

#### Examples

```lua
-- this is true
utils.includes("John", { "Victor", "John", "Maria" })
```

```lua
-- this is false
utils.includes(4)({ 3, 5, 7 })
```

<!--
### `keys()`

Returns the keys of a table.

- **Parameters:**
  - `table`: `{table}` The table to get the keys for
- **Returns:** An array of keys -->

### `keys()`

テーブルのキーを返します。

- **Parameters:**
  - `table`: `{table}` キーを取得するテーブル
- **Returns:** キーの配列

#### Example

```lua
-- returns { "hello", "name" }
utils.keys({ hello = "world", name = "John" })
```

<!--
### `values()`

Returns the values of a table.

- **Parameters:**
  - `table`: `{table}` The table to get the values for
- **Returns:** An array of values -->

### `values()`

テーブルの値を返します。

- **Parameters:**
  - `table`: `{table}` 値を取得するテーブル
- **Returns:** 値の配列

#### Example

```lua
-- returns { "world", "John" }
utils.values({ hello = "world", name = "John" })
```

<!--
### `propEq()`

Checks if a specified property of a table equals with the provided value.

- **Parameters:**
  - `propName`: `{string}` The name of the property to compare
  - `value`: `{any}` The value to compare to
  - `object`: `{table}` The object to select the property from
- **Returns:** A boolean indicating whether the property value equals with the provided value or not -->

### `propEq()`

テーブルの指定されたプロパティが提供された値と等しいかどうかをチェックします。

- **Parameters:**
  - `propName`: `{string}` 比較するプロパティの名前
  - `value`: `{any}` 比較する値
  - `object`: `{table}` プロパティを選択するオブジェクト
- **Returns:** 提供された値とプロパティの値が等しいかどうかを示すブール値

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

<!--
### `prop()`

Returns the property value that belongs to the property name provided from an object.

- **Parameters:**
  - `propName`: `{string}` The name of the property to get
  - `object`: `{table}` The object to select the property value from
- **Returns:** The property value or `nil` if it was not found -->

### `prop()`

指定されたプロパティ名に属するプロパティの値をオブジェクトから返します。

- **Parameters:**
  - `propName`: `{string}` 取得するプロパティの名前
  - `object`: `{table}` プロパティ値を選択するオブジェクト
- **Returns:** プロパティの値、または見つからなかった場合は `nil`

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

<!--
### `compose()`

This function allows you to chain multiple array mutations together and execute them in reverse order on the provided array.

- **Parameters:**
  - `...`: `{function[]}` The array mutations
  - `v`: `{table}` The object to execute the provided functions on
- **Returns:** The result from the provided mutations -->

### `compose()`

この関数は、複数の配列の変異を連鎖させ、提供された配列に対して逆の順序で実行することを可能にします。

- **Parameters:**
  - `...`: `{function[]}` 配列の変異
  - `v`: `{table}` 提供された関数を実行するオブジェクト
- **Returns:** 提供された変異からの結果

#### Examples

```lua
-- returns 12
utils.compose(
  utils.reduce(function (acc, val) return acc + val end, 0),
  utils.map(function (val) return val * 2 end)
)({ 1, 2, 3 })
```
