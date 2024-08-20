---
title: Cookbook.dev
description: Deploy a smart contract using Cookbook.dev.
image: /img/socialCards/cookbookdev.jpg
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

[Cookbook.dev](https://www.cookbook.dev/?utm=lineadocs) is an open-source smart contract registry where
developers can find solidity primitives, libraries, and smart contracts for protocols. It provides an easy and
fast way to develop smart contracts by integrating with a variety of blockchain-native developer tools.

Here, we'll walk through searching for a protocol on Cookbook and deploying it to Linea using
Cookbook's no-code deploy and using Cookbook with Remix, Hardhat and Foundry.

## Prerequisites

Before you begin, ensure you:

1. [Set up your wallet](/users/move-funds/set-up-your-wallet)
2. [Fund your wallet with Linea ETH](/users/move-funds/fund) on either the testnet or mainnet

## Search Cookbook's smart contract registry

Navigate to [cookbook.dev/chains/Linea](https://www.cookbook.dev/chains/Linea?utm=lineadocs) and explore **Protocols** on Linea, or search for specific smart contracts in the search bar.

<div class="center-container">
  <div class="img-large">
    <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_1.png"
      alt="Cookbook Search"
    />
  </div>
</div>

To learn about a smart contract on Cookbook, select the protocol, and select **Expand**. This opens the code
alongside ChefGPT, Cookbook's AI Solidity assistant.

Highlight selections of the code and press **Analyze Snippet** to get more information about the smart contract
code you're looking at, or ask ChefGPT questions about Linea, solidity, or your smart contract.

<div class="center-container">
  <div class="img-large">
    <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_2.png"
      alt="Cookbook Analyze Code Snippet"
    />
  </div>
</div>

## Import smart contract code into Cookbook

Import verified smart contract code into Cookbook to fork, learn about, or build with by inputting any smart contract address that's verified on an EVM-based block explorer into the Cookbook.dev search bar.

<div class="center-container">
  <div class="img-large">
    <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_3.png"
      alt="Cookbook Import Contract"
    />
  </div>
</div>

## Deploy a smart contract without coding

Choose **No-Code Deploy** on select (usually simpler) smart contracts on [Cookbook](https://www.cookbook.dev/contracts/simple-token?utm=lineadocs).

<div class="center-container">
  <div class="img-large">
    <img
      src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_4.png"
      alt="Cookbook No Code Deploy"
    />
  </div>
</div>

1. Connect your MetaMask Wallet to Cookbook.dev.

1. Set your smart contract arguments in the Cookbook UI (if applicable).

1. Select **Linea** or **tLinea** (Linea Testnet) under **Pick Chain**.

1. Select **Deploy** and pay the network fee.

Manage your deployed smart contract under **My Dashboard** in Cookbook.

## Deploy your smart contract using Remix

### Method 1 - Use the Cookbook.dev website and open in Remix

On a smart contract or protocol page in Cookbook, select the **Open in Remix** option. Your smart contract will
automatically be opened in a new Remix workspace.

Select **Compile** to compile your smart contract in Remix. Most contracts opened with Cookbook will automatically
compile within Remix.

Refer to the [Remix instructions](./remix.md) for more information on how to compile and deploy smart
contracts in the Remix IDE.

### Method 2 - Use the Cookbook Remix plug-in within the Remix IDE

1. Go to [Remix.Ethereum.org](https://remix.ethereum.org) website.

1. Add the Cookbook Plugin to Remix by clicking the Cookbook Logo under **Featured Plugins** on the Remix Homepage.

    <div class="center-container">
      <div class="img-medium">
          <img
          src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_8.png"
          alt="Cookbook Remix Featured Plugin"
        />
      </div>
    </div>

    Alternatively, search Cookbook and select **Activate** in the Remix Plugin Manager.

    <div class="center-container">
      <div class="img-small">
          <img
          src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_9.png"
          alt="Cookbook Remix Add Plugin"
        />
      </div>
    </div>

1. Search for any protocol or smart contract and click the search result to import the smart contract code into Remix.

    Cookbook's AI solidity co-pilot, ChefGPT, is available within the Remix plugin to answer questions about
    Linea, Solidity, or the smart contract you're working with.

    <div class="center-container">
      <div class="img-small">
          <img
          src="/img/article_images/Build_on_Linea/Quickstart/Deploy_a_smart_contract/Cookbook/Linea_deploy_smart_contract_Cookbook_10.png"
          alt="Cookbook Remix Search"
        />
      </div>
    </div>

1. Compile and deploy the smart contract as described in [the Remix instructions](./remix.md).

## Deploy your smart contract with Hardhat

After finding the smart contract or protocol you want to work with in [Cookbook](https://www.cookbook.dev/?utm=lineadocs),
select the **Download Source** option and select **Hardhat** to download the contract boilerplate. For
this example, we'll use [Cookbook's Simple ERC-20 Token Smart Contract](https://www.cookbook.dev/contracts/simple-token?utm=lineadocs).


### Compile the smart contract

In the project folder, install the required packages and dependencies:

```
npm install
```

Then, compile the smart contract:

```
npx hardhat compile
```

Add arguments to the `constructorArgs` array in the `deploy.js` file in the `scripts` folder and save. If you
do not need any arguments, leave the array empty.

### Deploy the smart contract

<Tabs>

<TabItem value="Linea Sepolia" label="Linea Sepolia">

1. In your `.env` file, add your Infura Linea API key and add your wallet private key.

    ```
    INFURA_API_KEY_LINEA_SEPOLIA = "<YOUR API KEY HERE>"
    WALLET_PRIVATE_KEY = "<YOUR PRIVATE KEY HERE>"
    ```

1. In the `hardhat.config.js` file, add the following lines:

    ```js
    const INFURA_API_KEY_LINEA_SEPOLIA = process.env.INFURA_API_KEY_LINEA;
    ```

    ```js
    lineaSepolia: {
    url: `https://linea-sepolia.io/v3/${INFURA_API_KEY_LINEA}`,
    accounts: [PRIVATE_KEY],
    },
   ```

1. In the `hardhat.config.js` file, uncomment the following line:

    ```js
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    ```

1. Deploy the smart contract to the Linea Sepolia testnet

```
npx hardhat run --network (lineaSepolia) scripts/deploy.js
```

Hardhat will return the deployed smart contract address in your terminal. View and verify your smart contract
on the [Linea Sepolia block explorer](https://sepolia.lineascan.build/).
</TabItem> 

<TabItem value="Mainnet" label="Mainnet">

1. In your `.env` file, add your Infura Linea API key and add your wallet private key.

    ```
    INFURA_API_KEY_LINEA = "<YOUR API KEY HERE>"
    WALLET_PRIVATE_KEY = "<YOUR PRIVATE KEY HERE>"
    ```

1. In the `hardhat.config.js` file, add the following lines:

    ```js
    const INFURA_API_KEY_LINEA = process.env.INFURA_API_KEY_LINEA;
    ```

    ```js
    linea: {
    url: `https://linea-mainnet.io/v3/${INFURA_API_KEY_LINEA}`,
    accounts: [PRIVATE_KEY],
    },
    ```

1. In the `hardhat.config.js` file, uncomment the following line:

    ```js
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    ```

1. Deploy the smart contract to the Linea Mainnet:

```
npx hardhat run --network (linea) scripts/deploy.js
```

Hardhat will return the deployed smart contract address in your terminal. View and verify your smart contract
on the [Linea Mainnet block explorer](https://lineascan.build/). 
</TabItem> 

</Tabs>

## Deploy your smart contract with Foundry

After finding the smart contract or protocol you want to work with in [Cookbook](https://www.cookbook.dev/chains/Linea?utm=lineadocs),
select the **Download Source** option and select **Foundry** to download the contract boilerplate. For this
example, we'll use [Cookbook's Simple ERC-20 Token Smart Contract](https://www.cookbook.dev/contracts/simple-token?utm=lineadocs).

**Prerequisites**:

- [Install Rust](https://doc.rust-lang.org/book/ch01-01-installation.html).
- [Install Foundry](https://book.getfoundry.sh/getting-started/installation#using-foundryup).

1. In the project directory, build the contracts:

    ```sh
    forge build
    ```

    If you encounter a "stack too deep" error, try running the following command instead

    ```sh
    forge build --via
    ```

1. In the `scripts` directory, uncomment all the code in the `contract.s.sol` file.
    Replace `"ARG1"`, `"ARG2"`, `2000` with your `Token Name`, `Token Symbol` and desired
    `Token Quantity` where you see the code below:

    ```solidity
    FixedToken _contract = new FixedToken("ARG1", "ARG2", 2000);
    ```

1. Update the `.env` file with your [Linea RPC URL](https://docs.infura.io/api/networks/linea/choose-a-network), followed
    by your [MetaMask wallet private key](https://metamask.io/) and your
    [Etherscan API key token values](https://etherscan.io/apis).

    :::note

    The example uses Sepolia, but you can update it to use Mainnet instead.

    :::

1. Run the command to define your environment variables globally:

    ```sh
    source .env
    ```

1. Deploy your contracts:

    ```sh
    forge script script/contract.s.sol:ContractScript --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv
    ```

    :::note
    If using Mainnet, then update the `--rpc-url` accordingly with the variable in the `.env` file. 
    :::

Your contract will be verified on the Linea Sepolia explorer automatically upon deployment. You can manage and
interact with your newly deployed smart contract in the [Linea Sepolia block explorer](https://sepolia.lineascan.build/).

:::note

The tests in the `contract.t.sol` file are only examples, please generate your own.

:::

## Resources

For more information on using Cookbook to find, learn about or build with smart contracts, see
the following resources:

- [Documentation](https://docs.cookbook.dev/)
- [Blog](https://medium.com/@cookbookdev)
- [X (Twitter)](https://twitter.com/cookbook_dev)
- [Community](https://discord.gg/cookbook)
