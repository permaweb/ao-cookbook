<script setup>
  import {onMounted} from "vue"
  import {renderRepl} from "../../../tools/replRenderer.jsx"

  const codes = {
    "step-3": `Handlers.add(
      "pingpong",
      Handlers.utils.hasMatchingData("ping"),
      Handlers.utils.reply("pong")
      )`,
    "step-5": `Send({ Target = ao.id, Data = "ping" })`,
    "step-6": `Inbox[#Inbox].Data`
  }

  onMounted(() => {
      Object.keys(codes).forEach((key) => {
        renderRepl(key, codes[key])
      })
    }
  )
</script>

# aosでPingpongプロセスを作成する

このチュートリアルでは、aosでシンプルな「ping-pong」プロセスを作成する方法を説明します。このプロセスでは、「ping」というデータを含むメッセージを受信するたびに、自動的に「pong」と返信します。これは、aosにおけるメッセージ処理とプロセス間の相互作用の基本的な例です。

## ステップ1: `aos` CLIを開く

- コマンドラインインターフェースを開き、`aos`と入力してaos環境に入ります。

## ステップ2: エディタにアクセス

- aos CLIで`.editor`と入力してインラインテキストエディタを開きます。ここでping-pongハンドラーコードを記述します。

## ステップ3: Pingpongハンドラーを書く

- エディタに以下のLuaコードを入力してpingpongパターンのハンドラーを追加します：
<!--

# Creating a Pingpong Process in aos

This tutorial will guide you through creating a simple "ping-pong" process in aos. In this process, whenever it receives a message with the data "ping", it will automatically reply with "pong". This is a basic example of message handling and interaction between processes in aos.

## Step 1: Open the `aos` CLI

- Start by opening your command-line interface and typing `aos` to enter the aos environment.

## Step 2: Access the Editor

- Type `.editor` in the aos CLI to open the inline text editor. This is where you'll write your ping-pong handler code.

## Step 3: Write the Pingpong Handler

- In the editor, enter the following Lua code to add a handler for the pingpong pattern:
  -->

  ```lua
  Handlers.add(
    "pingpong",
    Handlers.utils.hasMatchingData("ping"),
    Handlers.utils.reply("pong")
  )
  ```

    <div id="step-3"></div>

- このLuaスクリプトは3つのことを行います：
  1. "pingpong"という名前の新しいハンドラーを追加します。
  2. `Handlers.utils.hasMatchingData("ping")`を使用して、受信したメッセージがデータ"ping"を含むかどうかを確認します。
  3. メッセージが"ping"を含む場合、`Handlers.utils.reply("pong")`が自動的にデータ"pong"を持つメッセージを返します。

<!--
- This lua script does three things:
  1. It adds a new handler named "pingpong".
  2. It uses `Handlers.utils.hasMatchingData("ping")` to check if incoming messages contain the data "ping".
  3. If the message contains "ping", `Handlers.utils.reply("pong")` automatically sends back a message with the data "pong".
-->
<!--
## Step 4: Exit the Editor
-->

## ステップ4: エディタを終了する

- コードを書いたら、`.done`と入力してEnterを押すことでエディタを終了し、スクリプトを実行します。

<!--
- After writing your code, type `.done` and press Enter to exit the editor and run the script.
-->

<!--
## Step 5: Test the Pingpong Process
-->

<!--
- To test the process, send a message with the data "ping" to the process. You can do this by typing the following command in the aos CLI:
-->

## ステップ5: Pingpongプロセスをテストする

- プロセスをテストするために、データ"ping"を含むメッセージをプロセスに送信します。次のコマンドをaos CLIに入力して行います：

  ```lua
  Send({ Target = ao.id, Data = "ping" })
  ```

  <div id="step-5"></div>

- プロセスは、`Inbox`に"pong"を含むメッセージで応答するはずです。

## ステップ6: Inboxを監視する

- `Inbox`を確認して"ping"メッセージと、`Outbox`を確認して"pong"の返信があるかどうかを確認します。
<!--
- The process should respond with a message containing "pong" in the `Inbox`.

## Step 6: Monitor the Inbox

- Check your Inbox to see the "ping" message and your Outbox to confirm the "pong" reply.
  -->

```lua
Inbox[#Inbox].Data
```

<div id="step-6"></div>

## ステップ7: 実験して観察する

- 異なるメッセージを送信して、"ping"メッセージのみが"pong"の応答を引き起こす様子を観察してみてください。

## ステップ8: プロセスを保存する（オプション）

- 将来的にこのプロセスを使用したい場合は、ハンドラーコードをLuaファイルに保存して、aosセッションで簡単に読み込むことができます。

::: info

**追加のヒント:**

- **ハンドラーの効率性**: ハンドラー関数のシンプルさが重要です。効率的で、正しい条件下でのみトリガーされるようにしてください。

:::

## 結論

おめでとうございます！これで、aosで基本的なping-pongプロセスを作成しました。このチュートリアルは、メッセージ処理とaos環境内でのプロセスの相互作用を理解するための基礎を提供します。これらの概念に慣れてきたら、より複雑なプロセスや相互作用に拡張し、aosの可能性を探求することができます。

<!--
## Step 7: Experiment and Observe

- Experiment by sending different messages and observe how only the "ping" messages trigger the "pong" response.

## Step 8: Save Your Process (Optional)

- If you want to use this process in the future, save the handler code in a Lua file for easy loading

into aos sessions.

::: info

**ADDITIONAL TIP:**

- **Handler Efficiency**: The simplicity of the handler function is key. Ensure that it's efficient and only triggers under the correct conditions.

:::

## Conclusion

Congratulations! You have now created a basic ping-pong process in aos. This tutorial provides a foundation for understanding message handling and process interaction within the aos environment. As you become more comfortable with these concepts, you can expand to more complex processes and interactions, exploring the full potential of aos.
-->
