---
prev:
  text: "0rbit"
  link: "/guides/0rbit/index"
next:
  text: "Post Data"
  link: "/guides/0rbit/post-request"
---

# Get ANY Data

In this tutorial, we will build a very simple `ao` process that fetches data from the web using the `0rbit` oracle network.

## Getting Started with `aos`

To work with the `ao` computer, your machine requires a local environment to run the `ao` process, which aos will provide.

1. **Install aos**
   Fire up your terminal and run:

```bash
npm i -g https://get_ao.g8way.io
```

2. **Launch aos**
   Next, create your instance of aos:

```bash
aos
```

3. **Store the 0rcale `processId`**
   This will initialize a variable with the `processId` of the 0rcale.

```lua
_0rbit = "WSXUI2JjYUldJ7CKq9wE1MGwXs-ldzlUlHOQszwQe0s"
```

_And voilà! Let's get the data!_

## Fetching Data

1. Start your editor

```bash
.editor
```

2. Create a command to fetch data.

```lua
Send({
    Target = _0RBIT,
    Action = "Get-Real-Data",
    Url = "https://dummyjson.com/products"
})
```

In this command:

- `TARGET` is the process ID of the `ao` process the user wants to interact with, which is 0rbit's GET `ao` process.
- `Action` is the specific tag required by 0rbit to perform the Get request.
- `Url` is the website URL from which we want to get the data.

3. Execute the command

This will end your editor and execute the command.

```bash
.done
```

You will receive a new message in a few seconds, including your requested data.

_Awesome! You have successfully fetched data from the web using the `0rbit` oracle network._

If you have any doubts or questions, feel free to ask in the [0rbit Discord](https://discord.gg/4SddWhvvJw).
