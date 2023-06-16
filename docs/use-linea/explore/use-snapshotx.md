---
title: Use Snapshot X EVM
sidebar_position: 1
---

# Snapshot X

**Snapshot X** is an on-chain voting protocol. Technically speaking, it's a set of modular smart-contracts that interact with each other to do coordinate. The difference with the original [Snapshot](https://snapshot.org) is that Snapshot X is **fully on-chain**.

If anything in these docs is unclear or you would like more detail, do not hesitate to reach out on [Discord](https://discord.gg/snapshot) or view the full documentation at [https://docs.snapshotx.xyz](https://docs.snapshotx.xyz).

Let's quickly go over the core elements of the voting process:

- **Space** - You can think of a space as an organization's account on Snapshot which can be viewed by anyone visiting the platform. It serves as a hub for all proposals related to the organization and a source of information for the users.
- **Proposal** - Proposal is the key element of the voting system. It presents a change suggestion related to a specific organization and enables eligible users to cast their vote.
- **Voting Strategies** - Voting strategies are the contracts used to determine the voting power (VP) of users.

# Voting

## Who can vote on proposals?

Each space specifies their [Voting Strategies](https://docs.snapshotx.xyz/protocol-sx-evm/voting-strategies) in its settings. You can see the custom setup by opening the space settings. This setup can define if you are eligible to take part in the voting and what is your Voting Power calculated at the timestamp of proposal creation.

In case of Linea at the time of the quest every address has 1 Voting Power.

# Quest - Cast a vote

_On-chain voting on Snapshot X doesn't cost you anything nor does it affect your funds in any way._

### 1. Connect your wallet

Go to [https://snapshotx.xyz](https://snapshotx.xyz).

Click the `Connect wallet` button in the top right corner.

### 2. Find the proposal

Go to the [Linea's space page](https://snapshotx.xyz/#/linea-testnet:0x96706138eef4bd871448cf9b842b01b005822aa1) on Snapshot. You can vote directly from this view or go to [the proposal](https://snapshotx.xyz/#/linea-testnet:0x96706138eef4bd871448cf9b842b01b005822aa1/proposal/7) to read more details before you vote.

In the [proposal page](https://snapshotx.xyz/#/linea-testnet:0x96706138eef4bd871448cf9b842b01b005822aa1/proposal/7) you can see your Voting Power. If it shows `0` it means you cannot vote on the selected proposal. \

### 3. Vote!

Select the option you want to vote for - **Accept, Reject, Abstain**.

<img src="/img/snapshotx/vote.png" alt="voting options" width="30%" height="15%"/>

Depending on the space settings you will have to sign a gasless Ethereum message and/or sign a transaction to confirm your action.

_If you are using MetaMask you'll need to scroll to the end of the signature and click on the arrow down for the Sign button to become active. Voting on Snapshot doesn't affect your account or the funds that are associated to it._

You will notice that a new icon has appeared in the top right corner, just next to your avatar:

<img src="/img/snapshotx/tx_queue.png" alt="pending transaction" width="30%" height="15%"/>

The number indicates the number of pending transactions. Once it disappeared you can reload to page to view your vote.\
\
Voilà! You have just cast a vote 🎉​

# Support

If you encounter any issues with voting on Snapshot X, reach out to the team on Snapshot's Discord by creating a ticket in the [#helpdesk-tickets channel](https://discord.com/channels/707079246388133940/1090290400943677440).
