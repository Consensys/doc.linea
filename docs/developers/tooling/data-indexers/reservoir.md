# Reservoir

[Reservoir](https://reservoir.tools/) is a developer platform that lets you interact with the NFT market using a single toolkit. With the tools, you can build [custom marketplaces](https://docs.reservoir.tools/docs/custom-marketplaces), [embed buying, selling](https://docs.reservoir.tools/docs/embedded-buying-selling) & [minting](https://docs.reservoir.tools/docs/minting) into your app, and get [distribution for your protocol's liquidity](https://docs.reservoir.tools/docs/how-to-get-distribution-for-your-protocol-using-reservoir), among many other [use cases](https://docs.reservoir.tools/docs/custom-marketplaces). We run a hosted version of our API, but all the tools are open-source.

The platform is built on **The Reservoir Standard**, an open framework for understanding the NFT market across marketplaces and chains. Together, these pieces function as an interface that makes NFT markets composable, easy to participate in, and aligned with the ethos of web3. Check out our tools:

# [NFT trading and data APIs](https://docs.reservoir.tools/reference/overview)

Reservoir APIs provide all-in-one endpoints for building NFT applications. The NFT trading APIs allow you to trade NFTs across major NFT marketplaces and create your own orders with advanced order types and custom fees. The NFT data APIs provide granular token price data, real-time collection floor price and top bid events, token and collection metadata, and more. The API is wrapped in an easy-to-use [TS/JS SDK](ref:reservoir-sdk-jstsnode) with performant methods.

Learn more about our NFT Trading & Data APIs [here](https://docs.reservoir.tools/reference/overview).

# [ReservoirKit](doc:reservoirkit-ui)

ReservoirKit is a React library that makes it easy to add marketplace functionality into your project. The kit has out of the box and customizable (headless) modals for major market actions, as well as a series of useful hooks to simplify development.

Learn more about ReservoirKit [here](https://docs.reservoir.tools/reference/reservoirkit).

# [Open-source marketplace](https://docs.reservoir.tools/reference/open-source-marketplace)

Reservoir's open-source marketplace is a NextJS app that you can fork and use freely as a standalone marketplace or a base for building something more custom and unique. You can checkout our fully-functional reference deployment [here](https://marketplace.reservoir.tools/).

Learn more about our Open-source Marketplace [here](https://docs.reservoir.tools/reference/open-source-marketplace).

# Why use Reservoir?

Interacting with the NFT market can be challenging. Reservoir simplifies the process so you can spend your time focusing on your product's unique value add to the market.

## Developer-focused tooling

Reservoir allows you to build at your desired level of the stack. We provide a modular set of tools that let you interact with the NFT market at the appropriate level of abstraction for your application. Whether you wish to use our router contracts directly, use our APIs for trade execution, or use ReservoirKit to build a React app, we have you covered.

Learn more about our tools [here](https://docs.reservoir.tools/docs/marketplace-toolkit).

## Abstracted orderbook and exchange

Reservoir treats the NFT market as one cohesive whole and abstracts the process of interacting with individual orderbooks and exchanges. This means you get:

- **Upgrade protection** - Since Reservoir abstracts the orderbook and exchange, you get exchange and orderbook upgrades free and with no additional work. By default we use the Seaport exchange, as new features roll out, you will get them without any changes to your code.
- **Out of the box aggregation** - We aggregate all major marketplaces and normalize the liquidity so all orders are treated equally in our system. See a full list of aggregated marketplaces [here](https://docs.reservoir.tools/reference/supported-marketplaces). We don’t just aggregate listings, we also aggregate all bid liquidity from across the NFT ecosystem so your users can sell instantly into the best available offer.
- **Order distribution** - Reservoir allows you to post your own orders with your desired fee structure. These orders are distributed to all Reservoir partner marketplaces and marketplaces that aggregate the Reservoir orderbook. Additionally, Reservoir allows you to cross post orders to other major marketplace orderbooks.

## Marketplace innovation

Reservoir is pushing the boundaries of NFT markets. We strive to build best in class NFT market solutions. Here are just a few of the important features we have released recently that you won’t find anywhere else.

- [Royalty Compliance](https://docs.reservoir.tools/docs/royalties) - Leverage aggregated liquidity with normalized royalties, so you get all the NFT market liquidity while still respecting creator royalties.

- [Custom Fees](https://docs.reservoir.tools/docs/custom-fees) - Distribute orders across the NFT ecosystem with your own custom fee structure.

- [Cross-chain support](https://docs.reservoir.tools/reference/supported-chains) - Reservoir is currently live on Ethereum, Polygon and Optimism - with more chains on the way.

- [Instant Sell](https://docs.reservoir.tools/docs/add-instant-sell) - Aggregated bid liquidity allows your users to sell instantly into the best offer on the market.
