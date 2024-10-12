---
prev:
  text: "0rbit"
  link: "/guides/0rbit/get-request"
next:
  text: "BetterIDEa IDE"
  link: "../betteridea/index.md"
---

# 最初のPOSTリクエスト

このチュートリアルでは、`0rbit`プロセスでPOSTリクエストを行う方法を学びます。

## 🔑 前提条件

- システムにaosがインストールされていること。
- 一部の$0RBT。_こちらで$0RBTを入手する方法を学ぶ_[こちら](https://docs.0rbit.co/protocol/token/how-to-get)\_
- 任意のコードエディタ（VSCode、Sublime Textなど）

上記の前提条件が整ったら、

## 🛠️ 開発を始めましょう

### プロジェクトの初期化

プロジェクトディレクトリに`0rbit-Post-Request.lua`という新しいファイルを作成します。

<!-- ---
prev:
  text: "0rbit"
  link: "/guides/0rbit/get-request"
next:
  text: "BetterIDEa IDE"
  link: "../betteridea/index.md"
---

# First POST Request

In this tutorial, we will learn how to make a POST request on `0rbit` process.

## 🔑 Prerequisites

- aos installed on your system.
- Some $0RBT. _Learn how to get $0RBT [here](https://docs.0rbit.co/protocol/token/how-to-get)_
- Any Code Editor (VSCode, Sublime Text, etc)

If you are ready with the above prerequisites,

## 🛠️ Let's Start Building

### Initialize the Project

Create a new file named `0rbit-Post-Request.lua` in your project directory. -->

```bash
touch 0rbit-Post-Request.lua
```

<!-- ### Initialize the Variables -->

### 変数の初期化

```lua
local json = require("json")

_0RBIT = "BaMK1dfayo75s3q1ow6AO64UDpD9SEFbeE8xYrY2fyQ"
_0RBT_POINTS = "BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc"

FEE_AMOUNT = "1000000000000" -- 1 $0RBT
BASE_URL = "https://arweave.dev/graphql"
-- The data body to be sent in the POST request
BODY = json.encode({
    query = [[
        query {
            transactions(
                owners: ["vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI"]
            ) {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    ]]
});

ReceivedData = ReceivedData or {}
```

<!-- ### Make the Request

The following code contains the Handler that will send 1 $0RBT to the `0rbit` process and make the POST request for the `BASE_URL` -->

### リクエストの送信

以下のコードには、`0rbit`プロセスに1 $0RBTを送信し、`BASE_URL`に対してPOSTリクエストを行うハンドラが含まれています。

```lua
Handlers.add(
    "Post-Request",
    Handlers.utils.hasMatchingTag("Action", "First-Post-Request"),
    function(msg)
        Send({
            Target = _0RBT_TOKEN,
            Action = "Transfer",
            Recipient = _0RBIT,
            Quantity = FEE_AMOUNT,
            ["X-Url"] = BASE_URL,
            ["X-Action"] = "Post-Real-Data",
            ["X-Body"] = BODY
        })
        print(Colors.green .. "You have sent a POST Request to the 0rbit process.")
    end
)
```

<!-- Breakdown of the above code:

- `Handlers.add` is used to add a new handler to the `ao` process.
- Post-Request\_\_ is the name of the handler.
- `Handlers.utils.hasMatchingTag` is a function that checks if the incoming message has the matching tag same as the **First-Post-Request**.
- `function(msg)` is the function executed when the handler is called.
- `Send` is the function that takes several tags as the arguments and creates a message on the ao: -->

上記のコードの内訳：

- `Handlers.add`は、`ao`プロセスに新しいハンドラを追加するために使用されます。
- Post-Request\_\_はハンドラの名前です。
- `Handlers.utils.hasMatchingTag`は、受信メッセージが**First-Post-Request**と同じタグを持っているかをチェックする関数です。
- `function(msg)`は、ハンドラが呼び出されたときに実行される関数です。
- `Send`は、いくつかのタグを引数として取り、ao上にメッセージを作成する関数です。

  | **Tag**      |                                                        **Description**                                                         |
  | :----------- | :----------------------------------------------------------------------------------------------------------------------------: |
  | Target       |                         The processId of the recipient. In this case, it's the $0RBT token processId.                          |
  | Action       |              The tag that defines the handler to be called in the recipient process. In this case it's `Transfer`              |
  | Recipient    |           The tag that accepts the processId to whom the $0RBT will be sent. In this case, it's the 0rbit processId.           |
  | Quantity     |                                                The amount of $0RBT to be sent.                                                 |
  | ["X-Url"]    |        The _forwarded-tag_ which contains the URL and the same will be used by the **0rbit process** to fetch the data.        |
  | ["X-Action"] | The _forwarded-tag_ which contains the action to be performed by the **0rbit process**. In this case, it's **Post-Real-Data**. |
  | ["X-Body"]   |                        The _forwarded-tag_ which contains the data body to be sent in the POST request.                        |

<!-- ### Receive Data

The following code contains the Handler that will receive the data from the `0rbit` process and print it. -->

### データの受信

以下のコードには、`0rbit`プロセスからデータを受信して印刷するハンドラが含まれています。

```lua
Handlers.add(
    "Receive-Data",
    Handlers.utils.hasMatchingTag("Action", "Receive-Response"),
    function(msg)
        local res = json.decode(msg.Data)
        ReceivedData = res
        print(Colors.green .. "You have received the data from the 0rbit process.")
    end
)
```

<!-- Breakdown of the above code:

- `Handlers.add` is used to add a new handler to the `ao` process.
- **Receive-Data** is the name of the handler.
- `Handlers.utils.hasMatchingTag` is a function that checks if the incoming message has the matching tag same as the **Receive-Response**.
- `function(msg)` is the function executed when the handler is called.
  - `json.decode` is used to decode the JSON data received.
  - `ReceivedData = res` stores the received data in the `ReceivedData` variable.

The 0rbit process always sends the data in the `string` format.
`json.decode` is used above because we know the receiving data, i.e., stringified JSON.
So, you need to decode the data as per your requirements.

## 🏃 Run the process

### Create a new process and load the script
 -->

上記のコードの内訳：

- `Handlers.add`は、`ao`プロセスに新しいハンドラを追加するために使用されます。
- **Receive-Data**はハンドラの名前です。
- `Handlers.utils.hasMatchingTag`は、受信メッセージが**Receive-Response**と同じタグを持っているかをチェックする関数です。
- `function(msg)`は、ハンドラが呼び出されたときに実行される関数です。
  - `json.decode`は、受信したJSONデータをデコードするために使用されます。
  - `ReceivedData = res`は、受信したデータを`ReceivedData`変数に格納します。

0rbitプロセスは常にデータを`string`形式で送信します。  
上記では、受信データが文字列化されたJSONであるため`json.decode`が使用されています。  
そのため、要件に応じてデータをデコードする必要があります。

## 🏃 プロセスを実行する

### 新しいプロセスを作成し、スクリプトを読み込む

```bash
aos 0rbitPostRequest --load 0rbit-Post-Request.lua
```

<!-- The above command will create a new process with the name **0rbitPostRequest** and load `0rbit-Post-Request.lua` into it.

### Fund your process

Transfer some $0RBT to your processID.

### Call the Handler

Call the handler, who will create a request for the 0rbit process. -->

上記のコマンドは、**0rbitPostRequest**という名前の新しいプロセスを作成し、`0rbit-Post-Request.lua`を読み込みます。

### プロセスに資金を提供する

いくつかの$0RBTをあなたのプロセスIDに転送します。

### ハンドラの呼び出し

ハンドラを呼び出して、0rbitプロセスへのリクエストを作成します。

```bash
Send({ Target= ao.id, Action="First-Post-Request" })
```

<!-- ### Check the Data

To check the data stored in the `ReceivedData` variable, run the following command:
 -->

### データの確認

`ReceivedData`変数に格納されたデータを確認するには、以下のコマンドを実行します：

```bash
ReceivedData
```

<!-- Upon the successful execution, you will receive the JSON data in your terminal: -->

成功裏に実行されると、ターミナルにJSONデータが表示されます：

```json
{
    data = {
        transactions = {
        edges = {
            {
            node = {
                id = "nH0NU9rgNqGVHwjtjFvnIyXpsP7YVrj_v7JxFErHNB4"
            }
            },
            //and so on...
            {
            node = {
                id = "9HLUVJo4AcrSxQeapf2hutS2Xp7hx_XDiIvv3vnxDcc"
            }
            }
        }
        }
    }
}
```

---

<!-- **_Voila! You have successfully made your first POST request on the 0rbit process. 🎉_** -->

**_やった！あなたは成功裏に0rbitプロセスで最初のPOSTリクエストを行いました。🎉_**

> You can find the complete code here:
>
> https://github.com/0rbit-co/examples/blob/main/First-Post-Request.lua
