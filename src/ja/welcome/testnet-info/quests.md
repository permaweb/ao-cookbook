<!-- # Quests FAQ -->

# クエストFAQ

::: info

<!-- The `ao` ecosystem is in a very early stage and full of opportunity.
There is a community quest board full of ways that you can get involved testing and building
software to grow the ecosystem, all while earning its native currency: CRED. -->

aoエコシステムは非常に初期段階にあり、数多くの機会が広がっています。
コミュニティクエストボードには、エコシステムを成長させるためにソフトウェアをテストし構築する方法が多数掲載されており、その間にネイティブ通貨であるCREDを獲得することができます。

:::

## Video Tutorial

<iframe width="680" height="350" src="https://www.youtube.com/embed/QA3OmkLcdRs?si=CLAZrIUhJ0aEGYxM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<!-- ## What quests are available?

There is a dev chat room within `ao` localnet which you can query for quest information.
First, launch `aos`: -->

## どのようなクエストが利用可能ですか？

aoローカルネット内にクエスト情報を確認できる開発者チャットルームがあります。
まず、aosを起動してください：

```sh
$ aos
```

<!-- Next, join the `Quests` chatroom, if you haven't done so already. You can optionally provide your -->
<!-- screenname/handle as the second parameter -->

次に、まだ参加していない場合は `Quests` チャットルームに参加します。オプションで、スクリーンネーム/ハンドル名を2番目のパラメーターとして指定することができます。

```lua
aos> Join("Quests")
# OR
aos> Join("Quests", "MyScreenName")
```

<!-- Then you can send the `/Quests` slash command to that chatroom. In case you have joined multiple
chatrooms, the second parameter sends the message to only one specific chatroom, by name. -->

その後、`/Quests` スラッシュコマンドをチャットルームに送信することができます。複数のチャットルームに参加している場合、2番目のパラメーターで特定のチャットルーム名を指定することもできます。

```lua
aos> Say("/Quests")
# OR
aos> Say("/Quests", "Quests")
```

<!-- After a few seconds, a bot will respond by broadcasting the list of available quests to the chatroom. -->

数秒後、ボットがチャットルームに利用可能なクエスト一覧を通知します。

<!-- ## How do I view the detailed quest description? -->

## クエストの詳細な説明をどうやって確認できますか？

<!-- You can learn more about the details of a specific quest, by sending a `/Quests:[index]` slash
command into the `Quests` chatroom, where `[index]` should be replaced with the quest number, for example: -->

特定のクエストの詳細については、Questsチャットルームに `/Quests:[index]` スラッシュコマンドを送信して確認できます。`[index]` はクエスト番号に置き換えてください。例：

```lua
aos> Say("/Quests:1", "Quests")
# OR
aos> Say("/Quests:2", "Quests")
```

### Quest 1: "Begin"

The detailed steps for Quest 1 are available in the [Begin](/tutorials/begin/index) tutorial in this cookbook.

### Quest 2: "Bots-and-Games"

The detailed steps for Quest 2 are available in the [Bots and Games](/tutorials/bots-and-games/index) tutorial in this cookbook.

## How do I complete a quest?

Follow _all_ the steps in the quest description, including submitting the claim.
