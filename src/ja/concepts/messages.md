<!-- # Messages

The Message serves as the fundamental data protocol unit within ao, crafted from [ANS-104 DataItems](https://specs.g8way.io/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw), thereby aligning with the native structure of Arweave. When engaged in a Process, a Message is structured as follows: -->

# メッセージ

メッセージは、ao内の基本的なデータプロトコル単位として機能し、[ANS-104 DataItems](https://specs.g8way.io/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw)から作成されているため、Arweaveのネイティブな構造と一致しています。プロセス内で使用される場合、メッセージは次のように構成されます：

```lua
{
    Cron = false,
    Data = "Hello aos",
    Epoch = 0,
    From = "5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs",
    Id = "ayVo53qvZswpvxLlhMf8xmGjwxN0LGuHzzQpTLT0_do",
    Nonce = 1,
    Owner = "z1pq2WzmaYnfDwvEFgUZBj48anUsxxN64ZjbWOsIn08",
    Signature = "...",
    Tags = {
        Type = "Message",
        Variant = "ao.TN.1",
        ["Data-Protocol"] = "ao",
        ["From-Module"] = "lXfdCypsU3BpYTWvupgTioLoZAEOZL2_Ihcqepz6RiQ",
        ["From-Process"] = "5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs"
    },
    Target = "5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs",
    Timestamp = 1704936415711,
    ["Block-Height"] = 1340762,
    ["Forwarded-By"] = "z1pq2WzmaYnfDwvEFgUZBj48anUsxxN64ZjbWOsIn08",
    ["Hash-Chain"] = "hJ0B-0yxKxeL3IIfaIIF7Yr6bFLG2vQayaF8G0EpjbY"
}
```

このアーキテクチャは、Assignment Type（割り当てタイプ）とMessage Type（メッセージタイプ）を統合し、プロセスがメッセージのコンテキストを包括的に理解し、効果的に処理できるようにします。

メッセージを送信する際、メッセージがaoコンピュータ内をどのように移動するかを示したビジュアルダイアグラムです。

![Message Workflow](message-workflow-diagram.png)

メッセージワークフローは、MU（Messenger Unit）でメッセージの署名が認証されるところから始まります。その後、SU（Scheduler Unit）がメッセージにEpochとNonceを割り当て、メッセージをAssignment Type（割り当てタイプ）と一緒にバンドルし、Arweaveに送信します。その後、`aoconnect`ライブラリがCU（Compute Unit）から結果を取得します。CUは、現在のMessage IDに至るまでのすべてのメッセージをSU（Scheduler Unit）から取得し、それらを処理して結果を導き出します。処理が完了すると、計算結果は`aoconnect`に返され、これは`aos`などのクライアントインターフェイスに統合されています。

## Ethereum署名メッセージ

メッセージがEthereumキーを使用して署名された[ANS-104 DataItem](https://specs.g8way.io/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw)である場合、  
`Owner`および`From`フィールドの値は、署名者の[EIP-55](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md)形式のEthereumアドレスになります。  
例えば：`0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359`

## まとめ

メッセージは、aoネットワークの主要なデータプロトコルタイプとして機能し、ArweaveのネイティブであるANS-104データアイテムを活用します。メッセージは、データコンテンツ、送信元、送信先、署名やノンスなどの暗号化要素を含むいくつかのフィールドを持っています。ワークフローは、Messenger Unit（MU）から始まり、ここで署名が確認され、Scheduler Unit（SU）を通過してタイムスタンプとシーケンスが割り当てられた後、Arweaveにバンドルされて公開されます。その後、`aoconnect`ライブラリがCompute Unit（CU）から結果を読み取り、メッセージを処理して結果を計算し、`aoconnect`を通じてクライアント（`aos`など）に返送します。CUは、これらのプロセスの実行環境です。

<!--
This architecture merges the Assignment Type with the Message Type, granting the Process a comprehensive understanding of the Message's context for effective processing.

When sending a message, here is a visual diagram of how the messages travels through the ao computer.

![Message Workflow](message-workflow-diagram.png)

The message workflow initiates with the MU (Messenger Unit), where the message's signature is authenticated. Following this, the SU (Scheduler Unit) allocates an Epoch and Nonce to the message, bundles the message with an Assignment Type, and dispatches it to Arweave. Subsequently, the `aoconnect` library retrieves the outcome from the CU (Compute Unit). The CU then calls for all preceding messages leading up to the current Message Id from the SU (Scheduler Unit), processes them to deduce the result. Upon completion, the computed result is conveyed back to `aoconnect`, which is integrated within client interfaces such as `aos`.

## Ethereum Signed Message

If the Message [ANS-104 DataItem](https://specs.g8way.io/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw) was signed using Ethereum keys,
then the value in the `Owner` and `From` fields will be the
[EIP-55](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) Ethereum address of the signer.
For example: `0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359`.

## Summary

Messages serve as the primary data protocol type for the ao network, leveraging ANS-104 Data-Items native to Arweave. Messages contain several fields including data content, origin, target, and cryptographic elements like signatures and nonces. They follow a journey starting at the Messenger Unit (MU), which ensures they are signed, through the Scheduler Unit (SU) that timestamps and sequences them, before being bundled and published to Arweave. The `aoconnect` library then reads the result from the Compute Unit (CU), which processes messages to calculate results and sends responses back through `aoconnect`, utilized by clients such as `aos`. The CU is the execution environment for these processes. -->
