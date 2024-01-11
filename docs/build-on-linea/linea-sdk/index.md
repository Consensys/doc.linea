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

 5. Claiming messages (use one of the get message methods to grab all the parameters values)

 
:::info[New Features]

 The updated Linea SDK package enhances the L1 contract interaction and adds support for the new L1 claiming system, which is based on a Merkle tree and requires a Merkle proof for claiming.
 
 There are three important things to note:
  - The previous L1 claiming and all functions associated are still supported.
  - The L2 claiming remains unaltered, and all SDK features for interacting with L2 will remain unchanged.
  - The previous L1 claiming function and code samples provided here cater to the transition period where pre-transition messages are claimed without the Merkle proof and post-transition with proof. If this SDK is being used after the transition, using the logic that switches between Merkle and non-Merkle proof claiming is sub-optimal.

The updated SDK introduces several new features for L1 interactions:

A new L1ClaimingService class that includes the following functions:
  - getMessageProof: This function retrieves the message Merkle tree proof required for new message claims on L1.
  - isClaimingNeedingProof: This function determines whether a proof is needed to claim a message.
  - getMessageStatus: This function retrieves a message's status, returning the status of both old and new messages.
  - estimateClaimMessageGas: This function provides an estimate of the gas cost for both old and new claim transactions.
  - claimMessage: This function enables a message to be claimed using either the old or new function.

Two new functions in the L1 contract:
  - estimateClaimWithProofGas: This functions estimates the gas cost for new claim transactions.
  - claimWithProof: This functions claims a message using the new claimMessageWithProof function.

:::

## Code Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  className="my-tabs"
  defaultValue="new"
  values={[
    {label: 'v0.2.0-rc.1', value: 'new'},
    {label: 'v0.1.6', value: 'old'},
  ]
}>
<TabItem value="old">

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
const l1ClaimingService = sdk.getL1ClaimingService(); 

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
</TabItem> <TabItem value="new">

```typescript
import * as dotenv from "dotenv";
import { LineaSDK } from "@consensys/linea-sdk";
import { BigNumber } from 'ethers';


dotenv.config();

const sdk = new LineaSDK({
    l1RpcUrl: process.env.L1_RPC_URL ?? "",
    l2RpcUrl: process.env.L2_RPC_URL ?? "",
    l1SignerPrivateKey: process.env.L1_SIGNER_PRIVATE_KEY ?? "",
    l2SignerPrivateKey: process.env.L2_SIGNER_PRIVATE_KEY ?? "",
    network: "linea-mainnet",
    mode: "read-write",
  });

  const l1Contract = sdk.getL1Contract();
  const l2Contract = sdk.getL2Contract();
  const l1ClaimingService = sdk.getL1ClaimingService();

  /********************* Three approaches to claim on L1 *********************/ 

  // 1. The L1 Claiming service manages all the necessary logic for you.
  const message = await l2Contract.getMessageByMessageHash("messageHash");

  const messageStatus = await l1ClaimingService.getMessageStatus("messageHash");

  if (messageStatus == OnChainMessageStatus.CLAIMABLE) {
    const estimatedGas = await l1ClaimingService.estimateClaimMessageGas(message); // Optional
    await l1ClaimingService.claimMessage(message);
  }

  // 2. You can handle the logic on your side
  const message = await l2Contract.getMessageByMessageHash("messageHash");

  const messageStatus = await l1ClaimingService.getMessageStatus("messageHash");

  if (messageStatus == OnChainMessageStatus.CLAIMABLE) {
    const isProofNeeded = await l1ClaimingService.isClaimingNeedingProof("messageHash");
    if (!isProofNeeded) {
      const estimatedGas = await l1Contract.estimateClaimGas(message) // Optional
      await l1Contract.claim(message);
    } else {
      const proofInfo = await l1ClaimingService.getMessageProof("messageHash");
      const estimatedGas = await l1Contract.estimateClaimWithProofGas({
        ...message,
        proof: proofInfo.proof,
        leafIndex: proofInfo.leafIndex,
        merkleRoot: proofInfo.root,
      }); // Optional

      await l1Contract.claimWithProof({
        ...message,
        proof: proofInfo.proof,
        leafIndex: proofInfo.leafIndex,
        merkleRoot: proofInfo.root,
      });
    }
  }

  // 3. You can implement your own logic to get a merkle proof
  const message = await l2Contract.getMessageByMessageHash("messageHash");

  const messageStatus = await l1ClaimingService.getMessageStatus("messageHash");

  if (messageStatus == OnChainMessageStatus.CLAIMABLE) {
    const isProofNeeded = await l1ClaimingService.isClaimingNeedingProof("messageHash");
    if (!isProofNeeded) {
      const estimatedGas = await l1Contract.estimateClaimGas(message) // Optional
      await l1Contract.claim(message);
    } else {
      const proofInfo = // Implement your own function to get a merkle proof
        // The L1ClaimingService exposes some utility functions to assist you: getFinalizationMessagingInfo, getL2MessageHashesInBlockRange, getMessageSiblings

        // Follow these steps:
        // 1. Retrieve the MessageSent event on L2 by messageHash
        // 2. Retrieve the L2MessagingBlockAnchored event on L1 using the MessageSent.blockNumber you acquired in step 1. This is used to get the finalization transaction hash where the L2 block number associated to your message has been finalized.
        // 3. Invoke the getFinalizationMessagingInfo function using the L2MessagingBlockAnchored.transactionHash you obtained in step 2.
        // This will return all merkle roots anchored during this finalization transaction, the depth of trees, the first and the last L2 block containing messages finalized on L1 in this transaction.
        // 4. Invoke the getL2MessageHashesInBlockRange function using the first and last L2 block number that you obtained in step 3. This will return all l2 messages hashes in this L2 block range.
        // 5. Invoke the getMessageSiblings function to obtain all message siblings
        // 6. Construct a SparseMerkleTree, add all message siblings you obtained at step 5 to the tree and return a merkle proof

        // NOTE: You can create your own functions that encompass all steps. Utility functions are merely provided as a helper.

        const estimatedGas = await l1Contract.estimateClaimWithProofGas({
          ...message,
          proof: proofInfo.proof,
          leafIndex: proofInfo.leafIndex,
          merkleRoot: proofInfo.root,
        }); // Optional
        await l1Contract.claimWithProof({
          ...message,
          proof: proofInfo.proof,
          leafIndex: proofInfo.leafIndex,
          merkleRoot: proofInfo.root,
        });
    }
  }


```

</TabItem> </Tabs>