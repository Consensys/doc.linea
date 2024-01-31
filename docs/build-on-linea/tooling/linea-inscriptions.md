---
title: "Linea Inscriptions"
id: "linea-inscription"
---

# Inscriptions, the Linea way

## What are Inscriptions?

Bitcoin inscriptions are a method of adding metadata to the smallest unit of Bitcoin, a satoshi (sat). Various types of data, including images, videos, messages, etc., can be "inscribed" onto the Bitcoin blockchain to create NFTs. This concept has been adapted for the Ethereum blockchain, where it's known as ["Ethscriptions"](https://docs.ethscriptions.com/overview/introducing-ethscriptions).

## Implementation

Traditionally, calldata is the most straightforward method for implementing inscriptions. However, this approach can become quite expensive on L1 during finalization by the sequencer, which in turn can drive up the price on L2 for users to maintain profitability.

To avoid this increase in costs, Linea recommends following [ESIP-3](https://docs.ethscriptions.com/esips/accepted-esips/esip-3-smart-contract-ethscription-creations), for creating inscriptions. This is because events and subcalls do not involve any finalization costs on L1, making them a more cost-effective option for users.

:::info
[Attention]

**_We want to emphasize that this is the best and only method for creating inscriptions on Linea that we will support._** 

Any team that is building tools for inscriptions or issuing inscriptions will receive our support, including marketing support, only if they use this pattern documented in ESIP-3.

Special thanks to the Lins20 and Carpenter teams! Their collaboration and support were invaluable in creating this reference implementation. 

:::

This is implemented by emitting an event:

```bash
event ethscriptions_protocol_CreateEthscription(
    address indexed initialOwner,
    string contentURI
);
```

:::tip

- `initialOwner`is usually the msg.sender.
- `contentURI` should be crafted by minimizing the amount of calldata.

Linea recommends loading it (at least partially) from the contract code to reduce the amount of calldata that has to be passed to the contract.

:::

## Code Examples

<!-- We need some more here.
- What are the addresses? List them here, and link them on important contracts page.
- Explain what these are
- Explain at a high level what you do with them
- Sample code for interacting with them, getting information from them
  - List the methods available? Is `mint` the only one? 
  - We could point to Lineascan's built-in contract interaction capabilities, etc.-->

### Ethscription.sol

```
solidity

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;


import "./IEthscription.sol";


  /**
  * @title Contract for writing inscriptions.
  * @author Insert your name here.
  * @notice The inscription points to an external CONTENT_URI for the data.
  * @dev See the full ESIP-3 specification for URI format, all events and functions.
  */
contract Ethscription is IEthscription {
    string constant CONTENT_URI = '0x646174613a2c7b2270223a226572632d3230222c226f70223a226d696e74222c227469636b223a2266616972222c22616d74223a2231303030227d';


   /**
   * @notice Mints a new Ethscription.
   * @dev CONTENT_URI is set on contract deployment.
   */
    function mint() external {
        emit ethscriptions_protocol_CreateEthscription(msg.sender, CONTENT_URI);
    }
}
```

### IEthscription.sol

```
solidity

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;


  /**
  * @title Contract for writing inscriptions.
  * @author Insert your name here.
  * @notice The inscription points to an external CONTENT_URI for the data.
  * @dev See the full ESIP-3 specification for URI format, all events and functions.
  */
  interface IEthscription {
    event ethscriptions_protocol_CreateEthscription(
        address indexed initialOwner,
        string contentURI
    );


    event ethscriptions_protocol_TransferEthscriptionForPreviousOwner(
        address indexed previousOwner,
        address indexed recipient,
        bytes32 indexed id
    );
}
```
