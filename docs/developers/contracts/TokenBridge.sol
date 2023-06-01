pragma solidity ^0.8.19;

interface TokenBridge {

  event TokenReserved(address token);
  event CustomContractSet(address nativeToken, address customContract);
  event BridgingInitiated(address sender, address recipient, address token, uint256 amount);
  event BridgingFinalized(address nativeToken, address bridgedToken, uint256 amount, address recipient);
  event NewToken(address token);
  event NewTokenDeployed(address bridgedToken);

  error NotMessagingService(address sender, address messageService);
  error NotFromRemoteTokenBridge(address sender, address tokenBridge);
  error ReservedToken(address token);
  error RemoteTokenBridgeAlreadySet(address remoteTokenBridge);
  error AlreadyBridgedToken(address token);
  error InvalidPermitData(bytes4 permitData, bytes32 permitSelector);
  error PermitNotFromSender(address owner);
  error PermitNotAllowingBridge(address spender);
  error ZeroAddressNotAllowed(address addr);
  error ZeroAmountNotAllowed(uint256 amount);

  /**
  @dev User should first allow the bridge to transfer tokens on his behalf. Alternatively, you can pass permit data to do so in a single transaction.
    If you want the transfer to be automatically executed on the destination chain. You should send enough ETH to pay the postmen fees.
    Note that Linea can reserved some tokens (which use a dedicated bridge). In this case, the token cannot be bridged. Linea can only reserved tokens that are not been bridged yet.
    Linea can pause the bridge for security reason. In this case new bridge transaction would revert.

  @notice This function is the single entry point to bridge tokens to the other chain, both for native and already bridged tokens.
    You can use it to bridge any ERC20. If the token is bridged for the first time an ERC20 (BridgedToken.sol) will be automatically deployed on the target chain.

    @param token The address of the token to be bridged.
    @param amount The amount of the token to be bridged.
    @param recipient The address that will receive the bridged tokens on the other blockchain.
  */
  function bridgeToken(
    address token,
    uint256 amount,
    address recipient
  ) public payable;

  function bridgeTokenWithPermit(
    address token,
    uint256 amount,
    address recipient,
    bytes calldata permitData
  ) external payable;
}