# Pretty

This module allows printing formatted, human-friendly and readable syntax.

## Module functions

### `tprint()`

Returns a formatted string of the structure of the provided table.

- **Parameters:**
  - `tbl`: `{table}` The table to format
  - `indent`: `{number}` Optional indentation of each level of the table
- **Returns:** Table structure formatted as a string

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
