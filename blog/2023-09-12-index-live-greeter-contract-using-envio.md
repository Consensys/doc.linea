---
title: Indexing a live Greeter contract using Envio
description: Learn how to index a smart contract deployed on Linea using Envio, a developer-first customizable Indexer
slug: index-greeter-contract-using-envio
authors:
  - name: Sven Muller
    url: https://twitter.com/svenmuller95
hide_table_of_contents: false
date: 2023-09-12
---

Blockchains excel at decentralizing data and continue to revolutionize traditional systems of trust and record-keeping, but data retrieval is often inefficient and majorly time-consuming for developers hampering the overall development experience.

Indexers like Envio allow developers to sift through blockchain data, tidy it up, and store it in a useful intermediary format that is easily accessible. Applications can then use this format for potent queries on indexed data, ensuring scalability and production readiness.

This tutorial will take you through a step by step guide to indexing a Greeter smart contract deployed on Linea using Envio.  

## Background

### [Greeter contract](https://github.com/Float-Capital/hardhat-template)

The Greeter contract is a very simple smart contract that allows a user to write a greeting message on the blockchain.

### [Envio](https://envio.dev)

Envio is a real-time indexer built specifically for EVM-compatible blockchains, providing developers with a seamless and efficient indexing solution. Designed to optimize the user experience, Envio offers automatic code generation and flexible language support. Indexers on Envio can be written in JavaScript, TypeScript or ReScript. Easily aggregate blockchain data into a graphQL query-able database. 

## Prerequisites

### Environment tooling

1. [<ins>Node.js</ins>](https://nodejs.org/en/download/current) we recommend using something like [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm) to install Node
1. [<ins>pnpm</ins>](https://pnpm.io/installation)
1. [<ins>Docker Desktop</ins>](https://www.docker.com/products/docker-desktop/)

### Install Envio
```bash
npm i -g envio
```

## Step by step instructions

### Initialize the project 

Initialize the project using the Greeter template.

Run
```bash
envio init
```

Name your indexer 

```bash
? Name your indexer:
```

Choose the directory where you would like to setup your project (default is the current directory)
```bash
? Set the directory:  (.) .
```

Select to start from a template

```bash
? Would you like to start from a template or migrate from a subgraph?
> "Template"
  "SubgraphMigration"
[↑↓ to move, enter to select, type to filter]

```

Choose `Greeter` when prompted to choose template.

```bash
? Which template would you like to use?
  "Blank"
> "Greeter"
  "Erc20"
[↑↓ to move, enter to select, type to filter]
```

Then choose a language of your choice for the event handlers.

```bash
? Which language would you like to use?
> "Javascript"
  "Typescript"
  "Rescript"
[↑↓ to move, enter to select, type to filter]
```

### Start the indexer

> Dev note: 📢 make sure you have docker open

The following commands will start the docker and create databases for indexed data, make sure to re-run `dev` if you make changes to the files

Run
```bash
envio dev
```

The indexer will then start indexing the contract/s specified in the `config.yaml` file from the `start_block` specified.

### Write to contract on Lineascan

Once the indexer is running, you can call functions on the Greeter contract that is deployed on Linea.

Navigate to the contract on [Lineascan](https://lineascan.build/address/0xdEe21B97AB77a16B4b236F952e586cf8408CF32A#writeContract) and call the `setGreeting` function.


### View the indexed results

You can view the indexed results on a local Hasura server.

```bash
open http://localhost:8080
```

The hasura admin-secret is `testing` and the tables can be viewed in the `data` tab or queried from the playground

---

Check out the full Envio docs [here](https://docs.envio.dev). 

Our engineers are available to help you with your indexing use case and where Envio can provide value. Hop into our [Discord](https://discord.gg/mZHNWgNCAc) or send us an email at hello@envio.dev.

