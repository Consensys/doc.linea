---
title: How to deploy a smart contract
---

# Deploy a smart contract

You can use the [Truffle](https://www.trufflesuite.com) development framework to build, test, and deploy
smart contracts on ConsenSys zkEVM.

Use the [Truffle quickstart instructions](https://trufflesuite.com/docs/truffle/quickstart/)
to quickly start using Truffle with ConsenSys zkEVM.

!!! important

    Ensure you change your RPC endpoint to `https://consensys-zkevm-goerli-prealpha.infura.io/v3/<INFURA_API_KEY>`
    in the `truffle-config.js` file.

Alternatively, use the steps below to deploy a smart contract using Truffle.

## Prerequisites

[Install Truffle using the recommended installation procedure](https://trufflesuite.com/docs/truffle/how-to/install/).

## Steps

1. Create a project directory for your Truffle project. For example, `myToken`.

    ```bash
    mkdir myToken; cd myToken
    ```

1. In your project directory, create the bare project containing the files and directories for the Truffle
    project:

    ```bash
    truffle init
    ```

1. Create your smart contract in the `contracts` directory. For example, to create a simple
    token contract, create a file called `Token.sol` in the `contracts` directory and add the following
    contract code:

    ```javascript
    pragma solidity 0.8.10;

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

    !!! warning "Do not use the contract code in production"

        The above contract is for testing purposes and has not been audited.

1. In the root of your project folder, compile the contract:

    ```bash
    truffle compile
    ```

1. Create a migration script in the `migrations` directory to deploy and manage the
    contract on the ConsenSys zkEVM network. For example, to deploy the token contract, create a file called
    `1_deploy_token.js` in the `migrations` directory, and add the following code:

    ```javascript
    const Token = artifacts.require('Token');

    module.exports = function(deployer) {
      deployer.deploy(Token);
    };
    ```

1. Connect to the ConsenSys zkEVM testnet, by adding the following configuration to the `truffle-config.js` file:

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

1. Set your `MNEMONIC` and `INFURA_API_KEY` as environment variables.

    !!! important

        We recommend using a `.env` file for this purpose. Please do not check your keys into source control!
