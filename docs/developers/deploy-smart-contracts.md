---
title: How to deploy a smart contract
sidebar_position: 1
---

# Deploy a smart contract

You can use the [Truffle](https://www.trufflesuite.com) development framework to build, test, and deploy smart contracts on the ConsenSys zkEVM.

Use the [Truffle quickstart instructions](https://trufflesuite.com/docs/truffle/quickstart/) to quickly start using Truffle with ConsenSys zkEVM.

:::tip

Ensure you change your RPC endpoint to `https://consensys-zkevm-goerli-prealpha.infura.io/v3/<INFURA_API_KEY>` in the `truffle-config.js` file.

:::

Alternatively, use the steps below to deploy a smart contract using Truffle.

## Prerequisites

[Install Truffle using the recommended installation procedure](https://trufflesuite.com/docs/truffle/how-to/install/).

## Steps

1.  Create a project directory for your Truffle project. For example, `myToken`.

    ```bash
    mkdir myToken; cd myToken
    ```

2.  In your project directory, create the bare project containing the files and directories for the Truffle project:

    ```bash
    truffle init
    ```

3.  Create your smart contract in the `contracts` directory. For example, to create a simple token contract, create a file called `Token.sol` in the `contracts` directory and add the following contract code:

    ```sol
    pragma solidity 0.8.17;

    // SPDX-License-Identifier: MIT

    contract Token {
      string public name = "My Token";
      string public symbol = "MTK";
      uint8 public decimals = 18;
      uint256 public totalSupply = 100000000;

      mapping (address => uint256) public balances;
      address public owner;

      constructor() public {
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

    :::warning Do not use this contract code in production

    The above contract is for testing purposes and has not been audited.

    :::

4.  In the root of your project folder, compile the contract:

    ```bash
    truffle compile
    ```

5.  Create a migration script in the `migrations` directory to deploy and manage the contract on the ConsenSys zkEVM network. For example, to deploy the token contract, create a file called `1_deploy_token.js` in the `migrations` directory, and add the following code:

    ```javascript
    const Token = artifacts.require("Token");

    module.exports = function (deployer) {
      deployer.deploy(Token);
    };
    ```

6.  Truffle offers two ways of deploying your contracts:

- Truffle Dashboard: You can find more information about Truffle Dashboard [here](https://trufflesuite.com/docs/truffle/how-to/use-the-truffle-dashboard/). Truffle Dashboard allows you to forgo saving your private keys locally, instead connecting to your MetaMask wallet for deployments. Follow these steps to use Truffle Dashboard with the ConsenSys zkEVM:

  - Configure your MetaMask wallet to connect to the ConsenSys zkEVM, using [these instructions](https://consensys.net/docs/zk-evm/en/latest/get-started/configure-metamask/).
  - Set your MetaMask network to the ConsenSys zkEVM.
  - Run `truffle dashboard` in your CLI. A window on port 24012 will open.
  - The Truffle Dashboard will ask you to confirm that your network is correct. _For reference, the ConsenSys zkEVM testnet network id is 59140._
  - In your CLI, run `truffle migrate`. You will see a signature request for each contract in the Truffle Dashboard. Confirm each request, and your contracts will deploy.

- Classic Truffle:

  - Connect to the ConsenSys zkEVM testnet, by adding the following configuration to the `truffle-config.js` file:

    ```javascript
    const HDWalletProvider = require('@truffle/hdwallet-provider')

    ...
    module.exports = {
      networks: {
        ...
        // for testnet
        'consensys-goerli': {
          provider: () => {
            return new HDWalletProvider(MNEMONIC, 'https://consensys-zkevm-goerli-prealpha.infura.io/v3/INFURA_API_KEY')
          }
          network_id: "59140"
        }
      },
      ...
    }
    ```

  - Set your `MNEMONIC` and `INFURA_API_KEY` as environment variables.

    :::warning

    We recommend using a `.env` file for this purpose. Please do not check your keys into source control!

    :::

  - Deploy your contracts by running `truffle migrate --network="consensys-goerli"`.
