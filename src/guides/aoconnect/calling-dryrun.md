# Calling DryRun

DryRun is the process of sending a message object to a specific process and getting the Result object back, but the memory is not saved, it is perfect to create a read message to return the current value of memory. For example, a balance of a token, or a result of a transfer, etc. You can use DryRun to obtain an output without sending an actual message.


ProcessTxId: My token process tx id
TargetTxId: Token process tx id

```js
import { createDataItemSigner, dryrun } from "@permaweb/aoconnect";

const resultBalance = await dryrun({
    Owner: ProcessTxId,
    process: TargetTxId,
    data: null,
    tags: [
        { name: 'Action', value: 'Balance' },
        { name: 'Target', value: ProcessTxId },
        { name: 'Data-Protocol', value: 'ao' },
        { name: 'Type', value: 'Message' },
        { name: 'Variant', value: 'ao.TN.1' }
    ]
});
console.log(resultBalance.Messages[0]);

const resultBalances = await dryrun({
    Owner: TargetTxId,
    process: TargetTxId,
    data: null,
    tags: [
        { name: 'Action', value: 'Balances' },
        { name: 'Target', value: TargetTxId },
        { name: 'Data-Protocol', value: 'ao' },
        { name: 'Type', value: 'Message' },
        { name: 'Variant', value: 'ao.TN.1' }
    ]
});
console.log(resultBalances.Messages[0]);

const resultInfo = await dryrun({
    Owner: TargetTxId,
    process: TargetTxId,
    data: null,
    tags: [
        { name: 'Action', value: 'Info' },
        { name: 'Target', value: TargetTxId },
        { name: 'Data-Protocol', value: 'ao' },
        { name: 'Type', value: 'Message' },
        { name: 'Variant', value: 'ao.TN.1' }
    ]
});
console.log(resultInfo.Messages[0]);


```