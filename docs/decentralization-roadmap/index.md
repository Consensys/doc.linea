---
title: Decentralization Roadmap

sidebar_position: 9
---

The roadmap can be broken down into five phases, which the team intends to deliver sequentially in collaboration with the broader Linea ecosystem and community. Each phase moves the Linea network closer to its target state of being a mature rollup secured by Ethereum.


# Phase 0

Phase 0 represents the launch status of the Linea Mainnet Alpha. From Day 1, Linea as a EVM-equivalent zkEVM, provides a level of decentralization by implementing the EVM as specified by the Ethereum Foundation. A developer building on Linea can choose at any time to move their dapp to another EVM-supported chain, such as Ethereum, in the event they are unsatisfied with the Linea network. They can do this without re-writing their smart contracts, retooling, or paying for new audits and most importantly without needing the permission of a centralized entity—in effect, there is no vendor lock-in and the switching costs are negligible. Further, Linea is committed to maintaining backwards compatibility with Ethereum and the EVM specification giving developers and businesses the reassurance that their success does not rely on a single point of failure, as is the case with networks not implementing an adopted standard such as the EVM.

Phase 0 also marks the instantiation of the Linea Security Council. To protect users and mitigate the risks associated with a new production system, the Security Council is a group of 8 keyholdersindividuals from within the Consensys organization who have the power to act in case of an emergency. The Security Council is executed through a multi-sig Safe (formerly Gnosis Safe) contract that requires certain thresholds of signatures to be submitted to action an emergency measure; the details of which can be found in our Risk Disclosures.

Finally, the client software used to run a local node on the Linea network will be made publicly available, giving any actor the option to verify the Linea state for themselves and minimize trust in the Linea operator.

# Phase 1 

There are two significant components in this phase: the Open Source Stack and ensuring 100% EVM Coverage.

In the spirit of fostering transparency and maintaining an open platform, the Open Source Stack is an essential element of our roadmap. We plan to license the Linea software stack under AGPL-3.0. This free software license ensures that users have the freedom to view, fork, and modify the code. The importance of this freedom cannot be understated, as it is a core principle of the web3 philosophy. We wholeheartedly believe that the community's ability to understand, adapt and even potentially assume control of the software, if necessary, is fundamental in maintaining trust and openness. We are committed to this approach, ensuring that even in a scenario where Linea or its governance deviates from its original objectives, the power remains firmly in the community's hands to guide it back on course.

The second cornerstone of this phase is the implementation of 100% EVM Coverage in the zkEVM arithmetization. Linea will generate proofs of computation for all EVM opcodes and precompiles, unlocking trustless execution for all use cases. Further, the specification for the arithmetization will be published, audited, and open to bug bounties to increase the security and reliability of the system.

The X phase, thus, marks our initial steps towards a more open, accessible, and trustworthy blockchain ecosystem, laying the groundwork for our future endeavors in the broader Linea ecosystem.

# Phase 2

This phase is pivotal to our continued efforts in solidifying our commitment to decentralization and trust minimization. It comprises two integral components: Diversifying the Security Council, and enabling Censorship Resistant Withdrawals.

Diversifying the Security Council forms the first part of this stage. The Security Council established during Linea's Mainnet Alpha launch plays a critical role in the oversight and control of the network. However, to prevent the concentration of power and potential bias, we plan to expand participation in the councilexpand this council to include a quorum-blocking group of members outside the Consensys organization, while also retaining a 6-of-8 multisig threshold or stricter for immediate upgrades. This modification ensures a balanced representation and fosters more robust collective decision-making, adding an additional layer of checks and balances to the system.

Closely tied to our principle of user sovereignty, enabling Censorship Resistant Withdrawals is a fundamental element of our roadmap. The architecture will be refined to prevent rollup operators from preventing user withdrawals. We will ensure that users can independently initiate exits, which guarantees continuous access to, and control over their assets on Linea. This assurance amplifies user confidence and upholds our commitment to ensuring users have sovereignty over their assets.

Through these initiatives, our Phase 2 aims to further decentralize power, enhance transparency and boost the user experience, all while maintaining robust security and control measures.


# Phase 3
In this phase, we turn our focus to decentralizing the roles crucial to the functioning of the Linea ecosystem, as well as our governance system itself, thereby further reinforcing our commitment to trust minimization and decentralization.

The first part of this phase is Decentralizing Operators. At present, Provers and Sequencers, which generate zero-knowledge proofs and manage Layer 2 transactions respectively, are crucial roles within our ecosystem. By decentralizing these roles, we aim to significantly bolster the trust of our network participants and the overall integrity of our system. We acknowledge the technical complexities this may bring, such as potential latency, increased transaction costs, and potential MEV (Maximum Extractable Value) issues. However, we are committed to navigating these challenges to ensure we continue providing a trustworthy, efficient platform for our users.

The second component of this phase is Decentralizing Governance. We believe that democratizing Linea's governance is key to our continued evolution. This approach fosters an equitable, transparent system where all stakeholders can participate and the future of Linea is steered by its user community. This shared governance not only mitigates unilateral decisions and the risk of a single point of failure but also reinforces the resilience of the network. In turn, this promotes collective ownership and trust among network participants, thereby enhancing the ecosystem's sustainable growth.

# Phase 4

The final phase of our roadmap, X, aims to further ensure the robustness of our ecosystem and mitigate trust-related risks through the implementation of a Multi-Prover and by Limiting Governance Powers.

The EVM will continue to evolve as described in the Ethereum roadmap and will be driven by the larger Ethereum community and Ethereum Foundation. Therefore, in order to make changes to the Linea network at a reasonable pace and safeguard against implementation risk, we plan to incorporate multiple diverse implementations of a zkEVM prover, known as a Multi-Prover rollup. With each transaction on Linea verified by multiple heterogeneous implementations of the zkEVM, we can ensure that even if one prover encounters a bug or becomes unavailable, which is not improbable given the complexity, the system continues to operate uninterrupted. This approach not only boosts confidence in the reliability of our platform during a period where the EVM specification is constantly evolving but also encourages the exploration of innovative advancements, all while maintaining exceptional levels of system uptime.



Lastly, as part of our commitment to a robust and decentralized governance model limiting governance to where it is only necessary, we plan to Limit Governance Powers. Upgrades to the rollup logic will be immutable, allowing upgrades only to be made to the verifier given a change in the EVM specification, of which users will be given more than 30 days to exit the rollup.

We will delineate the role of the Security Council to step in only in case of discrepancies or potential system issues, such as when the prover system disagrees or appears to be stuck. By implementing these measures, we hope to strike a balance between governance where necessary and the principles of decentralization.
