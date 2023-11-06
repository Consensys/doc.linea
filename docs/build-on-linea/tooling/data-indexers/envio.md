---
title: Envio
---

[Envio](https://envio.dev/) is a customizable, real-time indexing solution that provides developers with a seamless and efficient way to index and aggregate blockchain data. The indexed data is easily accessible through GraphQL queries, providing developers with the flexibility and power to retrieve specific information.

Envio offers native support for Linea (both testnet and mainnet) and has been designed to support high-throughput blockchain applications that rely on real-time data for their business requirements.

Designed to optimize the user experience, Envio offers automatic code generation, flexible language support, quickstart templates, and a reliable cost-effective hosted service.

Indexers on Envio can be written in JavaScript, TypeScript, or ReScript.


## Envio HyperSync 

Envio offers support for [HyperSync](https://docs.envio.dev/docs/hypersync) on Linea mainnet. 

HyperSync is an indexed layer of the Linea blockchain, providing accelerated APIs (JSON-RPC bypass) for the hyper-speed syncing of historic data. Developers do not need to worry about RPC URLs, rate-limited APIs, or managing infrastructure, and can easily sync large datasets in a few minutes, something that would usually take 20x longer via JSON-RPC.  


## Other Features 

- Fully customizable to meet your unique data needs. 

- Aggregate data from multi-chain / cross-chain deployments into a unified GraphQL API (or REST API). 

- Detailed logging and error messaging are provided for effective troubleshooting and debugging.

- Quickstart templates with pre-defined indexing logic for popular OpenZeppelin contracts (ERC-20, ERC-721, ERC1155, etc.)

## Getting Started

The following files are required from the user to run the Envio indexer:

- Configuration (defaults to `config.yaml`)
- GraphQL Schema (defaults to `schema.graphql`)
- Event Handlers (defaults to `src/EventHandlers.*` depending on the language chosen)

These files are auto-generated according to the template and language chosen by running the `envio init` command.

[**Quickstart Guide**](https://docs.envio.dev/docs/quickstart)


```bash
? Would you like to start from a template or migrate from a subgraph?
> "Template"
  "SubgraphMigration"
[↑↓ to move, enter to select, type to filter]

```

Then choose a template out of the possible options

```bash
? Which template would you like to use?
> "Blank"
  "Greeter"
  "ERC-20"
[↑↓ to move, enter to select, type to filter]
```

Then choose a language from **Javascript**, **Typescript**, or **Rescript** to write the event handlers file.

```bash
? Which language would you like to use?
> "Javascript"
  "Typescript"
  "Rescript"
[↑↓ to move, enter to select, type to filter]
```

This will create the config, schema and event handlers files according to the template and language chosen.



## Getting Help

Indexing can be a rollercoaster, especially for more complex use cases. Our engineers are available to help you with your data availability needs.

You can schedule an [intro call](https://calendly.com/sven-float-shipping/envio) to talk about your use case and where Envio can provide value.

Join our growing community of elite builders, and find peace of mind with Envio. 

* [Discord](https://discord.gg/mZHNWgNCAc)
* Email: [hello@envio.dev](mailto:hello@envio.dev)

