---
title: Foundry
sidebar_position: 2
---

To verify your Foundry contracts, you can use Foundry's [verify-contract](https://book.getfoundry.sh/reference/forge/forge-verify-contract) to verify contracts on Lineascan.

You'll need to get a Lineascan (Linea instance of Etherscan) API key by creating an account at [https://lineascan.build/myapikey](https://lineascan.build/myapikey).

## Verify your smart contract

### Verify a contract that has already been deployed

If you want to verify a contract that has already been deployed, you can use the following commands:

<Tabs>
  <TabItem value="Mainnet" label="Mainnet" default>

```bash
forge verify-contract --etherscan-api-key <ETHERSCAN_API_KEY> --verifier-url https://api.lineascan.build/api <CONTRACT_ADDRESS> path_to_contract:contract_name --watch
```

  </TabItem>
  <TabItem value="Testnet" label="Testnet">

```bash
forge verify-contract --etherscan-api-key LINEASCAN_API_KEY --verifier-url https://api-testnet.lineascan.build/api <CONTRACT_ADDRESS> path_to_contract:contract_name --watch
```

  </TabItem>
</Tabs>

You should see something a little like this:

```bash
Start verifying contract `0x8de6e9b6c774c8b7aba587ed84e5ad0a45837b16` deployed on mainnet

Submitting verification for [src/Counter.sol:Counter] "0x8dE6e9b6c774c8B7AbA587ED84E5AD0A45837b16".
Submitted contract for verification:
        Response: `OK`
        GUID: `ynnfyvwcqev9i5xr1urdqt9kdwx4zkurvpu7rgh2ywmyp22dpy`
        URL:
        https://etherscan.io/address/0x8de6e9b6c774c8b7aba587ed84e5ad0a45837b16
Contract verification status:
Response: `NOTOK`
Details: `Pending in queue`
Contract verification status:
Response: `OK`
Details: `Pass - Verified`
Contract successfully verified
```

### Verify a contract upon creation

If you want to verify a contract that has already been deployed, you can use the following commands:

<Tabs>
  <TabItem value="Mainnet" label="Mainnet" default>

```bash
forge create --rpc-url https://linea-goerli.infura.io/v3/INFURA_API_KEY src/Counter.sol:Counter --private-key YOUR_PRIVATE_KEY --verify --verifier-url
l https://apilineascan.build/api --etherscan-api-key LINEASCAN_API_KEY
```

  </TabItem>
  <TabItem value="Testnet" label="Testnet">

```bash
forge create --rpc-url https://linea-goerli.infura.io/v3/INFURA_API_KEY src/Counter.sol:Counter --private-key YOUR_PRIVATE_KEY --verify --verifier-url
l https://api-testnet.lineascan.build/api --etherscan-api-key LINEASCAN_API_KEY
```

  </TabItem>
</Tabs>

You can check that it was verified correctly by navigating to the [testnet block explorer](https://goerli.lineascan.build/) or the [mainnet block explorer](https://lineascan.build/) and pasting in the deployed contract address.

:::info

[Learn more about different configurations for verifying your smart contracts](https://book.getfoundry.sh/reference/forge/forge-verify-contract).

:::
