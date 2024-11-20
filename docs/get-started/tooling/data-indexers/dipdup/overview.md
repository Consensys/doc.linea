---
title: Overview
sidebar_position: 1
image: /img/socialCards/overview.jpg
---

[DipDup](https://dipdup.io/) is a Python framework for building smart contract indexers. It helps developers focus on business logic instead of writing a boilerplate to store and serve data. DipDup-based indexers are selective, which means only required data is requested. This approach allows to achieve faster indexing times and decreased load on underlying APIs.

## Understanding DipDup
DipDup is a software framework that helps web3 developers create selective indexers for decentralized applications. It uses blockchain data provided by various off-chain data sources. Some of the key features of DipDup include:

- **Ready For Multichain**: DipDup supports dozens of blockchains, and we are constantly adding new ones. You can easily reuse your business logic for different networks or even index multiple chains in a single project.
- **Declarative Configuration**: A whole indexer is defined by a single configuration file and a bunch of Python data handlers. Code is completely separated from the configuration and environment variables, making it easy to maintain and deploy your project.
- **Lots of Integrations**: You can use SQLite, PostgreSQL, or TimescaleDB databases to store blockchain data, deploy to Compose or Swarm with a single command, monitor your indexer with Prometheus or Sentry, and more.
- **Magic GraphQL API**: DipDup automatically generates a GraphQL API for your data using Hasura, so you can easily query it from your frontend or other services. You can easily extend API with custom queries and metadata requests.
- **Powerful CLI**: DipDup CLI has everything you need to manage your project, from creating a new one to running and deploying. And it's very convenient. There are lots of templates for various blockchains and use cases, so you can start quickly.

## Explore DipDup
To learn more about DipDup features, visit the [official DipDup documentation](https://dipdup.io/docs). It offers an in-depth explanation of the framework concepts, lots of examples from basic to the most advanced, allowing rapid and efficient development of blockchain data indexers of any complexity.
