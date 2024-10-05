<!-- # How ao messaging works -->

# aoメッセージングの仕組み

<!-- Before we dive in to ao, I want to share with you a little information about unix. Unix is a powerful operating system, but in its design it is focused on two Principal "Types". Files and Programs. A File is data and a program is logic, when you combine the two you get information. -->

aoに深く入り込む前に、少しUnixについてお話ししたいと思います。Unixは強力なオペレーティングシステムですが、その設計では2つの主要な「タイプ」に焦点を当てています。ファイルとプログラムです。ファイルはデータで、プログラムはロジックです。この2つを組み合わせると、情報が得られます。

<!-- `Input.file | TransformProgram | Output.file` -->

`Input.file | TransformProgram | Output.file`

<!-- You may have done something like this on the command line without knowing what you are doing. Being able to connect files to programs and return files which can then be passed to other programs creates a complex system composed of simple applications. This is a very powerful idea. -->

コマンドラインでこれに似たことを、知らず知らずのうちにやっているかもしれません。ファイルをプログラムに接続し、プログラムの結果として返されたファイルをさらに別のプログラムに渡すことができるようになると、シンプルなアプリケーションで構成された複雑なシステムを作成できます。これは非常に強力なアイデアです。

<!-- Now, lets talk about `ao` the hyper parallel computer, and lets change the idea of a File to the `ao` concept of a Message and the idea of a Program to the `ao` concept of a Process. The `ao` computer takes messages and sends them to Processes in which those Processes can output messages that can be sent to other Processes. The result is a complex system built on simple modular logic containers. -->

さて、aoというハイパーパラレルコンピュータについて話しましょう。そして、ファイルという概念をaoの「メッセージ」の概念に、プログラムという概念をaoの「プロセス」の概念に置き換えてみます。aoコンピュータはメッセージを受け取り、それをプロセスに送信します。プロセスはメッセージを出力し、それが他のプロセスに送信されます。その結果、シンプルなモジュラーなロジックコンテナに基づいた複雑なシステムが構築されます。

`MessageA | Process | MessageB`

![ao-messages](https://g8way.io/eAoqMqhwQ5vnpH_NJ6H2PiGgrcGDprtDIUH9Re2xcic)

<!-- Here is a description of the process as outlined in the flowchart: -->

以下は、フローチャートに記載されたプロセスの説明です：

1. メッセージはao Connectから開始されます。このメッセージは、`mu` サービスにPOSTリクエストを使用して送信されます。リクエストの本文には、‘ao`というプロトコルに従ったデータが含まれており、‘Message’というタイプです。

2. `mu`サービスはPOSTリクエストを処理し、メッセージを`su`サービスに転送します。これも同様に、同じデータプロトコルとメッセージタイプを使用してPOSTリクエストが行われます。

3. `su`サービスは、その割り当てとメッセージをArweaveに保存します。

4. メッセージIDに基づいて結果を取得するために、cuサービスにGETリクエストが行われます。`cu`はプロセス上のメッセージを評価し、個別のメッセージ識別子に基づいて結果を返すことができるサービスです。

5. 割り当てとメッセージを取得するために、`su`サービスにGETリクエストが行われます。このリクエストは、プロセスIDからのメッセージを、開始時間（最後の評価ポイントから）から現在のメッセージIDまでの範囲で探します。

6. 最終ステップは、アウトボックスのメッセージをプッシュすることです。メッセージとResultオブジェクト内で生成された内容を確認します。このチェックの結果に基づいて、ステップ2、3、および4が関連するメッセージや生成に対して繰り返される場合があります。

<!-- 1. A message is initiated from an ao Connect. This message is sent to the `mu` service using a POST request. The body of the request contains data following a protocol, labeled 'ao', and is of the type 'Message'.

2. The `mu` service processes the POST request and forwards the message to the `su` service. This is also done using a POST request with the same data protocol and message type.

3. The `su` service stores the assignment and message on Arweave.

4. A GET request is made to the `cu` service to retrieve result based on a message ID. The `cu` is a service that evaluates messages on processes and can return result based on an individual message identifier.

5. A GET request is made to the `su` service to retrieve the assignment and message. This request is looking for messages from a process ID, within a range of time from a start (from the last evaluation point) to (to the current messageId).

6. The final step is to push any outbox Messages. It involves reviewing the messages and spawns in the Result Object. Based on the outcome of this check, the steps 2, 3, and 4 may be repeated for each relevant message or spawn. -->
