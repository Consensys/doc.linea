---
title: Linea SDK
---

The Linea SDK package is comprised of two integral components: the SDK, which facilitates smart contract interaction, and the Postman, responsible for seamless message delivery. Together, these components enable smooth communication and empower you to effortlessly retrieve message status and information across the Ethereum and Linea networks.


## Installation

To install the package you need to run:

```bash
npm install @consensys/linea-sdk
```

## SDK

The SDK focuses on interacting with smart contracts on both Ethereum and Linea networks and provides custom functions to obtain message information. Notable features of the Linea SDK include:

 1. Getting contract instances and addresses

 2. Getting message information by message hash

 3. Getting messages by transaction hash

 4. Getting a message status by message hash

 5. Claiming messages


The code example below demonstrates how to initialize the SDK with the relevant configuration options, and how to call the featured methods.

```typescript
import * as dotenv from "dotenv";
import { LineaSDK } from "@consensys/linea-sdk";

dotenv.config();

const sdk = new LineaSDK({
    l1RpcUrl: process.env.L1_RPC_URL ?? "", // L1 rpc url
    l2RpcUrl: process.env.L2_RPC_URL ?? "", // L2 rpc url
    l1SignerPrivateKey: process.env.L1_SIGNER_PRIVATE_KEY ?? "", // L1 account private key (optional if you use mode = read-only)
    l2SignerPrivateKey: process.env.L2_SIGNER_PRIVATE_KEY ?? "", // L2 account private key (optional if you use mode = read-only)
    network: "linea-goerli", // network you want to interact with (either linea-mainnet or linea-goerli)
    mode: "read-write", // contract wrapper class mode (read-only or read-write), read-only: only read contracts state, read-write: read contracts state and claim messages 
});

const l1Contract = sdk.getL1Contract(); // get the L1 contract wrapper instance
const l2Contract = sdk.getL2Contract(); // get the L2 contract wrapper instance

console.log(await l2Contract.getMessageStatus("0x3e1bdceea0a4d5693af825a29d44fc41b7db7c4947121362a130326b82b84e65")); //  status by message hash
console.log(await l1Contract.getMessageStatus("0x28e9e11b53d624500f7610377c97877bb1ecb3127a88f7eba84dd7a146891946")); // status by message hash

const message = await l2Contract.getMessageByMessageHash(
    "0xe36bb6d4122a2874692c7fa5bf189cfa6f80c77da0414d26b3a728b97aa18ee5",
);
const messageByTx = await l1Contract.getMessagesByTransactionHash(
    "0xeaeaa2f8bab82aa7d2d53770545399fe9783434bd8a53e5aa93abfadaa19df51",
);

const receipt = await l1Contract.getTransactionReceiptByMessageHash(
    "0x28e9e11b53d624500f7610377c97877bb1ecb3127a88f7eba84dd7a146891946",
);
```

