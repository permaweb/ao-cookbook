# エディタ設定

すべての組み込みのao関数やユーティリティを覚えるのは時には難しいことがあります。開発者の体験を向上させるために、お気に入りのテキストエディタに[Lua Language Server](https://luals.github.io)拡張機能をインストールし、[aoアドオン](https://github.com/martonlederer/ao-definitions)を追加することをお勧めします。これにより、すべての組み込みのaos [モジュール](../aos/modules/index)や[グローバル変数](../aos/intro#globals)をサポートします。

## VS Code

[sumneko.lua](https://marketplace.visualstudio.com/items?itemName=sumneko.lua)拡張機能をインストールします：

1. 拡張機能マーケットプレイスで「Lua」を検索し、sumnekoによるものを見つけます。
2. 拡張機能をダウンロードしてインストールします。
3. `Shift + Command + P` (Mac) / `Ctrl + Shift + P` (Windows/Linux)を押して、VS Codeのコマンドパレットを開き、次のコマンドを実行します：

<!--
# Editor setup

Remembering all the built in ao functions and utilites can sometimes be hard. To enhance your developer experience, it is recommended to install the [Lua Language Server](https://luals.github.io) extension into your favorite text editor and add the [ao addon](https://github.com/martonlederer/ao-definitions). It supports all built in aos [modules](../aos/modules/index) and [globals](../aos/intro#globals).

## VS Code

Install the [sumneko.lua](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) extension:

1. Search for "Lua" by sumneko in the extension marketplace
2. Download and install the extension
3. Open the VS Code command palette with `Shift + Command + P` (Mac) / `Ctrl + Shift + P` (Windows/Linux) and run the following command:
-->

```
> Lua: Open Addon Manager
```

4. アドオンマネージャーで「ao」を検索します。最初の結果に表示されるはずです。クリックして「有効にする」を選択し、オートコンプリートを楽しんでください！

## 他のエディタ

1. あなたのエディタが[言語サーバープロトコル](https://microsoft.github.io/language-server-protocol/implementors/tools/)をサポートしていることを確認します。
2. [luals.github.io](https://luals.github.io/#install)の手順に従ってLua Language Serverをインストールします。
3. 言語サーバーに「ao」アドオンをインストールします。

## BetterIDEa

[BetterIDEa](https://ide.betteridea.dev)は、ao上で開発するためのカスタムウェブベースのIDEです。

組み込みのLua言語サーバーとao定義を提供するため、何もインストールする必要はありません。IDEを開いてコーディングを始めるだけです！

機能には以下が含まれます：

- コード補完
- 高速開発のためのセルベースのノートブックUI
- 簡単なプロセスマネジメント
- MarkdownとLaTeXのセルサポート
- aoプロセスを通じて誰とでもプロジェクトを共有
- [aoパッケージマネージャー](https://apm.betteridea.dev)との密接な統合

IDEのさまざまな機能や統合に関する詳細情報は[ドキュメント](https://docs.betteridea.dev)をお読みください。

<!--
4. In the Addon Manager, search for "ao", it should be the first result. Click "Enable" and enjoy autcomplete!

## Other editors

1. Verify that your editor supports the [language server protocol](https://microsoft.github.io/language-server-protocol/implementors/tools/)
2. Install Lua Language Server by following the instructions at [luals.github.io](https://luals.github.io/#install)
3. Install the "ao" addon to the language server

## BetterIDEa

[BetterIDEa](https://ide.betteridea.dev) is a custom web based IDE for developing on ao.

It offers a built in Lua language server with ao definitions, so you don't need to install anything. Just open the IDE and start coding!

Features include:

- Code completion
- Cell based notebook ui for rapid development
- Easy process management
- Markdown and Latex cell support
- Share projects with anyone through ao processes
- Tight integration with [ao package manager](https://apm.betteridea.dev)

Read detailed information about the various features and integrations of the IDE in the [documentation](https://docs.betteridea.dev).
-->
