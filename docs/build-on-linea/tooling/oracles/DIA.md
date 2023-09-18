---
title: DIA Oracles
---

# Introduction to DIA Oracles

## Requesting a custom oracle

[DIA](https://www.diadata.org/) offers **customizable oracles that are tailored to each dApp’s needs**. Each oracle can be customized in several ways, including data sources, data cleansing filters, pricing and computational methodologies, update mechanisms and more. This ensures that the data and oracle remain robust and resilient to the market conditions and provide a global market price as well as specific individual or cross-chain market prices.

By collecting billions of raw trades directly from over **90 sources, including CEXs, DEXs, and NFT marketplaces**, DIA enables full transparency, customization, and control throughout the entire value stack. DIA's data and oracle suite comprise **price feeds for 20,000+ assets** including cryptocurrencies, NFT collections, and liquid-staked tokens, as well as random number generation and other data feed types.

→ [Request a Custom Oracle | DIA Documentation](https://docs.diadata.org/introduction/intro-to-dia-oracles/request-an-oracle)

# 🪙 Token Price Feeds

DIA token price feeds provide smart contracts with real-time price information for [3,000+ cryptocurrencies](https://diadata.org/app/price), sourced transparently from [90+ trusted, high-volume DEXs and CEXs](https://diadata.org/app/source/defi).

## How to access DIA oracles?

Here is an example of how to access a price value on DIA oracles:

1. Access your custom oracle smart contract on Linea.
2. Call `getValue(pair_name)` with `pair_name` being the full pair name such as `BTC/USD`. You can use the "Read" section on the explorer to execute this call.
3. The response of the call contains two values:
- The current asset price in USD with a fix-comma notation of 8 decimals.
- The UNIX timestamp of the last oracle update.

You can find DIA's oracle integration samples in Solidity and Vyper languages by visiting:

→ [Access the Oracle | DIA Documentation](https://docs.diadata.org/products/token-price-feeds/access-the-oracle)

## Linea demo price oracles

DIA has deployed the following demo oracles for the Linea community. It provides a limited selection of cryptocurrency price feeds with predefined configuration settings.

> ⚠️ NOTE: DIA demo oracles are not intended for use in production environments. Developers can request a dedicated, production-ready oracle with custom price feeds and configuration settings. Start the request process: [Request a Custom Oracle | DIA Documentation](https://docs.diadata.org/introduction/intro-to-dia-oracles/request-an-oracle)

### Demo Oracle Smart Contracts

| Network        | Contract address      
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Linea Mainnet  | [`0xbb5a4708302ee9d959abc417ca1280abb106ba6a`](https://lineascan.build/address/0xbb5a4708302ee9d959abc417ca1280abb106ba6a)        |

### Included Price Feeds

[DIA/USD](https://diadata.org/app/price/asset/Ethereum/0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419/), [BTC/USD](https://diadata.org/app/price/asset/Bitcoin/0x0000000000000000000000000000000000000000/), [USDC/USD](https://diadata.org/app/price/asset/Ethereum/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/)

## Supported token API endpoints

DIA also supports API and GraphQL endpoints to return cryptocurrency price data. You can [visit the DIA Documentation](https://docs.diadata.org/products/token-price-feeds/access-api-endpoints) to see all API endpoints.

# 🎨 NFT Floor Price Feeds

DIA NFT floor price feeds provide smart contracts with real-time price information of [18,000+ NFT collections](https://diadata.org/app/floor-price), sourced on-chain with 100% transparency from [multiple, cross-chain NFT marketplaces](https://diadata.org/app/source/nft).

## Supported NFT API endpoints

DIA also supports API endpoints to return cryptocurrency price data. Developers can directly access the example endpoints listed below or [visit the DIA Documentation](https://docs.diadata.org/products/nft-floor-price-feeds/access-api-endpoints) to see all API endpoints.


# Learn more about DIA

- [Twitter](https://twitter.com/DIAdata_org)
- [Discord](https://discord.gg/dia-dao)
- [Website](https://diadata.org/)
- [Docs](https://docs.diadata.org/)
- [Explore data](https://www.diadata.org/app/)
  
