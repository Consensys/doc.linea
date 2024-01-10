---
title: Remix
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this tutorial, we'll walk through creating a basic Remix project and deploying a sample contract.

## Prerequisites

Before you begin, ensure you've:

1. [Set up your wallet](../../../use-mainnet/set-up-your-wallet.mdx)
2. [Funded your wallet with Linea ETH](../../../use-mainnet/fund.mdx) on either the testnet or mainnet

## Explore the Remix workspace

In order to start using Remix, navigate to their [website](https://remix.ethereum.org/). Their UI includes a brief "Get Started" section if you want to familiarize yourself with the UI and learn how to create a new workspace.

The default project includes a code sample with a configured smart contract.

<div class="center-container">
  <div class="img-large">
    <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Remix/Linea_deploy_smart_contract_Remix_1.png"
      alt="Remix configured smart contract code"
    />
  </div>
</div>

## Compile a Remix contract

To compile this sample contract, navigate to the "Solidity compiler" icon, and click on "Compile contract".

<div class="center-container">
  <div class="img-large">
    <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Remix/Linea_deploy_smart_contract_Remix_2.png"
      alt="Remix compile contract"
    />
  </div>
</div>

## Deploy the contract

In order to deploy your contract with Remix, you need to configure the environment.

If you deploy using the injected provider, Remix can auto-detect the network you're on and your account information. First, navigate to the "Deploy & run transactions tab."

<Tabs>
  <TabItem value="Mainnet" label="Mainnet" default>

:::caution

The public endpoints are rate limited and not meant for production systems. To use Infura, you'll need to [get an API key](https://support.infura.io/hc/en-us/articles/15116941373979-Connecting-to-the-Linea-network). You can then [manually add a network to your MetaMask wallet](https://support.metamask.io/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC#h_01G63GGJ83DGDRCS2ZWXM37CV5) with the mainnet information found [here](../../../use-mainnet/info-contracts.mdx#network-information).

:::

Switch to the Linea Mainnet network in your MetaMask wallet, and select "Injected provider - MetaMask" in your Remix configuration.

<div class="center-container">
  <div class="img-large">
    <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Remix/Linea_deploy_smart_contract_Remix_3.png"
      alt="Remix deploy contract"
    />
  </div>
</div>

  </TabItem>
  <TabItem value="Testnet" label="Testnet">

:::caution

The public endpoints are rate limited and not meant for production systems. To use Infura, you'll need to [get an API key](https://support.infura.io/hc/en-us/articles/15116941373979-Connecting-to-the-Linea-network). You can then [manually add a network to your MetaMask wallet](https://support.metamask.io/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC#h_01G63GGJ83DGDRCS2ZWXM37CV5) with the testnet information found [here](../../../use-mainnet/info-contracts.mdx#network-information).

:::

Switch to the Linea Goerli network in your MetaMask wallet, and select "Injected provider - MetaMask" in your Remix configuration.

  <img
    src={
      require("@site/static/img/docs/build-on-linea/quickstart/deploy-smart-contract/remix_deploy_metamask_testnet.png")
        .default
  }></img>

  </TabItem>
</Tabs>

Then, click "Deploy" and confirm the transaction.
