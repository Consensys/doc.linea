// SPDX-License-Identifier: OWNED BY Consensys Software Inc.
pragma solidity ^0.8.19;

import "./interfaces/IMessageService.sol";

/**
 * @title Base contract to manage cross-chain messaging.
 * @author Consensys Software Inc.
 */
abstract contract MessageServiceBase {
  IMessageService public messageService;
  address public remoteSender;

  uint256[10] private __base_gap;

  /**
   * @dev Thrown when the caller address is not the message service address
   */
  error CallerIsNotMessageService();

  /**
   * @dev Thrown when remote sender address is not authorized.
   */
  error SenderNotAuthorized();

  /**
   * @dev Thrown when an address is the default zero address.
   */
  error ZeroAddressNotAllowed();

  /**
   * @dev Modifier to make sure the caller is the known message service.
   *
   * Requirements:
   *
   * - The msg.sender must be the message service.
   */
  modifier onlyMessagingService() {
    if (msg.sender != address(messageService)) {
      revert CallerIsNotMessageService();
    }
    _;
  }

  /**
   * @dev Modifier to make sure the original sender is allowed.
   *
   * Requirements:
   *
   * - The original message sender via the message service must be a known sender.
   */
  modifier onlyAuthorizedRemoteSender() {
    if (messageService.sender() != remoteSender) {
      revert SenderNotAuthorized();
    }
    _;
  }

  /**
   * @notice Initializes the message service and remote sender address
   * @dev Must be initialized in the initialize function of the main contract or constructor
   * @param _messageService The message service address, cannot be empty.
   * @param _remoteSender The authorized remote sender address, cannot be empty.
   **/
  function _init_MessageServiceBase(address _messageService, address _remoteSender) internal {
    if (_messageService == address(0)) {
      revert ZeroAddressNotAllowed();
    }

    if (_remoteSender == address(0)) {
      revert ZeroAddressNotAllowed();
    }

    messageService = IMessageService(_messageService);
    remoteSender = _remoteSender;
  }
}