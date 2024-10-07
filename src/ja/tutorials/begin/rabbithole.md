# `The Construct`に入る - インタラクティブチュートリアル

![ホワイトラビット](/white_rabbit_outline.svg)

## 目を覚ませ、ネオ...

ウサギの穴がどれほど深いか見る準備はできていますか？

このインタラクティブチュートリアルでは、これまでに学んだことを活用して、ミッションに取り組みます。

### ミッション: マトリックスから脱出し、「The Construct」に入る。

The Constructは、ao内のトークンゲートされたチャットルームで、タスクを一連の作業を完了した者のみがアクセスできます。

**さあ、始めましょう。**

::: warning
このチュートリアルを完了するには、最新バージョンのaosをインストールしている必要があります。
:::

### 1. Morpheusを見つける

MorpheusのプロセスID:

<!-- # Enter `The Construct` - An Interactive Tutorial

![White Rabbit](/white_rabbit_outline.svg)

## Wake up, Neo...

Are you ready to see how deep the rabbit hole goes?

This interactive tutorial will take what you've learned so far and apply it towards a mission.

### The Mission: Break Out of the Matrix and Enter "The Construct".

The construct is a tokengated chatroom inside ao that is only accessible to those who have completed a series of tasks.

**Now... let's begin.**

::: warning
You must have the latest versions of aos installed to complete this tutorial.
:::

### 1. Locate Morpheus

Morpheus' process ID: -->

```
9yOQrYNwIfIOeSswRDGUMd5gvMWJKxleInD_95DEC4A
```

彼のプロセスIDを取得し、aos内で「Morpheus」と名付けます。これが、The Constructに入るための第一歩です。

<!-- Take his process ID and name is "Morpheus" inside aos. This is the first step to entering the construct. -->

```lua
Morpheus = "9yOQrYNwIfIOeSswRDGUMd5gvMWJKxleInD_95DEC4A"
```

Morpheusにメッセージを送り、準備ができていることを伝えます。

<!-- Send a message to Morpheus, and tell him you are ready to begin. -->

```lua
Send({ Target = Morpheus, Data = "I'm Ready" })
```

このメッセージを送信すると、彼は次のステップを指示してくれます。彼の指示に従えば、The Constructに向かうことができます。

::: info
メッセージングプロセスの理解に苦しんでいる場合は、[Messaging](messaging)チュートリアルを確認してください。
:::

### 2. Morpheusに自分を証明する

Morpheusはあなたに一連のタスクを与えます。
タスクには以下が含まれます：

- [チャットルーム](chatroom)の構築
- チャットルーム内でのメッセージのブロードキャスト
- チャットルームのカスタムハンドラの作成

これらのタスクを完了すると、Morpheusは次のステップの指示を与えます。そのステップではTrinityを見つけることが含まれます。

### 3. Trinityを見つける

TrinityのプロセスIDは、Morpheusのタスクを完了することでのみ取得できます。

TrinityのプロセスIDを受け取ったら、aos内で「Trinity」と名付ける必要があります。その後、彼女に「"White Rabbit"」というメッセージを送ります。

<!-- When you've sent this message, he'll respond with the next step. Follow the instructions he gives you, and you'll be on your way to the construct.

::: info
If you need help understanding the messaging process, review the [Messaging](messaging) tutorial.
:::

### 2. Prove Yourself to Morpheus

Morpehus will give you a series of tasks to complete.
The tasks will involve:

- Building a [Chatroom](chatroom).
- Broadcasting messages within the Chatroom.
- Writing a custom Handler for the Chatroom.

When you've completed these tasks, Morpheus will give you instructions for the next step, which will involve locating Trinity.

### 3. Locate Trinity

Trinity's process ID can only be obtained by completing Morpheus' tasks.

Once you've received Trinity's process ID, you will need to name it "Trinity" inside aos. You'll then message her `"White Rabbit"`. -->

```lua
Send({ Target = Trinity, Data = "White Rabbit" })
```

彼女が応答すると、チュートリアルの次のフェーズが始まります。

### 4. Trinityに自分を証明する

Morpheusと同様に、Trinityもあなたに一連のタスクを与えます。

タスクには以下が含まれます：

- [トークン](token)の作成
- Morpheusのために構築したチャットルームのトークン化
- 自分自身の[ゲームとボット](/tutorials/bots-and-games/index)の作成
- トークン化されたチャットルーム内でのプロセスの登録

これらのタスクを完了すると、Trinityはチュートリアルの次のフェーズに関する指示を与えます。

### 5. Constructへのトークンを受け取る

MorpheusとTrinityのタスクを完了することで、Constructに入るためのトークンを受け取ります。

### 6. Constructに入る

その後、Trinityはトークンを使用してConstructに入る方法に関する指示を与えます。

Constructに入ると、チュートリアルを完了した他の人とチャットできるようになります。

<!--
She will respond and the next phase of the tutorial will begin.

### 4. Prove Yourself to Trinity

Much like Morpheus, Trinity will give you a series of tasks to complete.

The tasks will involve:

- Creating a [Token](token).
- Tokenizing the chatroom you built for Morpheus.
- Create your own [Game and Bot](/tutorials/bots-and-games/index).
- Register your process within the tokenized chatroom.

Once you've completed these tasks, Trinity will give you instructions for the next phase of the tutorial.

### 5. Receive the Token to the Construct

By completing the tasks of Morpheus and Trinity, you will receive a token that will allow you to enter the Construct.

### 6. Enter the Construct

Trinity will then give you instructions on how to use the token to enter the Construct.

Once you've entered the Construct, you will be able to chat with others who have completed the tutorial. -->
