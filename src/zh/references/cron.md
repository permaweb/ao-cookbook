# 定时消息（Cron Messages）

ao 具有在指定时间间隔生成消息的能力，这个时间间隔可以是秒、分钟、小时或区块。有一个监控进程会自动解释和运行（eval）这些消息，然后通知 Process 根据时间处理（eval）这些消息。此时会产生一个实时进程，它可以与完整的 ao 网络或外部网络中的预言机进行通信。

## 在进程中设置定时消息（Cron Messages）

创建这些定时消息（Cron Messages）的最简单方法，是在 aos 控制台中生成一个新进程并定义时间间隔。

```sh
aos [myProcess] --cron 5-minutes
```

在生成新进程时，你可以在命令行中传递一个 cron 参数，后面加上你希望 cron 触发的时间间隔。如果你希望消息实时触发，你必须启动一个监控事件。在 aos 中，你只需调用`.monitor`，它会在 `mu` 上启动一个工作进程，从 `cu` 触发定时（cron) 消息。然后你的进程将会每隔 `x-间隔` 收到定时（cron）消息。

```lua
.monitor
```

如果你希望停止触发定时（cron) 消息，只需调用 `.unmonitor`，这会停止触发过程。但下次你发送消息时，生成的定时（cron) 消息仍将创建和处理进程。

## 处理定时消息

每条定时（cron) 消息都有一个值为 `Cron` 的 `Action` 标签。根据定义，[处理器](handlers.md)在每次收到定时（cron) 消息时，都会自动执行特定任务。

```lua
Handlers.add(
  "CronTick", -- handler 的名称
  Handlers.utils.hasMatchingTag("Action", "Cron"), -- 识别定时（cron) 消息的 handler 匹配函数
  function () -- 需要定时执行的 handler 任务
    -- 要执行的内容
  end
)
```

定时消息（Cron Messages）是一个强大的实用工具，可以用来创建具有广泛功能的“自主代理”。
