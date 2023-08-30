---
title: Gas fees on Linea
sidebar_position: 6
---

 If you're familiar with gas fees on Ethereum, then you know that they heavily fluctuate depending on how busy the network is (for a refresher on gas click [here](https://support.metamask.io/hc/en-us/articles/4404600179227-User-Guide-Gas#:~:text=A%20normal%20transaction%20sending%20ETH,transactions%20also%20cost%2021%2C000%20gas.)). Linea's gas fees are dependent on Ethereum, but the underlying calculations are somewhat complex. This article will explain how the L2 fees are calculated, but the **TLDR is that Linea's gas fees should be around 1/15th of Ethereum's, and we hope to reduce them even further in the future.**

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

## The Formula

**Total L2 Fee Equation**

$$
\text{total\_L2\_fee} = \text{L2\_base\_fee} + \text{L2\_miner\_tip}
$$

The L2 fee equation is comprised of two parts, the base fee and the miner tip. The base fee is 7 wei, which is the minimum base fee a standard protocol allows. The miner tip equation is a bit complex and will be explained in more detail below.


**L2 Miner Tip Equation**

$$
l2\_miner\_tip = \left( \sum_{i} (baseFee[i] \times 0.066 + reward[i] \times 0.066) \times ratio[i] \right) \div \left( \sum_{i} ratio[i] \right)
$$

Looking at this equation might seem overwhelming, but we are just calculating the weighted average to get the L2 miner tip.

In this equation, the following variables are constants that could change in the future as we fine-tune our gas fee calculation: ```base_fee_coefficient = 0.066```, ```priority_fee_coefficient = 0.066```, ```batchSubmissionPercentile = 15```, and ```numBlocks = 200```.

We use the [eth_feeHistory JSON-RPC method](https://docs.infura.io/networks/ethereum/json-rpc-methods/eth_feehistory) with the constant parameters given above to figure out what the 'baseFeePerGas', 'gasUsedRatio', and 'reward'is on Ethereum and then find the weighted average by plugging them into the equation.

The request would look like the code below.

```bash 
curl https://mainnet.infura.io/v3/YOUR-API-KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "jsonrpc": "2.0", "method": "eth_feeHistory", "params": ["200", "latest", [15]] }'

```

## Example Calculation

For practical purposes let's assume we ran the `eth_feeHistory` and used `numBlocks=3`, and got the following response:

```
{"jsonrpc":"2.0","id":1,"result":{"baseFeePerGas":["1001","1002","1003","1004"],"gasUsedRatio":[0.4,0.5,0.6],"oldestBlock":"0x113159b","reward":[["901"],["902"],["903"]]}}

```

This maps to the following inputs for the equation:

```
baseFee = ["1001","1002","1003"]
reward= ["901", "902", "903"]
ratio = [0.4, 0.5, 0.6]

```

Using the formula, we would iterate through all the values in the list, where i ranges from 1 to 3, to obtain:

$$
l2\_miner\_tip = \frac{{(1001 \times 0.66 + 901 \times 0.66) \times 0.4 + (1002 \times 0.66 + 902 \times 0.66) \times 0.5 + (1003 \times 0.66 + 903 \times 0.66) \times 0.6}}{{0.4 + 0.5 + 0.6}}
$$

After meticulously going through all this math, you should arrive at your gas price (if you do this for 200 blocks instead of 3). This should be close to the gas price the `eth_gasPrice` method returns from above. 