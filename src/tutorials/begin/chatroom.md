# Building a Chatroom in aos

::: info
If you've found yourself wanting to learn how to create a chatroom within `ao`, then that means we understand at least the basic methodology of sending and receiving messages. If not, it's suggested that you review the [Messaging](messaging) tutorial before proceeding.
:::

In this tutorial, we'll be building a chatroom within `ao` using the Lua scripting language. The chatroom will feature two primary functions:

1. **Register**: Allows processes to join the chatroom.
2. **Broadcast**: Sends messages from one process to all registered participants.

Let's begin by setting up the foundation for our chatroom.

## Video Tutorial

<iframe width="680" height="350" src="https://www.youtube.com/embed/oPCx-cfubF0?si=D5yWxmyFMV-4mh2P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Step 1: The Foundation

- Open your preferred code editor, e.g. VS Code.

::: info
You may find it helpful to have the [Recommended Extensions](../../references/editor-setup.md) installed in your code editor to enhance your Lua scripting experience.
:::

- Create a new file named `chatroom.lua`.

![Chatroom Lua File](/chatroom1.png)

## Step 2: Creating The Member List

- In `chatroom.lua`, you'll begin by initializing a list to track participants:

  ```lua
  Members = Members or {}
  ```

  ![Chatroom Lua File - Naming the Member List](/chatroom2.png)

  - Save the `chatroom.lua` file

## Step 3: Load the Chatroom into aos

With `chatroom.lua` saved, you'll now load the chatroom into `aos`.

- If you haven't already, start your `aos` in your terminal inside the directory where chatroom.lua is saved
- In the `aos` CLI, type the following script to incorporate your script into the `aos` process:

  ```lua
  .load chatroom.lua
  ```

  ![Loading the Chatroom into aos](/chatroom3.png)

- Type `Members`, or whatever you named your user list, in `aos`. It should return an empty array `{ }`.

  ![Checking the Members List](/chatroom4.png)

  If you see an empty array, then your script has been successfully loaded into `aos`.

## Step 4: Creating Chatroom Functionalities

### The Registration Handler

The register handler will allow processes to join the chatroom.

1. **Adding a Register Handler:** Modify `chatroom.lua` to include a handler for `Members` to register to the chatroom with the following code:

   ```lua

   -- Modify `chatroom.lua` to include a handler for `Members`
   -- to register to the chatroom with the following code:

     Handlers.add(
       "Register",
       { Action = "Register"},
       function (msg)
         table.insert(Members, msg.From)
         print(msg.From .. " Registered")
         msg.reply({ Data = "Registered." })
       end
     )
   ```

   ![Register Handler](/chatroom5.png)

   This handler will allow processes to register to the chatroom by responding to the tag `Action = "Register"`. A printed message will confirm stating `Registered.` will appear when the registration is successful.

2. **Reload and Test:** Let's reload and test the script by registering ourselves to the chatroom.

   - Save and reload the script in aos using `.load chatroom.lua`.
   - Check to see if the register handler loaded with the following script:

   ```lua
    Handlers.list
   ```

   ![Checking the Handlers List](/chatroom6.png)

   This will return a list of all the handlers in the chatroom. Since this is most likely your first time developing in `aos`, you should only see one handler with the name `Register`.

   - Let's test the registration process by registering ourselves to the chatroom:

   ```lua
   Send({ Target = ao.id, Action = "Register" })
   ```

   If successful, you should see that there was a `message added to your outbox` and that you then see a new printed message that says `registered`.

   ![Registering to the Chatroom](/chatroom7.png)

   - Finally, let's check to see if we were successfully added to the `Members` list:

   ```lua
    Members
   ```

   If successful, you'll now see your process ID in the `Members` list.

   ![Checking the Members List](/chatroom8.png)

### Adding a Broadcast Handler

Now that you have a chatroom, let's create a handler that will allow you to broadcast messages to all members of the chatroom.

- Add the following handler to the `chatroom.lua` file:

  ```lua
    Handlers.add(
      "Broadcast",
      { Action = "Broadcast" },
      function (msg)
        for _, recipient in ipairs(Members) do
          ao.send({Target = recipient, Data = msg.Data})
        end
        msg.reply({Data = "Broadcasted." })
      end
    )
  ```

  This handler will allow you to broadcast messages to all members of the chatroom.

- Save and reload the script in aos using `.load chatroom.lua`.
- Let's test the broadcast handler by sending a message to the chatroom:

  ```lua
  Send({Target = ao.id, Action = "Broadcast", Data = "Broadcasting My 1st Message" }).receive().Data
  ```

::: info
While we use `Send` in the console for convenience, it's recommended to use `ao.send` in handlers - see the [FAQ](../../guides/aos/faq.md#send-vs-aosend) for more details.
:::

## Step 5: Inviting Morpheus to the Chatroom

Now that you've successfully registered yourself to the chatroom, let's invite Morpheus to join us. To do this, we'll send an invite to him that will allow him to register to the chatroom.

Morpheus is an autonomous agent with a handler that will respond to the tag `Action = "Join"`, in which will then have him use your `Register` tag to register to the chatroom.

- Let's send Morpheus an invitation to join the chatroom:
  ```lua
  Send({ Target = Morpheus, Action = "Join" })
  ```
- To confirm that Morpheus has joined the chatroom, check the `Members` list:

  ```lua
  Members
  ```

  If successful, you'll receive a broadcasted message from Morpheus.

## Step 6: Inviting Trinity to the Chatroom

Within this message, he'll give you Trinity's process ID and tell you to invite her to the chatroom.

Use the same processes to save her process ID as `Trinity` and to invite her to the chatroom as you did with Morpheus.

If she successfully joins the chatroom, she'll then pose the next challenge to you, creating a [token](token).

## Engaging Others in the Chatroom

### Onboarding Others

- Invite aos Users:
  Encourage other aos users to join your chatroom. They can register and participate in the broadcast.

- Provide Onboarding Instructions:
  Share a simple script with them for easy onboarding:

```lua
-- Hey, let's chat on aos! Join my chatroom by sending this command in your aos environment:
Send({ Target = [Your Process ID], Action = "Register" })
-- Then, you can broadcast messages using:
Send({Target = [Your Process ID], Action = "Broadcast", Data = "Your Message" })
```

## Next Steps

Congratulations! You've successfully built a chatroom in `ao` and have invited Morpheus to join you. You've also created a broadcast handler to send messages to all members of the chatroom.

Next, you'll continue to engage with Morpheus, but this time you'll be adding Trinity to the conversation. She will lead you through the next set of challenges. Good Luck!
