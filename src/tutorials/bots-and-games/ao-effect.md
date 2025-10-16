---
prev:
  text: "Bots and Games"
  link: "./index"
---

# Let's Play A Game!

You've been powering through tutorials like a champ! Now, let's take a refreshing break and dive into something exciting. How about a game that adds a dash of fun to your learning journey?

![AO-Effect Game Banner](/ao-effect-game-banner.png)

## What's the game?

`ao-effect` is a game where you can compete with friends or other players globally, in real-time, right from your terminal. We've set up a global game process for this adventure.

The rules are simple. Each player starts on a 40x40 grid with health at 100 and energy at 0. Your energy replenishes over time to a maximum of 100. Navigate the grid, find other players, and use your energy to attack when they're within range. The battle continues until only one player remains or the allotted time expires.

Checkout the guides on the [Mechanics of the Arena](arena-mechanics.md) and [Expanding the Arena](build-game.md) for a deeper understanding of the game.

> Heads Up: Don't sweat it if some command syntax seem unfamiliar. Focus on understanding the purpose of each command at a high level and, most importantly, enjoy the game!

## Preparing for an Adventure in ao-effect

To join this global escapade, you'll need to set things up. Don't worry, it's as easy as 1-2-3!

1. **Install aos**

Fire up your terminal and run:

```bash
npm i -g https://get_ao.arweave.net
```

2. **Launch aos**

Next, create your instance of aos:

```bash
aos
```

3. **Set Up the Game ID**

Let's keep our game server ID handy for quick access:

```lua
Game = "tm1jYBC0F2gTZ0EuUQKq5q_esxITDFkAG6QEpLbpI9I"
```

4. **Print Game Announcements Directly To Terminal (Optional)**

Here's how you can write a handler for printing announcement details:

_This is temporary as we will be loading this via a lua script in the next section._

```lua
Handlers.add(
  "PrintAnnouncements",
  { Action = "Announcement" },
  function (msg)
    ao.send({Target = Game, Action = "GetGameState"})
    print(msg.Event .. ": " .. msg.Data)
  end
)
```

And voilà! You're all set to join the game.

## How to Register for a Game

Ready to jump in? Just a few simple steps to get you going:

### Register with the Game Server

All communication between processes in `ao` occurs through messages. To register, send this message to the game server:

```lua
Send({ Target = Game, Action = "Register" })

-- Expected Result --
{
   output = "Message added to outbox",
   onReply = function: 0x29e5ac0,
   receive = function: 0x29fe440
}
New Message From tm1...I9I: Action = Registered
New Player Registered: a1b...y1z has joined in waiting.
```

This places you in the `Waiting` Lobby. A small fee is needed to confirm your spot.

### Confirm your spot

In order to confirm your spot you need some tokens. You can acquire them by sending the following message to the game:

```lua
Send({ Target = Game, Action = "RequestTokens"}).receive().Data

-- Expected Result --
You received 10000000 from a1b2C3d4e5F6g7h8IjkLm0nOpqR8s7t6U5v4w3X2y1z
```

> [!NOTE]
> The `.receive().Data` will wait for a response by adding a temporary [Handler](../../references/api/handlers.md#handlers-once-name-pattern-handler) that only runs once and will print the response Data. If you would like to instead just wait for the response to hit your Inbox you can call `Send()` without `.receive()` and run `Inbox[#Inbox].Data` to see the response `Data`.
>
> Handler added by `.receive()`:
>
> ```
> {
>   name = "_once_0",
>   maxRuns = 1,
>   pattern = {  },
>   handle = function: 0x2925700
> }
> ```

Once you receive the tokens, confirm your spot by paying the game's entry fee like this:

```lua
Send({ Target = Game, Action = "Transfer", Recipient = Game, Quantity = "1000"}).receive().Data

-- Expected Result --
You transferred 1000 to tm1jYBC0F2gTZ0EuUQKq5q_esxITDFkAG6QEpLbpI9I
New Message From tm1...I9I: Action = Payment-Received
```

Wait for a few seconds, and you'll see live updates in your terminal about player payments and statuses.

## Let the Games Begin!

### Game Mechanics

Game Start: The game begins after a 2-minute `WaitTime` if at least 2 players have paid. Non-paying players are removed. If not enough players pay, those who did are refunded.

Players spawn at a random grid point once the game begins.

### It's Your Move!

Making a Move: The first thing you can do is move around, no energy required! You can shift one square in any direction – up, down, left, right, or diagonally. Along with the direction you must also pass in your player id to help the game identify your move. Here's how:

```lua
Send({ Target = Game, Action = "PlayerMove", Player = ao.id, Direction = "DownRight"})
```

The available moves across the grid are as follows:

```lua
Up = {x = 0, y = -1},
Down = {x = 0, y = 1},
Left = {x = -1, y = 0},
Right = {x = 1, y = 0},
UpRight = {x = 1, y = -1},
UpLeft = {x = -1, y = -1},
DownRight = {x = 1, y = 1},
DownLeft = {x = -1, y = 1}
```

> Keep in Mind: Directions are case sensitive!

If you move off the grid, you'll pop up on the opposite side.

### Time to Strike!

Launching an Attack: As the game progresses, you'll accumulate energy. Use it to attack other players within a 3x3 grid range. Your attack won't hurt you, but it will affect others in range.

```lua
Send({ Target = Game, Action = "PlayerAttack", Player = ao.id, AttackEnergy = "energy_integer"})
```

Health starts at 100 and decreases with hits from other players. Reach 0, and it's game over for you.

## Wrapping Up

The game ends when there's one player left or time is up. Winners receive rewards, then it's back to the lobby for another round.

Enjoyed the game? What if there was a way to make your experience even better or boost your odds of winning. Checkout the next guide to find out 🤔
