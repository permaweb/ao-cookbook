# Tokengating the Chatroom

::: info
Now that we've created a token and sent it to `Trinity`, we can use the token to tokengate our chatroom. This will allow only those who have the token to enter the chatroom.
:::

### How to Tokengate the Chatroom

Let's create a handler that will allow us to tokengate the chatroom. This handler will respond to the tag `Action = "Broadcast"` meaning it will replace the original `Broadcast` handler we built for our chatroom.

## Step 1: Start the same `aos` process.

Be sure you're using the same `aos` process that you've used throughout the tutorial.

## Step 2: Open the `chatroom.lua` file.

This is the same file we used to create the chatroom during the [chatroom](chatroom) tutorial.

## Step 3: Edit your `Broadcast` handler.

Replace the original `Broadcast` handler with the following code:

```lua
Handlers.add(
    "Broadcast",
    Handlers.utils.hasMatchingTag("Action", "Broadcast"),
    function(m)
        if Balances[m.From] == nil or tonumber(Balances[m.From]) < 1 then
            print("UNAUTH REQ: " .. m.From)
            return
        end
        local type = m.Type or "Normal"
        print("Broadcasting message from " .. m.From .. ". Content: " .. m.Data)
        for i = 1, #Members, 1 do
            ao.send({
                Target = Members[i],
                Action = "Broadcasted",
                Broadcaster = m.From,
                Data = m.Data
            })
        end
    end
)
```

This handler will now check the balance of the sender's token before broadcasting the message to the chatroom. If the sender doesn't have a token, the message will not be broadcasted.

Save the file.

## Step 4: Reload the `chatroom.lua` file.

To replace the original `broadcast` handler with the new one, you'll need to reload the `chatroom.lua` file.

```sh
 .load chatroom.lua
```

## Step 5: Test the Tokengate

Now that the chatroom is tokengated, let's test it by sending a message to the chatroom.

### From the original aos process

First, we'll test it from the original aos process.

```sh
 Send({ Target = ao.id , Action = "Broadcast", Data = "Hello" })
# Expected Results:
message added to outbox
Broadcasting message from Neo. Content: Hello.
```

## Testing from another Process ID.

### From a new aos process

Now, let's test it from a new aos process that doesn't have a token.

We'll first need to register to the chatroom.

```sh
 Send({ Target = [Your Process ID], Action = "Register" })
# Expected Results:
message added to outbox
New Message From [Your Process ID]: Data = registered
```

Now, let's try to send a message to the chatroom.

```sh
 Send({ Target = [Your Process ID] , Action = "Broadcast", Data = "Hello?" })
# Expected Results:
message added to outbox
UNAUTH REQ: [New Process ID]
```

As you can see, the message was not broadcasted because the new process doesn't have a token.

## Tell Trinity "It is done"

From the original aos process, send a broadcast message to the chatroom saying, "It is done".

```lua
Send({ Target = ao.id , Action = "Broadcast", Data = "It is done" })
```

::: warning
It's important to be aware of exact match data and case sensitivity. If you're not receiving a response from either Morpheus or Trinity, be sure to check the the content of your Data and Tags.
:::

Trinity will then respond to the chatroom being tokengated.

#### Expected Results:

Trinity will send a message saying, "I guess Morpheus was right. You are the one. Consider me impressed. You are now ready to join The Construct, an exclusive chatroom available to only those that have completed this tutorial. Now, go join the others by using the same tag you used `Register`, with this process ID: [Construct Process ID]. Good luck."

## Conclusion

You've done it! You've successfully tokengated the chatroom. This has now unlocked access to the `Construct`, where only those that have fully completed this tutorial can enter.

### Congratulations!

You've shown a great deal of promise. I hope you've enjoyed this tutorial. You're now ready to build freely in `ao`.
