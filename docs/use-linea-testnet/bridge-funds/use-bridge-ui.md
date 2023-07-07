---
title: Bridge your funds with Hop
description: Bridge funds between Goerli and Linea using the Hop UI
sidebar_position: 2
---

# Bridge your funds

The following steps take you through bridging USDC and Goerli ETH using the Hop bridge.

## Set up

Before you begin, ensure your wallet is:

1. [Configured to use Linea](/use-mainnet/set-up-your-wallet.mdx)
1. [Funded with test tokens](/use-linea-testnet/fund.md#get-test-eth-on-goerli)

## Bridge from Goerli to Linea

1.  [Navigate to the token bridge](https://goerli.hop.exchange/#/send?token=ETH&sourceNetwork=ethereum&destNetwork=linea)
1.  Make sure in the top dropdown menu, **Goerli** is selected, and in the bottom dropdown menu, **Linea** is selected.
1.  Select your desired token (**USDC** or **ETH**).
1.  Specify an amount less than your balance to send.
1.  If you are sending **USDC**, you'll need to select approve before selecting send.
1.  Select **Send**. First time users need to approve the Linea bridge to allow token transfers.
1.  In your MetaMask wallet, confirm the transfer.

The sent amount is deducted from your Goerli account on MetaMask. Switch to Linea in your wallet to view the bridged funds.

<!--markdown-link-check-enable -->

:::note

This process can take up to 15 minutes to complete. You can view the status of your funds on the [block explorer](https://goerli.lineascan.build/).

:::

You can now use the funds on Linea to transfer funds between accounts or interact with smart contracts on the network. For example, you can use the [Uniswap v3 protocol](../explore/use-uniswap.md) that's deployed on the network.

## Bridge from Linea to Goerli

Ensure that you have bridged funds from Goerli to Linea. Then:

1. [Navigate to the token bridge](https://goerli.hop.exchange/#/send?token=ETH&sourceNetwork=linea&destNetwork=ethereum) and select Linea in your MetaMask wallet.
1. Make sure in the top dropdown menu, **Linea** is selected, and in the bottom dropdown menu, **Goerli** is selected.
1. Select your desired token (**USDC** or **ETH**).
1. If you are sending **USDC**, you'll need to select approve before selecting send.
1. Select send. First time users need to approve the Linea bridge to allow token transfer.
1. In your MetaMask wallet, confirm the transfer.

The sent amount is deducted from your account on Linea. Switch to the Goerli network in your wallet to view the bridged funds.

:::note

This process can take up to 5 minutes to complete. You can view the status of your funds on the [block explorer](https://goerli.lineascan.build/).

:::

<!--markdown-link-check-enable -->
