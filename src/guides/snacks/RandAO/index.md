---
prev:
  text: "Bots and Games"
  link: "/guides/aoconnect/monitoring-cron"
next:
  text: "Random Number Requests"
  link: "/guides/snacks/RandAO/requesting-random"
---

# RandAO 🎲

RandAO is a decentralized random number generator (RNG) built on `ao`. It provides verifiable, tamper-resistant randomness for decentralized applications through a token-backed protocol.

## Overview

The RandAO module enables your `ao` process to:

1. **Request Random Values**: Generate secure random numbers by sending RandAO tokens to the randomness protocol
2. **Track Request Status**: Monitor the status of your randomness requests through a callback system
3. **Custom Provider Pools**: Optionally specify your own list of randomness providers

## Key Features

- **Pure Lua Implementation**: Built specifically for the AO platform with no external dependencies
- **Token-Backed Security**: Uses RandAO tokens to ensure secure and reliable random number generation
- **Asynchronous Operations**: Non-blocking requests with status tracking
- **Provider Flexibility**: Use the default provider pool or specify your own trusted providers
- **Quick Resolution**: Response time of <10 seconds, improving with network updates as mainnet approaches

## Example Projects

Check out our [example projects](https://github.com/RandAOLabs/Random-Module/tree/main/examples) on GitHub to get some inspiration for your next project.

## Next Steps

- [Random Number Requests](./requesting-random.md): Learn how to request and receive random numbers

> Learn more about interacting with the RandAO protocol through the [developer docs](https://github.com/RandAOLabs/Random-Module) or our [provider docs](https://providers_randao.arweave.net/)
