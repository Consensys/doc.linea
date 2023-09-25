---
title: Use FWDX.xyz
description: Decentralized P2P Swap Protocol with Zero-Slippage
---

# [FWDX.xyz](https://fwdx.xyz)

FWDX.xyz is a Decentralized P2P Swap Protocol that provides an open interest orderbook where quotes are firm and fills are guaranteed. Swap orders have zero price-slippage, what you see is what you get, with no deviation from the quoted price.

In this guide, we'll walk you through how to Create Market, Swap & Fill Markets with FWDX.

## Before You Begin

Before you start, make sure your wallet is configured as follows:

1. [Configured to use Linea](/use-mainnet/set-up-your-wallet.mdx).
2. [Funded with Goerli ETH](/use-mainnet/fund)
3. [Funded with Linea Faucet ERC20 Tokens](https://faucet.goerli.linea.build/)

FWDX currently provides support for the following test networks:

- Goerli Testnet
- Linea Testnet
- Polygon zkEVM Testnet

To access the dApp, users can connect their wallets through Metamask or WalletConnect. Note that connecting to the Linea Goerli Test Network is required for the specific tasks in this guide.

## Create Market

To create a market, follow the steps below:

1. Connect your wallet to [https://testnet.fwdx.xyz](https://testnet.fwdx.xyz).
2. Select the "Send Token" and specify the desired amount.
3. Choose the "Receive Token" and indicate the desired amount.
4. Determine the length of time you want the offer to remain open (Validity).

<img width="1630" alt="create_market" src="https://github.com/FWDX-xyz/doc.zk-evm/assets/137501620/ec8294f1-77ba-445b-bc04-2820cebb29ce" />

The user will need to perform two transactions:

- **Approve**: Grant permission to the FWDX Smart Contract to access your send token for creating the market pool. [Youtube Tutorial](https://www.youtube.com/watch?v=-jolAOazktM)
- **Create Market**: Initiate the creation of the actual market. [Youtube Tutorial](https://www.youtube.com/watch?v=7dX13VpAn9M)

<img width="1630" alt="create_market_tx" src="https://github.com/FWDX-xyz/doc.zk-evm/assets/137501620/df9d2380-918c-4697-bc4c-0f5e6ff025e8" />

By following these steps, you will successfully create a market in FWDX.

## View Market

User can view the newly created markets under “My Trades” and also the Explore Markets

Explore Markets:

<img width="1630" alt="explore_markets" src="https://github.com/FWDX-xyz/doc.zk-evm/assets/137501620/43931263-b12e-4602-983e-ab3a2650f5c3" />

My Trades:

<img width="1630" alt="my_trades" src="https://github.com/FWDX-xyz/doc.zk-evm/assets/137501620/56636187-bb0e-49f3-bd7d-6452eb665197" />

## Fill Market

To fill a market in FWDX, please follow the steps outlined below:

1. Find the specific market that you wish to fill within the FWDX platform.

2. Once you have identified the market, enter the desired amount that you want to fill.

<img width="1630" alt="fill_market_1" src="https://github.com/FWDX-xyz/doc.zk-evm/assets/137501620/aa805b07-f6ea-40cd-abf1-83bb15de5228" />

3. Locate the "Approve" and "Fill Market" buttons.

<img width="1630" alt="Approve" src="https://github.com/FWDX-xyz/doc.zk-evm/assets/137501620/37833c59-6997-4569-b39d-c67cec27ce1b" />

4. Click both buttons simultaneously to initiate the transaction process.

<img width="1630" alt="fill_market_2" src="https://github.com/FWDX-xyz/doc.zk-evm/assets/137501620/58587b2e-93de-4687-8845-90ecdebc59f5" />

5. Ensure that you have sufficient funds in your wallet to cover the transaction amount.

<img width="1630" alt="fill_market_3" src="https://github.com/FWDX-xyz/doc.zk-evm/assets/137501620/dc182219-ab1d-43e6-a192-53e7fbb31b60" />

6. Wait for the transaction to be processed on the blockchain and confirmed.

7. Once the transaction is successful, your share in the market will be allocated based on the amount you entered.

The user will need to perform two transactions:

- **Approve**: Grant permission to the FWDX Smart Contract to access your send token for fill the market. [Youtube Tutorial](https://www.youtube.com/watch?v=-jolAOazktM)

- **Create Market**: Initiate the filling the actual market. [Youtube Tutorial](https://www.youtube.com/watch?v=Vb-y8SMkzRU)

By following these steps and clicking the "Approve" and "Fill Market" buttons simultaneously, you will be able to fill the market in FWDX and receive your share based on the specified amount.

## Claim Market by Taker

Takers can claim their market share once the market is closed or expired. To claim your market share, follow the steps below:

1. Go to the "My Trades" menu in the FWDX platform.

<img width="1630" alt="claim_by_taker_1" src="https://github.com/FWDX-xyz/doc.zk-evm/assets/137501620/1c807ec1-5de3-4422-b6cc-a5e420c6ac05" />

2. Select the market for which you wish to claim your share.

<img width="1630" alt="claim_by_taker_2" src="https://github.com/FWDX-xyz/doc.zk-evm/assets/137501620/63a65f71-4b3a-4e73-9599-0800aa3ab72c" />

3. Click on the "Claim Market by Taker" button. [Youtube Tutorial](https://www.youtube.com/watch?v=KoPUUNO7m-Y)

By following these steps, you will be able to claim your market share as a Taker.

## Claim Market by Maker

Makers can claim their market share once the market is closed or expired. To claim your market share as a Maker, follow the steps below:

1. Go to the "My Trades" menu in the FWDX platform.

2. Select the market for which you wish to claim your share.

<img width="1630" alt="claim_by_maker_1" src="https://github.com/FWDX-xyz/doc.zk-evm/assets/137501620/cbb8ed7f-efe9-47f1-b79d-3fd909bad5bc" />

3. Click on the "Claim Market by Maker" button. [Youtube Tutorial](https://www.youtube.com/watch?v=KiHQK4dKGdQ)

<img width="1630" alt="claim_by_maker_2" src="https://github.com/FWDX-xyz/doc.zk-evm/assets/137501620/3170638f-b0f1-446c-9843-4557775a7342" />

By following these steps, you will be able to claim your market share as a Maker.

## Cancel Market by Maker

If nobody has taken the other side of a market, the Maker has an option to cancel the market.

1. Go to the "My Trades" menu in the FWDX platform.

<img width="1630" alt="cancel_1" src="https://github.com/FWDX-xyz/doc.zk-evm/assets/137501620/f68a457d-51ef-45a3-a454-1842d333095b" />

2. Select the market for which you wish to cancel.

<img width="1630" alt="cancel_2" src="https://github.com/FWDX-xyz/doc.zk-evm/assets/137501620/107c1961-59d1-4e67-99a8-9bc9b2ca2b21" />

3. Click on "Cancel Market" market [Youtube Tutorial](https://www.youtube.com/watch?v=0LFJdo0QLrY)

## Get Support

If you run into issues using the FWDX, you can find their [Discord](https://discord.gg/aKA2PXJD33)
