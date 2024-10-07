# トークンの作成

::: info
`ao`の深みに飛び込む準備が整いました。あなた自身のトークンを作成する準備ができました。これは、この分散型メディア内での価値と交換のシンボルです。トークンの作成方法を学びたいと思っているなら、[Messaging](messaging)や[チャットルームの構築](chatroom)のレッスンを訪れていない場合は、そちらを確認してください。このページは、複数パートのインタラクティブチュートリアルの一部です。
:::

トークンを作成する際には、[トークン仕様](../../references/token.md)に従って、`ao`内でLua言語を使用してトークンをミントします。

## ビデオチュートリアル

<iframe width="680" height="350" src="https://www.youtube.com/embed/yge5Oo7K1vM?si=f3vt2eAbL3ON-DBz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## ウサギの穴をさらに進む

前回のチュートリアル[チャットルームの構築](chatroom)では、`ao`内でチャットルームを作成し、`Morpheus`と`Trinity`の両方をそのチャットルームに招待しました。そして、`Trinity`は私たちにトークンを作成してほしいと頼んできました。これは、私たちがウサギの穴を進むにふさわしいことを証明する手段です。

**始めましょう。**

## トークンを構築するための2つの道

トークンを構築する際には、2つの道があります：

1. **ブループリント**: これは、`ao`内でトークンを迅速に構築するためのあらかじめ設計されたテンプレートです。始めるのに最適な方法で、ニーズに合わせてカスタマイズできます。

   こちらで[トークンブループリント](../../guides/aos/blueprints/token.md)の詳細を確認してください。

2. **手動メソッド**: これは、`ao`内でトークンを一から構築するためのステップバイステップのガイドです。この道は、トークンの内部動作を理解したい方に向いています。

   こちらで完全な[トークンを構築する](../../guides/aos/token.md)ガイドを確認してください。

## ブループリントメソッド

このチュートリアルでは、`Trinity`のためのトークンを作成するためにトークンブループリントを使用します。これは、`ao`内で迅速にトークンを構築するためのあらかじめ設計されたテンプレートです。

### トークンブループリントの使用方法

1. 前のステップで使用したのと同じディレクトリにいることを確認します。
2. ターミナルを開きます。
3. `aos`プロセスを開始します。
4. `.load-blueprint token`と入力します。

これにより、`ao`内でトークンに必要なハンドラーがロードされます。トークンブループリントは、このチュートリアル専用ではなく、作成したいトークンの基盤として使用できます。

### ブループリントが読み込まれたか確認する

`Handlers.list`と入力して、新たにロードされたハンドラーを確認します。

あなたの`aos`プロセスに新しいハンドラーのリストが読み込まれているはずです。もし前のチュートリアルのステップに従っているなら、チャットルーム用のハンドラーも見ることができるはずです。

**例:**

![Token Handlers](/token3.png)

### トークンのテスト

トークンブループリントが読み込まれたので、`Action = "Info"`タグを使って自分自身にメッセージを送ることでトークンをテストできます。

<!-- # Crafting a Token

::: info
Diving deeper into the `ao`, you're now ready to create your own token, a symbol of value and exchange within this decentralized medium. If you've found yourself wanting to learn how to create a token, but haven't visited the [Messaging](messaging) and [Build a Chatroom](chatroom) lessons, be sure to do so as this page is part of a multi-part interactive tutorial.
:::

When creating tokens, we'll continue to use the [Lua Language](../../references/lua.md) within `ao` to mint a token, guided by the principles outlined in the [Token Specification](../../references/token.md).

## Video Tutorial

<iframe width="680" height="350" src="https://www.youtube.com/embed/yge5Oo7K1vM?si=f3vt2eAbL3ON-DBz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Continuing Down the Rabbit Hole

In our last tutorial, [Build a Chatroom](chatroom), we learned how to create a chatroom within `ao`, invited both `Morpheus` and `Trinity` to the chatroom we created, and then `Trinity` has now asked for us to create a token for her as a way of proving ourselves worthy of continuing down the rabbit hole.

**Let us begin.**

## The Two Paths To Building a Token

There are two paths to take when building a token:

1. **The Blueprint**: This is a predesigned template that helps you quickly build a token in `ao`. It is a great way to get started and can be customized to fit your needs.

   Check here to learn more about the [Token Blueprint](../../guides/aos/blueprints/token.md).

2. **The Manual Method**: This is a step-by-step guide to building a token in `ao` from scratch. This path is for those who want to understand the inner workings of a token and how to build one from the ground up.

   Check here to review the full [Build a Token](../../guides/aos/token.md) guide.

## The Blueprint Method

For this tutorial, we'll be using the Token Blueprint to create a token for `Trinity`. This is a predesigned template that helps you quickly build a token in `ao`.

### How To Use The Token Blueprint

1. Make sure we're in the same directory as before during the previous steps in the tutorial.
2. Open the Terminal.
3. Start your `aos` process.
4. Type in `.load-blueprint token`

This will load the required handlers for the tutorials token within `ao`. It's important to note that the token blueprint isn't specific to this tutorial and can be used as a foundation for any token you wish to create.

### Verify the Blueprint is Loaded

Type in `Handlers.list` to see the newly loaded handlers.

You should see a new list of handlers that have been loaded into your `aos` process. If you've been following along the with the previous steps in the tutorial, you should also see the handlers for your chatroom, as well.

**Example:**

![Token Handlers](/token3.png)

### Testing the Token

Now that the token blueprint is loaded, we can test the token by sending a message to ourselves using the `Action = "Info"` tag. -->

```lua
Send({ Target = ao.id, Action = "Info" }).receive().Tags
```

これにより、トークン情報がコンソールに表示されます。あなたのプロセスIDと利用可能なトークンの総残高が表示されるはずです。

### トリニティへのトークンの送信

トークンが期待通りに動作することが確認できたので、`Trinity`にトークンを送信します。`Action = "Transfer"`タグを使用して、`Trinity`に1000トークンを送ります。

<!--
This will print the token information to the console. It should show your process ID with the total balance of tokens available.

### Sending Tokens to Trinity

Now that we've tested the token and it's working as expected, we can send some tokens to `Trinity`. We'll send 1000 tokens to `Trinity` using the `Action = "Transfer"` tag. -->

```lua
Send({ Target = ao.id, Action = "Transfer", Recipient = Trinity, Quantity = "1000"}).receive().Data
```

<!-- When `Trinity` receives the tokens, she'll respond to the transfer with a message to confirm that she's received the tokens.

Her response will look something like this:

`Trinity:` "Token received. Interesting. I wasn't sure you'd make it this far. I'm impressed, but we are not done yet. I want you to use this token to tokengate the chatroom. Do that, and then I will believe you could be the one."

You've completed the process of creating a token and sending it to `Trinity`. You're now ready to move on to the next step in the tutorial. [Tokengating the Chatroom](tokengating). -->

`Trinity`がトークンを受け取ると、彼女は受け取ったことを確認するメッセージで応答します。

彼女の応答は次のようになります：

`Trinity:` "トークンを受け取りました。興味深いですね。あなたがここまで来るとは思っていませんでした。感心しましたが、まだ終わりではありません。このトークンを使ってチャットルームをトークンゲートしてください。それを達成したら、あなたが「選ばれし者」になれると信じるでしょう。"

トークンを作成し、`Trinity`に送信するプロセスを完了しました。次のステップに進む準備が整いました。[チャットルームのトークンゲート](tokengating)へ進みましょう。
