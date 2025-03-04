# Accessing Data from Arweave with ao

There may be times in your ao development workflow that you want to access data from Arweave. With ao, your process can send an assignment instructing the network to provide that data to your Process.

## Defining Acceptable Transactions (Required First Step)

> **Critical:** By default, a process won't accept any Arweave transactions. You must explicitly define which transactions are allowed before attempting to assign them.

Before you can assign any Arweave transaction to your process, you must first define which transactions your process will accept using [`ao.addAssignable`](../references/ao.md#ao-addassignable-name-string-condition-function). This function creates conditions that determine which Arweave transactions your process will accept.

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

The condition functions use similar pattern matching techniques as found in the [Handlers documentation](../references/handlers.md#pattern-matching-tables). For complete details on the `ao.addAssignable` function, including parameter descriptions and additional examples, see the [ao Module Reference](../references/ao.md#ao-addassignable-name-string-condition-function).

## Working with Assigned Data

To access assigned data in your code, you'll need to set up a listener using the `Receive` function and then make your assignment request.

### Setting Up a Listener with `Receive`

> **Critical Timing:** You must set up your `Receive` listener _before_ making the assignment request. If you call `Assign` first, the listener won't capture the data.

The `Receive` function lets you create a listener that waits for specific incoming messages:

```lua
-- Listen for messages from ArDrive
ArweaveData = Receive(function(msg)
  return msg.Tags["App-Name"] == "ArDrive-App"
end)

-- After setting up the listener, you can make your assignment request
```

You can create specific filters to match exactly the transaction you're interested in:

```lua
-- Match a specific transaction ID
ArweaveData = Receive(function(msg)
  return msg.Id == "<arweave-transaction-id>"
end)

-- Or combine multiple conditions
ArweaveData = Receive(function(msg)
  return msg.Tags["App-Name"] == "ArDrive-CLI" and
         msg.Tags["Content-Type"] == "image/png"
end)
```

> **Note:** For more details on the `Receive` function and other messaging patterns, see the [Messaging Patterns documentation](../references/messaging.md#receive-capital-r-blocking-pattern-matcher).

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

### Accessing the Data

Once the data has been assigned and captured by your listener, you can access it and its metadata:

```lua
if ArweaveData then
  -- Process the Arweave data
  print(ArweaveData.Tags["App-Name"]) -- e.g., "ArDrive-CLI"
  -- Raw Arweave Data is available in ArweaveData.Data
end
```

## Complete Example Workflow

Here's a complete example that demonstrates the entire process of accessing data from an Arweave transaction:

```lua
-- Step 1: Define which transactions your process will accept
ao.addAssignable("allowArDrive", function (msg)
    return msg.Tags["App-Name"] == "ArDrive-App"
end)

-- Step 2: Set up a listener to capture the data
ArweaveData = Receive(function(msg)
  return msg.Tags["App-Name"] == "ArDrive-App"
end)

-- Step 3: Request the data
Assign({
  Processes = { ao.id },
  Message = '<arweave-transaction-id>'
})

-- Step 4: Process the received data
if ArweaveData then
  print(ArweaveData.Tags["App-Name"]) -- e.g., "ArDrive-CLI"
  -- Raw Arweave Data is available in ArweaveData.Data
end
```

This pattern creates a synchronous flow where your process:

1. Defines which transactions are acceptable
2. Sets up a listener with `Receive`
3. Requests specific data with `Assign`
4. Processes the received data when it arrives

## Important Limitations {#assignable-limitations}

There are critical limitations to be aware of when working with assignables:

1. **Matching is Required**: Transactions must match at least one of your defined assignable patterns to be accepted.

2. **Blacklisting is Permanent**: If you attempt to assign a transaction before defining an appropriate assignable, it will be permanently blacklisted. Even if you later add a matching assignable, that transaction will never be accepted.

3. **One-time Assignment**: Each Arweave transaction can only be assigned once to a given process. Subsequent assignments of the same transaction will be ignored.

## Proper Sequence for Assigning Arweave Transactions

For successful assignment of Arweave transactions, follow these steps in order:

1. **Define assignables** to specify which Arweave transactions your process will accept
2. **Set up any listeners** with `Receive` if you need to capture the data
3. **Wait for any transaction confirmations** (by default, 20 confirmations are required)
4. **Assign the Arweave transaction** to your process (see [Assignment Methods](#assignment-methods))
5. **Process the data** captured by your listener (see [Working with Assigned Data](#working-with-assigned-data))

> **Important:** Be sure to follow this sequence to avoid missing data or encountering the permanent blacklisting described in [Important Limitations](#assignable-limitations).

## Why Access Data from Arweave?

There are several practical reasons to access Arweave data from your ao process:

1. **External Data for Decision-Making**: Your process may need data stored on Arweave to make informed decisions. For example:

   - Reading token price data stored by an oracle
   - Accessing verified identity information
   - Retrieving voting records or governance data

2. **Dynamic Loading of Features**: Rather than including all functionality in your initial process code:

   - Load modules or plugins from Arweave as needed
   - Update configuration without redeploying your entire process
   - Implement upgradable components with new versions stored on Arweave

3. **Efficient Handling of Large Data**: For larger content, directly accessing Arweave is more efficient:
   - Reference large media files (images, videos, documents) without storing them in your process
   - Work with datasets too large to fit in process memory
   - Maintain a lightweight process that can access substantial external resources

This approach allows you to create more sophisticated applications that leverage Arweave's permanent storage while maintaining efficient process execution in the ao environment.
