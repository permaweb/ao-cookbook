# FAQ

## Ownership

<details>
  <summary><strong>Understaning Process Ownership</strong></summary>

When you spawn a process, or start a new process with the aos console, the ownership is set to your wallet. aos uses **Owner** global variable to define the ownership of the process. If you wish to transfer ownership or lock the process, you simply modify the owner to another wallet address or set it to **nil** or **undefined**.

</details>

## JSON

<details>
  <summary><strong>encoding data as json</strong></summary>
  
  When sending data to another process or an external service, you may want to use JSON as a way to encode the message in a format that can be transalated back to lua tables. Using the json module in lua, you can encode and decode pure value tables.

```lua
Send({Target = Router, Data = require('json').encode(myData)})
```

</details>

## Send vs ao.send

<details>
  <summary><strong>When to use Send vs ao.send</strong></summary>

Both functions send a message to a process, the difference is ao.send returns the message, in case you want to log it or troubleshoot. The **Send** function is intended to be used in the console for easier access. It is preferred to use **ao.send** in the **handlers**.

</details>
