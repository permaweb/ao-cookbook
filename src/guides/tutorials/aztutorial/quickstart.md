# Quick Start

In this step of the tutorial, we're going to make sure you have the aos pacakages installed and ready to go.

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

> ⚠ **Note:** You authenticate yourself to your aos process using a keyfile. If you have an Arweave wallet you can specify it by adding a `--wallet [location]` flag. If you don't, a new keyfile will be generated and stored locally for you at `~/.aos-key.json`.

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

aos - 1.6.1
2024 - Type ".exit" to exit
aos process:  1xM1_lDZ428sJHpTX7rtcR6SrDubyRVO06JEEWs_eWo

aos>
```

Welcome to your new home in the ao computer! The prompt you are now looking at is your own personal server in this decentralized machine. We will be using it to play with and explore **ao** in the rest of this tutorial.
