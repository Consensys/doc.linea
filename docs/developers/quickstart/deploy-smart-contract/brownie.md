---
title: Brownie
sidebar_position: 5
---

# Brownie

Brownie is a Python-based development and testing framework for Ethereum smart contracts. It provides an efficient environment for writing, compiling, deploying, and testing smart contracts on the Ethereum blockchain.

## Create a smart contract

1. First, set up your development environment:

   i. Ensure you have Python and `pipx` installed on your computer. You can download Python from the [official Python website](https://www.python.org), and you can install `pipx` by running the following commands in your terminal:

   ```
   python3 -m pip install --user pipx
   python3 -m pipx ensurepath
   ```

   ii. Install Brownie by running the following command in your terminal:

   ```
   pipx install eth-brownie
   ```

   :::note See [here](https://eth-brownie.readthedocs.io/en/stable/install.html#installing-brownie) for other methods to install brownie :::

   Once installation is complete, run `brownie` on your terminal to verify that it worked.

2. Initialize a new Brownie project:

   i. Open your terminal and create a new directory for your Brownie project.

   ii. Navigate to the project's directory.

   iii. Run the following command to initialize a new Brownie project:

   ```bash
   brownie init
   ```

3. Write your smart contract:

   i. Open your project's directory in your preferred code editor

   ii. Navigate to the contracts directory.

   iii. Create a new Solidity or Vyper contract file (e.g., MyContract.sol).

   iv. Write your smart contract code using the Solidity or Vyper syntax. In the example below, we will use a simple storage smart contract written in solidity

   ```bash
   pragma solidity 0.8.17;

   // SPDX-License-Identifier: GPL-3.0

   contract Storage {}

       uint256 number;

       function store(uint256 num) public {
           number = num;
       }

       function retrieve() public view returns (uint256){
           return number;
       }
   }
   ```

4. Set up Infura:

   i. In the root of your project directory, create a file and name it `.env`.

   ii. Add your WEB3 Infura project ID to the `.env` file in the following format:

   ```bash
   NETWORK_URL=<https://linea-goerli.infura.io/v3/YOUR-INFURA-PROJECT-ID-HERE>
   ```

   iii. In the root of your project's directory, create another file and name it `brownie.config.yaml`.

   iv. In the `brownie.config.yaml` file, specify the path to the environment variable configuration by adding the following line of code:

   ```bash
   dotenv: .env
   ```

5. Compile your smart contract:

   i. In your terminal, run the following command to compile your smart contracts:

   ```
   brownie compile
   ```

   Brownie will automatically compile all the contracts in the contracts directory and generate the necessary artifacts.

## Deploy a smart contract:

1. Add the Linea network:

   i. In your terminal, run the following command to add Linea to the list of available networks:

   ```bash
   brownie networks add Ethereum Linea host=https://rpc.goerli.linea.build chainid=59140
   ```

   ii. Confirm you are on the Linea Network by running the following command:

   ```
   brownie console --network Linea
   ```

   Next, input the following options individually:

   ```
   network.is_connected()
   network.show_active()
   ```

2. Add a deployment account:

   You can either add an existing eth account for your smart contract deployment, or create a new account.

   i. To add an existing account, run the following command in your terminal:

   ```
   brownie accounts new deployer
   ```

   You will be prompted to enter the private key for the account you wish to add, and set a password for encryption. Then, your account will be added with the account name: "deployer".

   ii. To create a new account, run the following command in your terminal:

   ```
   brownie accounts generate deployer
   ```

   A mnemonic will be generated, and a new account will be created with the account name: "deployer". Remember to save your mnemonic.

3. Create the corresponding deployment script in the scripts directory and update the deployment script (for example, deploy.py) with your deployment logic.

   ```py
   #!/usr/bin/3

   from brownie import Storage, accounts

   def main():
       account = accounts.load('deployer')
       Storage.deploy({'from': account})
   ```

4. Run the following command to deploy your smart contract:

   ```bash
   brownie run scripts/deploy.py --network Linea
   ```

Brownie will deploy your smart contract to the Linea network.

For additional information, please reference Brownie's [documentation](https://eth-brownie.readthedocs.io).
