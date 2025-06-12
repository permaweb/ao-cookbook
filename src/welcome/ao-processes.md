# AO Processes

AO (Actor Oriented) Processes are smart contracts built using the AO-Core protocol, providing a structured way of creating autonomous agents and other decentralized applications. Embodying the actor model from Erlang that inspired AO, these processes operate as independent computational units that communicate through message passing. While AO-Core defines the fundamental protocol, AO Processes offer a more accessible approach to building on the AO computer.

## What are AO Processes?

AO Processes are independent, persistent smart contracts that live inside the AO computer. Following the actor model, each process:

- Functions as an independent actor in the system
- Has its own state and memory
- Can receive and send messages to other processes
- Executes code (typically in Lua) in response to messages
- Persists permanently on Arweave
- Can create other processes (actors)

## AO Processes and the Actor Model

The actor model that inspired AO provides several key benefits for process-based development:

- **Concurrency**: Each process executes independently, enabling natural parallelism
- **Isolation**: Processes are isolated from each other, preventing cascading failures
- **Message-Passing**: Communication happens exclusively through messages, simplifying interactions
- **Location Transparency**: Processes can interact regardless of where they're physically located
- **Fault Tolerance**: The system can continue operating even if individual processes fail

## How AO Processes Differ from AO-Core

While AO-Core provides the fundamental protocol and standards, AO Processes offer a higher-level abstraction:

| AO Processes                          | AO-Core                                  |
| ------------------------------------- | ---------------------------------------- |
| Smart contracts built on the protocol | The protocol/standard itself             |
| Focus on Lua programming              | Supports multiple execution environments |
| Process-oriented with state           | More flexible computation model          |
| Simplified message passing            | Lower-level message handling             |
| Built for smart contracts and agents  | Enables broader range of applications    |
| Accessed primarily through AOS        | Can be accessed through paths and URLs   |

## AOS: The Operating System for AO Processes

AOS (AO Operating System) is an abstraction layer that makes it easy to interact with AO Processes. It provides:

- A shell interface for sending commands
- Tools for managing process state
- Libraries for common functionality
- A simplified development experience

## Use Cases for AO Processes

AO Processes are ideal for building:

- Smart contracts with persistent state
- Autonomous agents that can interact with other processes
- Decentralized applications requiring persistent storage
- Multi-user systems like chatrooms or games
- Concurrent, distributed systems that benefit from the actor model

## When to Use AO Processes vs. Direct AO-Core

Choose AO Processes when:

- You need persistent state across interactions
- You're building traditional smart contract applications
- You want a simplified development experience with AOS
- Your application benefits from the actor model approach

Consider direct AO-Core when:

- You need serverless function-like behavior
- You're building hybrid applications
- You require custom execution environments
- You want to leverage the full power of the path language

## Next Steps

In the next section, we'll walk you through getting started with AO Processes using AOS, allowing you to take your first steps into the AO computer.
