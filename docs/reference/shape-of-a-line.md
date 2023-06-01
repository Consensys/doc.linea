---
title: Architecture of Linea
description: An overview of how Linea works
sidebar_position: 2
---

# The Shape of a Line: Linea's Architecture

## Linea's ideal state

Linea has the goal of being a fully decentralized, permissionless network. To that end, we are building towards an architecture made up of three main elements:

- Sequencer
- Prover
- Bridge Relayer

(Don't worry, if this isn't making sense to you yet, we'll explain further below 😎)

## Current state

As Linea is still a beta testnet, and there's lots of development to be done, we're not quite there yet. Currently, the first two sections above are kind of rolled into one:

- Centralized Sequencer & Prover
- Bridge Relayer

## First of all: what _is_ Linea, anyway? What's a zkEVM L2?

There are a number of different mental models that people in web3 use to explain these different networks and how they relate to one another. Some people prefer to call them "rollup networks", or "scaling solutions"; probably the most popular way of discussing them is by imagining them as "layers", where one network is "built on top of another". Let's try and set metaphor aside for a moment, and speak in clear terms:

> The Ethereum network has several functional areas:

- It has the _blockchain_, where it keeps track of addresses, and which tokens are allocated to which addresses.
- It has the _consensus_ mechanism, wherein many many nodes communicate about the movement of tokens from one address to another, and each keeps their local copy of the ledger up to date.
- And it has the _execution environment_, wherein computer programs can be run. That's the "EVM", or "Ethereum Virtual Machine", part of things.
  >

These three areas are heavily interconnected, and this is a simplification, but it's a helpful one to understand what's going on with other networks.

Ethereum prioritizes security: that consensus mechanism is designed to ensure that no one can singlehandedly alter the state of the network. This is a very impressive feat of engineering, and it comes with a tradeoff: the execution environment is highly limited in the amount of work it can do, because the consensus mechanism intentionally runs slowly, to keep everything safe.

Linea, and other networks like it, is designed to participate in the security mechanism of Ethereum, while optimizing for execution. In other words, it allows people to do lots of transactions, run lots of programs, deploy contracts, mint NFTs, absolutely go to town--fast, and cheap--and then report all that back to Ethereum, and include it in Ethereum's blockchain. By sending regular reports of activity on Linea to Ethereum, the network can optimize for execution without being as limited by security.

This is the action known as "rolling up": we would say that Linea "rolls up its transactions to Ethereum". And the fact that it relies on Ethereum for something--the security--leads people to say that it's "built on top of Ethereum": it's a "second-layer network", an L2. And before you ask, yes, Ethereum is an L1, and L3s exist, too: networks that roll up to Linea would roll up to Ethereum...

The trick is in how that _rollup_ happens. Linea is special: it uses cutting-edge developments in a branch of mathematics and computer science often referred to as **zero-knowledge**, or _zero-knowledge cryptography_, to **prove to the Ethereum network that everything that is happening on the Linea network is, in fact, happening, without having to submit a complete record of every last transaction and check each one.** That's the 'zk' part.

So, now that we've walked through some concepts, we can roll it all up: **Linea is a zkEVM L2 network**.

### OK... But what's a _sequencer_ and a _prover_? How does all this actually work?

At a high level, if you were to follow a flow from Ethereum, through Linea, and back to Ethereum, it would go like this:

>

#### Ethereum bridge contract >

#### Linea bridge contract >

#### Coordinator >

#### Sequencer (Block building > Execution > Trace data generation) >

#### Coordinator >

#### Trace Conflation >

#### EVM State Manager >

#### Trace Expansion and Proving (Corset > gnark) >

#### Coordinator >

#### zk-proof and updated Merkle tree >

#### Linea bridge contract >

#### Ethereum bridge contract >

#### Ethereum blockchain

>

_...in other words, there's a lot involved. _

### Simplifying things

In order to make this explanation as clear and navigable as possible, we'll break each component down, and explain it in three steps:

>

#### What is it?

#### What does it do?

#### How does it do it?

>

Let's start with the thing that a lot of users encounter when trying to access an L2 for the first time: **a bridge**.

There are a lot of data to pass back and forth between Linea and other networks, and therefore, Linea has more than one bridge; and that number is likely to continue to grow. Here are some that have been built so far:

## The Linea Consensus Bridge

## The Coordinator

### What is it?

The Coordinator is Linea’s Coordination Module across a number of functions. It is also the channel through which information on the state of Ethereum comes into Linea, and through which information on the state of Linea returns to Ethereum.

### What does it do?

The Coordinator moves information internally, between different parts of Linea’s execution client, and externally, with other blockchains, Linea’s data availability stack, and the nodes syncing its own network state. In this way, **the Coordinator is Linea’s consensus client.**

### How does it do it?

It does these things through a highly modularized internal architecture. These various systems and requirements are broken out into their own environments, each one receiving input from the Coordinator, and returning the corresponding output back to it.

## The sequencer

### What is it?

The sequencer is the heart of Linea’s execution client, responsible for **ordering, building, and executing blocks** in a way that allows the subsequent zero-knowledge proof to be made.

### What does it do?

The sequencer does a number of things: - Determines the order–the _sequence_–in which transactions will be executed - Builds blocks from them - Executes those blocks - Prepares certain data relating to the _traces_ of that execution for the zero-knowledge prover.

### How does it do it?

Currently, Linea’s execution client is zkGeth, a version of geth that has been modified to work with zk-proving technology. However, Linea is building **zkBesu**: leveraging the full power of the ConsenSys stack by using a custom-built, modified version of the Besu client. Just as many other L2s have modified L1 Ethereum clients, zkBesu will help the Linea team ensure compatibility, stability, ease of maintenance in their client, and of course helps them get their network launched much faster than building from scratch.

Linea's sequencer takes transactions from the Linea memory pool, and builds them into blocks, just like Besu does on mainnet Ethereum. However, on Linea, it also does a bit of extra work, and communication, with the Coordinator, to ensure that blocks are made in such a way that they can be proven by the zero-knowledge prover, and that they are as compact as possible–doubly important in a situation where all data has to be written in tiny, costly pieces on Ethereum Mainnet. This is done specifically by subsystems within the Sequencer: the Traces Generator and Conflator.

### Traces Generator

#### What is it?

The part of Linea’s sequencer responsible for generating the data used by the prover to create ZK proofs, and for making them as compact as possible.

#### What does it do?

- It executes blocks that have been built by the sequencer, and preserves data relating to the traces of each transaction.
- It also receives and carries out instructions from the Coordinator to _conflate_ multiple blocks into one set of data, for subsequent consumption by the prover and publication as rollup data on Ethereum.

#### How does it do it?

As the sequencer executes the blocks it’s built, the EVM produces data known as _traces_. These traces specify the state of the network, and the state of the accounts involved in the transaction, at each granular step of each transaction’s execution. This is the Infinite Improbability Drive at the heart of Linea and its zero-knowledge technology: these traces are the very data that the prover will use to produce a proof. That proof allows Ethereum to know that everything that occurs on Linea truly did occur–without actually knowing any of it.

Linea's sequencer puts these traces through an additional process: **trace conflation.**

## Conflation

### What is it?

Conflation is the process of taking two or more blocks’ worth of transactions and combining them into one data set, which can then be used to produce a ‘before and after’ map of the network state (a Merkle tree, in technical terms) as well as a zero-knowledge proof, which is published to Ethereum.

### What does it do?

Conflation is not normally seen in mainnet Ethereum environments, where transaction data must be published in discrete blocks, one by one in order, before the next block can be published. In a zkEVM environment, the ‘source of truth’ from Ethereum’s perspective is the data submitted to it: the ZK proof, the list of transactions proved by it, and the Merkle tree. That means that it’s not a question of “how many transactions fit in a block”, but “how many transactions fit in a proof”. By conflating multiple blocks into one, Linea's proving system becomes much more efficient.

### How does it do it?

Conflation occurs within the execution client, but through a process of communication with the Coordinator:

- The conflator waits for a traces file to appear
- Marks that blocks' worth of traces as "merged"
- Waits a certain amount of time in case more block data comes in
  - If it does, it checks to see if the number of lines in the block and the length of the data would exceed the limit
    - If it's within the limit, the conflator marks it as merged as well

The conflator continues this cycle, until the time limit is reached, at which point it passes the conflated trace data back to the Coordinator, for subsequent Merkle tree and proof generation.

## EVM State Manager

### What is it?

The part of the execution client responsible for updating the state of the network globally, and the state of every account individually.

### What does it do?

Receives blocks that have been executed by the sequencer, and uses the trace data from their execution to update the state of the network. It then passes this updated network state information to the prover, for subsequent submission to Ethereum

### How does it do it?

Through the Promethean power of cryptography and the careful stewardship of Merkle trees 😝

The state of every account in the zkEVM is represented by a hash: a unique, encrypted and brief identifier. Because of the way hashes work, any change in the state of an account will result in a changed, but still unique and encrypted, hash.

The relationship between accounts–which accounts control which ones, for example–is represented by a tree structure. The way a small twig is derived from a larger branch, and that from a trunk: in this way, the entire bifurcating, iterative history of the network state is retained.

zkBesu uses a particular version of this technology called a Sparse Merkle Tree: it uses default values to represent certain levels of branching in the tree–and if there has been no change to that default value, it means there has been no activity “further out the branch”, and therefore no need to store data regarding it. This allows the network to be much more efficient, at the level of data storage and other improvements based on that, than other implementations of Merkle trees.

The state manager in zkBesu is relatively simple, and has two main functions: updating the state of the network, and proof generation.

- The sequencer executes a block, and sends it not only to the trace generator for it to do its job, but also to the state manager. Upon receiving an executed block from the sequencer, the state manager updates the state, in the Merkle tree, of every account that was affected, as documented in the trace data.
- The new values, represented by new hashes, are now the state of the network following that block.
- This new network state is necessary to generate a proof for submission to Ethereum. Therefore, the state manager passes the information off to the prover.

## Trace Expansion and Proving

### What is it?

The module responsible for generating the final set of data for a zero-knowledge proof, and producing that proof.

### What does it do?

It receives several sets of information from the Coordinator and zkBesu, and produces a succinct, non-interactive argument of knowledge, or **zkSNARK**.

### How does it do it?

There are multiple operations involved; the first part of this module is Corset. Corset takes in conflated trace data from the Coordinator, and prepares it for the second part, gnark. gnark takes in that prepared, or "expanded", trace data, and uses it to produce a proof of the type that can be submitted to Ethereum.

### Corset

#### What is it?

Corset is the first of two parts of the component of Linea’s architecture generally referred to as “the prover”.

#### What does it do?

Corset takes the traces, expands them, and prepares them for the prover.

#### How does it do it?

Corset performs its duties through two different paths:

First, every time Linea’s overall codebase and implementation of the zk-EVM is updated, Corset creates a _constraint system_. This is a term you may hear often in zk-land. A constraint, in this context, refers to a kind of test you can run on something, to make sure it’s the way it’s supposed to be. An entire constraint system allows you to define a whole set of rules, or checks, which must be fulfilled. Since the goal of Zero Knowledge technology is to _prove_ something, you can probably see where this is going: a constraint system allows you to, using math, prove that underlying conditions are a certain way, without revealing those underlying conditions.

Corset–which is written in Rust–uses a Domain-Specific Language, or DSL, written in Lisp, to create a constraint system specifically designed for Linea’s zk-EVM environment. This system, once built, is compiled into the Go programming language. This constraint system, which is optimized for Linea’s architecture, becomes the input for gnark, which converts it to the type of constraint system that would produce **a zk-SNARK**–the kind you would, you know, send to a smart contract on Ethereum mainnet to prove that everything on your L2 is the way you say it is.

**Second** (it’s OK to take a deep breath here), Corset helps process data with _every block that’s submitted_. The trace data, generated in every block, will have to go into gnark’s implementation of Corset’s compiled constraint system, in order to produce the final proof. And because of the way Corset, and the Lisp part of it specifically, processes trace data, Corset can prepare that trace data for gnark. This process is called “trace expansion”, because it refers to taking matrices of data, and deriving certain sets of them from others–so that they can be more accurately processed by gnark.

In these two modes, then–once at build time, when Corset makes the constraint system and compiles it to Go, and at the runtime of every block, when Corset takes traces and expands them into a format that will work well with gnark’s implementation of Corset’s original constraint system, Corset is the bespoke data preparation system for gnark, which is the final executor of Linea’s proving system.

### gnark zk-snarks

#### What is it?

In Linea, gnark is the final part of the prover. It is also standalone software which can be used in other projects to create cryptographic circuits.

#### What does it do?

Similarly to Corset, gnark has two functions: it prepares a set of “circuits”, another way of referring to a constraint system, of the kind that will create a **zk-SNARK proof **that can be verified in an L1 Ethereum environment. It also, in fact, _makes_ those proofs.

#### How does it do it?

gnark’s codebase is divided into two separate APIs: a [frontend](https://pkg.go.dev/github.com/consensys/gnark/frontend) and a [backend](https://pkg.go.dev/github.com/consensys/gnark/backend). The methods in gnark’s frontend API allow developers to do the first part, creating cryptographic circuits. In other words, gnark translates Corset’s precompiled Go constraint system into a final set of “circuits”, or constraints, which will ultimately produce the SNARK proof that is submitted to the L1 network. The methods in the backend API are used at runtime to consume data through the proving system created previously in the frontend, producing as a result a proof. That is, gnark accepts the “expanded” trace data for each block or set of blocks from Corset, and processes it through its prepared circuits. At this point, we have what we’ve been out here amongst the stars searching for: a fresh set of transactions, executed in an EVM environment, provably real and correct, ready to dispatch to the L1. So, what does the prover do with it? Send it back to the Coordinator, that’s what.

## Submission to L1

Now that the Coordinator has all it needs to update Ethereum--the current state of the network, as represented by the Merkle tree, and the proof that all the transactions occurred, in the proof, it can submit them in a transaction to the smart contract on Linea that will, in turn, trigger the process to pass the data off to the Ethereum network, where a corresponding transaction is submitted to the Ethereum "end of the bridge". The zk-proof can then be used to satisfy Ethereum that Linea's state is correct and valid.

## Other Functions: Network Data

### What is it?

One of the main value propositions of a public blockchain network is that it be, well, _public_. This means that the information about what’s going on the network needs to be readily available. Networks like Ethereum have this more or less built in and available as part of the software: each node has an API that will return any information you ask for; if you have a lot of requests, well, you just need more nodes.

To be clear, that’s how Linea works too–it’s just that Ethereum is decentralized and open; anyone can run a node. Linea is still a testnet, and its nodes are only being run by teams at ConsenSys. Therefore, in order to provide for the massive interest that the network has generated, a lot of nodes have to be run. This allows dapps to ask for information about the state of the network without impeding the actual execution of transactions by overloading the client.

### What does it do?

Receives and responds to requests from users and dapps according to the Ethereum JSON-RPC API standard. This includes providing information to MetaMask users about their accounts on Linea.

### How does it do it?

By leveraging the expertise and resources of Infura, ConsenSys, and the Ethereum ecosystem as a whole 😀 Infura is running a number of nodes to provide this service, in two main capacities:

#### Client-facing RPC-API nodes

- These nodes do the “traditional” work of EVM nodes: on the one hand, they are receiving updated network state information from the sequencer and state manager, and providing information about that state to users and dapps when they request it. On the other, they are receiving incoming transactions.
- All that traffic means that Infura is running them behind a load balancer, and bringing their expertise in scaling blockchain networks across the operation. Those transactions submitted by users are therefore balanced across the nodes, and are thereby routed into the memory pool, for subsequent ingestion and processing by the Coordinator and sequencer in zkBesu.

#### Archive Nodes

- There are more and more dapps and research activities being performed not just on current transaction data, but historical data as well–whether from a day ago, last month, or three years ago (though not that long on Linea, yet!).
- This type of data request can be quite resource-intensive, and could put the live network nodes at risk of having their performance impacted, and thus threaten the overall health of the network. For this reason, Infura also has deployed archive nodes in a scalable architecture; these kinds of transactions aren’t being run _all_ the time, after all–but when they are, more nodes are spun up as needed to keep up with demand.
