---
prev:
  text: "RandAO"
  link: "/guides/snacks/RandAO/index"
---

# Random Number Requests

In this tutorial, we'll learn how to request random numbers from the RandAO protocol.

## Prerequisites

- Some RandAO tokens (1 Random costs 1 Token)
- To get some tokens head over to the [faucet](https://providers_randao.arweave.net/faucet)

## Install AO Package Manager

Install apm, the ao package manager so we can add a helper module to make it easier to work with RandAO.

```lua
.load-blueprint apm
```

## APM Install Random package

Random is a module that provides functions to work with the RandAO protocol.

https://apm_betteridea.g8way.io/pkg?id=@randao/random

```lua
apm.install('@randao/random')
```

## Manual Set Up

Create a new file named `random-request.lua` in your project directory:

```bash
touch random-request.lua
```

Add the following code to initialize the RandAO module and set up a handler to process random number responses:

```lua
-- Import required modules
json = require('json')
local randomModule = require('@randao/random')(json)

-- Handler for random number responses
Handlers.add(
    "RandomResponse",
    Handlers.utils.hasMatchingTag("Action", "RandomResponse"),
    function(msg)
        -- Process the random module's response
        local callbackId, entropy = randomModule.processRandomResponse(msg.From, msg.Data)
        print("Random Number Received!")
        print("CallbackId: " .. tostring(callbackId))
        print("Entropy: " .. tostring(entropy))

        -- Do something with the random number here!
    end
)
```

## Making Random Number Requests

### Using the Default Provider Pool

The simplest way to request a random number is using the default provider pool:

```lua
-- Generate a unique callback ID
local callbackId = randomModule.generateUUID()

-- Request a random number
randomModule.requestRandom(callbackId)
```

### Using a Custom Provider Pool

For more control, you can specify your own list of providers:

```lua
-- Define your provider list
local providerList = {
    "XUo8jZtUDBFLtp5okR12oLrqIZ4ewNlTpqnqmriihJE",
    "vJnpGjZrOetokWpgV50-xBxanCGP1N9Bjtj-kH1E_Ac",
    "oFmKGpZpBB8TKI3qMyaJduRqe9mJ3kb98lS9xnfsFTA"
}

-- Set the provider list
randomModule.setProviderList(providerList)

-- Generate a unique callback ID
local callbackId = randomModule.generateUUID()

-- Request random from your provider pool
randomModule.requestRandomFromProviders(callbackId)
```

### Prepay for Randomness Credits

```lua
randomModule.prepayForRandom(units)
```

Sends a token transfer to the configured `RandomProcess` to pre-pay for a specified number of future random requests.

- **Arguments**:
  - `units` (number): Number of randomness units to purchase.  
- **Behavior**:
  - Computes `quantity = units * RandomCost` (on-chain value).  
  - Sends a `"Transfer"` action to `RandomProcess` with header `X-Prepayment = "true"`.  

---

### Redeem Random Credit

```lua
randomModule.redeemRandomCredit(callbackId)
-- or
randomModule.redeemRandomCredit(callbackId, providerList)
```

Uses prepaid randomness credits to make a randomness request.

- **Arguments**:
  - `callbackId` (string): Unique identifier to correlate the response.  
  - `providerList` (optional, table of strings): If provided, limits entropy generation to this subset of providers.  
- **Behavior**:
  - If `providerList` is **nil**, sends `Redeem-Random-Credit` with only `CallbackId`.  
  - If provided, includes header `X-Providers = providerList`.  

**Examples**:
```lua
-- Redeem credit without specifying providers:
local tx1 = randomModule.redeemRandomCredit("cb-1234")

-- Redeem credit using a custom provider list:
local providers = {
  "ProviderA_ID",
  "ProviderB_ID"
}
local tx2 = randomModule.redeemRandomCredit("cb-5678", providers)
```

---

## Important Notes

- Each random number request costs **1 RNG Token**
- The typical response time is currently **Sub 5 seconds and decreasing weekly as mainnet approaches**
- Always store your `callbackId` to track your request status and to use the value once returned
- Check out the example projects on our [github](https://github.com/RandAOLabs/Random-Module/tree/main/examples) to get some inspiration for your next project
