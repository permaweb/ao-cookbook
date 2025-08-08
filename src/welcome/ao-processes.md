# AO Processes

AO Processes are persistent, programmable smart contracts that live inside the AO computer. Embodying the actor model from Erlang that inspired AO, these processes operate as independent computational units that have their own state and communicate with each other through message passing. This architecture makes them ideal for creating autonomous agents and complex decentralized applications.

## What are AO Processes?

Following the actor model, each AO Process functions as an independent actor within the system, executing code—typically written in Lua—in response to messages it receives. Three core characteristics define them:

- **Stateful**: Each process has its own private state and memory, which persist across interactions.
- **Persistent**: All processes and their entire message history are permanently stored on Arweave.
- **Generative**: Processes can dynamically spawn new processes, enabling complex and evolving systems.

## AO Processes and the Actor Model

The actor model provides several key benefits for process-based development, enabling naturally concurrent and resilient systems. By treating every process as an isolated "actor," it simplifies development and enhances fault tolerance. Key advantages include:

- **Concurrency & Isolation**: Processes execute independently and are isolated from each other, enabling parallelism and preventing cascading failures.
- **Message-Passing**: All communication happens exclusively through asynchronous messages, simplifying interactions.
- **Location Transparency & Fault Tolerance**: Processes can interact without knowing each other's physical location on the network, and the system can continue operating even if individual processes fail.

## AOS: The Operating System for AO Processes

AOS (AO Operating System) is an abstraction layer designed to simplify interaction with AO Processes. It provides developers with a powerful shell interface for sending commands, tools for managing process state, and a set of libraries for common functionalities, all contributing to a more streamlined development experience.

## Use Cases for AO Processes

The persistent and concurrent nature of AO Processes makes them ideal for a wide range of decentralized applications. Here are a few examples:

- **Autonomous Agents & Bots**: Imagine a price-monitoring bot that tracks token prices across different decentralized exchanges (DEXs) and executes arbitrage trades automatically. AO makes it possible to build entire marketplaces for such agents, like [Marketverse](https://marketverse.arweave.net/).

- **Decentralized Finance (DeFi)**: You could build automated market makers (AMMs) or lending protocols where account balances and token reserves are tracked persistently within the process's state. A live example of this is [Dexi](https://dexi.arweave.net), a decentralized exchange built on AO.

- **On-Chain Games & Social Platforms**: AO Processes can power fully on-chain games where the game state (like player positions or inventory) is managed by one or more processes, like the space strategy game [Stargrid](https://stargrid.arweave.net/). They're also perfect for decentralized chat applications or social networks where user profiles, posts, and interactions are censorship-resistant.

## Next Steps

Now that you understand the capabilities of AO Processes, the next step is to dive into [Hyperbeam](../guides/migrating-to-hyperbeam/why-migrate.md), the high-performance network that powers them.
