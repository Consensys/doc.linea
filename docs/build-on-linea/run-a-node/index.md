---
description: Run a Linea node.
---

import DocCardList from "@theme/DocCardList";

# Run a Linea node

There are no financial incentives for running a Linea node, but it does offer the following benefits:

- You can submit transactions to the mempool without relying on an RPC provider.
- You will have a local copy of the Linea blockchain. This view of the state is "trusted" until the transaction, or the
    block that transaction is in, has been finalized on L1.

If you're unfamiliar with how public blockchain networks share the responsibility of keeping common resources secure, check
out [this explainer from MetaMask](https://support.metamask.io/hc/en-us/articles/360015489611-Learn-the-basics-of-blockchains-and-Ethereum-miners-and-validators-gas-cryptocurrencies-and-NFTs-block-explorer-networks-etc-).

:::note

Running a sequencer node is currently not possible and there is no option to vote on blocks as part of the consensus
mechanism or [fork-choice](https://eth2book.info/capella/part3/forkchoice/#whats-a-fork-choice) like on Ethereum.

The Ethereum client being used in this walkthrough (geth) will soon be updated, including breaking changes.

Please get in touch to make sure we keep you posted if you decide to run a node. You can run a Dockerized version as long
as you keep the same parameters.

:::

<DocCardList />
