---
title: Zero-Knowledge Glossary
description: An open source glossary to aid you zero knowledge journey!
sidebar_position: 5
---

This glossary is open source and consistently being updated. If you'd like a term to be added, please [create an issue](https://github.com/ConsenSys/doc.zk-evm/issues) or create a pull request and define one yourself!

## \#

## A

### Arithmetization

Arithmetization is the process of turning computational problems into equations. It can be summarized as turning computer programs into "math," so that they can be analyzed using cryptographic algebraic techniques.

## B

### Blockchain trilemma

The blockchain trilemma is a “pick 2” situation between decentralization, security, and scalability. Between the 3, the Ethereum community has chosen decentralization and security. Sacrificing scalability means increasing gas prices, which jeopardizes the adoption of Ethereum by pricing out users.

## C

### Circuit

A circuit represents a computation using a collection of logic gates. Circuits depict the flow of data and the sequence of operations performed on that data. In a zero-knowledge proof, a circuit is constructed by taking in the statements to be proved and encoding the inputs, outputs, and steps of a transaction. Then, the prover generates a proof, typically by simulating the execution of this circuit, but only reveals whether or not the execution was valid or not. Finally, the verifier uses the circuit representation to verify that the computations performed by the prover are consistent and that the outputs are correct.

### Constraint

A constraint refers to a condition imposed on mathematical operations or computation to ensure the correctness, efficiency, or security of a cryptographic algorithm.

## D

### Data availability

Data availability is the guarantee that the block proposers are required to publish the data for each block, which nodes participating in Ethereum's consensus store locally. This is what powers trustlessness: rather than having to trust that block producers are honest, all nodes on the Ethereum network execute the transactions to verify that the new information is valid. Data availability is one of the ways in which a [L2](#layer-2) differs from a [sidechain](#sidechain).

## E

### Elliptic curve cryptography

[Elliptic curve cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) is a type of public key cryptography, which allows two parties to communicate securely without sharing a secret key. At a high level, an [_elliptic curve_](https://en.wikipedia.org/wiki/Elliptic_curve) is a math equation that has a lot of cool properties that make it useful for constructing zero-knowledge proofs.

### Ethereum Virtual Machine (EVM)

A stack-based virtual machine that executes bytecode. In Ethereum, the execution model specifies how the system state is altered given a series of bytecode instructions and a small tuple of environmental data. This is specified through a formal model of a virtual state machine.

### Execution trace

This is a record of what happened during the execution of a transaction. This is usually represented as a list, in which each item is the state of the machine at a specific clock time, which includes information such as:

- Who was the caller
- Block number
- What contracts were invoked
- What data was changed
- And more!

This is relevant to zk-rollups because execution traces are used to construct the [validity proof](#validity-proof) verified by the verifier contract on Ethereum.

## F

## G

## H

## I

## J

## K

## L

### Layer 1

Layer 1 (L1) is the underlying foundation and base blockchain that various layer 2 (L2) networks build on top of. For example, Ethereum is an L1 that is comprised of node operators to secure and validate the network, block producers, the history of transaction data, and the consensus mechanism of the blockchain itself.

### Layer 2

Layer 2 (L2) is a separate blockchain that increases transaction speed and throughput, while fully or partially deriving its security from Ethereum. Additionally, L2 projects must rely on Ethereum for data availability by posting their transaction data onto Ethereum. L2s decrease L1 congestion by bundling transactions to be submitted to Ethereum, thus increasing scalability while inheriting Ethereum’s data availability, security, and decentralization.

## M

## N

## O

### Oracle

This is a computational entity or service that provides information or answers to specific queries.

### Optimistic rollup

A rollup of transactions that use fraud proofs to offer increased [L2](#layer-2) transaction throughput while using the security provided by Mainnet ([L1](#layer-1)). Unlike Plasma, a similar [L2](#layer-2) solution, optimistic rollups can handle more complex transaction types – anything possible in the EVM. However, in order to release assets back on the L1, users must wait for a 7 day challenge period. Liquidity providers can help alleviate distributing L1 ETH immediately, but this relies on trust in the security of the provider, and does not provide a mechanism for transferring NFTs.

## P

### Polynomial commitment

A polynomial commitment scheme is a cryptographic primitive that allows a party to publicly commit to a value or a piece of information without ever revealing the actual value itself. This allows us to prove that a polynomial satisfies some properties without every revealing what the polynomial is. Additionally, this is useful for zk-rollups because the commitment is smaller than the polynomial itself.

### Polynomial IOP (Interactive Oracle Proof)

An Interactive Oracle Proof (IOP) is a protocols in which the verifier is not required to fully read the prover's messages (the [traces](#execution-trace) and [constraints](#constraint) generated from [arithmetization](#arithmetization)). Instead, the verifier has [oracle](#oracle) access to the prover’s messages. This oracle is repeatedly queried to create the concrete proof system, or [polynomial commitment](#polynomial-commitment) for the [validity proof](#validity-proof).

## Q

## R

### Rollup

A type of [L2](#layer-2) scaling solution that batches multiple transactions and submits them to the Ethereum main chain in a single transaction. This allows for reductions in gas costs and increases in transaction throughput. There are optimistic and zero-knowledge rollups, which use different security methods to offer these scalability gains.

Rollup architecture is made up the following components:

- **Rollup contract**: contract on the L1 stores rollup blocks, monitors state updates on the rollup, and tracks user deposits
- **Off-chain VM**: computation and state storage on another virtual machine separate from the Ethereum Virtual Machine
- **Aggregators/sequencers/operators/validators**: nodes that aggregate transactions, compress the underlying data, and publish the block on Ethereum
- **Verifier contract**: contract on the L1 that verifies the validity proof

## S

### Scaling

The main goal of scalability is to increase transaction speed (faster finality), and transaction throughput (high transactions per second), without sacrificing decentralization or security.

### Sidechain

A scaling solution that uses a separate chain with different, often faster, consensus rules. A bridge is needed to connect these sidechains to Mainnet. Rollups also use sidechains, but they operate in collaboration with Mainnet instead. Sidechains are NOT considered [L2](#layer-2) solutions, because they do not leverage Ethereum for data availability and security.

## T

### Transaction fee

A fee you need to pay whenever you use the Ethereum network. Examples include: sending funds from your wallet, or a dapp interaction, like swapping tokens or buying a collectible. You can think of this like a service charge. This fee will change based on how busy the network is. This is because miners or validators, the people responsible for processing your transaction depending on the network, are likely to prioritize transactions with higher fees – so congestion forces the price up.

## U

## V

### Validity proof

A security model for certain [L2](#layer-2) solutions where, to increase speed, transactions are rolled up into batches and submitted to Ethereum in a single transaction. The transaction computation is done off-chain and then supplied to the main chain with a proof of their validity. This method increases the amount of transactions possible while maintaining security. Some rollups use fraud proofs.

### Verifiable computation

Verifiable computation allows a “weak computer” (Ethereum L1) to offload computation to a potentially untrusted, but “powerful computer” (Linea L2). The “powerful computer” must return a validity proof of the correctness of its results. Verifying the proof is cheaper than performing the computation from scratch.

## W

## X

## Y

## Z

### Zero-knowledge proof

A zero-knowledge proof, or zk-proof, is a cryptographic method that allows an individual to prove that a statement is true without conveying any additional information. This is commonly associated with privacy, but is great for _scaling_ blockchain networks through rollups, because it reduces the amount of information you have to provide to lower layers. This is the validity proof that the “powerful computer” must provide for [verifiable computation](#v).

### Zero-knowledge rollup

This is a [L2 scaling solution](#layer-2) that uses a [zero-knowledge proof](#zero-knowledge-proof) as its [validity proof](#validity-proof) to post data back to Ethereum L1. As compared to [optimistic rollups](#optimistic-rollup), this validity proof allows for a more secure trust assumption and removes the need for a challenge period.

### zkEVM

A zkEVM is a virtual machine that executes smart contracts and proves the correctness of execution using zero-knowledge proofs. ZkEVMs recreate aspects of Ethereum’s design, which provides an “Ethereum-like” experience for developers and users. For Ethereum developers, this means you can write in Solidity, but leverage the zkEVM to perform off-chain computations to offload execution from Ethereum, enabling the scalability provided by zk-rollups!

### zk-SNARK (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge)

This is a type of zk-proof where the prover and verifier don’t have to interact. With zk-SNARKs, you can verify 1 transaction or 1 billion transactions in the same amount of time, which is great for scaling. You can read more about zk-SNARKs [here](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/) and [here](https://docs.gnark.consensys.net/Concepts/zkp).
