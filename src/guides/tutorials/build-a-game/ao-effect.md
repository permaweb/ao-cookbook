---
prev:
  text: "Play a Game"
  link: "/guides/tutorials/build-a-game/index"
next:
  text: "Interpreting Announcements"
  link: "/guides/tutorials/build-a-game/announcements"
---

# Let's Play A Game!

You've been powering through tutorials like a champ! How about we take a refreshing break and dive into something exciting? Let's play a game that's sure to add a dash of fun to your learning journey.

## What's the game?

`ao-effect` is a game where you can compete with friends or other players globally, all in real-time, right from your terminal. And we've set up a global game process just for this experience.

The rules of the game are pretty straightforward. At the start, each player is randomly placed on a 40x40 grid, identified by x and y coordinates, with a starting health of 100 and an initial energy level of 0. As the game progresses, your energy gradually replenishes, reaching a maximum of 100. The objective is simple - navigate the grid to locate and engage other players. If an opponent enters your attack range, you can use energy to launch an attack. The battle continues until only one player remains or the allotted time expires.

> Heads Up: Don't sweat it if some command syntax seem unfamiliar. Focus on understanding the purpose of each command at a high level and, most importantly, enjoy the game!

## Preparing for an Adventure in ao-effect

To join this global escapade, you'll need to set things up. Don't worry, it's as easy as 1-2-3!

1. Install aos
   Fire up your terminal and run:

```bash
npm i -g https://get_ao.g8way.io
```

2. Launch aos
   Next, create your instance of aos:

```bash
aos
```

3. Set Up the Game ID
   Let's keep our game server ID handy for quick access:

```lua
Game = "process_id_here"
```

And voilà! You're all set to join the game.

## How to Register for a Game

Ready to jump in? Just a few simple steps to get you going:

### Register with the Game Server

All communication between processes in ao occurs through messages. To register, send this message to the game server:

```lua
Send({ Target = Game, Action = "Register" })
```

This lands you in the `Waiting` Lobby. Remember, securing your spot in the game requires a small fee.
(We're working on a system for timing, payments and distributing tokens. Also, keep an eye out for details on game participation and payment amounts.)

### Confirm your spot

You should have some credits and tokens to get started. Confirm your spot by paying the game's entry fee like this:

```lua
Send({ Target = Game, Action = "Transfer", Recipient = Game, Quantity = "1"})
```

Wait for a few seconds, and you'll see live updates in your terminal about player payments and statuses.

## Let the Games Begin!

### Game Mechanics

Game Start: Once the WaitTime (2 minutes) is up, if at least 2 players have paid, the GameMode switches to Playing, and the adventure begins. Players who haven't paid are removed, and if there aren't enough players, those who paid are refunded and reset to Waiting.

Player Spawn: Initially, all players appear at grid point (1, 1).

### It's Your Move!

Making a Move: The first thing you can do is move around, no energy required! You can shift one square in any direction – up, down, left, right, or diagonally. Here's how:

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

Health starts at 100 and decreases with hits. Reach 0, and it's game over for you.

## Wrapping Up

The game ends after GameTime (5 minutes) or if there's just one player standing. Winners get rewards, and then it's back to the Waiting room for another round!

Enjoyed the game? What if there was a way to make your experience even better or boost your odds of winning. Checkout the next guide to find out 🤔