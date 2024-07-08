# 连接到特定的 ao 节点

在你的代码中包含 **aoconnect** 时，你可以连接到特定的 MU（消息单元）和 CU（计算单元），并能够指定一个 Arweave 网关。这可以通过导入 `connect` 函数并从对 `connect` 函数的调用中提取函数来完成。

你希望了解在发送你的消息时调用了哪个 MU，以便稍后可以从指定的 MU 进行调试。你也可能想要从特定的 CU 读取结果。事实上，你可能出于某种其他原因偏好某个特定的 MU 和 CU。你可以指定其他的网关，默认的网关是即 ：arweave.net

## aoconnect 的导入

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

## 连接到特定的 MU、CU 和网关

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

<strong>连接的这三个参数都是可选的，仅指定 1 个或 2 个，或者不指定都是有效的。例如，你可以仅传入 MU_URL。</strong>

```js
import { connect } from "@permaweb/aoconnect";

const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect(
  {
    MU_URL: "https://ao-mu-1.onrender.com",
  },
);
```
