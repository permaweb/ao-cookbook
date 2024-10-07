# aoプロセスからの結果の読み取り

aoでは、メッセージが結果を生成し、これが計算ユニット（CU）によって利用可能になります。結果は、messages、spawns、output、errorの各フィールドからなるJSONオブジェクトです。

結果は、aoシステムがプロセスによって生成されたメッセージやスパウンを送信するために使用するものです。プロセスは、開発者としてメッセージを送信するのと同様に、結果にメッセージやスパウンを返すことでメッセージを送信できます。

メッセージによって生成された出力を表示するために結果にアクセスしたい場合があります。また、生成されたメッセージなどを確認したい場合もあるでしょう。結果からメッセージやスパウンを取り出して自分で送信する必要はありません。それらは自動的にメッセンジャーユニット（MU）によって処理されます。`results`を呼び出すことで、複数の結果のページ分けされたリストを提供することもできます。

## 単一の結果を取得する

<!-- # Reading results from an ao Process

In ao, messages produce results which are made available by Compute Units (CU's). Results are JSON objects consisting of the following fields: messages, spawns, output and error.

Results are what the ao system uses to send messages and spawns that are generated by processes. A process can send a message just like you can as a developer, by returning messages and spawns in a result.

You may want to access a result to display the output generated by your message. Or you may want to see what messages etc., were generated. You do not need to take the messages and spawns from a result and send them yourself. They are automatically handled by Messenger Units (MU's). A call to `results` can also provide you paginated list of multiple results.

## Fetching a single result -->

```js
import { result } from "@permaweb/aoconnect";

let { Messages, Spawns, Output, Error } = await result({
  // the arweave TXID of the message
  message: "message-id",
  // the arweave TXID of the process
  process: "process-id",
});
```

## Fetching a set of results

```js
import { results } from "@permaweb/aoconnect";

// fetching the first page of results
let resultsOut = await results({
  process: "process-id",
  sort: "ASC",
  limit: 25,
});

// calling more with a cursor
let resultsOut2 = await results({
  process: "process-id",
  from: resultsOut.edges?.[resultsOut.edges.length - 1]?.cursor ?? null,
  sort: "ASC",
  limit: 25,
});
```