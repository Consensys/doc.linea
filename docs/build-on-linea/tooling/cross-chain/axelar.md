---
title: Axelar Network
---

# Axelar Network

The [Axelar Network](https://docs.axelar.dev/), is a blockchain of blockchains that allows for universal web3 interoperability. By integrating with Axelar, your Linea based application now has access to the [45+ chains](https://axelarscan.io/) that are also connected via Axelar. As Axelar is a blockchain of blockchains it overcomes many of the challenges of more centralized interoperability solutions. Transactions that go through the Axelar network cannot be censored by any oracle, relayer, or validator.

## Available Functionality

Two powerful features are available for builders on Linea.

1. The ability to [send tokens](https://docs.axelar.dev/dev/send-tokens/overview) across blockchains
1. The ability to send [general messages](https://docs.axelar.dev/dev/general-message-passing/overview) across blockchains

## Linea Integration

When integrating with Axelar there are two key contracts that need to be utilized. These are

1. The [Axelar Gateway](https://docs.axelar.dev/learn#gateway-smart-contracts)
   - On the source chain this contract exposes the functions which you will use to initiate a transaction from the source chain.
   - On the destination chain this contract is used to automatically execute a transaction.
2. The [Axelar Gas Service](https://docs.axelar.dev/dev/general-message-passing/gas-services/intro)
   - This contract is the entrypoint into Axelar's gas service, which handles gas payment for your transaction on both the Axelar network and the destination chain. You as the caller only now need the gas of the source chain.

#### Contract Addresses:

| Contract | Network | Address | networkId |
| --- | --- | --- | --- |
| Gateway | Mainnet | [0xe432150cce91c13a887f7D836923d5597adD8E31](https://lineascan.build/address/0xe432150cce91c13a887f7D836923d5597adD8E31) | 59144 |
| Gateway | Testnet | [0xe432150cce91c13a887f7D836923d5597adD8E31](https://goerli.lineascan.build/address/0xe432150cce91c13a887f7D836923d5597adD8E31) | 59140 |
| Gas Service | Mainnet | [0x2d5d7d31F671F86C782533cc367F14109a082712](https://lineascan.build/address/0x2d5d7d31F671F86C782533cc367F14109a082712) | 59144 |
| Gas Service | Testnet | [0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6](https://goerli.lineascan.build/address/0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6) | 59140 |

Once you have submitted your transaction you can now view it on the [Axelarscan block explorer](https://axelarscan.io/). The Axelarscan explorer is specifically tailored to show your interchain transaction step by step as it passed from the source chain via the Axelar network to the destination chain.

## Linea-Axelar Example

For a full end-to-end example of a Linea-Axelar integration here is a [video walkthrough](https://www.youtube.com/watch?v=-KgJZmq8Umc&t=1s) of the process, the complementary code can be found [here](https://github.com/Olanetsoft/linea-interchain-workshop-with-axelar).

## Axelar Usecases

For inspiration here of what sort of interchain applications can be built on top of Axelar here are some live usecases.

1. Interchain Token Swaps ([Squid](https://app.squidrouter.com/))

- Squid is an exciting new protocol built on top of Axelar that allows users to swap tokens with a uniswap like experience but leverages Axelar for swaps between tokens across different blockchains. Squid takes DeFi to the next level restricting the need to revert to centralized exchanges or multiple different exchanges to swap tokens across chains.

2. Interchain Lending ([Prime Protocol](https://www.primeprotocol.xyz/))

- A chain-agnostic prime brokerage that can accept any asset as collateral: cross-chain, meet cross-margin. The ability to build interchain applications that connect from any blockchain to any blockchain rather than just a series of blockchains to ethereum allows for a variety of new defi usecases including cross-chain margining. Prime allows users to deposit assets from any connected chain and use their aggregate value in collateral for loans, on any other connected chain.

3.  Interchain Gaming ([Junkyard](https://junkyard.wtf/)

- Web3 gaming is heavily reliant on the use of NFTs. For NFT based games to maximize their usecase, allowing them to be passed between blockchains is a critical next step. Junkyard leverages Axelar to allow for interchain NFTs in its game. In Junkyard, players are able to deposit their NFTs to the Junkyard contract, the NFT can come from any chain connected in the Axelar ecosystem, including Linea.

## Get Involved With Axelar

1. Meet the community on [Discord](http://discord.gg/axelar)
2. Dive into the data on the [Axelarscan block explorer](http://axelarscan.io)
