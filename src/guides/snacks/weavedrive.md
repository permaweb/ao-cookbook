---
prev:
  text: "Guides"
  link: "/guides/index"

next: false
---

# Using WeaveDrive

WeaveDrive has been released on AO legacynet, which is great! But how to use it with your process? This post aims to provide a step by step guide on how to use WeaveDrive in your AOS process.

The current availability time is called `Assignments` and this type puts WeaveDrive in a mode that allows you to define an Attestor wallet address when you create your AOS process. This will enable the process to load data from dataItems that have a Attestation created by this wallet.

## Prep Tutorial

In order, to setup the tutorial for success we need to upload some data and upload an attestation. It will take a few minutes to get mined into a block on arweave.

Install `arx`

```sh
npm i -g @permaweb/arx
```

Create a wallet

```
npx -y @permaweb/wallet > ~/.test-wallet.json
```

Create some data

```
mkdir test-weavedrive
cd test-weavedrive
echo "<h1>Hello WeaveDrive</h1>" > data.html
arx upload data.html -w ~/.test-wallet.json -t arweave
```

You should get a result like:

```
Loaded address: vfSWG3girEwCBggs9xeztuRyiltsT2CJH_m-S8A58yQ
Uploaded to https://arweave.net/9TIPJD2a4-IleOQJzRwPnDHO5DA891MWAyIdJJ1SiSk
```

Create Attestation

> It is important to copy the id of the uploaded dataItem, in the above case `9TIPJD2a4-IleOQJzRwPnDHO5DA891MWAyIdJJ1SiSk` as your Message Value.

```
echo "attestation-example" > att.txt
arx upload att.txt -w ~/.test-wallet.json -t arweave --tags Data-Protocol ao Type Attestation Message 9TIPJD2a4-IleOQJzRwPnDHO5DA891MWAyIdJJ1SiSk
```

:clap: Awesome! That will take a few minutes to get mined on arweave, once it is mined then we will be able to read the data.html dataItem using WeaveDrive

## Enable WeaveDrive in a process

Lets create a new AOS process with WeaveDrive enabled and the wallet we created above as an Attestor.

> NOTE: it is important to use the same wallet address that was used to sign the attestation data-item.

```
aos test-weavedrive --tag-name Extension --tag-value WeaveDrive --tag-name Attestor --tag-value vfSWG3girEwCBggs9xeztuRyiltsT2CJH_m-S8A58yQ --tag-name Availability-Type --tag-value Assignments
```

> NOTE: It does take a few minutes for the data to get 20 plus confirmations which is the threshold for data existing on arweave. You may want to go grab a coffee. :coffee:

## Install apm and WeaveDrive

```
.load-blueprint apm
apm.install('@rakis/WeaveDrive')
```

## Load Data

```
Drive = require('@rakis/WeaveDrive')
Drive.getData("9TIPJD2a4-IleOQJzRwPnDHO5DA891MWAyIdJJ1SiSk")
```
