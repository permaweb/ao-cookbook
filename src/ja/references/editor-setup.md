---
next:
  text: "コミュニティ"
  link: "/references/community"
---

# エディタのセットアップ

aoの組み込み関数やユーティリティをすべて覚えるのは難しい場合があります。開発者体験を向上させるために、お気に入りのテキストエディタに[Lua Language Server](https://luals.github.io)拡張機能をインストールし、[ao addon](https://github.com/martonlederer/ao-definitions)を追加することをお勧めします。これにより、すべての組み込みのaos[モジュール](../guides/aos/modules/index.md)や[グローバル変数](../guides/aos/intro.md#globals)がサポートされます。

## VS Code

[sumneko.lua](https://marketplace.visualstudio.com/items?itemName=sumneko.lua)拡張機能をインストールします：

1. 拡張機能マーケットプレイスで「Lua」を検索し、sumnekoの拡張機能を見つけます
2. 拡張機能をダウンロードしてインストールします
3. `Shift + Command + P`（Mac）/ `Ctrl + Shift + P`（Windows/Linux）でVS Codeのコマンドパレットを開き、次のコマンドを実行します：

```
> Lua: Open Addon Manager
```

4. Addon Managerで「ao」を検索すると、最初に表示されるはずです。「Enable」をクリックして、オートコンプリートを楽しんでください！

## その他のエディタ

1. あなたのエディタが[Language Server Protocol](https://microsoft.github.io/language-server-protocol/implementors/tools/)をサポートしていることを確認してください
2. [luals.github.io](https://luals.github.io/#install)の指示に従ってLua Language Serverをインストールします
3. Language Serverに「ao」アドオンをインストールします

## BetterIDEa

[BetterIDEa](https://ide.betteridea.dev)は、ao上での開発のためのカスタムWebベースのIDEです。

ao定義が組み込まれたLua Language Serverを提供しているため、何もインストールする必要はありません。IDEを開いてコーディングを開始するだけです！

機能には以下が含まれます：

- コード補完
- セルベースのノートブックUIによる迅速な開発
- 簡単なプロセス管理
- MarkdownおよびLatexセルのサポート
- aoプロセスを介して誰とでもプロジェクトを共有
- [aoパッケージマネージャ](https://apm.betteridea.dev)との緊密な統合

IDEのさまざまな機能や統合についての詳細は、[ドキュメント](https://docs.betteridea.dev)をご覧ください。
