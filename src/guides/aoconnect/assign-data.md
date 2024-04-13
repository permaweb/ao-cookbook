# Sending an Assignment to a Process

Assignments can be used to load Data from another Message into a Process. Or to not duplicate Messages. You can create one Message and then assign it to any number of processes. This will make it available to the Processes you have sent an Assignment to.

## Sending an Assignment in NodeJS

```js
import { readFileSync } from "node:fs";

import { assign } from "@permaweb/aoconnect";

await assign({
  process: "process-id",
  message: "message-id",
})
  .then(console.log)
  .catch(console.error);
```
