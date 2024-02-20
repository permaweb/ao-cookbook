# Messaging in `ao`

### Why is Messaging in `ao` Needed?

In `ao`, every process runs in parallel, creating a highly scalable environment. Traditional direct function calls aren't feasible because each process operates independently and asynchronously.

Messaging addresses this by enabling asynchronous communication. Processes send and receive messages rather than directly invoking functions on each other. This method allows for flexible and efficient interaction, where processes can respond to messages, enhancing the system's scalability and responsiveness.

We'll begin by exploring the basics of messaging in `aos`, how to see messages received in your inbox, and how to send messages to other processes.

## Step 1: Understand the Message Structure

- **Message Basics:** At its core, a message in aos consists of a Lua table, which includes several fields. The key field to focus on is Data. This Data field is where the actual content or payload of your message is stored. It's what you're sending to another process or receiving from them.
- **Example**: `{ Data = "Hello from Process A!" }` is a simple message.

## Step 2: Open the aos CLI

- Launch the aos command-line interface (CLI) by typing `aos` in your terminal and pressing Enter.

```sh
aos
```

## Step 3: How to Send a Message

```sh
  Send({ Target = "process ID", Data = "Hello World!" })
```

- **Send**: The `Send` function is globally available in the aos interactive environment.
- **Target**: To send a message to a specific process, include a `Target` field in your message.
- **Data**: The `Data` is the text message you want received by the receiving process. In this example, the message is "Hello World!".

## Step 4: Store `Morpheus`'s Process ID

We'll use the process ID provided below and create store it as a variable called `Morpheus`.

```sh
BWMGpzZilu7fKcPQEK80XmUZSZTvwZ8vRGnolkoGulw
```

Copy the process ID above and store it as a variable by running the below command in the aos CLI:

```sh
Morpheus = "BWMGpzZilu7fKcPQEK80XmUZSZTvwZ8vRGnolkoGulw"
```

This will store the process ID as a variable called `Morpheus`, making it easier to interact with the specifid process ID.

After obtaining Morpheus's process ID and storing it in a variable, you're ready to communicate with it. To do this, you use the Send function. Morpheus, himself, is a paralell process running in ao. He receives and sends messages using a series of Handlers. Let's send him a message and see what happens.

::: info
When creating the `Morpheus` variable, the only response you should see is `undefined`. This is expected. To check if the variable was created successfully, type `Morpheus` and press Enter. You should see the process ID you stored.
:::

### Check the `Morpheus` Variable

```sh
# Check the Morpheus variable by typing `Morpheus`
aos> Morpheus
# Expected Results:
BWMGpzZilu7fKcPQEK80XmUZSZTvwZ8vRGnolkoGulw
aos>

# If `undefined` is returned,
# then the variable was not created successfully.
```

## Step 5: Send a Message to Morpheus

After obtaining Morpheus's process ID and storing it in a variable, you're ready to communicate with it. To do this, you use the Send function. Morpheus, himself, is a paralell process running in ao. He receives and sends messages using a series of Handlers. Let's send hi a message and see what happens.

```lua
Send({ Target = Morpheus, Data = "morpheus?" })
```

- Your `Target` is `Morpheus` which is the variable we defined earlier using `Morpheus`'s process ID.'
- The `Data` is the message you want to send to Morpheus. In this case, it's "Morpheus?".

**Expected Results:**

```sh
# Your Message Command
aos> Send({ Target = Morpheus, Data = "Morpheus?"})
# Message is added to the outbox
message added to outbox
# A New Message is received from `Morpheus`'s process ID
New Message From BWM...ulw: Data = yes, it's me. I see
aos>
```

You've sent a message to Morpheus and received a response, but you can't read the full message. Let's learn about the `Inbox` and how to read messages.

## Step 6: The Inbox

The `Inbox` is where you receive messages from other processes.
::: info
To see an in depth view of an inbox message, head over to the [Messages](../../concepts/messages) Concepts page.
:::

Let's check your inbox to see how many messages you have received.

Inside your aos CLI, type the following command:

```sh
aos> #Inbox
```

If you're actively following through the tutorial, the inbox will not have many messages. However, if you've been experimenting with the aos environment, you may more than 1 message in your inbox.

**Example Return:**

```sh
# Your Inbox Command
aos> #Inbox
# The command will return the number of messages in your inbox.
4
aos>
```

In the example above, the return is `4`, stating that there are four messages in the inbox.

As we're actively looking for `Morpheus`'s response, we'll assume his message was the last one received. To read the last message in your inbox, type the following command:

```sh
aos> Inbox[4].Data
```

This command allows you to isolate the Data from the message and only read the contents of the data.

The Expected Return:

```sh
# Your Inbox[x].Data Command
aos> Inbox[4].Data
# The command will return the `Data` of the message.
# Data is what usually represents the text-based message
# received from one process to another.
I am here. You are finally awake. Are you ready to see how far the rabbit hole goes?
aos>
```

You are now using your own process to communicate with Morpheus, another parallel process running in ao. You're now ready to move on to the next step in the tutorial.

## Step 7: Sending Messages with Tags

**Purpose of Tags**: Tags in aos messages are used to categorize, route, and process messages efficiently. They play a crucial role in message handling, especially when dealing with multiple processes or complex workflows.

Some processes use `Handlers` that specifically interact with messages that have certain tags. For example, a process may have a handler that only interacts with messages that have a specific tag, which we'll see an example of in the [chatroom](chatroom) tutorial.

### How to Use Tags in Messages

In the case of Morpheus, we can use tags to categorize our messages, and because Morpheus is a autonomous process, he has handlers that can interact with messages that have certain tags.

1. **Adding Tags to a Message**:

   - We already know that the `Data` of a message is the text-based message you want to send to another process. Earlier, we sent a message to Morpheus without any tags, in which he used a handler to respond to an exact matching data.
   - This time, we're going to ask Morpheus if Trinity is with him. To get the response we're looking for, we'll use a specific tag so that he knows how to respond.
   - **Example**:

     ```lua
     Send({
       Target = Morpheus,
       Data = "is Trinity with you?",
       Contact = "Trinity"
      }
     })

     -- `Contact` is the tag we're using to categorize the message. "Trinity" is the value of the tag.
     ```

   - This message is tagged with an "Contact" of "Trinity" , indicating its purpose.
     Here's what the expected return should look:
     ![Morpheus Responds](/messaging1.png)

### Let's Show Morpheus That We're Ready

Send Morpheus a message with the tag `Tutorial` and the value `rabbithole`.

**Example:**

```lua
Send({
  Target = Morpheus,
  Data = "I'm ready to see how far the rabbit hole goes.",
  Tutorial = "rabbithole"
  }
})
```

**Expected Return:**
![Morpheus Responds 2](/messaging2.png)

## Additional Tips for Using Tags

- **Consistent Tagging**: Develop a consistent tagging system for your application to make message handling more predictable.
- **Tag Naming**:

Choose clear and descriptive names for your tags. This makes it easier to understand the purpose and context of messages at a glance.

- **Tag Limitations**: Be mindful of the number of tags you use. While tags are powerful for categorization, overuse or overly complex tagging systems can lead to confusion and inefficiency in message handling.

- **Security with Tags**: Remember that tags are not encrypted or hidden, so avoid using sensitive information as tags.

#### Advanced Usage of Tags

- **Workflow Management**: Tags can be instrumental in managing workflows, especially in systems where messages pass through multiple stages or processes.

## Additional Tips for Messaging:

- **Message Structure**: Explore other fields like `Epoch`, `From`, and `Nonce` for more complex messaging needs.
- **Debugging**: Use the `Dump` function to print messages for debugging.
- **Security Considerations**: Be cautious with the content and handling of messages, especially when dealing with sensitive data.

## Conclusion

You've now learned how to send messages with tags, which is a powerful tool for categorizing and routing messages in aos.

Morpheus has officially invited you to the next stage of your journey. You're now ready to move on to the next step in the tutorial, [Creating a Chatroom](chatroom).
