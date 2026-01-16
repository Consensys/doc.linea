---
title: RPC services
sidebar_position: 5
description: >-
  JSON-RPC services exposed by Linea nodes, enabling access to near-head state
  and full historical blockchain data.
image: /img/socialCards/rpc-services.jpg
---

## What is it?

RPC services expose JSON-RPC APIs to applications and users. RPC nodes can be optimized for near-head
access or configured as archive nodes for historical queries.

Most end users use their [wallet](../../../network/how-to/connect-wallet.mdx) as a user interface to
interact with the public blockchain through an RPC service.
Most developers use [public RPC services](../../../network/tools/node-providers/index.mdx), or
[run their own RPC node](../../../network/how-to/run-a-node/index.mdx).

## What does it do?

RPC services provide the JSON-RPC interfaces that applications and users rely on to access Linea
data. RPC nodes may be deployed behind load balancers and access controls (RBAC).

## How does it do it?

RPC services are provided by RPC nodes. Operators decide whether to optimize nodes for near-head
access or for archive queries depending on how the network is intended to be used.

## Node types

### Near-head nodes

A near-head node maintains a replicated view of the blockchain focused on the canonical head and
its recent history. They continuously ingest new blocks and state updates from the protocol,
ensuring that its local state remains closely synchronized with the latest finalized and
near-finalized data. The service is optimized for low-latency access to recent blocks and current
state, and for high-throughput transaction propagation toward the rest of the system. It is
designed to support latency-sensitive operations on near-tip state, rather than long-range
historical reconstruction or analysis.

### Archive nodes

An archive node maintains a complete, durable record of the blockchain from genesis, including all
blocks and associated state transitions. Unlike a near-head node, it retains a full historical
state, enabling exact reconstruction of the chain state at any past block height. This service is
optimized for correctness and completeness of historical data rather than minimal latency, and is
provisioned with higher storage capacity and different performance characteristics. Its role in
the architecture is to provide a source of truth for the historical state, supporting downstream
functions such as auditing, forensics, analytics, and historical consistency checks.

#### Data availability

How data availability (DA) is handled depends on the [deployment model](../../stack/how-it-works/deployment-models) of the Network. Another blockchain may provide DA, operators may run nodes specifically for DA, or they may leverage third-party DA providers.

DA is crucial in preserving and providing access to transaction data required to reconstruct the state of the Linea Network. While zk-SNARK proofs ensure the correctness of state transitions, DA nodes guarantee that the transaction data underlying these proofs remains accessible to anyone who wants to verify or reconstruct the historical state.

## Why run your own RPC?

While public RPC endpoints are convenient for development and light usage, running your own RPC node gives operators stronger guarantees and greater control over how they interact with Linea. 

For quick experimentation, testing, or low-volume usage, public RPC services may be sufficient. As usage grows or requirements around reliability, trust, or data access become stricter, running a dedicated RPC node becomes increasingly valuable.

### Reliability and availability

Public RPC services are shared infrastructure and may enforce rate limits, request prioritization, or maintenance windows outside your control. Operating your own RPC allows you to size resources, tune performance, and manage uptime according to your application’s needs.

### Performance and latency

A self-hosted RPC node can be optimized for your specific workload—whether low-latency access to near-head state or high-throughput historical queries. This avoids contention with other users and can significantly reduce response times for latency-sensitive applications.

### Trust and correctness

When using a public RPC, applications implicitly trust a third party to serve accurate and complete data. Running your own RPC allows you to validate chain data directly from the protocol, reducing reliance on external operators and improving assurance around data integrity.

### Access to historical data

Public RPC endpoints often restrict access to archive data due to storage and cost constraints. Operating your own archive node enables unrestricted historical queries, supporting use cases such as analytics, auditing, and forensics.

### Operational control and security

Self-hosted RPC nodes can be deployed behind private networks, load balancers, and access controls (RBAC). This is especially important for backend services, indexers, and internal tooling that require predictable access patterns and tighter security boundaries.

## Next steps

For operational deployment details, see the [Linea Stack architecture](../../../stack/how-it-works/architecture.mdx).
