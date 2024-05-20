---
title: Overview
image: /img/socialCards/api3.jpg
description: Using Irys' permanent data with Linea.
---

# Irys

[Irys](https://docs.irys.xyz/) is a provenance layer. Data on Irys is permanent, precise, and unconstrained.

- **Permanent:** Data stored on Irys is censorship-resistant and immutable, forever. There's no counterparty risk of data being removed.

- **Precise:** Each piece of data is timestamped with a high-precision timestamp, providing a reliable sequence of events.

- **Unconstrained:** There are no limits on file upload sizes. Users can always read, write, and discover data at scale.

![](/img/docs/build-on-linea/tooling/permanent-data/irys/irys-provenance-layer.gif)

You can imagine Irys as an assembly line. Data enters on one side, it's stamped with a timestamp, attribution, and authorship details before being stored permanently as data with strong provenance.

## Using Irys with Linea

Irys is **chain agnostic**, smart contracts on Linea can link to data on Irys.

You can:

- Deploy NFT contracts on Linea and [have images and metadata on Irys](/developers/guides/irys-nfts)
- Build games with state on Linea and visual assets on Irys
- Build an onchain identity protocol with user metadata on Irys
- Build a cross-chain bridge and use Irys to store messages

You can use [ETH on Linea](https://docs.irys.xyz/overview/supported-tokens) to pay for permanent storage on Irys.

## Paying for uploads

Irys has a pay-once-store-forever payment model based on the number of bytes you upload. For the exact cost to upload, use their [payment calculator](https://docs.irys.xyz/overview/cost-to-upload).

## Free uploads

Uploads of less then 100Kib are free on Irys' mainnet and devnet.

## Receipts

Each upload to Irys is given a cryptographically signed receipt that can be used by anyone to trustlessly verify the data's provenance.

Receipts are a JSON object with the following format:

```json
{
  id: '1Txlbl5NgEqUbIkDnnunHC0gFx0n8_Y92zAsoX54kI8',
  timestamp: 1676891681110,
  version: '1.0.0',
  public: '...',
  signature: '...',
  deadlineHeight: ...,
}
```

| Field | Description |
| --- | --- |
| id | Transaction id (used to download the data) |
| timestamp | Timestamp (UNIX milliseconds) of when the transaction was created |
| version | The version of this JSON file, currently 1.0.0 |
| public | Public key of the bundler node used |
| signature | A signed [deep hash](/terminology#deep-hash) of the JSON receipt |
| deadlineHeight | The block number by which the transaction must be finalized on Arweave |

## Paying for users' uploads

Use [balance approvals](https://docs.irys.xyz/developer-docs/irys-sdk/balance-approvals) to pay for your users' uploads and build a Web2-style UX that saves users from having to covert fiat or own tokens.

With balance approvals:

- You pay for transactions.
- Users sign transactions.

### Create an approval

```js
const receipt = await irys.approval.createApproval({
  amount: irys.utils.toAtomic(1), // Amount in atomic units
  approvedAddress: "<address>",
  expiresInSeconds: 100, // Expires in 100 seconds. Delete to remove expiration.
});
```

### Upload using an approval

```js
const receipt = await irys.upload("GM World", {
  upload: { paidBy: "<address>" },
});
```

## Tagging

Irys supports attaching up to 20 metadata tags to each transaction. Tags are indexed and are queryable.

```js
// Your file
const fileToUpload = "./myNFT.png";

const tags = [{ name: "application-id", value: "NFTs To The Moon" }];

try {
  const response = await irys.uploadFile(fileToUpload, { tags });
  console.log(`File uploaded ==> https://gateway.irys.xyz/${response.id}`);
} catch (e) {
  console.log("Error uploading file ", e);
}
```

## Querying

Transaction metadata is [queryable using the Irys query package](./irys-query-package).
