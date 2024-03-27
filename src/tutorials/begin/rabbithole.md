# Enter `The Construct` - An Interactive Tutorial

![White Rabbit](/white_rabbit_outline.svg)

## Wake up, Neo...

Are you ready to see how deep the rabbit hole goes?

This interactive tutorial will take what you've learned so far and apply it towards a mission.

### The Mission: Break Out of the Matrix and Enter "The Construct".

The construct is a tokengated chatroom inside ao that is only accessible to those who have completed a series of tasks.

**Now... let's begin.**

::: warning
You must have the latest versions of aos installed to complete this tutorial.
:::

### 1. Locate Morpheus

Morpheus' process ID:

```
9yOQrYNwIfIOeSswRDGUMd5gvMWJKxleInD_95DEC4A
```

Take his process ID and name is "Morpheus" inside aos. This is the first step to entering the construct.

```lua
Morpheus = "9yOQrYNwIfIOeSswRDGUMd5gvMWJKxleInD_95DEC4A"
```

Send a message to Morpheus, and tell him you are ready to begin.

```lua
Send({ Target = Morpheus, Data = "I'm Ready" })
```

When you've sent this message, he'll respond with the next step. Follow the instructions he gives you, and you'll be on your way to the construct.

::: info
If you need help understanding the messaging process, review the [Messaging](messaging) tutorial.
:::

### 2. Prove Yourself to Morpheus

Morpehus will give you a series of tasks to complete.
The tasks will involve:

- Building a [Chatroom](chatroom).
- Broadcasting messages within the Chatroom.
- Writing a custom Handler for the Chatroom.

When you've completed these tasks, Morpheus will give you instructions for the next step, which will involve locating Trinity.

### 3. Locate Trinity

Trinity's process ID can only be obtained by completing Morpheus' tasks.

Once you've received Trinity's process ID, you will need to name it "Trinity" inside aos. You'll then message her `"White Rabbit"`.

```lua
Send({ Target = Trinity, Data = "White Rabbit" })
```

She will respond and the next phase of the tutorial will begin.

### 4. Prove Yourself to Trinity

Much like Morpheus, Trinity will give you a series of tasks to complete.

The tasks will involve:

- Creating a [Token](token).
- Tokenizing the chatroom you built for Morpheus.
- Create your own [Game and Bot](/tutorials/bots-and-games/index).
- Register your process within the tokenized chatroom.

Once you've completed these tasks, Trinity will give you instructions for the next phase of the tutorial.

### 5. Receive the Token to the Construct

By completing the tasks of Morpheus and Trinity, you will receive a token that will allow you to enter the Construct.

### 6. Enter the Construct

Trinity will then give you instructions on how to use the token to enter the Construct.

Once you've entered the Construct, you will be able to chat with others who have completed the tutorial.
