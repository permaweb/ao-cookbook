# Base64

A small `base64` module to encode or decode base64 text.

> **Note:** It is recommended to enable caching for large chunks of texts for up to x2 optimization.

### Example usage

```lua
local base64 = require(".base64")

local str = "This will be encoded"

-- is: "VGhpcyB3aWxsIGJlIGVuY29kZWQ="
local encoded = base64.encode(str)

-- is: "This will be encoded"
local decoded = base64.decode(encoded)

assert(decoded == str)
```

## Module functions

### `encode()`

This function encodes the provided string using the default encoder table. The encoder can be customized and a cache is available for larger chunks of data.

- **Parameters:**
  - `str`: `{string}` The string to encode
  - `encoder`: `{table}` Optional custom encoding table
  - `usecache`: `{boolean}` Optional cache for large strings (turned off by default)
- **Returns:** Base64 encoded string

#### Examples

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

This function decodes the provided base64 encoded string using the default decoder table. The decoder can be customized and a cache is also available here.

- **Parameters:**
  - `str`: `{string}` The base64 encoded string to decode
  - `decoder`: `{table}` Optional custom decoding table
  - `usecache`: `{boolean}` Optional cache for large strings (turned off by default)
- **Returns:** Decoded string

#### Examples

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

Allows creating a new encoder table to customize the [`encode()`](#encode) function's result.

- **Parameters:**
  - `s62`: `{string}` Optional custom char for 62 (`+` by default)
  - `s63`: `{string}` Optional custom char for 63 (`/` by default)
  - `spad`: `{string}` Optional custom padding char (`=` by default)
- **Returns:** Custom encoder table

#### Examples

```lua
-- create custom encoder
local encoder = base64.makeencoder(nil, nil, "~")

-- prints "SGVsbG8gd29ybGQ~" instead of "SGVsbG8gd29ybGQ="
print(base64.encode("Hello world", encoder))
```

### `makedecoder()`

Allows creating a new decoder table to be able to decode [custom-encoded](#makeencoder) base64 strings.

- **Parameters:**
  - `s62`: `{string}` Optional custom char for 62 (`+` by default)
  - `s63`: `{string}` Optional custom char for 63 (`/` by default)
  - `spad`: `{string}` Optional custom padding char (`=` by default)
- **Returns:** Custom decoder table

#### Examples

```lua
local encoder = base64.makeencoder(nil, nil, "~")
local decoder = base64.makedecoder(nil, nil, "~")

-- "SGVsbG8gd29ybGQ~"
local encoded = base64.encode("Hello world", encoder)

-- prints "Hello world"
print(base64.decode(encoded, decoder))
```
