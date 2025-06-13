# Introduction to AO-Core

AO-Core is a protocol and standard for distributed computation that forms the foundation of the AO computer. Inspired by and built upon concepts from the Erlang language, AO-Core embraces the actor model for concurrent, distributed systems. Unlike traditional blockchain systems, AO-Core defines a flexible, powerful computation protocol that enables a wide range of applications beyond just running Lua programs.

## What is AO-Core?

AO-Core is the fundamental protocol of the AO computer that:

- Defines standards for trustless computation distributed across the world
- Provides mathematical guarantees about program execution
- Enables composable, modular development through devices
- Supports various execution environments beyond just Lua
- Implements the actor model for concurrent, message-passing computation

## The Actor Model in AO

AO references the actor model of computation where:

- Each actor (or process) is an independent unit of computation
- Actors communicate exclusively through message passing
- Actors can create other actors, send messages, and make local decisions
- The system is inherently concurrent and distributed

This approach, inspired by Erlang, provides natural scalability and resilience in distributed systems.

## Key Features of AO-Core

- **Resilient**: There is no single point of failure. AO-Core exists across many machines distributed worldwide, making it immune to physical destruction or tampering.
- **Permanent**: Computations following the AO-Core protocol are stored permanently on Arweave, allowing you to recall and continue your work at any time.
- **Permissionless**: No registration is required to use AO-Core. Your right to use it is guaranteed by the underlying protocol.
- **Trustless**: The state of your computations is mathematically guaranteed, allowing you to build services that don't require trust in any central authority.

## Beyond Just Processes

While AO Processes (smart contracts built using the AO-Core protocol) are powerful for creating autonomous agents, AO-Core itself enables much more:

- Serverless functions with trustworthy guarantees
- Hybrid applications combining smart contract and serverless functionality
- Custom execution environments through different devices
- Composable systems using the path language

## Next Steps

In the following sections, we'll explore how AO Processes build on top of the AO-Core protocol, and how you can get started building your own applications in this powerful environment.
