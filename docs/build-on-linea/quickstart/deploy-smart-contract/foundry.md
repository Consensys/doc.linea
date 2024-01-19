---
title: Foundry
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this tutorial, we'll walk through creating a basic [Foundry](https://book.getfoundry.sh/) project.

Here's a video walkthrough:

<iframe width="560" height="315" src="https://www.youtube.com/embed/TO9XhLCoqgg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Prerequisites

Before you begin, ensure you've:

1. [Set up your wallet](../../../use-mainnet/set-up-your-wallet.mdx)
2. [Funded your wallet with Linea ETH](../../../use-mainnet/fund.mdx) on either the testnet or mainnet

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

:::caution

These instructions use API keys and private keys inline. We highly recommend hiding them in `.env` files [by following the instructions below](#using-env-to-store-private-keys).

:::

<Tabs className="my-tabs">
  <TabItem value="Infura" label="Infura" default>

To use Infura, you'll need to [get an API key](https://support.infura.io/hc/en-us/articles/15116941373979-Connecting-to-the-Linea-network).

On testnet:

```bash
forge create --rpc-url https://linea-goerli.infura.io/v3/INFURA_API_KEY src/Counter.sol:Counter --private-key PRIVATE_KEY
```

On mainnet:

```bash
forge create --rpc-url https://linea-mainnet.infura.io/v3/INFURA_API_KEY src/Counter.sol:Counter --private-key PRIVATE_KEY
```
</TabItem>
<TabItem value="Public Endpoint" label="Public Endpoint">

:::caution

The public endpoints are rate limited and not meant for production systems.

:::

On testnet:

```bash
forge create --rpc-url https://rpc.goerli.linea.build/ src/Counter.sol:Counter --private-key YOUR_PRIVATE_KEY
```

On mainnet:

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

### Using `.env` to store private keys

It is dangerous to directly paste your private key into the command line. One workaround is to use `.env` files to store private information such as your wallet's private keys or API keys. In order to do so, create a `.env` file and add it to your `.gitignore` file. Then, fill it with the following information:

```bash
PRIVATE_KEY=YOUR_PRIVATE_KEY
INFURA_API_KEY=YOUR_INFURA_API_KEY
```

Then, run:

```bash
source .env
```

Finally, we can modify the `foundry.toml` file to conveniently store the various RPC endpoints we might be working with. Add this section:

```bash
[rpc_endpoints]
linea-testnet = "https://linea-goerli.infura.io/v3/${INFURA_API_KEY}"
linea-mainnet = "https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}"
```

Now, in order to deploy, you can simply run:

<Tabs className="my-tabs">
  <TabItem value="Mainnet" label="Mainnet" default>

```bash
forge create --rpc-url linea-mainnet src/Counter.sol:Counter --private-key $PRIVATE_KEY
```

</TabItem>
<TabItem value="Testnet" label="Testnet">

```bash
forge create --rpc-url linea-testnet src/Counter.sol:Counter --private-key $PRIVATE_KEY
```

  </TabItem>
</Tabs>

Next, you can optionally [verify your contract on the network](../verify-smart-contract/foundry.md).
