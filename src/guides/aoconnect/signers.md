---
prev:
  text: "Sending Messages"
  link: "/guides/aoconnect/sending-messages"

next: false
---

# DataItem Signers

Every message sent to AO MUST be signed, aoconnect provides a helper function for signing messages or spawning new processes. This helper function `createDataItemSigner` is provided for arweave wallets. But you can create your own `Signer` instance too.

## What is a Wallet/Keyfile?

A wallet/keyfile is a public/private key pair that can be used to sign and encrypt data.

## What is an ao message/dataItem?

You often see the terms `message` and `dataItem` used interchangeably in the documentation, a message is a data-protocol type in ao that uses the dataItem specification to describe the messages intent. A dataItem is defined in the `ANS-104` bundle specification. A dataItem is the preferred format of storage for arweave bundles. A bundle is a collection of these signed dataItems. A message implements specific tags using the dataItem specification. When developers send messages to ao, they are publishing dataItems on arweave.

> 🎓 To learn more about messages [click here](/concepts/messages) and to learn more about ANS-104 dataItems [click here](https://specs.g8way.io/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw)

## What is a signer?

A signer is function that takes `data, tags, anchor, target` and returns an object of `id, binary` representing a signed dataItem. AO accepts arweave signers and ethereum signers. `createDataItemSigner` is a helper function that can take an arweave keyfile or a browser instance of an arweave wallet usually located in the global scope of the browser, when I user connects to a wallet using an extension or html app.

## Examples

arweave keyfile

> NOTE: if you do not have a wallet keyfile you can create one using `npx -y @permaweb/wallet > wallet.json`

```js
import * as WarpArBundles from "warp-arbundles";

const pkg = WarpArBundles.default ? WarpArBundles.default : WarpArBundles;
const { createData, ArweaveSigner } = pkg;

function createDataItemSigner(wallet) {
  const signer = async ({ data, tags, target, anchor }) => {
    const signer = new ArweaveSigner(wallet);
    const dataItem = createData(data, signer, { tags, target, anchor });
    return dataItem.sign(signer).then(async () => ({
      id: await dataItem.id,
      raw: await dataItem.getRaw(),
    }));
  };

  return signer;
}
```

arweave browser extension

> NOTE: This implementation works with [ArweaveWalletKit](https://docs.arweavekit.com/wallets/wallet-kit), [ArConnect](https://www.arconnect.io/), and [Arweave.app](https://jfbeats.github.io/ArweaveWalletConnector/)

```js
import { Buffer } from "buffer/index.js";
import * as WarpArBundles from "warp-arbundles";

if (!globalThis.Buffer) globalThis.Buffer = Buffer;
const { DataItem } = WarpArBundles;

function createDataItemSigner(arweaveWallet) {
  /**
   * createDataItem can be passed here for the purposes of unit testing
   * with a stub
   */
  const signer = async ({
    data,
    tags,
    target,
    anchor,
    createDataItem = (buf) => new DataItem(buf),
  }) => {
    /**
     * signDataItem interface according to ArweaveWalletConnector
     *
     * https://github.com/jfbeats/ArweaveWalletConnector/blob/7c167f79cd0cf72b6e32e1fe5f988a05eed8f794/src/Arweave.ts#L46C23-L46C23
     */
    const view = await arweaveWallet.signDataItem({
      data,
      tags,
      target,
      anchor,
    });
    const dataItem = createDataItem(Buffer.from(view));
    return {
      id: await dataItem.id,
      raw: await dataItem.getRaw(),
    };
  };

  return signer;
}
```

ethereum key

```js
import { EthereumSigner, createData } from "@dha-team/arbundles";

function createDataItemSigner(wallet) {
  const signer = async ({ data, tags, target, anchor }) => {
    const signer = new EthereumSigner(wallet);
    const dataItem = createData(data, signer, { tags, target, anchor });
    return dataItem.sign(signer).then(async () => ({
      id: await dataItem.id,
      raw: await dataItem.getRaw(),
    }));
  };

  return signer;
}
```

## Summary

Using the signer function developers can control how dataItems are signed without having to share the signing process with aoconnect.
