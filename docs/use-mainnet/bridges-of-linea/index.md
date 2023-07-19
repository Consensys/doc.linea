---
title: Bridge your tokens
sidebar_position: 4
--- 

# Linea, the land of many bridges

Any L2 is going to have a lot of connections to other networks. Some of these bridges will be made by Consensys and Linea, some by projects collaborating with us; eventually, some may be made without our knowledge—that’s what 'permissionless' means.

> 
> ### What's going on here?
> Linea, like any other rollup network, is designed to offer its own experience, while 'reporting back' to another network (usually Ethereum Mainnet) on all the activity that happens on it (at least, at the level of transactions); this means that the 'Layer 1' network is tracking all the activity on the 'Layer 2'. In this way, L2s are said to 'inherit the security of the L1'.
> 
> One of the main reasons you would want a rollup network is for it to be totally interoperable with the L1, and one of the main things you need to make networks interoperable is enable people to move things back and forth between them. The class of tools used to this, broadly, are called **bridges**.
>
> Ok, now you're up to speed 🚀

# The Linea bridge ecosystem

### The Canonical Message Bridge

The main "bridge", on a technical level, in Linea is the *Canonical Token Bridge*. This is the underlying set of smart contracts which keep track of receiving requests to move tokens to the other layer, and of sending the message that those tokens should be transferred. 

### The Postfrens

This message is then picked up by programs serving as "postmen", and moved to the other network, where the receiving smart contract executes according to the message received.

### The Canonical Token Bridge

If you want to move tokens between L1 and L2, we recommend you use the bridge made on top of the Canonical Message Bridge, specifically for this purpose: the Canonical Token Bridge, currently located at [https://bridge.linea.build](https://bridge.linea.build): **instructions below!**

### Official, Third-Party, Permissionless Bridges, and beyond

As the network grows, we'll be updating this space with a user's guide to the bridges of Linea.

### Disclaimer

_Our token bridge currently only supports the bridging of ETH. We will have ERC20 token compatibility soon. It currently takes around 20 minutes to bridge ETH from L1 to L2 and at least 8 hours to bridge from L2 to L1._


:::note

This is a step by step guide on how to bridge ETH from Ethereum (L1) to Linea (L2) and Linea (L2) to Ethereum (L1). The screenshots provided are examples of bridging ETH for Linea  and Ethereum Mainnet. To bridge ETH over Testnet, simply click the testnet button at the bottom left of the [token bridge page](https://bridge.linea.build/) and follow the same steps as below.

:::


## Bridging ETH from Ethereum to Linea

## Automatic Claiming:

1. Go to our token bridge [here](https://bridge.linea.build/). 

2. Connect your wallet in top right corner of the page. ![connect to token bridge](/img/docs/use-mainnet/bridges-of-linea/linea-bridge-connect.png)

3. Verify that the Bridge is set to Ethereum → Linea Mainnet and that automatic claiming is enabled.

4. Enter the amount of ETH you want to bridge over to Linea Mainnet, and select the “Start Bridging” button. ![bridging amount](/img/docs/use-mainnet/token-bridge-step-3.png)

5. MetaMask will pop up asking you to confirm the transaction. ![metamask confirmation](/img/docs/use-mainnet/bridges-of-linea/metamask-confirmation.png)

6. After confirming the transaction, it should take around 20 minutes for the transaction to reach Linea Mainnet. You can see your pending transaction under the "Recent Transaction" section at the bottom of the token bridge. ![pending transaction](/img/docs/use-mainnet/bridges-of-linea/pending-transaction-l1-to-l2.png)

7. You’re done! Under Recent Transactions, it should say "Bridging complete" and your ETH should be on Linea Mainnet. _Reminder: It takes around 20 minutes for the bridging process to complete._ ![confirmed transaction](/img/docs/use-mainnet/bridges-of-linea/confirmed-transaction-l1-to-l2.png) 

8. You can see your Linea wallet balance in MetaMask once you switch to the Linea network. You can also check it on [linea-scan](https://lineascan.build/address/0x331FB12C080F5b34F0E8812D44114D17398A016d). Just replace the wallet address in the URL with your wallet address and it should reflect your wallet's balance!


## Manual Claiming

1. Go to our token bridge [here](https://bridge.linea.build/). 

2. Connect your wallet in top right corner of the page. ![connect to token bridge](/img/docs/use-mainnet/bridges-of-linea/linea-bridge-connect.png)

3. Verify that the Bridge is set to Ethereum → Linea Mainnet and that manual claiming is enabled.

4. Enter the amount of ETH you want to bridge over to Linea Mainnet, and select the “Start Bridging” button. ![bridging manually amount](/img/docs/use-mainnet/manual-claiming.png)

5. MetaMask will pop up asking you to confirm the transaction. ![metamask confirmation](/img/docs/use-mainnet/bridges-of-linea/metamask-confirmation.png)

6. You will see a “Claim Funds” button appear under the Recent Transactions section. Select the "Claim Funds" button to continue the bridging process.      
![claim funds](/img/docs/use-mainnet/bridges-of-linea/claim-funds.png)

7. MetaMask will prompt you to switch networks and to also confirm the transaction from the previous step.

![MetaMask claim message](/img/docs/use-mainnet/bridges-of-linea/claim-message-metamask.png)

8. You’re done! Under Recent Transactions, it should say "Bridging complete" and your ETH should be on Linea Mainnet. _Reminder: It takes around 20 minutes for the bridging process to complete._ ![confirmed transaction](/img/docs/use-mainnet/bridges-of-linea/Confirmation-manual-claim.png)

9. You can see your Linea wallet balance in MetaMask once you switch to the Linea network. You can also check it on [linea-scan](https://lineascan.build/address/0x331FB12C080F5b34F0E8812D44114D17398A016d). Just replace the wallet address in the URL with your wallet address and it should reflect your wallet's balance!


## Bridging ETH from Linea Mainnet (L2) to Ethereum Mainnet (L1)

1. Go to our token bridge [here](https://bridge.linea.build/). 

2. Connect your wallet in top right corner of the page. ![connect to token bridge](/img/docs/use-mainnet/bridges-of-linea/linea-bridge-connect.png)

3. Verify that the Bridge is set to Linea Mainnet --> Ethereum. Manual claiming is the only available option for L2 to L1 bridging.

4.  Enter the amount of ETH you want to bridge over to Linea Mainnet, and select the “Start Bridging” button. ![bridging manually amount](/img/docs/use-mainnet/bridges-of-linea/L2-to-L1-start-bridging.png)

5. MetaMask will pop up and ask you to confirm the transaction. 

![metamask](/img/docs/use-mainnet/bridges-of-linea/metamask-l2.png) 

6. The pending transaction will show up in the “Recent Transactions” section of the bridge. _Reminder:  It takes at least 8 hours for the transaction to go through from L2 to L1._ ![pending transaction](/img/docs/use-mainnet/bridges-of-linea/pending-transaction-L2-L1.png).

7. You will see a “Claim Funds” button appear under the Recent Transactions section. Select the "Claim Funds" button to continue the bridging process. ![claim message](/img/docs/use-mainnet/bridges-of-linea/claim-message-l2-l1.png)

8. MetaMask will prompt you to switch networks and to also confirm the transaction from the previous step.

9. You're done! You can check your Ethereum wallet balance on MetaMask or a block explorer such as [etherscan](https://etherscan.io/)!

