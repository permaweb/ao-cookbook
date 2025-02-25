---
prev:
  text: "0rbit"
  link: "/guides/snacks/0rbit/index"
next:
  text: "First POST Request"
  link: "/guides/snacks/0rbit/post-request"
---

# First GET Request

In this tutorial, we will learn how to make a GET request to the **0rbit network** through your `ao` process.

## 🔑 Prerequisites

- aos installed on your system.
- Some $0RBT. _Learn how to get $0RBT [here](https://docs.0rbit.co/protocol/token/how-to-get)_
- Any Code Editor (VSCode, Sublime Text, etc)

If you are ready with the above prerequisites,

## 🛠️ Let's Start Building

### Initialize the Project

Create a new file named `0rbit-Get-Request.lua` in your project directory.

```bash
touch 0rbit-Get-Request.lua
```

### Initialize the Variables

```lua
local json = require("json")

_0RBIT = "BaMK1dfayo75s3q1ow6AO64UDpD9SEFbeE8xYrY2fyQ"
_0RBT_POINTS = "BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc"

FEE_AMOUNT = "1000000000000" -- 1 $0RBT
BASE_URL = "https://api.diadata.org/v1/assetQuotation/Arweave/0x0000000000000000000000000000000000000000"

ReceivedData = ReceivedData or {}
```

### Make the Request

The following code contains the Handler that will send 1 $0RBT to the `0rbit` process and make the GET request for the `BASE_URL`

```lua
Handlers.add(
    "Get-Request",
    Handlers.utils.hasMatchingTag("Action", "First-Get-Request"),
    function(msg)
        Send({
            Target = _0RBT_TOKEN,
            Action = "Transfer",
            Recipient = _0RBIT,
            Quantity = FEE_AMOUNT,
            ["X-Url"] = BASE_URL,
            ["X-Action"] = "Get-Real-Data"
        })
        print(Colors.green .. "You have sent a GET Request to the 0rbit process.")
    end
)
```

Breakdown of the above code:

- `Handlers.add` is used to add a new handler to the `ao` process.
- **Get-Request** is the name of the handler.
- `Handlers.utils.hasMatchingTag` is a function that checks if the incoming message has the matching tag same as the **First-Get-Request**.
- `function(msg)` is the function executed when the handler is called.
- `Send` is the function that takes several tags as the arguments and creates a message on the ao:

  | **Tag**      |                                                        **Description**                                                        |
  | :----------- | :---------------------------------------------------------------------------------------------------------------------------: |
  | Target       |                         The processId of the recipient. In this case, it's the $0RBT token processId.                         |
  | Action       |             The tag that defines the handler to be called in the recipient process. In this case it's `Transfer`              |
  | Recipient    |          The tag that accepts the processId to whom the $0RBT will be sent. In this case, it's the 0rbit processId.           |
  | Quantity     |                                                The amount of $0RBT to be sent.                                                |
  | ["X-Url"]    |       The _forwarded-tag_ which contains the URL and the same will be used by the **0rbit process** to fetch the data.        |
  | ["X-Action"] | The _forwarded-tag_ which contains the action to be performed by the **0rbit process**. In this case, it's **Get-Real-Data**. |

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

## 🏃 Run the process

### Create a new process and load the script

```bash
aos 0rbitGetRequest --load 0rbit-Get-Request.lua
```

The above command will create a new process with the name **0rbitGetRequest** and load `0rbit-Get-Request.lua` into it.

### Call the Handler

Call the handler, who will create a request for the 0rbit process.

```bash
Send({ Target= ao.id, Action="First-Get-Request" })
```

Upon the successful execution, you will receive the following messages in your terminal

### Check the Data

To check the data stored in the `ReceivedData` variable, run the following command:

```bash
ReceivedData
```

Upon the successful execution, you will receive the JSON data in your terminal:

```json
{
   Address = "0x0000000000000000000000000000000000000000",
   Name = "Arweave",
   Blockchain = "Arweave",
   Signature = "0x2cd98c6f29a044d732ffcbc1a1b11e6f93f97f760dd1c9e47717ca04cc500afd6d83ad65270b227ddbaeba713e329e31959c814620d8ca136e685565414673d101",
   Time = "2024-08-14T14:05:59Z",
   Source = "diadata.org",
   PriceYesterday = 21.446763148012,
   Symbol = "AR",
   Price = 21.404398988798,
   VolumeYesterdayUSD = 14609998.02428
}
```

---

**_Voila! You have successfully made your first GET request on the 0rbit process. 🎉_**

> You can find the complete code here:
>
> https://github.com/0rbit-co/examples/blob/main/First-Get-Request.lua
