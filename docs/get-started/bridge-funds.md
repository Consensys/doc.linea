---
title: Bridge your funds
sidebar_position: 5
---

# Bridge your funds

Use the ConsenSys zkEVM token bridge to bridge funds (in ETH) between Goerli and the ConsenSys zkEVM network.

:::warning

Do not bridge funds to the ConsenSys zkEVM network until you have been [onboarded](onboarding-process.md).

Bridged funds will be inaccessible until you have been onboarded.

:::

## Goerli to ConsenSys zkEVM

Ensure your [MetaMask wallet has ETH](fund.md) and is [configured](configure-metamask.md) to use the ConsenSys zkEVM network.

Perform the following steps to bridge your Goerli ETH to ConsenSys zkEVM:

1.  Access the bridge on the Goerli testnet.
2.  In the top dropdown menu select **Goerli**, and in the bottom dropdown menu select **ConsenSys zkEVM**.
3.  Select the **USDC** token.
4.  Specify an amount less than your balance to send.
5.  Select **Send**.
6.  Select **Add USDC to MetaMask**.
7.  In your MetaMask wallet, select **ConsenSys zkEVM**. You will see a balance for crUSDC.
8.  Select the **ETH** token.
9.  Specify an amount less than your balance to send.
10. Select **Send**.

:::caution

First time users need to approve the ConsenSys zkEVM bridge to allow the transfer of your test ETH.

:::

11. In the MetaMask window, confirm the transfer.

The sent amount is deducted from your Goerli account on MetaMask. Switch to the ConsenSys zkEVM network in your wallet to view the bridged funds.

You can now use the funds on ConsenSys zkEVM to transfer funds between accounts or interact with smart contracts on the network. For example, use the Uniswap v3 protocol that's deployed on the network.

:::note

This process can take up to 15 minutes to complete.

:::

## ConsenSys zkEVM to Goerli

Ensure that you [added the ConsenSys zkEVM network to MetaMask](configure-metamask.md) and have Goerli ETH in your account on the ConsenSys zkEVM network.

Perform the following steps to bridge your Goerli ETH from ConsenSys zkEVM to Goerli:

1. Access the bridge on the Goerli testnet.
1. In the top dropdown menu select **ConsenSys zkEVM**, and in the bottom dropdown menu select **Goerli**.
1. Select the **ETH** token.
1. Select **Send**.
1. In the MetaMask window, confirm the transfer.

The sent amount is deducted from your account on ConsenSys zkEVM. Switch to the Goerli network in your wallet to view the bridged funds.

:::note

This process can take up to 5 minutes to complete.

:::
