# Editor setup

Remembering all the built in ao functions and utilities can sometimes be hard. To enhance your developer experience, it is recommended to install the [Lua Language Server](https://luals.github.io) extension into your favorite text editor and add the [ao addon](https://github.com/martonlederer/ao-definitions). It supports all built in aos [modules](../aos/modules/index) and [globals](../aos/intro#globals).

## VS Code

Install the [sumneko.lua](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) extension:

1. Search for "Lua" by sumneko in the extension marketplace
2. Download and install the extension
3. Open the VS Code command palette with `Shift + Command + P` (Mac) / `Ctrl + Shift + P` (Windows/Linux) and run the following command:

```
> Lua: Open Addon Manager
```

4. In the Addon Manager, search for "ao", it should be the first result. Click "Enable" and enjoy autocomplete!

## Other editors

1. Verify that your editor supports the [language server protocol](https://microsoft.github.io/language-server-protocol/implementors/tools/)
2. Install Lua Language Server by following the instructions at [luals.github.io](https://luals.github.io/#install)
3. Install the "ao" addon to the language server
