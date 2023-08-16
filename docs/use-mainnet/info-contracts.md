---
title: Network info and deployed contracts
sidebar_position: 6
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Network information and deployed contracts

## Network status

You can find out how to navigate to Linea network status [here](./../network-status/index.mdx).

## Network information

<Tabs groupId="Mainnet-Testnet" className="my-tabs">
  <TabItem 
  value="Mainnet" label="Mainnet" default>
<table>
    <tr>
        <td align="left"><b>Network Name</b></td>
        <td align="left">Linea</td>
    </tr>
    <tr>
        <td align="left"><b>RPC URL</b></td>
        <td align="left">https://linea-mainnet.infura.io/v3 or via <a href="https://support.linea.build/hc/en-us/articles/15752713253147">Infura</a> (recommended)</td>
    </tr>
    <tr>
        <td align="left"><b>Chain ID</b></td>
        <td align="left">59144</td>
    </tr>
    <tr>
        <td align="left"><b>Currency Symbol</b></td>
        <td align="left">ETH</td>
    </tr>
    <tr>
        <td align="left"><b>Block Explorer URL</b></td>
        <td align="left"> <a href="https://lineascan.build/">Lineascan</a>  </td>
    </tr>
</table>

  </TabItem>
  <TabItem value="Testnet" label="Testnet">
<table>
    <tr>
        <td align="left"><b>Network Name</b></td>
        <td align="left">Linea</td>
    </tr>
    <tr>
        <td align="left"><b>RPC URL</b></td>
        <td align="left">https://rpc.goerli.linea.build or via <a href="https://support.linea.build/hc/en-us/articles/15752713253147">Infura</a> (recommended)</td>
    </tr>
    <tr>
        <td align="left"><b>Chain ID</b></td>
        <td align="left">59140</td>
    </tr>
    <tr>
        <td align="left"><b>Currency Symbol</b></td>
        <td align="left">ETH</td>
    </tr>
    <tr>
        <td align="left"><b>Block Explorer URL</b></td>
        <td align="left"> <a href="https://goerli.lineascan.build">Lineascan</a> </td>
    </tr>
</table>

## Connect with Infura

If your dapp is using the public endpoint `https://rpc.goerli.linea.build`, it may encounter rate limiting. We recommend connecting to Linea via Infura using [these instructions](https://support.linea.build/hc/en-us/articles/15752713253147). 
</TabItem> 
</Tabs>

## Deployed contracts

<Tabs groupId="Mainnet-Testnet" className="my-tabs">
  <TabItem value="Mainnet" label="Mainnet" default>
      <table>
  <tr>
    <th>Contract</th>
    <th>Address</th>
  </tr>
  <tr>
    <td>L1 Message Service</td>
    <td><a href="https://etherscan.io/address/0xd19d4B5d358258f05D7B411E21A1460D11B0876F">0xd19d4B5d358258f05D7B411E21A1460D11B0876F</a></td>
  </tr>
  <tr>
    <td>L2 Message Service</td>
    <td><a href="https://lineascan.build/address/0x508Ca82Df566dCD1B0DE8296e70a96332cD644ec">0x508Ca82Df566dCD1B0DE8296e70a96332cD644ec</a></td>
  </tr>
</table>
  </TabItem>
  <TabItem value="Testnet" label="Testnet">
    <table>
  <tr>
    <th>Contract</th>
    <th>Address</th>
  </tr>
  <tr>
    <td>L1 Message Service</td>
    <td><a href="https://goerli.etherscan.io/address/0xe87d317eb8dcc9afe24d9f63d6c760e52bc18a40">0xE87d317eB8dcc9afE24d9f63D6C760e52Bc18A40</a></td>
  </tr>
  <tr>
    <td>L2 Message Service</td>
    <td><a href="https://explorer.goerli.linea.build/address/0xA59477f7742Ba7d51bb1E487a8540aB339d6801d">0xA59477f7742Ba7d51bb1E487a8540aB339d6801d</a></td>
  </tr>
</table>
  </TabItem>
</Tabs>

## Token contract addresses and bridges

<Tabs groupId="Mainnet-Testnet" className="my-tabs">
  <TabItem value="Mainnet" label="Mainnet" default>
 

 To get your own token included, please follow the instructions on this [repository](https://github.com/Consensys/linea-token-list).


 To see what bridges are available, head to our [ecosystem portal](https://linea.build/apps) and filter for bridges.

 <table>
  <tr>
    <th>Token</th>
    <th>L1</th>
    <th>L1 Address</th>
    <th>L2 Address</th>
    <th>Bridge</th>
  </tr>
  <tr>
    <td>APE</td>
    <td>Eth</td>
    <td><a href="https://etherscan.io/address/0x4d224452801aced8b2f0aebe155379bb5d594381">0x4d224452801aced8b2f0aebe155379bb5d594381</a></td>
    <td><a href="https://lineascan.build/address/0x6bAA318CF7C51C76e17ae1EbE9Bbff96AE017aCB">0x6bAA318CF7C51C76e17ae1EbE9Bbff96AE017aCB</a></td>
    <td></td>
  </tr>
  <tr>
    <td>DAI</td>
    <td></td>
<td><a href="https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f">0x6b175474e89094c44da98b954eedeac495271d0f</a></td>
    <td><a href="https://lineascan.build/address/0x4AF15ec2A0BD43Db75dd04E62FAA3B8EF36b00d5">0x4AF15ec2A0BD43Db75dd04E62FAA3B8EF36b00d5</a></td>
    <td></td>
  </tr>
  <tr>
    <td>DVF</td>
    <td></td>
<td><a href="https://etherscan.io/token/0xdddddd4301a082e62e84e43f474f044423921918">0xdddddd4301a082e62e84e43f474f044423921918</a></td>
    <td><a href="https://lineascan.build/address/0x1f031f8c523b339c7a831355879e3568fa3eb263">0x1f031f8c523b339c7a831355879e3568fa3eb263</a></td>
    <td></td>
  </tr>
  <tr>
    <td>HAPI</td>
    <td></td>
<td><a href="https://etherscan.io/token/0xd9c2d319cd7e6177336b0a9c93c21cb48d84fb54">0xd9c2d319cd7e6177336b0a9c93c21cb48d84fb54</a></td>
    <td><a href="https://lineascan.build/address/0x0e5F2ee8C29e7eBc14e45dA7FF90566d8c407dB7">0x0e5F2ee8C29e7eBc14e45dA7FF90566d8c407dB7</a></td>
    <td></td>
  </tr>
  <tr>
    <td>KNC</td>
    <td></td>
<td><a href="https://etherscan.io/token/0xdd974d5c2e2928dea5f71b9825b8b646686bd200">0xdd974d5c2e2928dea5f71b9825b8b646686bd200</a></td>
    <td><a href="https://lineascan.build/address/0x3b2F62d42DB19B30588648bf1c184865D4C3B1D6">0x3b2F62d42DB19B30588648bf1c184865D4C3B1D6</a></td>
    <td></td>
  </tr>
  <tr>
    <td>LDO</td>
    <td></td>
<td><a href="https://etherscan.io/token/0x5a98fcbea516cf06857215779fd812ca3bef1b32">0x5a98fcbea516cf06857215779fd812ca3bef1b32</a></td>
    <td><a href="https://lineascan.build/address/0x0e076AAFd86a71dCEAC65508DAF975425c9D0cB6">0x0e076AAFd86a71dCEAC65508DAF975425c9D0cB6</a></td>
    <td></td>
  </tr>
  <tr>
    <td>LINK</td>
    <td></td>
<td><a href="https://etherscan.io/token/0x514910771af9ca656af840dff83e8264ecf986ca">0x514910771af9ca656af840dff83e8264ecf986ca</a></td>
    <td><a href="https://lineascan.build/address/0x5B16228B94b68C7cE33AF2ACc5663eBdE4dCFA2d">0x5B16228B94b68C7cE33AF2ACc5663eBdE4dCFA2d</a></td>
    <td></td>
  </tr>
  <tr>
    <td>PEPE</td>
    <td>Eth</td>
<td><a href="https://etherscan.io/token/0x6982508145454ce325ddbe47a25d4ec3d2311933">0x6982508145454ce325ddbe47a25d4ec3d2311933</a></td>
    <td><a href="https://lineascan.build/address/0x7da14988E4f390C2E34ed41DF1814467D3aDe0c3">0x7da14988E4f390C2E34ed41DF1814467D3aDe0c3</a></td>
    <td></td>
  </tr>
  <tr>
    <td>SHIB</td>
    <td>Eth</td>
<td><a href="https://etherscan.io/token/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce">0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce</a></td>
    <td><a href="https://lineascan.build/address/0x99AD925C1Dc14Ac7cc6ca1244eeF8043C74E99d5">0x99AD925C1Dc14Ac7cc6ca1244eeF8043C74E99d5</a></td>
    <td></td>
  </tr>
  <tr>
    <td>UNI</td>
    <td>Eth</td>
<td><a href="https://etherscan.io/token/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984">0x1f9840a85d5af5bf1d1762f925bdaddc4201f984</a></td>
    <td><a href="https://lineascan.build/address/0x636B22bC471c955A8DB60f28D4795066a8201fa3">0x636B22bC471c955A8DB60f28D4795066a8201fa3</a></td>
    <td></td>
  </tr>
  <tr>
    <td>USDT</td>
    <td>Eth</td>
  <td><a href="https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7">0xdac17f958d2ee523a2206206994597c13d831ec7</a></td>
    <td><a href="https://lineascan.build/address/0xA219439258ca9da29E9Cc4cE5596924745e12B93">0xA219439258ca9da29E9Cc4cE5596924745e12B93</a></td>
    <td></td>
  </tr>
  <tr>
    <td>USDC</td>
    <td>Eth</td>
<td><a href="https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48">0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48</a></td>
    <td><a href="https://lineascan.build/address/0x176211869cA2b568f2A7D4EE941E073a821EE1ff">0x176211869cA2b568f2A7D4EE941E073a821EE1ff</a></td>
    <td></td>
  </tr>
  <tr>
    <td>WBTC</td>
    <td></td>
<td><a href="https://etherscan.io/token/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599">0x2260fac5e5542a773aa44fbcfedf7c193bc2c599</a></td>
    <td><a href="https://lineascan.build/address/0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4">0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4</a></td>
    <td></td>
  </tr>
  <tr>
    <td>WETH</td>
    <td>Eth</td>
<td><a href="https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2">0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2</a></td>
    <td><a href="https://lineascan.build/address/0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f">0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f</a></td>
    <td></td>
  </tr>
</table>
  </TabItem>
  <TabItem value="Testnet" label="Testnet">

You can find faucets for these tokens by going to the [Linea faucet](https://faucet.goerli.linea.build/), connecting your MetaMask wallet, and switching to the Linea network.

If you want to drip Goerli ETH directly to Linea, you can use the [Infura Linea faucet](https://infura.io/faucet/linea)

<table>
  <tbody>
    <tr>
      <th>Token</th>
      <th>L1</th>
      <th>L1 Address</th>
      <th>L2 Address</th>
      <th>Bridge</th>
    </tr>
        <tr>
      <td>ETH</td>
      <td>Goerli</td>
      <td>0x70BaD09280FD342D02fe64119779BC1f0791BAC2</td>
      <td>0xC499a572640B64eA1C8c194c43Bc3E19940719dC</td>
      <td><a href="https://goerli.hop.exchange/#/send?token=ETH&sourceNetwork=ethereum&destNetwork=linea">Hop</a></td>
    </tr>
    <tr>
      <td>USDC</td>
      <td>Goerli</td>
      <td>0x07865c6e87b9f70255377e024ace6630c1eaa37f</td>
      <td>0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068</td>
      <td><a href="https://goerli.hop.exchange/#/send?token=ETH&sourceNetwork=ethereum&destNetwork=linea">Hop</a></td>
    </tr>
    <tr>
      <td>DAI</td>
      <td>Goerli</td>
      <td>0xb93cba7013f4557cDFB590fD152d24Ef4063485f</td>
      <td>0x8741Ba6225A6BF91f9D73531A98A89807857a2B3</td>
      <td><a href="https://goerli.hop.exchange/#/send?token=ETH&sourceNetwork=ethereum&destNetwork=linea">Hop</a></td>
    </tr>
    <tr>
      <td>USDT</td>
      <td>Goerli</td>
      <td>0xfad6367E97217cC51b4cd838Cc086831f81d38C2</td>
      <td>0x1990BC6dfe2ef605Bfc08f5A23564dB75642Ad73</td>
      <td><a href="https://goerli.hop.exchange/#/send?token=ETH&sourceNetwork=ethereum&destNetwork=linea">Hop</a></td>
    </tr>
    <tr>
      <td>UNI</td>
      <td>Goerli</td>
      <td>0x41E5E6045f91B61AACC99edca0967D518fB44CFB</td>
      <td>0x7823E8DCC8bfc23EA3AC899EB86921f90e80F499</td>
      <td><a href="https://goerli.hop.exchange/#/send?token=ETH&sourceNetwork=ethereum&destNetwork=linea">Hop</a></td>
    </tr>
    <tr>
      <td>HOP</td>
      <td>Goerli</td>
      <td>0x38aF6928BF1Fd6B3c768752e716C49eb8206e20c</td>
      <td>0x6F03052743CD99ce1b29265E377e320CD24Eb632</td>
      <td><a href="https://goerli.hop.exchange/#/send?token=ETH&sourceNetwork=ethereum&destNetwork=linea">Hop</a></td>
    </tr>
    <tr>
      <td>BNB</td>
      <td>BSC</td>
      <td>Native token</td>
      <td>0x5471ea8f739dd37E9B81Be9c5c77754D8AA953E4</td>
      <td><a href="https://dev-cbridge-v2.netlify.app/97/59140/BNB">Celer</a></td>
    </tr>
    <tr>
      <td>BUSD</td>
      <td>BSC</td>
      <td>0xeb3eb991d39dac92616da64b7c6d5af5ccff1627</td>
      <td>0x7d43AABC515C356145049227CeE54B608342c0ad</td>
      <td><a href="https://dev-cbridge-v2.netlify.app/97/59140/BNB">Celer</a></td>
    </tr>
    <tr>
      <td>AVAX</td>
      <td>Fuji</td>
      <td>Native token</td>
      <td>Multi-chain</td>
      <td><a href="https://test.multichain.org/#/router">Multichain</a></td>
    </tr>
    <tr>
      <td>TUSD</td>
      <td>Fuji</td>
      <td>0xd00B9BBC6EDC3953Ec502d73E7FA7C59f628d947</td>
      <td>0x922D641a426DcFFaeF11680e5358F34d97d112E1</td>
      <td><a href="https://test.multichain.org/#/router">Multichain</a></td>
    </tr>
    <tr>
      <td>EUROe</td>
      <td>Fuji</td>
      <td>0xA089a21902914C3f3325dBE2334E9B466071E5f1</td>
      <td>0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73</td>
      <td><a href="https://test.multichain.org/#/router">Multichain</a></td>
    </tr>
    <tr>
      <td>MATIC</td>
      <td>Mumbai</td>
      <td>Native token</td>
      <td>0xcAA61BCAe7D37Fe9C33c0D8671448254eef44D63</td>
      <td><a href="https://testnet.bridge.connext.network/">Connext</a></td>
    </tr>
        <tr>
      <td>WETH</td>
      <td>-</td>
      <td>-</td>
      <td>0x2C1b868d6596a18e32E61B901E4060C872647b6C</td>
      <td>-</td>
    </tr>
  </tbody>
</table>
  </TabItem>
</Tabs>

## Important Contracts

<Tabs groupId="Mainnet-Testnet" className="my-tabs">
  <TabItem value="Mainnet" label="Mainnet" default>
    Mainnet contracts coming soon.
  </TabItem>
  <TabItem value="Testnet" label="Testnet">
    <table>
  <tr>
    <th>Contracts</th>
  </tr>
  <tr>
    <td><a href="pathname:///files/testnet/IBridge.sol">IBridge.sol</a></td>
  </tr>
  <tr>
    <td><a href="pathname:///files/testnet/IL1Bridge.sol">IL1Bridge.sol</a></td>
  </tr>
  <tr>
    <td><a href="pathname:///files/testnet/IMessageService.sol">IMessageService.sol</a></td>
  </tr>
  <tr>
    <td><a href="pathname:///files/testnet/MessageServiceBase.sol">MessageServiceBase.sol</a></td>
  </tr>
  <tr>
    <td><a href="pathname:///files/testnet/TokenBridge.sol">TokenBridge.sol</a></td>
  </tr>
</table>

  </TabItem>
</Tabs>

<!-- ## Faucets

If you want to drip Goerli ETH directly to Linea, you can use the following faucets:

1. [Infura Linea faucet](https://infura.io/faucet/linea)
1. [Covalent Linea faucet](https://www.covalenthq.com/faucet/)
1. [FAUCETME faucet](https://linea.faucetme.pro/)
1. [Tatarot faucet](https://faucet.tatarot.ai/)

If you want to drip other tokens, you can find the [multi-token Linea faucet here](https://faucet.goerli.linea.build/), which lists the different tokens you can add to your wallet on the Goerli and Linea Goerli testnet.
 -->
