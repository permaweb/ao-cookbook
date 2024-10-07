# .load

この機能を使用すると、ローカルマシン上のソースファイルからLuaコードをロードできます。このシンプルな機能は、aosプロセスで作業するための素晴らしい開発体験を提供します。

ハンドラーを作成する際、多くのコードが必要になることがあります。そのため、vscodeのような豊富な開発環境を活用したいと思うことでしょう。Lua拡張機能をインストールすれば、構文チェックも受けられます。

では、ローカルのLuaソースコードをaoプロセスに公開するにはどうすればよいのでしょうか？ここで`.load`コマンドが役立ちます。

hello.lua

```lua
Handlers.add(
  "ping",
  Handlers.utils.hasMatchingData("ping"),
  Handlers.utils.reply("pong")
)
```

aos shell

```lua
.load hello.lua
```

Easy Peasy! 🐶
