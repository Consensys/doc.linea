---
title: API3
image: /img/socialCards/api3.jpg
---

[API3](https://api3.org/) is a collaborative project to deliver traditional API services to smart contract platforms in a decentralized and trust-minimized way. It is governed by a decentralized autonomous organization (DAO), namely the [API3 DAO](https://api3.org/dao).

:::info

The API3 DAO Read more about how The API3 DAO works. [Click here](https://docs.api3.org/explore/dao-members/)

:::

## Airnode

Developers can use [Airnode](https://docs.api3.org/explore/airnode/what-is-airnode.html) to request off-chain data inside their Smart Contracts on Linea. An Airnode is a first-party oracle that pushes off-chain API data to your on-chain contract. Airnode lets API providers easily run their own first-party oracle nodes. That way, they can provide data to any on-chain dApp that's interested in their services, all without an intermediary.

An on-chain smart contract makes a request in the [RRP (Request Response Protocol)](https://docs.api3.org/reference/airnode/latest/concepts/) contract (`AirnodeRrpV0.sol`) that adds the request to the event logs. The Airnode then accesses the event logs, fetches the API data and performs a callback to the requester with the requested data.

<div class="center-container">
  <div class="img-medium">
      <img
        src="/img/article_images/Build_on_Linea/Tooling_and_infrastructure/Oracles/API3/API3_airnode_1.png"
        alt="Airnode"
      />
  </div>
</div>

## Requesting off-chain data by calling an Airnode

Requesting off-chain data essentially involves triggering an Airnode and getting its response through your smart contract. The smart contract in this case would be the requester contract which will make a request to the desired off-chain Airnode and then capture its response.

The requester calling an Airnode primarily focuses on two tasks:

- Make the request
- Accept and decode the response

<div class="center-container">
  <div class="img-medium">
      <img
        src="/img/article_images/Build_on_Linea/Tooling_and_infrastructure/Oracles/API3/API3_airnode_2.png"
        alt="Airnode"
      />
  </div>
</div>

**Here is an example of a basic requester contract to request data from an Airnode:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol";
import "@openzeppelin/contracts@4.9.5/access/Ownable.sol";

// A Requester that will return the requested data by calling the specified Airnode.
contract Requester is RrpRequesterV0, Ownable {
    mapping(bytes32 => bool) public incomingFulfillments;
    mapping(bytes32 => int256) public fulfilledData;

    // Make sure you specify the right _rrpAddress for your chain while deploying the contract.
    constructor(address _rrpAddress) RrpRequesterV0(_rrpAddress) {}

    // To receive funds from the sponsor wallet and send them to the owner.
    receive() external payable {
        payable(owner()).transfer(address(this).balance);
    }

    // The main makeRequest function that will trigger the Airnode request.
    function makeRequest(
        address airnode,
        bytes32 endpointId,
        address sponsor,
        address sponsorWallet,
        bytes calldata parameters

    ) external {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode,                        // airnode address
            endpointId,                     // endpointId
            sponsor,                        // sponsor's address
            sponsorWallet,                  // sponsorWallet
            address(this),                  // fulfillAddress
            this.fulfill.selector,          // fulfillFunctionId
            parameters                      // encoded API parameters
        );
        incomingFulfillments[requestId] = true;
    }

    function fulfill(bytes32 requestId, bytes calldata data)
        external
        onlyAirnodeRrp
    {
        require(incomingFulfillments[requestId], "No such request made");
        delete incomingFulfillments[requestId];
        int256 decodedData = abi.decode(data, (int256));
        fulfilledData[requestId] = decodedData;
    }

    // To withdraw funds from the sponsor wallet to the contract.
    function withdraw(address airnode, address sponsorWallet) external onlyOwner {
        airnodeRrp.requestWithdrawal(
        airnode,
        sponsorWallet
        );
    }
}
```

The `_rrpAddress` is the main `airnodeRrpAddress`. The RRP Contracts have already been deployed on-chain. You can also try [deploying it on Remix](https://remix.ethereum.org/#url=https://github.com/api3-ecosystem/remix-contracts/blob/master/contracts/RequesterWithWithdrawal.sol&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.9+commit.e5eed63a.js)

|   Contract   |                  Addresses                   |
| :----------: | :------------------------------------------: |
| AirnodeRrpV0 | `0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd` |

### Request parameters

The `makeRequest()` function expects the following parameters to make a valid request.

- [**`airnode`**](https://docs.api3.org/reference/airnode/latest/concepts/airnode.html): Specifies the Airnode Address.
- [**`endpointId`**](https://docs.api3.org/reference/airnode/latest/concepts/endpoint.html): Specifies which endpoint to be used.
- [**`sponsor`**](https://docs.api3.org/reference/airnode/latest/concepts/sponsor.html) and [**`sponsorWallet`**](https://docs.api3.org/reference/airnode/latest/concepts/sponsor.html#sponsorwallet): Specifies which wallet will be used to fulfill the request.
- [**`parameters`**](https://docs.api3.org/reference/ois/latest/reserved-parameters.html): Specifies the API and Reserved Parameters (see [Airnode ABI specifications](https://docs.api3.org/reference/ois/latest/) for how these are encoded). Parameters can be encoded off-chain using `@airnode-abi` library.

### Response parameters

The callback to the Requester contains two parameters:

- [**`requestId`**](https://docs.api3.org/reference/airnode/latest/concepts/request.html#requestid): First acquired when making the request and passed here as a reference to identify the request for which the response is intended.
- **`data`**: In case of a successful response, this is the requested data which has been encoded and contains a timestamp in addition to other response data. Decode it using the `decode()` function from the `abi` object.

:::note

Sponsors should not fund a `sponsorWallet` with more then they can trust the Airnode with, as the Airnode controls the private key to the `sponsorWallet`. The deployer of such Airnode undertakes no custody obligations, and the risk of loss or misuse of any excess funds sent to the `sponsorWallet` remains with the sponsor.

:::

[Try deploying it on Remix!](https://remix.ethereum.org/#url=https://github.com/api3-ecosystem/remix-contracts/blob/master/contracts/RequesterWithWithdrawal.sol&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.9+commit.e5eed63a.js)

## Using dAPIs - API3 datafeeds

[dAPIs](https://docs.api3.org/reference/dapis/understand/) are continuously updated streams of off-chain data, such as the latest cryptocurrency, stock and commodity prices. They can power various decentralized applications such as DeFi lending, synthetic assets, stablecoins, derivatives, NFTs and more.

The data feeds are continuously updated by [first-party oracles](https://docs.api3.org/explore/introduction/first-party.html) using signed data. dApp owners can read the on-chain value of any dAPI in real-time.

Due to being composed of first-party data feeds, dAPIs offer security, transparency, cost-efficiency and scalability in a turn-key package.

Apart from relying on deviation threshold and heartbeat configuration updates, unlike traditional data feeds, [OEV Network](https://docs.api3.org/explore/introduction/oracle-extractable-value.html) enables dApps using dAPIs to auction off the right to update the data feeds to searcher bots. Searcher bots can bid for price updates through the OEV Network to update the data feeds. All the OEV proceeds go back to the dApp.

The [API3 Market](https://market.api3.org/linea) enables users to connect to a dAPI and access the associated data feed services.

<div class="center-container">
  <div class="img-large">
      <img
        src="/img/article_images/Build_on_Linea/Tooling_and_infrastructure/Oracles/API3/dapi-main.png"
        alt="dapi-main"
      />
  </div>
</div>

[_To learn more about how dAPIs work, click here_](https://docs.api3.org/explore/dapis/what-are-dapis.html)

### Subscribing to dAPIs

The [API3 Market](https://market.api3.org/linea) lets users access dAPIs on both [Linea Mainnet](https://market.api3.org/linea) and [Testnet](https://market.api3.org/linea-sepolia-testnet).

#### Exploring, selecting and configuring your dAPI

The [API3 Market](https://market.api3.org/linea) provides a list of all the dAPIs available across multiple chains including testnets. You can filter the list by mainnet or testnet chains. After selecting the chain, you can now search for a specific dAPI by name. Once selected, you will land on the details page (eg ETH/USD on Linea Testnet) where you can find more information about the dAPI.

The current supported configurations for dAPIs are:

| Deviation | Heartbeat |
| --------- | --------- |
| 0.25%     | 24 hours  |
| 0.5%      | 24 hours  |
| 1%        | 24 hours  |
| 5%        | 24 hours  |

<div class="center-container">
  <div class="img-large">
      <img
        src="/img/article_images/Build_on_Linea/Tooling_and_infrastructure/Oracles/API3/dapi-1.png"
        alt="dapi-1"
      />
  </div>
</div>

#### Activating your dAPI

:::note

If a dAPI is already activated, make sure to check the expiration date and update parameters. You can update the parameters and extend the subscription by purchasing a new configuration.

:::

After selecting the dAPI and the configuration, you will be presented with an option to purchase the dAPI and activate it. Make sure to check the time and amount of the subscription. If everything looks good, click on Purchase.

<div class="center-container">
  <div class="img-small">
      <img
        src="/img/article_images/Build_on_Linea/Tooling_and_infrastructure/Oracles/API3/dapi-2.png"
        alt="dapi-2"
      />
  </div>
</div>

You can then connect your wallet and confirm the transaction. Once it's confirmed, you will be able to see the updated configuration for the dAPI.

#### Getting the proxy address

Once you are done configuring and activating the dAPI, you can now integrate it. To do so, click on the **Integrate** button on the dAPI details page.

<div class="center-container">
  <div class="img-large">
      <img
        src="/img/article_images/Build_on_Linea/Tooling_and_infrastructure/Oracles/API3/dapi-5.png"
        alt="dapi-5"
      />
  </div>
</div>

You can now see the deployed proxy contract address. You can now use this to read from the configured dAPI.

### Reading from a dAPI

Here's an example of a basic contract that reads from a dAPI.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts@4.9.5/access/Ownable.sol";
import "@api3/contracts/api3-server-v1/proxies/interfaces/IProxy.sol";

contract DataFeedReaderExample is Ownable {
    // The proxy contract address obtained from the API3 Market UI.
    address public proxyAddress;

    // Updating the proxy contract address is a security-critical
    // action. In this example, only the owner is allowed to do so.
    function setProxyAddress(address _proxyAddress) public onlyOwner {
        proxyAddress = _proxyAddress;
    }

    function readDataFeed()
        external
        view
        returns (int224 value, uint256 timestamp)
    {
        // Use the IProxy interface to read a dAPI via its
        // proxy contract .
        (value, timestamp) = IProxy(proxyAddress).read();
        // If you have any assumptions about `value` and `timestamp`,
        // make sure to validate them after reading from the proxy.
    }
}

```

- `setProxyAddress()` is used to set the address of the dAPI Proxy Contract.

- `readDataFeed()` is a view function that returns the latest price of the set dAPI.

You can read more about dAPIs [here](https://docs.api3.org/guides/dapis/subscribing-to-dapis/).

### [Try deploying it on Remix!](https://remix.ethereum.org/#url=https://github.com/api3-ecosystem/remix-contracts/blob/master/contracts/DapiReader.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.18+commit.87f61d96.js)

## API3 QRNG

[API3 QRNG](https://docs.api3.org/explore/qrng/) is a public utility provided with the courtesy of Australian National University (ANU), Quintessence Labs and Quantum Blockchains. It is powered by an Airnode deployed by the QRNG Providers, meaning that it is a first-party service. It is served as a public good and is free of charge (apart from the gas costs), and it provides ‘true’ quantum randomness via an easy-to-use solution when requiring RNG on-chain.

To request randomness on-chain, the requester submits a request for a random number to `AirnodeRrpV0`. The QRNG Airnode gathers the request from the `AirnodeRrpV0` protocol contract, retrieves the random number off-chain, and sends it back to `AirnodeRrpV0`. Once received, it performs a callback to the requester with the random number.

Click here to check out the [`AirnodeRrpV0`](https://docs.api3.org/reference/qrng/chains.html) and available [QRNG Providers' addresses](https://docs.api3.org/reference/qrng/providers.html) on Linea.

Here is an example of a basic `QrngRequester` that requests a random number:

```solidity
//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol";
import "@openzeppelin/contracts@4.9.5/access/Ownable.sol";

/// @title Example contract that uses Airnode RRP to access QRNG services
contract QrngExample is RrpRequesterV0, Ownable {
    event RequestedUint256(bytes32 indexed requestId);
    event ReceivedUint256(bytes32 indexed requestId, uint256 response);
    event RequestedUint256Array(bytes32 indexed requestId, uint256 size);
    event ReceivedUint256Array(bytes32 indexed requestId, uint256[] response);
    event WithdrawalRequested(address indexed airnode, address indexed sponsorWallet);

    address public airnode;                 /// The address of the QRNG Airnode
    bytes32 public endpointIdUint256;       /// The endpoint ID for requesting a single random number
    bytes32 public endpointIdUint256Array;  /// The endpoint ID for requesting an array of random numbers
    address public sponsorWallet;           /// The wallet that will cover the gas costs of the request
    uint256 public _qrngUint256;            /// The random number returned by the QRNG Airnode
    uint256[] public _qrngUint256Array;     /// The array of random numbers returned by the QRNG Airnode

    mapping(bytes32 => bool) public expectingRequestWithIdToBeFulfilled;

    constructor(address _airnodeRrp) RrpRequesterV0(_airnodeRrp) {}

    /// @notice Sets the parameters for making requests
    function setRequestParameters(
        address _airnode,
        bytes32 _endpointIdUint256,
        bytes32 _endpointIdUint256Array,
        address _sponsorWallet
    ) external {
        airnode = _airnode;
        endpointIdUint256 = _endpointIdUint256;
        endpointIdUint256Array = _endpointIdUint256Array;
        sponsorWallet = _sponsorWallet;
    }

    /// @notice To receive funds from the sponsor wallet and send them to the owner.
    receive() external payable {
        payable(owner()).transfer(msg.value);
        emit WithdrawalRequested(airnode, sponsorWallet);
    }

    /// @notice Requests a `uint256`
    /// @dev This request will be fulfilled by the contract's sponsor wallet,
    /// which means spamming it may drain the sponsor wallet.
    function makeRequestUint256() external {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode,
            endpointIdUint256,
            address(this),
            sponsorWallet,
            address(this),
            this.fulfillUint256.selector,
            ""
        );
        expectingRequestWithIdToBeFulfilled[requestId] = true;
        emit RequestedUint256(requestId);
    }

    /// @notice Called by the Airnode through the AirnodeRrp contract to
    /// fulfill the request
    function fulfillUint256(bytes32 requestId, bytes calldata data)
        external
        onlyAirnodeRrp
    {
        require(
            expectingRequestWithIdToBeFulfilled[requestId],
            "Request ID not known"
        );
        expectingRequestWithIdToBeFulfilled[requestId] = false;
        uint256 qrngUint256 = abi.decode(data, (uint256));
        _qrngUint256 = qrngUint256;
        // Do what you want with `qrngUint256` here...
        emit ReceivedUint256(requestId, qrngUint256);
    }

    /// @notice Requests a `uint256[]`
    /// @param size Size of the requested array
    function makeRequestUint256Array(uint256 size) external {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode,
            endpointIdUint256Array,
            address(this),
            sponsorWallet,
            address(this),
            this.fulfillUint256Array.selector,
            // Using Airnode ABI to encode the parameters
            abi.encode(bytes32("1u"), bytes32("size"), size)
        );
        expectingRequestWithIdToBeFulfilled[requestId] = true;
        emit RequestedUint256Array(requestId, size);
    }

    /// @notice Called by the Airnode through the AirnodeRrp contract to
    /// fulfill the request
    function fulfillUint256Array(bytes32 requestId, bytes calldata data)
        external
        onlyAirnodeRrp
    {
        require(
            expectingRequestWithIdToBeFulfilled[requestId],
            "Request ID not known"
        );
        expectingRequestWithIdToBeFulfilled[requestId] = false;
        uint256[] memory qrngUint256Array = abi.decode(data, (uint256[]));
        // Do what you want with `qrngUint256Array` here...
        _qrngUint256Array = qrngUint256Array;
        emit ReceivedUint256Array(requestId, qrngUint256Array);
    }

    /// @notice Getter functions to check the returned value.
    function getRandomNumber() public view returns (uint256) {
        return _qrngUint256;
    }

    function getRandomNumberArray() public view returns(uint256[] memory) {
        return _qrngUint256Array;
    }

    /// @notice To withdraw funds from the sponsor wallet to the contract.
    function withdraw() external onlyOwner {
        airnodeRrp.requestWithdrawal(
        airnode,
        sponsorWallet
        );
    }
}
```

- The `setRequestParameters()` takes in `airnode` (The Quantum Blockchains/Quintessence Airnode address) , `endpointIdUint256`, `sponsorWallet` and sets these parameters. You can get Airnode address and the endpoint ID [here](https://docs.api3.org/reference/qrng/providers.html).

- The `makeRequestUint256()` function calls the `airnodeRrp.makeFullRequest()` function of the `AirnodeRrpV0.sol` protocol contract which adds the request to its storage and returns a `requestId`.

- The targeted off-chain Airnode gathers the request and performs a callback to the requester with the random number.

[Try deploying it on Remix!](https://remix.ethereum.org/#url=https://github.com/api3-ecosystem/remix-contracts/blob/master/contracts/QrngRequesterUpdated.sol&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.9+commit.e5eed63a.js&lang=en)

You can try QRNG on Linea for free. Check out the all the QRNG Providers for Linea [here](https://docs.api3.org/reference/qrng/providers.html).

[Click here to read more about API3 QRNG](https://docs.api3.org/explore/qrng/)

## Additional resources

Here are some additional developer resources

- [API3 Docs](https://docs.api3.org/)
- [API3 Market](https://market.api3.org/linea)
- [dAPI Docs](https://docs.api3.org/guides/dapis/)
- [QRNG Docs](https://docs.api3.org/guides/qrng/)
- [Github](https://github.com/api3dao/)
- [Medium](https://medium.com/api3)
- [YouTube](https://www.youtube.com/API3DAO)
