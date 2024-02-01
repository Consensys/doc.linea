---
title: RedStone Oracles
---

# RedStone Oracles

RedStone offers flexible Data Feeds with &lt;10s update time perfect for Lending, Perpetuals, Options, Derivatives, Stablecoins and other DeFi applications. The infrastructure is well battle-tested and **secures hundreds of millions of USD on mainnets**. Trusted by some of the best protocols in DeFi and supported by well-renowned Builders such as Stani Kulechov (Aave), Coinflipcanada (GMX), Jacob Blish (Lido) and many more.

### Why a new approach to Oracles is needed

- Pushing data on-chain regardless of whether it is used or not is a huge waste of resources
- Obsolete and monolithic architecture limits scalability (it's hard to list new assets or reduce latency)
- Protocols cannot fully decide on trusted sources and data update conditions
- End-users are fully dependent on relayers and could be cut off from the service

### Solution

RedStone offers a radically different design of Oracles catering to the needs of modern DeFi protocols.

- Data providers can avoid the requirement of continuous on-chain data delivery
- Allow end users to self-deliver signed Oracle data on-chain
- Use the decentralized Streamr network to deliver signed oracle data to the end users
- Use token incentives to motivate data providers to maintain data integrity and uninterrupted service
- Leverage the Arweave blockchain as cheap and permanent storage for archiving Oracle data and maintaining data providers' accountability

## 💡 How it works

### Modular design

Putting data directly into storage is the easiest way to make information accessible to smart contracts. This approach used to work well for large update intervals and a small number of assets. However, there are more and more tokens coming to DeFi and modern derivative protocols require much lower latency boosting the maintenance costs of the simple model.

That's why, RedStone proposes a completely new modular design where data is first put into a data availability layer and then fetched on-chain. This allows us to broadcast a large number of assets at high frequency to a cheaper layer and put it on chain only when required by the protocol.

### 3 Ways to integrate

Depending on the smart contract architecture and business demands, Builders can choose among 3 different models of data consumption:

- [RedStone Core](https://docs.redstone.finance/docs/smart-contract-devs/get-started/redstone-core), data is dynamically injected to user transactions achieving maximum gas efficiency and maintaining a great user experience as the whole process fits into a single transaction. Best for most use cases.

- [RedStone Classic](https://docs.redstone.finance/docs/smart-contract-devs/get-started/redstone-classic), data is pushed into on-chain storage via relayer. Dedicated to protocols designed for the traditional Oracles model, that want to have full control of the data source and update conditions.

- [RedStone X](https://docs.redstone.finance/docs/smart-contract-devs/get-started/redstone-x), targeting the needs of the most advanced protocols such as Perpetuals, Options and Derivatives by eliminating the front-running risk providing price feeds at the very next block after users' interactions.

**💡 Learn more about the integration in our [Docs](https://docs.redstone.finance/)**

## ℹ️ Key facts

- The [modular architecture](https://docs.redstone.finance/docs/smart-contract-devs/how-it-works#data-flow) maintains [data integrity](https://docs.redstone.finance/docs/smart-contract-devs/how-it-works#data-format) from source to smart contracts
- There are [3 different ways](https://docs.redstone.finance/docs/smart-contract-devs/how-it-works#3-ways-to-integrate) to integrate our service tailored to your needs
- We provide feeds for more than [1000 assets](https://app.redstone.finance/#/app/tokens) integrating [~50 data sources](https://app.redstone.finance/#/app/sources)
- We are present on [20+ chains](https://showroom.redstone.finance/)
- RedStone has been live on mainnets since March 2022 with no downtime. Code was audited by ABDK, Packshield and L2Beat Co-Founder.
- RedStone was a launch partner for [DeltaPrime](https://deltaprime.io/) on Avalanche and delivered data feeds not available anywhere else. Thanks to that DeltaPrime became the top 3 fastest growing dApps according to DefiLlama.

## 📱 How to get in contact with us? → [Join our Discord!](https://docs.redstone.finance/)

---

## 🌐 Links

- [Twitter](https://twitter.com/redstone_defi)
- [Discord](https://redstone.finance/discord)
- [Website](https://redstone.finance/)
- [Docs](https://docs.redstone.finance/)
- [Angel Round Announcement](https://twitter.com/redstone_defi/status/1661024722690379778)
- [Seed Round Announcement](https://twitter.com/redstone_defi/status/1564553885695373312)
