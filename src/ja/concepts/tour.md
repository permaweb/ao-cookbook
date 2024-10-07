# aos 簡単ツアー

aosのクイックツアーへようこそ！このチュートリアルでは、aos環境で利用可能な主要なグローバル関数と変数について説明し、aosを効果的に操作・活用するための基礎的な理解を提供します。

## 1. Inboxの紹介

- **概要**: `Inbox`は、プロセスが受信したがまだ処理されていないメッセージを保存するLuaテーブルです。
- **使用方法**: 受信メッセージを確認するには`Inbox`をチェックします。`Inbox[x]`を繰り返し処理してメッセージを処理します。

## 2. Send(Message)を使ってメッセージを送信

- **機能**: `Send(Message)`は、他のプロセスにメッセージを送信するためのグローバル関数です。
- **使用例**: `Send({Target = "...", Data = "Hello, Process!"})`は、"Hello, Process!"というデータを指定されたプロセスに送信します。

## 3. Spawn(Module, Message)でプロセスを作成

- **目的**: `Spawn(Module, Message)`を使用して新しいプロセスを作成します。
- **例**: `Spawn("MyModule", {Data = "Start"})`は、"MyModule"を使用して指定されたメッセージと共に新しいプロセスを開始します。

## 4. NameとOwnerの理解

- **Name**: 初期化時に設定される文字列で、プロセスの名前を表します。
- **Owner**: プロセスの所有者を示します。これを変更すると、プロセスとのやり取りが制限される可能性があります。
- **重要な注意点**: 問題を避けるため、これらは読み取り専用として扱ってください。

## 5. Handlersの活用

- **概要**: `Handlers`は、メッセージハンドラを作成するためのヘルパー関数のテーブルです。
- **使用方法**: `Handlers`にハンドラを定義して、パターンマッチングに基づいて異なる受信メッセージに対するアクションを指定します。

## 6. Dumpによるデータ表示

- **機能**: `Dump`は、任意のLuaテーブルを表示に適したフォーマットに変換します。
- **使用方法**: デバッグや複雑なテーブル構造の表示に便利です。例: `Dump(Inbox)`は`Inbox`の内容を出力します。

## 7. Utilsモジュールの活用

- **内容**: Utilsには、`map`、`reduce`、`filter`のような関数型ユーティリティが含まれています。
- **使用方法**: Luaにおけるデータ操作や関数型プログラミングパターンに最適です。例: `Utils.map(myTable, function(x) return x * 2 end)`は、テーブル内の値を2倍にします。

## 8. aoコアライブラリの探索

- **説明**: `ao`は、メッセージ処理やプロセス管理のための主要な関数を含むコアモジュールです。
- **主な機能**: メッセージを送信するための関数（`send`）やプロセスを生成する関数（`spawn`）が含まれており、環境変数も利用可能です。

## 結論

この簡単ツアーでは、aos環境内の主要なグローバル機能と機能性を紹介しました。これらのツールを使用して、プロセスの作成や管理、メッセージの処理、Luaの機能を活用して、効率的で応答性の高いアプリケーションをaosプラットフォーム上で構築できます。これらの機能を試し、特定のユースケースにどのように統合できるかを深く理解してください。aosでのコーディングを楽しんでください！

<!--
# aos Brief Tour

Welcome to a quick tour of aos! This tutorial will walk you through the key global functions and variables available in the aos environment, giving you a foundational understanding of how to interact with and utilize aos effectively.

## 1. Introduction to Inbox

- **What It Is**: `Inbox` is a Lua table that stores all messages received by your process but not yet handled.
- **How to Use**: Check `Inbox` to see incoming messages. Iterate through `Inbox[x]` to process these messages.

## 2. Sending Messages with Send(Message)

- **Functionality**: `Send(Message)` is a global function to send messages to other processes.
- **Usage Example**: `Send({Target = "...", Data = "Hello, Process!"})` sends a message with the data "Hello, Process!" to a specified process.

## 3. Creating Processes with Spawn(Module, Message)

- **Purpose**: Use `Spawn(Module, Message)` to create new processes.
- **Example**: `Spawn("MyModule", {Data = "Start"})` starts a new process using "MyModule" with the provided message.

## 4. Understanding Name and Owner

- **Name**: A string set during initialization, representing the process's name.
- **Owner**: Indicates the owner of the process. Changing this might restrict your ability to interact with your process.
- **Important Note**: Treat these as read-only to avoid issues.

## 5. Utilizing Handlers

- **What They Are**: `Handlers` is a table of helper functions for creating message handlers.
- **Usage**: Define handlers in `Handlers` to specify actions for different incoming messages based on pattern matching.

## 6. Data Representation with Dump

- **Function**: `Dump` converts any Lua table into a print-friendly format.
- **How to Use**: Useful for debugging or viewing complex table structures. Example: `Dump(Inbox)` prints the contents of `Inbox`.

## 7. Leveraging Utils Module

- **Contents**: Utils contains a collection of functional utilities like`map`, `reduce`, and `filter`.

- **Usage**: Great for data manipulation and functional programming patterns in Lua. For example, `Utils.map(myTable, function(x) return x * 2 end)` to double the values in a table.

## 8. Exploring the ao Core Library

- **Description**: `ao` is a core module that includes key functions for message handling and process management.
- **Key Features**: Includes functions for sending messages (`send`) and spawning processes (`spawn`), along with environment variables.

## Conclusion

This brief tour introduces you to the primary globals and functionalities within the aos environment. With these tools at your disposal, you can create and manage processes, handle messages, and utilize Lua's capabilities to build efficient and responsive applications on the aos platform. Experiment with these features to get a deeper understanding and to see how they can be integrated into your specific use cases. Happy coding in aos! -->
