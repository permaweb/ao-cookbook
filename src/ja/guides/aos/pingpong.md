<script setup>
  import {onMounted} from "vue"
  import {renderRepl} from "../../tools/replRenderer.jsx"

  const codes = {
    "step-3": `Handlers.add(
      "pingpong",
      Handlers.utils.hasMatchingData("ping"),
      Handlers.utils.reply("pong")
      )`,
    "step-5": `Send({ Target = ao.id, Data = "ping" })`,
    "step-6": `Inbox[#Inbox].Data`
  }

  onMounted(() => {
      Object.keys(codes).forEach((key) => {
        renderRepl(key, codes[key])
      })
    }
  )
</script>

# Creating a Pingpong Process in aos

This tutorial will guide you through creating a simple "ping-pong" process in aos. In this process, whenever it receives a message with the data "ping", it will automatically reply with "pong". This is a basic example of message handling and interaction between processes in aos.

## Step 1: Open the `aos` CLI

- Start by opening your command-line interface and typing `aos` to enter the aos environment.

## Step 2: Access the Editor

- Type `.editor` in the aos CLI to open the inline text editor. This is where you'll write your ping-pong handler code.

## Step 3: Write the Pingpong Handler

- In the editor, enter the following Lua code to add a handler for the pingpong pattern:

  ```lua
  Handlers.add(
    "pingpong",
    Handlers.utils.hasMatchingData("ping"),
    Handlers.utils.reply("pong")
  )
  ```

  <div id="step-3"></div>

- This lua script does three things:
  1. It adds a new handler named "pingpong".
  2. It uses `Handlers.utils.hasMatchingData("ping")` to check if incoming messages contain the data "ping".
  3. If the message contains "ping", `Handlers.utils.reply("pong")` automatically sends back a message with the data "pong".

## Step 4: Exit the Editor

- After writing your code, type `.done` and press Enter to exit the editor and run the script.

## Step 5: Test the Pingpong Process

- To test the process, send a message with the data "ping" to the process. You can do this by typing the following command in the aos CLI:

  ```lua
  Send({ Target = ao.id, Data = "ping" })
  ```

  <div id="step-5"></div>

- The process should respond with a message containing "pong" in the `Inbox`.

## Step 6: Monitor the Inbox

- Check your Inbox to see the "ping" message and your Outbox to confirm the "pong" reply.

```lua
Inbox[#Inbox].Data
```

<div id="step-6"></div>

## Step 7: Experiment and Observe

- Experiment by sending different messages and observe how only the "ping" messages trigger the "pong" response.

## Step 8: Save Your Process (Optional)

- If you want to use this process in the future, save the handler code in a Lua file for easy loading

into aos sessions.

::: info

**ADDITIONAL TIP:**

- **Handler Efficiency**: The simplicity of the handler function is key. Ensure that it's efficient and only triggers under the correct conditions.

:::

## Conclusion

Congratulations! You have now created a basic ping-pong process in aos. This tutorial provides a foundation for understanding message handling and process interaction within the aos environment. As you become more comfortable with these concepts, you can expand to more complex processes and interactions, exploring the full potential of aos.
