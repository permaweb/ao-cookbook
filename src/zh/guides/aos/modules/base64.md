# Base64 编码模块

一个小型 `base64` 模块，可以用于编码和解码 Base64 格式的文本。

> **注意:** 为了优化处理大段文本的性能，建议开启缓存功能，最高可以将效率提升一倍。

### 使用示例

```lua
local base64 = require(".base64")

local str = "This will be encoded"

-- is: "VGhpcyB3aWxsIGJlIGVuY29kZWQ="
local encoded = base64.encode(str)

-- is: "This will be encoded"
local decoded = base64.decode(encoded)

assert(decoded == str)
```

## 模块函数

### `encode()`

此函数使用默认编码器表对提供的字符串进行编码。 编码器可以自定义，并且可以为较大的数据块提供缓存功能。

- **Parameters:**
  - `str`: `{string}` 需要编码的字符串
  - `encoder`: `{table}` 自定义编码表（可选）
  - `usecache`: `{boolean}` 可选的针对大字符串使用的缓存 (默认关闭)
- **Returns:** Base64 编码后的字符串

#### 示例

```lua
-- prints: "SGVsbG8gd29ybGQ="
print(base64.encode("Hello world"))

-- customize encoder and allow caching
base64.encode(
  "Hello world",
  base64.makeencoder(nil, "-"),
  true
)
```

### `decode()`

此函数使用默认解码器表对Base64编码的字符串进行解码。解码器可以自定义，并提供缓存功能。

- **Parameters:**
  - `str`: `{string}` 待解码的 Base64 编码字符串
  - `decoder`: `{table}` 可选的自定义解码表
  - `usecache`: `{boolean}` 可选的针对大字符串使用的缓存（默认关闭）
- **Returns:** 解码后的字符串

#### 示例

```lua
-- prints: "Hello world"
print(base64.decode("SGVsbG8gd29ybGQ="))

-- customize decoder and allow caching
base64.decode(
  "SGVsbG8gd29ybGQ=",
  base64.makedecoder(nil, "-"),
  true
)
```

### `makeencoder()`

此函数支持创建一个自定义编码表，以定制 [`encode()`](#encode)函数的输出结果。

- **参数:**
  - `s62`: `{string}` 可选的自定义字符，用于替换标准的字符 62（默认为 "+"）
  - `s63`: `{string}` 可选的自定义字符，用于替换标准的字符 63（默认为 "/"）
  - `spad`: `{string}` 可选的自定义填充字符，用于替换标准的填充字符 "="
- **Returns:** 自定义的编码表

#### 示例

```lua
-- create custom encoder
local encoder = base64.makeencoder(nil, nil, "~")

-- prints "SGVsbG8gd29ybGQ~" instead of "SGVsbG8gd29ybGQ="
print(base64.encode("Hello world", encoder))
```

### `makedecoder()`

创建一个自定义解码表，以便解码[自定义编码](#makeencoder) 的 base64 字符串。

- **Parameters:**
  - `s62`: `{string}` 可选的自定义字符，用于替换标准的字符 62（默认为 "+"）
  - `s63`: `{string}` 可选的自定义字符，用于替换标准的字符 63（默认为 "/"）
  - `spad`: `{string}` 可选的自定义字符，用于替换标准的填充字符 "="
- **Returns:** 自定义解码器表

#### 示例

```lua
local encoder = base64.makeencoder(nil, nil, "~")
local decoder = base64.makedecoder(nil, nil, "~")

-- "SGVsbG8gd29ybGQ~"
local encoded = base64.encode("Hello world", encoder)

-- prints "Hello world"
print(base64.decode(encoded, decoder))
```
