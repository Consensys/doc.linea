---
title: Irys quickstart
image: /img/socialCards/irys-quickstart.jpg
description: Creating permanent data using Irys SDK.
---

All uploads to Irys' mainnet are stored permanently onchain. They are guaranteed to be retrievable now and
hundreds of years into the future.

- To upload data, use the Irys [SDK](#sdk) or [CLI](#cli).
- To [download data](#downloading-data), use the Irys gateway.

## Irys SDK

### Install the SDK

Install using npm:

```bash
npm install @irys/sdk
```

or yarn:

```bash
yarn add @irys/sdk
```

### Import from the SDK

```ts
import Irys from "@irys/sdk";
```

### Connect to Irys

Irys has two networks:

- `mainnet`: Uploads are permanent. Pay using [Linea Mainnet ETH](https://docs.linea.build/use-mainnet/fund).
- `devnet`: Uploads are kept for ~60 days. Pay using [Linea Sepolia ETH](https://docs.linea.build/use-mainnet/fund).

#### On the server

When connecting to Irys on the server, provide a private key linked to a wallet funded with `linea-eth`. This wallet will be used to pay for uploads and to sign transactions.

```js
const getIrys = async () => {
  // One of https://docs.linea.build/build-on-linea/tooling/node-providers#public-rpc-endpoints
  const providerUrl = "https://rpc.sepolia.linea.build";

  const irys = new Irys({
    network: "devnet", // "mainnet" or "devnet"
    token: "linea-eth",
    key: process.env.PRIVATE_KEY, // Linea private key
    config: { providerUrl }, // Optional provider URL, only required when using Devnet
  });
  return irys;
};
```

#### In the browser

When using Irys in the browser, the wallet browser extension injects a signer into the browser. This signer is used to pay for uploads and sign transactions.

Irys supports:

- Ethers v5
- Ethers v6
- Viem v2

Additionally, these can be [used with extra setup code](https://docs.irys.xyz/developer-docs/irys-sdk/irys-in-the-browser):

- Privy
- Othent

```js
const getWebIrys = async () => {
  // Ethers5 provider
  await window.ethereum.enable();
  const provider = new providers.Web3Provider(window.ethereum);

  // Only required when connecting to devnet
  // One of https://docs.linea.build/build-on-linea/tooling/node-providers#public-rpc-endpoints
  const rpcUrl = "https://rpc.sepolia.linea.build";

  // Provider type
  const name = "ethersv5"; // "ethersv5" || "ethersv6" || "viemv2"

  const wallet = { rpcUrl, name, provider };
  const webIrys = new WebIrys({
    network: "devnet", // "mainnet" || "devnet"
    token: "linea-eth",
    wallet,
  });
  await webIrys.ready();

  return webIrys;
};
```

### Fund your account

When you use Irys to upload data, you pay once and the data is guaranteed to be retrievable forever.
The [fee is based on the number of bytes uploaded](https://docs.irys.xyz/overview/cost-to-upload).

When calling `irys.fund()` pass a value in atomic units. Use the utility functions `irys.utils.toAtomic()`
and `irys.utils.fromAtomic()` to convert between atomic and standard units.

You can fund up-front, allowing you send over enough tokens to cover all of a project’s uploads.

```js
try {
  const irys = await getIrys();

  const fundTx = await irys.fund(irys.utils.toAtomic(0.05));
  console.log(
    `Successfully funded ${irys.utils.fromAtomic(fundTx.quantity)} ${
      irys.token
    }`,
  );
} catch (e) {
  console.log("Error funding node ", e);
}
```

Or lazy-fund and fund per upload:

```js
try {
  const irys = await getIrys();

  const pathToFile = "./myNFT.png";
  const { size } = await fs.promises.stat(pathToFile);
  const price = await irys.getPrice(size);
  await irys.fund(price);

  const { id } = await irys.uploadFile(pathToFile);
  console.log(`${pathToFile} --> Uploaded to https://gateway.irys.xyz/${id}`);
} catch (e) {
  console.log("Error funding node ", e);
}
```

### Upload data

```js
const uploadData = async () => {
  const irys = await getIrys();
  const dataToUpload = "GM world.";
  try {
    const tags = [{ name: "Content-Type", value: "text/plain" }];

    const receipt = await irys.upload(dataToUpload, { tags });
    console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
  } catch (e) {
    console.log("Error uploading data ", e);
  }
};
```

### Upload a file

```js
const uploadFile = async () => {
  const irys = await getIrys();
  const fileToUpload = "./myImage.png";

  const tags = [{ name: "application-id", value: "MyNFTDrop" }];

  try {
    const receipt = await irys.uploadFile(fileToUpload, { tags: tags });
    console.log(`File uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
  } catch (e) {
    console.log("Error uploading file ", e);
  }
};
```

### Upload a folder

You can upload a group of files as a single transaction from both the server and the browser.

#### On the server

```js
const uploadFolder = async () => {
  const irys = await getIrys();

  // Upload an entire folder
  const folderToUpload = "./my-images/"; // Path to folder
  try {
    const receipt = await irys.uploadFolder("./" + folderToUpload, {
      indexFile: "", // Optional index file (file the user will load when accessing the manifest)
      batchSize: 50, // Number of items to upload at once
      keepDeleted: false, // Whether to keep now deleted items from previous uploads
    });

    console.log(`Files uploaded. Manifest ID ${receipt.id}`);
  } catch (e) {
    console.log("Error uploading file ", e);
  }
};
```

#### In the browser

```js
const webIrys = await getWebIrys();

const files: File[] = [];
const tags: { name: string, value: string }[][] = [];

// Convert Files to TaggedFiles
const taggedFiles = files.map((f: TaggedFile, i: number) => {
  f.tags = tags[i];
  return f;
});

const response = await webIrys.uploadFolder(taggedFiles);
```

## Irys CLI

### Install the CLI

Install the CLI globally using the `-g` flag. Depending on your setup, you may or may not need to use sudo.

```console
npm i -g @irys/sdk
sudo npm i -g @irys/sdk
```

### Use private keys

When executing CLI commands involving funding nodes or signing transactions, you must provide a private key.

Use the -w flag to specify a private key along with the -t flag to indicate the token you'll use.

```console
irys -w <wallet-file-name> -t linea-eth
```

### Networks

Fund the network you plan to upload to.

```console
# Mainnet
irys -n mainnet

# Devnet
irys -n devnet
```

When connecting to Devnet, you must supply the additional --provider-url parameter.

```console
irys -n devnet --provider-url https://rpc.sepolia.linea.build
```

### Fund a node

Use the `fund` command to fund a node.

```console
irys fund 1000000000000000 -n mainnet -t linea-eth -w bf20......c9885307
```

### Withdraw funds

Use the `withdraw` command to withdraw funds from a node.

```console
irys withdraw 1000000000000000 -n mainnet -t linea-eth -w bf20......c9885307
```

### Upload a file

Use the `upload` command to upload a file.

```console
irys upload myImage.png -n mainnet -t linea-eth -w bf20......c9885307
```

### Upload a folder

Use the `upload-dir` command to upload a folder.

```console
irys upload-dir ./myImages -n mainnet -t linea-eth -w bf20......c9885307
```

### Use tags

Use the `-t` option, followed by a series of name / value pairs to append metadata tags to your upload.

Irys supports adding any optional [metadata tags](./overview#tagging) to each upload. When uploading files with a filename extension, the related [`Content-Type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) (MIME type) tag is automatically added.

```console
irys upload myImage.png -t tagName1 tagValue1 tagName2 tagValue2 -n mainnet -t linea-eth -w bf20......c9885307
```

### Pricing

Use the `price` command, followed by a number of bytes to get the cost to upload that number of bytes. You must also provide a token (`-t`) and a node URL (`-h`)

```console
irys price 1000000 -t linea-eth -n mainnet
```

## Download data

When you upload data to Irys, you're given a [receipt](./overview#receipts) containing a transaction ID. Use this ID to download your data from the Irys gateway by creating a URL in the format:

`https://gateway.irys.xyz/:txId`
