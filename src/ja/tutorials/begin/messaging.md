<script setup>
  import {onMounted} from "vue"
  import {renderRepl} from "../../../tools/replRenderer.jsx"

  const codes = {
    "step-3": `Send({ Target = "process ID", Data = "Hello World!" })`,
    "step-4": `Morpheus = "ajrGnUq9x9-K1TY1MSiKwNWhNTbq7-IdtFa33T59b7s"`,
    "step-4-1": `Morpheus`,
    "step-5": `Send({ Target = Morpheus, Data = "Morpheus?" })`,
    "step-6": `#Inbox`,
    "step-6-1": `Inbox[#Inbox].Data`,
    "step-7": `Send({ Target = Morpheus, Data = "Code: rabbithole", Action = "Unlock" })`,
    "step-7-2": `Inbox[#Inbox].Data`
  }

  onMounted(() => {
      Object.keys(codes).forEach((key) => {
        renderRepl(key, codes[key])
      })
    }
  )
</script>

# aoにおけるメッセージング

## メッセージがaoの並列コンピュート機能をどのように提供するかを学ぶ

`ao`では、すべてのプロセスが並行して実行され、高度にスケーラブルな環境を作り出します。プロセス間での従来の直接関数呼び出しは実行できません。なぜなら、各プロセスが独立して非同期に動作するからです。

メッセージングは、非同期通信を可能にすることでこの問題に対処します。プロセスは、互いに直接関数を呼び出すのではなく、メッセージを送受信します。この方法により、プロセスがメッセージに応答できる柔軟で効率的な相互作用が実現し、システムのスケーラビリティと応答性が向上します。

まず、`aos`におけるメッセージングの基本を探り、受信トレイに受け取ったメッセージを確認し、他のプロセスにメッセージを送信する方法を学びます。

## ビデオチュートリアル

<iframe width="680" height="350" src="https://www.youtube.com/embed/6aCjKK6F1yQ?si=3Ny7U-GgyNsRWlXS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## ステップ1: メッセージ構造の理解

- **メッセージの基本:** `ao`のメッセージは、複数の値を保持できる柔軟なデータ構造であるLuaテーブルを使用して構築されます。これらのテーブル内で「Data」フィールドは重要であり、メッセージの内容やペイロードが含まれています。この構造により、プロセス間での情報の効率的な送受信が可能になり、`ao`のプリミティブがArweaveの基盤となる機能を活用して複雑で構成可能な操作を促進します。

  詳細な仕様については、[G8wayの仕様ページ](https://specs.g8way.io/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw)を参照してください。

- **例:** `{ Data = "Hello from Process A!" }`はシンプルなメッセージです。

## ステップ2: aos CLIを開く

- ターミナルで`aos`と入力して、aosコマンドラインインターフェイス（CLI）を起動します。

<!-- # Messaging in `ao`

## Learn how Messages gives `ao` Parallel Compute Capability

In `ao`, every process runs in parallel, creating a highly scalable environment. Traditional direct function calls between processes aren't feasible because each process operates independently and asynchronously.

Messaging addresses this by enabling asynchronous communication. Processes send and receive messages rather than directly invoking functions on each other. This method allows for flexible and efficient interaction, where processes can respond to messages, enhancing the system's scalability and responsiveness.

We'll begin by exploring the basics of messaging in `aos`, how to see messages received in your inbox, and how to send messages to other processes.

## Video Tutorial

<iframe width="680" height="350" src="https://www.youtube.com/embed/6aCjKK6F1yQ?si=3Ny7U-GgyNsRWlXS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Step 1: Understand the Message Structure

- **Message Basics:** Messages in `ao` are built using Lua tables, which are versatile data structures that can hold multiple values. Within these tables, the "Data" field is crucial as it contains the message's content or payload. This structure allows for efficient sending and receiving of information between processes, showcasing how `ao` primitives leverage Arweave's underlying capabilities to facilitate complex, composable operations.

  For detailed specifications, please refer to the original documentation on the [G8way specs page](https://specs.g8way.io/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw).

- **Example**: `{ Data = "Hello from Process A!" }` is a simple message.

## Step 2: Open the aos CLI

- Launch the aos command-line interface (CLI) by typing `aos` in your terminal and pressing Enter. -->

```sh
aos
```

<!-- ## Step 3: How to Send a Message -->

ステップ3: メッセージを送信する方法

```lua
Send({ Target = "process ID", Data = "Hello World!" })
```

<div id="step-3"></div>

<!--
- **Send**: The `Send` function is globally available in the aos interactive environment.
- **Target**: To send a message to a specific process, include a `Target` field in your message.
- **Data**: The `Data` is the text message you want received by the receiving process. In this example, the message is "Hello World!".

## Step 4: Store `Morpheus`'s Process ID

We'll use the process ID provided below and store it as a variable called Morpheus. -->

- **Send:** `Send`関数は、aosインタラクティブ環境でグローバルに利用可能です。
- **Target:** 特定のプロセスにメッセージを送信するには、メッセージに`Target`フィールドを含めます。
- **Data:** `Data`は、受信プロセスに送信したいテキストメッセージです。この例では、メッセージは"Hello World!"です。

## ステップ4: `Morpheus`のプロセスIDを保存する

以下で提供されたプロセスIDを使用し、変数として`Morpheus`に保存します。

```lua
ajrGnUq9x9-K1TY1MSiKwNWhNTbq7-IdtFa33T59b7s
```

Copy the process ID above and store it as a variable by running the below command in the aos CLI:

```lua
Morpheus = "ajrGnUq9x9-K1TY1MSiKwNWhNTbq7-IdtFa33T59b7s"
```

<div id="step-4"></div>

これにより、プロセスIDが`Morpheus`という名前の変数として保存され、特定のプロセスIDと対話しやすくなります。

::: info
`Morpheus`変数を作成する際、返されるレスポンスは`undefined`のみであるべきです。これは予想される動作です。変数が正常に作成されたか確認するには、`Morpheus`と入力してEnterを押します。保存したプロセスIDが表示されるはずです。
:::

### `Morpheus`変数の確認

<!-- This will store the process ID as a variable called `Morpheus`, making it easier to interact with the specific process ID.

::: info
When creating the `Morpheus` variable, the only response you should see is `undefined`. This is expected. To check if the variable was created successfully, type `Morpheus` and press Enter. You should see the process ID you stored.
:::

### Check the `Morpheus` Variable -->

```lua
-- Check the Morpheus variable by typing `Morpheus`
 Morpheus
-- Expected Results:
ajrGnUq9x9-K1TY1MSiKwNWhNTbq7-IdtFa33T59b7s


-- If `undefined` is returned,
-- then the variable was not created successfully.
```

<div id="step-4-1"></div>

## ステップ5: Morpheusにメッセージを送信する

MorpheusのプロセスIDを取得し、変数に保存した後、彼と通信する準備が整いました。これを行うには、Send関数を使用します。モーフィアス自身は、aoで実行されている並行プロセスです。彼は一連のハンドラを使用してメッセージを受信し送信します。メッセージを彼に送って、どうなるか見てみましょう。

<!-- ## Step 5: Send a Message to Morpheus

After obtaining Morpheus's process ID and storing it in a variable, you're ready to communicate with it. To do this, you use the Send function. Morpheus, himself, is a parallel process running in ao. He receives and sends messages using a series of Handlers. Let's send him a message and see what happens. -->

```lua
Send({ Target = Morpheus, Data = "Morpheus?" })
```

<div id="step-5"></div>

- あなたの`Target`は`Morpheus`であり、これは以前に`Morpheus`のプロセスIDを使用して定義した変数です。
- `Data`は、Morpheusに送信したいメッセージです。この場合、メッセージは"Morpheus?"です。

**期待される結果:**

<!--
- Your `Target` is `Morpheus` which is the variable we defined earlier using `Morpheus`'s process ID.
- The `Data` is the message you want to send to Morpheus. In this case, it's "Morpheus?".
 -->
<!-- **Expected Results:** -->

```lua
-- Your Message Command
 Send({ Target = Morpheus, Data = "Morpheus?"})
-- Message is added to the outbox
message added to outbox
-- A New Message is received from `Morpheus`'s process ID
New Message From BWM...ulw: Data = I am here. You are f

```

Morpheusにメッセージを送信し、応答を受け取りましたが、完全なメッセージは読めません。次は`Inbox`について学び、メッセージを読む方法を見ていきましょう。

## ステップ6: インボックス

`Inbox`は、他のプロセスからのメッセージを受信する場所です。
::: info
インボックスメッセージの詳細な表示を確認するには、[メッセージ](../../concepts/messages)の概念ページに移動してください。
:::

インボックスに受信したメッセージがいくつあるかを確認します。

aos CLIの中で、次のコマンドを入力します：

<!-- You've sent a message to Morpheus and received a response, but you can't read the full message. Let's learn about the `Inbox` and how to read messages.

## Step 6: The Inbox

The `Inbox` is where you receive messages from other processes.
::: info
To see an in depth view of an inbox message, head over to the [Messages](../../concepts/messages) Concepts page.
:::

Let's check your inbox to see how many messages you have received.

Inside your aos CLI, type the following command:
 -->

```lua
 #Inbox
```

<div id="step-6"></div>

チュートリアルを積極的に進めている場合、インボックスには多くのメッセージがないでしょう。しかし、aos環境で実験を行っている場合、インボックスに1つ以上のメッセージがあるかもしれません。

<!-- If you're actively following through the tutorial, the inbox will not have many messages. However, if you've been experimenting with the aos environment, you may more than 1 message in your inbox.

 -->

**Example Return:**

```lua
-- Your Inbox Command
 #Inbox
-- The command will return the number of messages in your inbox.
4

```

<!--
In the example above, the return is `4`, stating that there are four messages in the inbox.

As we're actively looking for `Morpheus`'s response, we'll assume his message was the last one received. To read the last message in your inbox, type the following command: -->

上記の例では、返答は`4`となっており、インボックスに4つのメッセージがあることを示しています。

私たちは積極的に`Morpheus`の応答を探しているので、彼のメッセージが最後に受信されたメッセージであると仮定します。インボックスの最後のメッセージを読むには、次のコマンドを入力します：

```lua
 Inbox[#Inbox].Data
```

<div id="step-6-1"></div>

<!-- This command allows you to isolate the Data from the message and only read the contents of the data. -->

このコマンドは、メッセージからデータを分離し、データの内容のみを読むことを可能にします。
The Expected Return:

```lua
-- Your Inbox[x].Data Command
 Inbox[#Inbox].Data
-- The command will return the `Data` of the message.
-- Data is what usually represents the text-based message
-- received from one process to another.
I am here. You are finally awake. Are you ready to see how far the rabbit hole goes?

```

あなたは現在、自分のプロセスを使って、aoで実行されている別の並行プロセスであるMorpheusと通信しています。次のチュートリアルのステップに進む準備が整いました。

## ステップ7: タグ付きメッセージの送信

**タグの目的**: aosメッセージのタグは、メッセージを効率的に分類、ルーティング、処理するために使用されます。これらはメッセージ処理において重要な役割を果たし、特に複数のプロセスや複雑なワークフローを扱う際に役立ちます。

いくつかのプロセスは、特定のタグを持つメッセージと相互作用する`Handlers`を使用します。たとえば、特定のタグを持つメッセージのみと相互作用するハンドラを持つプロセスがあり、これについては[チャットルーム](chatroom)チュートリアルでの例を見ていきます。

### メッセージにタグを使用する方法

Morpheusの場合、タグを使用してメッセージを分類できます。また、Morpheusは自律プロセスであるため、特定のタグを持つメッセージと相互作用できるハンドラを持っています。

**メッセージにタグを追加する**:

- メッセージの`Data`は、別のプロセスに送信したいテキストメッセージであることは既に知っています。以前、タグなしでMorpheusにメッセージを送りましたが、彼は正確に一致するデータに対してハンドラを使用して応答しました。

### Morpheusに私たちが準備ができていることを示そう

Morpheusに、タグ`Action`と値`rabbithole`を持つメッセージを送信します。

<!-- You are now using your own process to communicate with Morpheus, another parallel process running in ao. You're now ready to move on to the next step in the tutorial.

## Step 7: Sending Messages with Tags

**Purpose of Tags**: Tags in aos messages are used to categorize, route, and process messages efficiently. They play a crucial role in message handling, especially when dealing with multiple processes or complex workflows.

Some processes use `Handlers` that specifically interact with messages that have certain tags. For example, a process may have a handler that only interacts with messages that have a specific tag, which we'll see an example of in the [chatroom](chatroom) tutorial.

### How to Use Tags in Messages

In the case of Morpheus, we can use tags to categorize our messages, and because Morpheus is a autonomous process, he has handlers that can interact with messages that have certain tags.

**Adding Tags to a Message**:

- We already know that the `Data` of a message is the text-based message you want to send to another process. Earlier, we sent a message to Morpheus without any tags, in which he used a handler to respond to an exact matching data.

### Let's Show Morpheus That We're Ready

Send Morpheus a message with the tag `Action` and the value `rabbithole`. -->

**Example:**

```lua
Send({ Target = Morpheus, Data = "Code: rabbithole", Action = "Unlock" })
```

<div id="step-7"></div>

**Read the message from Morpheus:**

```lua
Inbox[#Inbox].data
```

<div id="step-7-2"></div>

**Expected Return:**
![Morpheus Responds 2](/messaging2.png)

## タグを使用するための追加のヒント

- **一貫したタグ付け**: メッセージ処理をより予測可能にするために、アプリケーションに一貫したタグ付けシステムを開発しましょう。
- **タグ名**: タグには明確で説明的な名前を選んでください。これにより、メッセージの目的や文脈を一目で理解しやすくなります。
- **タグのセキュリティ**: タグは暗号化されず隠されないため、敏感な情報をタグとして使用しないように注意してください。

## タグの高度な使用法

- **ワークフロー管理**: タグは、メッセージが複数の段階やプロセスを通過するシステムにおいて、ワークフローを管理するのに役立ちます。

## メッセージングに関する追加のヒント

- **メッセージ構造**: より複雑なメッセージングニーズに対応するために、`Epoch`、`From`、`Nonce`などの他のフィールドも探ってみてください。
- **デバッグ**: デバッグ用にメッセージを印刷するために[`Dump`](/concepts/tour.html#_6-data-representation-with-dump)関数を使用してください。
- **セキュリティ考慮事項**: メッセージの内容や処理には注意し、プライベートまたは敏感と見なされるものを送信しないでください。

## 結論

タグ付きメッセージの送信方法を学びました。これは、aosにおけるメッセージの分類とルーティングにおいて強力なツールです。

Morpheusは、あなたを次のステージに正式に招待しました。次のチュートリアルのステップである[チャットルームの作成](chatroom)に進む準備が整いました。

<!--
## Additional Tips for Using Tags

- **Consistent Tagging**: Develop a consistent tagging system for your application to make message handling more predictable.
- **Tag Naming**: Choose clear and descriptive names for your tags. This makes it easier to understand the purpose and context of messages at a glance.
- **Security with Tags**: Remember that tags are not encrypted or hidden, so avoid using sensitive information as tags.

## Advanced Usage of Tags

- **Workflow Management**: Tags can be instrumental in managing workflows, especially in systems where messages pass through multiple stages or processes.

## Additional Tips for Messaging

- **Message Structure**: Explore other fields like `Epoch`, `From`, and `Nonce` for more complex messaging needs.
- **Debugging**: Use the [`Dump`](/concepts/tour.html#_6-data-representation-with-dump) function to print messages for debugging.
- **Security Considerations**: Be cautious with the content and handling of messages, and never send anything considered private or sensitive.

## Conclusion

You've now learned how to send messages with tags, which is a powerful tool for categorizing and routing messages in aos.

Morpheus has officially invited you to the next stage of your journey. You're now ready to move on to the next step in the tutorial, [Creating a Chatroom](chatroom). -->
