## Useful links and docs:
Recently, DeCommas team published a tutorial on how to Implement Balances features using DeCommas API with Linea Support, check on more here: [Tutorial: Implementing Balances features using DeCommas Mission Control API with Linea Support](https://medium.com/@DeCommas/tutorial-implementing-balances-features-using-decommas-mission-control-api-with-linea-support-4c2f071e3fbb)

Other resources are available here:

[DeCommas API](https://build.decommas.io/)

[API Documentation](https://docs.decommas.io/)

[API Swagger](https://datalayer.decommas.net/swagger/)

[API SDK](https://www.npmjs.com/package/@decommas/sdk)

[DeCommas Twitter](https://twitter.com/decommas)

[DeCommas Discord](https://discord.gg/DYEXjHEENu)

[Tutorial: Building a Feature to Track UserOps using DeCommas API](https://medium.com/@DeCommas/tutorial-building-a-feature-to-track-userops-using-decommas-api-6dbe3fcc066c)

[Tutorial: How to Use the New NFT Endpoints using DeCommas API](https://medium.com/@DeCommas/tutorial-how-to-use-the-new-nft-endpoints-using-decommas-api-7b3ca458b945?source=user_profile---------2----------------------------)

[Tutorial: Implementing Balances features using DeCommas Mission Control API with Linea Support](https://medium.com/@DeCommas/tutorial-implementing-balances-features-using-decommas-mission-control-api-with-linea-support-4c2f071e3fbb?source=user_profile---------3----------------------------)

[Introducing DeCommas Price Service](https://medium.com/@DeCommas/introducing-decommas-price-service-7bc1279f620f?source=user_profile---------5----------------------------)

[Tutorial: How to Build a Top Token Holders Feature Using the DeСommas Mission Control API](https://medium.com/@DeCommas/tutorial-how-to-build-a-top-token-holders-feature-using-the-de%D1%81ommas-mission-control-api-2309c3c83ff4?source=user_profile---------6----------------------------)

[Tutorial (Part 2): An Overview of How Users can Add Protocols Endpoint Feature to a Web3 Portfolio Tracker](https://medium.com/@DeCommas/tutorial-part-2-an-overview-of-how-users-can-add-protocols-endpoint-feature-to-a-web3-portfolio-58477abd75f3?source=user_profile---------7----------------------------)

[Tutorial: Building Activity Feed Using DeCommas Mission Control API](https://medium.com/@DeCommas/tutorial-building-activity-feed-using-decommas-mission-control-api-3323456f81d5?source=user_profile---------8----------------------------)

[Tutorial: Building a web3 Portfolio Tracker using Mission Control API](https://medium.com/@DeCommas/tutorial-building-a-web3-portfolio-tracker-using-mission-control-api-c53cea89ee2d?source=user_profile---------9----------------------------)

[Tutorial for Accessing NFT Data Using Datalayer](https://medium.com/@DeCommas/tutorial-for-accessing-nft-data-using-datalayer-77fc04062426?source=user_profile---------11----------------------------)

## DeCommas API
DeCommas API is a speedy, scalable and cost-effective web3 API. It puts indexed blockchain available data in arms reach, making development of web3 applications such as Portfolio Trackers, Wallets, Web3 searchbars and Activity feeds a breeze. DeCommas API contains:
- Datalayer & Datalayer API: Scalable, speedy and cost-efficient indexed Blockchain-, NFT- and Protocol- data accessible through a developer friendly API.
- Price Service API: provides a comprehensive overview of ERC-20 price calculations using on-chain data from multiple decentralized exchange pools. 

Using the DeCommas API, you’ll get access to a develop toolbox that’s:
- Blazing fast Accessing indexed blockchain data through the Datalayer API yields response times of under 300ms per request.
- Free to use in many scenarios - Just getting started or pushing a smaller feature? DeCommas API is, in many cases, completely free to use!
- Cost-efficient at scale - Highly competitive prices with the potential to decrease infrastructure cost by up to 40-80% (depending on the project's needs).
- Developer friendly - All of this is accessible through easy to use, flexible and well documented APIs and an SDK.

Among our clients are prominent projects like CoinsStats, reaching 20M+ monthly API calls..
DeCommas API is currently available for the following networks:
- Mainnet
- Linea
- Arbitrum
- Arbitrum Nova
- Avalanche
- Optimism
- BSC
- Fantom
- Gnosis
- Polygon
- Polygon zkEVM
- Base
- opBNB
- Mantle
- Scroll

Get access to DeCommas API via [https://build.decommas.io](https://build.decommas.io). More info on pricing is available at [https://build.decommas.io/pricing](https://build.decommas.io/pricing)

## DeCommas Price Service
Along with DeCommas API, we have the Price Service that provides a comprehensive overview of ERC-20 price calculations using on-chain data from multiple decentralized exchange pools. 
### The Price Service API currently provides data from the following networks:
- Mainnet
- Polygon
- Linea (will be rolled out in the future)
### Price Service Endpoints:
- [Get Price](https://docs.decommas.io/get-price)

## Getting access to DeCommas API
Gaining access to DeCommas API is simple:
Head to [https://build.decommas.io/](https://build.decommas.io/)
1. Click “Get Started”
2. Enter your email address
3. Check your email and click the link to sing in
4. You are now redirected to [https://dashboard.decommas.io/](https://dashboard.decommas.io/), which contains your API keys
Make sure you’ve got your API keys ready. Copy and paste them to a spot where you can easily find them, but keep them safe too. 

### Setting up DeCommas API in your environment
You can set up the DeCommas API in your environment using either of these two methods: one is via a raw HTTPS request, and the other is using a special toolkit if you’re into JavaScript.

If you choose the first option, the call will appear as follows:
[https://datalayer.decommas.net/datalayer/api/v1/tokens/{address}?api-key={YOUR-API-KEY}](https://datalayer.decommas.net/datalayer/api/v1/tokens/{address}?api-key={YOUR-API-KEY})


But if you’re more of a JavaScript whiz, we’ve got a kit for you called the DeCommas SDK. You can grab it from here: [https://github.com/DeCommas/decommas-sdk](https://github.com/DeCommas/decommas-sdk).

Here’s how to start:
Put the DeCommas API inside your Javascript environment by typing:
```bash
npm install @decommas/sdk
```
Once that’s done, just copy and paste the following code:

```javascript
import { Decommas } from '@decommas/sdk';
const decommas = new Decommas();
const getVitalikERC20Balances = async () => {
 const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'; // any address
 const tokens = await decommas.address.getTokens({ address });
 console.log(tokens);
};
```

Now you’re all set to make full use of the DeCommas API!
