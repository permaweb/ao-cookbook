# Cron Messages

ao has the ability to generate messages on a specified interval, this interval could be seconds, minutes, hours, or blocks. These messages automatically get evaluated by a monitoring process to inform the Process to evalute these messages over time. The result is a real-time Process that can communicate with the full ao network or oracles in the outside network.

The easiest way to create these cron messages is through the aos console.

```sh
aos [myProcess] --cron 5-minutes
```

When spawning a process for the first time, you can pass a cron argument on your command-line followed by the interval you would like the cron to tick. If you want the messages to trigger in real-time you must initiate a monitor event. In aos, you simply call .monitor and it will kick off a worker process on the `mu` to trigger the cron messages from the `cu` and your Process will receive messages every `x-interval`.

```lua
.monitor
```

If you wish to stop triggering the cron messages simply call `.unmonitor` and this will stop the triggering process, but the next time you send a message, the generated cron messages will still get created and processed.
