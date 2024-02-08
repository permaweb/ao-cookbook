# Building a Chatroom in aos

In this tutorial, we'll build a chatroom in aos, leveraging the capabilities of the Lua scripting language. The chatroom will feature three primary functions:

1. **Register**: Allows processes to join the chatroom.
2. **Broadcast**: Sends messages from one process to all registered participants.

We will adopt an iterative development approach, utilizing the `.load` feature of aos for efficient code testing and implementation.

## Setting Up Your Environment

### Step 1: Create Your Lua Script

- Open your preferred code editor.
- Create a new file named `chatroom.lua`.

### Step 2: Initialize Participant List

- In `chatroom.lua`, start by initializing a list to track participants, named `Weavers`:
  ```lua
  Weavers = Weavers or {}
  ```

### Step 3: Load Your Script in aos

- Save `chatroom.lua`.
- In the aos CLI, type `.load chatroom.lua` to incorporate your script into the aos process.
- Verify the initialization by typing `Weavers` in aos. It should return an empty array `[]`.

## Implementing Chatroom Functionalities

### Register Handler

1. **Add Register Handler**:

   - Edit `chatroom.lua` to include a handler for registration:
     ```lua
     Handlers.add(
       "register",
       Handlers.utils.hasMatchingTag("Action", "Register"),
       function (msg)
         table.insert(Weavers, msg.From)
         Handlers.utils.reply("registered")(msg)
       end
     )
     ```
   - This code registers a process and confirms registration.

2. **Reload and Test**:

   - Save and reload the script in aos using `.load chatroom.lua`.
   - Test registration:
     ```lua
     Send({ Target = ao.id, Tags = { Action = "Register" }})
     ```

3. **Verify Registration**:
   - In aos, check `Weavers` to confirm your process is listed.

### Broadcast Handler

1. **Implementing Broadcast**:

   - Add a broadcast function to `chatroom.lua`:

     ```lua
     Handlers.add(
       "broadcast",
       Handlers.utils.hasMatchingTag("Action", "Broadcast"),
       function (msg)
         for _, recipient in ipairs(Weavers) do
           ao.send({Target = recipient, Data = msg.Data})
         end
         Handlers.utils.reply("Broadcasted.")(msg)
       end
     )
     ```

   - This handler distributes a received message to all registered participants.

2. **Reload and Test**:

   - Save changes and reload in aos.
   - Test broadcasting:
     ```lua
     Send({Target = ao.id, Tags = { Action = "Broadcast" }, Data = "Hello World" })
     ```

3. **Check Your Inbox**:

   - Verify the broadcast by checking your inbox in aos:
     ```lua
     Inbox[#Inbox].Data
     ```
   - You should see the "Hello World" message.

## Engaging Others in the Chatroom

### Onboarding Others

1. **Invite aos Users**:

   - Encourage other aos users to join your chatroom. They can register and participate in the broadcast.

2. **Provide Onboarding Instructions**:
   - Share a simple script with them for easy onboarding:
     ```
     Hey, let's chat on aos! Join my chatroom by sending this command in your aos environment:
     Send({ Target = [Your Process ID], Tags = { Action = "Register" }})
     Then, you can broadcast messages using:
     Send({Target = [Your Process ID], Tags = { Action = "Broadcast" }, Data = "Your Message" })
     ```

## Conclusion and Next Steps

You have successfully set up a basic chatroom in aos, with functionalities for registering, broadcasting messages, and inviting others to join. This example demonstrates the power of Lua scripting in aos for creating interactive, networked applications. Feel free to expand upon this foundation, adding features like private messaging, chatroom moderation, or enhanced user authentication for a more robust chat experience.
