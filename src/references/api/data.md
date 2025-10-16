# Accessing Data from Arweave with ao

There may be times in your ao development workflow that you want to access data from Arweave. With ao, your process can send an assignment instructing the network to provide that data to your Process.

## Defining Acceptable Transactions (Required First Step)

Before you can assign any Arweave transaction to your process, you must first define which transactions your process will accept using [`ao.addAssignable`](./ao.md#ao-addassignable-name-string-condition-function). This function creates conditions that determine which Arweave transactions your process will accept.

```lua
-- Allow transactions from ArDrive
ao.addAssignable("allowArDrive", function (msg)
    return msg.Tags["App-Name"] == "ArDrive-App"
end)

-- Allow specific content types
ao.addAssignable("allowImages", function (msg)
    return msg.Tags["Content-Type"] and string.match(msg.Tags["Content-Type"], "^image/")
end)
```

> **Warning:** If you attempt to assign a transaction without first defining a matching assignable pattern, that transaction will be permanently blacklisted and can never be assigned to your process, even if you later add a matching assignable.

You can remove assignables with `ao.removeAssignable("<name>")`.

The condition functions use similar pattern matching techniques as found in the [Handlers documentation](./handlers.md#pattern-matching-tables). For complete details on the `ao.addAssignable` function, including parameter descriptions and additional examples, see the [ao Module Reference](./ao.md#ao-addassignable-name-string-condition-function).

## Assignment Methods

After defining acceptable transactions and setting up your listener (if needed), you can request Arweave data in one of two ways:

### Using `Assign`

The primary method to request data from Arweave:

```lua
Assign({
  Processes = { ao.id },
  Message = '<arweave-transaction-id>'
})
```

### Using `Send` with `Assignments`

Alternatively, you can use the `Send` function with an `Assignments` parameter:

```lua
Send({
  Target = ao.id,
  Data = 'Hello World',
  Assignments = { '<process-id-1>', '<process-id-2>' }
})
```

## Working with Assigned Data

You can process assigned data using either `Receive` or `Handlers`:

### Using `Receive` Directly

```lua
-- Listen for messages from ArDrive
ArweaveData = Receive(function(msg)
  return msg.Tags["App-Name"] == "ArDrive-App"
end)

-- Process the data when received
if ArweaveData then
  print(ArweaveData.Tags["App-Name"])
  -- Raw Arweave Data is available in ArweaveData.Data
end
```

You can also match specific transactions or combine conditions:

```lua
-- Match a specific transaction ID
ArweaveData = Receive({ Id = "<arweave-transaction-id>" })

-- Or combine multiple conditions
ArweaveData = Receive(function(msg)
  return msg.Tags["App-Name"] == "ArDrive-CLI" and
         msg.Tags["Content-Type"] == "image/png"
end)
```

> **Note:** When using [`.load`](../../guides/aos/load.md#load-lua-files-with-load-filename), the script pauses at `Receive` until data arrives. When running commands separately in the shell, each command executes independently.

### Using Handlers

For persistent processing, set up a handler:

```lua
Handlers.add("ProcessArDriveFiles",
  { Tags = { ["App-Name"] = "ArDrive-App" } },
  function(msg)
    print(msg.Tags["App-Name"])
    -- Raw Arweave Data is available in msg.Data
  end
)
```

Handlers are ideal for:

- Processing multiple assignments over time
- Automated processing without manual intervention
- Building services that other processes can interact with

For more details, see the [Messaging Patterns](./messaging.md#receive-capital-r-blocking-pattern-matcher) and [Handlers](./handlers.md#pattern-matching-tables) documentation.

## Complete Example Workflow

Here's a complete example that demonstrates the entire process of accessing data from an Arweave transaction:

```lua
-- Step 1: Define which transactions your process will accept
ao.addAssignable("allowArDrive", function (msg)
    return msg.Tags["App-Name"] == "ArDrive-App"
end)

-- Step 2: Request the data
Assign({
  Processes = { ao.id },
  Message = '<arweave-transaction-id>'
})

-- Step 3: Immediately capture the Assignment; blocking until received
ArweaveData = Receive(function(msg)
  return msg.Tags["App-Name"] == "ArDrive-App"
end)

print(ArweaveData.Tags["App-Name"]) -- e.g., "ArDrive-CLI"
-- Raw Arweave Data is available in ArweaveData.Data
```

This pattern creates a synchronous flow where your process:

1. Defines acceptable transactions
2. Requests the data
3. Captures the data using `Receive`
4. Processes the data

## Practical Examples

Here are two practical examples showing different approaches to working with Arweave data in your ao process:

### Example 1: Caching Arweave Data

This example demonstrates how to load and cache data from Arweave, then use it in subsequent operations:

```lua
-- Initialize state
local Number = 0

-- Step 1: Define which transactions your process will accept
print("Step 1: Defining acceptable transactions")
ao.addAssignable("addNumber", function (msg)
    return msg.Tags["Action"] == "Number"
end)

-- Step 2: Request and cache the initial number from Arweave
-- This uses a self-executing function to fetch and cache the value only once
NumberFromArweave = NumberFromArweave or (function()
    print("Step 2: Requesting initial number from Arweave")
    Assign({
        Processes = { ao.id },
        Message = 'DivdWHaNj8mJhQQCdatt52rt4QvceBR_iyX58aZctZQ'
    })
    return tonumber(Receive({ Action = "Number"}).Data)
end)()

-- Step 3: Set up handler for future number updates
-- This handler will add new numbers to our cached Arweave number
Handlers.add("Number", function (msg)
    print("Received message with Data = " .. msg.Data)
    print("Old Number: " .. Number)
    Number = NumberFromArweave + tonumber(msg.Data)
    print("New Number: " .. Number)
end)
```

This example shows how to:

- Cache Arweave data using a self-executing function
- Use the cached data in subsequent message handling
- Combine Arweave data with new incoming data

### Example 2: Dynamic Transaction Processing

This example shows how to process arbitrary Arweave transactions and maintain state between requests:

```lua
-- Table to store pending requests (maps transaction ID to original sender)
local PendingRequests = {}

-- Step 1: Define which transactions your process will accept
print("Step 1: Defining acceptable transactions")
ao.addAssignable("processArweaveNumber", function (msg)
    return msg.Tags["Action"] == "Number"
end)

-- Step 2: Set up handler for initiating the processing
Handlers.add(
    "ProcessArweaveNumber",
    function (msg)
        if not msg.Tags["ArweaveTx"] then
            print("Error: No ArweaveTx tag provided")
            return
        end
        local txId = msg.Tags["ArweaveTx"]
        print("Assigning Arweave transaction: " .. txId)
        -- Store the original sender associated with this transaction ID
        PendingRequests[txId] = msg.From
        -- Assign the transaction to this process
        Assign({
            Processes = { ao.id },
            Message = txId
        })
        print("Assignment requested; waiting for data...")
    end
)

-- Step 3: Set up handler for processing the assigned message
Handlers.add(
    "Number",
    function (msg)
        local txId = msg.Id  -- The ID of the assigned message
        local originalSender = PendingRequests[txId]
        if not originalSender then
            print("Error: No pending request found for transaction " .. txId)
            return
        end
        local data = msg.Data
        if not data or not tonumber(data) then
            print("Error: Invalid number data in assigned message")
            return
        end
        local number = tonumber(data)
        local result = number + 1
        print(string.format("Processing: %d + 1 = %d", number, result))
        -- Send the result back to the original sender
        Send({
            Target = originalSender,
            Data = tostring(result)
        })
        -- Clean up the pending request
        PendingRequests[txId] = nil
    end
)
```

To use this example:

```lua
Send({
    Target = ao.id,
    Action = "ProcessArweaveNumber",
    Tags = {
        ArweaveTx = "YOUR-ARWEAVE-TX-ID"  -- ID of a transaction containing a number
    }
})
```

This example demonstrates:

- Processing arbitrary Arweave transactions
- Maintaining state between requests using a pending requests table
- Sending results back to the original requester
- Error handling and request cleanup

:::warning
When using `Assign` to bridge Arweave data into AO, you must ensure that:

1. The Arweave transaction you're assigning matches one of your defined assignables
2. You have a corresponding handler or receiver set up to process that transaction type
3. The handler's pattern matching matches the assigned transaction's tags/properties

For example, if you're assigning a transaction with `Action = "Number"`, you need:

- An assignable that accepts `msg.Tags["Action"] == "Number"`
- Either a `Receive` function or a handler that matches the same pattern
- Both the assignable and handler must use consistent pattern matching
  :::

## Important Limitations {#assignable-limitations}

There are critical limitations to be aware of when working with assignables:

1. **Matching is Required**: Transactions must match at least one of your defined assignable patterns to be accepted.

2. **Blacklisting is Permanent**: If you attempt to assign a transaction before defining an appropriate assignable, it will be permanently blacklisted. Even if you later add a matching assignable, that transaction will never be accepted.

3. **One-time Assignment**: Each Arweave transaction can only be assigned once to a given process. Subsequent assignments of the same transaction will be ignored.

## Proper Sequence for Assigning Arweave Transactions

For successful assignment of Arweave transactions, follow these steps:

1. **Define assignables** to specify which Arweave transactions your process will accept
2. **Wait for any transaction confirmations** (by default, 20 confirmations are required)
3. **Set up handlers or listeners** with `Receive` or `Handlers.add` to process the data
4. **Assign the Arweave transaction** to your process (see [Assignment Methods](#assignment-methods))

The order of steps 3 and 4 can be interchanged based on your needs:

- When using `Receive` in a script loaded with `.load`, ensure `Assign` is placed before `Receive` to prevent the process from hanging, as `Receive` is blocking.
- When using handlers or running commands separately in the shell, the order doesn't matter as handlers will catch messages whenever they arrive

## Why Access Data from Arweave?

There are several practical reasons to access Arweave data from your ao process:

1. **Efficient Handling of Large Data**: For larger content, directly accessing Arweave is more efficient:

   - Reference large media files (images, videos, documents) without storing them in your process
   - Work with datasets too large to fit in process memory
   - Maintain a lightweight process that can access substantial external resources

2. **External Data for Decision-Making**: Your process may need data stored on Arweave to make informed decisions. For example:

   - Reading token price data stored by an oracle
   - Accessing verified identity information
   - Retrieving voting records or governance data

3. **Dynamic Loading of Features**: Rather than including all functionality in your initial process code:

   - Load modules or plugins from Arweave as needed
   - Update configuration without redeploying your entire process
   - Implement upgradable components with new versions stored on Arweave

This approach allows you to create more sophisticated applications that leverage Arweave's permanent storage while maintaining efficient process execution in the ao environment.

When another process Assigns a transaction to this process, you can also use handlers to process the data asynchronously.
