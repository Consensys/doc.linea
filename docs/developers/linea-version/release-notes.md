---
title: Release notes
sidebar_position: 1
---

# Release notes

Find out all you need to know for the latest Linea versions.

## Linea Alpha v0.2.0 (June 6, 2023)

### Summary

This release focuses on testing a substantial architecture upgrade in preparation for Mainnet launch. It contains multiple improvements and breaking changes, specifically around the messaging layer which is changed to a push model. It also improves EVM prover coverage, and provides batch conflation.

### Features

- Add Batch Conflation feature to the sequencer to minimize L1 transactions cost.
  - With Batch Conflation, L2 blocks' proofs that should have been independent are instead merged together. Therefore, L1 costs for these blocks’ proofs are divided by the number of merged blocks.
- Improve the following smart contracts:
  - Rollup zkEVM: Upgrade the rollup main contract with support for
    - Conflation
    - Security Council management
    - Verifier
      - Outer proof system moved from Groth16 to Plonk + custom gates to support efficient Fiat Shamir, c.f.: https://eprint.iacr.org/2022/1072.pdf section 6.2
    - Messaging Service
      - Changed the message service model by splitting the delivery into anchoring and claiming of messages to allow more flexible workflows, remove the mandatory fee for L1→L2, reduce the mandatory fee for L2→L1
  - Canonical Token Bridge: Upgrade from 1-1 ERC20 basic token bridge to N-N ERC20 canonical token bridge with reservation and token registry
- Add Postman Service for message execution
  - The Postman Service is Linea’s off-chain message delivery service. It’s decentralized, permissionless, and used to claim messages once the protocol has anchored the message hashes. The first release will only contain the following scenarios:
    - DApps/protocols operating the SDK (to be released) claiming messages and paying for gas
      - The protocol can filter messages based on origin or destination smart-contracts
    - Linea operating the SDK for dApps/Protocols that aren’t yet integrated
  - If messages don’t get delivered by the postman, the message can be manually claimed by calling `claimMessage` with the `MessageSent` event parameters or by using the SDK.
- Update prover to integrate with the new architecture and support Batch Conflation

### Breaking changes

- Bridging partners will need to listen to different events, modifications to the events are seen below:

  <table>
  <tbody>
    <tr>
      <th></th>
      <th>Event</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><b>L1</b></td>
      <td><code>MessageClaimed</code></td>
      <td>When a message is claimed</td>
    </tr>
    <tr>
      <td><b>L1</b></td>
      <td><code>L1L2MessagesReceivedOnL2</code></td>
      <td>Message hashes have been anchored on L2 and the zkRollup updates the L1 statuses - <b>Includes multiple message hashes</b></td>
    </tr>
    <tr>
      <td><b>L1</b></td>
      <td><code>L2L1MessageHashAddedToInbox</code></td>
      <td>The L2 message hash has been anchored on L1 and can be claimed on block finalization.</td>
    </tr>
    <tr>
      <td><b>L2</b></td>
      <td><code>MessageSent</code></td>
      <td>Emitted when a message is sent</td>
    </tr>
    <tr>
      <td><b>L2</b></td>
      <td><code>MessageClaimed</code></td>
      <td>Emitted when a message is claimed</td>
    </tr>
    <tr>
      <td><b>L2</b></td>
      <td><code>L1L2MessageHashesAddedToInbox</code></td>
      <td>L1→L2 message hash has been anchored on L2 and can be claimed on block finalization.</td>
    </tr>
  </tbody>
</table>

- The anchoring and execution (claim) process has been separated into 2 steps. The deadline concept has been completely removed.

:::note

Contracts audit is in progress. This does not reflect final versions.

:::

- **L1**:

  - Bridging partners, to send messages, will need to call the new contract address with a different ABI.
    <details>
      <summary>
        zkEVM2.abi
      </summary>

        [
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [],
            "name": "BlockTimestampError",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "EmptyBlock",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              }
            ],
            "name": "FeePaymentFailed",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "FeeTooLow",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "InvalidProof",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "InvalidProofType",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "pauseType",
                "type": "bytes32"
              }
            ],
            "name": "IsPaused",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "messageHash",
                "type": "bytes32"
              }
            ],
            "name": "L1L2MessageNotSent",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "LimitIsZero",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "MessageAlreadyClaimed",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "messageHash",
                "type": "bytes32"
              }
            ],
            "name": "MessageAlreadyReceived",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "MessageAlreadySent",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "destination",
                "type": "address"
              }
            ],
            "name": "MessageSendingFailed",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "PeriodIsZero",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "ProofIsEmpty",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "RateLimitExceeded",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "StartingRootHashDoesNotMatch",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "ValueSentTooLow",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "ValueShouldBeGreaterThanFee",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "ZeroAddressNotAllowed",
            "type": "error"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "resettingAddress",
                "type": "address"
              }
            ],
            "name": "AmountUsedInPeriodReset",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "blockNumber",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "bytes32",
                "name": "stateRootHash",
                "type": "bytes32"
              }
            ],
            "name": "BlockFinalized",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "lastBlockFinalized",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "bytes32",
                "name": "startingRootHash",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "internalType": "bytes32",
                "name": "finalRootHash",
                "type": "bytes32"
              }
            ],
            "name": "BlocksVerificationDone",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint8",
                "name": "version",
                "type": "uint8"
              }
            ],
            "name": "Initialized",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "messageHash",
                "type": "bytes32"
              }
            ],
            "name": "L1L2MessageHashAddedToOutbox",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "bytes32[]",
                "name": "messageHashes",
                "type": "bytes32[]"
              }
            ],
            "name": "L1L2MessagesReceivedOnL2",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "messageHash",
                "type": "bytes32"
              }
            ],
            "name": "L2L1MessageClaimed",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "messageHash",
                "type": "bytes32"
              }
            ],
            "name": "L2L1MessageHashAddedToInbox",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "amountChangeBy",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "bool",
                "name": "amountUsedLoweredToLimit",
                "type": "bool"
              }
            ],
            "name": "LimitAmountChange",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "_messageHash",
                "type": "bytes32"
              }
            ],
            "name": "MessageClaimed",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "_from",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "_to",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "_fee",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "_nonce",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "bytes",
                "name": "_calldata",
                "type": "bytes"
              },
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "_messageHash",
                "type": "bytes32"
              }
            ],
            "name": "MessageSent",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "messageSender",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "bytes32",
                "name": "pauseType",
                "type": "bytes32"
              }
            ],
            "name": "Paused",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
              },
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "previousAdminRole",
                "type": "bytes32"
              },
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "newAdminRole",
                "type": "bytes32"
              }
            ],
            "name": "RoleAdminChanged",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
              }
            ],
            "name": "RoleGranted",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
              }
            ],
            "name": "RoleRevoked",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "messageSender",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "bytes32",
                "name": "pauseType",
                "type": "bytes32"
              }
            ],
            "name": "UnPaused",
            "type": "event"
          },
          {
            "inputs": [],
            "name": "DEFAULT_ADMIN_ROLE",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "GENERAL_PAUSE_TYPE",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "INBOX_STATUS_RECEIVED",
            "outputs": [
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "INBOX_STATUS_UNKNOWN",
            "outputs": [
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "L1_L2_PAUSE_TYPE",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "L2_L1_PAUSE_TYPE",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "OUTBOX_STATUS_RECEIVED",
            "outputs": [
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "OUTBOX_STATUS_SENT",
            "outputs": [
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "OUTBOX_STATUS_UNKNOWN",
            "outputs": [
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "PAUSE_MANAGER_ROLE",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "PROVING_SYSTEM_PAUSE_TYPE",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "RATE_LIMIT_SETTER_ROLE",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_limitManagerAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_pauseManagerAddress",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "_rateLimitPeriod",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_rateLimitAmount",
                "type": "uint256"
              }
            ],
            "name": "__MessageService_init",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "_fee",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
              },
              {
                "internalType": "address payable",
                "name": "_feeRecipient",
                "type": "address"
              },
              {
                "internalType": "bytes",
                "name": "_calldata",
                "type": "bytes"
              },
              {
                "internalType": "uint256",
                "name": "_nonce",
                "type": "uint256"
              }
            ],
            "name": "claimMessage",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "currentL2BlockNumber",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "currentPeriodAmountInWei",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "currentPeriodEnd",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "currentTimestamp",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "bytes32",
                    "name": "blockRootHash",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint32",
                    "name": "l2BlockTimestamp",
                    "type": "uint32"
                  },
                  {
                    "internalType": "bytes[]",
                    "name": "transactions",
                    "type": "bytes[]"
                  },
                  {
                    "internalType": "bytes[]",
                    "name": "l2l1logs",
                    "type": "bytes[]"
                  },
                  {
                    "internalType": "uint16[]",
                    "name": "batchReceptionIndices",
                    "type": "uint16[]"
                  }
                ],
                "internalType": "struct IZkEvmV2.BlockData[]",
                "name": "_blocksData",
                "type": "tuple[]"
              },
              {
                "internalType": "bytes",
                "name": "_proof",
                "type": "bytes"
              },
              {
                "internalType": "uint256",
                "name": "_proofType",
                "type": "uint256"
              },
              {
                "internalType": "bytes32",
                "name": "_parentStateRootHash",
                "type": "bytes32"
              }
            ],
            "name": "finalizeBlocks",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "bytes32",
                    "name": "blockRootHash",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint32",
                    "name": "l2BlockTimestamp",
                    "type": "uint32"
                  },
                  {
                    "internalType": "bytes[]",
                    "name": "transactions",
                    "type": "bytes[]"
                  },
                  {
                    "internalType": "bytes[]",
                    "name": "l2l1logs",
                    "type": "bytes[]"
                  },
                  {
                    "internalType": "uint16[]",
                    "name": "batchReceptionIndices",
                    "type": "uint16[]"
                  }
                ],
                "internalType": "struct IZkEvmV2.BlockData[]",
                "name": "_blocksData",
                "type": "tuple[]"
              }
            ],
            "name": "finalizeBlocksWithoutProof",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
              }
            ],
            "name": "getRoleAdmin",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
              },
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "grantRole",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
              },
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "hasRole",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "name": "inboxL2L1MessageStatus",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "_initialStateRootHash",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "_initialL2BlockNumber",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "_defaultVerifier",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_securityCouncil",
                "type": "address"
              },
              {
                "internalType": "address[]",
                "name": "_operators",
                "type": "address[]"
              },
              {
                "internalType": "uint256",
                "name": "_rateLimitPeriodInSeconds",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_rateLimitAmountInWei",
                "type": "uint256"
              }
            ],
            "name": "initialize",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "limitInWei",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "nextMessageNumber",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "name": "outboxL1L2MessageStatus",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "_pauseType",
                "type": "bytes32"
              }
            ],
            "name": "pauseByType",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "name": "pauseTypeStatuses",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "periodInSeconds",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
              },
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "renounceRole",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "resetAmountUsedInPeriod",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
              }
            ],
            "name": "resetRateLimitAmount",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
              },
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "revokeRole",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "_fee",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "_calldata",
                "type": "bytes"
              }
            ],
            "name": "sendMessage",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "sender",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_newVerifierAddress",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "_proofType",
                "type": "uint256"
              }
            ],
            "name": "setVerifierAddress",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "stateRootHashes",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
              }
            ],
            "name": "supportsInterface",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "_pauseType",
                "type": "bytes32"
              }
            ],
            "name": "unPauseByType",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "verifiers",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "stateMutability": "payable",
            "type": "receive"
          }
        ]

    </details>

  - Contracts:
    - [Transparent Proxy](https://goerli.etherscan.io/address/0x70BaD09280FD342D02fe64119779BC1f0791BAC2#readProxyContract)
    - [Implementation](https://goerli.etherscan.io/address/0x2652e1547Ac6b9a0311cF1B7F024a378f30ad8D8#code)

- **L2 (Linea)**:

  - Bridging partners, to send messages, will need to call the new contract address with a different ABI.
       <details>
        <summary>
          zkEVM2.abi
        </summary>

          [
            {
              "inputs": [],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [],
              "name": "EmptyMessageHashesArray",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                }
              ],
              "name": "FeePaymentFailed",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "FeeTooLow",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "pauseType",
                  "type": "bytes32"
                }
              ],
              "name": "IsPaused",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "LimitIsZero",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "MessageAlreadyClaimed",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "length",
                  "type": "uint256"
                }
              ],
              "name": "MessageHashesListLengthHigherThanOneHundred",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "destination",
                  "type": "address"
                }
              ],
              "name": "MessageSendingFailed",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "PeriodIsZero",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "RateLimitExceeded",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "ValueSentTooLow",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "ValueShouldBeGreaterThanFee",
              "type": "error"
            },
            {
              "inputs": [],
              "name": "ZeroAddressNotAllowed",
              "type": "error"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "resettingAddress",
                  "type": "address"
                }
              ],
              "name": "AmountUsedInPeriodReset",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint8",
                  "name": "version",
                  "type": "uint8"
                }
              ],
              "name": "Initialized",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "bytes32",
                  "name": "messageHash",
                  "type": "bytes32"
                }
              ],
              "name": "L1L2MessageClaimed",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "bytes32[]",
                  "name": "messageHashes",
                  "type": "bytes32[]"
                }
              ],
              "name": "L1L2MessageHashesAddedToInbox",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "amountChangeBy",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "amountUsedLoweredToLimit",
                  "type": "bool"
                }
              ],
              "name": "LimitAmountChange",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "bytes32",
                  "name": "_messageHash",
                  "type": "bytes32"
                }
              ],
              "name": "MessageClaimed",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_from",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_to",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "_fee",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "_value",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "_nonce",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "bytes",
                  "name": "_calldata",
                  "type": "bytes"
                },
                {
                  "indexed": true,
                  "internalType": "bytes32",
                  "name": "_messageHash",
                  "type": "bytes32"
                }
              ],
              "name": "MessageSent",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "messageSender",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bytes32",
                  "name": "pauseType",
                  "type": "bytes32"
                }
              ],
              "name": "Paused",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "bytes32",
                  "name": "role",
                  "type": "bytes32"
                },
                {
                  "indexed": true,
                  "internalType": "bytes32",
                  "name": "previousAdminRole",
                  "type": "bytes32"
                },
                {
                  "indexed": true,
                  "internalType": "bytes32",
                  "name": "newAdminRole",
                  "type": "bytes32"
                }
              ],
              "name": "RoleAdminChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "bytes32",
                  "name": "role",
                  "type": "bytes32"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
                }
              ],
              "name": "RoleGranted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "bytes32",
                  "name": "role",
                  "type": "bytes32"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
                }
              ],
              "name": "RoleRevoked",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "messageSender",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bytes32",
                  "name": "pauseType",
                  "type": "bytes32"
                }
              ],
              "name": "UnPaused",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "DEFAULT_ADMIN_ROLE",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "GENERAL_PAUSE_TYPE",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "INBOX_STATUS_CLAIMED",
              "outputs": [
                {
                  "internalType": "uint8",
                  "name": "",
                  "type": "uint8"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "INBOX_STATUS_RECEIVED",
              "outputs": [
                {
                  "internalType": "uint8",
                  "name": "",
                  "type": "uint8"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "INBOX_STATUS_UNKNOWN",
              "outputs": [
                {
                  "internalType": "uint8",
                  "name": "",
                  "type": "uint8"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "L1_L2_MESSAGE_SETTER_ROLE",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "L1_L2_PAUSE_TYPE",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "L2_L1_PAUSE_TYPE",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "MINIMUM_FEE_SETTER_ROLE",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "PAUSE_MANAGER_ROLE",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "PROVING_SYSTEM_PAUSE_TYPE",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "RATE_LIMIT_SETTER_ROLE",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_l1l2MessageSetter",
                  "type": "address"
                }
              ],
              "name": "__L2MessageManager_init",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32[]",
                  "name": "_messageHashes",
                  "type": "bytes32[]"
                }
              ],
              "name": "addL1L2MessageHashes",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_from",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "_to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "_fee",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_value",
                  "type": "uint256"
                },
                {
                  "internalType": "address payable",
                  "name": "_feeRecipient",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "_calldata",
                  "type": "bytes"
                },
                {
                  "internalType": "uint256",
                  "name": "_nonce",
                  "type": "uint256"
                }
              ],
              "name": "claimMessage",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "currentPeriodAmountInWei",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "currentPeriodEnd",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "role",
                  "type": "bytes32"
                }
              ],
              "name": "getRoleAdmin",
              "outputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "role",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "grantRole",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "role",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "hasRole",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                }
              ],
              "name": "inboxL1L2MessageStatus",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_securityCouncil",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "_l1l2MessageSetter",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "_rateLimitPeriod",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_rateLimitAmount",
                  "type": "uint256"
                }
              ],
              "name": "initialize",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "limitInWei",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "minimumFee",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "nextMessageNumber",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "_pauseType",
                  "type": "bytes32"
                }
              ],
              "name": "pauseByType",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                }
              ],
              "name": "pauseTypeStatuses",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "periodInSeconds",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "role",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "renounceRole",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "resetAmountUsedInPeriod",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
                }
              ],
              "name": "resetRateLimitAmount",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "role",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "revokeRole",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "_fee",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "_calldata",
                  "type": "bytes"
                }
              ],
              "name": "sendMessage",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "sender",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_fee",
                  "type": "uint256"
                }
              ],
              "name": "setMinimumFee",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes4",
                  "name": "interfaceId",
                  "type": "bytes4"
                }
              ],
              "name": "supportsInterface",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "bytes32",
                  "name": "_pauseType",
                  "type": "bytes32"
                }
              ],
              "name": "unPauseByType",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "stateMutability": "payable",
              "type": "receive"
            }
          ]

      </details>

  - Contracts
    - [Transparent Proxy](https://explorer.goerli.linea.build/address/0xC499a572640B64eA1C8c194c43Bc3E19940719dC/contracts#address-tabs)
    - [Implementation](https://explorer.goerli.linea.build/address/0xc0557e2149751e201749b87f86acd91DB22e2662/contracts#address-tabs)

- Bridging partners, before sending messages on L2, need to retrieve the service protection fee before sending messages and include it in the value sent.

If you have any questions, please reach out in the **Developer Support** channel in our [community forum](https://community.linea.build/c/developer-support)!
