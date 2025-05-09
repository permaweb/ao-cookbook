---
prev:
  text: "Welcome"
  link: "../index"
next:
  text: "Begin"
  link: "/tutorials/begin/index"
---

# Get involved with the ao legacynet

On February 27, 2024, `ao` legacynet was launched, for developers and early adopters to explore the hyper parallel computer.

## What is the ao legacynet?

The `ao` legacynet is setup to allow users to interact with the `ao` computer without fees, to test and build towards mainnet.

The best way to get involved is to build and use the `ao` computer with the `aos` console.
In the `Things to do` section below you will find many activities to try.

## Installing the aos client

Once you have [NodeJS](https://nodejs.org) on your machine, all you need to do is install `aos` and run it:

```sh
$ npm i -g https://get_ao.arweave.net
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
