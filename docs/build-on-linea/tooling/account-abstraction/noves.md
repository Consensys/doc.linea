---
title: Noves
---

## Advanced data tooling for account abstraction

Noves provides advanced data capabilities for ERC-4337, both at the pre-sign level and for retrieval and interpretation of historical transactions.

## Human-readable transaction pre-sign

For pre-sign, Noves offers a `userOp` [preview tool](https://docs.noves.fi/reference/post_evm-chain-preview4337) as part of its Foresight product line. It is akin to a simulator, but includes interpretation of the real-world meaning of the unsigned transaction (for example, "This transaction will claim 50 USDC in rewards"). This output can be shown to the user prior to the userOp being signed and submitted to the bundler for execution.

## Human-readable transaction history

For transactions that have already been executed, Noves offers the [Translate API](https://docs.noves.fi/reference/introduction), which allows developers to retrieve transactions in fully-enriched, human-readable form. For a sample of what this data looks like, you can check out [Linea for Humans](https://linea.forhumans.app), a human-readable block explorer built by Noves for Linea.

Translate API is [fully compatible](https://docs.noves.fi/reference/account-abstraction) with account abstraction, and will "look through" the multiple layers of smart contracts that are involved, removing unnecessary technical jargon from the picture and telling the user in plain English what each transaction was (a stake, a claim rewards, a liquidity add, etc).

## Learn more

Find out more about Noves: [noves.fi](https://noves.fi)

Product docs: [docs.noves.fi](https://docs.noves.fi)

## Start using for free

A free plan is available for Linea users, click [here](https://noves.fi/pricing) to sign up.
