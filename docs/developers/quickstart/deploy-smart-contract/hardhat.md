---
title: Hardhat
sidebar_position: 2
---

# Hardhat

In this tutorial, we'll walk through creating a basic Hardhat project and deploying a token contract.

Here's a video walkthrough:

<iframe width="560" height="315" src="https://www.youtube.com/embed/cZ4F2uDBl_A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Prerequisites

<!--markdown-link-check-enable -->

Before you begin, ensure you've:

1. [Set up your wallet](../../../use-linea/set-up-your-wallet.md)
1. [Funded your wallet with goerli ETH](../../../use-linea/fund.md)
1. [Bridged Goerli ETH to Linea](../../../use-linea/bridge-funds.md)
1. [Set up your environment using Hardhat's recommended instructions](https://hardhat.org/tutorial/setting-up-the-environment#2.-setting-up-the-environment).

## Create a Hardhat project

To create an empty Hardhat project, run the following commands:

```bash
mkdir linea-tutorial
```

```bash
cd linea-tutorial
```

```bash
npm init
```

```bash
npm install --save-dev hardhat
```

```bash
npx hardhat
```

In the menu that appears, select `Create an empty hardhat.config.js` and press **Enter**.

Hardhat recommends using their plugin, `@nomicfoundation/hardhat-toolbox`, which can be downloaded by entering `Y` during the project creation process or by running:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-network-helpers @nomicfoundation/hardhat-chai-matchers @nomiclabs/hardhat-ethers @nomiclabs/hardhat-etherscan chai ethers hardhat-gas-reporter solidity-coverage @typechain/hardhat typechain @typechain/ethers-v5 @ethersproject/abi @ethersproject/providers
```

And adding the line `require("@nomicfoundation/hardhat-toolbox");` to the top of `hardhat.config.js` file.

## Write the smart contract

To write a smart contract, replace the file `Lock.sol` with `Token.sol`. Add the following code:

```sol
pragma solidity 0.8.18;

// SPDX-License-Identifier: MIT

contract Token {
  string public name = "My Token";
  string public symbol = "MTK";
  uint8 public decimals = 18;
  uint256 public totalSupply = 100000000;

  mapping (address => uint256) public balances;
  address public owner;

  constructor() {
    owner = msg.sender;
    balances[owner] = totalSupply;
  }

  function transfer(address recipient, uint256 amount) public {
    require(balances[msg.sender] >= amount, "Insufficient balance.");
    balances[msg.sender] -= amount;
    balances[recipient] += amount;
  }
}
```

Then, to compile your contract, run `npx hardhat compile`.

## Create a deployment script

To deploy your contract, we'll need to write a deployment script for `Token.sol`. Replace the code in `scripts/deploy.js` with:

```javascript
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();

  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Deploy your contract

You can deploy with Hardhat by [adding Linea to your `hardhat.config.js`](#hardhatconfigjs), but you can also use [Truffle Dashboard](#truffle-dashboard) to deploy directly with your MetaMask wallet.

### Truffle Dashboard

[Truffle Dashboard](https://trufflesuite.com/docs/truffle/how-to/use-the-truffle-dashboard/) allows you to forgo saving your private keys locally, instead connecting to your MetaMask wallet for deployments. To deploy with Truffle Dashboard:

1. [Install Truffle using the recommended installation procedure](https://trufflesuite.com/docs/truffle/how-to/install/)
1. Run `truffle dashboard` in your terminal, which will open a window on port `24012`.
1. Navigate to `localhost:24012` in your browser. Please ensure that Dashboard is connected to the Linea testnet by connecting your MetaMask wallet to Linea. For reference, the Linea testnet network ID is `59140`.

   ![confirm network](../../../assets/dashboard_network.png)

1. Add the the the Dashboard network to your `hardhat.config.js`

   ```javascript
   networks: {
     // other networks
     truffledashboard: {
       url: "http://localhost:24012/rpc"
     }
   },
   ```

1. In a separate terminal, in your Hardhat project, run

   ```bash
   npx hardhat run scripts/deploy.js --network truffledashboard
   ```

1. Navigate back to `localhost:24012`. You should see a prompt asking your to confirm the deployment. Click **Confirm**.

   ![confirm deployment](../../../assets/dashboard_deploy.png)

1. You should see something similar to:

   ```bash
   Deploying contracts with the account: YOUR_ACCOUNT_NUMBER
   Account balance: 71790921294697313
   Token address: 0xD8b30F2B76361AD82d086414a1c47b0062DCBaf3
   ```

### `hardhat.config.js`

To deploy to Linea, we'll need to add the network to our `hardhat.config.js`. To do this:

1. Create a `.env` file in the root folder with your wallet's private key.

   ```
   PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE
   ```

   :::warning

   Please do not check your keys into source control. We recommend adding `.env` to your `.gitignore`

   :::

1. Download `dotenv`
   ```
   npm i -D dotenv
   ```
1. Add Linea to your `hardhat.config.js` file:

   ```javascript
   require("@nomicfoundation/hardhat-toolbox");
   require("dotenv").config();
   const { PRIVATE_KEY } = process.env;

   module.exports = {
     solidity: "0.8.17",
     networks: {
       linea: {
         url: `https://rpc.goerli.linea.build/`,
         accounts: [PRIVATE_KEY],
       },
     },
   };
   ```

1. Call `npx hardhat run scripts/deploy.js --network linea` from the CLI. Your output should look something like this:
   ```bash
   Deploying contracts with the account: YOUR_ACCOUNT_NUMBER
   Account balance: 71790921294697313
   Token address: 0xD8b30F2B76361AD82d086414a1c47b0062DCBaf3
   ```

Next, you can optionally [verify your contract on the network](../verify-smart-contract/hardhat.md).

:::note

You may encounter rate limiting if you are connecting via the public endpoint. If your dapp needs full Infura node access, open a support ticket [here](https://support.infura.io/hc/en-us/articles/15116941373979).

:::

<!--markdown-link-check-enable -->
