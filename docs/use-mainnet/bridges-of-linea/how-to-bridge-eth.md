---
title: How to bridge ETH between Ethereum and Linea
sidebar_position: 1
---

import ReactPlayer from 'react-player'

## Video Tutorial 

Check out this video on how to use our bridge!

<iframe
  width="100%"
  height="450"
  src="https://www.youtube.com/embed/V4DflPkxqE8"
  frameborder="0"
></iframe>


## Bridging ETH from Ethereum (L1) to Linea (L2)

:::note

This is a step by step guide on how to bridge ETH from Ethereum (L1) to Linea (L2) and Linea (L2) to Ethereum (L1). The screenshots provided are examples of bridging ETH for Linea and Ethereum Mainnet. To bridge ETH over Testnet, simply click the testnet button at the bottom left of the [token bridge page](https://bridge.linea.build/) and follow the same steps as below.

:::

> **Please use the automatic claiming option the first time you bridge ETH from L1 to L2. Manual claiming requires you to have L2 ETH available to pay for the fees. If you don't have enough L2 ETH to cover the fees, your transaction will be stuck on the bridge until you can cover the fees!**

## Automatic Claiming:

1. Go to our token bridge [here](https://bridge.linea.build/).

2. Connect your wallet in the top-right corner of the page.

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/linea-bridge-connect.png")
      .default
  }></img>

3. Verify that the bridge is set to Ethereum → Linea Mainnet and that automatic claiming is enabled.

4. Enter the amount of ETH you want to bridge over to Linea Mainnet, and select the “Start Bridging” button.

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/token-bridge-step-3.png")
      .default
  }></img>

5. MetaMask will pop up asking you to confirm the transaction.

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/metamask-confirmation.png")
      .default
  }></img>

6. After confirming the transaction, it should take around 20 minutes for the transaction to reach Linea Mainnet. You can see your pending transaction under the "Recent transactions" section at the bottom of the token bridge.

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/pending-transaction-l1-to-l2.png")
      .default
  }></img>

7. You’re done! Under "Recent transactions", it should say "Bridging complete" and your ETH should be on Linea Mainnet. _Reminder: It takes around 20 minutes for the bridging process to complete._

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/confirmed-transaction-l1-to-l2.png")
      .default
  }></img>

8. You can see your Linea account balance in MetaMask once you switch to the Linea network. You can also check it on [LineaScan](https://lineascan.build/address/0x331FB12C080F5b34F0E8812D44114D17398A016d). Just replace the wallet address in the URL with your wallet address and it should reflect your wallet's balance!

## Manual Claiming

1. Go to our token bridge [here](https://bridge.linea.build/).

2. Connect your wallet in the top-right corner of the page.

   <img
     src={
       require("@site/static/img/docs/use-mainnet/bridges-of-linea/linea-bridge-connect.png")
         .default
     }></img>

3. Verify that the bridge is set to `Ethereum → Linea Mainnet`, and that **manual claiming** is enabled.

4. Enter the amount of ETH you want to bridge over to Linea Mainnet, and select the **Start Bridging** button.

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/manual-claiming.png")
      .default
  }></img>

5. MetaMask will pop up asking you to confirm the transaction.

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/metamask-confirmation.png")
      .default
  }></img>

6. You will see a “Claim Funds” button appear under the "Recent transactions" section. Select the "Claim Funds" button to continue the bridging process.

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/claim-funds.png")
      .default
  }></img>

7. MetaMask will prompt you to switch networks and confirm the transaction from the previous step.

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/claim-message-metamask.png")
      .default
  }></img>

8. You’re done! Under Recent Transactions, it should say "Bridging complete" and your ETH should be on Linea Mainnet. _Reminder: It takes around 20 minutes for the bridging process to complete._

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/Confirmation-manual-claim.png")
      .default
  }></img>


9. You can see your Linea account balance in MetaMask once you switch to the Linea network. You can also check it on [LineaScan](https://lineascan.build/address/0x331FB12C080F5b34F0E8812D44114D17398A016d). Just replace the account address in the URL with your account address and it should reflect your account's balance!

## Bridging ETH from Linea Mainnet (L2) to Ethereum Mainnet (L1)

:::note

Automatic claiming is only available for bridging ETH from L1 to L2. You will not be able to select this option for L2 to L1 bridging.

:::

1. Go to our token bridge [here](https://bridge.linea.build/).

2. Connect your wallet in the top-right corner of the page.

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/linea-bridge-connect.png")
      .default
  }></img>

3. Verify that the bridge is set to Linea Mainnet --> Ethereum. Manual claiming is the only available option for L2 to L1 bridging.

4. Enter the amount of ETH you want to bridge over to Ethereum Mainnet, and select the “Start Bridging” button.

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/L2-to-L1-start-bridging.png")
      .default
  }></img>

5. MetaMask will pop up and ask you to confirm the transaction.

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/metamask-l2.png")
      .default
  }></img>

6. The pending transaction will show up in the “Recent transactions” section of the bridge. _Reminder: It takes at least 8 hours for the transaction to go through from L2 to L1._

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/pending-transaction-L2-L1.png")
      .default
  }></img>

7. You will see a “Claim Funds” button appear under the "Recent transactions" section. Select the "Claim Funds" button to continue the bridging process.

<img
  src={
    require("@site/static/img/docs/use-mainnet/bridges-of-linea/claim-message-l2-l1.png")
      .default
  }></img>

8. MetaMask will ask you to switch networks and to confirm the transaction from the previous step.

9. You're done! You can check your Ethereum account balance in MetaMask, or on a block explorer such as [Etherscan](https://etherscan.io/)!

