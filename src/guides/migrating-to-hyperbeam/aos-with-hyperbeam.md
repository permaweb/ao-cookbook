# Connecting to HyperBEAM with `aos`

This guide explains how to use `aos`, the command-line interface for AO, to connect to a HyperBEAM node for development.

## Installing `aos`

The primary tool for interacting with AO and developing processes is `aos`, a command-line interface and development environment.

::: code-group

```bash [npm]
npm i -g https://get_ao.arweave.net
```

```bash [pnpm]
pnpm add -g https://get_ao.arweave.net
```

```bash [bun]
# Bun is not supported yet
# bun install -g https://get_ao.arweave.net
```

:::

## Connecting to a HyperBEAM Node

While you don't need to run a HyperBEAM node yourself, you do need to connect to one to interact with the network during development.

To start `aos` and connect to a public HyperBEAM node, simply run the command in your terminal:

```bash
aos --mainnet "https://forward.computer" myMainnetProcess
```

This connects you to an interactive Lua environment running within a **process** on the AO network. This process acts as your command-line interface (CLI) to the AO network. When you specify `--mainnet <URL>`, it connects to the `genesis_wasm` device running on the HyperBEAM node at the supplied URL, allowing you to interact with other processes, manage your wallet, and develop new AO processes.

:::info Running a Local HyperBEAM Node
If you are running HyperBEAM locally and want to use that node when booting up `aos`, you must first start your local node with the genesis_wasm profile:

```bash
rebar3 as genesis_wasm shell
```

Then, you can connect `aos` to it:

```bash
aos --mainnet "http://localhost:8734" myLocalProcess
```

Until `aos` is fully HyperBEAM native, the genesis_wasm profile is required to run a local Compute Unit (CU) for executing `aos`.
:::

## Interacting with Mainnet Processes

:::warning Note on Blocking Calls
Blocking message patterns, such as `Receive` and `ao.send().receive()`, are not available when running `aos` against a HyperBEAM process. HyperBEAM processes do not support the underlying `wasm` modules required for this functionality. You should rely on asynchronous patterns using handlers instead.
:::
