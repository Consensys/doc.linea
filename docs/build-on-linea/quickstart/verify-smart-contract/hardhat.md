---
title: Hardhat
---

To verify your Hardhat contracts, you can use [Hardhat's Etherscan plugin](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan) to verify contracts on Lineascan.

:::note

Note that this is included as part of the `hardhat-toolbox` plugin.

:::

These steps assume you stored your secret keys in a `.env` file, which you can read more about [here](../deploy-smart-contract/hardhat.mdx#use-hardhatconfigjs).

## Download the plugin

If you aren't already using `@nomicfoundation/hardhat-toolbox`, you can use `@nomicfoundation/hardhat-verify` instead. Find the instructions on how to add it to your project [here](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#installation).

## Add your Lineascan API Key

We'll be using a `.env` file to store our sensitive information. You can find instructions on how to set up the file [here](../deploy-smart-contract/hardhat.mdx#use-hardhatconfigjs).

Next, you'll need to get a Lineascan (Linea instance of Etherscan) key by creating an account at [https://lineascan.build/myapikey](https://lineascan.build/myapikey). Grab your key, and add it to the `.env` file:

```
LINEASCAN_API_KEY=YOUR_API_KEY_HERE
```

Then, add the key to your `hardhat.config.js` as follows:

```javascript
const { PRIVATE_KEY, LINEASCAN_API_KEY } = process.env;
```

## Add the custom chain

:::note

These instructions verify using the Linea instance of Etherscan, which currently does not support Yul. If you would like to verify using Blockscout, please use the API URLs referenced [here](../../../use-mainnet/info-contracts.mdx#block-explorers).

:::

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

First, we'll need to add a custom chain like so:

<Tabs>
  <TabItem value="Mainnet" label="Mainnet" default>

```javascript
networks: {
  linea_mainnet: {
    ...
  }
},
etherscan: {
  apiKey: {
    linea_mainnet: LINEASCAN_API_KEY
  },
  customChains: [
    {
      network: "linea_mainnet",
      chainId: 59144,
      urls: {
        apiURL: "https://api.lineascan.build/api",
        browserURL: "https://lineascan.build/"
      }
    }
  ]
}
```

  </TabItem>
  <TabItem value="Testnet" label="Testnet">

```javascript
networks: {
  linea_testnet: {
    ...
  }
},
etherscan: {
  apiKey: {
    linea_testnet: LINEASCAN_API_KEY
  },
  customChains: [
    {
      network: "linea_testnet",
      chainId: 59140,
      urls: {
        apiURL: "https://api-testnet.lineascan.build/api",
        browserURL: "https://goerli.lineascan.build/address"
      }
    }
  ]
}
```

  </TabItem>
</Tabs>

:::note

The Etherscan `apiKey` and network name for your custom chain must match the network name under `networks` in your `hardhat.config.js`.

:::

## Verify the smart contract

To verify your contract, run the following command:

<Tabs>
  <TabItem value="Mainnet" label="Mainnet" default>

```bash
npx hardhat verify --network linea_mainnet <DEPLOYED_CONTRACT_ADDRESS> <CONTRACT_ARGUMENTS>
```

  </TabItem>
  <TabItem value="Testnet" label="Testnet">

```bash
npx hardhat verify --network linea_testnet <DEPLOYED_CONTRACT_ADDRESS> <CONTRACT_ARGUMENTS>
```

  </TabItem>
</Tabs>

You should see something that looks a little like this:

```bash
Successfully submitted source code for contract
contracts/Lock.sol:Lock at 0xC44De7f82f93799a8E405DF3221AfB115B4E7e45
for verification on the block explorer. Waiting for verification result...

Successfully verified contract Lock on the block explorer.
https://goerli.lineascan.build/address/address/0xC44De7f82f93799a8E405DF3221AfB115B4E7e45#code
```

:::note

If you get an error saying that the address does not have bytecode, it probably means that Etherscan has not indexed your contract yet. In that case, wait for a while and then try again.

:::

You can check that it was verified correctly by navigating to the [testnet block explorer](https://goerli.lineascan.build/) or the [mainnet block explorer](https://lineascan.build/) and pasting in the deployed contract address.

:::info

[Learn more about different configurations for verifying your smart contracts](https://hardhat.org/hardhat-runner/docs/guides/verifying).

:::
