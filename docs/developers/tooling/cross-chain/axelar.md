---
title: Axelar
image: /img/socialCards/axelar.jpg
---

[Axelar](https://docs.axelar.dev/) is a blockchain of blockchains that allows for universal web3 
interoperability. By integrating with Axelar, your Linea-based application now has access to the 
[45+ chains](https://axelarscan.io/) that are also connected via Axelar. As Axelar is a blockchain 
of blockchains, it overcomes many of the challenges of more centralized interoperability solutions; 
transactions that go through the Axelar network cannot be censored by any oracle, relayer, or 
sequencer.

## Available functionality

Axelar enables powerful interchain features for builders on Linea.

1. The ability to [send tokens](https://docs.axelar.dev/dev/send-tokens/overview) across blockchains
1. The ability to send [general messages](https://docs.axelar.dev/dev/general-message-passing/overview) 
across blockchains

## Linea integration

When integrating with Axelar there are two key contracts that need to be utilized. These are:

1. The [Axelar Gateway](https://docs.axelar.dev/learn#gateway-smart-contracts)
   - On the source chain, this contract exposes the functions which you will use to initiate an 
   interchain transaction.
   - On the destination chain, this contract enables messages to be executed automatically to 
   complete the interchain transaction.
1. The [Axelar Gas Service](https://docs.axelar.dev/dev/general-message-passing/gas-services/intro)
   - This contract is the entrypoint into Axelar's gas service, which handles gas payment for your 
   transaction on both the Axelar network and the destination chain. You as the caller now only 
   need the gas of the source chain.

### Contract addresses:

| Contract | Network | Address | networkId |
| --- | --- | --- | --- |
| Gateway | Mainnet | [0xe432150cce91c13a887f7D836923d5597adD8E31](https://lineascan.build/address/0xe432150cce91c13a887f7D836923d5597adD8E31) | 59144 |
| Gateway | Testnet | [0xe432150cce91c13a887f7D836923d5597adD8E31](https://goerli.lineascan.build/address/0xe432150cce91c13a887f7D836923d5597adD8E31) | 59140 |
| Gas Service | Mainnet | [0x2d5d7d31F671F86C782533cc367F14109a082712](https://lineascan.build/address/0x2d5d7d31F671F86C782533cc367F14109a082712) | 59144 |
| Gas Service | Testnet | [0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6](https://goerli.lineascan.build/address/0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6) | 59140 |

Once you have submitted your transaction, you can view it on the [Axelarscan block explorer](https://axelarscan.io/). 
The Axelarscan explorer is specifically tailored to show your interchain transaction step-by-step 
as it passes from the source chain, via the Axelar network, to the destination chain.

## Linea-Axelar example

For a full end-to-end example of a Linea-Axelar integration, check out our [video walkthrough](https://www.youtube.com/watch?v=-KgJZmq8Umc&t=1s) 
of the process. The complementary code can be found [here](https://github.com/Olanetsoft/linea-interchain-workshop-with-axelar).

## Axelar use cases

For inspiration, here are some live use cases demonstrating the kind of interchain applications 
that can be built on top of Axelar:

1. Interchain token swaps (e.g. [Squid](https://app.squidrouter.com/))

   - Squid is an exciting new protocol built on top of Axelar that allows users to swap tokens 
   with a Uniswap-like experience, leveraging Axelar for swaps between tokens across different 
   blockchains. Squid takes DeFi to the next level, reducing the need to revert to centralized 
   exchanges or multiple different exchanges to swap tokens across chains.

1. Interchain lending (e.g. [Prime Protocol](https://www.primeprotocol.xyz/))

   - A chain-agnostic prime brokerage that allows users to deposit assets from any connected 
   chain and use their aggregate value as collateral for loans on any other connected chain. Prime 
   offers the ability to build interchain applications that connect from any blockchain to any 
   other blockchain, rather than just connecting a series of blockchains to Ethereum. Prime's 
   interchain design allows for a variety of new DeFi use cases, including cross-chain margining.

1. Interchain gaming (e.g. [Junkyard](https://junkyard.wtf/))

   - Web3 gaming is heavily reliant on NFTs, and enabling NFTs to be passed between blockchains 
   is a critical next step for NFT-based games. Junkyard leverages Axelar to allow interchain 
   NFTs in its game. In Junkyard, players can deposit their NFTs to the Junkyard contract. The 
   NFT can come from any chain connected to the Axelar ecosystem, including Linea.

## Get involved with Axelar

1. Meet the community on [Discord](http://discord.gg/axelar)
1. Dive into the data on the [Axelarscan block explorer](http://axelarscan.io)
