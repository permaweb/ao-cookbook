# Cron Messages

ao has the ability to generate messages on a specified interval, this interval could be seconds, minutes, hours, or blocks. These messages automatically get evaluated by a monitoring process to inform the Process to evalute these messages over time. The result is a real-time Process that can communicate with the full ao network or oracles in the outside network.

## Setting up cron in a process

The easiest way to create these cron messages is by spawning a new process in the aos console and defining the time interval.

```sh
aos [myProcess] --cron 5-minutes
```

When spawning a new process, you can pass a cron argument in your command-line followed by the interval you would like the cron to tick. If you want the messages to trigger in real-time you must initiate a monitor event. In aos, you simply call `.monitor` and it will kick off a worker process on the `mu` that triggers the cron messages from the `cu`. Then your Process will receive the cron messages every `x-interval`.

```lua
.monitor
```

If you wish to stop triggering the cron messages simply call `.unmonitor` and this will stop the triggering process, but the next time you send a message, the generated cron messages will still get created and processed.

## Handling cron messages

Every cron message has an `Action` tag with the value `Cron`. [Handlers](handlers.md) can be defined to perform specific tasks autonomously, each time a cron message is received.

```lua
Handlers.add(
  "CronTick", -- handler name
  Handlers.utils.hasMatchingTag("Action", "Cron"), -- handler pattern to identify cron message
  function () -- handler task to execute on cron message
    -- do something
  end
)
```

Cron messages are a powerful utility that can be used to create "autonomous agents" with expansive capabilities.
