---
title: Use KyberSwap
description: Trade and Earn at Superior Rates
---

# KyberSwap

The [KyberSwap](http://www.kyberswap.com) solution suite was conceived with the goal of creating an open and decentralized liquidity backbone for the DeFi ecosystem. Through a combination of solutions, KyberSwap is able to optimize capital efficiency across various DEXes thereby simultaneously ensuring superior rates for traders while simultaneously maximizing yields for LPs.

Built on the principles of open access to decentralized financial infrastructure, the KyberSwap solution suite enables value in the DeFi space to be compounded sustainably through aligning liquidity incentives. You can read more [here](https://docs.kyberswap.com/).

With KyberSwap you can:

- Create new trading pools for any of your favorite ERC20 tokens
- Maximize your market making returns by providing liquidity into customizable price ranges on KyberSwap Elastic
- Swap at superior rates via the KyberSwap Aggregator which optimizes your trade route across multiple liquidity sources

:::tip

Before you embark on the future of trade, make sure that you have:

- [Connected your wallet to the Linea network](/use-mainnet/set-up-your-wallet.mdx)
- [Acquired Goerli ETH to pay for your Linea transactions](/use-mainnet/fund)

:::

You can also connect to the Linea Testnet via the KyberSwap UI:

![Select chain from KyberSwap UI](/img/quests/kyberswap/KyberSwap_SelectChain.png)

---

## :zap: Earn Supercharged Yields

### Step 1: Select your preferred pool

![Select Pool](/img/quests/kyberswap/KyberSwap_AddLiquidity_SelectPool.png)

Search for your favorite pools using the token selector tool on the [Elastic Pools page](https://kyberswap.com/pools/linea-goerli). Liquidity providers can filter the list of available pools by choosing from the list of whitelisted tokens, searching via the token symbol, or directly inputting the token contract address.

If you are unable to find a pool that suits your preferred configuration, you can also refer to our [Elastic pool creation guide](https://docs.kyberswap.com/liquidity-solutions/kyberswap-elastic/user-guides/elastic-pool-creation) to set up a new pool.

### Step 2: Customize liquidity provision parameters

![Configure Position](/img/quests/kyberswap/KyberSwap_AddLiquidity_SelectRange.png)

Upon clicking the “Add Liquidity” button for your preferred token pool, you will then be able to configure various liquidity provision parameters on the Add Liquidity helper. This includes selecting an appropriate fee tier, setting your position’s price range, as well as configuring token amounts.

### Step 3: Approve tokens on KyberSwap Elastic

![Approve Token](/img/quests/kyberswap/KyberSwap_AddLiquidity_ApproveToken.png)

If this is your first time providing liquidity to an Elastic pool, you will need to authorize the KyberSwap smart contract to transact using your tokens on this network. Click the “Approve [Token]” button to do so which will open the approval dialog window on your wallet. Once the approval is confirmed, the previously disabled “Preview” button will be clickable.

### Step 4: Review your liquidity contribution

Click on the “Preview” button to bring up the liquidity addition preview screen.

![Click preview button](/img/quests/kyberswap/KyberSwap_AddLiquidity_PreviewButton.png)

### Step 5: Confirm and view created position

Once you have reviewed the information, you can click on the “Supply” button to proceed with confirming the transaction in your wallet.

![Confirm liquidity addition](/img/quests/kyberswap/KyberSwap_AddLiquidity_Preview.png)

KyberSwap will notify you once your submitted transaction has been confirmed by the Linea network. You can use the wallet helper to view the transaction status as well as track the changes in your token holdings.

Your new position should now be visible on the My Pools page on KyberSwap.

![My Elastic Pools](/img/quests/kyberswap/KyberSwap_AddLiquidity_MyElasticPools.png)

---

## :repeat: Instantly Swap At Superior Rates

### Step 1: Specify your swap pair

![Select swap pair](/img/quests/kyberswap/KyberSwap_Swap_SelectToken.png)

Traders can leverage the token selector tool to specify their preferred swap pair on the [KyberSwap Swap page](https://kyberswap.com/swap/linea-goerli). Traders can choose from a whitelist of the most popular tokens, search token symbol pairs via the search field, or directly input the token’s contract address.

### Step 2: Configure the swap amount

![Configure swap parameters](/img/quests/kyberswap/KyberSwap_Swap_ConfigureSwap.png)

Specify the amount you would like to swap by either typing in an amount manually or by using the “Max” and “Half” buttons to swap pre-set proportions of your wallet balance. Upon selecting a token in amount, you will be able to see an estimated return amount.

### Step 3: Approve tokens on KyberSwap Aggregator

![Approve token swap](/img/quests/kyberswap/KyberSwap_Swap_ApproveToken.png)

As a safety precaution, you will need to approve/permit KyberSwap to trade the tokens on your behalf. This ensures that the KyberSwap smart contract is only able to spend the specified amount from your wallet. You can refer to KyberSwap’s [Docs](https://docs.kyberswap.com/kyberswap-solutions/kyberswap-interface/user-guides/instantly-swap-at-the-best-rates#step-4-approve-or-permit-contract-to-swap-tokens) for further details on this approve/permit process.

### Step 4: Confirm the swap

![Confirm swap](/img/quests/kyberswap/KyberSwap_Swap_Preview.png)

You can review your swap by clicking on the “Swap” button to bring up the confirmation screen. Note that as market conditions are liable to change while your trade route is being confirmed, KyberSwap implements [a suite of safety mechanisms](https://docs.kyberswap.com/kyberswap-solutions/kyberswap-interface/user-guides/instantly-swap-at-the-best-rates#step-5-confirm-the-swap) to protect against any unexpected outcomes.

Once the swap route has been finalized, the confirmation screen will display key pieces of information for your review:

- **Output amount**: Estimated return after the Swap.
- **Current Price**: the rate at which the swap will happen (this can be inverted using the 🔁 button).
- **Minimum Received**: This is the minimum amount of output tokens that you will receive from the swap else the transaction will be reverted.
- **Gas Fee**: The estimated network fee associated with this transaction.
- **Price Impact**: The estimated change in the market price due to the size of your transaction.
- **Slippage**: The estimated difference between the expected price and final price of the trade.

Upon reviewing the trade parameters, you can click the “Confirm Swap” button to proceed. KyberSwap will notify you once your submitted transaction has been confirmed by the Linea network. You can use the wallet helper to view the transaction status as well as track the changes in your token holdings.

![Wallet view](/img/quests/kyberswap/KyberSwap_Swap_WalletView.png)
