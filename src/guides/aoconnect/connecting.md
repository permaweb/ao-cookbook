# Connecting to specific ao nodes

When including ao connect in your code you have the ability to connect to a specific MU and CU, as well as being able to specify an Arweave gateway. This can be done by importing the "connect" function and extracting the functions from a call to the "connect" function.

You may want to do this if you want to know which MU is being called when you send your message so that later you can debug from the specified MU. You also may want to read a result from a specific CU. You may in fact just prefer a particular MU and CU for a different reason. You can specify the gateway in order to use something other than the default, which is arweave.net.

## Importing without a call to connect

```js
// Here aoconnect will implicitly use the default nodes/units
import {
  result,
  results,
  message,
  spawn,
  monitor,
  unmonitor,
  dryrun,
} from "@permaweb/aoconnect";
```

## Connecting to a specific MU, CU, and gateway

```js
import { connect } from "@permaweb/aoconnect";

const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect(
  {
    MU_URL: "https://mu.ao-testnet.xyz",
    CU_URL: "https://cu.ao-testnet.xyz",
    GATEWAY_URL: "https://arweave.net",
  },
);

// now spawn, message, and result can be used the same way as if they were imported directly
```

<br>

<strong>All three of these parameters to connect are optional and it is valid to specify only 1 or 2 of them, or none. You could pass in just the MU_URL, for example.</strong>

```js
import { connect } from "@permaweb/aoconnect";

const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect(
  {
    MU_URL: "https://ao-mu-1.onrender.com",
  },
);
```
