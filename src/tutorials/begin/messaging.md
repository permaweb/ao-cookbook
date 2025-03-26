<script setup>
  import {onMounted} from "vue"
  import {renderRepl} from "../../tools/replRenderer.jsx"

  const codes = {
    "step-3": `Send({ Target = "process ID", Data = "Hello World!" })`,
    "step-4": `Morpheus = "Fvan28CFY0JYl5f_ETB7d3PDwBhGS8Yq5IA0vcWulUc"`,
    "step-4-1": `Morpheus`,
    "step-5": `Send({ Target = Morpheus, Data = "Morpheus?" })`,
    "step-6": `#Inbox`,
    "step-6-1": `Inbox[#Inbox].Data`,
    "step-7": `Send({ Target = Morpheus, Data = "Code: rabbithole", Action = "Unlock" })`,
    "step-7-2": `Inbox[#Inbox].Data`
  }

  onMounted(() => {
      Object.keys(codes).forEach((key) => {
        renderRepl(key, codes[key])
      })
    }
  )
</script>

# Messaging in `ao`

## Learn how Messages gives `ao` Parallel Compute Capability

In `ao`, every process runs in parallel, creating a highly scalable environment. Traditional direct function calls between processes aren't feasible because each process operates independently and asynchronously.

Messaging addresses this by enabling asynchronous communication. Processes send and receive messages rather than directly invoking functions on each other. This method allows for flexible and efficient interaction, where processes can respond to messages, enhancing the system's scalability and responsiveness.

We'll begin by exploring the basics of messaging in `aos`, how to see messages received in your inbox, and how to send messages to other processes.

## Video Tutorial

<iframe width="680" height="350" src="https://www.youtube.com/embed/6aCjKK6F1yQ?si=3Ny7U-GgyNsRWlXS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Step 1: Understand the Message Structure

- **Message Basics:** Messages in `ao` are built using Lua tables, which are versatile data structures that can hold multiple values. Within these tables, the "Data" field is crucial as it contains the message's content or payload. This structure allows for efficient sending and receiving of information between processes, showcasing how `ao` primitives leverage Arweave's underlying capabilities to facilitate complex, composable operations.

  For detailed specifications, please refer to the original documentation on the [G8way specs page](https://specs.g8way.io/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw).

- **Example**: `{ Data = "Hello from Process A!" }` is a simple message.

## Step 2: Open the aos CLI

- Launch the aos command-line interface (CLI) by typing `aos` in your terminal and pressing Enter.

```sh
aos
```

## Step 3: How to Send a Message

```lua
Send({ Target = "process ID", Data = "Hello World!" })
```

<div id="step-3"></div>

- **Send**: The `Send` function is globally available in the aos interactive environment.
- **Target**: To send a message to a specific process, include a `Target` field in your message.
- **Data**: The `Data` is the string message (or payload) you want to be received by the receiving process. In this example, the message is "Hello World!".

## Step 4: Store `Morpheus`'s Process ID

We'll use the process ID provided below and store it as a variable called Morpheus.

```lua
Fvan28CFY0JYl5f_ETB7d3PDwBhGS8Yq5IA0vcWulUc
```

Copy the process ID above and store it as a variable by running the below command in the aos CLI:

```lua
Morpheus = "Fvan28CFY0JYl5f_ETB7d3PDwBhGS8Yq5IA0vcWulUc"
```

<div id="step-4"></div>

This will store the process ID as a variable called `Morpheus`, making it easier to interact with the specific process ID.

### Check the `Morpheus` Variable

```lua
-- Check the Morpheus variable by typing `Morpheus`
 Morpheus
-- Expected Results:
Fvan28CFY0JYl5f_ETB7d3PDwBhGS8Yq5IA0vcWulUc


-- If `undefined` is returned,
-- then the variable was not created successfully.
```

<div id="step-4-1"></div>

## Step 5: Send a Message to Morpheus

After obtaining Morpheus's process ID and storing it in a variable, you're ready to communicate with it. To do this, you use the Send function. Morpheus, himself, is a parallel process running in ao. He receives and sends messages using a series of Handlers. Let's send him a message and see what happens.

```lua
Send({ Target = Morpheus, Data = "Morpheus?" })
```

<div id="step-5"></div>

- Your `Target` is `Morpheus` which is the variable we defined earlier using `Morpheus`'s process ID.
- The `Data` is the message you want to send to Morpheus. In this case, it's "Morpheus?".

**Expected Results:**

```lua
-- Your Message Command
 Send({ Target = Morpheus, Data = "Morpheus?"})
-- Message is added to the outbox
message added to outbox
-- A New Message is received from `Morpheus`'s process ID
New Message From BWM...ulw: Data = I am here. You are f

```

You've sent a message to Morpheus and received a response, but you can't read the full message. Let's learn about the `Inbox` and how to read messages.

## Step 6: The Inbox

The `Inbox` is where you receive messages from other processes.
::: info
To see an in depth view of an inbox message, head over to the [Messages](../../concepts/messages) Concepts page.
:::

Let's check your inbox to see how many messages you have received.

Inside your aos CLI, type the following command:

```lua
 #Inbox
```

<div id="step-6"></div>

If you're actively following through the tutorial, the inbox will not have many messages. However, if you've been experimenting with the aos environment, you may more than 1 message in your inbox.

**Example Return:**

```lua
-- Your Inbox Command
 #Inbox
-- The command will return the number of messages in your inbox.
4

```

In the example above, the return is `4`, stating that there are four messages in the inbox.

As we're actively looking for `Morpheus`'s response, we'll assume his message was the last one received. To read the last message in your inbox, type the following command:

```lua
 Inbox[#Inbox].Data
```

<div id="step-6-1"></div>

This command allows you to isolate the Data from the message and only read the contents of the data.

The Expected Return:

```lua
-- Your Inbox[x].Data Command
 Inbox[#Inbox].Data
-- The command will return the `Data` of the message.
-- Data is what usually represents the text-based message
-- received from one process to another.
I am here. You are finally awake. Are you ready to see how far the rabbit hole goes?

```

You are now using your own process to communicate with Morpheus, another parallel process running in ao. You're now ready to move on to the next step in the tutorial.

## Step 7: Sending Messages with Tags

**Purpose of Tags**: Tags in aos messages are used to categorize, route, and process messages efficiently. They play a crucial role in message handling, especially when dealing with multiple processes or complex workflows.

Some processes use `Handlers` that specifically interact with messages that have certain tags. For example, a process may have a handler that only interacts with messages that have a specific tag, which we'll see an example of in the [chatroom](chatroom) tutorial.

### How to Use Tags in Messages

In the case of Morpheus, we can use tags to categorize our messages, and because Morpheus is a autonomous process, he has handlers that can interact with messages that have certain tags.

**Adding Tags to a Message**:

- We already know that the `Data` of a message is the payload of the message you want to send to another process. Earlier, we sent a message to Morpheus without any tags, in which he used a handler to respond to an exact match within the `Data` field.

### Let's Show Morpheus That We're Ready

Send Morpheus a message with the tag `Action` and the value `rabbithole`.

**Example:**

```lua
Send({ Target = Morpheus, Data = "Code: rabbithole", Action = "Unlock" })
```

<div id="step-7"></div>

**Read the message from Morpheus:**

```lua
Inbox[#Inbox].Data
```

<div id="step-7-2"></div>

**Expected Return:**
![Morpheus Responds 2](/messaging2.png)

## Additional Tips for Using Tags

- **Consistent Tagging**: Develop a consistent tagging system for your application to make message handling more predictable.
- **Tag Naming**: Choose clear and descriptive names for your tags. This makes it easier to understand the purpose and context of messages at a glance.
- **Security with Tags**: Remember that tags are not encrypted or hidden, so avoid using sensitive information as tags.

## Advanced Usage of Tags

- **Workflow Management**: Tags can be instrumental in managing workflows, especially in systems where messages pass through multiple stages or processes.

## Additional Tips for Messaging

- **Message Structure**: Explore other fields like `Epoch`, `From`, and `Nonce` for more complex messaging needs.
- **Debugging**: Use the [`Dump`](/concepts/tour.html#_6-data-representation-with-dump) function to print messages for debugging.
- **Security Considerations**: Be cautious with the content and handling of messages, and never send anything considered private or sensitive.

## Conclusion

You've now learned how to send messages with tags, which is a powerful tool for categorizing and routing messages in aos.

Morpheus has officially invited you to the next stage of your journey. You're now ready to move on to the next step in the tutorial, [Creating a Chatroom](chatroom).
