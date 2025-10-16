# お知らせの解釈

コーディングの旅にお帰りなさい。これまでのチュートリアルで習得したスキルを使って、ゲーム体験を向上させる時が来ました。

ゲーム中、ターミナルにお知らせが表示されるのに気づいたかもしれません。これらのお知らせは、ゲームがプレイヤーに重要なイベントを伝える方法です。しかし、これらのメッセージは時に難解に見えたり、さらなる詳細を知るために頻繁に受信箱をチェックしている自分に気づくかもしれません。

この情報を直接ターミナルからアクセスできたら便利ではありませんか？実は、それができる方法があります！

[ハンドラ](/references/api/handlers.md)を使うことで、この情報を取得する自律エージェントを作成でき、単純なボットからゲームイベントを解釈し、直接行動することができる存在へと進化します。

## 開発環境のセットアップ

まず、好みのディレクトリに `bot.lua` という新しいファイルを作成します。

> 理想的には、このファイルはプレイヤープロセスが実行されているのと同じディレクトリに配置して、コードの読み込みを容易にするべきです。そうでなければ、ファイルにアクセスするために相対パスを使用する必要があります。

## コードの記述

ロジックに飛び込みましょう。

aos の各ハンドラには、3 つの重要な情報が必要です：

- `name`: ハンドラの一意の名前
- `pattern`: ハンドラが識別するパターンで、その動作を引き起こします
- `handle`: 指定されたパターンが見つかったときに実行する操作

お知らせの詳細を表示するためのハンドラを書く方法は次のとおりです：

<!-- # Interpreting Announcements

Welcome back to your coding journey. It's time to use the skills you've acquired from previous tutorials to enhance your gaming experience.

During the game, you've likely noticed announcements appearing in your terminal. These announcements are the game's way of communicating important events to players. However, these messages can sometimes seem cryptic or you might find yourself checking your inbox frequently for further details.

Wouldn't it be convenient to access this information directly from your terminal? Well, there's a way to do that!

By using [handlers](/references/handlers.md), you can create an autonomous agent to retrieve this information for you, marking the progression from simple bots to entities capable of interpreting and acting on game events directly.

## Setting up the Development Environment

Start by creating a new file named `bot.lua` in your preferred directory.

> Ideally, this file should be placed in the same directory where your player process runs to ease the loading of the code. Else, you'll need to use relative paths to access the file.

## Writing the Code

Let's dive into the logic.

Each handler in aos requires three key pieces of information:

- `name`: A unique name for the handler
- `pattern`: A pattern for the handler to identify, triggering its operation
- `handle`: The operations to perform when the desired pattern is found.

Here's how you can write a handler for printing announcement details: -->

```lua
-- Handler to print game announcements directly in the terminal.
Handlers.add(
  "PrintAnnouncements",
  { Action = "Announcement" },
  function (msg)
    print(msg.Event .. ": " .. msg.Data)
  end
)
```

この場合、ハンドラの名前は `"PrintAnnouncements"` です。`{ Action = "Announcement" }` という特別なビルトインユーティリティ（`hasMatchingTags`）を使用して、受信メッセージがアナウンスメントとしてタグ付けされているかどうかを確認します。もし真であれば、ハンドラはイベントとデータを印刷します。これらはお知らせのタイトルと説明を表します。

> [!注]
> メッセージが「処理される」と、受信箱からは廃棄されます。

## 読み込みとテスト

では、これをゲームで実現しましょう。

aos プレイヤーターミナルに移動し、ゲームセッションに入ります。

次のコマンドで `bot.lua` ファイルを読み込むことで、ハンドラをアクティブにします：

<!--
In this case, the name of the handler is `"PrintAnnouncements"`. It uses a special in-built utility (`hasMatchingTags`) represented by `{ Action = "Announcement" }` to check if the incoming message has been tagged as an announcement. If true, the handler prints the Event and Data, which represent the title and description of the announcement.

> [!Note]
> Once a message is "handled", it will be discarded from your `Inbox`.

## Loading and Testing

Now, let's bring this to life in the game.

Navigate to your aos player terminal and enter a game session.

Activate the handler by loading your `bot.lua` file with: -->

```lua
.load bot.lua
```

<!-- You'll now see game announcements appear directly in your terminal, offering real-time insights without the need to sift through your inbox.

Congratulations! You have just taken the first step in building a bot on `aos`. But let's keep working on adding more features to it 🌐 -->

これで、ゲームのお知らせが直接ターミナルに表示され、受信箱をこまめにチェックする必要なくリアルタイムの洞察を提供します。

おめでとうございます！あなたは `aos` 上にボットを構築する第一歩を踏み出しました。しかし、さらなる機能を追加するために引き続き作業を進めていきましょう 🌐
