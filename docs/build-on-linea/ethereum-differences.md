---
description: Ethereum and Linea differences
sidebar_position: 4
image: /img/socialCards/ethereum-and-linea-differences.jpg
---

# Differences between Ethereum and Linea

## EVM opcodes

**Linea uses the London version of the Ethereum Virtual Machine (EVM). All EVM opcodes are managed identically to Ethereum London unless presented in the following table.**

Check out [Ethereum's history](https://ethereum.org/en/history/) to learn about major milestones, forks, and updates to the blockchain.

> ⚠️ At the moment we do not support the `eth_newFilter` and `eth_newBlockFilter` RPC calls.

| Opcode name | Ethereum | Linea | Explanation |
| --- | --- | --- | --- |
| `DIFFICULTY` / `PREVRANDAO` | Returns the RANDAO value from the previous block | Returns a fixed number | _In Ethereum, `PREVRANDAO` was previously known as_ `DIFFICULTY`. _However, through the implementation of_ [EIP-4399](https://eips.ethereum.org/EIPS/eip-4399), _it was renamed to_ `PREVRANDAO`, _and its functionality changed due to the switch from PoW to PoS. Notably, it is a full 256-bit value that represents the randomness beacon output of the previous block. For more, see the 'Security Considerations' section of the above EIP._ |
| `PUSH0` | Pushes the constant value 0 onto the stack | Pushes the constant value 0 onto the stack if Solidity compiler compatibility is implemented | The PUSH0 opcode compatibility was introduced in Solidity compiler version 0.8.20, which came after the London release. However, Linea currently supports Solidity compiler version 0.8.19 and lower, which aligns with the London release of the Ethereum mainnet. To resolve this issue, please recompile your contract using Solidity version 0.8.19 or lower. |

_Consult the Ethereum Foundation's_ [Opcode Reference](https://ethereum.org/en/developers/docs/evm/opcodes/) _for more._
