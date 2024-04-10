
# Tellor

Tellor pushes the horizon of the oracle far past arbitrary price data. The Tellor oracle is a protocol for
answering verifiable on-chain query of any format.  The Tellor protocol incentivizes an open, permissionless network of data reporting and data validation, ensuring that data can be provided by anyone and checked by everyone.
Built for any data type, our network of reporters supports your basic spot prices, more sophisticated pricing specs (TWAP/VWAP), RNG, or any custom data needs you have. If your data can be verified, Tellor can bring it on-chain.

## How It Works

The oracle mechanism works by using simple crypto-economic incentives to secure data through staking
and dispute mechanisms, while the protocol is bound by a token which utilizes anonymous
governance system and monetary incentives to reward data reporters and development of the network.

At a high level, Tellor is an oracle system where a bonded set of “reporters” answer questions on-chain
for others to use freely. To create a properly incentivized system, Tellor mints a native token, “Tributes”
(TRB). Rewards in TRB incentivize reporters to submit data using peer-to-peer payments. Using TRB, parties can “tip” a specific question or “query” they want updated, then reporters can choose whether the reward for fetching the data is worth the cost of placing the value on-chain. The security of Tellor comes through a deposit of TRB that acts as a bond or stake requirementin order for reporters to participate in providing data. The reporters risk losing this stake if they submit data that is successfully disputed.

## Getting Started
To use Tellor data, you can use the [UsingTellor](https://github.com/tellor-io/usingtellor) helper contract. After connecting it to the oracle you can read a value using your queryid.  Follow the guides in our [documentation](https://docs.tellor.io) for further instruction.

## Requesting Data Feeds
Tellor's network of data reporters already actively supports a large variety of price/data feeds and adding new ones upon request can happen with a quick turnaround.  You can even do it permissionlessly.  For both price feeds requests and non-price/custom feeds, anyone can submit a data specification and get their query supported by Tellor.  

-[Current Price Feeds](https://github.com/tellor-io/telliot-feeds/tree/main/src/telliot_feeds/feeds)

-[New Data Request Form](https://github.com/tellor-io/dataSpecs/issues/new?assignees=&labels=&template=new_query_type.yaml&title=%5BNew+Query+Type%5D%3A+)

-[Custom Data Type Examples](https://github.com/tellor-io/dataSpecs/tree/main/types)



> **Looking for help getting started?** We welcome you to ask us anything in the developer's channel of our [discord server.](https://discord.gg/tellor)  
