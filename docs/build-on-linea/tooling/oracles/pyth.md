---
title: Pyth Network
---

# Pyth Network

Pyth Network is an oracle that publishes financial market data to multiple blockchains. Our market data is contributed by over 80 [first-party publishers](https://pyth.network/publishers), including some of the biggest exchanges and market making firms in the world. We offer price feeds for a number of different asset classes, including [US equities, commodities, and cryptocurrencies](https://pyth.network/price-feeds). Each price feed publishes a [robust aggregate](https://docs.pyth.network/documentation/how-pyth-works/price-aggregation) of publisher prices that updates multiple times per second.

### How Pyth works

Pyth is a protocol that allows market participants to publish pricing information on-chain for others to use. The protocol is an interaction between three parties:

- _Publishers_ submit pricing information to Pyth's oracle program. Pyth has multiple data publishers for every product to improve the accuracy and robustness of the system.
- Pyth's _oracle program_ combines publishers' data to produce a single aggregate price and confidence interval.
- _Consumers_ read the price information produced by the oracle program.

## Pyth on-demand model

Pyth Network uses an pull price update model that is slightly different from other oracles you may be more familiar with. Most oracles today use a push model, where the oracle runs an off-chain process that continuously sends transactions to update an on-chain price. In contrast, Pyth Network does not operate an off-chain process that pushes prices on-chain. Instead, it delegates this work to Pyth Network users.

Pyth price updates are created on [Pythnet](https://docs.pyth.network/documentation/how-pyth-works/pythnet) and streamed off-chain via the Wormhole Network, a cross-chain messaging protocol. These updates are signed such that the Pyth on-chain program can verify their authenticity. Updating the on-chain price is a permissionless operation: anyone can submit a valid Wormhole message to the Pyth contract to update the price. Typically, users of Pyth Network prices will submit a single transaction that simultaneously updates the price and uses it in a downstream application.

On-chain prices can only move forward in time. If a user submits a Wormhole message with a less recent price the Pyth program will not fail but will also not update the price. This in particular means that there's no guarantee that when a user atomically updates the price and then interacts with an application powered by Pyth, the price that the application will read will be equal to the price the user submitted.

You can find an in-depth explanation from one of our contributors, Jayant: [Explaining the Pyth Network Oracle Model: Pyth Tutorials](https://www.youtube.com/watch?v=qdwrs23Qc9g)

Read more about on-demand updates [here](https://docs.pyth.network/documentation/pythnet-price-feeds/on-demand)

## Using price feeds

### Price feed IDs

Each Pyth Network price feed is referred to via a unique id. However, the ids may be represented in different formats (e.g., hex or base58) depending on the blockchain. Price feeds also have different ids in mainnets than testnets or devnets. The full list of price feeds is listed on the [pyth.network website](https://pyth.network/price-feeds). The [price feed ids page](https://pyth.network/developers/price-feed-ids) lists the id of each available price feed on every chain where they are available. To use a price feed on-chain, look up its id using these pages, then store the feed id in your program to use for price feed queries.

## Pyth on EVM (Linea)

On-chain EVM programs can use the [Solidity SDK](https://github.com/pyth-network/pyth-sdk-solidity) to read Pyth prices. The [EVM API reference](https://docs.pyth.network/evm) lets you interactively explore the complete API of the Pyth contract.

The off-chain portion of the application can use [pyth-evm-js](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/js) to generate price update transactions. This repository's [Quickstart](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/js#quickstart) includes an example of both the on- and off-chain code necessary to integrate with Pyth.

### Examples

[Oracle Swap](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/examples/oracle_swap) is an end-to-end example application that uses Pyth Network price feeds. This application is an AMM that allows users to swap two assets at the Pyth-provided exchange rate. The example contains both the contract and a frontend to interact with it.

### Networks

Pyth is currently available on the following Linea networks:

| Network | Contract address |
| --- | --- |
| Linea Mainnet | [`0xA2aa501b19aff244D90cc15a4Cf739D2725B5729`](https://explorer.linea.build/address/0xA2aa501b19aff244D90cc15a4Cf739D2725B5729) |
| Linea Goerli | [`0xA2aa501b19aff244D90cc15a4Cf739D2725B5729`](https://goerli.lineascan.build/address/0xA2aa501b19aff244D90cc15a4Cf739D2725B5729) |

### Price feed IDs

The price feed IDs for EVM chains differs depending on whether they are a mainnet or testnet (see above):

- [List of mainnet ids](https://pyth.network/developers/price-feed-ids#pyth-evm-mainnet)
- [List of testnet ids](https://pyth.network/developers/price-feed-ids#pyth-evm-testnet)

---

## Links

- [Twitter](https://twitter.com/PythNetwork)
- [Discord](https://discord.com/invite/PythNetwork)
- [Website](https://pyth.network/)
- [Docs](https://docs.pyth.network/documentation)
