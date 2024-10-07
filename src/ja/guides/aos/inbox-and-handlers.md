# Inboxの理解

aosでは、プロセスはハンドラーを介してメッセージに応じて実行されます。未処理のメッセージはプロセスのInboxにルーティングされます。

## ハンドラーとは？

ハンドラーは、プロセス内でメッセージを受信して評価する関数です。メッセージをパラメーターとして受け取り、それに基づいて動作します。

<!--
# Understanding the Inbox

In aos, processes are executed in response to messages via handlers. Unhandled messages are routed to the process's Inbox.

## What are Handlers?

A handler is a function that receives and evaluates messages within your process. It acts upon messages by taking them as parameters.
-->

```lua
function main(Message, ao)
  ...dostuff
  return {
    Output = ...,
    Messages = {},
    Spawns = {}
  }

end
```

`main`関数は、Luaのテーブルを返し、`Output`、`Messages`、`Spawns`または`Error`を提供します。aosを使用すると、ハンドラーを使用してプロセスに機能を追加できます。ハンドラーは3つのパラメーターを取ります：

1. ハンドラーの名前
2. マッチャー関数
3. ハンドル関数

<!--
And the `main` function returns a lua Table providing `Output, Messages, and Spawns` or an `Error`. With aos you can add functionality to your process by using a Handler. The Handler takes three parameters:


1. Name of the Handler
2. Matcher function
3. Handle function
-->

```lua
Handlers.add("name",
  function (Msg)
    -- Does this message match (return true or false)
    return Msg.Action == "Register"
  end,
  function (Msg)
    print("Registered User.")
    table.insert(Members, Msg.From)
    ao.send({Target = Msg.From, Data = "Registered."})
  end
)
```

## Inboxについては？

Inboxは、まだ処理されていないメッセージのためのストレージエリアです。受信アイテムの処理を待つ「保持ゾーン」と考えてください。メッセージが処理されると、もはや「受信」扱いではなくなり、Inboxを離れます。

> 例: Inboxはボイスメールのようなものです。未対応の電話がボイスメールに転送されて後で対応されるのと同様に、プロセスがすぐに処理しないメッセージはInboxに送られます。このようにして、未処理のメッセージは、処理する準備が整うまで保存されます。

## 概要

最初は、すべてのメッセージがInboxに届くように見えるかもしれませんが、処理された後に消えると混乱を招くことがあります。ボイスメールのアナロジーを考えると、応答した電話がボイスメールに行かないのと同じように、処理したメッセージはInboxに表示されないということが明らかになります。これにより、Inboxとハンドラーの両方の役割が示されます。

<!--
## What about Inboxes?

An inbox is a storage area for messages that have not yet been processed. Think of it as a holding zone for incoming, or "inbound," items awaiting handling. Once a message is processed, it's no longer considered "inbound" and thus leaves the inbox.

> Example: Consider the inbox like your voicemail. Just as an unanswered phone call is directed to voicemail for you to address later, messages that your Process doesn't immediately handle are sent to the inbox. This way, unhandled messages are stored until you're ready to process them.

## Summary

Initially, it might seem like all messages are meant to land in your Inbox, which can be puzzling if they disappear after being handled. The analogy of a voicemail should clarify this: much like calls you answer don't go to voicemail, messages you handle won't appear in your Inbox. This illustrates the roles of both the Inbox and Handlers. -->
