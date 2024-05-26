# 调用 DryRun

DryRun 是将消息对象发送到特定进程并获取返回的结果对象的过程，但内存不会被保存，这非常适合创建一个读取消息以返回内存的当前值。例如，一个代币的余额，或者一个转账的结果等。你可以使用 DryRun 来获取输出，而无需发送实际消息

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