---
title: "Proving: Circuit execution and runtime"
sidebar_position: 2
image: /img/socialCards/proving-circuit-execution-and-runtime.jpg
---

### gnark zk-snarks

#### What is it?

In Linea, gnark is the final part of the prover. It is also standalone software which can be used in other projects to create cryptographic circuits.

#### What does it do?

Similarly to Corset, gnark has two functions: it prepares a set of “circuits”, another way of referring to a constraint system, of the kind that will create a zk-SNARK proof that can be verified in an L1 Ethereum environment. It also, in fact, _makes_ those proofs.

#### How does it do it?

gnark’s codebase is divided into two separate APIs: a [frontend](https://pkg.go.dev/github.com/consensys/gnark/frontend) and a [backend](https://pkg.go.dev/github.com/consensys/gnark/backend). The methods in gnark’s frontend API allow developers to do the first part, creating cryptographic circuits. In other words, gnark translates Corset’s precompiled Go constraint system into a final set of “circuits”, or constraints, which will ultimately produce the SNARK proof that is submitted to the L1 network. The methods in the backend API are used at runtime to consume data through the proving system created previously in the frontend, producing as a result a proof. That is, gnark accepts the “expanded” trace data for each block or set of blocks from Corset, and processes it through its prepared circuits. At this point, we have what we’ve been out here amongst the stars searching for: a fresh set of transactions, executed in an EVM environment, provably real and correct, ready to dispatch to the L1. So, what does the prover do with it? Send it back to the Coordinator, that’s what.
