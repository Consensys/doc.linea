---
title: Flair
---

# 🔮 Flair

👋 <b>Welcome to [Flair](https://flair.dev)</b><br />
Real-time and historical custom data indexing for any evm chain.

Flair offers reusable **indexing primitives** (such as fault-tolerant RPC ingestors, custom processors, re-org aware database integrations) to make it easy to receive, transform, store and access your on-chain data.

<img
src={
require("@site/static/img/docs/build-on-linea/tooling/flair.svg").default
}></img>
<br />


## Why Flair?

Compared to other alternatives the main reasons are:

* 🚀  Adopting **parallel and distributed processing** paradigm means high scalability and resiliency for your indexing stack. Instead of constrained sequential processing (e.g Subgraph).
* 🧩  Focused on **primitives**, which means on the left you plug-in an RPC and on the right you output the data to any destination database.
* 🚄  Native **real-time stream processing** for certain data workload (such as aggregations, rollups) for things like total volume per pool, or total portfolio per user wallet.
* ☁️  **Managed** cloud services avoid DevOps and irrelevant engineering costs for dApp developers.
* 🧑‍💻  Avoid decentralization **overhead** (consensus, network hops, etc) since we believe to enable best UX for dApps reading data must be as close to the developers as possible.
### Features

* ✅ Listen to **any EVM chain** with just an RPC URL.
  * Free managed RPC URLs for +8 popular chains already included.
  * Works with both websocket and https-only RPCs.
* ✅ Track and ingest **any contract** for **any event topic.**
  * Auto-track new contracts deployed from factory contracts.
* ✅ **Custom processor scripts** with Javascript runtime (with **Typescript** support)
  * Make external API or Webhook calls to third-party or your backend.
  * Get current or historical USD value of any ERC20 token amount of any contract address on any chain.
  * Use any external NPM library.
* ✅ **Stream** any stored data to your destination database (Postgres, MognoDB, MySQL, Kafka, Elasticsearch, Timescale, etc).

## Getting Started

1️⃣ Clone the [starter boilerplate](https://github.com/flair-sdk/starter-boilerplate) template and follow the instructions:

```bash
git clone https://github.com/flair-sdk/starter-boilerplate.git
# ... follow instructions in README.md
```
::: info
Boilerplate instructions will create a **new cluster**, generate **an API Key**, and set up a manifest.yml to index your **first contract** with **sample custom processor** scripts.

Learn more about the [structure of manifest.yml](https://docs.flair.build/reference/manifest.yml).
:::

2️⃣ Configure Linea RPC nodes

Set a unique namespace, Linea chainId and RPC endpoint in your `config`. Remember that you can add up to 10 RPC endpoints for resiliency.

```yaml
{
  "cluster": "dev",
  "namespace": "my-awesome-linea-indexing-dev",
  "indexers": [
    {
      "chainId": 59140,
      "enabled": true,
      "ingestionFilterGroup": "default",
      "processingFilterGroup": "default",
      "sources": [
        # Highly-recommended to have at least 1 websocket endpoint
        "wss://linea-mainnet.infura.io/v3/xxxxxxxxxx",
        "https://linea-mainnet.infura.io/v3/xxxxxxxxxx",
        # You can put multiple endpoints for failover
        "https://rpc.linea.build"
      ]
    }
  ]
}
```

3️⃣ [Query](https://docs.flair.build/#getting-started) your custom indexed data.

4️⃣ Stream the data to your [own database](https://docs.flair.build/reference/database).

## Examples

Explore real-world usage of Flair indexing primitives for various use-cases.

### DeFi

* [Aggregate protocol fees in USD across multiple chains](./aggregate-protocol-fees-in-usd/README.md)
* [Calculate "Health Factor" of positions with contract factory tracking](./health-factor-with-factory-tracking/README.md)
* [Index Uniswap v2 swaps with USD price for all addresses](./uniswap-v2-events-from-all-contracts-with-usd-price/README.md)

### NFT

* [Index ERC721 and ERC1155 NFTs on any EVM chain with an RPC URL](./erc721-and-erc1155-nft-indexing/README.md)
