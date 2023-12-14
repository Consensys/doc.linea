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

To learn about a smart contract on Cookbook, select the protocol, and select `Expand`. This opens the code alongside ChefGPT, Cookbook's AI Solidity assistant. 

Highlight selections of the code and press **Analyze Snippet** to get more information about the smart contract code you're looking at, or ask ChefGPT questions about Linea, solidity, or your smart contract.

<div class="center-container">
  <div class="img-large">
    <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_2.png"
      alt="Cookbook Analyze Code Snippet"
    />
  </div>
</div>

## Import any Smart Contract Code into Cookbook

Import verified smart contract code into Cookbook to fork, learn about, or build with by inputting any smart contract address into the Cookbook search bar.  

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

### Method #1 - Using the Cookbook.dev Website and Opening in Remix
 
On a smart contract or protocol page in Cookbook, select the **Open in Remix** option. Your smart contract will automatically be opened in a new Remix workspace.

<div class="center-container">
  <div class="img-small">
      <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_5.png"
      alt="Cookbook Analyze Code Snippet"
    />
  </div>
</div>

**Compile** your smart contract within remix. Most contracts opened with Cookbook will automatically compile within Remix. 

<div class="center-container">
  <div class="img-small">
      <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_6.png"
      alt="Cookbook Analyze Code Snippet"
    />
  </div>
</div>

Once compiled, **deploy** the smart contract in Remix. 

Connect your Metamask wallet with Linea Goerli or Linea mainnet by selecting injected provider - Metamask Wallet in the **environments** tab within the **deploy** screen. 

<div class="center-container">
  <div class="img-small">
      <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_7.png"
      alt="Cookbook Analyze Code Snippet"
    />
  </div>
</div>

Once deployed, we can interact with our smart contract within Remix.

### Method #2 - Using the Cookbook Remix Plug-in within the Remix IDE

Go to [Remix.Ethereum.org](https://remix.ethereum.org)

Add The Cookbook Plugin to Remix by clicking the Chef Hat Logo under **Featured Plugins** on the Remix Homepage.

<div class="center-container">
  <div class="img-small">
      <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_8.png"
      alt="Cookbook Analyze Code Snippet"
    />
  </div>
</div>

Alternatively, search Cookbook and select **Activate** in the Remix Plugin Manager. 

<div class="center-container">
  <div class="img-small">
      <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_9.png"
      alt="Cookbook Analyze Code Snippet"
    />
  </div>
</div>

Search for any protocol or smart contract and click the search result to import the smart contract code into Remix.

Cookbook's AI solidity co-pilot, ChefGPT, is available within the Remix plugin to answer questions about Linea, Solidity, or the smart contract you're working with.

<div class="center-container">
  <div class="img-small">
      <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_10.png"
      alt="Cookbook Analyze Code Snippet"
    />
  </div>
</div>

Compile and deploy the smart contract as described in **Method 1** above. 

## Deploy your Smart Contract to Linea with Hardhat

After finding the smart contract or protocol you want to work with in [Cookbook](cookbook.dev), select the **Download Source** option and select **Hardhat** to download the contract boilerplate. For this guide, we'll use [Cookbook's Simple ERC-20 Token Smart Contract](https://www.cookbook.dev/contracts/simple-token).

To install the required packages and dependencies, run
```
npm install
```
To compile your smart contract, run 
```
npx hardhat compile
``` 
Add arguments to the `constructorArgs` array in the `deploy.js` file in the `scripts` folder and save.  If you do not need any arguments please leave the array empty.

### Deploy To Linea

<Tabs>
  <TabItem value="Deploy To Linea Goerli (Testnet)" label="Testnet" default>

  In your `.env.example` file, add your Infura Linea Goerli API key and add your wallet private key. Afterward change the name of the file to .env and create a gitignore to ignore your .env file.
  
    In the `hardhat.config.js` file, uncomment out the example code
```
const INFURA_API_KEY_LINEA_GOERLI = process.env.INFURA_API_KEY_LINEA_GOERLI;
```
and uncomment out

```
const PRIVATE_KEY = process.env.PRIVATE_KEY;
```

and then uncomment out 
```
lineaGoerli: {
url: `https://linea-goerli.infura.io/v3/${INFURA_API_KEY_LINEA_GOERLI}`,
accounts: [PRIVATE_KEY],
},
```
To deploy your smart contract to the Linea testnet, run 
```
npx hardhat run --network (lineaGoerli) scripts/deploy.js
```
Hardhat will return the deployed smart contract address in your terminal. View and verify your smart contract on the [Linea Goerli Block Explorer](https://goerli.lineascan.build/).
  </TabItem>
  <TabItem value="Deploy To Linea (Mainnet)" label="Mainnet">

  In your `.env.example` file, add your Infura Linea API key and add your wallet private key. Afterward change the name of the file to .env and create a gitignore to ignore your .env file.

  Add
  ```
    INFURA_API_KEY_LINEA = "<YOUR API KEY HERE>"

  ```
    
    In the `hardhat.config.js` file, add
```
const INFURA_API_KEY_LINEA = process.env.INFURA_API_KEY_LINEA;
```
and uncomment out

```
const PRIVATE_KEY = process.env.PRIVATE_KEY;
```

and then add  
```
linea: {
url: `https://linea.infura.io/v3/${INFURA_API_KEY_LINEA}`,
accounts: [PRIVATE_KEY],
},
```
To deploy your smart contract to the Linea testnet, run 
```
npx hardhat run --network (linea) scripts/deploy.js
```
Hardhat will return the deployed smart contract address in your terminal. View and verify your smart contract on the [Linea Block Explorer](https://lineascan.build/).
  </TabItem>
</Tabs>

## Deploy your Smart Contract to Linea with Foundry

After finding the smart contract or protocol you want to work with in [Cookbook](https://www.cookbook.dev/chains/Linea), select the **Download Source** option and select **Foundry** to download the contract boilerplate.For this guide, we'll use [Cookbook's Simple ERC-20 Token Smart Contract](https://www.cookbook.dev/contracts/simple-token).

Before you can use Foundry, you need to install Rust, a programming language required to run Foundry. Follow the installation instructions provided [here](https://doc.rust-lang.org/book/ch01-01-installation.html).

Once Rust is installed, you can install Foundry. Follow the installation instructions provided [here](https://book.getfoundry.sh/getting-started/installation#using-foundryup).

To build your contracts, Run
```sh
forge build
```

If you encounter a "stack too deep" error, try running the following command instead

```sh
forge build --via
```

In the scripts folder, uncomment all the code in the `contract.s.sol` file. Replace `"ARG1"`, `"ARG2"`, `2000` with your `Token Name`, `Token Symbol` and desired `Token Quantity` where you see the code below
```
FixedToken _contract = new FixedToken("ARG1", "ARG2", 2000);
```

Before deploying your contracts, populate the `.env` file with your [Linea Goerli RPC URL](https://www.infura.io/networks/ethereum/linea), followed by your [Metamask wallet private key](https://metamask.io/) and your [Etherscan API key token values](https://etherscan.io/apis). Then, run the following command to define your environment variables globally

```sh
source .env
```

:::tip 
add "0x" before your private key string in the `.env` file
:::

Deploy your contracts with the following command

```sh
forge script script/contract.s.sol:ContractScript --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv
```

Your contract will be verified on the Linea Goerli explorer automatically upon deployment. You can manage and interact with your newly deployed smart contract in the [Linea Goerli block explorer](https://goerli.lineascan.build/).

:::note
The given tests in the contract.t.sol file are only examples, please generate your own
:::

**Further guidance**

For more information on using Cookbook to find, learn about or build with smart contracts, check out the following resources:

- [Documentation](https://docs.cookbook.dev/)
- [Blog](https://medium.com/@cookbookdev)
- [Twitter](https://twitter.com/cookbook_dev)
- [Community](https://discord.gg/cookbook)