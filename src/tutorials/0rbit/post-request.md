---
prev:
  text: "Get ANY Data"
  link: "/tutorials/0rbit/get-request"
next:
  text: "Guides"
  link: "/guides/index"
---

# Post Data

In this tutorial, we will build a very simple `ao` process that can send POST HTTP request using `0rbit` oracle network.

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

_And voilà! Let's post the data!_

## Posting Data

1. Start your editor

```bash
.editor
```

2. Create a command to post data.

```lua
local json = require("json")
Send({
    Target = _0RBIT,
    Action = "Post-Real-Data",
    Url = "https://arweave.net/graphql",
    Body = json.encode({
        query = [[
            query {
                transactions(
                    owners: ["vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI"]
                ) {
                    edges {
                        node {
                            id
                        }
                    }
                }
            }
        ]],
        variables = {}
    })
})
```

In this command:

- `json` is a library that is required to encode the data into json format.
- `TARGET` is the process ID of the `ao` process user wants to interact with, which in this case is 0rbit's GET `ao` process.
- `Action` is the specific tag required by 0rbit to perform the Post request.
- `Url` is the Http URL where the request will be sent.
- `Body` is the data that will be sent to the Http URL.

3. Execute the command

This will end your editor and execute the command.

```bash
.done
```

You will receive a new message in a few seconds, including your requested data.

_Awesome! You have successfully posted data to the web using the `0rbit` oracle network._

If you have any doubts or questions, feel free to ask in the [0rbit Discord](https://discord.gg/4SddWhvvJw).
