---
title: PADO
image: /img/socialCards/pado.jpg
---

## PADO

[PADO](https://padolabs.org) is a cryptography-based attestation protocol to
bring all Internet data into smart contracts. PADO relies heavily on
cryptography to minimize trust, and enables end users to prove the correctness
of their personal web data in a privacy-preserving manner.

The core techniques used in PADO include secure multi-party computation (MPC)
and interactive zero-knowledge proofs (IZK). End users run PADO client apps to
attest their personal web data, and create related data proofs with the help of
PADO nodes. These data proofs are cryptographically verified attestations with
security guarantees including:

- Data authenticity: the user web data is honestly retrieved from the indicated
  data source, and the integrity is secured by MPC-TLS and IZK techniques.
- Privacy: When coupled with specific application logic, users' sensitive
  information is well protected under the zero-knowledge property.

The MPC-TLS and IZK techniques are general enough for both data source
integration and data computation. For instance, one can create his/her own
attestations including but not limited to:

- Proofs of CEX assets, e.g., Alice has more than 1000 USD for her total token
  values in Coinbase;
- Proofs of specific token holding, e.g., Alice holds more than 2 ETH in
  Binance;
- Proofs of nationality, e.g., Alice is a verified bank user with her
  nationality of British.
- Proofs of a heavy gamer, e.g., Bob plays more than 10 hours per day on Steam
  games.

## For Developers

PADO team creates a template-based SDK (in progress) for developers to build
their own applications by using PADO's off-chain attestation capabilities. The
SDK will encapsulate the details of underlying cryptographic algorithms and
protocols, and provide high-level interfaces for application developers to
manage the data retrieval and data computation. Developers can leverage the SDK
in two aspects:

- Developers can use the data source templates to integrate with various
  Internet data sources of their own interest, and to attest the corresponding
  type of data.
- Developers can define and implement their own application logic by integrating
  with data consumption templates.

## Networks

Note PADO is deployed on Linea, and integrated with
[Verax](https://github.com/Consensys/verax-documentation), which is the public
attestation registry to store and manage the attestation data which can be
accessed by any party. PADO users can submit these data proofs to Linea via
Verax, which can be further accessed by other dApps. The following contract
address is the PADO portal contract.

| Network       | Contract address                                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Linea Mainnet | [`0x50bd377EB8D4236Bb587AB3FB1eeafd888AEeC58`](https://lineascan.build/address/0x50bd377EB8D4236Bb587AB3FB1eeafd888AEeC58) |

## Resources

Learn more and start using PADO!

- [Product Tutorial](https://docs.padolabs.org/Products/Extension)
- [Technical Principles](https://docs.padolabs.org/How-PADO-Works/)
- [Technical Whitepaper](https://eprint.iacr.org/2023/964.pdf)

## Learn More About PADO

- [Twitter](https://twitter.com/padolabs)
- [Discord](https://discord.gg/YxJftNRxhh)
- [Website](https://padolabs.org)
- [Medium](https://medium.com/@padolabs)
- [Github](https://github.com/pado-labs/)
