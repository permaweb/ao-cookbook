---
prev:
  text: "Bots and Games"
  link: "./index"
---

# ゲームをプレイしよう！

チュートリアルを通過してきたあなたは素晴らしい！さあ、リフレッシュの時間を持ち、興奮することに飛び込んでみましょう。学びの旅に楽しい要素を加えるゲームはいかがですか？

![AO-Effect Game Banner](/ao-effect-game-banner.png)

## ゲームとは？

`ao-effect` は、友達や他のプレイヤーとリアルタイムで競い合えるゲームです。ターミナルから直接参加できます。この冒険のために、グローバルゲームプロセスを設定しました。

ルールは簡単です。各プレイヤーは 40x40 のグリッドで、体力は 100、エネルギーは 0 からスタートします。エネルギーは時間とともに補充され、最大 100 になります。グリッドを移動し、他のプレイヤーを見つけて、範囲内にいるときにエネルギーを使って攻撃します。戦いは、最後の1人が残るか、制限時間が切れるまで続きます。

ゲームの詳細を理解するためには、[アリーナのメカニクス](arena-mechanics.md) と [アリーナの拡張](build-game.md) のガイドをチェックしてください。

> 注意：コマンドの構文が不慣れに感じても心配しないでください。それぞれのコマンドの目的を高いレベルで理解することに焦点を当て、最も重要なのはゲームを楽しむことです！

## ao-effect の冒険の準備

このグローバルな冒険に参加するには、いくつかの設定が必要です。心配しないで、簡単な手順で済みます！

1. **aos をインストール**

ターミナルを起動して、次のコマンドを実行します：

<!-- ---
prev:
  text: "Bots and Games"
  link: "./index"
---

# Let's Play A Game!

You've been powering through tutorials like a champ! Now, let's take a refreshing break and dive into something exciting. How about a game that adds a dash of fun to your learning journey?

![AO-Effect Game Banner](/ao-effect-game-banner.png)

## What's the game?

`ao-effect` is a game where you can compete with friends or other players globally, in real-time, right from your terminal. We've set up a global game process for this adventure.

The rules are simple. Each player starts on a 40x40 grid with health at 100 and energy at 0. Your energy replenishes over time to a maximum of 100. Navigate the grid, find other players, and use your energy to attack when they're within range. The battle continues until only one player remains or the allotted time expires.

Checkout the guides on the [Mechanics of the Arena](arena-mechanics.md) and [Expanding the Arena](build-game.md) for a deeper understanding of the game.

> Heads Up: Don't sweat it if some command syntax seem unfamiliar. Focus on understanding the purpose of each command at a high level and, most importantly, enjoy the game!

## Preparing for an Adventure in ao-effect

To join this global escapade, you'll need to set things up. Don't worry, it's as easy as 1-2-3!

1. **Install aos**

Fire up your terminal and run: -->

```bash
npm i -g https://get_ao.g8way.io
```

2. **aos を起動**

次に、aos のインスタンスを作成します：

<!-- 2. **Launch aos**

Next, create your instance of aos: -->

```bash
aos
```

3. **ゲーム ID を設定**

ゲームサーバー ID をすぐにアクセスできるように保管しておきましょう：

<!-- 3. **Set Up the Game ID**

Let's keep our game server ID handy for quick access: -->

```lua
Game = "tm1jYBC0F2gTZ0EuUQKq5q_esxITDFkAG6QEpLbpI9I"
```

4. **ターミナルにゲームのお知らせを直接印刷（オプション）**

お知らせの詳細を印刷するためのハンドラを書く方法は次のとおりです：

_これは一時的なもので、次のセクションで lua スクリプトを介して読み込む予定です。_

<!-- 4. **Print Game Announcements Directly To Terminal (Optional)**

Here's how you can write a handler for printing announcement details:

_This is temporary as we will be loading this via a lua script in the next section._ -->

```lua
Handlers.add(
  "PrintAnnouncements",
  { Action = "Announcement" },
  function (msg)
    ao.send({Target = Game, Action = "GetGameState"})
    print(msg.Event .. ": " .. msg.Data)
  end
)
```

これで、ゲームに参加する準備が整いました。

## ゲームへの登録方法

参加する準備はできましたか？始めるための簡単な手順をいくつか紹介します。

### ゲームサーバーに登録

`ao` のプロセス間のすべての通信はメッセージを通じて行われます。登録するには、次のメッセージをゲームサーバーに送ります：

<!-- And voilà! You're all set to join the game.

## How to Register for a Game

Ready to jump in? Just a few simple steps to get you going:

### Register with the Game Server

All communication between processes in `ao` occurs through messages. To register, send this message to the game server: -->

```lua
Send({ Target = Game, Action = "Register" })

-- Expected Result --
{
   output = "Message added to outbox",
   onReply = function: 0x29e5ac0,
   receive = function: 0x29fe440
}
New Message From tm1...I9I: Action = Registered
New Player Registered: a1b...y1z has joined in waiting.
```

これにより、`Waiting` ロビーに入ることができます。スポットを確認するために小さな手数料が必要です。

### スポットの確認

スポットを確認するには、いくつかのトークンが必要です。次のメッセージをゲームに送信してトークンを取得できます：

---

グリッドを横断するための利用可能な移動は次のとおりです：

<!-- This places you in the `Waiting` Lobby. A small fee is needed to confirm your spot.

### Confirm your spot

In order to confirm your spot you need some tokens. You can acquire them by sending the following message to the game:
 -->

```lua
Send({ Target = Game, Action = "RequestTokens"}).receive().Data

-- Expected Result --
You received 10000000 from a1b2C3d4e5F6g7h8IjkLm0nOpqR8s7t6U5v4w3X2y1z
```

> [!NOTE]
> The `.receive().Data` will wait for a response by adding a temporary [Handler](../../references/handlers.md#handlers-once-name-pattern-handler) that only runs once and will print the response Data. If you would like to instead just wait for the response to hit your Inbox you can call `Send()` without `.receive()` and run `Inbox[#Inbox].Data` to see the response `Data`.
>
> Handler added by `.receive()`:
>
> ```
> {
>   name = "_once_0",
>   maxRuns = 1,
>   pattern = {  },
>   handle = function: 0x2925700
> }
> ```

<!-- Once you receive the tokens, confirm your spot by paying the game's entry fee like this: -->

トークンを受け取ったら、次のようにしてゲームの参加費を支払って自分の位置を確認してください：

```lua
Send({ Target = Game, Action = "Transfer", Recipient = Game, Quantity = "1000"}).receive().Data

-- Expected Result --
You transferred 1000 to tm1jYBC0F2gTZ0EuUQKq5q_esxITDFkAG6QEpLbpI9I
New Message From tm1...I9I: Action = Payment-Received
```

Wait for a few seconds, and you'll see live updates in your terminal about player payments and statuses.

## ゲームの開始！

### ゲームのメカニクス

ゲーム開始：ゲームは、少なくとも 2 人のプレイヤーが支払った場合、2 分の `WaitTime` の後に始まります。支払わないプレイヤーは排除されます。十分なプレイヤーが支払わなかった場合、支払ったプレイヤーには返金されます。

ゲームが始まると、プレイヤーはランダムなグリッドポイントに出現します。

### あなたのターン！

移動：最初にできることは、エネルギーを消費せずに移動することです！上下左右、または対角に1マス移動できます。移動する方向に加えて、プレイヤー ID を渡して、ゲームがあなたの移動を識別できるようにする必要があります。以下のようにします：

<!-- Wait for a few seconds, and you'll see live updates in your terminal about player payments and statuses.

## Let the Games Begin!

### Game Mechanics

Game Start: The game begins after a 2-minute `WaitTime` if at least 2 players have paid. Non-paying players are removed. If not enough players pay, those who did are refunded.

Players spawn at a random grid point once the game begins.

### It's Your Move!

Making a Move: The first thing you can do is move around, no energy required! You can shift one square in any direction – up, down, left, right, or diagonally. Along with the direction you must also pass in your player id to help the game identify your move. Here's how: -->

```lua
Send({ Target = Game, Action = "PlayerMove", Player = ao.id, Direction = "DownRight"})
```

The available moves across the grid are as follows:

```lua
Up = {x = 0, y = -1},
Down = {x = 0, y = 1},
Left = {x = -1, y = 0},
Right = {x = 1, y = 0},
UpRight = {x = 1, y = -1},
UpLeft = {x = -1, y = -1},
DownRight = {x = 1, y = 1},
DownLeft = {x = -1, y = 1}
```

> Keep in Mind: Directions are case sensitive!

グリッドの外に移動すると、反対側に出現します。

### 攻撃の時間です！

攻撃を開始します：ゲームが進むにつれてエネルギーが蓄積されます。それを使って 3x3 グリッド範囲内の他のプレイヤーを攻撃します。あなたの攻撃は自分に影響を与えませんが、範囲内の他のプレイヤーには影響を与えます。

<!--
If you move off the grid, you'll pop up on the opposite side.

### Time to Strike!

Launching an Attack: As the game progresses, you'll accumulate energy. Use it to attack other players within a 3x3 grid range. Your attack won't hurt you, but it will affect others in range. -->

```lua
Send({ Target = Game, Action = "PlayerAttack", Player = ao.id, AttackEnergy = "energy_integer"})
```

体力は 100 から始まり、他のプレイヤーからの攻撃で減少します。体力が 0 になると、ゲームオーバーです。

## まとめ

ゲームは、一人のプレイヤーが残るか、時間が切れると終了します。勝者には報酬が与えられ、その後は別のラウンドのためにロビーに戻ります。

<!-- ゲームを楽しみましたか？もし、あなたの体験をさらに良くしたり、勝つ可能性を高める方法があったらどうしますか？次のガイドをチェックしてみてください 🤔
Health starts at 100 and decreases with hits from other players. Reach 0, and it's game over for you.

## Wrapping Up

The game ends when there's one player left or time is up. Winners receive rewards, then it's back to the lobby for another round.

Enjoyed the game? What if there was a way to make your experience even better or boost your odds of winning. Checkout the next guide to find out 🤔 -->
