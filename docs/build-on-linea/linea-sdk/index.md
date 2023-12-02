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

 5. Claiming messages (use one of the get message methods to grab all the parameter values)


The code example below demonstrates how to initialize the SDK with the relevant configuration options, and how to call the featured methods.

```typescript
import * as dotenv from "dotenv";
import { LineaSDK } from "@consensys/linea-sdk";
import { BigNumber } from 'ethers';


dotenv.config();

const sdk = new LineaSDK({
    l1RpcUrl: process.env.L1_RPC_URL ?? "", // L1 rpc url
    l2RpcUrl: process.env.L2_RPC_URL ?? "", // L2 rpc url
    l1SignerPrivateKey: process.env.L1_SIGNER_PRIVATE_KEY ?? "", // L1 account private key (optional if you use mode = read-only)
    l2SignerPrivateKey: process.env.L2_SIGNER_PRIVATE_KEY ?? "", // L2 account private key (optional if you use mode = read-only)
    network: "linea-mainnet", // network you want to interact with (either linea-mainnet or linea-goerli)
    mode: "read-write", // contract wrapper class mode (read-only or read-write), read-only: only read contracts state, read-write: read contracts state and claim messages 
});

const l1Contract = sdk.getL1Contract(); // get the L1 contract wrapper instance
const l2Contract = sdk.getL2Contract(); // get the L2 contract wrapper instance

console.log( await l2Contract.getMessageStatus("0x13dd0f5e3611b44c88e80f5206bbe1ce1c6996514cef1e209e9eb06d9f5b9a2d")); //  returns on-chain message status by message hash
console.log( await l1Contract.getMessageStatus("0x28e9e11b53d624500f7610377c97877bb1ecb3127a88f7eba84dd7a146891946")); // returns on-chain message status by message hash

console.log( await l2Contract.getMessageByMessageHash("0x13dd0f5e3611b44c88e80f5206bbe1ce1c6996514cef1e209e9eb06d9f5b9a2d")); // returns message by message hash
console.log( await l1Contract.getMessageByMessageHash("")); // returns message by message hash


console.log( await l2Contract.getMessagesByTransactionHash("0x4b72c6abacd3e2372a32e2797c41cab08df8d5e6fb2eb453e896e52fe7b70a27")); // returns message by transaction hash
console.log( await l1Contract.getMessagesByTransactionHash("")); // returns message by transaction hash

console.log( await l2Contract.getTransactionReceiptByMessageHash("0x13dd0f5e3611b44c88e80f5206bbe1ce1c6996514cef1e209e9eb06d9f5b9a2d")); // returns transaction receipt by message hash
console.log( await l1Contract.getTransactionReceiptByMessageHash("0x13dd0f5e3611b44c88e80f5206bbe1ce1c6996514cef1e209e9eb06d9f5b9a2d")); // returns transaction receipt by message hash

 claimMessage = await l2Contract.claim({ // claims message by message 
    messageSender: "", // address of message sender
    messageHash: "", // message hash
    fee: BigNumber.from(1), // fee
    destination: "", // destination address of message
    value: BigNumber.from(2), // value of message
    calldata: "0x", // call data
    messageNonce: BigNumber.from(1), // message nonce
    feeRecipient: "0x", // address that will receive fees. by default it is the message sender
  });        
```
