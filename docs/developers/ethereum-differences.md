---
description: Ethereum and Linea differences
sidebar_position: 3
---

# Differences between Ethereum and Linea

## EVM opcodes

All EVM opcodes are managed identically to Ethereum unless presented in the following table.

| Opcode name                 | Ethereum                                         | Linea                  |
| --------------------------- | ------------------------------------------------ | ---------------------- |
| `DIFFICULTY` / `PREVRANDAO` | Returns the RANDAO value from the previous block | Returns a fixed number |

*In Ethereum, this opcode was previously known as* `DIFFICULTY`. *However, through the implementation of* (EIP-4399)[https://eips.ethereum.org/EIPS/eip-4399], *it was renamed to* `PREVRANDAO`, *and its functionality changed due to the switch from PoW to PoS. Notably, it is a full 256-bit value that represents the randomness beacon output of the previous block. For more, see the 'Security Considerations' section of the above EIP.*

*Consult the Ethereum Foundation's (Opcode Reference)[https://ethereum.org/en/developers/docs/evm/opcodes/] for more.
