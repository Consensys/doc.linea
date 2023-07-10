# Use thirdweb

[thirdweb](https://thirdweb.com) is the fastest way to build web3 apps.

thirdweb is a 100% open source web3 development stack with smart contracts, tools, infrastructure and SDKs in common languages like [Typescript](https://portal.thirdweb.com/typescript), [React](https://portal.thirdweb.com/react), [React Native](https://portal.thirdweb.com/react-native), [Go](https://portal.thirdweb.com/go), [Python](https://portal.thirdweb.com/python) and [Unity](https://portal.thirdweb.com/unity). In addition, apps can use thirdweb's [universal wallet interface](https://portal.thirdweb.com/wallet) as well build custom smart contracts using thirdweb's [Solidity SDK](https://portal.thirdweb.com/solidity).

With thirdweb, developers can seamlessly deploy to [700+](https://thirdweb.com/chainlist) EVM chains. Examples of apps and services that have launched with thirdweb:

- A [Minting API](https://portal.thirdweb.com/minting) for launching and minting new NFT collections
- Launch [NFT Drops](https://thirdweb.com/template/nft-drop)
- Build [NFT marketplaces](https://thirdweb.com/template/marketplace-v3)
- Connect digital assets to [e-commerce stores](https://thirdweb.com/solutions/commerce)
- Build blockchain games as well as add web3 features to [games](https://thirdweb.com/solutions/gaming)

Developers can find clonable [templates](https://portal.thirdweb.com/templates) to get started building.

## thirdweb Dashboard Tutorial

This tutorial will walk developers through deploying and configuring a new ERC-20 token contract to Linea Testnet using the thirdweb [Dashboard](https://thirdweb.com/dashboard). You will learn how to:

- Deploy a pre-built ERC-20 smart contract template
- Configure your token smart contract
- Set up claim conditions, to allow others to claim your token
- Transfer or airdrop tokens

Before you begin, ensure that you have a wallet that is [configured to use Linea](https://docs.linea.build/use-linea-testnet/set-up-your-wallet) and that has been [funded with Linea Goerli ETH](https://docs.linea.build/use-linea-testnet/fund#get-test-eth-on-goerli).

### Deploy a TokenDrop (ERC-20) Contract

1. [Visit](https://thirdweb.com/linea-testnet) Linea Testnet chain page at thirdweb
2. Deploy TokenDrop (ERC contract) using the thirdweb Dashboard

   1. Connect wallet to Dashboard
   2. Change network on connect wallet to Linea Testnet

      ![connect-wallet.png](https://gateway.ipfscdn.io/ipfs/QmVGRGndHPYPMDwqY7ARDZbEEMuJVMoXYzSBoB2mhkddh9/connect-wallet.png)

      ![select-network.png](https://gateway.ipfscdn.io/ipfs/QmVGRGndHPYPMDwqY7ARDZbEEMuJVMoXYzSBoB2mhkddh9/select-network.png)

3. Click on **Token Drop** contract on the contract explorer page and deploy the smart contract by clicking on the **Deploy now** button. Give your contract a Name and Symbol

![linea-landing.png](https://gateway.ipfscdn.io/ipfs/QmZCuC8yEQGnexf5RqgFTUhEteXJfpGkk6xxpg5SRrgPKj/token-drop-explorev2.png)

![explore-token-drop.png](https://gateway.ipfscdn.io/ipfs/QmP8Ppd5eVbFvaW8ozZADr9edHaKwCTLn4SwKzU9LHmJoT/token-drop.png)

![deploy-token-drop.png](https://gateway.ipfscdn.io/ipfs/QmVGRGndHPYPMDwqY7ARDZbEEMuJVMoXYzSBoB2mhkddh9/deploy-token-drop.png)

       (note: do not uncheck the 'add to dashboard' option)

Once you’ve confirmed the transactions with your wallet the contract will be deployed and you will be redirected to that smart contract’s Overview page on the Dashboard.

### Make Your Token Claimable by Users

1. Go to the “Claim Conditions” tab on the Dashboard
2. You will want to add a claim phase that will start immediately and allow any wallet to claim a maximum of 10 of our tokens at one time.

Click on the “Add Phase” button and select “Public”

![set-claim-conditions.png](https://gateway.ipfscdn.io/ipfs/QmVGRGndHPYPMDwqY7ARDZbEEMuJVMoXYzSBoB2mhkddh9/set-claim-conditions.png)

       Set the parameters of the claim phase as follows:

![public-claim.png](https://gateway.ipfscdn.io/ipfs/QmVGRGndHPYPMDwqY7ARDZbEEMuJVMoXYzSBoB2mhkddh9/public-claim.png)

Save the claim phase by clicking the “Save Phases” button. Your wallet will be prompted to accept the transaction.

### Claim 10 tokens to your wallet

1. Click on the Embed tab of the Dashboard.
2. The Embed tab shows an embeddable `<iframe>` code that you can copy to your clipboard and paste into any website which will render the token claiming embed.

![embed-code.png](https://gateway.ipfscdn.io/ipfs/QmVGRGndHPYPMDwqY7ARDZbEEMuJVMoXYzSBoB2mhkddh9/embed-code.png)

       For the quest we will just claim from the embed that is already running on the Embed tab.  Scroll down to see the embed:

![embed-component.png](https://gateway.ipfscdn.io/ipfs/QmVGRGndHPYPMDwqY7ARDZbEEMuJVMoXYzSBoB2mhkddh9/embed-component.png)

Connect your wallet to the embed, set the quantity to 10 and claim your tokens by clicking the “Mint (free)” button. Your wallet will be prompted to accept the transaction.

When the transaction has been completed, the embed should look like this. Note the embed is saying you can’t claim 10 more (we set the max claimable in the claim phase to 10).

![not-eligible.png](https://gateway.ipfscdn.io/ipfs/QmVGRGndHPYPMDwqY7ARDZbEEMuJVMoXYzSBoB2mhkddh9/not-eligible.png)

### Transfer one of your tokens to the Quest Completion Address

1. Go to the “Tokens” tab, where you will see summary information about your token. Total supply of your token is 10 and you should see 10 owned by you.

![transfer-dashboard.png](https://gateway.ipfscdn.io/ipfs/QmVGRGndHPYPMDwqY7ARDZbEEMuJVMoXYzSBoB2mhkddh9/transfer-dashboard.png)

1. Click the “transfer” button to transfer a token to the Quest Completion address `0x630900fB257fAfEf02491368062d50d6677d9D75`. Enter the Quest Completion address and a quantity of 1 and click on the Transfer button.

![transfer-dialog.png](https://gateway.ipfscdn.io/ipfs/QmVGRGndHPYPMDwqY7ARDZbEEMuJVMoXYzSBoB2mhkddh9/transfer-dialog.png)

Confirm the transfer in your wallet. Once the transaction is complete, you should see that your wallet now owns 9 tokens on the Token tab.
