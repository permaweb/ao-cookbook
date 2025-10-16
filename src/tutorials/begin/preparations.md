# Preparations

::: info
**The Awakening Begins:**

You've always known there's more to this world, just outside of your reach. You've been searching for it, not even knowing what it was you were looking for. It... is `ao`.

We begin our journey by installing the `aos` client and starting a new process. This will allow us to interact with the ao computer and complete the rest of the tutorial.
:::

## Video Tutorial

<iframe width="680" height="350" src="https://www.youtube.com/embed/nhMZup9uVBQ?si=Ex0W_G-PZA1I9rH8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## System requirements

The local client of aos is very simple to install. Just make sure you have:

- [NodeJS](https://nodejs.org) version 20+. (If you haven't yet installed it, check out [this page](https://nodejs.org/en/download/package-manager) to find instructions for your OS).
- A code editor of your choice.

:::info
Though it's not required, we do recommend installing the [ao addon](../../references/editor-setup) into your text editor of choice to optimize your experience with `aos`.
:::

## Installing aos

Once you have NodeJS on your machine, all you need to do is install aos and run it:

```sh
npm i -g https://get_ao.arweave.net
```

After installation, we can simply run the command itself to start a new aos process!

```sh
aos
```

## Welcome to the rabbit hole

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

Welcome to AOS: Your operating system for AO, the decentralized open
access supercomputer.

Type ".load-blueprint chat" to join the community chat and ask questions!

AOS Client Version: 2.0.9
Type "Ctrl-C" twice to exit

Your AOS process:  QFt5SR6UwJSCnmgnROq62-W8KGY9z96k1oExgn4uAzk

default@aos-0.2.2[Inbox:1]>

```

Let's walk through the initial printout after running `aos`:

![aos print](/aos-print.png)

After running `aos` in your terminal, you should see:

- An ASCII art image of `AOS`.
- A Welcome Message
- The version of `aos` you are running.
- An instructional exit message.
- Your process ID.

::: info
If your OS version is different than the latest version, a message asking if you'd like to update the version will appear. If so, simply exit the process by pressing "Ctrl+C" twice, run `npm i -g https://get_ao.g8way.io` to update, and then run `aos` again.
:::

Welcome to your new home in the ao computer! The prompt you are now looking at is your own personal server in this decentralized machine.

Now, let's journey further down the rabbit hole by exploring one of the two core concept type of ao: [messaging](messaging).
