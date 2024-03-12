---
prev:
  text: "Welcome"
  link: "../index"
next:
  text: "CRED and Quests"
  link: "/welcome/testnet-info/cred-and-quests"
---

# Get involved with the ao testnet

On February 27, 2024, `ao` Testnet was launched, for developers and early adopters to explore the hyper parallel computer.

## What is the ao testnet?

The `ao` testnet is setup to allow users to interact with the `ao` computer without fees, to test and build towards mainnet.

The best way to get involved is to build and use the `ao` computer with the `aos` console.
In the `Things to do` section below you will find many activities to try, each helping you earn CRED tokens (the testnet's currency) as you go.

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

## First steps in the ao testnet

Follow the tutorials and [complete quests to earn CRED](/welcome/testnet-info/cred-and-quests), the `ao` testnet native currency.

## Joining ao's native community chat

The ao network hosts a number of chat servers that allow you to converse with other devs,
right from your `aos` console. To load the chat client run the following:

```sh
aos> .load-blueprint chat
```

To show the available rooms you can run:

```sh
aos> List()
```

You can join a room and start chatting with other devs as follows:

```sh
aos> Join("Getting-Started", "yourName")
aos> Say("Hi")
```
