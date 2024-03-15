# Pretty 模块

以格式化的、易于理解和阅读的语法打印输出。

## 模块函数
### `tprint()`
将 table 结构转换为格式化的字符串

- **Parameters:**
  - `tbl`: `{table}` 需要转换的 table 结构
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
