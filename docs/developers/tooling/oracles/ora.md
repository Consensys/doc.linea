---
title: ORA
image: /img/socialCards/ora.jpg
---

[ORA](https://ora.io) is Ethereum's Trustless AI. 
As a verifiable oracle protocol, ORA brings AI and complex compute onchain.
Its main product, **Onchain AI Oracle (OAO)**, integrates AI capabilities directly onchain.

ORA breaks down the limitations of smart contracts by offering verifiable AI inference, so developers can innovate freely.

## OAO Quickstart

This quickstart is designed to help you to build a smart-contract on Linea able to interact with OAO. You can find more details in [our docs Quickstart](https://docs.ora.io/doc/oao-onchain-ai-oracle/develop-guide).

### Workflow

1. The user contract sends the AI request to OAO on Linea, by calling `requestCallback` function on the OAO contract.
2. Each AI request will initiate an opML inference.
3. OAO will emit a `requestCallback` event which will be collected by opML node.
4. opML node will run the AI inference, and then upload the result on Linea, waiting for the challenge period.
    1. During the challenge period, the opML validators will check the result, and challenge it if the submitted result is incorrect.
    2. If the submitted result is successfully challenged by one of the validators, the submitted result will be updated on Linea.
    3. After the challenge period, the submitted result on chain is finalized.
5. When the result is uploaded or updated on Linea, the provided AI inference in opML will be dispatched to the user's smart contract via its specific callback function.

## Integration

### Overview

To integrate with OAO, you will need to write your own contract.

To build with AI models of OAO, we provided an example of contract using OAO: [Prompt](https://lineascan.build/address/0xC20DeDbE8642b77EfDb4372915947c87b7a526bD).

### Smart Contract Integration

1. Inherit `AIOracleCallbackReceiver` in your contract and bind with a specific OAO address:

```solidity
constructor(IAIOracle _aiOracle) AIOracleCallbackReceiver(_aiOracle) {}
```

2. Write your callback function to handle the AI result from OAO. Note that only OAO can call this function:

```solidity
function aiOracleCallback(uint256 requestId, bytes calldata output, bytes calldata callbackData) external override onlyAIOracleCallback()
```

3. When you want to initiate an AI inference request, call OAO as follows:

```solidity
aiOracle.requestCallback(modelId, input, address(this), gas_limit, callbackData);
```

## Reference

**2 models** are available on Linea: Stable Diffusion (ID: 50) and Llama3 8B Instruct (ID: 11).

[Prompt](https://docs.ora.io/doc/oao-onchain-ai-oracle/reference) and [SimplePrompt](https://docs.ora.io/doc/oao-onchain-ai-oracle/reference) are both example smart contracts interacted with OAO.

For simpler application scenarios (eg. Prompt Engineering based AI like GPTs), you can directly use Prompt or SimplePrompt.

SimplePrompt saves gas by only emitting the event without storing historical data.

Linea mainnet: 

- OAO Proxy: [0x0A0f4321214BB6C7811dD8a71cF587bdaF03f0A0](https://lineascan.build/address/0x0A0f4321214BB6C7811dD8a71cF587bdaF03f0A0)
- Prompt: [0xC20DeDbE8642b77EfDb4372915947c87b7a526bD](https://lineascan.build/address/0xC20DeDbE8642b77EfDb4372915947c87b7a526bD)
- SimplePrompt: [0xC3287BDEF03b925A7C7f54791EDADCD88e632CcD](https://lineascan.build/address/0xb880D47D3894D99157B52A7F869aB3B1E2D4349d)

## Useful links:

- Read [ORA documentation](https://docs.ora.io)
- [Join our Discord](https://discord.gg/ora-io) where our team can help you
- Follow us [on X](https://x.com/OraProtocol)
