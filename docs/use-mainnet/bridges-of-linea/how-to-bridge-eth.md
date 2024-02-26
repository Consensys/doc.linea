---
title: How to bridge ETH between Ethereum and Linea
sidebar_position: 1
---

:::note


We recommend that only tech operators that are providing liquidity use the official Linea bridge to transfer ETH.

### For everyday bridge transfers, we recommend you use [MetaMask Portfolio's Bridge feature](https://portfolio.metamask.io/bridge), which aggregates bridging options across Linea and shows you the best rates.

For a closer look at the bridges that MetaMask Portfolio sources from, check out our information about [third-party bridges](./bridging-non-dev.mdx#third-party-permissionless-bridges).

:::

### Transferring ETH via the official Linea bridge

This is a step by step guide to bridging ETH between Ethereum Mainnet (L1) to Linea (L2).

**To bridge ETH over testnet, simply click the testnet button at the bottom left of the [token bridge page](https://bridge.linea.build/) and follow the same steps as below.**

If you would like to bridge between other networks, check out [third-party bridges](/use-mainnet/bridges-of-linea#third-party-permissionless-bridges).

**Check out this video on how to use our bridge!**

<iframe
  width="100%"
  height="450"
  src="https://www.youtube.com/embed/V4DflPkxqE8"
  frameborder="0"
></iframe>

## Bridging ETH from Ethereum (L1) to Linea (L2)

:::caution

Please use the [automatic claiming option](./index.mdx#manual-vs-automatic-claiming) the first time you bridge ETH from L1 to L2. [Manual claiming](/use-mainnet/bridges-of-linea#manual-vs-automatic-claiming) requires you to have L2 ETH available to pay for the fees. **If you don't have enough L2 ETH to cover the fees, your transaction will be stuck on the bridge until you can cover the fees!**

:::

### Automatic Claiming

1. Go to our token bridge [here](https://bridge.linea.build/).

2. Connect your wallet in the top-right corner of the page.

<div class="center-container">
  <div class="img-medium">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_connect_wallet_button.png"
      alt="Linea bridge connect wallet button"
    />
  </div>
</div>

3. Verify that the bridge is set to Ethereum → Linea Mainnet and that automatic claiming is enabled.

4. Enter the amount of ETH you want to bridge over to Linea Mainnet, and select the “Start Bridging” button.

<div class="center-container">
  <div class="img-medium">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_automatic_claiming_choose_amount.png"
      alt="Linea bridge choose amount"
    />
  </div>
</div>

5. MetaMask will pop up asking you to confirm the transaction.

<div class="center-container">
  <div class="img-small">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_confirm_transaction_MetaMask.png"
      alt="Confirm Linea bridge transaction in MetaMask"
    />
  </div>
</div>

6. After confirming the transaction, it should take around 20 minutes for the transaction to reach Linea Mainnet. You can see your pending transaction under the "Recent transactions" section at the bottom of the token bridge.

<div class="center-container">
  <div class="img-medium">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_automatic_claiming_pending_transaction.png"
      alt="Linea bridge pending transaction"
    />
  </div>
</div>

7. You’re done! Under "Recent transactions", it should say "Bridging complete" and your ETH should be on Linea Mainnet. _Reminder: It takes around 20 minutes for the bridging process to complete._

<div class="center-container">
  <div class="img-medium">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_L1_to_L2_bridging_complete.png"
      alt="Linea bridge complete transaction"
    />
  </div>
</div>

8. You can see your Linea account balance in MetaMask once you switch to the Linea network. You can also check it on [LineaScan](https://lineascan.build/address/0x331FB12C080F5b34F0E8812D44114D17398A016d). Just replace the account address in the URL with your account address and it should reflect your account's balance!

### Manual Claiming

1. Go to our token bridge [here](https://bridge.linea.build/).

2. Connect your wallet in the top-right corner of the page.

<div class="center-container">
  <div class="img-medium">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_connect_wallet_button.png"
      alt="Linea bridge connect wallet button"
    />
  </div>
</div>

3. Verify that the bridge is set to `Ethereum → Linea Mainnet`, and that **manual claiming** is enabled.

4. Enter the amount of ETH you want to bridge over to Linea Mainnet, and select the **Start Bridging** button.

<div class="center-container">
  <div class="img-medium">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_manual_claiming_choose_amount.png"
      alt="Linea bridge choose amount"
    />
  </div>
</div>

5. MetaMask will pop up asking you to confirm the transaction.

<div class="center-container">
  <div class="img-small">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_confirm_transaction_MetaMask.png"
      alt="Confirm Linea bridge transaction in MetaMask"
    />
  </div>
</div>

6. You will see a “Claim Funds” button appear under the "Recent transactions" section. Select the "Claim Funds" button to continue the bridging process.

<div class="center-container">
  <div class="img-medium">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_manual_claiming_claim_button.png"
      alt="Linea bridge claim funds button"
    />
  </div>
</div>

7. MetaMask will prompt you to switch networks and confirm the transaction from the previous step.

<div class="center-container">
  <div class="img-small">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_confirm_switch_network_MetaMask.png"
      alt="MetaMask contract interaction notification"
    />
  </div>
</div>

8. You’re done! Under "Recent transactions", it should say "Bridging complete" and your ETH should be on Linea Mainnet. _Reminder: It takes around 20 minutes for the bridging process to complete._

<div class="center-container">
  <div class="img-medium">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_L1_to_L2_bridging_complete.png"
      alt="Linea bridge complete transaction"
    />
  </div>
</div>

9. You can see your Linea account balance in MetaMask once you switch to the Linea network. You can also check it on [LineaScan](https://lineascan.build/address/0x331FB12C080F5b34F0E8812D44114D17398A016d). Just replace the account address in the URL with your account address and it should reflect your account's balance!

## Bridging ETH from Linea Mainnet (L2) to Ethereum Mainnet (L1)

:::note


Automatic claiming is only available for bridging ETH from L1 to L2. You will not be able to select this option for L2 to L1 bridging.

:::

1. Go to our token bridge [here](https://bridge.linea.build/).

2. Connect your wallet in the top-right corner of the page.

<div class="center-container">
  <div class="img-medium">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_connect_wallet_button.png"
      alt="Linea bridge connect wallet button"
    />
  </div>
</div>

3. Verify that the bridge is set to Linea Mainnet -> Ethereum. Manual claiming is the only available option for L2 to L1 bridging.

4. Enter the amount of ETH you want to bridge over to Ethereum Mainnet, and select the “Start Bridging” button.

<div class="center-container">
  <div class="img-medium">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_L2_to_L1_choose_amount.png"
      alt="Linea bridge choose amount"
    />
  </div>
</div>

5. MetaMask will pop up and ask you to confirm the transaction.

<div class="center-container">
  <div class="img-small">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_confirm_transaction_MetaMask.png"
      alt="Confirm Linea bridge transaction in MetaMask"
    />
  </div>
</div>

6. The pending transaction will show up in the “Recent transactions” section of the bridge. _Reminder: It takes at least 8 hours for the transaction to go through from L2 to L1._

<div class="center-container">
  <div class="img-medium">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_L2_to_L1_pending_transaction.png"
      alt="Linea bridge pending transaction"
    />
  </div>
</div>

7. You will see a “Claim Funds” button appear under the "Recent transactions" section. Select the "Claim Funds" button to continue the bridging process.

<div class="center-container">
  <div class="img-medium">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_L2_to_L1_claim_button.png"
      alt="Linea bridge claim funds button"
    />
  </div>
</div>

8. MetaMask will ask you to switch networks and to confirm the transaction from the previous step.

<div class="center-container">
  <div class="img-small">
    <img
      src="/img/article_images/Use_Linea/Bridge_your_tokens/How_to_bridge_ETH_between_Ethereum_and_Linea/Linea_Bridge_confirm_switch_network_MetaMask.png"
      alt="MetaMask contract interaction notification"
    />
  </div>
</div>

9. You're done! You can check your Ethereum account balance in MetaMask, or on a block explorer such as [Etherscan](https://etherscan.io/)!
