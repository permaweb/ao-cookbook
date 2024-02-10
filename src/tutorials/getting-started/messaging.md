# Core Concept Type #2: Messaging

Messaging is a core concept in the aos environment, enabling communication between processes and facilitating the flow of information within the system.

We'll begin by exploring the basics of messaging in aos, how to see messages received in your inbox, and how to send messages to other processes.

### Step 1: Understand the Message Structure

- **Message Basics**: A message in aos is typically a Lua table containing various fields. The most important field is `Data`, which holds the content of your message.
- **Example**: `{ Data = "Hello from Process A!" }` is a simple message.

### Step 2: Open the aos CLI

- Launch the aos command-line interface (CLI) by typing `aos` in your terminal and pressing Enter.

```bash
aos
```

### Step 3: How to Send a Message

```lua
  Send({ Target = "process ID", Data = "Hello World!" })
```

- **Send**: The `Send` function is globally available in the aos interactive environment.
- **Target**: To send a message to a specific process, include a `Target` field in your message.
- **Data**: The `Data` is the text message you want received by the receiving process. In this example, the message is "Hello World!".

### Step 4: Store `Morpheus`'s Process ID

We'll use the process ID provided below and create store it as a variable called `Morpheus`.

```bash
F3GAYnHkBlB0IbTcp-WnVIbXmJDsilp16lxDwXm4GMg
```

Copy the process ID above and store it as a variable by running the below command in the aos CLI:

```lua
Morpheus = "F3GAYnHkBlB0IbTcp-WnVIbXmJDsilp16lxDwXm4GMg"
```

This will store the process ID as a variable called `Morpheus`, making it easier to interact with the specifid process ID.

::: info
When creating the `Morpheus` variable, the only response you should see is `undefined`. This is expected. To check if the variable was created successfully, type `Morpheus` and press Enter. You should see the process ID you stored.
:::

#### Check the `Morpheus` Variable

```lua
-- Check the Morpheus variable by typing `Morpheus`
aos> Morpheus
-- Expected Results:
F3GAYnHkBlB0IbTcp-WnVIbXmJDsilp16lxDwXm4GMg
aos>

-- If `undefined` is returned,
-- then the variable was not created successfully.
```

### Step 4: Send a Message to Morpheus

Now that you have `Morpheus`'s process ID stored as a variable, you can send a message to Morpheus using the `Send` function.

```lua
Send({ Target = Morpheus, Data = "Morpheus?" })
```

- Your `Target` is `Morpheus` which is the variable we defined earlier using `Morpheus`'s process ID.'
- The `Data` is the message you want to send to Morpheus. In this case, it's "Morpheus?".

**Expected Results:**

```lua
-- Your Message Command
aos> Send({ Target = Morpheus, Data = "Morpheus?"})
-- Message is added to the outbox
message added to outbox
-- A New Message is received from `Morpheus`'s process ID
New Message From F3G...GMg: Data = I am here. You are f
aos>
```

You've sent a message to Morpheus and received a response, but you can't read the full message. Let's learn about the `Inbox` and how to read messages.

### Step 5: The Inbox

The `Inbox` is where you receive messages from other processes.
::: info
To see an in depth view of an inbox message, head over to the [Messages](../../../concepts/messages) Concepts page.
:::

Let's check your inbox to see how many messages you have received.

Inside your aos CLI, type the following command:

```lua
#Inbox
```

If you're actively following through the tutorial, the inbox will not have many messages. However, if you've been experimenting with the aos environment, you may more than 1 message in your inbox.

**Example Return:**

```lua
-- Your Inbox Command
aos> #Inbox
-- The Return
4
aos>
```

In the example above, the return is `4`, stating that there are four messages in the inbox.

As we're actively looking for `Morpheus`'s response, we'll assume his message was the last one received. To read the last message in your inbox, type the following command:

```lua
Inbox[4].Data
```

This command allows you to isolate the Data from the message and only read the contents of the data.

The Expected Return:

```lua
-- Your Inbox[x].Data Command
aos> Inbox[4].Data
-- The Return
I am here. You are finally awake. Are you ready to see how far the rabbit hole goes?
aos>
```

You are now actively communicating with `Morpheus` and have received a response. You're ready to move on to the next step in the tutorial.

### Step 6: Sending Messages with Tags

## END OF COMMIT FEB 10TH 2024 (10:36 AM EST)

<!-- #### Understanding Tags in aos Messages

- **Purpose of Tags**: Tags in aos messages are used to categorize, route, and process messages efficiently. They play a crucial role in message handling, especially when dealing with multiple processes or complex workflows.

#### How to Use Tags in Messages

1. **Adding Tags to a Message**:
   - When constructing a message, you can include a `Tags` field, which is key with string value assigned.
   - **Example**:
     ```lua
     Send({
       Data = "Hello, Process 12345!",
       Tags = {
        Action = "Greeting"
      }
     })
     ```
   - This message is tagged with an "Action" of "Greeting" , indicating its purpose and intended recipient.

## Tips for Using Tags

- **Consistent Tagging**: Develop a consistent tagging system for your application to make message handling more predictable.
- **Tag Naming**:

Choose clear and descriptive names for your tags. This makes it easier to understand the purpose and context of messages at a glance.

- **Tag Limitations**: Be mindful of the number of tags you use. While tags are powerful for categorization, overuse or overly complex tagging systems can lead to confusion and inefficiency in message handling.

- **Security with Tags**: Remember that tags are not encrypted or hidden, so avoid using sensitive information as tags.

#### Advanced Usage of Tags

- **Workflow Management**: Tags can be instrumental in managing workflows, especially in systems where messages pass through multiple stages or processes.

## Additional Tips:

- **Message Structure**: Explore other fields like `Epoch`, `From`, and `Nonce` for more complex messaging needs.
- **Debugging**: Use the `Dump` function to print messages for debugging.
- \*\*

Security Considerations\*\*: Be cautious with the content and handling of messages, especially when dealing with sensitive data.

## Conclusion

Sending messages in aos is a fundamental skill that enables inter-process communication, a cornerstone of distributed computing on the aos platform. By following these steps, you can send, receive, and handle messages effectively, allowing you to build more complex and interactive applications in aos. Remember to experiment and explore the full potential of messaging in this versatile environment. -->
