# Dynamic Reads

Dynamic reads enable on-the-fly computations on your process state using Lua transformation functions. These functions process cached state and return computed results without modifying the underlying data.

This pattern creates efficient data APIs by moving computation from clients to HyperBEAM nodes, reducing both network traffic and client-side complexity.

This guide assumes you are already familiar with [state exposure](./state-exposure.md).

## How Dynamic Reads Work

Dynamic reads leverage the `lua@5.3a` device to execute Lua scripts against cached state. The HyperBEAM URL constructs a processing pipeline:

1.  First, we grab the latest state of an AO process.
2.  Then, we pipe that state as the `base` message into the `lua@5.3a` device.
3.  We tell the Lua device which script to load (from an Arweave transaction) and which function to execute.
4.  The function runs, processing the `base` state.
5.  Finally, the result of the function is returned over HTTP.

## Example: Calculating Circulating Supply

Let's consider a practical example: a token process where we have patched the `Balances` table to be readable. Rather than forcing clients to download all balance data to compute the total supply, we can do it on the HyperBEAM node.

### 1. The Transformation Function

First, create a Lua script (`sum.lua`) with a function that takes the state (`base`) and calculates the sum of balances.

```lua
-- sum.lua
function sum(base, req)
  -- Initialize total supply counter
  local totalSupply = 0
  local total = 0

  -- Check if we have balances in our state
  if base.balances then
    -- Iterate through all balances and sum them
    for address, balance in pairs(base.balances) do
      -- Ensure balance is a number and add to total
      local numBalance = tonumber(balance) or 0
      totalSupply = totalSupply + numBalance
      total = total + 1
    end
  end

  -- Return the computed result as a table
  return {
    CirculatingSupply = tostring(math.floor(totalSupply)),
    BalanceCount = tostring(math.floor(total))
  }
end
```

The transformation function receives two arguments:

- **`base`**: The message being processed, which in our pipeline will be the cached state data from your process.
- **`req`**: The incoming request object, which contains parameters and other metadata.

### 2. Publishing the Function

Next, publish your Lua script to Arweave. The `arx` CLI tool is recommended for this.

```bash
# Install arx globally
npm i -g @permaweb/arx

# Upload your Lua function to Arweave
arx upload sum.lua \
-w PATH_TO_WALLET.json \
-t arweave \
--content-type application/lua \
--tags Data-Protocol ao
```

`arx` will return a transaction ID for your script. Let's say it's `LUA_SCRIPT_TX_ID`.

### 3. Calling the Function

With the process ID (`YOUR_PROCESS_ID`) and the script transaction ID (`LUA_SCRIPT_TX_ID`), you can construct a URL to call your function:

```HyperBEAM URL
GET /<YOUR_PROCESS_ID>~process@1.0/now/~lua@5.3a&module={LUA_SCRIPT_TX_ID}/sum/serialize~json@1.0
```

This URL breaks down as follows:

- `/{YOUR_PROCESS_ID}~process@1.0`: Targets the AO process and its state.
- `/now`: Gets the most current state.
- `/~lua@5.3a&module={LUA_SCRIPT_TX_ID}`: This is the key part. It tells HyperBEAM to take the output of the previous step (the process state) and process it with the `lua@5.3a` device, loading your script from the `module` transaction.
- `/sum`: Calls the `sum` function within your Lua script.
- `/serialize~json@1.0`: Takes the table returned by your function and serializes it into a JSON object.

### 4. Integrating into an Application

Here's how you could fetch this dynamic data in a JavaScript application:

```javascript
// Fetch circulating supply with JSON serialization
const processId = "FkJPkIHp_Gc_7KOLbtyzowPcJUc3SG_G25SJp0fbTmE"; // An example process
const moduleId = "QSBQZsowVRdvsEbdTv-KEF4_Z5bYf11M3X5-8LN0NM4"; // The example sum.lua script
const hyperbeam = "forward.computer";

async function getDynamicState() {
  const url = `https://${hyperbeam}/${processId}~process@1.0/now/~lua@5.3a&module=${moduleId}/sum/serialize~json@1.0`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(`Total Supply: ${data.circulatingsupply}`);
  console.log(`Token Holders: ${data.balancecount}`);
}

getDynamicState();
```

This approach significantly improves performance by offloading computation from the client to the HyperBEAM node and reducing the amount of data sent over the network.
