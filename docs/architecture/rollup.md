---
title: Rolup to Mainnet
sidebar_position: 6
---
## Submission to L1

Remember when we were talking about the Canonical Message Service? Yeah, that was a while ago. Well, here we are: we've come full circle.

The Coordinator now has all it needs to update Ethereum: the current state of the network, as represented by the Merkle tree, and the proof, with all the transactions occurred. A call is made from the Coordinator to the Canonical Message Service smart contract on Linea, containing that data. The Postbots pass the data off to the smart contract on the Ethereum network. The zk-proof can then be used to satisfy Ethereum that Linea's state is correct and valid.

<img src={redcircle}  style={{width:200}}></img>