---
title: Traces generation
sidebar_position: 1
image: /img/socialCards/traces-generation.jpg
---

### Traces Generator

#### What is it?

The part of Linea’s sequencer responsible for generating the data used by the
prover to create ZK proofs, and for making them as compact as possible.

#### What does it do?

The traces generator executes blocks that have been built by the sequencer, and
preserves data relating to the traces of each transaction.

#### How does it do it?

Once the sequencer has built its blocks, they are executed; and in the process,
the EVM produces data known as _traces_. These traces specify the state of the
network, and the state of the accounts involved in the transaction, at each
granular step of each transaction’s execution. This is the Infinite
Improbability Drive at the heart of Linea and its zero-knowledge technology:
these traces are the very data that the prover will use to produce a proof. That
proof allows Ethereum to know that everything that occurs on Linea truly did
occur–without actually knowing any of it.

Linea's sequencer puts these traces through an additional process: **trace
conflation.**
