---
prev:
  text: "Welcome"
  link: "../index"
next:
  text: "Begin"
  link: "/tutorials/begin/index"
---

<!-- # Get involved with the ao legacynet -->

# aoテストネットに参加しよう

<!-- On February 27, 2024, `ao` legacynet was launched, for developers and early adopters to explore the hyper parallel computer. -->

2024年2月27日、開発者やアーリーアダプター向けに `ao` テストネットがローンチされ、ハイパーパラレルコンピュータを探索できるようになりました。

<!-- ## What is the ao legacynet? -->

## aoテストネットとは？

<!-- The `ao` legacynet is setup to allow users to interact with the `ao` computer without fees, to test and build towards mainnet. -->

`ao` テストネットは、ユーザーが手数料なしで `ao` コンピュータとやり取りし、メインネットに向けたテストや構築を行えるように設置された環境です。

<!-- The best way to get involved is to build and use the `ao` computer with the `aos` console.
In the `Things to do` section below you will find many activities to try. -->

テストネットに参加する最良の方法は、aosコンソールを使ってaoコンピュータを構築し、使用することです。以下の「やるべきこと」のセクションには、試すべきさまざまな活動が記載されています。

<!-- ## Installing the aos client -->

## aosクライアントのインストール

Once you have [NodeJS](https://nodejs.org) on your machine, all you need to do is install `aos` and run it:

```sh
$ npm i -g https://get_ao.g8way.io
```

Running this command at a later date will upgrade `aos` to the latest version.

<!-- After installation, we can simply run the command itself to start a new `aos` process: -->

インストールが完了したら、コマンドを実行して新しいaosプロセスを開始できます：

```sh
$ aos
```

This will start a process named `default`. See [the aos guide](/guides/aos/index) for more details.

<!-- ## First steps in the ao legacynet -->

## aoテストネットでの最初のステップ

<!-- Follow the tutorials and learn to build on `ao`. [Begin](/tutorials/begin/index) -->

チュートリアルに従って、ao上での構築を学びましょう。 [Begin](/tutorials/begin/index)

<!-- ## Joining ao's native community chat -->

## aoのネイティブコミュニティチャットに参加する

<!-- The ao network hosts a number of chat servers that allow you to converse with other devs,
right from your `aos` console. To load the chat client run the following: -->

aoネットワークには、aosコンソールから直接他の開発者と会話できるチャットサーバーがいくつかホストされています。
チャットクライアントをロードするには、次のコマンドを実行します：

```lua
aos> .load-blueprint chat
```

<!-- To show the available rooms you can run: -->

利用可能なルームを表示するには、次のコマンドを実行します：

```lua
aos> List()
```

<!-- You can join a room and start chatting with other devs as follows: -->

ルームに参加して、他の開発者とチャットを始めるには、次のコマンドを実行します：

```lua
aos> Join("Getting-Started", "yourName")
aos> Say("Hi")
```
