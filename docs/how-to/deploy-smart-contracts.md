---
title: How to deploy a smart contract
---

# Deploy a smart contract

[Truffle](https://www.trufflesuite.com) is a popular development framework that provides a suite of tools for building, testing, deploying, and debugging smart contracts. Because the ConsenSys zkEVM is EVM-compatible and Ethereum JSON-RPC compliant, the Truffle set of tools should work without alteration (except for adding a new RPC endpoint)!

For instructions on how to quickly start using Truffle with the ConsenSys zkEVM, see the Truffle Quickstart instructions [here](https://trufflesuite.com/docs/truffle/quickstart/). Be sure to change your RPC endpoint to `https://consensys-zkevm-goerli-prealpha.infura.io/v3/<INFURA_API_KEY>` in the `truffle-config.js` file.

Alternatively, below is a short tutorial with further details on how to deploy a smart contract using Truffle:

1. Install Truffle by running `npm install -g truffle`.
2. Create a new Truffle project by running `truffle init`. This will create a new directory with the necessary files and directories for the Truffle project.
3. Write your smart contract in the `contracts` directory. For example, if you want to create a simple token contract, you can create a file called `Token.sol` in the `contracts` directory and write your contract like this:

```
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

4. Compile the contract by running `truffle compile`. The ConsenSys zkEVM will accept compilations from the `solc` Solidity compiler, just like Mainnet Ethereum.
5. Create a migration script in the `migrations` directory. A migration script is a special Truffle file that describes how to deploy and manage the contract on the network deployed to (in this case the ConsenSys zkEVM).

For example, to deploy the Token contract, you can create a file called `1_deploy_token.js` in the migrations directory and write the migration script like this:

```
const Token = artifacts.require('Token');

module.exports = function(deployer) {
  deployer.deploy(Token);
};
```

6. Connect to an Ethereum network by editing the `truffle-config.js` file. To connect to the ConsenSys zkEVM testnet, you can add the following configuration to the  `truffle-config.js` file:

```
const HDWalletProvider = require('@truffle/hdwallet-provider')

...
module.exports = {
  networks: {
    ...
    // for testnet
    'consensys-goerli': {
      provider: () => {
        return new HDWalletProvider(MNEMONIC, 'https://consensys-zkevm-goerli-prealpha.infura.io/v3/<INFURA_API_KEY>')
      }
      network_id: "59140"
    }
  },
  ...
}
```
7. Set your `MNEMONIC` and `INFURA_API_KEY` as environment variables. *We recommend keeping a `.env` file for this purpose. Please do not check your keys into source control!*
