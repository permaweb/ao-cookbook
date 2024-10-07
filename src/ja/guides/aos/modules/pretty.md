# Pretty

このモジュールは、フォーマットされた人間に優しく、読みやすい構文を印刷することを可能にします。

## モジュール関数

### `tprint()`

提供されたテーブルの構造のフォーマットされた文字列を返します。

- **パラメータ:**
  - `tbl`: `{table}` フォーマットするテーブル
  - `indent`: `{number}` 各レベルのテーブルのオプションのインデント
- **戻り値:** フォーマットされたテーブル構造の文字列

#### Examples

```lua
local pretty = require(".pretty")

local formatted = pretty.tprint({
  name = "John Doe",
  age = 22,
  friends = { "Maria", "Victor" }
}, 2)

-- prints the formatted table structure
print(formatted)
```
