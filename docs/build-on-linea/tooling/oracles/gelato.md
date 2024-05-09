---
title: Gelato
image: /img/socialCards/gelato.jpg
---

Gelato VRF offers real randomness for blockchain applications by leveraging Drand, a trusted decentralized source for random numbers. With Gelato VRF, developers get random values that are both genuine and can be checked for authenticity. This ensures that smart contracts can access secure and tamper-proof random numbers for various use cases, such as gaming, NFTs, and DeFi.

## Gelato products

- [Gelato RaaS](https://docs.gelato.network/developer-services/introduction): Deploy your own tailor-made ZK or OP L2 chains in a single click with native Account Abstraction and all Gelato middleware baked in.
- [Web3 functions](https://docs.gelato.network/web3-services/web3-functions): Serverless, event-driven functions to automate blockchain transactions.
- [ Relay ](https://docs.gelato.network/web3-services/relay): Give your users access to reliable, robust, and scalable gasless transactions via a simple-to-use API
- [VRF](https://docs.gelato.network/web3-services/vrf): Gelato VRF provides fast, on-chain verifiable randomness for blockchain applications.

## How does Gelato VRF work?

Gelato VRF (Verifiable Random Function) provides trustable randomness on Linea. Here's a brief overview:

### Core component

- Drand: Gelato VRF utilizes Drand, a decentralized randomness beacon ensuring unpredictability and unbiased randomness.

### Top level Flow

- Contract Deployment: Use GelatoVRFConsumerBase.sol as an interface for requesting random numbers.
- Requesting Randomness: Emit the RequestedRandomness event to signal the need for a random number.
- Processing: Web3 functions fetch the random number from Drand.
- Delivery: The fulfillRandomness function delivers the random number to the requesting contract.

To quickly get started with Gelato VRF, check out the [quick start guide here](https://docs.gelato.network/web3-services/vrf/quick-start).

---

Links

- [Gelato Network](https://gelato.network/)
- [Twitter](https://twitter.com/gelatonetwork)
- [Discord](https://discord.com/invite/ApbA39BKyJ)
- [Telegram](https://t.me/gelatonetwork)
