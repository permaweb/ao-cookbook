# Processes

## What is an `ao` Process?

`ao` stands for "Actor Oriented" -- an `ao` Process is the qunitessential Actor on the `ao` Network.

An `ao` Process is the most fundamental unit of computation and concurrency on the `ao` network. Each `ao` Process has it's own state, and can perform actions in response to the messages that it receives from other Processes, as well as send its own messages to other Processes. In this way, `ao` Processes may project their state and interact with one another, without ever shaving to share their _internal_ state, or even be running on the same machine, or even _at the same time_.

In other words, `ao` Processess operate _asynchronously_, meaning they don't wait for each other to complete their tasks. This inherent concurrency makes the `ao` Processes suitable for developing systems that require concurrent and distributed processing, all running on the `ao` network.

An `ao` Process is executed on an [`ao` Compute Unit](/), which allocates memory and CPU necessary to run the Process and evaluate messages it has received on the `ao` network.

> TODO: need link to `ao` Compute Units page

### Key characteristics of `ao` Processes:

**Isolation**: Each Process operates independently with its own state, and the internal state is not directly accessible by other Processes. Communication is achieved solely through message passing.

**Concurrency**: Processes can execute operations concurrently without waiting for each other. This enables efficient use of resources and supports parallel processing.

**Location Transparency**: Processes can be distributed across different nodes in the `ao` network, anstracting away the physical location of other Processes. This supports the development of distributed systems.

**Asynchronous Communication**: Processes communicate by sending and receiving asynchronous messages. This allows for responsive and non-blocking interactions between Processes.

## Modeling your Program using `ao` Processes

When writing a program to run on `ao`, you will need to implement it using `ao` Processes. You may choose to implement your program as a single `ao` Process or multiple `ao` Processes. What works best will depend on your design goals, and the characteristics of your use-cases.

Here are some factors to consider, when modeling your program in `ao`:

**Scalability**: If the workload handled by a single Process becomes too large and starts to impact performance, you might consider splitting it into multiple Processes. This allows you to distribute the workload across multiple instances, improving scalability.

**Concurrency**: If the Processes' tasks can be divided into independent subtasks that can be performed concurrently, it may make sense to split the Process. This can lead to better resource utilization and increased overall throughput.

**Separation of Concerns**: If a Process is taking on multiple responsibilities or tasks that can be logically separated, it might be beneficial to create separate Processes for each responsibility. This can lead to a more modular and maintainable system.

**Resource Utilization**: If a Process is utilizing too much resources when running on an [`ao` Compute Unit](/), splitting it into multiple Processes can allow other Processes to continue evaluating while one is waiting. This helps ensure maximum [`ao` Compute Unit](/) network utilization.

**Isolation of Concerns**: If different parts of a Processes' state or behavior have distinct concerns, separating them into different Processes can help in maintaining a clear and understandable design. Each Process can then focus on a specific aspect of the overall functionality.
