---
title: Bridge your funds with Etherscan
description: Bridge funds between Goerli and Linea using Etherscan
sidebar_position: 1
---

## Set up

Before you begin, ensure your wallet is:

1. [Configured to use Linea](/use-mainnet/set-up-your-wallet.mdx)
1. [Funded with test tokens](/build-on-linea/use-linea-testnet/fund.md#get-test-eth-on-goerli)

## Bridge ETH from Goerli to Linea

1. Go to the [Linea Message Service transparent proxy contract](https://goerli.etherscan.io/address/0x70BaD09280FD342D02fe64119779BC1f0791BAC2#writeProxyContract) on Goerli Etherscan
1. Navigate to Contract > Write as Proxy tab
1. Connect your wallet by clicking on the “Connect with web3” button
1. Open the `SendMessage` function form ![bridge goerli eth to linea](/img/quests/etherscan-bridge/bridge-goerli-eth.png)
1. Complete the form with the following information:
   <table>
     <tr>
       <td align="left">
         <b>sendMessage</b>
       </td>
       <td align="left">This is the amount of ETH to send</td>
     </tr>
     <tr>
       <td align="left">
         <b>_to</b>
       </td>
       <td align="left">
         This is the recipient on the other layer (usually your Ethereum
         address)
       </td>
     </tr>
     <tr>
       <td align="left">
         <b>_fee</b>
       </td>
       <td align="left">
         This is the fee paid to the postman to execute the transfer on the
         second layer automatically. Users will eventually receive
         payableAmount. We recommend providing a 0.001 ETH fee to ensure proper
         execution. Note: the amount is in wei, so 0.001 ETH = 10e15 or
         1000000000000000
       </td>
     </tr>
     <tr>
       <td align="left">
         <b>_calldata</b>
       </td>
       <td align="left">For simple transfer, send empty calldata with 0x.</td>
     </tr>
   </table>
1. Validate the transaction on your wallet and you’re done 🎉! Your funds should arrive on the other layer under a few minutes (L2 -> L1 bridging is a bit longer and can take up to ~15min).

## Bridge ETH from Linea to Goerli

Follow the steps above, but use the [Linea Message Service transparent proxy contract](https://goerli.lineascan.build/address/0xC499a572640B64eA1C8c194c43Bc3E19940719dC#writeProxyContract) on Linea Etherscan instead!

## Bridge ERC20 from Goerli to Linea

1. Go to the [ERC20 contract of your choice](/build-on-linea/use-linea-testnet/info-contracts.md#token-contract-addresses-and-bridges) on Etherscan docs
1. Navigate to Contract > Write Contract tab
1. Connect your wallet by clicking on the “Connect with web3” button
1. Open the `approve` function form ![erc20 approve](/img/quests/etherscan-bridge/bridge-erc20.png)
1. Complete the form with the following information:
   <table>
     <tr>
       <td align="left">
         <b>spender</b>
       </td>
       <td align="left">
         Fill it with the Token Bridge transparent proxy address as spender. For
         Goerli, use{" "}
         <a href="https://goerli.etherscan.io/address/0xaA012D038E6440535Ec66eDf2DA592F4F8398133">
           0xaA012D038E6440535Ec66eDf2DA592F4F8398133
         </a>
         .
       </td>
     </tr>
     <tr>
       <td align="left">
         <b>amount</b>
       </td>
       <td align="left">
         This is the amount you want to send. Note: the amount is in the lowest
         decimal. To send 1 $UNI which has 18 decimals, you need to input
         1000000000000000000
       </td>
     </tr>
   </table>
1. Go to the [Linea ERC20 Token Bridge transparent proxy contract](https://goerli.lineascan.build/address/0xB191E3d98074f92584E5205B99c3F17fB2068927#writeProxyContract) on Etherscan.
1. Navigate to Contract > Write as Proxy tab
1. Connect your wallet by clicking on the “Connect with web3” button
1. Open the `BridgeToken` function form ![bridge token](/img/quests/etherscan-bridge/bridge-erc20-2.png)
1. Complete it with the following information:
   <table>
     <tr>
       <td align="left">
         <b>BridgeToken (payableAmount)</b>
       </td>
       <td align="left">
         This is the fee paid to the postman message service to execute the
         transfer on the second layer automatically. Users will eventually
         receive _fee. We recommend providing a 0.001 ETH fee to ensure proper
         execution. Note: the amount is in wei, so 0.001 ETH = 1000000000000000.
       </td>
     </tr>
     <tr>
       <td align="left">
         <b>_token</b>
       </td>
       <td align="left">This is the address of the ERC20 to bridge</td>
     </tr>
     <tr>
       <td align="left">
         <b>_amount</b>
       </td>
       <td align="left">
         Note: the amount is in the lowest decimal. To send 1 $UNI which has 18
         decimals, you need to input 1000000000000000000
       </td>
     </tr>
     <tr>
       <td align="left">
         <b>_recipient</b>
       </td>
       <td align="left">This is the recipient address on the other layer</td>
     </tr>
   </table>
1. Validate the transaction on your wallet and you’re done 🎉! Your funds should arrive on the other layer under a few minutes (L2 -> L1 bridging is a bit longer and can take up to ~15min)

## Bridge ERC20 from Linea to Goerli

Follow the same steps as above, except use the [Token Bridge transparent proxy address (0xB191E3d98074f92584E5205B99c3F17fB2068927)](https://goerli.lineascan.build/address/0xB191E3d98074f92584E5205B99c3F17fB2068927#writeProxyContract) as spender on Linea, and use the [Goerli ERC20 Token Bridge transparent proxy contract](https://goerli.etherscan.io/address/0xaA012D038E6440535Ec66eDf2DA592F4F8398133#writeProxyContract) to bridge the token.

## Manually complete a bridge transaction

:::note

This step is not mandatory unless you didn’t send enough fees when initiating your bridge transaction

:::

1. Browse your `Transaction Details` page of the transaction you sent on the source layer
1. Go to the `Logs` tab
1. Find the log for the `MessageSent` event and keep it open for a later step

   ![message sent](/img/quests/etherscan-bridge/logs.png)

1. Go to the [Message Service contract](/architecture/bridges/message-service.mdx#contracts) on the other Layer ([0xC499a572640B64eA1C8c194c43Bc3E19940719dC](https://goerli.lineascan.build/address/0xC499a572640B64eA1C8c194c43Bc3E19940719dC) on L2)
1. Navigate to the `Write Proxy` tab, connect your wallet, and call the `claimMessage` function using the parameters found in the logs MessageSent checked earlier. Note: `bytes` argument need to start with `0x0`

   ![write claimMessage](/img/quests/etherscan-bridge/claimmessage.png)

1. Confirm the transaction on your wallet
