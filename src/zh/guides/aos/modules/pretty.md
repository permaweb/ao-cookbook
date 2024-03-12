# Pretty 模块

该模块支持以格式化、易于理解和阅读的语法打印输出。

## 模块函数
### `tprint()`

将所提供表格的结构格式转为string字符串并返回。

- **Parameters:**
  - `tbl`: `{table}` 表格的格式
  - `indent`: `{number}` 可选参数，表格每一层的缩进量
- **Returns:** 转为字符串格式的表格结构
 
#### 示例
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
