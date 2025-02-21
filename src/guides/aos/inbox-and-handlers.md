# Understanding the Inbox

In aos, processes are executed in response to messages via handlers. Unhandled messages are routed to the process's Inbox.

## What are Handlers?

A handler is a function that receives and evaluates messages within your process. It acts upon messages by taking them as parameters.

Handlers are defined using the `Handlers.add()` function.

The function takes three parameters:

1. Name of the Handler
2. Matcher function
3. Handle function

```lua
Handlers.add("name",
  function (Msg)
    -- Does this message match (return true or false)
    return Msg.Action == "Register"
  end,
  function (Msg)
    print("Registered User.")
    table.insert(Members, Msg.From)
    ao.send({Target = Msg.From, Data = "Registered."})
  end
)
```

## What about Inboxes?

An inbox is a storage area for messages that have not yet been processed. Think of it as a holding zone for incoming, or "inbound," items awaiting handling. Once a message is processed, it's no longer considered "inbound" and thus leaves the inbox.

> Example: Consider the inbox like your voicemail. Just as an unanswered phone call is directed to voicemail for you to address later, messages that your Process doesn't immediately handle are sent to the inbox. This way, unhandled messages are stored until you're ready to process them.

## Summary

Initially, it might seem like all messages are meant to land in your Inbox, which can be puzzling if they disappear after being handled. The analogy of a voicemail should clarify this: much like calls you answer don't go to voicemail, messages you handle won't appear in your Inbox. This illustrates the roles of both the Inbox and Handlers.
