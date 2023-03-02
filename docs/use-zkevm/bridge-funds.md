---
title: Bridge your funds
description: Bridge funds between Goerli and ConsenSys zkEVM
sidebar_position: 4
---

:::warning

Do not bridge funds to the ConsenSys zkEVM network until you have been [onboarded](onboarding-process.md). Bridged funds will be inaccessible until you have been onboarded.

:::

# Set up

Before you begin, ensure your wallet is:

1. [Configured to use the ConsenSys zkEVM network](./set-up-your-wallet.md)
1. [Funded with test tokens](./fund.md)

## Bridge from Goerli to ConsenSys zkEVM

1.  [Navigate to the token bridge](https://bridge.goerli.zkevm.consensys.net/send?token=ETH) and select the Goerli network in your MetaMask wallet.
1.  In the top dropdown menu, select **Goerli**, and in the bottom dropdown menu, select **ConsenSys zkEVM**.
1.  Select your desired token (**USDC** or **ETH**).
1.  Specify an amount less than your balance to send.
1.  If you are sending **USDC**, you'll need to select approve before selecting send.
1.  Select **Send**. First time users need to approve the ConsenSys zkEVM bridge to allow token transfers.
1.  In your MetaMask wallet, confirm the transfer.

The sent amount is deducted from your Goerli account on MetaMask. Switch to the ConsenSys zkEVM network in your wallet to view the bridged funds.

<!--markdown-link-check-enable -->

:::note

This process can take up to 15 minutes to complete. You can view the status of your funds on the [block explorer](https://explorer.goerli.zkevm.consensys.net/).

:::

You can now use the funds on ConsenSys zkEVM to transfer funds between accounts or interact with smart contracts on the network. For example, you can use the [Uniswap v3 protocol](use-uniswap.md) that's deployed on the network.

## Bridge from ConsenSys zkEVM to Goerli

Ensure that you have bridged funds from Goerli to ConsenSys zkEVM. Then:

1. [Navigate to the token bridge](https://bridge.goerli.zkevm.consensys.net/send?token=ETH) and select the ConsenSys zkEVM network in your MetaMask wallet.
1. In the top dropdown menu, select **ConsenSys zkEVM**, and in the bottom dropdown menu, select **Goerli**.
1. Select your desired token (**USDC** or **ETH**).
1. If you are sending **USDC**, you'll need to select approve before selecting send.
1. Select send. First time users need to approve the ConsenSys zkEVM bridge to allow token transfer.
1. In your MetaMask wallet, confirm the transfer.

The sent amount is deducted from your account on ConsenSys zkEVM. Switch to the Goerli network in your wallet to view the bridged funds.

:::note

This process can take up to 5 minutes to complete. You can view the status of your funds on the [block explorer](https://explorer.goerli.zkevm.consensys.net/).

:::

<!--markdown-link-check-enable -->
