# AO Core Payment Relays

Mainnet AO Core is a foundational framework designed for developers to build decentralized, permanent applications on blockchain infrastructure. It provides tools and APIs to interact with the mainnet and manage onchain data efficiently. Phase 1 of Mainnet AO Core is processing payments, this is available today in relay mode via HyperBEAM nodes, which act as payment gateways to AO.

## Prerequisites

1. Install **Node.js** (version 20+ recommended).
2. Install **npm** or **yarn** for package management.

## Installation

Install the **Mainnet AO Core** and its CLI tool globally by running:

```bash
npm install -g https://get_ao.g8way.io
```

This will install the **AOS Console**, a command-line tool for managing and interacting with Mainnet AO Core.

## Usage

#### Using a relay

The AOS Console allows you to configure and use a relay for sending messages through Mainnet AO Core.

To use a relay, use the following command in the AOS Console:

```bash
aos <name or process_id> --wallet <path_to_wallet> --relay <relay_url>
```

Replace:

- `<name or process_id>`: A human-readable name for the new process you want to spawn, or an existing process ID that you want to connect to.
- `<path_to_wallet>`: Path to the wallet that owns or will own this process.
- `<relay_url>`: The URL of your relay node (e.g., `http://relay.ao-hb.xyz`).

#### Payments

Relays will charge for usage of the node. If you are attempting to access a node that does not hold funds transferred from you, then you will be prompted to top up before continuing.

When you access AOS in relay mode, `--relay <relay_url>` you will be able to see the associated wallet address. If this wallet address does not hold any of the tokens needed to access this node (by default AO), you will have to transfer some to them. Only a small amount is needed to send messages through the relayer.

1. Transfer some AO (0.0000001 is enough) to the wallet that you will use in AOS.

   - `Send({ Target = AO_TOKEN, Action = 'Transfer', Quantity = '1000000', Recipient = WALLET_ADDRESS })`

2. Spawn a new process or connect to an existing one in relay mode.
   - `aos my-new-process --wallet wallet.json --relay http://relay.ao-hb.xyz`
3. If you have not yet topped up with this node, AOS will prompt you to transfer some tokens to the relay. In order to continue you must enter **Yes** and then choose an amount (0.0000001 AO is the default and is enough to get started, but you can enter more to top up less frequently).
4. At this point AOS will handle the transfer to the relay and you will now be able to start sending messages.

::: info
Note that `Quantity` is the amount of Armstrongs to send, not $AO. One AO is one trillion Armstrongs, so 1,000,000 Armstrongs = 0.000001 AO.
:::
