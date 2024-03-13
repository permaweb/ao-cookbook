# 调用 DryRun

DryRun 是将消息对象发送到特定进程并获取返回的结果对象的过程，但内存不会被保存，这非常适合创建一个读取消息以返回内存的当前值。例如，一个代币的余额，或者一个转账的结果等。您可以使用 DryRun 来获取输出，而无需发送实际消息

```js
import { createDataItemSigner, dryrun } from "@permaweb/aoconnect";

const result = await dryrun({
  process: 'PROCESSID',
  data: '',
  tags: [{name: 'Action', value: 'Balance'},
  anchor: '1234',
  ...rest are optional (Id, Owner, etc)
});

console.log(result.Messages[0]);
```
