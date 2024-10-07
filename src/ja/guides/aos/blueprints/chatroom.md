# チャットルームブループリント

チャットルームブループリントは、`ao` でチャットルームを迅速に構築するのに役立つ事前設計されたテンプレートです。始めるのに最適な方法であり、ニーズに合わせてカスタマイズできます。

## チャットルームブループリントの内容

- **メンバー**: `Members` 配列は、チャットルームに登録したユーザーを保存するために使用されます。

- **登録ハンドラー**: `register` ハンドラーは、プロセスがチャットルームに参加できるようにします。プロセスが `Action = "Register"` タグを持つメッセージを送信すると、ハンドラーはプロセスを `Members` 配列に追加し、登録を確認するメッセージをプロセスに送信します。

- **ブロードキャストハンドラー**: `broadcast` ハンドラーは、プロセスがチャットルームのすべてのメンバーにメッセージを送信できるようにします。プロセスが `Action = "Broadcast"` タグを持つメッセージを送信すると、ハンドラーはチャットルームのすべてのメンバーにメッセージを送信します。

### 使用方法:

1. お好みのテキストエディタを開きます。
2. ターミナルを開きます。
3. `aos` プロセスを開始します。
4. `.load-blueprint chatroom` と入力します。

### ブループリントが読み込まれたことを確認する:

`Handlers.list` と入力して、新しく読み込まれたハンドラーを確認します。

## チャットルームブループリントの内容:

<!-- # Chatroom Blueprint

The Chatroom Blueprint is a predesigned template that helps you quickly build a chatroom in `ao`. It is a great way to get started and can be customized to fit your needs.

## Unpacking the Chatroom Blueprint

- **Members**: The `Members` array is used to store the users who have registered to the chatroom.

- **Register Handler**: The `register` handler allows processes to join the chatroom. When a process sends a message with the tag `Action = "Register"`, the handler will add the process to the `Members` array and send a message back to the process confirming the registration.

- **Broadcast Handler**: The `broadcast` handler allows processes to send messages to all the members of the chatroom. When a process sends a message with the tag `Action = "Broadcast"`, the handler will send the message to all the members of the chatroom.

### How To Use:

1. Open your preferred text editor.
2. Open the Terminal.
3. Start your `aos` process.
4. Type in `.load-blueprint chatroom`

### Verify the Blueprint is Loaded:

Type in `Handlers.list` to see the newly loaded handlers.

## What's in the Chatroom Blueprint: -->

```lua
Members = Members or {}

Handlers.add(
  "register",
  Handlers.utils.hasMatchingTag("Action", "Register"),
  function (msg)
    table.insert(Members, msg.From)
    Handlers.utils.reply("registered")(msg)
  end
)

Handlers.add(
  "broadcast",
  Handlers.utils.hasMatchingTag("Action", "Broadcast"),
  function (msg)
    for _, recipient in ipairs(Members) do
      ao.send({Target = recipient, Data = msg.Data})
    end
    Handlers.utils.reply("Broadcasted.")(msg)
  end
)
```
