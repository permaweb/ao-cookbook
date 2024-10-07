<!-- # Accessing Data from Arweave with ao

There may be times in your ao development workflow that you want to access data from arweave. With ao your process can send an assignment instructing the network to provide that data to your Process.

In order, to request data from arweave, you simply call Assign with a list of processes you would like to assign the data to, and a Message which is the txid of a Message.

```lua

Assign({
  Processes = { ao.id },
  Message = 'message-id'
})

``` -->

# aoを使ってArweaveからデータにアクセスする

aoの開発ワークフローにおいて、Arweaveからデータにアクセスしたい時があるかもしれません。aoでは、プロセスがネットワークにデータをプロセスに提供するよう指示するアサインメントを送信できます。

Arweaveからデータをリクエストするには、データを割り当てたいプロセスのリストと、メッセージ（メッセージのtxid）を指定してAssignを呼び出すだけです。

```lua
Assign({
  Processes = { ao.id },
  Message = 'message-id'
})
```

また、Sendを呼び出して、AssignmentsパラメータにプロセスIDのテーブルを指定することもできます。これにより、ネットワークはメッセージを生成し、Assignmentsリスト内のすべてのプロセスIDに割り当てるよう指示されます。

<!-- You can also call Send with a table of process ids in the Assignments parameter. This will tell the network to generate the Message and then assign it to all the process ids in the Assignments list. -->

```lua
Send({
  Target = ao.id,
  Data = 'Hello World',
  Assignments = { 'process-id-1', 'process-id-2' }
})
```

## なぜArweaveからデータを取得するのか？

<!-- Your Process may need to access data from a message to make a decision about something, or you may want to add features to your Process via the `data` load feature. Or you may want to access a Message from a process without replicating the entire message. -->

あなたのプロセスは、何かを決定するためにメッセージからデータにアクセスする必要があるかもしれません。また、`data`ロード機能を使用してプロセスに機能を追加したい場合もあります。あるいは、メッセージ全体を複製することなく、他のプロセスからメッセージにアクセスしたい場合もあるでしょう。
