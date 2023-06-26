---
title: Use Squid router
sidebar_position: 1
---
# Squid

[Squid](https://squidrouter.com/) is a secure cross-chain router on [Axelar Network](https://axelar.network/) that enables interoperability between blockchains and dApps.

With Squid, you can swap or transfer tokens between 40+ chains securely in one click, and access stablecoins, gas tokens, and hundreds of other native assets in under 30 seconds.

In this tutorial, we will show you how to use Squid to get tokens on Linea’s Goerli Testnet from Avalanche’s Fuji Testnet. Let’s go!

#### 💡 Tip: If you prefer a video guide, you will find one here: [https://youtu.be/kzhlu5L18xY](https://youtu.be/lKzRLWTQs34) ####

## What this guide will cover

- How to get tokens (USDC and ETH) on Linea’s Goerli Testnet that we will use to swap and pay gas with.
- How to swap USDC on Linea Goerli for AVAX on Avalanche Fuji Testnet
- How to swap USDC on Linea Goerli for aUSDC *and* some AVAX for gas on Avalanche Fuji Testnet in one transaction using Squid's Get Gas feature

## Before we begin

1. You’ll need a crypto wallet, for example [MetaMask](https://metamask.io/download/)
2. Ensure your wallet is [configured to use Linea](https://docs.linea.build/use-linea/set-up-your-wallet)
3. You’ll also need your wallet address handy!

## Step 1: Get some Linea Goerli ETH

First, we’ll need to get some gas on the Linea Goerli Testnet so we can perform our swap from USDC. 

You will need no more than 0.01 ETH to cover getting Linea USDC and paying gas to do the swaps. Here are a few different faucets where you can access ETH on Linea Goerli - **please note you will only need to use one faucet!**

#### STAKEME ####
The STAKEME Faucet provides 0.05 Linea Goerli ETH. There are two ways to access it: 
- Visit the faucet page at [linea.faucetme.pro](https://linea.faucetme.pro)
- Click Log in with Discord and then join the STAKEME Discord server

**Route 1:** On the [faucet page](https://linea.faucetme.pro), make sure the chain and token selected are Linea Goerli and ETH, then paste your address into the input box and click **Send Me**.

![image](https://github.com/0xsquid/Squid-Linea-Guide/blob/main/STAKEME.gif)

**Route 2:** In the [STAKEME Discord server](https://discord.gg/stakeme), navigate to the #linea-faucet channel and type **/faucet** followed by your address.

#### Covalent ####

The [Covalent Faucet](https://www.covalenthq.com/platform/faucet) provides 0.02 Linea Goerli ETH. To use it, you need to:
- Set up a Covalent account with your email address
- While logged into Covalent, visit the [faucet page](https://www.covalenthq.com/platform/faucet), paste your address into the input box and click **Send Tokens to Wallet**.

![image](https://github.com/0xsquid/Squid-Linea-Guide/blob/main/Covalent.gif)

#### Infura ####

The [Infura Faucet](https://www.infura.io/faucet/linea) provides 0.5 Linea Goerli ETH. Here’s how to use it:
- Set up an Infura account with your email address
- Make sure the wallet address you will be using has at least 0.001 ETH on Ethereum Mainnet
- While logged into Infura, visit the [faucet page](https://www.infura.io/faucet/linea), paste your address into the input box and click **Receive ETH**. You will shortly receive 0.5 ETH to your wallet on Linea.

![image](https://github.com/0xsquid/Squid-Linea-Guide/blob/main/Infura.gif)


## Step 2: Get some USDC on Linea Goerli

Now that we’ve topped up our wallet with some Linea Goerli ETH for gas, we’re ready to pick up some Linea USDC to swap over to Avalanche’s Testnet. 

We will be using [Linea’s Faucet](https://faucet.goerli.linea.build) to get USDC. For more information on how to use the faucet, check out [the docs](https://docs.linea.build/use-linea/fund).

**Note that we will be requesting a very small amount of USDC (around $0.02) from the faucet to avoid running into any potential liquidity issues.**

- Head to Linea’s USDC Faucet page: [faucet.goerli.linea.build](https://faucet.goerli.linea.build)
- Make sure you are connected to the Linea Goerli Testnet, then connect your wallet and scroll down to the USDC section.
- In the **Lock ETH box**, type **0.00001** (yes, that’s 4 zeros!) and you will be prompted to claim 0.02 USDC. Follow the steps in your wallet and wait for the transaction to complete.
In the **Unwrap USDC** box, type **0.02**, then click approve. You will be prompted to set a token spending cap via your wallet before receiving your USDC.


![image](https://github.com/0xsquid/Squid-Linea-Guide/blob/main/USDC%20Faucet%20P1.gif)

- Click **Add to Metamask** to import the USDC token into your wallet so you can see it.
  
You should now have $0.02 USDC and some leftover ETH to cover gas transactions for your Squid swaps.

![image](https://github.com/0xsquid/Squid-Linea-Guide/blob/main/USDC%20Faucet%20P2.gif)


## Step 3: Visit Squid's Cross-Chain App

If you need any help with the swapping process, please [open a support ticket with Squid](https://squidsupport.zendesk.com/hc/en-us/requests/new). 

With our Linea USDC in hand, we can use Squid to swap it over to AVAX on Avalanche
1. Visit Squid’s app: [testnet.app.squidrouter.com/linea](https://testnet.app.squidrouter.com/linea)
2. Click the “connect wallet” button on the source chain and select the wallet that you used with the faucet.
3. The **From** chain should be Linea Goerli and the token should be USDC, and the **To** chain should be Avalanche Fuji C-Chain with AVAX as the token.
4. Put the amount of USDC you would like to swap (0.01) in the **From** input box.

**💡 We will be doing two swaps from USDC, so we suggest using 0.01 USDC per swap.**

![image](https://github.com/0xsquid/Squid-Linea-Guide/blob/main/Swap%20AVAX%20P1.gif)

5. Wait a few seconds for Squid to load the details. If this is your first swap from USDC, the submit button might say Give permission to use tokens. Click this and set the token spending cap to 0.02 via your wallet.

## Step 4: Swap from Linea USDC to AVAX on Avalanche

1. After approving, the button should shortly say **Submit**. Click on it to initiate the swap. Note that you might have to first switch networks before you can submit.
2. Confirm the transaction in your wallet, and the tokens will be on their way to Avalanche!

Swaps usually process in a few minutes, but it can sometimes take longer. 

![image](https://github.com/0xsquid/Squid-Linea-Guide/blob/main/Swap%20AVAX%20P2.gif)

## Viewing your tokens on Avalanche
If this is the first time you are using the Avalanche Testnet, you might not see the chain show up in your wallet’s list of networks. Here’s how to add it so you can see your new AVAX: 
1. Reverse the order of the **From** and **To** chains so that Avalanche is the selected From chain.
2. A **switch network** button will appear - click this and your wallet should prompt you to add the chain to your wallet.
You will now be connected to Avalanche’s Fuji C-Chain Testnet, and your AVAX should be visible in your wallet.

![image](https://github.com/0xsquid/Squid-Linea-Guide/blob/main/Add%20Avalanche.gif)


## Step 5: Swap from Linea USDC to aUSDC + AVAX on Avalanche

Have you ever sent your tokens over to a new chain, only to realize you haven’t got any gas to do anything? With Squid’s Arrival Gas feature, you’ll never get stuck on a chain with not enough gas again!

With Squid, you can get any token and top up with some gas  all in one transaction. We’ll be swapping the last of our Linea USDC for this step.

Here’s how it’s done:
1. Enter your remaining **0.01** USDC on Linea Goerli in the **From** input box.
2. In the **To** section, select aUSDC as the destination token on Avalanche.
3. Click the Arrival Gas button (the gas pump icon ⛽) to open the controls page.
4. Switch the Arrival Gas toggle on and return back to the main view. You should now see that the Arrival Gas icon has turned green.
5. Wait for Squid to fetch the transaction details, then click on the Submit button to initiate the swap and confirm the transaction in your wallet.

Both aUSDC and a bit of AVAX for gas on Avalanche will now be on its way to your wallet!

![image](https://github.com/0xsquid/Squid-Linea-Guide/blob/main/Get%20Gas.gif)

## Troubleshooting

If you are facing issues, you can read the troubleshooting section of our user docs [here](https://docs.widget.squidrouter.com/troubleshooting). Here are some common questions and how to resolve them:

### **Transaction is complete but tokens have not arrived**

In rare cases, some transactions can revert and you will receive the value of your original swap amount in axlUSDC (Squid’s routing token) on the destination chain. If you do not see the expected token in your wallet, first check your axlUSDC balance. If you do not have axlUSDC either, please contact support.

### **Token values are not accurate**

Testnet token values are not related to mainnet tokens, so even if the values are unbalanced, you can still do a swap.

### **Price impact warning**

The amount you are trying to swap is high compared to the selected token’s available liquidity. This does not matter in testnet as the funds are not real, so you can proceed without worry!

### **Transaction taking longer than expected**

Sometimes transactions take longer than usual. If your transaction is still processing after 60 minutes, please contact support.

## Get Support

If you need support with your Squid transaction, you can [open a ticket](https://squidsupport.zendesk.com/hc/en-us/requests/new) or reach out in Squid’s [Discord](https://discord.gg/squidrouter), and someone will get back to you as soon as possible.