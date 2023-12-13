---
title: Cookbook
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Cookbook.dev](https://www.cookbook.dev/) is an open-source smart contract registry where developers can find solidity primitives, libraries, and smart contracts for protocols.

In this tutorial, we'll walk through searching for a protocol on Cookbook and deploying it to Linea using Cookbook's no-code deploy and using Cookbook with Remix, Hardhat and Foundry. 

## Prerequisites

Before you begin, ensure you've:

1. [Set up your wallet](../../../use-mainnet/set-up-your-wallet.mdx)
2. [Funded your wallet with Linea ETH](../../../use-mainnet/fund.md) on either the testnet or mainnet

## Search Cookbook's Smart Contract Registry

Navigate to [cookbook.dev/chains/Linea](https://www.cookbook.dev/chains/Linea) and explore **Protocols** on Linea, or search for specific smart contracts in the search bar. 

<div class="center-container">
  <div class="img-large">
    <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_1.png"
      alt="Cookbook Search"
    />
  </div>
</div>

To learn about a smart contract on Cookbook, select the contract, and select `Expand`. This opens the code alongside ChefGPT, Cookbook's AI Solidity assistant. 

Highlight selections of the code and press **Analyze Snippet** to get more information about the smart contract code you're looking at, or ask ChefGPT questions about Base, solidity, or your smart contract.

<div class="center-container">
  <div class="img-large">
    <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_2.png"
      alt="Cookbook Analyze Code Snippet"
    />
  </div>
</div>

## Import any Smart Contract Code into Cookbook

Import verified smart contract code into Cookbook to fork, learn about, or build with by inputting any smart contract address into the Cookbook search bar. Supports Linea, Ethereum, Polygon, BSC, Fantom, Optimism, Arbitrum, Moonbeam, Moonriver, Gnosis, Base and Celo. 

<div class="center-container">
  <div class="img-large">
    <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_3.png"
      alt="Cookbook Analyze Code Snippet"
    />
  </div>
</div>

## No-code Deploy your Smart Contract to Linea with Cookbook 

Choose **No-Code Deploy** on select (usually simpler) smart contracts on [Cookbook](https://www.cookbook.dev/contracts/simple-token).

<div class="center-container">
  <div class="img-large">
    <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_4.png"
      alt="Cookbook Analyze Code Snippet"
    />
  </div>
</div>

Connect your Metamask Wallet to Cookbook.dev. 

Set your smart contract arguments within the Cookbook UI (if applicable). 

Select Linea or tLinea (Linea Testnet) under **Pick Chain**.

Select **Deploy** and pay the network fee. 

Manage your deployed smart contract under **My Dashboard** in Cookbook.  

## Deploy your Smart Contract to Linea with Remix

## Deploy your Smart Contract to Linea with Hardhat

After finding the smart contract or protocol you want to work with in [Cookbook](cookbook.dev), select the **Download Source** option and select **Hardhat** to download the contract boilerplate. We'll use [Cookbook's Simple ERC-20 Token Smart Contract](https://www.cookbook.dev/contracts/simple-token).

To install the required packages and dependencies, run
```
npm install
```
To compile your smart contract, run 
```
npx hardhat compile
``` 
Add arguments to the `constructorArgs` array in the `deploy.js` file in the `scripts` folder and save.  If you do not need any arguments please leave the array empty.

### Deploy To Linea Goerli (Testnet)
In your `.env.example` file, add your Infura Linea API key and add your wallet private key. Afterward change the name of the file to .env and create a gitignore to ignore your .env file.

In the `hardhat.config.js` file, uncomment out  
```
const INFURA_API_KEY_LINEA_GOERLI = process.env.INFURA_API_KEY_LINEA_GOERLI;
```
and uncomment out

```
const PRIVATE_KEY = process.env.PRIVATE_KEY;
```

and then uncomment out 
```
// lineaGoerli: {
//   url: `https://linea-goerli.infura.io/v3/${INFURA_API_KEY_LINEA_GOERLI}`,
//   accounts: [PRIVATE_KEY],
// },
```
To deploy your smart contract to the Linea testnet, run 
```
npx hardhat run --network (lineaGoerli) scripts/deploy.js
```
Hardhat will return the deployed smart contract address in your terminal. View and verify your smart contract on the [Linea Goerli Block Explorer](https://goerli.lineascan.build/).

## Deploy your Smart Contract to Linea with Foundry
