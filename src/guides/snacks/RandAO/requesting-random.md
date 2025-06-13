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

## Important Notes

- Each random number request costs **1 RNG Token**
- The typical response time is currently **Sub 5 seconds and decreasing weekly as mainnet approaches**
- Always store your `callbackId` to track your request status and to use the value once returned
- Check out the example projects on our [github](https://github.com/RandAOLabs/Random-Module/tree/main/examples) to get some inspiration for your next project
