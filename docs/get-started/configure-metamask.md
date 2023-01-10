---
title: Configure MetaMask
description: Add ConsenSys zkEVM to MetaMask
---

# Configure MetaMask

Use the MetaMask wallet to interact with ConsenSys zkEVM. You can
[install MetaMask as a browser extension or mobile app](https://metamask.io/download/).
<!-- markdown-link-check-disable -->

To configure your MetaMask for the ConsenSys zkEVM network,
go to the [ConsenSys zkEVM Testnet Portal](https://goerli.zkevm.consensys.net/)
and follow the instructions on the dropdown labelled Testing Environment Setup.
<!--markdown-link-check-enable -->

To retrieve your unique RPC URL:

1. Sign in to your Infura account.
2. Select **Create new key**.
    - Select **Web3 API** for **Network**.
    - Give your project a name. Example: ConsenSys zkEVM
3. A card for ConsenSys zkEVM appears in your list of endpoints.
4. Select the copy icon and paste the RPC URL into the testing environment setup found on our [website](https://goerli.zkevm.consensys.net/).

!!! note

    The ConsenSys zkEVM card only appears in your Infura dashboard after you have been allowlisted
    and have received the confirmation email.

[Add the ConsenSys zkEVM network manually](https://metamask.zendesk.com/hc/en-us/articles/360043227612#h_01G63GGJ83DGDRCS2ZWXM37CV5)
to your MetaMask wallet using the following settings:

- **Network Name**: ConsenSys zkEVM
- **New RPC URL**: Paste here your unique RPC URL endpoint which includes your API key for the ConsenSys zkEVM found within your Infura account
- **Chain ID**: 59140
- **Currency symbol**: crETH
- **Block explorer URL**: https://explorer.goerli.zkevm.consensys.net

To set up a new custom network manually, follow
[these instructions](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC).
