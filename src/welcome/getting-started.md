# Get started in 5 minutes

In less than 5 mins, we'll walk you through the process of taking your first peek into the rabbit hole. 🕳️🐇

## System requirements

The local client of aos is super simple to install. Just make sure you have:

- [NodeJS](https://nodejs.org) version 20+. (If you haven't yet installed it, check out [this page](https://nodejs.org/en/download/package-manager) to find instructions for your OS).
- A code editor of your choice.

## Installing aos

Once you have NodeJS on your machine, all you need to do is install aos and run it:

```sh
npm i -g https://get_ao.arweave.net
```

After installation, we can simply run the command itself to start a new aos process!

```sh
aos
```

You authenticate yourself to your aos process using a keyfile. If you have an Arweave wallet you can specify it by adding a `--wallet [location]` flag. If you don't, a new keyfile will be generated and stored locally for you at `~/.aos.json`.

## Welcome to the rabbit hole

The utility you just started is a local client, which is ready to relay messages for you to your new process inside the ao computer.

After it connects, you should see the following:

```lua
          _____                   _______                   _____
         /\    \                 /::\    \                 /\    \
        /::\    \               /::::\    \               /::\    \
       /::::\    \             /::::::\    \             /::::\    \
      /::::::\    \           /::::::::\    \           /::::::\    \
     /:::/\:::\    \         /:::/~~\:::\    \         /:::/\:::\    \
    /:::/__\:::\    \       /:::/    \:::\    \       /:::/__\:::\    \
   /::::\   \:::\    \     /:::/    / \:::\    \      \:::\   \:::\    \
  /::::::\   \:::\    \   /:::/____/   \:::\____\   ___\:::\   \:::\    \
 /:::/\:::\   \:::\    \ |:::|    |     |:::|    | /\   \:::\   \:::\    \
/:::/  \:::\   \:::\____\|:::|____|     |:::|    |/::\   \:::\   \:::\____\
\::/    \:::\  /:::/    / \:::\    \   /:::/    / \:::\   \:::\   \::/    /
 \/____/ \:::\/:::/    /   \:::\    \ /:::/    /   \:::\   \:::\   \/____/
          \::::::/    /     \:::\    /:::/    /     \:::\   \:::\    \
           \::::/    /       \:::\__/:::/    /       \:::\   \:::\____\
           /:::/    /         \::::::::/    /         \:::\  /:::/    /
          /:::/    /           \::::::/    /           \:::\/:::/    /
         /:::/    /             \::::/    /             \::::::/    /
        /:::/    /               \::/____/               \::::/    /
        \::/    /                 ~~                      \::/    /
         \/____/                                           \/____/

Welcome to AOS: Your operating system for AO, the decentralized open
access supercomputer.

Type ".load-blueprint chat" to join the community chat and ask questions!

AOS Client Version: 1.12.1. 2024
Type "Ctrl-C" twice to exit

Your AOS process:  QFt5SR6UwJSCnmgnROq62-W8KGY9z96k1oExgn4uAzk

default@aos-0.2.2[Inbox:1]>
```

Welcome to your new home in the ao computer! The prompt you are now looking at is your own personal server in this decentralized machine. We will be using it to play with and explore ao in the rest of this tutorial.

## Sending your first command

Your new personal aos process is a server that lives inside the computer, waiting to receive and execute your commands.

aos loves to make things simple, so it wants to hear commands from you in the Lua programming language. Don't know Lua? Don't panic! It is a super straightforward, friendly, and fun language. We will learn it as we progress through this series.

Let's break the ice and type:

```lua
aos> "Hello, ao!"
```

Then hit the "[Enter]" key. You should see your shell sign and post the message, request the result, then print the result as follows:

```lua
"Hello, ao!"
```

## Eh. What's the big deal?

Sent it a message to your process, permanently etched it into Arweave, then asked a distributed compute network to calculate its result.

While the result might not _look_ revolutionary, in reality you have done something quite extraordinary. Your process is a _decentralized_ server that doesn't exist in any one particular place on Earth. It exists as data, replicated on Arweave between many different machines, distributed all over the world. If you wanted to, you could now attach a new compute unit to this process and recreate the state from its log of inputs (just your single command, for now) -- at any time in the future.

This makes your new shell process...

- **Resilient**: There is no single place on Earth where your server actually resides. It is everywhere and nowhere -- immune from physical destruction or tampering of any kind.
- **Permanent**: Your process will never disappear. It will always exist in its [✨holographic state✨ ](/concepts/holographic-state) on Arweave, allowing you to recall it and continue playing with it. A contribution has been made to Arweave's storage endowment, so that you never have to think about upkeep or maintenance payments again.
- **Permissionless**: You did not have to register in order to start this server. Your right to use it is guaranteed by its underlying protocol (Arweave), no matter what Google, Amazon, or any other BigTech company says.
- **Trustless**: The state of your server is _mathematically guaranteed_. This means that you -- and everyone else -- can trust it with certainty, without even having to trust the underlying hardware it runs on. This property lets you build trustless _services_ on top: Code that runs without any privileged owner or controller, ruled purely by math.

There is so much more to it, but these are the basics. Welcome to the ao computer, newbie! We are grateful to have you. 🫡

## Next Steps

In the tutorials that follow, we will explore ao and build everything from chatrooms to autonomous, decentralized bots. Let's go!
