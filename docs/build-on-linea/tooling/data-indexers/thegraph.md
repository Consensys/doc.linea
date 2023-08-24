---
title: TheGraph Network
---

As a dapp developer, retrieving onchain data for your dapp can be difficult as you will most probably:

1. Consume your RPC provider quota with calls
1. Need to implement the error handling on multiple levels
1. Define creative strategies to be able to avoid UX impacts when you want to manage an high volume of Data

TheGraph is a decentralized data indexer provider that index Linea blockchain for you and expose and provide onchain data as https API.

We run TheGraph indexers on Linea to let you leverage the power of this technology.

## Deployed subgraphs on Linea indexers

This is the list of subgraph deployed by partners' dapps on the Linea indexers:

| Project | Type | URL |
| --- | --- | --- |
| Bilinear | ERC721 | [knobs/erc721](https://thegraph.goerli.zkevm.consensys.net/subgraphs/name/knobs/erc721) |
| Bilinear | ERC1155 | [knobs/erc1155](https://thegraph.goerli.zkevm.consensys.net/subgraphs/name/knobs/erc1155) |
| SushiSwap | Blocks | [sushiswap/blocks](https://thegraph.goerli.zkevm.consensys.net/subgraphs/name/sushiswap/blocks-consensys-zkevm-goerli) |
| HOP Protocol | Bridging Data | [hop-protocol/hop](https://thegraph.goerli.zkevm.consensys.net/subgraphs/name/hop-protocol/hop) |
| Connext | Bridging Data | [connext/amarok-runtime](https://thegraph.goerli.zkevm.consensys.net/subgraphs/name/connext/amarok-runtime-v0-consensys-test/graphql) |
| zkVote | DAO Governance | [samzkback/zkvotev3](https://thegraph.goerli.zkevm.consensys.net/subgraphs/name/samzkback/zkvotev3) |

## Custom subgraph and deployments

If there are no public subgraph that matches your needs, in order to use TheGraph you will need to define your own subgraph and get it deployed on an indexer.

### Access Request (Whitelisting)

Access to the Deployer and IPFS endpoints in both networks need to be requested before deploying a subgraph. You will need the IP/s you will access the endpoints from (i.e. public source IP/s of the machine that will run the deploy). Please fill [this form](https://forms.gle/JcxhCwAToNgMSbrk9) to be whitelisted.

The network name must be set to either linea-mainnet for Mainnet or linea-goerli for Goerli.

Once whitelisted, the commands for deploying a subgraph are similar to the following:

```bash
graph codegen
graph create --node <deploy_endpoint> <team_repo>/<subgraph_name>
graph remove --node <deploy_endpoint> <team_repo>/<subgraph_name>
graph deploy --node <deploy_endpoint> --ipfs <ipfs_endpoint> --version-label <subgraph_version_label> <team_repo>/<subgraph_name>
```

1. Deployed subgraphs will be available for your dapp on the following url: https://thegraph.goerli.zkevm.consensys.net/subgraphs/name/@githubUser/@subgraphName
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