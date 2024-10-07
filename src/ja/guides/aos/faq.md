# FAQ

## Ownership

<details>
  <summary><strong>プロセスの所有権を理解する</strong></summary>

aosコンソールで新しいプロセスを開始すると、そのプロセスの所有権はあなたのウォレットアドレスに設定されます。**aos**は、プロセスの所有権を定義するために**Owner**グローバル変数を使用します。所有権を移転したり、誰も所有できないようにプロセスをロックしたい場合は、単に**Owner**変数を別のウォレットアドレスに変更するか、**nil**に設定します。

</details>

## JSON

<!--
# FAQ

## Ownership

<details>
  <summary><strong>Understaning Process Ownership</strong></summary>

Start a new process with the aos console, the ownership of the process is set to your wallet address. **aos** uses the **Owner** global variable to define the ownership of the process. If you wish to transfer ownership or lock the process so that no one can own, you simply modify the **Owner** variable to another wallet address or set it to **nil**.

</details>

## JSON
-->

<details>
  <!-- <summary><strong>encoding data as json</strong></summary> -->
  <summary><strong>データをJSONとしてエンコードする</strong></summary>

<!-- When sending data to another process or an external service, you may want to use JSON as a way to encode the data for recipients. Using the json module in lua, you can **encode** and **decode** pure lua tables that contain values. -->

他のプロセスや外部サービスにデータを送信する際、受取人のためにデータをエンコードする手段としてJSONを使用することができます。Luaのjsonモジュールを使用すると、値を含む純粋なLuaテーブルを**エンコード**および**デコード**できます。

```lua
Send({Target = Router, Data = require('json').encode({hello = "world"})})
```

</details>

## Send vs ao.send

<details>
  <!-- <summary><strong>When to use Send vs ao.send</strong></summary> -->
  <summary><strong>Sendとao.sendの使い分け</strong></summary>

<!-- Both functions send a message to a process, the difference is ao.send returns the message, in case you want to log it or troubleshoot. The **Send** function is intended to be used in the console for easier access. It is preferred to use **ao.send** in the **handlers**. But they are both interchangable in **aos**. -->

<!--
Both functions send a message to a process, the difference is ao.send returns the message, in case you want to log it or troubleshoot. The **Send** function is intended to be used in the console for easier access. It is preferred to use **ao.send** in the **handlers**. But they are both interchangeable in **aos**.
-->

両方の関数はプロセスにメッセージを送信しますが、ao.sendはメッセージを返すため、ログを記録したりトラブルシューティングを行いたい場合に便利です。**Send**関数は、コンソールでのアクセスを容易にするために使用されることを意図しています。**Handlers**内では**ao.send**を使用することが推奨されますが、どちらも**aos**内では互換性があります。

</details>
