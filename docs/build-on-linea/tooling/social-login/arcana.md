---
title: Arcana
---

[Arcana Network](https://arcana.network) SDKs enable Web3 developers to use [social login](https://docs.arcana.network/concepts/social-login) and onboard app users easily. 

Authenticated users can instantly access the embedded, non-custodial [Arcana wallet](https://docs.arcana.network/concepts/anwallet/) from within the app context and sign blockchain transactions.

Developers can leverage the built-in gasless feature to sponsor gas fees for whitelisted blockchain transactions. The gasless transactions can be enabled for Arcana Wallet and third-party, browser-based wallets.

Use [Auth Quick Start Guide](https://docs.arcana.network/howto/) to allow social login for onboarding users and enable Arcana Wallet in the app context. 

To enable gasless transactions in third-party wallets, see [Arcana Gasless Quick Start Guide](https://docs.arcana.network/quick-start/gasless-standalone-quick-start).

## Arcana Wallet

Linea chain is available out of the box as part of the pre-configured blockchain network list in the [Arcana wallet](https://docs.arcana.network/concepts/anwallet/). Users don't need to install a browser extension to use the Arcana wallet. Authenticated users of apps integrated with the [Arcana Auth SDK](https://docs.arcana.network/concepts/authsdk) can instantly access the Arcana wallet from within the app context. It is a built-in, non-custodial, embedded wallet available via the Arcana Auth SDK.

<div class="center-container">
  <div class="img-medium">
      <img 
            src="/img/docs/build-on-linea/tooling/social-login/arcana/arcana-wallet-linea.gif"
            alt="Arcana wallet Linea default" width="65%"
      />
  </div>
</div>

Developers can tailor the user experience of signing blockchain transactions. Besides the look and feel of the wallet, developers can also control the Arcana wallet UI display to sign blockchain transactions.

Arcana Wallet is available for [desktop, mobile, and gaming apps (coming soon!)](https://docs.arcana.network/sdk-installation). App developers can configure [gasless transactions](https://docs.arcana.network/concepts/gasless-ops) through the Arcana Wallet where users pay zero gas fees.

[Learn more...](https://docs.arcana.network/user-guides/wallet-ui/).

## Enable Arcana Wallet

Users cannot directly access the Arcana wallet as a standalone application. App developers must integrate the app with the Arcana Auth SDK and enable users to access the Arcana Wallet within the app.

Developers need to follow these steps for integration:

1. **Register the app** with the [Arcana Developer Dashboard](https://dashboard.arcana.network/), and copy the unique client identifier for the app.
2. **Configure Auth SDK usage** via the dashboard, specify social login options, wallet user experience settings, gasless transaction settings, etc.
3. **Install the Arcana Auth SDK and use the client identifier to integrate the app**. Initialize the `AuthProvider`, then add a single line code to onboard users by calling the `connect()` method and enabling the plug-and-play login UI. After a successful user login, *Arcana wallet will automatically display within the app context*, enabling the user to sign blockchain transactions instantly. 

:::note

Arcana wallet supports [JSON/RPC calls and Web3 wallet operations](https://docs.arcana.network/web-sdk/auth-usage-guide#arcana-wallet-operations).

:::

## References

* [Social login Providers](https://docs.arcana.network/state-of-the-arcana-auth#app-login)
* [Blockchain networks](https://docs.arcana.network/state-of-the-arcana-auth#supported-blockchains)
* [Browsers](https://docs.arcana.network/state-of-the-arcana-auth#supported-browsers)
* [Supported App Types](https://docs.arcana.network/sdk-installation)
* [SDK Reference Guides](https://docs.arcana.network/dev-resources/sdk-ref/)