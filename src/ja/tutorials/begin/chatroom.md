# aosでチャットルームを構築する

::: info

もし、`ao` 内でチャットルームを作成する方法を学びたいと思っているなら、メッセージの送受信に関する基本的な手法を少なくとも理解していることを意味します。まだ理解していない場合は、先に [メッセージング](messaging) のチュートリアルを確認することをお勧めします。

:::

このチュートリアルでは、Luaスクリプト言語を使用して `ao` 内にチャットルームを構築します。このチャットルームには、次の2つの主要な機能が備わっています：

1. **登録**: プロセスがチャットルームに参加できるようにする機能。
2. **ブロードキャスト**: 1つのプロセスからすべての登録済み参加者にメッセージを送信する機能。

では、チャットルームの基盤を設定するところから始めましょう。

## Video Tutorial

<iframe width="680" height="350" src="https://www.youtube.com/embed/oPCx-cfubF0?si=D5yWxmyFMV-4mh2P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## ステップ1: 基礎

<!-- - Open your preferred code editor, e.g. VS Code. -->

- 好きなコードエディタを開きます（例：VS Code）。

::: info

Luaスクリプトの体験を向上させるために、コードエディタに[推奨拡張機能](../../references/editor-setup.md) をインストールしておくと便利です。

:::

- Create a new file named `chatroom.lua`.

- `chatroom.lua`という新しいファイルを作成します。

  ![チャットルームLuaファイル](/chatroom1.png)

## Step 2: Creating The Member List

- In `chatroom.lua`, you'll begin by initializing a list to track participants:

  ```lua
  Members = Members or {}
  ```

  ![Chatroom Lua File - Naming the Member List](/chatroom2.png)

  - Save the `chatroom.lua` file

## ステップ3: チャットルームをaosに読み込む

`chatroom.lua`を保存したら、次にチャットルームを`aos`に読み込みます。

- まだ開始していない場合は、`chatroom.lua`が保存されているディレクトリ内でターミナルから`aos`を起動します。
- `aos`のCLIで、以下のスクリプトを入力して、あなたのスクリプトを`aos`プロセスに組み込みます：

  ```lua
  .load chatroom.lua
  ```

  ![Loading the Chatroom into aos](/chatroom3.png)

  上記のスクリーンショットに示されているように、レスポンスとして`undefined`を受け取ることがあります。これは予想される動作ですが、ファイルが正しく読み込まれたことを確認したいです。

  ::: info
  aosのLua Eval環境では、明示的に値を返さないコードを実行すると、`undefined`が標準的なレスポンスとして返されます。これは、結果が返されなかったことを示しています。リソースを読み込んだり、操作を実行したりする際に観察できます。例えば、`X = 1`を実行すると、returnステートメントが含まれていないため、`undefined`が返されます。

  しかし、`X = 1; return X`を実行すると、環境は値`1`を返します。この挙動は、このフレームワーク内で作業する際に理解することが重要です。なぜなら、状態を変更するためのコマンドを実行することと、直接的な出力を生成することを目的としたコマンドとの違いを明確にする助けになるからです。
  :::

- `aos`で`Members`、またはユーザーリストに付けた名前を入力します。空の配列`{ }`が返されるはずです。

  ![メンバーリストの確認](/chatroom4.png)

  空の配列が表示されれば、スクリプトは`aos`に正常に読み込まれています。

## ステップ4: チャットルーム機能の作成

### The Registration Handler

Registration Handler は、プロセスがチャットルームに参加できるようにします。

1. **登録ハンドラの追加:** `chatroom.lua`を修正し、以下のコードを使用して`Members`に登録するためのハンドラを含めます：

<!--
- Type `Members`, or whatever you named your user list, in `aos`. It should return an empty array `{ }`.

  ![Checking the Members List](/chatroom4.png)

  If you see an empty array, then your script has been successfully loaded into `aos`.

## Step 4: Creating Chatroom Functionalities

### The Registration Handler

The register handler will allow processes to join the chatroom.

1. **Adding a Register Handler:** Modify `chatroom.lua` to include a handler for `Members` to register to the chatroom with the following code: -->

```lua

-- Modify `chatroom.lua` to include a handler for `Members`
-- to register to the chatroom with the following code:

  Handlers.add(
    "Register",
    { Action = "Register"},
    function (msg)
      table.insert(Members, msg.From)
      print(msg.From .. " Registered")
      msg.reply({ Data = "Registered." })
    end
  )
```

![Register Handler](/chatroom5.png)

   <!-- This handler will allow processes to register to the chatroom by responding to the tag `Action = "Register"`. A printed message will confirm stating `registered` will appear when the registration is successful. -->

このハンドラは、`Action = "Register"`というタグに応じてプロセスがチャットルームに登録できるようにします。登録が成功すると、`registered`というメッセージが表示されて確認されます。

2. **再読み込みとテスト:** スクリプトを再読み込みして、自分自身をチャットルームに登録してテストしましょう。

   - `.load chatroom.lua`を使用して、aosでスクリプトを保存し再読み込みます。
   - 次のスクリプトを使用して、登録ハンドラが読み込まれたか確認します：

<!-- 2. **Reload and Test:** Let's reload and test the script by registering ourselves to the chatroom.

   - Save and reload the script in aos using `.load chatroom.lua`.
   - Check to see if the register handler loaded with the following script: -->

```lua
 Handlers.list
```

![Checking the Handlers List](/chatroom6.png)

これにより、チャットルーム内のすべてのハンドラのリストが返されます。これはおそらくあなたが`aos`で開発する初めての経験であるため、`Register`という名前の1つのハンドラだけが表示されるはずです。

- 自分自身をチャットルームに登録することで、登録プロセスをテストしてみましょう：
<!-- This will return a list of all the handlers in the chatroom. Since this is most likely your first time developing in `aos`, you should only see one handler with the name `Register`.


- Let's test the registration process by registering ourselves to the chatroom: -->

```lua
Send({ Target = ao.id, Action = "Register" })
```

   <!-- If successful, you should see that there was a `message added to your outbox` and that you then see a new printed message that says `registered`. -->

成功した場合、`あなたのアウトボックスにメッセージが追加されました`というメッセージが表示され、その後に`registered`という新しい印刷メッセージが表示されるはずです。

![Registering to the Chatroom](/chatroom7.png)

   <!-- - Finally, let's check to see if we were successfully added to the `Members` list: -->

- 最後に、`Members`リストに成功裏に追加されたかどうかを確認しましょう：

```lua
 Members
```

   <!-- If successful, you'll now see your process ID in the `Members` list. -->

成功した場合、`Members`リストにあなたのプロセスIDが表示されるはずです。
![Checking the Members List](/chatroom8.png)

### Adding a Broadcast Handler

<!-- Now that you have a chatroom, let's create a handler that will allow you to broadcast messages to all members of the chatroom.

- Add the following handler to the `chatroom.lua` file: -->

チャットルームができたので、チャットルームのすべてのメンバーにメッセージをブロードキャストできるハンドラを作成しましょう。

- 次のハンドラを`chatroom.lua`ファイルに追加します：

  ```lua
    Handlers.add(
      "Broadcast",
      { Action = "Broadcast" },
      function (msg)
        for _, recipient in ipairs(Members) do
          ao.send({Target = recipient, Data = msg.Data})
        end
        msg.reply({Data = "Broadcasted." })
      end
    )
  ```

  このハンドラは、チャットルームのすべてのメンバーにメッセージをブロードキャストできるようにします。

- `.load chatroom.lua`を使用して、aosでスクリプトを保存し再読み込みします。
- チャットルームにメッセージを送信して、ブロードキャストハンドラをテストしてみましょう：
  <!-- This handler will allow you to broadcast messages to all members of the chatroom. -->

<!-- - Save and reload the script in aos using `.load chatroom.lua`.
- Let's test the broadcast handler by sending a message to the chatroom: -->

```lua
Send({Target = ao.id, Action = "Broadcast", Data = "Broadcasting My 1st Message" }).receive().Data
```

## ステップ5: モーフィアスをチャットルームに招待する

チャットルームに自分自身を成功裏に登録したので、モーフィアスを招待して参加してもらいましょう。これを行うために、彼がチャットルームに登録できるようにする招待状を送ります。

モーフィアスは、自動エージェントで、`Action = "Join"`というタグに応じて反応するハンドラを持っています。これにより、彼はあなたの`Register`タグを使用してチャットルームに登録します。

- モーフィアスにチャットルームに参加するための招待状を送りましょう：
<!-- ## Step 5: Inviting Morpheus to the Chatroom

Now that you've successfully registered yourself to the chatroom, let's invite Morpheus to join us. To do this, we'll send an invite to him that will allow him to register to the chatroom.

Morpheus is an autonomous agent with a handler that will respond to the tag `Action = "Join"`, in which will then have him use your `Register` tag to register to the chatroom. -->

<!-- - Let's send Morpheus an invitation to join the chatroom: -->

```lua
Send({ Target = Morpheus, Action = "Join" })
```

- To confirm that Morpheus has joined the chatroom, check the `Members` list:

  ```lua
  Members
  ```

  If successful, you'll receive a broadcasted message from Morpheus.

## ステップ6: トリニティをチャットルームに招待する

このメッセージの中で、彼はトリニティのプロセスIDを教え、彼女をチャットルームに招待するように指示します。

モーフィアスと同様に、彼女のプロセスIDを`Trinity`として保存し、チャットルームに招待します。

彼女が成功裏にチャットルームに参加すれば、次の課題として[トークン](token)の作成を提案してきます。

## チャットルームへの他者の参加

### 他者のオンボーディング

- aosユーザーを招待する:
  他のaosユーザーをあなたのチャットルームに参加するよう促します。彼らは登録し、ブロードキャストに参加できます。

- オンボーディング手順を提供する:
簡単にオンボーディングできるよう、彼らにシンプルなスクリプトを共有してください：
<!-- ## Step 6: Inviting Trinity to the Chatroom

Within this message, he'll give you Trinity's process ID and tell you to invite her to the chatroom.

Use the same processes to save her process ID as `Trinity` and to invite her to the chatroom as you did with Morpheus.

If she successfully joins the chatroom, she'll then pose the next challenge to you, creating a [token](token).

## Engaging Others in the Chatroom

### Onboarding Others

- Invite aos Users:
  Encourage other aos users to join your chatroom. They can register and participate in the broadcast.

- Provide Onboarding Instructions:
  Share a simple script with them for easy onboarding: -->

```lua
-- Hey, let's chat on aos! Join my chatroom by sending this command in your aos environment:
Send({ Target = [Your Process ID], Action = "Register" })
-- Then, you can broadcast messages using:
Send({Target = [Your Process ID], Action = "Broadcast", Data = "Your Message" })
```

<!-- ## Next Steps

Congratulations! You've successfully built a chatroom in `ao` and have invited Morpheus to join you. You've also created a broadcast handler to send messages to all members of the chatroom.

Next, you'll continue to engage with Morpheus, but this time you'll be adding Trinity to the conversation. She will lead you through the next set of challenges. Good Luck! -->

## 次のステップ

おめでとうございます！あなたは`ao`でチャットルームを成功裏に構築し、モーフィアスを招待しました。また、チャットルームのすべてのメンバーにメッセージを送信するためのブロードキャストハンドラも作成しました。

次に、モーフィアスとの対話を続けますが、今回はトリニティを会話に加えます。彼女が次の一連の課題へと導いてくれるでしょう。頑張ってください！
