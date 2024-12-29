# FAQ

## Ownership

<details>
  <summary><strong>Understanding Process Ownership</strong></summary>

Start a new process with the aos console, the ownership of the process is set to your wallet address. **aos** uses the **Owner** global variable to define the ownership of the process. If you wish to transfer ownership or lock the process so that no one can own, you simply modify the **Owner** variable to another wallet address or set it to **nil**.

</details>

## JSON

<details>
  <summary><strong>encoding data as json</strong></summary>

When sending data to another process or an external service, you may want to use JSON as a way to encode the data for recipients. Using the json module in lua, you can **encode** and **decode** pure lua tables that contain values.

```lua
Send({Target = Router, Data = require('json').encode({hello = "world"})})
```

</details>

## Send vs ao.send

<details>
  <summary><strong>When to use Send vs ao.send</strong></summary>

Both functions send a message to a process, the difference is ao.send returns the message, in case you want to log it or troubleshoot. The **Send** function is intended to be used in the console for easier access. It is preferred to use **ao.send** in the **handlers**. But they are both interchangeable in **aos**.

</details>
