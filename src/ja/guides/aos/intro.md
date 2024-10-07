# はじめに

aosは、プロセスや契約を構築するための異なるアプローチを提供します。aoコンピュータは、計算がどこでも実行できる分散型コンピュータネットワークであり、aosはユニークなインタラクティブシェルを持っています。あなたは、aosを個人的なオペレーティングシステム、aoプロセスを構築するための開発環境、そしてボットアーミーとして利用できます。

基本的なコマンドをいくつか見ていきましょう。

## 変数

コンソールを通じて任意の変数の内容を表示したい場合は、単に変数名を入力してください。

```lua
Name
```

## インボックス

`Inbox`は、あなたのプロセスが受信したメッセージのコレクションです。

```lua
Inbox[1]
```

メッセージのカウントを取得したい場合は、`#`を`Inbox`の前に追加してください。

```lua
#Inbox
```

インボックスに何件のメッセージがあるかを確認するプロセスは非常に一般的なパターンです。これを簡単にするために、インボックス内のメッセージ数を返し、それをプロンプトに表示する関数を作成できます。

`.editor`または`.load file`を使用して、この関数をプロセスにロードしてください。

```lua
function Prompt()
  return "Inbox: " .. #Inbox .. " > "
end
```

**The Expected Results:**

```lua
undefined
Inbox: 2 >
```

あなたのプロンプトは、インボックス内のメッセージ数を含むように変更されました。

## グローバル

aosプロセスには、開発を少し直感的にするためのいくつかのグローバル変数があります。

| Name                   | Description                                                                                                                                                                       | Type         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Inbox                  | This is a lua Table that stores all the messages that are received and not handlers by any handlers.                                                                              | Table(Array) |
| Send(Message)          | This is a global function that is available in the interactive environment that allows you to send messages to Processes                                                          | function     |
| Spawn(Module, Message) | This is a global function that is available in the aos interactive environment that allows you to spawn processes                                                                 |
| Name                   | a string that is set on init that describes the name of your process                                                                                                              | string       |
| Owner                  | a string that is set on the init of the process that documents the owner of the process, warning if you change this value, it can brick you ability to interact with your process | string       |
| Handlers               | a lua Table that contains helper functions that allows you to create handlers that execute functionality based on the pattern matching function on inbound messages               | table        |
| Dump                   | a function that takes any lua Table and generates a print friendly output of the data                                                                                             | function     |
| Utils                  | a functional utility library with functions like map, reduce, filter                                                                                                              | module       |
| ao                     | this is a core function library for sending messages and spawing processes                                                                                                        | module       |

## モジュール

aosには、すでに利用可能な一般的なLuaモジュールがいくつか組み込まれており、これらのモジュールは`require`関数で参照できます。

| Name    | Description                                                                |
| ------- | -------------------------------------------------------------------------- |
| json    | a json module that allows you to encode and decode json documents          |
| ao      | contains ao specific functions like send and spawn                         |
| .base64 | a base64 module that allows you to encode and decode base64 text           |
| .pretty | a pretty print module using the function tprint to output formatted syntax |
| .utils  | an utility function library                                                |
