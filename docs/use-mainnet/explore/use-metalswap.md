---
title: Use MetalSwap
description: Use Metalswap to Protect From Volatility - Linea Voyage Quest
---

# Use Metalswap to Protect From Volatility

## **Faucet**

To begin your test run, visit the MetalSwap demo interface at [https://testnet-linea.metalswap.finance](https://testnet-linea.metalswap.finance).

This demo operates on the Linea Testnet using two **custom fake tokens called: "WBTC" and "USDC"**. These demo tokens will allow you to simulate operations as if they were real, without the risk of losing actual funds.

The following steps will guide you on how to operate the demo:

### Getting the Demo Tokens

1. Click on the _"Tokens➝ Faucets"_ button on the top of the page.

![test tokens faucet menu](/img/quests/metalswap/tokens-faucet.png)

2. If your wallet is set up on a different chain, a message will appear prompting you to switch networks. Click on _"SWITCH NETWORK"_. This will open your wallet with the Linea network already selected. Confirm and proceed with the request for the test tokens.

![get test tokens from faucet](/img/quests/metalswap/get-test-tokens.png)

3. To add WBTC test and USDC test token info directly to Metamask, you can click on the respective buttons.

We will need at least 0.01 GoerliETH: to avoid the faucet drainage by spamming, a cent of GoerliETH is charged to get the test tokens in change.

After obtaining Goerli ETH tokens, proceed by clicking on the following main boxes:

- "Get Linea Test WBTC and USDC", note this operation can be performed once a day.

- "Go To The Linea ETH Faucet" to obtain the ETH needed for transition payments.

Once you have obtained the test WBTC and USDC, we can move on _"Swap➝ Swap"_ section to use the Hedging Swap tool.

## **Hedging Swap**

1. After the MetalSwap Hedging Swap Demo platform opens, proceed to connect your wallet.

2. Select the Swap section from the menu at the top of the page.

![swaps menu](/img/quests/metalswap/swap-menu.png)

Now, **the Demo platform is ready to be used** exactly like the real one. To deep dive on how to set up a Hedging Swap, consult the DOCs Hedging Swap ETH V2 and Hedging Swap GOLD V2 sections.

Remember, the demo platform has all the functionalities of the real one. For more information on its functions, refer to the corresponding sections of the DOCs.

### MetalSwap Linea Testnet Dashboard

Welcome to the operating interface of MetalSwap on Linea Testnet where financial Hedging Swap Demo Orders can be performed on the Linea Goerli network.

The process of connecting your wallet and setting up the Dapp remains the same as in the real version. Remember to select the Linea Testnet on Metamask before connecting your wallet.

![swaps dashboard allowance](/img/quests/metalswap/swaps-allowance-dashboard.png)

The operating console is also similar to the real one. You will be able to select the type of digital assets to trade with. In this demo, we'll be using the only asset of WBTCtest as "Current Coin".

After the _Allowance permission_ is given, we'll be ready to set our New Swap variables.

In the following screenshot we'll hedge against the raise of WBTC price by clicking the "Up Arrow USDC" switch, setting variables as follows: **Target Size** of 300 USDC, 6-days **Duration**, 10% (the minimum possible) **Cover** that will be eroded in the case the price goes in the down direction.

_Don't forget_: the whole Cover eroded brings to immediate _liquidation_!

So we're paying 9.29 USDC as a **Premium** to open the new Hedging Swap, plus 30 USDC as Cover as said, plus the common tx fees.

![swap execute dashboard](/img/quests/metalswap/swap-execute-dashboard.png)

The "Current Active Swap" section at the bottom of the page will display all the active swaps. You can view all non-active swaps by clicking on "History" in the main menu.

![active swaps table](/img/quests/metalswap/active-swaps-table.png)

To manage an active Swap, click on it to view data relating to its position. For instance, if you wish to increase the Cover, raise the desired percentage with the cursor and click on the "Refinance" button to confirm. To close the Swap early, click on the "Close Swap" button.

![manage an active swap](/img/quests/metalswap/active-swap-managing.png)

## **NFT Liquidity Providing**

To access the service, simply click on _Liquidity Pools_ in the top menu

![swaps menu](/img/quests/metalswap/swap-menu.png)

### How to use MetalSwap’s Liquidity Pools

With the _Create New Position_ button, we will provide liquidity ( WBTC test or USDC test )

to those who wish to open a new Swap using MetalSwap's Hedging Dapp.

![swaps liquidity pools chart](/img/quests/metalswap/liquidity-pools.png)

Select the token desired and the **amount of Liquidity to Provide**

![provide liquidity allowance](/img/quests/metalswap/provide-liquidity-allowance.png)

Click on the _Allowance_ button to grant permission to the Smart Contract

**Important to know**

MetaMask now requires you to set your spending cap, which is the number of tokens you're comfortable with the Smart Contract spending now or in the future.

1. To avoid repeating this process, it is recommended to click on "USE DEFAULT" button. This ensures that you won't have to give an additional allowance when the previously entered number has been reached.
2. Enter the desired value for your spending cap.
3. Click on "NEXT" to proceed.
4. Pay the transaction fee associated with the confirmation.

![set spending cap on metamask](/img/quests/metalswap/metamask-spending-cap.png)

_Please remember that there is a minimum liquidity requirement._

Enter the amount of liquidity you wish to provide and click on _Create Position_.

![create a liquidity providing position](/img/quests/metalswap/provide-liquidity-create-position.png)

Now is possible to see the _Liquidity Providing NFT_ appear in the **MY POSITIONS** section.

![liquidity provided nft](/img/quests/metalswap/liquidity-providing-nft.png)

This NFTs is representing the _liquidity locked in MetalSwap’s platform_ and will collect **_rewards_** over time.

MetalSwap’s NFTs are unique digital assets that are minted using a combination of _pseudo-random_ data from various sources, such as the address of the user, the NFT's ID, the creation timestamp, the liquidity provided, the block height, and the difficulty.

By clicking on it, the following card will appear, with these commands available:

![manage a liquidity providing position nft](/img/quests/metalswap/liquidity-providing-nft-managing.png)

- **Redeem Reward** button. You are allow to get your rewards after a minimum 24H from the deposit.

- **Add or Remove liquidity** button.

- **Transfer NFT**: allows you to transfer the NFT‘s ownership to another public address directly from here!

To learn more about specific details related to these operations, we recommend consulting the following documents:

[Hedging Swap ETH](https://docs.metalswap.finance/launch-app/hedging-swap-eth-v2)

[Liquidity Pools](https://docs.metalswap.finance/launch-app/liquidity-pools)
