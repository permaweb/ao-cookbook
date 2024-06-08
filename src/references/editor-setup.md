# Editor setup

Remembering all the built in ao functions and utilities can sometimes be hard. To enhance your developer experience, it is recommended to install the [Lua Language Server](https://luals.github.io) extension into your favorite text editor and add the [ao addon](https://github.com/martonlederer/ao-definitions). It supports all built in aos [modules](../guides/aos/index.md) and [globals](../guides/aos/intro#globals).

## VS Code

Install the [sumneko.lua](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) extension:

1. Search for "Lua" by sumneko in the extension marketplace
2. Download and install the extension
3. Open the VS Code command palette with `Shift + Command + P` (Mac) / `Ctrl + Shift + P` (Windows/Linux) and run the following command:

```
> Lua: Open Addon Manager
```

1. Open a workspace first. In the Addon Manager, search for "ao", it should be the first result. Click "Enable" and enjoy autcomplete!

If you don't want to do this process for each of your workspaces, you can copy the `Lua.workspace.library` object from the generated workspace `settings.json` file to your global `settings.json` file.

## Other editors

1. Verify that your editor supports the [language server protocol](https://microsoft.github.io/language-server-protocol/implementors/tools/)
2. Install Lua Language Server by following the instructions at [luals.github.io](https://luals.github.io/#install)
3. Install the "ao" addon to the language server
