---
prev:
  text: "0rbit"
  link: "/guides/snacks/0rbit/get-request"
next:
  text: "BetterIDEa IDE"
  link: "../betteridea/index.md"
---

# First POST Request

In this tutorial, we will learn how to make a POST request on `0rbit` process.

## 🔑 Prerequisites

- aos installed on your system.
- Some $0RBT. _Learn how to get $0RBT [here](https://docs.0rbit.co/protocol/token/how-to-get)_
- Any Code Editor (VSCode, Sublime Text, etc)

If you are ready with the above prerequisites,

## 🛠️ Let's Start Building

### Initialize the Project

Create a new file named `0rbit-Post-Request.lua` in your project directory.

```bash
touch 0rbit-Post-Request.lua
```

### Initialize the Variables

```lua
local json = require("json")

_0RBIT = "BaMK1dfayo75s3q1ow6AO64UDpD9SEFbeE8xYrY2fyQ"
_0RBT_POINTS = "BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc"

FEE_AMOUNT = "1000000000000" -- 1 $0RBT
BASE_URL = "https://arweave.dev/graphql"
-- The data body to be sent in the POST request
BODY = json.encode({
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
    ]]
});

ReceivedData = ReceivedData or {}
```

### Make the Request

The following code contains the Handler that will send 1 $0RBT to the `0rbit` process and make the POST request for the `BASE_URL`

```lua
Handlers.add(
    "Post-Request",
    Handlers.utils.hasMatchingTag("Action", "First-Post-Request"),
    function(msg)
        Send({
            Target = _0RBT_TOKEN,
            Action = "Transfer",
            Recipient = _0RBIT,
            Quantity = FEE_AMOUNT,
            ["X-Url"] = BASE_URL,
            ["X-Action"] = "Post-Real-Data",
            ["X-Body"] = BODY
        })
        print(Colors.green .. "You have sent a POST Request to the 0rbit process.")
    end
)
```

Breakdown of the above code:

- `Handlers.add` is used to add a new handler to the `ao` process.
- Post-Request\_\_ is the name of the handler.
- `Handlers.utils.hasMatchingTag` is a function that checks if the incoming message has the matching tag same as the **First-Post-Request**.
- `function(msg)` is the function executed when the handler is called.
- `Send` is the function that takes several tags as the arguments and creates a message on the ao:

  | **Tag**      |                                                        **Description**                                                         |
  | :----------- | :----------------------------------------------------------------------------------------------------------------------------: |
  | Target       |                         The processId of the recipient. In this case, it's the $0RBT token processId.                          |
  | Action       |              The tag that defines the handler to be called in the recipient process. In this case it's `Transfer`              |
  | Recipient    |           The tag that accepts the processId to whom the $0RBT will be sent. In this case, it's the 0rbit processId.           |
  | Quantity     |                                                The amount of $0RBT to be sent.                                                 |
  | ["X-Url"]    |        The _forwarded-tag_ which contains the URL and the same will be used by the **0rbit process** to fetch the data.        |
  | ["X-Action"] | The _forwarded-tag_ which contains the action to be performed by the **0rbit process**. In this case, it's **Post-Real-Data**. |
  | ["X-Body"]   |                        The _forwarded-tag_ which contains the data body to be sent in the POST request.                        |

### Receive Data

The following code contains the Handler that will receive the data from the `0rbit` process and print it.

```lua
Handlers.add(
    "Receive-Data",
    Handlers.utils.hasMatchingTag("Action", "Receive-Response"),
    function(msg)
        local res = json.decode(msg.Data)
        ReceivedData = res
        print(Colors.green .. "You have received the data from the 0rbit process.")
    end
)
```

Breakdown of the above code:

- `Handlers.add` is used to add a new handler to the `ao` process.
- **Receive-Data** is the name of the handler.
- `Handlers.utils.hasMatchingTag` is a function that checks if the incoming message has the matching tag same as the **Receive-Response**.
- `function(msg)` is the function executed when the handler is called.
  - `json.decode` is used to decode the JSON data received.
  - `ReceivedData = res` stores the received data in the `ReceivedData` variable.

The 0rbit process always sends the data in the `string` format.
`json.decode` is used above because we know the receiving data, i.e., stringified JSON.
So, you need to decode the data as per your requirements.

## 🏃 Run the process

### Create a new process and load the script

```bash
aos 0rbitPostRequest --load 0rbit-Post-Request.lua
```

The above command will create a new process with the name **0rbitPostRequest** and load `0rbit-Post-Request.lua` into it.

### Fund your process

Transfer some $0RBT to your processID.

### Call the Handler

Call the handler, who will create a request for the 0rbit process.

```bash
Send({ Target= ao.id, Action="First-Post-Request" })
```

### Check the Data

To check the data stored in the `ReceivedData` variable, run the following command:

```bash
ReceivedData
```

Upon the successful execution, you will receive the JSON data in your terminal:

```json
{
    data = {
        transactions = {
        edges = {
            {
            node = {
                id = "nH0NU9rgNqGVHwjtjFvnIyXpsP7YVrj_v7JxFErHNB4"
            }
            },
            //and so on...
            {
            node = {
                id = "9HLUVJo4AcrSxQeapf2hutS2Xp7hx_XDiIvv3vnxDcc"
            }
            }
        }
        }
    }
}
```

---

**_Voila! You have successfully made your first POST request on the 0rbit process. 🎉_**

> You can find the complete code here:
>
> https://github.com/0rbit-co/examples/blob/main/First-Post-Request.lua
