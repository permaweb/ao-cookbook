# 编辑器初始化

记住所有的内建函数和工具集方法是非常困难的。为了改善你的开发体验，我们推荐将 [Lua Language Server](https://luals.github.io) 扩展添加到您的编辑器，并添加 [ao addon](https://github.com/martonlederer/ao-definitions) 插件。它支持所有的 aos [内置模块](../aos/modules/index)和[全局变量](../aos/intro#globals)。

## VS Code

安装 [sumneko.lua](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) 扩展:

1. 在扩展市场中搜索 sumneko 的“Lua”插件
2. 下载并且安装插件
3. 使用 `Shift + Command + P` (Mac) / `Ctrl + Shift + P` (Windows/Linux) 打开 VS Code 命令面板，然后运行以下命令：

```
> Lua: Open Addon Manager
```

4. 在插件管理器中搜索“ao”，选中第一个结果，单击“启用”完成自动安装。

## 其他编辑器

1. 验证你的编辑器是否支持[语言服务器协议](https://microsoft.github.io/language-server-protocol/implementors/tools/)
2. 安装[luals.github.io](https://luals.github.io/#install)中的 Lua 语言服务
3. 安装 "ao" 语言扩展服务
