# How ao messaging works

Before we dive in to ao, I want to share with you a little information about unix. Unix is a powerful operating system, but in its design it is focused on two Principal "Types". Files and Programs. A File is data and a Program is logic, when you combine the two you get information.

`Input.file | TransformProgram | Output.file`

You might have done something like this on the command line without knowing what you were doing. Being able to connect files to programs and return files which can then be passed to other programs creates a complex system composed of simple applications. This is a very powerful idea.

Now, lets talk about `ao` the hyper parallel computer, and lets change the idea of a File to the `ao` concept of a Message and the idea of a Program to the `ao` concept of a Process. The `ao` computer takes messages and sends them to Processes in which those Processes can output messages that can be sent to other Processes. The result is a complex system built on simple modular logic containers.

`MessageA | Process | MessageB`

![ao-messages](https://g8way.io/eAoqMqhwQ5vnpH_NJ6H2PiGgrcGDprtDIUH9Re2xcic)

Here is a description of the process as outlined in the flowchart:

1. A message is initiated from an ao Connect. This message is sent to the `mu` service using a POST request. The body of the request contains data following a protocol, labeled 'ao', and is of the type 'Message'.

2. The `mu` service processes the POST request and forwards the message to the `su` service. This is also done using a POST request with the same data protocol and message type.

3. The `su` service stores the assignment and message on Arweave.

4. A GET request is made to the `cu` service to retrieve results based on a message ID. The `cu` is a service that evaluates messages on processes and can return results based on an individual message identifier.

5. A GET request is made to the `su` service to retrieve the assignment and message. This request is looking for messages from a process ID, within a range of time from a start (from the last evaluation point) to (to the current message ID).

6. The final step is to push any outbox Messages. It involves reviewing the messages and spawns in the Result object. Based on the outcome of this check, the steps 2, 3, and 4 may be repeated for each relevant message or spawn.
