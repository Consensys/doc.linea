---
title: Use Gridex Protocol
---

# Gridex Protocol

[Gridex Protocol](https://www.gdx.org/) is the first infinitely scalable fully on-chain order book protocol for the Ethereum ecosystem.

Gridex provides a way forward for on-chain order books, providing a novel and simple solution. Gridex has abandoned the traditional CLOB model and matching engine, replacing it with our novel order book model, the Grid Maker Order Book (GMOB), making running an order book on-chain as cheap as running an AMM.

To learn more about us, please check out our [website](https://www.gdx.org/) or our "Understanding Gridex" series on [YouTube](https://www.youtube.com/playlist?list=PLtCExG17NAItVy8p5Wt5WLJB2poIzujTl).

## Accessing the DEX

First, you´ll need to access the [Gridex website](https://www.gdx.org/) where the following page will appear. Click on the **launch app** button to access the DEX.

![image](https://github.com/navillanueva/doc.zk-evm/assets/42673884/ef6b7efd-906a-43e9-8107-e33332194c17)

Now you will have to hit **connect wallet** and change the network to Linea Goerli Testnet :

![image](https://github.com/navillanueva/doc.zk-evm/assets/42673884/b7c5a8d6-5463-4bb4-906c-fdbaa3a0d354)

To complete the following tasks, you will have to trade on the **ETH/aUSD** pair. However, Gridex is a permissionless protocol, so at any point, users may create a new trading pair by just placing two maker orders in each trading direction.

## Task 1: Executing a Swap on ETH/aUSD

In order to make a swap, you will have to switch from the Maker tab to the Swap tab, as shown in the following image:

![image](https://github.com/navillanueva/doc.zk-evm/assets/42673884/5a5596ed-89e6-4cae-b6e9-09463a285a87)

Once you are on the swap interface, buy or sell ETH to complete the task:

![image](https://github.com/navillanueva/doc.zk-evm/assets/42673884/1a927a8e-1e0f-432b-bff8-5a1dd2c53f7a)

## Task 2: Placing a Maker Order on ETH/aUSD

For the second task, you will have to place a "Maker Order".

We call them Maker Orders because, even though Gridex is an order book exchange, it is not based on the Central Limit Order Book (CLOB) model, which is used in traditional finance or on CEXs like Binance and Coinbase. Limit orders don't always go into the order book, for example; if you try to place a buy limit order at a price higher than the market price on a CEX, it will execute as a market swap instead. This is an artificial restriction that we saw no need for, as it would only complicate the code.

In order to implement an order book fully on-chain, we had to create the Grid Maker Order Book (GMOB) model. In essence, the main difference between GMOB and CLOB is that instead of placing an order at a specific price, you select a very narrow price range, in which your order is guaranteed to fill somewhere between the lower and upper boundaries. This is what allows GMOB to be infinitely scalable because it allows the gas units required to be constant, regardless of the number of orders in the order book, while a CLOB's computation increases linearly with the number of orders in the order book.

A simple example would be if you place a Maker Order to buy 1 ETH at $1000 and the resolution is 0.1%, meaning the range width will be $1000 x 0.1% = $1, then the protocol would guarantee your order will be filled between $999.50 and $1000.50.

In order to place a Maker order, you will have to select the "Maker" interface, as shown:

![image](https://github.com/navillanueva/doc.zk-evm/assets/42673884/f8e8b666-dc0c-49d7-bfe6-06ac0d5874b2)

We have made this user interface very similar to other CEXs, but with a key difference -- you will always have custody of your funds!

Once here, on the 0.05% grid (which means you are trading with a 0.05% resolution) that is selected by default, you can place any type of order and select the price and amount you want to trade for, and we guarantee you **no slippage or impermanent loss**.

![image](https://github.com/navillanueva/doc.zk-evm/assets/42673884/d65aa584-fa7a-4ea3-b7d7-e1e35aa9a68e)

This is how your order should look once you have filled in the parameters of your trade. You can see that the frontend has suggested the range $1679.97 - $1680.81 as we have entered the price of $1680. You can also select a different range near the desired price by moving the slider.

Another important detail about how the GMOB model works is that when you place a maker order, you receive negative fees. That's right, you earn a small commission for placing an order (essentially adding liquidity to the order book), and this fee comes directly from the takers (people executing swaps). On a CEX, you pay a fee to the exchange regardless of whether you are a maker or a taker!

And that's it! Just press the "buy …" or "sell …" button below, and your Maker Order will be placed.

Once your order is filled, you will need to "collect" it in the "Open Orders" section. Note that you can batch collect orders to spend less gas.

## Task 3: Placing Relative Maker Orders and Batch Maker Orders on ETH/aUSD

Our frontend has some other handy tools for placing maker orders. The first one – relative maker orders – is useful for placing orders near the current price. Instead of entering a price to select a range, a relative order allows you to place an order at a specified number of ranges away from the current price.

On the Maker tab, tick the "Relative Mode" box:

![image](https://github.com/navillanueva/doc.zk-evm/assets/42673884/89d7a457-10c9-458e-84a8-887d2f91821f)

You can now use the slider or type in the box to select the desired number of ranges away from the current price (in either direction) to place your order.

**Required part of the task** : choose to buy or sell ETH, select a range and amount, and place your order.

The second handy tool is batch order mode for placing many orders more gas efficiently. This mode allows you to place a given number of orders, spaced equally or arithmetically, between a lower and upper price bound.

1. Click the settings button in the top right-hand corner and toggle batch order mode:

![image](https://github.com/navillanueva/doc.zk-evm/assets/42673884/baef73cc-3b17-4f07-ba9b-1b937d2ff46a)

2. Enter the lower and upper bounds, the number of orders you would like to place, whether you would like them to be equally or arithmetically spaced out, and the amount you would like to use.

![image](https://github.com/navillanueva/doc.zk-evm/assets/42673884/1ff57dc1-8146-466c-99e2-18e94801c6ef)

**Required part of the task** : choose to buy or sell ETH, select upper and lower bounds, number of orders, how you would like them to be spaced out, what amount, and place your order.

## Get Support

If you run into issues using Gridex Protocol you can find support in our [discord](https://discord.gg/KHhhrRbu).
