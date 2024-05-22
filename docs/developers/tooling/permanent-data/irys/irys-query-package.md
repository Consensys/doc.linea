---
title: Query package
image: /img/socialCards/query-package.jpg
description: Querying data on Irys.
---

# Irys query package

Irys transaction metadata can be queried using the Irys Query Package. You can use it to search for transactions by:

- Signer's address
- Payment token
- Metadata tags
- Timestamps

## Installation

Install via npm:

```console
npm install @irys/query
```

and yarn:

```console
yarn add @irys/query
```

## Imports

Import with:

```js
import Query from "@irys/query";
```

## Creating a `Query` object

Start by instantiating a new `Query` object, this is a shared instance you can reuse each time you want to execute a new query.

```js
const myQuery = new Query();
```

Then execute a query by chaining together a series of functions that collaboratively narrow down the results returned.

To retrieve the 20 latest transactions with the tag `Content-Type` set to `image/png` on Irys:

```js
const results = await myQuery
  .search("irys:transactions")
  .tags([{ name: "Content-Type", values: ["image/png"] }])
  .sort("ASC")
  .limit(20);
```

## GraphQL

You can also [query Irys transactions using GraphQL](https://docs.irys.xyz/developer-docs/querying/graphql).

## More information

Code examples covering each field that can be searched are in the [Irys docs](https://docs.irys.xyz/developer-docs/querying/query-package).
