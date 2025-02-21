# Accessing Data from Arweave with ao

There may be times in your ao development workflow that you want to access data from Arweave. With ao, your process can send an assignment instructing the network to provide that data to your Process.

To request data from Arweave, you simply call `Assign` with a list of every `Process` you would like to assign the data to, along with a `Message`, which is the TxID of a Message.

```lua
Assign({
  Processes = { ao.id },
  Message = 'message-id'
})

```

You can also call `Send` with a table of process IDs in the `Assignments` parameter. This will tell the network to generate the Message and then assign it to all of the process IDs in the `Assignments` list.

```lua
Send({
  Target = ao.id,
  Data = 'Hello World',
  Assignments = { 'process-id-1', 'process-id-2' }
})
```

## Why data from Arweave?

Your Process may need to access data from a message to make a decision about something, or you may want to add features to your Process via the data load feature. Alternatively, you may want to access a message from a process without replicating the entire message.
