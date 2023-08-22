---
title: Foundry
sidebar_position: 2
---

# Foundry

In this tutorial, we'll walk through creating a basic [Foundry](https://book.getfoundry.sh/) project.

Here's a video walkthrough:

<iframe width="560" height="315" src="https://www.youtube.com/embed/TO9XhLCoqgg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Prerequisites

Before you begin, Ensure you've:

1. [Set up your wallet](../../../use-mainnet/set-up-your-wallet.mdx)
1. [Funded your wallet with Linea ETH](../../../use-mainnet/fund.md#get-test-eth-on-linea)

   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   ```

   Then, open a new terminal, and call `foundryup` to install the latest release.

## Create a Foundry project

To create a Foundry project, run:

```bash
forge init linea-tutorial
```

And change into the directory:

```bash
cd linea-tutorial
```

## Deploy a smart contract

Running `forge init` sets you up with a sample contract, test, and script for `Counter.sol`. To build it, simply run `forge build`.

To deploy a smart contract, we highly recommend using an Infura endpoint, as the public endpoint may experience rate limiting.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs className="my-tabs">
  <TabItem value="Infura" label="Infura" default>

To use Infura, you'll need to [get an API key](https://support.infura.io/hc/en-us/articles/15116941373979-Connecting-to-the-Linea-network)

On testnet:

```bash
forge create --rpc-url https://linea-goerli.infura.io/v3/YOUR-INFURA-API-KEY src/Counter.sol:Counter --private-key YOUR_PRIVATE_KEY
```

On mainnet:

```bash
forge create --rpc-url https://linea.infura.io/v3/YOUR-INFURA-API-KEY src/Counter.sol:Counter --private-key YOUR_PRIVATE_KEY
```
</TabItem>
<TabItem value="Public Endpoint" label="Public Endpoint">

:::caution

The public endpoints are rate limited and not meant for production systems.

On testnet:

```bash
forge create --rpc-url https://rpc.goerli.linea.build/ src/Counter.sol:Counter --private-key YOUR_PRIVATE_KEY
```

On mainnet:

:::

```bash
forge create --rpc-url https://rpc.linea.build/ src/Counter.sol:Counter --private-key YOUR_PRIVATE_KEY
```

  </TabItem>
</Tabs>

Your output should look a little something like this:

```bash
Deployer: YOUR_ACCOUNT_NUMBER
Deployed to: 0xED0Ff7E8B655dFFfCA471ea3B6B649ce7C2C1b83
Transaction hash: 0x967e1290b285e67b3d74940ee19925416734c345f58bd1ec64dcea134647d7ee
```

Next, you can optionally [verify your contract on the network](../verify-smart-contract/foundry.md).