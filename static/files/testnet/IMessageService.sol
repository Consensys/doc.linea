pragma solidity ^0.8.19;

interface IMessageService {
  /**
   * @dev Emitted when a message is sent.
   * @dev We include the message hash to save hashing costs on the rollup.
   */
  event MessageSent(
    address indexed _from,
    address indexed _to,
    uint256 _fee,
    uint256 _value,
    uint256 _nonce,
    bytes _calldata,
    bytes32 indexed _messageHash
  );

  /**
   * @dev Emitted when a message is claimed.
   */
  event MessageClaimed(bytes32 indexed _messageHash);

  /**
   * @dev Thrown when fees are lower than the minimum fee.
   */
  error FeeTooLow();

  /**
   * @dev Thrown when fees are lower than value.
   */
  error ValueShouldBeGreaterThanFee();

  /**
   * @dev Thrown when the value sent is less than the fee.
   * @dev Value to forward on is msg.value - _fee.
   */
  error ValueSentTooLow();

  /**
   * @dev Thrown when the destination address reverts.
   */
  error MessageSendingFailed(address destination);

  /**
   * @dev Thrown when the destination address reverts.
   */
  error FeePaymentFailed(address recipient);

  /**
   * @notice Sends a message for transporting from the given chain.
   * @dev This function should be called with a msg.value = _value + _fee. The fee will be paid on the destination chain.
   * @param _to The destination address on the destination chain.
   * @param _fee The message service fee on the origin chain.
   * @param _calldata The calldata used by the destination message service to call the destination contract.
   */
  function sendMessage(address _to, uint256 _fee, bytes calldata _calldata) external payable;

  /**
   * @notice Deliver a message to the destination chain.
   * @notice Is called automatically by the Postman, dApp or end user.
   * @param _from The msg.sender calling the origin message service.
   * @param _to The destination address on the destination chain.
   * @param _value The value to be transferred to the destination address.
   * @param _fee The message service fee on the origin chain.
   * @param _feeRecipient Address that will receive the fees.
   * @param _calldata The calldata used by the destination message service to call/forward to the destination contract.
   * @param _nonce Unique message number.
   */
  function claimMessage(
    address _from,
    address _to,
    uint256 _fee,
    uint256 _value,
    address payable _feeRecipient,
    bytes calldata _calldata,
    uint256 _nonce
  ) external;

  /**
   * @notice Returns the original sender of the message on the origin layer.
   * @return The original sender of the message on the origin layer.
   */
  function sender() external view returns (address);
}