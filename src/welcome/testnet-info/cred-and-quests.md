# CRED and Quests FAQ

::: info

The `ao` ecosystem is in a very early stage and full of opportunity.
There is a community quest board full of ways that you can get involved testing and building
software to grow the ecosystem, all while earning its native currency: CRED.

:::

## What is CRED?

CRED is the native currency of the `ao` testnet. It is awarded to those who complete quests.

## What is CRED good for?

> The CRED token is a digital representation of a person's social cred.
>
> whomstsoever has the most CRED is, undeniably, the coolest, most trustworthy person
>
> -Bobinstein (bobinstein), via [Discord](https://discord.com/channels/1210396395643863101/1210606156582752436/1215723479672815647)

> the future [of CRED] has not yet been determined...
>
> -Ros (rosmcmahon), via [Discord](https://discord.com/channels/1210396395643863101/1210606156582752436/1217101371472478318)

## How do I earn CRED?

You earn CRED by completing the available quests that have been defined by the `ao` core developers
and community contributors.

## What quests are available?

There is a dev chat room within `ao` localnet which you can query for quest information.
First, launch `aos`:

```sh
$ aos
```

Next, join the `Quests` chatroom, if you haven't done so already. You can optionally provide your
screenname/handle as the second parameter

```lua
aos> Join("Quests")
# OR
aos> Join("Quests", "MyScreenName")
```

Then you can send the `/Quests` slash command to that chatroom. In case you have joined multiple
chatrooms, the second parameter sends the message to only one specific chatroom, by name.

```lua
aos> Say("/Quests")
# OR
aos> Say("/Quests", "Quests")
```

After a few seconds, a bot will respond by broadcasting the list of available quests to the chatroom.

## How do I view the detailed quest description?

You can learn more about the details of a specific quest, by sending a `/Quests:[index]` slash
command into the `Quests` chatroom, where `[index]` should be replaced with the quest number, for exmaple:

```lua
aos> Say("/Quests:1", "Quests")
# OR
aos> Say("/Quests:2", "Quests")
```

### Quest 1: "Begin"

The detailed steps for Quest 1 are available in the [Begin](/tutorials/begin/) tutorial in this cookbook.

### Quest 2: "Bots-and-Games"

The detailed steps for Quest 2 are available in the [Bots and Games](/tutorials/bots-and-games/) tutorial in this cookbook.

## How do I complete a quest?

Follow _all_ the steps in the quest description, including submitting the claim.

## How do I get my CRED?

The text description of each quest will provide you details on how to submit the claim request.
_After you fully complete a quest_, be sure to submit the claim _as instructed in the quest description_.
You must complete all the steps of the quest and submit the claim request to receive your CRED.
It will take some time to manually process your claim request.

## When do I get my CRED?

Your request will be manually reveiewed to verify that you followed all of the necessary steps.
Please allow ~24 hours on business days for your claim to be processed.

## How do I view/verify my current CRED balance?

You can load the `credUtils` blueprint into your `ao` process to quickly query for your CRED balance,
and even send CRED to a friend!

```lua
aos> .load-blueprint credUtils
Loading...  credUtils                                        # sample output
undefined                                                    # sample output
aos> CRED.balance
Your CRED balance has not been checked yet. Updating now.    # sample output
CRED Balance updated: 500.000                                # sample output
```

Read more about [aos blueprints](/guides/aos/blueprints/index).
