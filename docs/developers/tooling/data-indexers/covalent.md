---
title: Covalent
image: /img/socialCards/covalent.jpg
---

# Covalent

[Covalent](https://www.covalenthq.com/?utm_source=linea&utm_medium=partner-docs) is a structured 
data infrastructure provider with access to historical and current onchain data for [200+ supported 
blockchains](https://www.covalenthq.com/docs/networks/?utm_source=linea&utm_medium=partner-docs), 
including Linea mainnet and Sepolia testnet.

Covalent maintains a full replica of every supported blockchain, meaning you have access to:

- Every wallet's token balances
- Full transaction histories
- Every contract log event
- All NFTs including assets and metadata

**Use Covalent if you need:**

- Wallet, Transactions, NFT, DEX, Staking or core blockchain data (log events, blocks)
- Normalized, aggregated and enhanced multichain data, well beyond what you get from RPC providers
- Enterprise-grade performance

> [Sign up to start building on Linea](https://www.covalenthq.com/platform/?utm_source=linea&utm_medium=partner-docs)

## APIs

The Covalent APIs enable developers to quickly and easily access structured onchain data. This 
means consistent response schemas regardless of the blockchain. Available APIs and corresponding 
use cases include:

### Wallet API

- **Features:** All token balances (ERC20, 721, 1155, native), token transfers and prices (spot and 
historical) for a wallet.
- **Use cases:** [Wallets, portfolio trackers](https://goldrush-wallet-portfolio-ui.vercel.app/?utm_source=linea&utm_medium=partner-docs), token gating, airdrop snapshots.

### NFT API

- **Features:** Media assets, metadata, sales, owners, trait & attribute filters, thumbnails, and 
previews.
- **Use cases:** [NFT galleries and marketplaces](https://goldrush-nft-gallery-ui.vercel.app/?utm_source=linea&utm_medium=partner-docs), real world asset (RWA) tracking, token gating.

### DEX API

- **Features:** Positions, rewards, pool and token details for major DEX protocols.
- **Use cases:** [Analytics dashboards](https://goldrush-uniswap-dex-dashboard.vercel.app/?utm_source=linea&utm_medium=partner-docs), leaderboards, reward calculators.

### Cross-Chain Activity API

- **Features:** Single API call to fetch a list of active chains and the latest transaction date 
on each for an address.
- **Use cases:** [App onboarding](https://goldrush-wallet-portfolio-ui.vercel.app/activity/0xfc43f5f9dd45258b3aff31bdbe6561d97e8b71de/?utm_source=linea&utm_medium=partner-docs).

### Transactions API

- **Features:** All historical transactions with human-readable log events. Includes gas usage/spend
summaries.
- **Use cases:** [Accounting and tax tools](https://bit.ly/crypto-tax-tool), branded in-app [transaction receipts](https://goldrush-dfk-tx-receipt-ui.vercel.app/tx/defi-kingdoms-mainnet/0x4e5c0af28b2cea27d06677fae1f573572e0ff863c43ae42d2959ca67b90c4390/?utm_source=linea&utm_medium=partner-docs).

### Security API

- **Features:** NFT and ERC20 token allowances, including value-at-risk.
- **Use cases:** Revoke features in wallets, security applications.

### Blockchain API

- **Features:** Block details, log events by contract address or topic hash, gas prices.
- **Use cases:** Custom block explorers.

### Developer tools

There are 3 primary developer tools for using the APIs:

1. [Unified API](https://www.covalenthq.com/docs/api/?utm_source=linea&utm_medium=partner-docs) - 
enterprise-grade endpoints to use with any programming language. Switch blockchains with one path 
parameter.

    ```bash
    curl -X GET https://api.covalenthq.com/v1/linea-mainnet/address/0xc882b111a75c0c657fc507c04fbfcd2cc984f071/balances_v2/ \
        -H 'Content-Type: application/json' \
        -u YOUR_API_KEY:
    ```

2. [Client SDKs](https://www.covalenthq.com/docs/unified-api/sdk/?utm_source=linea&utm_medium=partner-docs) - official client libraries including TypeScript, Go and Python.
    ```jsx
    npm install @covalenthq/client-sdk
    ```


    ```jsx
    import { CovalentClient } from "@covalenthq/client-sdk";

    (async () => {
    try {
        const client = new CovalentClient("YOUR_API_KEY");
        const transactions = client.TransactionService.getAllTransactionsForAddress("linea-mainnet", "0xc882b111a75c0c657fc507c04fbfcd2cc984f071");

        for await (const tx of transactions) {
        console.log("tx", tx);
        }
    } catch (error) {
        console.log(error.message);
    }
    })();
    ```

3. [GoldRush Kit](https://github.com/covalenthq/goldrush-kit/?utm_source=linea&utm_medium=partner-docs) - beautifully designed React components for your dApp frontend

    [![GoldRush Component Example](https://www.datocms-assets.com/86369/1711147954-goldrush_wallet_ui_example.png)](https://goldrush-wallet-portfolio-ui.vercel.app/dashboard/balance/0xfc43f5f9dd45258b3aff31bdbe6561d97e8b71de/transfers/eth-mainnet/0xf8c3527cc04340b208c854e985240c02f7b7793f)

### Get started

- [API Key](https://www.covalenthq.com/platform/auth/register/?utm_source=linea&utm_medium=partner-docs) - sign up for free
- [Docs](https://www.covalenthq.com/docs/unified-api/?utm_source=linea&utm_medium=partner-docs) - comprehensive knowledge base for all things Covalent
- [Guides](https://www.covalenthq.com/docs/unified-api/guides/?utm_source=linea&utm_medium=partner-docs) - learn how to build for various use cases and expand your onchain knowledge

## Increment

[![example-increment-chart](https://www.datocms-assets.com/86369/1684974544-increment-example-partner-docs.png)](https://www.covalenthq.com/platform/increment/#/?utm_source=linea&utm_medium=partner-docs)

Increment is a novel no-code charting and reporting tool powered by Covalent. 
*Simply type SQL, get charts.*

### Use cases

Increment can be used for:

- [Analyzing blockchain networks](https://www.covalenthq.com/docs/increment/data-models/chain-gdp/?utm_source=linea&utm_medium=partner-docs)
- [Analyzing DEXs](https://www.covalenthq.com/docs/increment/data-models/swap-land/?utm_source=linea&utm_medium=partner-docs)
- [Analyzing NFT marketplaces](https://www.covalenthq.com/docs/increment/data-models/jpeg-analysis/?utm_source=linea&utm_medium=partner-docs)


### Get started

- [Increment](https://www.covalenthq.com/platform/increment/#/?utm_source=linea&utm_medium=partner-docs) - login via the Covalent Platform
- [Docs](https://www.covalenthq.com/docs/increment/?utm_source=linea&utm_medium=partner-docs) - 
learn how to use Increment to build dynamic, custom charts
- [Data models demo](https://www.covalenthq.com/docs/increment/data-models/model-intro/?utm_source=linea&utm_medium=partner-docs) - build analytics in three clicks
