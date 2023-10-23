---
title: "How to update your genesis file"
id: "update-genesis-file"
---

We are making important upgrades to the network to enhance its performance. Specifically, we will be reducing the block time in the genesis file to 1 second. This change will require you to take some specific actions to ensure a smooth transition.

## Steps You Need to Take

### Step 1: Update Genesis File

The updated genesis file will be made available on the "Run a Node" page of our documentation. Please download it as soon as it becomes available.

### Step 2: Re-Initialize Your Geth Node

Once you have the new genesis file, you will need to re-initialize your Geth node. Run the following command to do this:
```geth --datadir ./geth-linea-data init ./genesis.json```

### Step 3: Restart Your Node

After re-initializing, you must restart your node to apply the changes. To do so, run each of these commands:

#### Stop the node
```systemctl stop geth```

#### Start the node
```systemctl start geth```

Or if you are not using systemctl, you can use your preferred method to restart the node.

## Important Dates

- Genesis File Availability: 24th October
- Deadline for Node Update
- Testnet: 31st October
- Mainnet: 7th November

Please make sure to follow these steps carefully to ensure that your node is compatible with the new network changes. Failure to update your node by the given deadline may result in your node being out of sync with the network.

For any questions, concerns, or clarifications, please reach out directly in the Telegram group.

Thank you for your prompt attention to this matter.

— Linea team
