---
title: TheGraph Network
---

As a dApp developer, retrieving on-chain data for your dApp can be challenging because you will most likely:

1. Consume your RPC provider quota with calls.
2. Need to implement error handling on multiple levels.
3. Define creative strategies to avoid UX impacts when managing a high volume of data.

The Graph is a decentralized data indexer provider that indexes the Linea blockchain for you and exposes on-chain data through an HTTPS API.

We run The Graph indexers on Linea to allow you to leverage the power of this technology.

:::info[update]
TheGraph is now live with Linea Mainnet! For more information, take a look at their official [documentation](https://thegraph.com/docs/en/)

:::

## Custom subgraph and deployments

If there are no public subgraph that matches your needs, in order to use TheGraph you will need to define your own subgraph and get it deployed on an indexer.

## Endpoints

**Mainnet**

- Graph query endpoint - https://graph-query.linea.build
- Graph deployer endpoint - https://graph-deploy.linea.build
- IPFS endpoint - https://graph-ipfs.linea.build

**Testnet**

- Graph query endpoint - https://graph-query.goerli.linea.build
- Graph deployer endpoint - https://graph-deploy.goerli.linea.build
- IPFS endpoint - https://graph-ipfs.goerli.linea.build
