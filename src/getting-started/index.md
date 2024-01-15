# Get started in 5 minutes: What on Earth is ao?

ao is a decentralized computer that can run any number of processes in parallel.

It is communal: Everyone can use and share this computer -- including you.

Once processes are launched on ao, they can permissionlessly interact with any other process on the network through a shared messaging layer ([Arweave](https://arweave.org)).

One way to think of ao is that it is like a decentralized version of the web, but for compute. Everyone can upload their sites (processes), which link together and interact with one another (through messages, rather than hyperlinks).

The result is a sprawling metropolis of interacting and autonomous programs that anyone can access and play with.

There is no other computer quite like ao.

Instead of telling you about it, this guide is built to _show_ you the machine and the cities inside it. It also shows you how you can setup shop inside ao, adding to the metropolis. It will take just 3 minutes to get inside.

If you would like to learn more about the technical specifications of the system, please check out its [spec](https://ao.g8way.io/#/specs) for detailed analysis.

Let's jump into it! 🚀

## ao + aos: The rocket and your rocket fuel.

Normally when you are using ao, you will use it through its operating system: `aos`.

aos is an abstraction layer that runs in your processes, making it easier to use the ao computer.

You can think of ao like your new shiny macbook, and aos like macOS running on top of it.

## System requirements.

The local client of aos is super simple to install. Just make sure you have:

- [NodeJS](https://nodejs.org) version 20+. (If you haven't yet installed it, check out [this page](https://nodejs.org/en/download/package-manager) to find instructions for your OS).
- A code editor of your choice.

## Installing aos.

Once you have NodeJS on your machine, all you need to do is install aos and run it:

```sh
npm i -g https://get_ao.g8way.io
```

After installation, we can simply run the command itself to start a new aos process!

```sh
aos
```

You authenticate yourself to your aos process using a keyfile. If you have an Arweave wallet you can specify it by adding a `--wallet [location]` flag. If you don't, a new keyfile will be generated and stored locally for you at `~/.aos-key.json`.

## Welcome to the rabbit hole.

The utility you just started is a local client, which is ready to relay messages for you to your new process inside the ao computer.

After it connects, you should see the following:

```sh
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

ao Operating System

aos - 1.4.1
2024 - Type ".exit" to exit
aos process:  1xM1_lDZ428sJHpTX7rtcR6SrDubyRVO06JEEWs_eWo

aos>
```

Welcome to your new home in the ao computer! The prompt you are now looking at is your own personal server in this decentralized machine. We will be using it to play with and explore ao in the rest of this tutorial.

## Sending your first command.

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
- **Permanent**: Your process will never dissappear. It will always exist in its [✨holographic state✨ ](/concepts/holographic-state) on Arweave, allowing you to recall it and continue playing with it. A contribution has been made to Arweave's storage endowment, so that you never have to think about upkeep or maintainance payments again.
- **Permissionless**: You did not have to register in order to start this server. Your right to use it is guaranteed by its underlying protocol (Arweave), no matter what Google, Amazon, or any other BigTech company says.
- **Trustless**: The state of your server is _mathematically guaranteed_. This means that you -- and everyone else -- can trust it with certainty, without even having to trust the underlying hardware it runs on. This property lets you build trustless _services_ on top: Code that runs without any priveliged owner or controller, ruled purely by math.

There is so much more to it, but these are the basics. Welcome to the ao computer, newbie! We are grateful to have you. 🫡

## Next Steps

In the tutorials that follow, we will explore ao and build everything from chatrooms to autonomous, decentralized bots. Let's go!

- [Tutorials](../guides/tutorials/index)
- [Concepts](../concepts/index)
- [References](../references/index)
