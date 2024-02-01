---
title: NFTScan
---

# Tracking Full NFT data on Linea Using NFTScan API

The increasing demand for NFTs has brought attention to the importance of having efficient tools to keep track of their creation, movement, and trading activities. For companies and developers involved in NFTs, it is crucial to have the capability to monitor the minting events, especially with the growth of NFT-based applications that will be facilitated by Linea's scalability.

This article provides information on how you can utilize the NFTScan API to monitor the full NFT data on Linea.

## Table of Contents

- Understanding NFTScan
- What can NFTScan API provide
- How to Access the Linea NFTScan NFT API
- Conclusion

# Understanding NFTScan

NFTScan provides Web3 developers with the most professional, comprehensive and authoritative NFT data services and solutions. Through establishing the full NFT data information of multiple blockchain networks with standardized indexing methods, the NFTScan APIs help developers build new experiences retrieving NFTs. We provide a set of endpoints that enable you to fetch ERC-721 and ERC-1155 NFT assets as well as transactions, collections, marketplace statistics and more.

# **What can NFTScan API provide**

NFTScan API indexes all core aspects of NFTs on multiple blockchains and provides quick access to this through a suite of data-focused API endpoints. No matter what you are building, NFTScan API will support the data you will need.

- **Retrieving NFTs**
- **Retrieving owners of NFTs**
- **Retrieving NFT transactions**
- **Retrieving NFT collections**
- **Obtain NFT marketplace statistics**
- **More custom services and solutions**

# **How to Access the NFTScan NFT API**

### 1. **Create a NFTScan Developer Account**

Before using the NFTScan API, you need to visit the developer website and create an account. Go to the NFTScan official website and click the “Sign Up” button for NFTScan API registration.

> _NFTScan Developer Platform: [https://developer.nftscan.com/user/signup](https://developer.nftscan.com/user/signup)_

<div class="center-container">
  <div class="img-medium">
      <img
        src="/img/article_images/Build_on_Linea/Tooling_and_infrastructure/Data_indexers/NFTScan/Linea_NFTScan_create_account.png"
        alt="NFTScan sign up page"
      />
  </div>
</div>

After logging in, find your unique API KEY on the Dashboard and copy it. Visit the API documentation and input your API KEY as guided. You can then start using the API service. In the API documentation, developers can find various interface modes to choose from based on their needs.

<div class="center-container">
  <div class="img-medium">
      <img
        src="/img/article_images/Build_on_Linea/Tooling_and_infrastructure/Data_indexers/NFTScan/Linea_NFTScan_add_API_key.png"
        alt="NFTScan API key"
      />
  </div>
</div>

In the Dashboard, developers can also view statistics on their API usage, helping to track historical usage data. Moreover, NFTScan provides each registered developer with 1M CU (Call Units) of API calls, allowing access to all NFT API interfaces, and CU never expires.

<div class="center-container">
  <div class="img-medium">
      <img
        src="/img/article_images/Build_on_Linea/Tooling_and_infrastructure/Data_indexers/NFTScan/Linea_NFTScan_dashboard.png"
        alt="NFTScan dashboard"
      />
  </div>
</div>

### **2. View the NFTScan API Documentation**

After successfully registering as a developer and obtaining your API Key, you need to review the NFTScan API documentation. The API documentation includes all available API endpoints and parameters, along with detailed instructions on how to build requests and handle responses. Carefully read the API documentation and ensure you understand how to use the API to retrieve the data you need.

> _NFTScan API Documentation: [https://docs.nftscan.com](https://docs.nftscan.com)_

NFTScan API services aim to enhance developers’ experience in obtaining NFT data analysis. NFTScan currently boasts the largest and most comprehensive NFT Collection library, supporting full NFT data for Ethereum, Solana, BNBChain, Bitcoin, Polygon, zkSync, Aptos, Linea, Avalanche, Arbitrum, Optimism, Fantom, Moonbeam, PlatON, Cronos, and Gnosis on 16 blockchains.

The covered NFT data is diverse, providing a complete set of interfaces for accessing ERC721 and ERC1155 assets, transactions, projects, market statistics, and more. It supports over 50 public interfaces for EVM-compatible chains and a set of similar interfaces for Solana, Aptos, and Bitcoin, satisfying developers’ needs to index various types of NFT data.

<div class="center-container">
  <div class="img-large">
      <img
        src="/img/article_images/Build_on_Linea/Tooling_and_infrastructure/Data_indexers/NFTScan/Linea_NFTScan_API_documentation.png"
        alt="NFTScan API documentation"
      />
  </div>
</div>

### **3. Set the Chain to Linea**

In the API documentation, you'll notice a section for selecting the blockchain. Make sure to set it to Linea to ensure you're retrieving NFT data specifically from the Linea blockchain.

<div class="center-container">
  <div class="img-large">
      <img
        src="/img/article_images/Build_on_Linea/Tooling_and_infrastructure/Data_indexers/NFTScan/Linea_NFTScan_set_chain_to_Linea.png"
        alt="NFTScan set chain to Linea"
      />
  </div>
</div>

### **4. Querying Relevant API Requests**

Now that you've configured the blockchain to Linea, you can start using the API endpoints tailored to your specific needs. NFTScan offers a wide range of API endpoints, each designed for various purposes.

<div class="center-container">
  <div class="img-large">
      <img
        src="/img/article_images/Build_on_Linea/Tooling_and_infrastructure/Data_indexers/NFTScan/Linea_NFTScan_querying_API_requests.png"
        alt="NFTScan querying API requests"
      />
  </div>
</div>

- **[Retrieve Assets](https://docs.nftscan.com/reference/evm/get-nfts-by-account):** A core API for retrieving NFT asset data. The core data model in NFTScan API is Assets, representing unique digital items. It includes contract addresses, contract names, token IDs, ERC protocol standards, metadata JSON, image URIs, holders, rarity rankings, and comprehensive data about NFT projects, asset lists, and details.
- **[Retrieve Transactions](https://docs.nftscan.com/reference/evm/get-transactions-by-account):** This API retrieves NFT transaction records, comprehensively recording NFT trade markets and transaction contract information on various blockchain networks. It offers in-depth analysis based on contract source codes and transaction logs, contributing to data parsing logic.
- **[Retrieve Collections](https://docs.nftscan.com/reference/evm/get-an-nft-collection):** This API retrieves NFT Collection asset data, providing essential information about NFT Collections and the data held by wallet addresses. Descriptions, social media, and other basic information about NFT Collections can be obtained through APIs offered by leading NFT markets on various blockchain networks. Additionally, floor price information is centralized data obtained through APIs based on market orders.
- **[Collection Statistics](https://docs.nftscan.com/reference/evm/collection-statistics):** This API provides comprehensive statistics for NFT Collections, offering key statistical indicators such as holder distribution, circulation rate, trading volume, and price trends. These statistics play a vital role in product design, market research, and asset evaluation.
- **[Account Statistics](https://docs.nftscan.com/reference/evm/account-overview-statistics):** This API offers comprehensive statistics for NFT user accounts, providing core statistical indicators such as the number of NFTs held, total value held, and historical transaction data. This data is essential for product design, user research, customer profiling, and more.
- **[Analytic Statistics](https://docs.nftscan.com/reference/evm/trade-ranking):** This API offers in-depth analysis of NFT data, providing insights such as NFT ranking, trend forecasts, and more. These analytical data help data-driven decision-making and strategic planning.

### **5. Building Relevant NFT Requests**

Constructing NFT-related requests with NFTScan is straightforward. Developers only need to find the desired interfaces in the API documentation, review interface addresses, request methods, and parameters. Based on their programming language of choice, such as JavaScript, Python, Java, etc., developers can use the respective HTTP request libraries to send well-constructed requests to the interface addresses, including necessary headers and parameters. The calling process is quick and convenient, allowing developers to implement it based on the documentation.

# **Conclusion**

NFTScan provides a customized NFT data retrieval experience that is different from traditional blockchain data platforms. This not only enriches the functionality settings of applications, but also greatly reduces the cost of developers obtaining and processing NFT data. Developers can flexibly access the rich NFT data resources provided by NFTScan based on their application requirements. Developers can freely combine these APIs according to their business scenarios, building NFT applications or solutions that meet their specific needs.

**Reference Link:**

NFTScan: [https://nftscan.com](https://nftscan.com/)

NFTScan Developer Platform: [https://developer.nftscan.com](https://developer.nftscan.com/)

NFTScan API Doc: _[https://docs.nftscan.com](https://docs.nftscan.com)_
