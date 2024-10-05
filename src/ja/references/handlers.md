<!-- # Handlers (Version 0.0.5)

## Overview

The Handlers library provides a flexible way to manage and execute a series of process functions based on pattern matching. An AO process responds based on receiving Messages, these messages are defined using the Arweave DataItem specification which consists of Tags, and Data. Using the Handlers library, you can define a pipeline of process evaluation based on the attributes of the AO Message. Each handler items consists of a pattern function, a handle function, and a name. This library is suitable for scenarios where different actions need to be taken based on varying input criteria.

## Concepts

### Pattern Matching Tables

Pattern Matching Tables is a concept of providing a Table representation of the matching shape of the incoming message. Here are the rules: -->

# ハンドラ (バージョン 0.0.5)

## 概要

Handlersライブラリは、パターンマッチングに基づいて一連のプロセス関数を管理・実行する柔軟な方法を提供します。AOプロセスは、メッセージを受信して応答します。これらのメッセージは、タグとデータで構成されたArweave DataItem仕様を使用して定義されます。Handlersライブラリを使用することで、AOメッセージの属性に基づいてプロセス評価のパイプラインを定義できます。各ハンドラアイテムは、パターン関数、ハンドル関数、および名前で構成されています。このライブラリは、さまざまな入力条件に基づいて異なるアクションを実行する必要があるシナリオに適しています。

## コンセプト

### パターンマッチングテーブル

パターンマッチングテーブルは、受信メッセージのマッチング形状をテーブル形式で提供する概念です。以下がそのルールです：

```lua

{ "Action" = "Do-Something" } -- 含めるべきタグのテーブルを通じて、任意のメッセージをマッチング

{ "Recipient" = '_' } -- 受信者タグが任意の値を持つメッセージをマッチング

{ "Quantity" = "%d+" } -- Luaの文字列マッチ（正規表現に似ている）を使用してタグを検証

{ "Quantity" = function(v) return tonumber(v) ~= Nil end } -- タグに関数を適用してチェック。Nilやfalseはマッチしない

```

Example:

Actionが「Balance」に等しいすべてのメッセージにマッチさせたい場合：

```lua
{ Action = "Balance" }
```

Quantityが数値であるすべてのメッセージにマッチさせたい場合：

```lua
{ Quantity = "%d+" }
```

### リゾルバ

リゾルバは、各キーがパターンマッチングテーブルであり、値がマッチしたキーに基づいて実行される関数であるテーブルです。これにより、開発者はリゾルバプロパティ内でcaseのようなステートメントを作成できます。

```lua
Handlers.add("foobarbaz",
  { Action = "Update" }, {
  [{ Status = "foo" }] = function (msg) print("foo") end,
  [{ Status = "bar" }] = function (msg) print("bar") end,
  [{ Status = "baz" }] = function (msg) print("baz") end
})
```

## モジュール構造

- `Handlers._version`: Handlersライブラリのバージョンを表す文字列。
- `Handlers.list`: 登録されたハンドラのリストを格納するテーブル。

## ハンドラメソッドの共通関数シグネチャ

<!-- - `Handlers._version`: String representing the version of the Handlers library.
- `Handlers.list`: Table storing the list of registered handlers.

## Handler method common function signature -->

| Parameter          | Type                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name               | string                       | The identifier of the handler item in the handlers list.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| pattern            | Table or Function            | This parameter can take a table that specifies a pattern that the message MUST match, for example `{ Action = "Balance", Recipient = "_" }` this table describes a message that has a Tag called action and it equals the string "Balance", and the message MUST have a Recipient Tag with a value. If you are unable to add a pattern via a table, you can also use the `function` which receives the message DataItem as its argument and you can return a `true`, `false` or `"continue"` result. The `true` result tells the Handlers evaluation pipeline to invoke this handler and exit out of the pipeline. The `false` result tells the Handlers evaluation pipeline to skip this handler and try to find a pattern matched by the next Handler item in the pipeline. Finally, the `"continue"` informs the Handlers evaluation to invoke this handler and continue evaluating. |
| handler            | Table (Resolver) or Function | This parameter can take a table that acts as a conditional that invokes a function based on a pattern matched key. or a Function that takes the message DataItem as an argument and performs some business logic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| maxRuns (optional) | number                       | As of 0.0.5, each handler function takes an optional function to define the amount of times the handler should match before it is removed. The default is infinity.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

<!--
## Functions

### `Handlers.add(name, pattern, handler)`

adds a new handler or updates an existing handler by name

### `Handlers.append(name, pattern, handle)`

Appends a new handler to the end of the handlers list.

### `Handlers.once(name, pattern, handler)`

Only runs once when the pattern is matched.

### `Handlers.prepend(name, pattern, handle)`

Prepends a new handler to the beginning of the handlers list.

### `Handlers.before(handleName)`

Returns an object that allows adding a new handler before a specified handler.

### `Handlers.after(handleName)`

Returns an object that allows adding a new handler after a specified handler.

### `Handlers.remove(name)`

Removes a handler from the handlers list by name.

## Examples

### Using pattern Table -->

## 関数

### `Handlers.add(name, pattern, handler)`

新しいハンドラを追加するか、既存のハンドラを名前で更新します。

### `Handlers.append(name, pattern, handle)`

新しいハンドラをハンドラリストの最後に追加します。

### `Handlers.once(name, pattern, handler)`

パターンがマッチした場合に一度だけ実行されます。

### `Handlers.prepend(name, pattern, handle)`

新しいハンドラをハンドラリストの最初に追加します。

### `Handlers.before(handleName)`

指定されたハンドラの前に新しいハンドラを追加するオブジェクトを返します。

### `Handlers.after(handleName)`

指定されたハンドラの後に新しいハンドラを追加するオブジェクトを返します。

### `Handlers.remove(name)`

名前でハンドラをハンドラリストから削除します。

## 例

### パターンテーブルの使用

```lua
Handlers.add("ping",
  { Action = "ping" },
  function (msg)
    print('ping')
    msg.reply({Data = "pong" })
  end
)
```

### Using resolvers

```lua
Handlers.add(
  "foobarbaz",
  { Action = "Speak" }, {
  [{Status = "foo"}] = function (msg) print("foo") end,
  [{Status = "bar"}] = function (msg) print("bar") end,
  [{Status = "baz"}] = function (msg) print("baz") end
})
```

### Using functions

```lua
Handlers.add("example",
  function (msg)
    return msg.Action == "Speak"
  end,
  function (msg)
    print(msg.Status)
  end
)
```

<!--
## Notes

- Handlers are executed in the order they appear in `handlers.list`.
- The pattern function should return false to skip the handler, true to break after the handler is executed, or `"continue"` to execute handler and continue with the next handler.

## Handlers.utils

The Handlers.utils module provides two functions that are common matching patterns and one function that is a common handle function.

- hasMatchingData(data)
- hasMatchingTag(name, value)
- reply(txt)

### Handlers.utils.hasMatchingData(data : string)

This helper returns a function that requires a message argument, so you can drop this into the pattern argument of any handler. The function compares the data on the incoming message with the string provided as an argument. -->

## 注意事項

- ハンドラは`handlers.list`に表示される順序で実行されます。
- パターン関数は、ハンドラをスキップするには`false`を返し、ハンドラ実行後に終了するには`true`を返し、次のハンドラを実行するには`"continue"`を返す必要があります。

## Handlers.utils

Handlers.utilsモジュールは、一般的なマッチングパターンの2つの関数と、一般的なハンドル関数を1つ提供します。

- hasMatchingData(data)
- hasMatchingTag(name, value)
- reply(txt)

### Handlers.utils.hasMatchingData(data : string)

このヘルパーはメッセージ引数を必要とする関数を返すため、任意のハンドラのパターン引数に組み込むことができます。この関数は、受信メッセージのデータと引数として提供された文字列を比較します。

```lua
Handlers.add("ping",
    Handlers.utils.hasMatchingData("ping"),
    ...
)
```

<!--
If a message comes into the process with data set to ping, this handler will match on it and invoke the handle function.

### Handlers.hasMatchingTag(name : string, value : string)

This helper returns a function that requires a message argument, so you can drop this into any pattern argument on the Handlers module. The function compares the Tag Name and Value, if they are equal then it invokes the handle function. -->

メッセージがデータに`ping`が設定された状態でプロセスに入ってくると、このハンドラはそれにマッチし、ハンドル関数が実行されます。

### Handlers.hasMatchingTag(name : string, value : string)

このヘルパーはメッセージ引数を必要とする関数を返すため、Handlersモジュールの任意のパターン引数に組み込むことができます。この関数は、タグ名と値を比較し、それらが等しい場合にハンドル関数を呼び出します。

```lua
Handlers.add("ping",
    Handlers.utils.hasMatchingData("ping"),
    ...
)
```

<!-- ### Handlers.reply(text : string)

This helper is a simple handle function, it basically places the text value in to the Data property of the outbound message. -->

### Handlers.reply(text : string)

このヘルパーはシンプルなハンドル関数で、基本的にテキストの値を送信メッセージのDataプロパティに設定します。

```lua
Handlers.add("ping",
    Handlers.utils.hasMatchingData("ping"),
    Handlers.utils.reply("pong")
)
```
