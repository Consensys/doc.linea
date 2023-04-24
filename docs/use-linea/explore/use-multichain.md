---
title: Use the Multichain bridge
sidebar_position: 1
---

# Multichain

[Multichain](https://docs.multichain.org/getting-started/introduction) is an infrastructure developed for arbitrary cross-chain interactions.

In this guide, we'll walk you through how to bridge TUSD and EUROe using Multichain over to Linea!

Before you begin, ensure your wallet is [configured to use Linea](../set-up-your-wallet.md).

## Add Avalanche Fuji testnet to your MetaMask wallet

First, we'll need to add the Avalanche Fuji testnet to our MetaMask wallet. We can easily do so by heading over to [chainlist.wtf](https://chainlist.wtf/). Then, search for Avalanche. Finally, click `Connect Wallet` and then click `Add Chain` for the Avalanche Fuji Testnet with chain ID 43113.

You should now see the test network in your MetaMask wallet.

## Get AVAX

To get AVAX, you'll need to:

1. Navigate to the [Linea faucet](https://faucet.goerli.linea.build/)
1. Connect your wallet and switch to the Avalanche Fuji testnet
1. Click "Go to Faucet" on the Avax Fuji card to go to the Avalanche faucet
1. Connect your MetaMask wallet
1. Ensure Fuji (C-Chain) is selected for the "Network" field
1. Select "AVAX" from the "Select Token" drop down
1. Request 2 AVAX

## Get TUSD

To get TUSD, you'll need to:

1. [Ensure you've gotten AVAX](#get-avax)
1. Navigate to the [Linea faucet](https://faucet.goerli.linea.build/)
1. Connect your wallet and switch to the Avalanche Fuji testnet
1. Lock 1 AVAX in at 15:1 ratio on the TUSD card. So, locking 1 AVAX will give you 15 TUSD
1. Click "CLAIM"
1. Confirm the transaction on MetaMask

To see TUSD in your MetaMask wallet, make sure you've clicked "Add to MetaMask" on the TUSD card.

## Bridge TUSD to Linea

Now, to use Multichain, you'll need to:

1. Navigate to [Multichain's test bridge](https://test.multichain.org/#/router)
1. Connect your wallet and switch to the Avalanche Fuji testnet
1. Ensure Avalanche testnet and TUSD are selected for the "From" field, and Linea zkevm testnet and TUSD are selected for the "To" field
1. Enter the desired amount of TUSD to bridge
1. Click "Approve TUSD" (you can select max as the spending cap) and confirm in MetaMask
1. Click "Swap" and confirm in MetaMask

## Get EUROe

To get EUROe, you'll need to:

1. [Ensure you've gotten AVAX](#get-avax)
1. Navigate to the [Linea faucet](https://faucet.goerli.linea.build/)
1. Connect your wallet and switch to the Avalanche Fuji testnet
1. Click "Go to Faucet" on the EUROe to go to the Avalanche faucet
1. Connect your MetaMask wallet
1. Ensure Fuji (C-Chain) is selected for the "Network" field
1. Select "EUROe Stablecoin" from the "Select Token" drop down
1. Request 10 EUROE

To see EUROe in your MetaMask wallet, make sure you've clicked "Add to MetaMask" on the EUROe card.

## Bridge EUROe to Linea

Now, to use Multichain, you'll need to:

1. Navigate to [Multichain's test bridge](https://test.multichain.org/#/router)
1. Connect your wallet and switch to the Avalanche Fuji testnet
1. Ensure Avalanche testnet and EUROe are selected for the "From" field, and Linea zkevm testnet and EUROe are selected for the "To" field
1. Enter the desired amount of EUROe to bridge
1. Click "Approve EUROe" (you can select max as the spending cap) and confirm in MetaMask
1. Click "Swap" and confirm in MetaMask

## Get support

If you run into issues using the Multichain bridge, you can find their support channels [here](https://multichain.zendesk.com/hc/en-us).
