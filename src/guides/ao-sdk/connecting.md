# Connecting to specific ao nodes

When including the ao-sdk in your code you have the ability to connect to a specific MU and CU, as well as being able to specifiy an Arweave gateway. This can be done by importing the "connect" function and extracting the SDK functions from a call to "connect".

You may want to do this if you want to know which MU is being called when you send your message so that later you can debug from the specified MU. You also may want to read a result from a specific CU. You may in fact just prefer a particular MU and CU for a different reason. You can specify the gateway in order to use a gateway other than the default which is arweave.net.

## Importing without a call to connect

```js
import { spawn, message, result } from "@permaweb/ao-sdk";
```

## Connecting to a specific MU, CU, and gateway

```js
import { connect } from "@permaweb/ao-sdk";

const { spawn, message, result } = connect({
  MU_URL: "https://ao-mu-1.onrender.com",
  CU_URL: "https://ao-cu-1.onrender.com",
  GATEWAY_URL: "https://g8way.io",
});

// now spawn, message, and result can be used the same way as if they were imported directly
```

<br>

All three of these parameters to connect are optional and it is valid to specify only the MU_URL, for example

```js
import { connect } from "@permaweb/ao-sdk";

const { spawn, message, result } = connect({
  MU_URL: "https://ao-mu-1.onrender.com",
});
```
