---
title: Foundry
description: Deploy a smart contract using Foundry.
image: /img/socialCards/foundry.jpg
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

In this quickstart, we'll create a basic [Foundry](https://book.getfoundry.sh/) project. Here's a video walkthrough:

<div class="center-container">
    <div class="video-container">
      <iframe
        class="video-iframe"
        src="https://www.youtube.com/embed/TO9XhLCoqgg"
        title="How to deploy a smart contract on Linea with Foundry"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen></iframe>
    </div>
</div>

## Prerequisites

Before you begin, ensure you:

1. [Set up your wallet](/users/move-funds/set-up-your-wallet)
1. [Fund your wallet with Linea ETH](/users/move-funds/fund) on either the testnet, or mainnet
1. Download and install Foundry:

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

Running `forge init` sets up a sample contract, test, and script for `Counter.sol`.

## Deploy a smart contract

To deploy a smart contract, we highly recommend using an Infura endpoint, as the public endpoint may experience
rate limiting and not meant for production use.

[Sign up for an Infura account](https://docs.infura.io/api/getting-started) to get an API key that
provides access the Linea endpoints. Assign the Linea endpoints you want to access, to your API key.

:::caution

These instructions use API keys and private keys inline. We highly recommend hiding them
[in `.env` files](#deploy-using-a-.env-file)

:::

Deploy your contract using the following syntax:

```bash
forge create --rpc-url YOUR_LINEA_ENDPOINT src/Counter.sol:Counter --private-key YOUR_PRIVATE_KEY
```

In the command:

- Replace `YOUR_LINEA_ENDPOINT` with the URL of a [supported Infura Linea network](https://docs.infura.io/api/networks/linea/choose-a-network)
    or [public endpoint URL](/developers/quickstart/info-contracts#network-information).
- Replace `YOUR_PRIVATE_KEY` with your wallet's private key.

Your output should look similar to:

```bash
Deployer: YOUR_ACCOUNT_NUMBER
Deployed to: 0xED0Ff7E8B655dFFfCA471ea3B6B649ce7C2C1b83
Transaction hash: 0x967e1290b285e67b3d74940ee19925416734c345f58bd1ec64dcea134647d7ee
```

## Deploy a smart contract using a `.env` file

Directly pasting your private key into the command line poses security risks. To avoid exposing sensitive
information such as wallet private keys or API keys, use files with the `.env` extension to store private
data. Create a `.env` file, then add the file to the `.gitignore` file to prevent committing it. Populate
the `.env` file with the relevant private information:

```bash
PRIVATE_KEY=YOUR_PRIVATE_KEY
INFURA_API_KEY=YOUR_INFURA_API_KEY
```

Then, run:

```bash
source .env
```

Finally, modify the `foundry.toml` file to store the various RPC endpoints we might be working with. For example:

```bash
[rpc_endpoints]
linea-goerli = "https://linea-goerli.infura.io/v3/${INFURA_API_KEY}"
linea-sepolia = "https://linea-sepolia.infura.io/v3/${INFURA_API_KEY}"
linea-mainnet = "https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}"
```

To deploy the smart contract, run:

<Tabs className="my-tabs">
  <TabItem value="Mainnet" label="Mainnet" default>

```bash
forge create --rpc-url linea-mainnet src/Counter.sol:Counter --private-key $PRIVATE_KEY
```

</TabItem>
<TabItem value="Goerli" label="Goerli">

```bash
forge create --rpc-url linea-goerli src/Counter.sol:Counter --private-key $PRIVATE_KEY
```

  </TabItem>

<TabItem value="Sepolia" label="Sepolia">

```bash
forge create --rpc-url linea-sepolia src/Counter.sol:Counter --private-key $PRIVATE_KEY
```

  </TabItem>
</Tabs>

Next, you can optionally [verify your contract on the network](../verify-smart-contract/foundry.md).
