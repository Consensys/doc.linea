---
title: Gas fees on Linea
sidebar_position: 6
---

 If you're familiar with gas fees on Ethereum, then you know that they heavily fluctuate depending on how busy the network is (for a refresher on gas click [here](https://support.metamask.io/hc/en-us/articles/4404600179227-User-Guide-Gas#:~:text=A%20normal%20transaction%20sending%20ETH,transactions%20also%20cost%2021%2C000%20gas.)). **Linea's gas fees on average should be 15x cheaper than Ethereum's, and we hope to reduce them even further in the future.**


## How do I make sure my transactions go through?

 Linea is compatible with EIP-1559; however, there are minor differences.

 1. The base fee on Linea is fixed at 7 wei to ensure that blocks aren't over 50% full, so that we don't burn any ETH on Linea.

 2. We don't mine a transaction if `gasPrice` or `maxPriorityFeePerGas` is lower than a given value that fluctuates over time.

To ensure that your transaction gets included by the sequencer, we recommend using EIP-1559 with the following settings:

- maxBaseFee = 1.35 * previousBlockMaxBaseFee

- `maxPriorityFeePerGas` = reward value from eth_feeHistory( 5 blocks, latest, 20th percentile)

You can use the `eth_feeHistory` RPC method with the params below to get the recommended values:

```bash
curl https://linea-mainnet.infura.io/v3/your-api-key \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "jsonrpc": "2.0", "method": "eth_feeHistory", "params": [4, "latest", [20]] }'
```

## Example Code

```typescript

  public async get1559Fees(percentile = this.gasEstimationPercentile): Promise<Fees> {
    const currentBlockNumber = await this.provider.getBlockNumber();
    if (this.cacheIsValidForBlockNumber.lt(currentBlockNumber)) {
      const { reward, baseFeePerGas }: FeeHistory = await this.provider.send("eth_feeHistory", [
        "0x4",
        "latest",
        [percentile],
      ]);

      const maxPriorityFeePerGas = reward
        .reduce((acc: BigNumber, currentValue: string[]) => acc.add(currentValue[0]), BigNumber.from(0))
        .div(reward.length);

      if (maxPriorityFeePerGas && maxPriorityFeePerGas.gt(this.maxFeePerGasFromConfig)) {
        throw new FeeEstimationError(
          `Estimated miner tip of ${maxPriorityFeePerGas} exceeds configured max fee per gas of ${this.maxFeePerGasFromConfig}!`,
        );
      }

      this.cacheIsValidForBlockNumber = BigNumber.from(currentBlockNumber);

      const maxFeePerGas = BigNumber.from(baseFeePerGas[baseFeePerGas.length - 1])
        .mul(2)
        .add(maxPriorityFeePerGas);

      if (maxFeePerGas.gt(0) && maxPriorityFeePerGas.gt(0)) {
        this.feesCache = {
          maxPriorityFeePerGas,
          maxFeePerGas: maxFeePerGas.gt(this.maxFeePerGasFromConfig) ? this.maxFeePerGasFromConfig : maxFeePerGas,
        };
      } else {
        this.feesCache = {
          maxFeePerGas: this.maxFeePerGasFromConfig,
        };
      }
    }
    return this.feesCache;
  }
```

## How do I check the gas price on Linea?

 If you want to check the gas price on Linea, run the code below.

``` bash
curl https://linea-mainnet.infura.io/v3/your-infura-api-key \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_gasPrice","params": [],"id":1}'
```
:::note
The output of the request returns a hexadecimal equivalent of an integer representing the current gas price in wei. Convert the hexadecimal value into decimals to get the wei value. You can use any hexadecimal to decimal converter such as [RapidTables](https://www.rapidtables.com/convert/number/hex-to-decimal.html).

:::

For more information on this method, take a look at [eth_gasPrice JSON_RPC](https://docs.infura.io/networks/ethereum/json-rpc-methods/eth_gasprice).

You can also use the eth_gasprice method on Ethereum and then compare the two values to see if L2 gas price = ~L1/15 gas price.

``` bash
curl https://mainnet.infura.io/v3/your-infura-api-key \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_gasPrice","params": [],"id":1}'
```