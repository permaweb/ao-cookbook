---
prev:
  text: "Welcome"
  link: "../index"
next:
  text: "Begin"
  link: "/tutorials/begin/index"
---

# Legacynet → HyperBEAM

As the AO ecosystem evolves, we are transitioning from Legacynet to HyperBEAM Mainnet, marking a significant upgrade in the implementation of the AO-Core protocol.

## Legacynet: The Initial Implementation

Legacynet was the first implementation of the AO-Core protocol, written in JavaScript. Launched on February 27, 2024, it provided a fee-free environment for early adopters to experiment with AO's hyper-parallel architecture. However, being a JavaScript implementation, Legacynet had inherent limitations in terms of scalability and native support for the actor-oriented model that AO is based on.

## HyperBEAM: The Future of AO-Core

HyperBEAM is the new, advanced implementation of the AO-Core protocol, written in Erlang—the language that inspired AO's actor-oriented design. This implementation innately benefits from Erlang's strengths in:

- **Actor-Oriented Design**: Erlang's native support for the actor model aligns perfectly with AO's architecture, where processes (actors) operate independently and communicate via message passing.
- **Scalability**: Erlang is renowned for its ability to handle massive concurrency, allowing HyperBEAM to scale efficiently with the growing demands of the AO computer.
- **Reliability**: Erlang's design for fault tolerance ensures that HyperBEAM can maintain system stability even under high load or during failures of individual components.

## Transition and Deprecation

Legacynet is currently being scaled down and will eventually be deprecated in favor of HyperBEAM. This transition represents a move towards a more robust, scalable, and true-to-design implementation of AO-Core. Users are encouraged to migrate their processes and familiarize themselves with HyperBEAM Mainnet.

## HyperBEAM Documentation

For detailed documentation on HyperBEAM, including how to build on it and run nodes, visit [HyperBEAM.arweave.net](https://hyperbeam.arweave.net).

## Next Steps for Legacynet Users

If you have been using Legacynet, we recommend:

- Reviewing the HyperBEAM documentation to understand the new environment.
- Planning the migration of your existing processes to HyperBEAM Mainnet.
- Exploring the enhanced capabilities that HyperBEAM offers due to its Erlang foundation.

This transition is a significant step forward for the AO ecosystem, ensuring that we can deliver on the promise of decentralized, hyper-parallel computation at any scale.

## Get involved with the ao legacynet

On February 27, 2024, `ao` legacynet was launched, for developers and early adopters to explore the hyper parallel computer.

## What is the ao legacynet?

The `ao` legacynet is setup to allow users to interact with the `ao` computer without fees, to test and build towards mainnet.

The best way to get involved is to build and use the `ao` computer with the `aos` console.
In the `Things to do` section below you will find many activities to try.

## Installing the aos client

Once you have [NodeJS](https://nodejs.org) on your machine, all you need to do is install `aos` and run it:

```sh
$ npm i -g https://get_ao.g8way.io
```

Running this command at a later date will upgrade `aos` to the latest version.
After installation, we can simply run the command itself to start a new `aos` process:

```sh
$ aos
```

This will start a process named `default`. See [the aos guide](/guides/aos/index) for more details.

## First steps in the ao legacynet

Follow the tutorials and learn to build on `ao`. [Begin](/tutorials/begin/index)

## Joining ao's native community chat

The ao network hosts a number of chat servers that allow you to converse with other devs,
right from your `aos` console. To load the chat client run the following:

```lua
aos> .load-blueprint chat
```

To show the available rooms you can run:

```lua
aos> List()
```

You can join a room and start chatting with other devs as follows:

```lua
aos> Join("Getting-Started", "yourName")
aos> Say("Hi")
```
