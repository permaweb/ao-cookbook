# Processes

Processes are long running compute that contains its own memory and its own logic, you can interact with processes by sending messages. A Process can send a message to another process, which gives the network interoperability without having to share a global state. Each Process manages its own state and can not see the outside world. The process must recieve messages in its inbox, react to those messages using handlers and send messages by dropping them in its outbox.

The core module contains a helper library that gets injected into the handler function, this library is called ao.

```lua
{
    Output = "",
    _module = "lXfdCypsU3BpYTWvupgTioLoZAEOZL2_Ihcqepz6RiQ",
    _version = "0.0.3",
    authorities = {},
    clearOutbox = "function: 0x547720",
    env = {
        Process = {
            Id = "5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs",
            Owner = "_r9LpP4FtClpsGX3TOohubyaeb0IQTZZMcxQ24tTsGo",
            Tags = {
                [1] = {
                    name = "Name",
                    value = "Personal AOS"
                },
                [2] = {
                    name = "Data-Protocol",
                    value = "ao"
                },
                [3] = {
                    name = "Variant",
                    value = "ao.TN.1"
                },
                [4] = {
                    name = "Type",
                    value = "Process"
                },
                [5] = {
                    name = "Module",
                    value = "lXfdCypsU3BpYTWvupgTioLoZAEOZL2_Ihcqepz6RiQ"
                },
                [6] = {
                    name = "Scheduler",
                    value = "TZ7o7SIZ06ZEJ14lXwVtng1EtSx60QkPy-kh-kdAXog"
                },
                [7] = {
                    name = "SDK",
                    value = "ao"
                },
                [8] = {
                    name = "Content-Type",
                    value = "text/plain"
                }
            }
        }
    },
    id = "5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs",
    init = "function: 0x5469a0",
    isTrusted = "function: 0x5468d0",
    outbox = {
        Messages = {},
        Spawns = {}
    },
    result = "function: 0x547120",
    send = "function: 0x547618",
    spawn = "function: 0x5468b0"
}
```

The main functions to look at in this `ao` helper is

- ao.send(Message)
- ao.spawn(Module, Message)

Both of these functions drop the messages in the outbox, when invoked and the outbox is made available for the `mu` to take those messages, sign them and crank them to their target processes.
