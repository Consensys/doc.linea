---
title: Overview
sidebar_position: 1
image: /img/socialCards/overview.jpg
---

[Goldsky](https://goldsky.com) is a high-performance data indexing provider for Linea that makes it easy to extract, transform, and load on-chain data to power both application and analytics use cases. Goldsky offers two primary approaches to indexing and accessing blockchain data: Index (high-performance subgraphs) and Mirror (real-time data replication pipelines).

## Index (high-performance subgraphs)

[Index](./goldsky-index.md) is a high-performance hosted subgraph solution with native support for Linea (both testnet and mainnet). Subgraphs allow you to define a data schema and how blockchain data should be indexed for querying, and can be deployed to Goldsky directly from the command line. If you’ve built with subgraphs in the past, you can work with Goldsky’s hosted service with no change to your development flow, and take advantage of several key benefits:

- **Cross-chain**: Native cross-chain and multi-chain support to query data from multiple blockchains from a single endpoint, automatically managing event order, re-orgs, and other complexities.
- **RPC proxy**: [Goldsky](https://goldsky.com) intelligently balances load and manages RPC provider failures across 20+ endpoints, maximizing indexing speed and querying reliability.
- **Robust dev tooling**: Webhooks, version control, data source tags, instant subgraphs without writing a line of code, and other goodies to make indexing data easier.
- **White-glove support**: With custom SLAs and support scopes, Goldsky’s support team is available 24/7 to customize your indexing and query server for your specific use case, and to help if things go wrong.

## Mirror (data replication pipelines)

[Mirror](./goldsky-mirror.md) is a real-time data replication system that allows you to keep blockchain data where your app is. Mirror pipelines instruct [Goldsky](https://goldsky.com) on where to take data from, how to (optionally) process it, and where to persist the results. Compared to subgraphs, Mirror pipelines differ in a few key ways:

- **Self-hosted**: Results are persisted in a database or as flat files rather than being served only via a remotely-hosted API. This allows for seamless colocation of indexed data alongside your app and (private) user data.
- **Self-healing**: Mirror pipelines benefit from the wisdom of the crowd - quality checks, fixes, and improvements to the data are applied automatically through upserts and deletes directly in your database.
- **Scalable**: You can index data from multiple sources (and push it to multiple sinks, and with transformations) in parallel, and with infinite horizontal scaling, allowing you to complete historical backfills in record speed.
- **Simple**: Mirror pipelines can be defined and executed entirely through a 5-step interactive CLI, or with simple JSON configuration files and some SQL for more flexibility.

## Getting started

To get started, visit the quickstart pages for [Index](./goldsky-index.md) and [Mirror](./goldsky-mirror.md) on Linea, or visit the complete Goldsky documentation [here](https://docs.goldsky.com).
