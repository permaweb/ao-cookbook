# Crafting a Token

:::warning
This tutorial is actively under development and the content is subject to change.
:::

::: info
Diving deeper into the `ao`, you're now ready to create your own token, a symbol of value and exchange within this decentralized medium. If you've found yourself wanting to learn how to create a token, but haven't visited the [Messaging](messaging) and [Build a Chatroom](chatroom) lessons, be sure to do so as this page is part of a multi-part interactive tutorial.
:::

When creating tokens, we'll continue to use the [Lua Language](../../references/lua.md) within `ao` to mint a token, guided by the principles outlined in the [Token Specification](../../references/token.md).

## Continuing Down the Rabbit Hole

In our last tutorial, [Build a Chatroom](chatroom), we learned how to create a chatroom within `ao`, invited both `Morpheus` and `Trinity` to the chatroom we created, and then `Trinity` has now asked for us to create a token for her as a way of proving ourselves worthy of continuing down the rabbit hole.

**Let us begin.**

## The Two Paths To Building a Token

There are two paths to take when building a token:

1. **The Blueprint**: This is a predesigned template that helps you quickly build a token in `ao`. It is a great way to get started and can be customized to fit your needs.

Check here to learn more about the [Token Blueprint](../../guides/aos/blueprints/token.md).

2. **The Manual Method**: This is a step-by-step guide to building a token in `ao` from scratch. This path is for those who want to understand the inner workings of a token and how to build one from the ground up.

Check here to review the full [Build a Token](../../guides/aos/token.md) guide.

## The Blueprint Method

For this tutorial, we'll be using the Token Blueprint to create a token for `Trinity`. This is a predesigned template that helps you quickly build a token in `ao`.

### How To Use The Token Blueprint

1. Make sure we're in the same directory as before during the previous steps in the tutorial.
2. Open the Terminal.
3. Start your `aos` process.
4. Type in `.load-blueprint token`

This will load the required handlers for the tutorials token within `ao`. It's important to note that the token blueprint isn't specific to this tutorial and can be used as a foundation for any token you wish to create.

### Verify the Blueprint is Loaded

Type in `Handlers.list` to see the newly loaded handlers.

You should see a new list of handlers that have been loaded into your `aos` process. If you've been following along the with the previous steps in the tutorial, you should also see the handlers for your chatroom, as well.

**Example:**

![Token Handlers](/token3.png)

### Testing the Token

Now that the token blueprint is loaded, we can test the token by sending a message to ourselves using the `Action = "info"` tag.

```sh
aos> Send({ Target = ao.id, Action = "Info" })
```

This will print a message to the console, but to read the message, we'll need to call the `.Data` from the latest message.

```sh
aos> Inbox[#Inbox].Data

# Replace `#Inbox` with the number of the last message received.
```

This will print the token information to the console. It should show your process ID with the total balance of tokens available.

### Sending Tokens to Trinity

Now that we've tested the token and it's working as expected, we can send some tokens to `Trinity`. We'll send 1000 tokens to `Trinity` using the `Action = "transfer"` tag.

```sh
aos> Send({ Target = "Trinity", Tags = { Action = "transfer", Quantity = 1000 }})
```

When `Trinity` receives the tokens, she'll respond to the transfer with a message to confirm that she's received the tokens.

Her response will look something like this:

`Trinity:` "Hmmm... This one shows promise. I think we are ready for the next step. let's use this token to tokengate our chatroom."

You've completed the process of creating a token and sending it to `Trinity`. You're now ready to move on to the next step in the tutorial. [Tokengating the Chatroom](tokengating).
