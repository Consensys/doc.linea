---
title: Truffle
sidebar_position: 1
---

To verify your contracts, you can use Truffle's verification plugin [truffle-plugin-verify](https://github.com/rkalis/truffle-plugin-verify).

These steps assume you stored your secret keys in a `.env` file, which you can read more about [here](/build-on-linea/quickstart/deploy-smart-contract/truffle.mdx/#truffle-configjs).

## Download the plugin

In your Truffle project, install the plugin:

```bash
npm install -D truffle-plugin-verify
```

Add the plugin to the `truffle-config.js` file:

```javascript
module.exports = {
  /* ... rest of truffle-config */

  plugins: ["truffle-plugin-verify"],
};
```

## Add your Etherscan API Key

Then, you'll need to get an Etherscan key by creating an account at https://etherscan.io/. Grab your key, and add it to the `.env` file:

```
MNEMONIC=YOUR_MNEMONIC_HERE
ETHERSCAN_API_KEY=YOUR_API_KEY_HERE
```

## Add the custom chain

Because Linea is not supported by the network yet, we'll have to get our Etherscan API key and add a custom chain:

```javascript
require("dotenv").config();
const { MNEMONIC, ETHERSCAN_API_KEY } = process.env;
// ... rest of truffle-config
module.exports = {
  networks: {
    linea: {
      provider: () => {
        return new HDWalletProvider(
          MNEMONIC,
          `https://rpc.goerli.linea.build/`,
        );
      },
      verify: {
        apiUrl: "https://explorer.goerli.linea.build/api",
        apiKey: ETHERSCAN_API_KEY,
        explorerUrl: "https://explorer.goerli.linea.build/",
      },
      network_id: "59140",
    },
  },
  // ... rest of truffle-config
};
```

## Verify the smart contract

Run the following to verify the most recently deployed contract:

```bash
truffle run verify <DEPLOYED_CONTRACT_NAME> --network linea
```

Alternatively, verify a contract at a specific address:

```bash
truffle run verify <DEPLOYED_CONTRACT_NAME>@<ADDRESS> --network linea
```

Your output should be similar to the following:

```bash
Verifying contracts on consensys
   Verifying Token
   Pass - Verified: https://explorer.goerli.linea.build//0xD104FE0116aFdB588798133B13965FEC5d2eEd35#code
   Successfully verified 1 contract(s).
Verifying contracts on sourcify
   Sourcify has no support for network linea with chain id 59140
```

You can check that it was verified correctly by navigating to the [block explorer](https://explorer.goerli.linea.build/) and pasting in the deployed contract address.

![verified contract](/img/quests/blockscout_verification.png)
