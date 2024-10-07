# aosでのプロンプトのカスタマイズ

## ステップ1: aosを開いてエディタを開始する

- aosコマンドラインインターフェイスを起動します。
- `.editor`と入力して、インラインテキストエディタを開きます。

## ステップ2: カスタムプロンプト関数を書く

- エディタで、カスタムプロンプト関数を定義します。例えば：
<!--

# Customizing the Prompt in aos

## Step 1: Open aos and Start the Editor

- Launch the aos command-line interface.
- Enter `.editor` to open the inline text editor.

## Step 2: Write the Custom Prompt Function

- In the editor, define your custom prompt function. For example:
  -->

  ```lua
  function Prompt()
      return "YourName@aos> "
  end
  ```

  Customize `"YourName@aos> "` to your preferred prompt text.

## ステップ3: エディタを終了してコードを実行する

- エディタを終了し、コードを実行するには、`.done`と入力してEnterを押します。
- あなたのaosプロンプトは、今や新しいカスタムフォーマットを表示するはずです。

## ステップ4: 将来の使用のために保存する（オプション）

- 将来的にこのプロンプトを使用したい場合は、スクリプトをLuaファイルに保存します。
- 次回のセッションでは、このスクリプトを読み込んでカスタムプロンプトを適用します。

## プロンプトを最大限に活用する

プロンプトをカスタマイズすることで、多くのユーティリティや創造性が得られます。プロンプト内でできることはいくつかあります：

- 受信トレイにある未処理のメッセージの数を追跡する関数を作成して、どれだけのメッセージがあるかを表示します。

<!-- ## Step 3: Exit and Run Your Code

- To exit the editor and execute your code, type `.done` and then press Enter.
- Your aos prompt should now display the new custom format.

## Step 4: Save for Future Use (Optional)

- If you wish to use this prompt in future aos sessions, save your script in a Lua file.
- In subsequent sessions, load this script to apply your custom prompt.

## Maximizing Your Prompt

There's a great deal of utility and creativity that can come from customizing your prompt. Several things you can do within your prompt are:

- Tracking the number of unhandled messages you have in your inbox by creating a function that shows how many messages you have.
-->

```lua
  --Example:
  function Prompt()
    return "YourName Inbox: [" .. #Inbox .. "] > "
  end
```

<!--
- Tracking the number of members are within your process ID's chatroom.
- Tracking the balance of a specified token that your process ID holds.

## Conclusion

Now that you understand how to maximize the utility within your Prompt, you've now gained a crucial step to streamlining your ao development experience.
-->

- プロセスIDのチャットルーム内のメンバーの数を追跡します。
- プロセスIDが保持する特定のトークンの残高を追跡します。

## 結論

プロンプト内でのユーティリティを最大限に活用する方法を理解したので、ao開発体験を効率化するための重要なステップを手に入れました。
