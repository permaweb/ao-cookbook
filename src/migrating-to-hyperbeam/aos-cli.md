# AOS CLI

Use the `aos` command-line interface to spawn and connect to processes on HyperBEAM mainnet.

## Understanding Legacy vs. HyperBEAM

AO is currently maintaining two networks during the transition to HyperBEAM:

- **Legacy Network (aos)**: The current stable network that most existing processes run on
- **HyperBEAM Mainnet (hyper-aos)**: The new high-performance network being built out

HyperAOS represents the future direction of AOS on HyperBEAM, offering improved performance and new capabilities.

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

## Choosing Your Network

After installing `aos`, when you spawn a new process you'll be presented with a selection menu:

```bash
aos myProcess
```

You'll see:

```
? Please select › - Use arrow-keys. Return to submit.
❯   aos
    hyper-aos (experimental - DO NOT USE FOR PRODUCTION)
```

### Legacy Network Process (aos)

Select `aos` to spawn a process on the legacy network (default). This creates a standard AO process on the existing stable network, compatible with all current tooling and processes.

### HyperBEAM Process (hyper-aos)

Select `hyper-aos` to spawn a process directly on HyperBEAM. This is marked as **experimental** and should not be used for production workloads while HyperBEAM mainnet is being built out.

:::warning Important
The `hyper-aos` option is experimental and actively under development. Use `aos` (legacy network) for production processes.
:::

### Connecting to a Specific HyperBEAM Node

You can also connect directly to a specific HyperBEAM node:

```bash
aos --url "https://forward.computer" myMainnetProcess
```

This connects you to an interactive Lua environment running within a **process** on the HyperBEAM network at the specified URL.

:::info Running a Local HyperBEAM Node
If you are running HyperBEAM locally and want to use that node when booting up `aos`, you must first start your local node with the genesis_wasm profile:

```bash
rebar3 as genesis_wasm shell
```

Then, you can connect `aos` to it:

```bash
aos --url "http://localhost:8734" myLocalProcess
```

Until `aos` is fully HyperBEAM native, the genesis_wasm profile is required to run a local Compute Unit (CU) for executing `aos`.
:::

## Interacting with Mainnet Processes

:::warning Note on Blocking Calls
Blocking message patterns, such as `Receive` and `ao.send().receive()`, are not available when running `aos` against a HyperBEAM process. HyperBEAM processes do not support the underlying `wasm` modules required for this functionality. You should rely on asynchronous patterns using handlers instead.
:::
