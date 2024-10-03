# aos Brief Tour

Welcome to a quick tour of aos! This tutorial will walk you through the key global functions and variables available in the aos environment, giving you a foundational understanding of how to interact with and utilize aos effectively.

## 1. Introduction to Inbox

- **What It Is**: `Inbox` is a Lua table that stores all messages received by your process but not yet handled.
- **How to Use**: Check `Inbox` to see incoming messages. Iterate through `Inbox[x]` to process these messages.

## 2. Sending Messages with Send(Message)

- **Functionality**: `Send(Message)` is a global function to send messages to other processes.
- **Usage Example**: `Send({Target = "...", Data = "Hello, Process!"})` sends a message with the data "Hello, Process!" to a specified process.

## 3. Creating Processes with Spawn(Module, Message)

- **Purpose**: Use `Spawn(Module, Message)` to create new processes.
- **Example**: `Spawn("MyModule", {Data = "Start"})` starts a new process using "MyModule" with the provided message.

## 4. Understanding Name and Owner

- **Name**: A string set during initialization, representing the process's name.
- **Owner**: Indicates the owner of the process. Changing this might restrict your ability to interact with your process.
- **Important Note**: Treat these as read-only to avoid issues.

## 5. Utilizing Handlers

- **What They Are**: `Handlers` is a table of helper functions for creating message handlers.
- **Usage**: Define handlers in `Handlers` to specify actions for different incoming messages based on pattern matching.

## 6. Data Representation with Dump

- **Function**: `Dump` converts any Lua table into a print-friendly format.
- **How to Use**: Useful for debugging or viewing complex table structures. Example: `Dump(Inbox)` prints the contents of `Inbox`.

## 7. Leveraging Utils Module

- **Contents**: Utils contains a collection of functional utilities like`map`, `reduce`, and `filter`.

- **Usage**: Great for data manipulation and functional programming patterns in Lua. For example, `Utils.map(myTable, function(x) return x * 2 end)` to double the values in a table.

## 8. Exploring the ao Core Library

- **Description**: `ao` is a core module that includes key functions for message handling and process management.
- **Key Features**: Includes functions for sending messages (`send`) and spawning processes (`spawn`), along with environment variables.

## Conclusion

This brief tour introduces you to the primary globals and functionalities within the aos environment. With these tools at your disposal, you can create and manage processes, handle messages, and utilize Lua's capabilities to build efficient and responsive applications on the aos platform. Experiment with these features to get a deeper understanding and to see how they can be integrated into your specific use cases. Happy coding in aos!
