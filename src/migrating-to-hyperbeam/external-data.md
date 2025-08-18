# External Data

HyperBEAM provides oracle functionality through its resolve mechanism, enabling AO processes to fetch and consume external data from web APIs. This creates a trustless bridge between on-chain processes and off-chain data sources.

The oracle service works by taking a base message and combining it with external data fetched via HTTP requests. This "resolve" operation allows your AO processes to react to real-world data, price feeds, weather information, or any other web-accessible API.

## Key Concepts

- **Oracle Requests**: Fetch external data through HTTP calls to any web API
- **Trustless Execution**: Results are delivered directly to your process with cryptographic guarantees
- **Relay Device**: The `~relay@1.0` device acts as the oracle gateway to external services

## Making Oracle Requests

The oracle service allows your process to query any web API and receive the response directly. Here's how to use it:

### Basic HTTP Request Example

To fetch information from an Arweave node:

```lua
Send({
    target = ao.id,
    ["relay-path"] = "https://arweave.net/info",
    resolve = "~relay@1.0/call"
})
```

This code:

- Sets the target to `ao.id` (the current process) to receive the response
- Specifies the external URL to query via `relay-path`
- Uses the `resolve` property with `~relay@1.0/call` to execute the HTTP request

### Managing Trust

When working with HyperBeam nodes, you may need to establish trust by adding the node's address to your authorities:

```lua
table.insert(ao.authorities, "HYPERBEAM_NODE_ADDRESS")
```

If you receive a "not trusted" response, this step is required before the resolve operation can succeed.

### Accessing Response Data

After a successful resolve operation, you can access the response data from your inbox:

```lua
Inbox[3].Data
```

This will display the JSON data returned from the external API.

### Additional Example: JSON Placeholder API

You can query any REST API using the same pattern:

```lua
Send({
    target = ao.id,
    ["relay-path"] = "https://jsonplaceholder.typicode.com/posts",
    resolve = "~relay@1.0/call"
})
```

## Technical Details

The resolve mechanism works by:

1. Creating a base message with the target and relay path
2. Specifying the resolve function to use (in this case, the relay device's call function)
3. Executing the HTTP request through the relay device
4. Returning the response as a new message to the specified target

## Common Oracle Use Cases

- **Price Feeds**: Fetch cryptocurrency or asset prices for DeFi applications
- **Weather Data**: Build parametric insurance or prediction markets
- **Sports Results**: Create betting or fantasy sports applications
- **Random Numbers**: Access external randomness for games or lotteries
- **IoT Data**: Integrate real-world sensor data into smart contracts
- **News & Events**: React to real-world events in your processes

## Security Considerations

Always ensure that HyperBeam nodes are trusted before using them for resolve operations. Add node addresses to your `ao.authorities` table to establish trust.
