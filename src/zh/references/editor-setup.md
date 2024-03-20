# 编辑器设置

内置的 ao 函数和实用工具不太好用。为了提升你的开发体验，建议你在你常用的文本编辑器中安装 [Lua Language Server](https://luals.github.io) 扩展插件，并添加 [ao插件](https://github.com/martonlederer/ao-definitions)。它们支持所有内置的 aos [模块](../guides/aos/index.md) 和 [全局变量](../guides/aos/intro#globals)。

## VS Code

安装 [sumneko.lua](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) 扩展插件：

1. 在扩展市场中搜索 sumneko 的 "Lua"。
2. 下载并安装该扩展插件。
3. 打开 VS Code 命令面板，使用 `Shift + Command + P`（Mac）/ `Ctrl + Shift + P`（Windows/Linux），然后运行以下命令：

```
> Lua: Open Addon Manager
```

4. 在插件管理器中搜索 “ao”，它应该是第一个结果。点击 “启用”，然后就可以享受自动完成的功能了！

如果你不想为每个工作区重复这个过程，你可以从生成的工作区 `settings.json` 文件中复制 `Lua.workspace.library` 对象到你的全局 `settings.json` 文件中。

## 其他编辑器

1. 确认你的编辑器支持[语言服务器协议](https://microsoft.github.io/language-server-protocol/implementors/tools/)。
2. 按照 [luals.github.io](https://luals.github.io/#install) 上的指示安装 Lua 语言服务器。
3. 为语言服务器安装“ao”插件。
