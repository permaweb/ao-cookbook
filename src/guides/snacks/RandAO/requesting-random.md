---
prev:
  text: "RandAO"
  link: "/guides/snacks/RandAO/index"
---

# Random Number Requests

In this tutorial, we'll learn how to request random numbers from the RandAO protocol.

## Prerequisites

- Some RandAO tokens (100 base units per request)
  - To get some tokens shoot our team a DM on Discord (https://discord.gg/sustb26z) or check out the faucet (coming soon)

## Install AO Package Manager

Install apm, the ao package manager so we can add a helper module to make it easier to work with RandAO.

```lua
.load-blueprint apm
```

## Install Random package

Random is a module that provides functions to work with the RandAO protocol.

https://apm_betteridea.g8way.io/pkg?id=@randao/random

```lua
apm.install('@randao/random')
```

## Setting Up

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

- Each random number request costs **100 RandAO token base units**
- The typical response time is currently **Sub 10 seconds and increasing weekly as mainnet approaches**
- Always store your `callbackId` to track your request status
- Use the [Request Verification](./post-request.md) guide to check request status
- Check out the example projects on our [github](https://github.com/RandAOLabs/Random-Module/tree/main/examples) to get some inspiration for your next project

## Next Steps

Learn how to verify and track the status of your random number requests in the [Request Verification](./post-request.md) guide.
