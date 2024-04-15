
# Tellor

Tellor pushes the horizon of the oracle far past arbitrary price data. The Tellor oracle is a protocol for
answering verifiable on-chain queries of any format.  The Tellor protocol incentivizes an open, permissionless network of data reporting and data validation, ensuring that data can be provided by anyone and checked by everyone.
Built for any data type, our network of reporters supports your basic spot prices, more sophisticated pricing specs (TWAP/VWAP), RNG, or any custom data needs you have. If your data can be verified, Tellor can bring it on-chain.

## How it works

The oracle mechanism works by using simple crypto-economic incentives to secure data through staking
and dispute mechanisms, while the protocol is bound by a token which utilizes
governance and monetary incentives to reward data reporters and development of the network.

At a high level, Tellor is an oracle system where a bonded set of “reporters” answer questions on-chain
for others to use freely. To create a properly incentivized system, Tellor mints a native token, “Tributes”
(TRB). Rewards in TRB incentivize reporters to submit data using peer-to-peer payments. Using TRB, parties can “tip” a specific question or “query” they want updated, then reporters can choose whether the reward for fetching the data is worth the cost of placing the value on-chain. The security of Tellor comes through a deposit of TRB that acts as a bond or stake requirement in order for reporters to participate in providing data. The reporters risk losing this stake if they submit data that is successfully disputed.

## Getting started
To use Tellor data, you can use the [UsingTellor](https://github.com/tellor-io/usingtellor) helper contract. After connecting it to the oracle you can read a value using your queryid.  Follow the guides in our [documentation](https://docs.tellor.io) for further instruction.


> **Looking for help getting started?** We welcome you to ask us anything in the developers' channel of our [Discord server.](https://discord.gg/tellor)  

## Requesting data feeds
Tellor's network of data reporters already actively supports a large variety of price/data feeds and adding new ones upon request can happen with a quick turnaround.  You can even do it permissionlessly.  For both price feed requests and non-price/custom feeds, anyone can submit a data specification and get their query supported by Tellor.  

-[Current price feeds](https://github.com/tellor-io/telliot-feeds/tree/main/src/telliot_feeds/feeds)

-[New data request form](https://github.com/tellor-io/dataSpecs/issues/new?assignees=&labels=&template=new_query_type.yaml&title=%5BNew+Query+Type%5D%3A+)

-[Custom data type examples](https://github.com/tellor-io/dataSpecs/tree/main/types)

## Tellor Contracts On Linea

**Linea Goerli Testnet**

* Token: [0x896419Ed2E0dC848a1f7d2814F4e5Df4b9B9bFcc](https://goerli.lineascan.build/address/0x896419Ed2E0dC848a1f7d2814F4e5Df4b9B9bFcc#code)
* Oracle: [0x6684E5DdbEe1b97E10847468cB5f4e38f3aB83FE](https://goerli.lineascan.build/address/0x6684E5DdbEe1b97E10847468cB5f4e38f3aB83FE)
* Governance: [0x9EA18BFDB50E9bb4A18F9d3Df7804E398F8fE0dc](https://goerli.lineascan.build/address/0x9EA18BFDB50E9bb4A18F9d3Df7804E398F8fE0dc)
* Autopay: [0xe331Afe3a8D7836bEdF1F09bC91549f4bc8c60C9](https://goerli.lineascan.build/address/0xe331Afe3a8D7836bEdF1F09bC91549f4bc8c60C9)

**Linea Mainnet**

* Token: [0x35482B93941B439dEA2244Cc30A20D1Ed862DF86](https://lineascan.build/token/0x35482b93941b439dea2244cc30a20d1ed862df86)
* Oracle: [0x896419Ed2E0dC848a1f7d2814F4e5Df4b9B9bFcc](https://lineascan.build/address/0x896419ed2e0dc848a1f7d2814f4e5df4b9b9bfcc#code)
* Governance: [0xC866DB9021fe81856fF6c5B3E3514BF9D1593D81](https://lineascan.build/address/0xC866DB9021fe81856fF6c5B3E3514BF9D1593D81)
* Autopay: [0x9EA18BFDB50E9bb4A18F9d3Df7804E398F8fE0dc](https://lineascan.build/address/0x9EA18BFDB50E9bb4A18F9d3Df7804E398F8fE0dc)

