# ao Units

A unit is an ao service that focus on a specific task as part of the network/computer. For example, is a PC, you have a CPU, BUS, GPU, etc. These are specific units in your computer that work together to create the whole computer. In ao we have the `Messager Unit` or `MU`, and the `Scheduler Unit` or `SU`, and the `Compute Unit` or the `CU`. These units are the building blocks of the ao Computer Grid. There can be 1 or more of these units on the network and they work together to power the ao Operating System or `aos`.

- Messager Unit - This unit is the front door to ao, it receives all the messages from the outside and as well as directs traffic flow for Processes. This traffic flow we call `cranking`. Each process can return an Outbox when it evaluates a Message, and this Outbox can be filled with Messages or requests to Spawn new processes, and the Messenger Unit is responsible for extracting these Messages from the Outbox and signing them and sending them to the Scheduler Units for processing.

- Scheduler Unit - The Scheduler unit is responsible for ordering the messages, and storing those messages on Arweave. It is important that every message is appropriately ordered so that the evaluation can be replayed and verified. The Scheduler Unit is responsible for this process. It provides the abilty to query it via an endpoint to get the order of messages for evaluation.

- Compute Unit - The Compute unit is responsible for compute, this unit loads the binary module and manages the memory of that module, so that the execution of the process is alway running on the most up to date memory. The compute unit provides the results of the evaluation back to the the messenger unit, which can then crank any messages in the outbox of the given process.
