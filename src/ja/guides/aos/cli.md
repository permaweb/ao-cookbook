# CLI

aosに渡すコマンドライン引数は以下の操作を行うためのものです:

- [name] - 新しいプロセスを作成するか、ウォレット用の既存のプロセスを読み込みます
- --load [file] - ファイルを読み込みます。このコマンドを1つまたは複数追加できます
- --cron [interval] - プロセスを作成する際のみ使用します
- --wallet [walletfile] - 特定のウォレットを使用します

## aosを使用した複数プロセスの管理

<!-- # CLI

There are some command-line arguments you pass to our aos to do the following:

- [name] - create a new process or loads an existing process for your wallet
- --load [file] - load a file, you can add one or many of this command
- --cron [interval] - only used when creating a process
- --wallet [walletfile] - use a specific wallet

## Managing multiple processes with aos
-->

```sh
aos
```

<!-- Starts or connects to a process with the name `default` -->

`default`という名前のプロセスを開始するか、接続します。

```sh
aos chatroom
```

`chatroom`という名前のプロセスを開始するか、接続します。

<!-- Starts or connects to a process with the name of `chatroom` -->

```sh
aos treasureRoom
```

<!-- Starts or connects to a process with the name of `treasureRoom` -->

`treasureRoom`という名前のプロセスを開始するか、接続します。

## Load flag

```sh
aos treasureRoom --load greeting.lua --load treasure.lua --load puzzle.lua
```

loadフラグを使用すると、プロセスに複数のソースファイルを読み込むことができます。

## CRONフラグ

プロセスをスケジュールに基づいて反応させる場合は、aoにその旨を伝える必要があります。これはプロセスを生成する際に行います。

<!--
With the load flag I can load many source files to my process

## CRON Flag

If you want to setup your process to react on a schedule we need to tell ao, we do that when we spawn the process.
-->

```sh
aos chatroom --cron 2-minutes
```

## タグフラグ

タグフラグを使用すると、カスタムタグ（例えば、静的環境変数として使用するため）でプロセスを開始できます。

上記のコマンドは、プロセスを生成するトランザクションに追加のタグを追加します：

<!--
## Tag flags

With the tag flags, you can start a process with some custom tags (for e.g. using them as static environment variables):
-->

```sh
aos chatroom --tag-name Chat-Theme --tag-value Dark --tag-name Chat-Name --tag-value Mychat
```

<!-- The command above will add the extra tags to the transaction that spawns your process: -->

上記のコマンドは、プロセスを生成するトランザクションに追加のタグを追加します：

```ts
// process data item tags
[
  ...
  { name: "Chat-Theme", value: "Dark" },
  { name: "Chat-Name", value: "Mychat" }
  ...
]
```
