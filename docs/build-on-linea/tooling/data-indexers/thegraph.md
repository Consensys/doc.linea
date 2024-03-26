---
title: TheGraph network
image: /img/socialCards/thegraph-network.jpg
---

As a dapp developer, retrieving on-chain data for your dapp can be challenging because you will most likely:

1. Consume your RPC provider quota with calls.
2. Need to implement error handling on multiple levels.
3. Define creative strategies to avoid UX impacts when managing a high volume of data.

The Graph is a decentralized data indexer provider that indexes the Linea blockchain for you and exposes on-chain data through an HTTPS API.

We run The Graph indexers on Linea to allow you to leverage the power of this technology.

:::info[update]

TheGraph is now live with Linea Mainnet! For more information, take a look at their official [documentation](https://thegraph.com/docs/en/)

### Access request (whitelisting)

Access to the Deployer and IPFS endpoints in both networks need to be requested before deploying a subgraph. You will need the IP/s you will access the endpoints from (i.e. public source IP/s of the machine that will run the deployment). Please fill out [this form](https://forms.gle/JcxhCwAToNgMSbrk9) to be whitelisted.

The network name must be set to either linea-mainnet for Mainnet or linea-goerli for Goerli.

Once whitelisted, the commands for deploying a subgraph are similar to the following:

```bash
graph codegen
graph create --node <deploy_endpoint> <team_repo>/<subgraph_name>
graph remove --node <deploy_endpoint> <team_repo>/<subgraph_name>
graph deploy --node <deploy_endpoint> --ipfs <ipfs_endpoint> --version-label <subgraph_version_label> <team_repo>/<subgraph_name>
```

1. [Here](https://thegraph.com/docs/en/developing/creating-a-subgraph/) you can find more info on how to build a subgraph in less than 5min with some tutorials and examples.

Check out the full docs on [TheGraph website](https://thegraph.com/docs/en/)

## Endpoints

**Mainnet**

- Graph query endpoint - https://graph-query.linea.build
- Graph deployer endpoint - https://graph-deploy.linea.build
- IPFS endpoint - https://graph-ipfs.linea.build

**Testnet**

- Graph query endpoint - https://graph-query.goerli.linea.build
- Graph deployer endpoint - https://graph-deploy.goerli.linea.build
- IPFS endpoint - https://graph-ipfs.goerli.linea.build

