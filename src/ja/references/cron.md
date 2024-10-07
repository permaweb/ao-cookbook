# Cronメッセージ

aoには、指定した間隔でメッセージを生成する機能があります。この間隔は、秒、分、時間、またはブロック単位で設定できます。これらのメッセージは、監視プロセスによって自動的に評価され、時間の経過とともにプロセスがこれらのメッセージを評価するように通知します。その結果、リアルタイムで全aoネットワークや外部ネットワークのオラクルと通信できるプロセスが実現されます。

## プロセスでのcronの設定

これらのcronメッセージを作成する最も簡単な方法は、aosコンソールで新しいプロセスを生成し、時間間隔を定義することです。

```sh
aos [myProcess] --cron 5-minutes
```

<!-- # Cron Messages

ao has the ability to generate messages on a specified interval, this interval could be seconds, minutes, hours, or blocks. These messages automatically get evaluated by a monitoring process to inform the Process to evalute these messages over time. The result is a real-time Process that can communicate with the full ao network or oracles in the outside network.

## Setting up cron in a process

The easiest way to create these cron messages is by spawning a new process in the aos console and defining the time interval.

```sh
aos [myProcess] --cron 5-minutes
``` -->

<!-- When spawning a new process, you can pass a cron argument in your command-line followed by the interval you would like the cron to tick. If you want the messages to trigger in real-time you must initiate a monitor event. In aos, you simply call `.monitor` and it will kick off a worker process on the `mu` that triggers the cron messages from the `cu`. Then your Process will receive the cron messages every `x-interval`. -->

新しいプロセスを生成する際、コマンドラインでcron引数を指定し、その後にcronの間隔を設定します。メッセージをリアルタイムでトリガーしたい場合は、モニターイベントを開始する必要があります。aosでは、単に`.monitor`を呼び出すことで、`mu`上でワーカープロセスが開始され、`cu`からcronメッセージがトリガーされます。その後、プロセスは指定した`x-interval`ごとにcronメッセージを受信します。

```lua
.monitor
```

<!-- If you wish to stop triggering the cron messages simply call `.unmonitor` and this will stop the triggering process, but the next time you send a message, the generated cron messages will still get created and processed.

## Handling cron messages

Every cron message has an `Action` tag with the value `Cron`. [Handlers](handlers.md) can be defined to perform specific tasks autonomously, each time a cron message is received. -->

cronメッセージのトリガーを停止したい場合は、単に`.unmonitor`を呼び出すだけでトリガープロセスが停止します。ただし、次回メッセージを送信すると、生成されたcronメッセージは依然として作成され、処理されます。

## cronメッセージの処理

すべてのcronメッセージには、値が`Cron`の`Action`タグが付いています。[Handlers](handlers.md)を定義して、cronメッセージが受信されるたびに自律的に特定のタスクを実行させることができます。

```lua
Handlers.add(
  "CronTick", -- handler name
  Handlers.utils.hasMatchingTag("Action", "Cron"), -- handler pattern to identify cron message
  function () -- handler task to execute on cron message
    -- do something
  end
)
```

<!-- Cron messages are a powerful utility that can be used to create "autonomous agents" with expansive capabilities. -->

Cronメッセージは、広範な機能を持つ「自律型エージェント」を作成するために使用できる強力なユーティリティです。
