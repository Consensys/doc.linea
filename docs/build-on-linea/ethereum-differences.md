---
description: Ethereum and Linea differences
sidebar_position: 4
---

# Differences between Ethereum and Linea

## EVM opcodes

Linea uses the London version of the EVM. All EVM opcodes are managed identically to Ethereum London unless presented in the following table. Checkout [Ethereum's history](https://ethereum.org/en/history/) to see learn about major milestones, forkes, and updates to the blockchain.

> ⚠️ At the moment we do not support the `eth_newFilter` and `eth_newBlockFilter` RPC calls.
>

| Opcode name | Ethereum | Linea |
| --- | --- | --- |
| `DIFFICULTY` / `PREVRANDAO` | Returns the RANDAO value from the previous block | Returns a fixed number |

_In Ethereum, this opcode was previously known as_ `DIFFICULTY`. _However, through the implementation of_ [EIP-4399](https://eips.ethereum.org/EIPS/eip-4399), _it was renamed to_ `PREVRANDAO`, _and its functionality changed due to the switch from PoW to PoS. Notably, it is a full 256-bit value that represents the randomness beacon output of the previous block. For more, see the 'Security Considerations' section of the above EIP._

_Consult the Ethereum Foundation's_ [Opcode Reference](https://ethereum.org/en/developers/docs/evm/opcodes/) _for more._
