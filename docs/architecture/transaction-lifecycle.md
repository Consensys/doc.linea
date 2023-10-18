---
title: Transaction lifecycle
sidebar_position: 8
---

Transactions on Linea mainnet and testnet proceed through the following steps:

## Step 1: Submission

This is where every transaction originates: at the wallet level, a user signs a transaction and broadcasts it to Linea. From here, transactions head straight to the **mempool**, similarly to Ethereum, where they become pending transactions.

## Step 2: Block building

The Linea [sequencer](./sequencer) is responsible for order, building, and executing blocks. For each transaction added to the mempool, the sequencer checks its validity, rejecting transactions as necessary. Transaction validity conditions are specific to Linea, and differ slightly from those on other networks, including Ethereum.

:::info

A transaction is rejected if it:

- Originates from a non-existent account, or an account that is not funded
- Has a gas price below the minimum
- Has a gas limit above the maximum
- Has the same nonce as another transaction from the same account (in this case, the transaction with the higher gas fee is chosen, and the other rejected)
- Has a total call data size greater than 25kb.

:::

The sequencer decides on the order in which transactions should be executed. So, having passed the above checks, valid transactions are placed into blocks in the correct sequence and executed.

At this point, the transaction's lifecycle is more or less complete — at least from a user perspective. However, the transaction and its associated data will continue to be processed, in order to generate ZK proofs. Let's press on.

## Step 3: Transaction data sent to the state manager


Data about the transaction and the state of the network at its time of execution are recorded in **traces**, an output of part of the sequencer called the [traces generator](/docs/architecture/sequencer/traces-generator.md).  

Traces are passed to the state manager block-by-block and then used to update the network state. Once state is up to date, you'll see the transaction reflected in your wallet.

## Step 4: Conflation

The transaction's block will then be subject to [conflation](/docs/architecture/sequencer/conflation.md), which combines two or more blocks' transaction data into a single data set (batch) that forms part of the package of data passed on to Ethereum. Amongst Ethereum's layer 2 networks, Linea is the only network that uses batch conflation.

## Step 5: Generating a ZK proof using transaction data

With the block that contains the transaction's trace data conflated into a batch with one or more others, the only remaining task on the checklist to achieve transaction finality is to use the transaction's data—as contained in its trace—and use it to generate a proof.

When prompted by the [Coordinator](./coordinator), Linea's [prover](./trace-expansion-proving) will first **expand** the trace, preparing it for inclusion in the proof. Next, the Consensys-maintained library [`gnark`](https://docs.gnark.consensys.net/) is used to create what's known as a zk-SNARK using the trace data. zk-SNARKs are the proofs that are eventually submitted to Ethereum.

Since the trace data of _every_ transaction in _every_ block feeds into producing the final proof, the single transaction we started with remains vital to Linea's function, well beyond the point at which it is executed (in step 3).

## Step 6: Submitting the transaction to Ethereum

This subtitle is a little misleading, in the sense that the transaction itself isn't submitted to the layer 1 network, Ethereum. Rather, a _proof_ of the credibility of a batch of (conflated) blocks is submitted to L1; but since the conflated blocks are comprised of transactions, our transaction is involved in this process as well.

Once the proof is accepted by Ethereum, it becomes immutable history, and the transaction's lifecycle is complete.
