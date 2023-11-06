// SPDX-License-Identifier: OWNED BY Consensys Software Inc.
pragma solidity ^0.8.15;

import 'IBridge.sol';

/// @title A specialization of the Bridge interface on the L1
interface IL1Bridge is IBridge {
  /// @notice Emitted when a message has been dispatched, delivered and is now confirmed on the original chain
  /// @param messageHash the hash of the message dispatched keccak256(abi.encode(from,to,fee,value,deadline,calldata))
  event MessageConfirmed(bytes32 messageHash);

  /// @notice Drop a message that is past its deadline and refund the sender
  /// @param _from the msg.sender calling the origin bridge
  /// @param _to the destination contract on the destination chain
  /// @param _fee the bridge fee on the origin chain
  /// @param _value the value to be transferred
  /// @param _deadline timestamp as second since unix epoch after which the transaction is invalid and can be dropped
  /// @param _calldata the calldata used by the destination bridge to call the destination contract
  /// @dev _calldata can be calculated using abi.encodeWithSignature("transfer(address,uint256)", recipient, amount))
  function dropMessage(
    address _from,
    address _to,
    uint256 _fee,
    uint256 _value,
    uint256 _deadline,
    bytes calldata _calldata
  ) external payable;
}
