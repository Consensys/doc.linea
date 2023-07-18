---
title: "Proving: Circuit building"
sidebar_position: 1
---

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
