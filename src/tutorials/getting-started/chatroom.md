# Building a Chatroom in aos

::: info
If you've found yourself wanting to learn how to create a chatroom within `ao`, then that means we understand at least the basic methodology of sending and receiving messages. If not, it's suggested that you review the [Messaging](messaging) tutorial before proceeding.
:::

In this tutorial, we'll be building a chatroom within `ao` using the Lua scripting language. The chatroom will feature two primary functions:

1. **Register**: Allows processes to join the chatroom.
2. **Broadcast**: Sends messages from one process to all registered participants.

Let's begin by setting up the foundation for our chatroom.

## Preparations

### **Step 1: The Foundation**

- Open your preferred code editor.

::: info
You may find it helpful to have the [Recommended Extensions](../../references/editor-setup.md) installed in your code editor to enhance your Lua scripting experience.
:::

- Create a new file named `chatroom.lua`.

![Chatroom Lua File](/chatroom1.png)

**Step 2: Creating The Member List**

- In `chatroom.lua`, you'll begin by initializing a list to track participants:

  ```lua
  Weavers = Weavers or {}
  ```

  _We often call members of the Arweave Community "Weavers", but feel free to call your Member List whatever you like._

  ![Chatroom Lua File - Naming the Member List](/chatroom2.png)

  - Save the `chatroom.lua` file

**Step 3: Load the Chatroom into aos**

With `chatroom.lua` saved, you'll now load the chatroom into `aos`.

- If you haven't already, start your `aos` in your terminal.
- In the `aos` CLI, type the following script to incorporate your script into the `aos` process:

  ```lua
  .load chatroom.lua
  ```

  ![Loading the Chatroom into aos](/chatroom3.png)

  As the screenshot above shows, you may receive `undefined` as a response. This is expected, but we still want to make sure the file loaded correctly.

- Type `Weavers`, or whatever you named your user list, in `aos`. It should return an empty array `{ }`.

  ![Checking the Weavers List](/chatroom4.png)

  If you see an empty array, then your script has been successfully loaded into `aos`.

### Creating Chatroom Functionalities

#### The Registration Handler

The register handler will allow processes to join the chatroom.

**Adding a Register Handler**

1. **Modify `chatroom.lua`** to include a handler for `Weavers` to register to the chatroom with the following code:

   ````lua

   - Modify `chatroom.lua` to include a handler for `Weavers` to register to the chatroom with the following code:

     ```lua
     Handlers.add(
       "register",
       Handlers.utils.hasMatchingTag("Action", "Register"),
       function (msg)
         table.insert(Weavers, msg.From)
         Handlers.utils.reply("registered")(msg)
       end
     )
   ````

   ![Register Handler](/chatroom5.png)

   - This handler registers a process and confirms registration.

2. **Reload and Test:**:
   Let's reload and test the script by registering ourselves to the chatroom.

   - Save and reload the script in aos using `.load chatroom.lua.
   - Check to see if the register handler loaded with the following script:

   ```lua
    Handlers.list
   ```

   ![Checking the Handlers List](/chatroom6.png)

   This will return a list of all the handlers in the chatroom. Since this is most likely your first time developing in `aos`, you should only see one handler with the name `register`.

   - Let's test the registration process by registering ourselves to the chatroom:

   ```lua
    Send({ Target = ao.id, Tags = { Action = "Register" }})
   ```

   If successful, you should see that there was a `message added to your outbox` and that you then see a new printed message that says `registered`.

   ![Registering to the Chatroom](/chatroom7.png)

   - Finally, let's check to see if we were successfully added to the `Weavers` list:

   ```lua
    Weavers
   ```

   If successful, you'll now see your process ID in the `Weavers` list.

   ![Checking the Weavers List](/chatroom8.png)

## Inviting Morpheus to the Chatroom

Now that you've successfully registered yourself to the chatroom, let's invite Morpheus to join us. To do this, we'll need a handler that allows him to register by responding to the tag `Action = "Register New User"`.

- Type into aos `.editor` to open the editor directly in aos.
- Add the following handler to the `chatroom.lua` file:
  ```lua
  Handlers.add(
      "Register New User",
      Handlers.utils.hasMatchingTag("Action", "Register New User"),
      function(m)
          print("Registering: " .. m.From)
          table.insert(Weavers, { Address = m.From })
          ao.send({
              Target = m.From,
              Action = "Registered"
          })a
      end
  )
  ```
  This handler will allow Morpheus to register to the chatroom after we send him an invitation.
- Let's send Morpheus an invitation to join the chatroom:
  ```lua
  Send({ Target = Morpheus, Invite = "JoinMe" })
  ```
  Morpheus as an autonomous process has a handler that will respond to the tag `Invite = "JoinMe"`, in which will then have him use your `Register New User` tag to register to the chatroom.
- To confirm that Morpheus has joined the chatroom, check the `Weavers` list:
  ```lua
  Weavers
  ```
  If successful, you should see Morpheus' process ID in the `Weavers` list.

## Broadcasting Messages

Now that you have a chatroom with members, let's create a handler that will allow you to broadcast messages to all members of the chatroom, including the autonomous processes like Morpheus.

- Add the following handler to the `chatroom.lua` file:

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

  This handler will allow you to broadcast messages to all members of the chatroom.

- Let's test the broadcast handler by sending a message to the chatroom:

  ```lua
    Send({Target = ao.id, Tags = { Action = "Broadcast" }, Data = "Broadcasting My 1st Message" })
  ```

  - If successful, you should see that there was a `message added to your outbox` and that you then see a new printed message that says `Broadcasting My 1st Message` because you are also a recipient of this message since you're a member of the `Weavers` chatroom.

## Engaging Others in the Chatroom

### Onboarding Others

- Invite aos Users:
  Encourage other aos users to join your chatroom. They can register and participate in the broadcast.

- Provide Onboarding Instructions:

  Share a simple script with them for easy onboarding:

```
Hey, let's chat on aos! Join my chatroom by sending this command in your aos environment:
Send({ Target = [Your Process ID], Tags = { Action = "Register" }})
Then, you can broadcast messages using:
Send({Target = [Your Process ID], Tags = { Action = "Broadcast" }, Data = "Your Message" })
```

## Next Steps

Congratulations! You've successfully built a chatroom in `ao` and have invited Morpheus to join you. You've also created a broadcast handler to send messages to all members of the chatroom.

Next, you'll continue to engage with Morpheus, but this time you'll be adding Trinity to the conversation. She will lead you through the next set of challenges. Good Luck!
