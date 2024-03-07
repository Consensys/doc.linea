---
description: Run a Linea node.
---

import DocCardList from "@theme/DocCardList";

# Run a Linea node

There are no financial incentives for running a Linea node, but it does allow you to:

- Call the Linea JSON RPC API methods and submit transactions to the mempool without relying on an RPC provider.
- Have a local copy of the Linea blockchain. This view of the state is "trusted" until the transaction, or the
    block that transaction is in, has been finalized on L1.

:::note

Running a sequencer node is currently not possible and there is no option to vote on blocks as part of the consensus
mechanism or [fork-choice](https://eth2book.info/capella/part3/forkchoice/#whats-a-fork-choice) like on Ethereum.

The Ethereum client being used in this walkthrough (Geth) will soon be updated, including breaking changes.

Please get in touch to make sure we keep you posted if you decide to run a node. You can run a Dockerized version as long
as you keep the same parameters.

:::

<DocCardList />
