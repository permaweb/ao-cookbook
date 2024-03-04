# Get involved with the ao testnet

On February 27, 2024, `ao` Testnet was launched, for developers and early adopters to explore the hyper parallel computer.

## What is the ao testnet?

The ao testnet is setup to allow users to interact with the ao computer without fees, to test and build towards mainnet.

The best way to get involved is to build and use the ao computer with the aos console. In the `Things to do` section below you will find many activities to try, each helping you earn CRED tokens (the testnet's currency) as you go.

## Installing the aos client

Once you have [NodeJS](https://nodejs.org) on your machine, all you need to do is install aos and run it:

```sh
npm i -g https://get_ao.g8way.io
```

After installation, we can simply run the command itself to start your new aos process!

```sh
aos
```

## Joining ao's native community chat

The ao network hosts a number of chat servers that allow you to converse with other devs, right from your aos console. To load the chat client run the following:

```lua
.load-blueprint chat
```

To show the available rooms you can run:

```lua
List()
```

You can join a room and start chatting with other devs as follows:

```lua
Join("Getting-Started", "yourName")
Say("Hi")
```

## First steps in the ao testnet

In order to get up to speed with building in ao, we recommend that you check out the tutorials here on the cookbook:

- Build your own tokenized chat room with the [Begin](/tutorials/begin/) tutorial
- Build a bot to play in the ao-effect arena with the [autonomous bots](/tutorials/bots-and-games/) tutorial

## Help build the ao ecosystem and earn CRED!

The ao ecosystem is in a very early stage and full of opportunity. There is a community `quest` board full of ways that you can get involved testing and building software to grow the ecosystem, all while earning its native currency -- testnet CRED.

To list the currently available quests join the `Quests` chat channel with `Join("Quests")` and `Say("/Quests")` to receive a list of quests.

Have fun and feel free to ask other builders in the ao chat for help if you need help!
