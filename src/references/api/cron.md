# Cron Messages

ao has the ability to generate messages on a specified interval, this interval could be seconds, minutes, hours, or blocks. These messages automatically get evaluated by a monitoring process to inform the Process to evaluate these messages over time. The result is a real-time Process that can communicate with the full ao network or oracles in the outside network.

## Setting up cron in a process

The easiest way to create these cron messages is by spawning a new process in the aos console and defining the time interval.

```sh
aos [myProcess] --cron 5-minutes
```

When spawning a new process, you can pass a cron argument in your command line followed by the interval you would like the cron to tick. By default, cron messages are lazily evaluated, meaning they will not be evaluated until the next scheduled message. To initiate these scheduled cron messages, call `.monitor` in aos - this kicks off a worker process on the `mu` that triggers the cron messages from the `cu`. Your Process will then receive cron messages every `x-interval`.

```lua
.monitor
```

If you wish to stop triggering the cron messages simply call `.unmonitor` and this will stop the triggering process, but the next time you send a message, the generated cron messages will still get created and processed.

## Handling cron messages

Every cron message has an `Action` tag with the value `Cron`. [Handlers](handlers.md) can be defined to perform specific tasks autonomously, each time a cron message is received.

```lua
Handlers.add(
  "CronTick", -- Handler name
  Handlers.utils.hasMatchingTag("Action", "Cron"), -- Handler pattern to identify cron message
  function () -- Handler task to execute on cron message
    -- Do something
  end
)
```

Cron messages are a powerful utility that can be used to create "autonomous agents" with expansive capabilities.
