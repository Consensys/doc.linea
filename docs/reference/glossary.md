---
title: Zero-Knowledge Glossary
description: An open source glossary to aid you zero knowledge journey!
sidebar_position: 5
---

This glossary is open source and consistently being updated. If you'd like a term to be added, please [create an issue](https://github.com/ConsenSys/doc.zk-evm/issues) or create a pull request and define one yourself!

## \#

## A

## B

**Blockchain trilemma**

The blockchain trilemma is a “pick 2” situation between decentralization, security, and scalability. Between the 3, the Ethereum community has chosen decentralization and security. Sacrificing scalability means increasing gas prices, which jeopardizes the adoption of Ethereum by pricing out users.

## C

## D

**Data availability**

Data availability is the guarantee that the block proposers are required to publish the data for each block, which nodes participating in Ethereum's consensus store locally. This is what powers trustlessness: rather than having to trust that block producers are honest, all nodes on the Ethereum network execute the transactions to verify that the new information is valid. Data availability is one of the ways in which a layer 2 differs from a sidechain.

## E

**Ethereum Virtual Machine (EVM)**

A stack-based virtual machine that executes bytecode. In Ethereum, the execution model specifies how the system state is altered given a series of bytecode instructions and a small tuple of environmental data. This is specified through a formal model of a virtual state machine.

## F

## G

## H

## I

## J

## K

## L

**Layer 1**

Layer 1 (L1) is the underlying foundation and base blockchain that various layer 2 (L2) networks build on top of. For example, Ethereum is an L1 that is comprised of node operators to secure and validate the network, block producers, the history of transaction data, and the consensus mechanism of the blockchain itself.

**Layer 2**

Layer 2 (L2) is a separate blockchain that increases transaction speed and throughput, while fully or partially deriving its security from Ethereum. Additionally, Layer 2 projects must rely on Ethereum for data availability by posting their transaction data onto Ethereum. L2s decrease L1 congestion by bundling transactions to be submitted to Ethereum, thus increasing scalability while inheriting Ethereum’s data availability, security, and decentralization.

## M

## N

## O

**Optimistic rollup**

A rollup of transactions that use fraud proofs to offer increased layer 2 transaction throughput while using the security provided by Mainnet (layer 1). Unlike Plasma, a similar layer 2 solution, optimistic rollups can handle more complex transaction types – anything possible in the EVM. However, in order to release assets back on the layer 1, users must wait for a 7 day challenge period. Liquidity providers can help alleviate distributing L1 ETH immediately, but this relies on trust in the security of the provider, and does not provide a mechanism for transferring NFTs.

## P

## Q

## R

**Rollup**

A type of layer 2 scaling solution that batches multiple transactions and submits them to the Ethereum main chain in a single transaction. This allows for reductions in gas costs and increases in transaction throughput. There are optimistic and zero-knowledge rollups which use different security methods to offer these scalability gains.

## S

**Scaling**

The main goal of scalability is to increase transaction speed (faster finality), and transaction throughput (high transactions per second), without sacrificing decentralization or security.

**Sidechain**

A scaling solution that uses a separate chain with different, often faster, consensus rules. A bridge is needed to connect these sidechains to Mainnet. Rollups also use sidechains, but they operate in collaboration with Mainnet instead.

## T

**Transaction fee**

A fee you need to pay whenever you use the Ethereum network. Examples include sending funds from your wallet or a dapp interaction, like swapping tokens or buying a collectible. You can think of this like a service charge. This fee will change based on how busy the network is. This is because miners, the people responsible for processing your transaction, are likely to prioritize transactions with higher fees – so congestion forces the price up.

## U

## V

**Validity proof**

A security model for certain layer 2 solutions where, to increase speed, transactions are rolled up into batches and submitted to Ethereum in a single transaction. The transaction computation is done off-chain and then supplied to the main chain with a proof of their validity. This method increases the amount of transactions possible while maintaining security. Some rollups use fraud proofs.

## W

## X

## Y

## Z

**Zero-knowledge proof**

A zero-knowledge proof is a cryptographic method that allows an individual to prove that a statement is true without conveying any additional information.

**Zero-knowledge rollup**

A rollup of transactions that use validity proofs to offer increased layer 2 transaction throughput while using the security provided by Mainnet (layer 1). Although they can't handle complex transaction types, like optimistic rollups, they don't have latency issues because transactions are provably valid when submitted.
