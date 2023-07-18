---
title: Use Compound
description: Perform deposit collateral, borrow and supply USDC
sidebar_position: 1
---

Compound has been deployed to showcase how Linea can be used to supply collateral and borrow tokens on L2, where users can benefit from cheaper gas fees. Compound has integrated those contracts in its website to let the user interact with the dapp on Linea.

This tutorial will can be done with either [Fluvi Wallet](https://chrome.google.com/webstore/detail/fluvi-wallet/mmmjbcfofconkannjonfmjjajpllddbg) or Metamask wallet to interact with Compound on Linea.

If during this tutorial you encounter the transaction pending issue, please see : [Clear pending transactions](#clear-pending-transactions)

## How to borrow USDC on compound in one “Bulk transaction”

1. First you need some ETH, navigate to the faucet to get some: [Linea Faucet](https://faucet.goerli.linea.build/)
2. Once you have some ETH, navigate to [Compound Finance](https://app.compound.finance/?market=usdc-lineagoerli&testnet=)
3. Connect your wallet.

![Make](/img/quests/compound/compound-1.png)

4. Make sure your wallet is connected to Linea Goerli and funded with ETH
5. Make sure that “Linea Goerli” is selected in the networks list on the top right

![Make](/img/quests/compound/compound-2.png)

6. Make sure that you have not supplied any USDC to compound(You can not supply and borrow USDC at the same time), if you have, click on "Withdraw USDC" otherwise skip step 7

![Make](/img/quests/compound/compound-14.png)

7. Then click on "Max", click on "Add Action". Then on "Submit Transaction" and in the popup click on "Confirm", wait for the transaction to be completed. ![Make](/img/quests/compound/compound-15.png)

8. Click on the “+” sign next to the collateral “Ether”

![Make](/img/quests/compound/compound-3.png)

9. Add the amount of ETH you want to deposit and then click on “Add Action”
10. Click on the purple button “Borrow USDC”
11. Add the amount of USDC you want to borrow and then click on “Add Action”
12. Click on “Submit Transaction”

![Make](/img/quests/compound/compound-4.png)

13. In the popup click on “Confirm”

![Make](/img/quests/compound/compound-5.png)

14. Wait for the transaction to be confirmed

![Make](/img/quests/compound/compound-6.png)

15. Click on “Complete Transaction”

![Make](/img/quests/compound/compound-7.png)

16. In the popup click on “Confirm”
17. Wait for the transaction to be confirmed
18. You now have borrowed USDC from compound!

## How to supply USDC on compound to earn interest

1. You first need to repay the amount of USDC you borrowed
2. Click on “Repay USDC”

![Make](/img/quests/compound/compound-8.png)

3. Click on “Max” and “Approve & Add”
4. Click on “Submit Transaction”
5. In the popup click on “Use default”, “Next” and “Approve”

![Make](/img/quests/compound/compound-9.png)

6. Wait for the transaction to be completed then click on “Submit Transaction” again
7. In the popup click on confirm
8. Wait for the transaction to be completed
9. You now need USDC to supply USDC, navigate to [Linea Faucet](https://faucet.goerli.linea.build/)
10. Get some USDC from the faucet
11. Come back to the compound website, you should see a USDC balance and a “Supply USDC” button

![Make](/img/quests/compound/compound-10.png)

12. Click on “Supply USDC”

![Make](/img/quests/compound/compound-11.png)

13. Enter the amount of USDC you want to supply and click on “Approve & Add”

![Make](/img/quests/compound/compound-12.png)

14. Click on “Use default” then “Next” and “Approve”
15. Wait for the transaction to be completed
16. Click on “Submit Transaction”

![Make](/img/quests/compound/compound-13.png)

17. In the popup click on “Confirm”
18. Wait for the transaction to be completed
19. You have supplied USDC in compound and are starting to earn interest!

### Clear pending transactions

It can occur that sometimes, the pending transactions displayed on the website are never completed even though they have been completed on chain (Usually it is displayed directly on your wallet), if that happens you can clear the transactions displayed on the website as below:

1. Click on "Pending" at the top right of the screen
2. Then click on "Clear" in the popup

![Make](/img/quests/compound/compound-16.png)

