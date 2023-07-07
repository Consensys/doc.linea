// SPDX-License-Identifier: OWNED BY Consensys Software Inc.
pragma solidity ^0.8.15;

/// @title The bridge interface implemented on both chains
interface IBridge {
  /// @notice Emitted on the origin chain when a message is to be sent to the destination chain
  /// @param _from the msg.sender calling the origin bridge
  /// @param _to the destination contract on the destination chain
  /// @param _fee the bridge fee on the origin chain
  /// @param _value the value to be transferred
  /// @param _deadline timestamp as second since unix epoch after which the transaction is invalid and can be dropped
  /// @param _calldata the calldata used by the destination bridge to call the destination contract
  /// @dev _calldata can be calculated using abi.encodeWithSignature("transfer(address,uint256)", recipient, amount))
  event MessageDispatched(
    address _from,
    address _to,
    uint256 _fee,
    uint256 _value,
    uint256 _deadline,
    bytes _calldata
  );

  /// @notice Emitted on the destination chain when a message has been received by the destination bridge
  /// @param _from the msg.sender calling the origin bridge
  /// @param _to the destination contract on the destination chain
  /// @param _fee the bridge fee on the origin chain
  /// @param _value the value to be transferred
  /// @param _deadline timestamp as second since unix epoch after which the transaction is invalid and can be dropped
  /// @param _calldata the calldata used by the destination bridge to call the destination contract
  /// @dev _calldata can be calculated using abi.encodeWithSignature("transfer(address,uint256)", recipient, amount))
  event MessageDelivered(
    address _from,
    address _to,
    uint256 _fee,
    uint256 _value,
    uint256 _deadline,
    bytes _calldata
  );

  /// @notice Dispatches a message from the given chain. Must be called by a developer or another contract.
  /// @notice If this is the L2 bridge, then this methods dispatches a message from L2 to L1.
  /// @dev This function should be called with a value > _fee. The reminder will be sent on the destination chain.
  /// @param _to the destination contract on the destination chain
  /// @param _fee the bridge fee on the origin chain
  /// @param _deadline timestamp as second since unix epoch after which the transaction is invalid and can be dropped
  /// @param _calldata the calldata used by the destination bridge to call the destination contract
  function dispatchMessage(
    address _to,
    uint256 _fee,
    uint256 _deadline,
    bytes calldata _calldata
  ) external payable;

  /// @notice Deliver a message to the destination chain.
  /// @notice Is called automatically by the operator. Cannot be used by developers
  /// @param _from the msg.sender calling the origin bridge
  /// @param _to the destination contract on the destination chain
  /// @param _fee the bridge fee on the origin chain
  /// @param _value the value to be transferred
  /// @param _deadline timestamp as second since unix epoch after which the transaction is invalid and can be dropped
  /// @param _calldata the calldata used by the destination bridge to call the destination contract
  function deliverMessage(
    address _from,
    address _to,
    uint256 _fee,
    uint256 _value,
    uint256 _deadline,
    bytes calldata _calldata
  ) external payable;

  /// @notice When called within the context of the delivered call can be used to return the sender (_from)
  /// @notice on the origin chain otherwise returns the zero address.
  /// @return Address of the caller contract on the origin chain.
  function sender() external view returns (address);
}
