---
title: Linea SDK - Postman
sidebar_position: 2
---

## Introduction to Postman

The Postman client is a part of the Linea SDK that dapp developers can use to integrate Linea's cross-chain message transfer process into their own infrastructure. Postman allows dapps to move messages from one chain to another and are responsible for those messages being executed. In return, the postman gets to collect a fee once it has been verified that the message has been delivered and recorded. In other words, this package lets your dapp be the postman for L1 and L2 messages, using Linea's protocol.

> _Note: Fees are currently not setup for this postman integration but will be available in future iterations._

## Installation

To install the package you need to run:

```bash
npm install @consensys/linea-sdk
```

## Implementation

The code below will allow your dapp to act as a Postman.

```typescript
import { PostmanServiceClient } from "@consensys/linea-sdk";
import { format, transports } from "winston";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const client = new PostmanServiceClient({
    l1Config: {
      rpcUrl: process.env.L1_RPC_URL ?? "",
      contractAddress: process.env.L1_CONTRACT_ADDRESS ?? "",
      signerPrivateKey: process.env.L1_SIGNER_PRIVATE_KEY ?? "",
      messageSubmissionTimeout: parseInt(
        process.env.MESSAGE_SUBMISSION_TIMEOUT ?? "300000",
      ),
      ethLogFilters: {
        maxBlocksToFetchLogs: parseInt(
          process.env.L1_MAX_BLOCKS_TO_FETCH_LOGS ?? "1000",
        ),
      },
      maxFetchMessagesFromDb: parseInt(
        process.env.MAX_FETCH_MESSAGES_FROM_DB ?? "1000",
      ),
      maxNonceDiff: parseInt(process.env.MAX_NONCE_DIFF ?? "10000"),
      maxFeePerGas: parseInt(process.env.MAX_FEE_PER_GAS ?? "100000000000"),
      gasEstimationPercentile: parseInt(
        process.env.GAS_ESTIMATION_PERCENTILE ?? "50",
      ),
    },
    l2Config: {
      rpcUrl: process.env.L2_RPC_URL ?? "",
      contractAddress: process.env.L2_CONTRACT_ADDRESS ?? "",
      signerPrivateKey: process.env.L2_SIGNER_PRIVATE_KEY ?? "",
      messageSubmissionTimeout: parseInt(
        process.env.MESSAGE_SUBMISSION_TIMEOUT ?? "300000",
      ),
      ethLogFilters: {
        maxBlocksToFetchLogs: parseInt(
          process.env.L2_MAX_BLOCKS_TO_FETCH_LOGS ?? "1000",
        ),
      },
      maxFetchMessagesFromDb: parseInt(
        process.env.MAX_FETCH_MESSAGES_FROM_DB ?? "1000",
      ),
      maxNonceDiff: parseInt(process.env.MAX_NONCE_DIFF ?? "10000"),
      maxFeePerGas: parseInt(process.env.MAX_FEE_PER_GAS ?? "100000000000"),
      gasEstimationPercentile: parseInt(
        process.env.GAS_ESTIMATION_PERCENTILE ?? "50",
      ),
    },
    loggerOptions: {
      level: "info",
      format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({
          format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        format.align(),
        format.printf(
          ({ module, timestamp, level, message }) =>
            `[${timestamp}] ${module}: ${level} ${message}`,
        ),
      ),
      transports: [new transports.Console()],
    },
    databaseOptions: {
      type: "postgres",
      host: process.env.POSTGRES_HOST ?? "",
      port: parseInt(process.env.POSTGRES_PORT ?? ""),
      username: process.env.POSTGRES_USER ?? "",
      password: process.env.POSTGRES_PASSWORD ?? "",
      database: process.env.POSTGRES_DB ?? "",
    },
  });
  await client.connectDatabase();
  client.startAllServices();
}

main()
  .then()
  .catch((error) => {
    console.error("", error);
    process.exit(1);
  });
```

## Configuration

All of the values that the SDK will need should be stored in a .env file. Make sure that you have a .gitignore file that is properly set up to [avoid pushing your private keys into public](https://consensys.net/blog/developers/how-to-avoid-uploading-your-private-key-to-github-approaches-to-prevent-making-your-secrets-public/).

```javascript
L1_RPC_URL=https://goerli.infura.io/v3/<INFURA_KEY>
L1_CONTRACT_ADDRESS=0x70BaD09280FD342D02fe64119779BC1f0791BAC2 // L1 rollup smart-contract
L1_SIGNER_PRIVATE_KEY= //Account private key that will be use to send claim transactions,

L1_LISTENER_INTERVAL=4000 // - event listener polling interval
L1_LISTENER_INITIAL_FROM_BLOCK=0 // User can choose to start listening for events from this specific block. Default value is the block of the latest message sent stored in the DB
L1_LISTENER_BLOCK_CONFIRMATION=4 // number of block to wait for before listening to events. The range of blocks that we use to listen for events is (fromBlock -> 'latest' - blockConfirmation)
L1_MAX_BLOCKS_TO_FETCH_LOGS=1000 //max range of blocks to fetch logs,
L2_RPC_URL=https://linea-goerli.infura.io/v3/<INFURA_KEY>
L2_CONTRACT_ADDRESS=0xC499a572640B64eA1C8c194c43Bc3E19940719dC // message service smart contract address to listen to
L2_SIGNER_PRIVATE_KEY= //Account private key that will be use to send claim transactions,
L2_LISTENER_INTERVAL=4000 // same description as L1 config
L2_LISTENER_INITIAL_FROM_BLOCK=0 // same description as L1 config
L2_LISTENER_BLOCK_CONFIRMATION=0 // same description as L1 config
L2_MAX_BLOCKS_TO_FETCH_LOGS=1000 // same description as L1 config
MESSAGE_SUBMISSION_TIMEOUT=300000 // maximum transaction timeout before doing a retry
MAX_FETCH_MESSAGES_FROM_DB=1000 // max messages that can be fetched from the DB per db query
MAX_NONCE_DIFF=10000 // Optional-maximum difference between on chain account nonce and in memory account nonce
MAX_FEE_PER_GAS=100000000000 // max fee per gas that the postman is willing to pay,
GAS_ESTIMATION_PERCENTILE=50 // Used to estimate fees for claiming transactions using the eth_feeHistory infura rpc endpoint. It is the percentile value to sample from each block's effective priority fees per gas in ascending order, weighted by gas used.
(https://docs.infura.io/networks/ethereum/json-rpc-methods/eth_feehistory)
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

```

## Outputs

Once the postman client is running, you should be see an output similar to this:

```bash
[2023-06-21 03:23:57.659 PM] L1SentEventListener: info  Interval reached every 4000 ms, checking from 223 to 224
[2023-06-21 03:23:57.662 PM] L2SentEventListener: info  Interval reached every 4000 ms, checking from 0 to 0
[2023-06-21 03:23:57.669 PM] L1SentEventListener: info  # of fetched MessageSent events: 0
[2023-06-21 03:23:57.671 PM] L2SentEventListener: info  # of fetched MessageSent events: 0

```

This will let you know that the L1 and L2 event listeners are checking for messages being sent cross chain. When a message is successfully claimed, you should get the following response with your transaction hash.

```bash
[2023-06-21 11:36:27.532 AM] L1ClaimStatusWatcher: CLAIMED_SUCCESS: Message with tx hash 0x433da33239ce08dbd6951e436e16bcfe5be944a8ab089415653b4ad9ae22b15b has been claimed.
```
