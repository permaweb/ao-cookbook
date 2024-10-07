# ゲーム状態の取得

今、あなたはゲームの発表が直接端末に表示されるのを見ており、ゲームのダイナミクスをよりよく理解できるようになっています。しかし、これらの洞察はゲーム内で発生する特定のアクションに限られています。

すべてのプレイヤーの位置、健康、エネルギーなど、包括的なゲームデータにオンデマンドでアクセスできるとしたら、より便利ではありませんか？この情報は、脅威、機会、タイミングをより効果的に評価するのに役立ち、戦略的計画を大幅に改善できるでしょう。

前回のガイドで作成したボットに別のハンドラーを追加することを考えたなら、あなたは絶対に正しいです！

## コードを書く

`bot.lua`ファイルに戻り、既存のハンドラーを次のように更新します：

<!-- # Fetching Game State

Now that you're seeing game announcements directly in your terminal, you have a better grasp of the game's dynamics. However, these insights are limited to specific actions occurring within the game.

Wouldn't it be more useful to have on-demand access to comprehensive game data, like the positions, health, and energy of all players? This information could significantly improve your strategic planning, helping you assess threats, opportunities, and timing more effectively.

If you thought of adding another handler to the bot created in the [previous guide](announcements), you're absolutely right!

## Writing the Code

Go back to your `bot.lua` file and update your existing handler as follows: -->

```lua
Handlers.add(
  "HandleAnnouncements",
  { Action = "Announcement" },
  function (msg)
    ao.send({Target = Game, Action = "GetGameState"})
    print(msg.Event .. ": " .. msg.Data)
  end
)
```

ハンドラーへの調整内容：

- より広範な役割を反映するために、`"HandleAnnouncements"`に名前を変更。
- ゲームの最新状態を要求するための追加操作を追加。このゲームは、`GetGameState`アクションタグに応じて応答するように設計されています。

発表を印刷したときに、次のようにして`Inbox`内の最新のメッセージを確認できます：

<!-- Adjustments to your handler include:

- Renaming to `"HandleAnnouncements"` to reflect its broader role.
- Addition of an extra operation to request the game for the updated state. The game is designed to respond to the `GetGameState` action tag.

When you get a print of the announcement, you can check the latest message in your `Inbox` as follows: -->

```lua
Inbox[#Inbox]
```

このメッセージの`Data`フィールドには、ゲームの最新状態が含まれています。これには以下が含まれます：

- `GameMode` : ゲームが`Waiting`または`Playing`状態かどうか。
- `TimeRemaining` : ゲームの開始または終了までの残り時間。
- `Players` : 各プレイヤーの位置、健康、エネルギーなどの統計を含むテーブル。

しかし、これは単に読むだけでなく、最新の状態から情報を使用して他の自動化を行うためのさらなるステップを踏むことができます。

以下のように最新の状態を格納する新しい変数を定義しましょう：

<!--
The `Data` field of this message contains the latest state of the game which includes:

- `GameMode` : Whether the game is in `Waiting` or `Playing` state.
- `TimeRemaining` : The time remaining for the game to start or end.
- `Players` : A table containing every player's stats like position, health and energy.

But this can be taken a step further so that you can not just read but also use information from the latest state for other automations.

Let's define a new variable that stores the latest state as follows: -->

```lua
LatestGameState = LatestGameState or nil
```

この構文は、端末において`bot.lua`ファイルの後続のイテレーションをロードする際に、変数の既存の値を保持し、上書きするのではなく、`nil`の値を変数に割り当てます。

次に、以下のように別のハンドラーを実装します：

<!--
The syntax preserves exisitng values of the variable when you load successive iterations of the `bot.lua` file in your terminal, instead of overwriting it. If there is no pre-existing value then a `nil` value is assigned to the variable.

Then implement another handler as follows: -->

```lua
-- Handler to update the game state upon receiving game state information.
Handlers.add(
  "UpdateGameState",
  { Action = "Announcement" },
  function (msg)
    local json = require("json")
    LatestGameState = json.decode(msg.Data)
    ao.send({Target = ao.id, Action = "UpdatedGameState"})
    print("Game state updated. Print \'LatestGameState\' for detailed view.")
  end
)
```

前のハンドラーからのゲームプロセスの応答には、値`GameState`を持つアクションタグがあり、これによってこの二番目のハンドラーがトリガーされます。トリガーされると、ハンドル関数は組み込みの`json`パッケージをロードし、データをjsonに解析して`LatestGameState`変数に保存します。

このハンドラーは、状態が更新されたときにプロセスにメッセージを送信します。この機能の重要性は、次のセクションで説明されます。

以下のドロップダウンで`bot.lua`の最新コードを参照できます：

<!-- The response from the game process from the previous handler has an action tag with the value `GameState` that helps us trigger this second handler. Once triggered, the handle function loads the in-built `json` package that parses the data into json and stores it in the `LatestGameState` variable.

This handler additionally sends a message to your process indicating when the state has been updated. The significance of this feature will be explained in the following section.

You can refer to the latest code for `bot.lua` in the dropdown below: -->

<details>
  <summary><strong>Updated bot.lua file</strong></summary>

```lua
LatestGameState = LatestGameState or nil

Handlers.add(
"HandleAnnouncements",
{ Action = "Announcement" },
function (msg)
  ao.send({Target = Game, Action = "GetGameState"})
  print(msg.Event .. ": " .. msg.Data)
end
)

Handlers.add(
"UpdateGameState",
{ Action = "GameState" },
function (msg)
  local json = require("json")
  LatestGameState = json.decode(msg.Data)
  ao.send({Target = ao.id, Action = "UpdatedGameState"})
  print("Game state updated. Print \'LatestGameState\' for detailed view.")
end
)
```

</details>

## ローディングとテスト

いつものように、この新機能をテストするために、次のようにしてファイルをあなたのaosプレイヤー端末にロードします：

<!-- ## Loading and Testing

As usual, to test this new feature, load the file in your aos player terminal as follows:
 -->

```lua
.load bot.lua
```

<!-- Then check the `LatestStateVariable` to see if it has updated correctly by simply passing its name as follows: -->

その後、次のようにその名前を単に渡して、`LatestStateVariable`が正しく更新されたかどうかを確認します：

```lua
LatestGameState
```

ゲームの最新状態へのリアルタイムアクセスにより、あなたのボットは情報に基づいた決定を下すことができ、次のアクションを決定します。次は、このデータを活用してアクションを自動化してみましょう🚶

<!-- With real-time access to the latest state of the game you bot is equipped to make informed decisions decide your next action. Next let's try automating actions with the help of this data 🚶 -->
