# Accessing Data from Arweave with ao

There may be times in your ao development workflow that you want to access data from arweave. With ao your process can send a message instructing the network to provide that data to your Process in a Message.

In order, to request data from arweave, you simply include a `Tag` called `Load`, in this tag you supply the TXID of the data you would like to retrieve.

```lua

Send({
  Target = ao.id,
  Tags = {
    Load = "WFM_Mi2FUNGCeP7r99XyeE3ySurt07LHxEGfW-wuIdY",
    Action = "Data"
  }
})

```

This message will get processed and when it arrives in the Process, it will have a DataItem references by the `Data` property on the incoming message. Also the `Data` of the DataItem will be passed as base64.

```lua
{
  Owner = "[Owner Address]"
  Target = "[Process Identifier]",
  Data = {
    Owner = "xDKpdiZ7H9n_SsdX_CMpkybMGIdin5AUciM00mQgxRE",
    Tags = {
      "Content-Type": "application/json"
    },
    Data = "[base64]",
    ...
  }
  ...
}

```

In lua, you can decode your data from base64 to its original format using the ".base64" module.

```lua
local base64 = require(".base64")


local data = base64.decode(Msg.Data.Data)
```

## Why data from Arweave?

Your Process may need to access data to make a decision about something, or you may want to add features to your Process via the `data` load feature.
