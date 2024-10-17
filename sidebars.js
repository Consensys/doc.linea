/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docSidebar: [
    "users/index",
    {
      type: "category",
      collapsed: true,
      label: "Move funds to Linea",
      link: {
        type: "doc",
        id: "users/move-funds/index",
      },
      items: [
        "users/move-funds/set-up-your-wallet",
        "users/move-funds/fund",
        "users/move-funds/bridge",
      ],
    },
    {
      type: "category",
      label: "Linea Voyage",
      link: {
        type: "doc",
        id: "users/linea-voyage/index",
      },
      items: [
        "users/linea-voyage/lxp/index",
        {
          type: "category",
          label: "The Surge",
          link: {
            type: "doc",
            id: "users/linea-voyage/linea-surge/index",
          },
          items: [
            "users/linea-voyage/linea-surge/linea-surge-model",
            "users/linea-voyage/linea-surge/linea-surge-overview",
          ],
        },
      ],
    },
    "users/zero-knowledge-glossary/index",
    "risk-disclosures/index",
    {
      type: "category",
      label: "Contact us",
      items: [
        {
          type: "link",
          label: "Get help",
          href: "https://support.linea.build/",
        },
        {
          type: "link",
          label: "Provide feedback",
          href: "https://community.linea.build/c/feedback",
        },
        {
          type: "link",
          label: "Report an issue",
          href: "https://community.linea.build/c/bug-reports/",
        },
        {
          type: "link",
          label: "Join our Discord",
          href: "https://discord.gg/linea",
        },
      ],
    },
  ],
  developersSidebar: [
    {
      type: "category",
      label: "Getting started",
      link: {
        type: "doc",
        id: "developers/quickstart/index",
      },
      items: [
        {
          type: "category",
          label: "Deploy a smart contract",
          link: {
            type: "doc",
            id: "developers/quickstart/deploy-smart-contract/index",
          },
          items: [
            "developers/quickstart/deploy-smart-contract/atlas",
            "developers/quickstart/deploy-smart-contract/foundry",
            "developers/quickstart/deploy-smart-contract/hardhat",
            "developers/quickstart/deploy-smart-contract/remix",
            "developers/quickstart/deploy-smart-contract/thirdweb",
            "developers/quickstart/deploy-smart-contract/cookbook",
          ],
        },
        {
          type: "category",
          label: "Verify a smart contract",
          link: {
            type: "doc",
            id: "developers/quickstart/verify-smart-contract/index",
          },
          items: [
            "developers/quickstart/verify-smart-contract/atlas",
            "developers/quickstart/verify-smart-contract/foundry",
            "developers/quickstart/verify-smart-contract/hardhat",
          ],
        },
        "developers/quickstart/ethereum-differences",
        "developers/quickstart/info-contracts",
      ],
    },
    {
      type: "category",
      label: "Guides",
      link: {
        type: "doc",
        id: "developers/guides/index",
      },
      items: [
        {
          type: "category",
          label: "Gas",
          link: {
            type: "doc",
            id: "developers/guides/gas/gas-fees",
          },
          items: [
            "developers/guides/gas/gas-fees",
            "developers/guides/gas/gas-on-linea",
          ],
        },
        {
          type: "category",
          label: "Bridge your tokens",
          link: {
            type: "doc",
            id: "developers/guides/bridge/index",
          },
          items: [
            "developers/guides/bridge/how-to-bridge-eth",
            "developers/guides/bridge/how-to-bridge-erc20-tokens",
          ],
        },
        {
          type: "category",
          label: "Community tutorials",
          link: {
            type: "doc",
            id: "developers/guides/community/index",
          },
          items: [
            {
              type: "link",
              label: "Linea Learning Track",
              href: "https://www.hackquest.io/en/learning-track/9be129e7-575b-49bd-a64e-1bbe32427ace",
            },
            {
              type: "category",
              label: "Irys",
              link: {
                type: "doc",
                id: "developers/guides/community/irys/index",
              },
              items: [
                "developers/guides/community/irys/irys-dynamic-nfts",
                "developers/guides/community/irys/irys-nfts",
              ],
            },
          ],
        },
        "developers/guides/linea-api/index",
        "developers/guides/linea-sdk/index",
        "developers/guides/finalized-block",
        {
          type: "category",
          label: "Run a Linea node",
          link: {
            type: "doc",
            id: "developers/guides/run-a-node/index",
          },
          items: [
            "developers/guides/run-a-node/besu",
            "developers/guides/run-a-node/erigon",
            "developers/guides/run-a-node/geth",
            "developers/guides/run-a-node/linea-besu",
            "developers/guides/run-a-node/bootnodes",
          ],
        },
        "developers/guides/linea-safe",
        "developers/guides/linea-inscriptions",
        "developers/guides/deploy-subdomain",
      ],
    },
    {
      type: "category",
      label: "Tooling and infrastructure",
      link: {
        type: "doc",
        id: "developers/tooling/index",
      },
      items: [
        {
          type: "category",
          label: "Account abstraction",
          link: {
            type: "doc",
            id: "developers/tooling/account-abstraction/account-abstraction",
          },
          items: [
            "developers/tooling/account-abstraction/arcana",
            "developers/tooling/account-abstraction/pimlico",
            "developers/tooling/account-abstraction/biconomy",
            "developers/tooling/account-abstraction/etherspot",
            "developers/tooling/account-abstraction/smartwallets",
            "developers/tooling/account-abstraction/station",
            "developers/tooling/account-abstraction/particle-network",
            "developers/tooling/account-abstraction/noves",
            "developers/tooling/account-abstraction/oklink",
            "developers/tooling/account-abstraction/openfort",
          ],
        },
        {
          type: "category",
          label: "Analytics",
          link: {
            type: "doc",
            id: "developers/tooling/analytics/index",
          },
          items: [
            "developers/tooling/analytics/arkham",
            "developers/tooling/analytics/cookie3",
            "developers/tooling/analytics/dune",
            "developers/tooling/analytics/mobula",
          ],
        },
        {
          type: "category",
          label: "Attestations",
          link: {
            type: "doc",
            id: "developers/tooling/attestations/index",
          },
          items: [
            "developers/tooling/attestations/verax",
            "developers/tooling/attestations/pado",
          ],
        },
        {
          type: "category",
          label: "Cloud infrastructure",
          link: {
            type: "doc",
            id: "developers/tooling/cloud-infra/index",
          },
          items: ["developers/tooling/cloud-infra/spheron"],
        },
        {
          type: "category",
          label: "Contract templates",
          link: {
            type: "doc",
            id: "developers/tooling/contracts-templates/index",
          },
          items: [
            "developers/tooling/contracts-templates/thirdweb",
            "developers/tooling/contracts-templates/cookbook",
          ],
        },
        {
          type: "category",
          label: "Cross-chain",
          link: {
            type: "doc",
            id: "developers/tooling/cross-chain/index",
          },
          items: [
            "developers/tooling/cross-chain/axelar",
            "developers/tooling/cross-chain/ccip-read-gateway",
            "developers/tooling/cross-chain/layerzero",
            "developers/tooling/cross-chain/shortcuts",
          ],
        },
        {
          type: "category",
          label: "Data indexers",
          link: {
            type: "doc",
            id: "developers/tooling/data-indexers/index",
          },
          items: [
            "developers/tooling/data-indexers/alchemy",
            "developers/tooling/data-indexers/arkham",
            "developers/tooling/data-indexers/covalent",
            {
              type: "category",
              label: "DipDup",
              items: [
                "developers/tooling/data-indexers/dipdup/overview",
                "developers/tooling/data-indexers/dipdup/quickstart",   
              ],
            },            
            "developers/tooling/data-indexers/dune",
            "developers/tooling/data-indexers/envio",
            "developers/tooling/data-indexers/flair",            
            {
              type: "category",
              label: "Goldsky",
              items: [
                "developers/tooling/data-indexers/goldsky/overview",
                "developers/tooling/data-indexers/goldsky/goldsky-index",
                "developers/tooling/data-indexers/goldsky/goldsky-mirror",
              ],
            },
            "developers/tooling/data-indexers/mobula",
            "developers/tooling/data-indexers/moralis",
            "developers/tooling/data-indexers/nftscan",
            "developers/tooling/data-indexers/noves",
            "developers/tooling/data-indexers/reservoir",
            "developers/tooling/data-indexers/sentio",
            "developers/tooling/data-indexers/subsquid",
            "developers/tooling/data-indexers/subquery",
            "developers/tooling/data-indexers/scopescan",
            "developers/tooling/data-indexers/thegraph",
          ],
        },
        {
          type: "category",
          label: "Libraries",
          link: {
            type: "doc",
            id: "developers/tooling/libraries/index",
          },
          items: [
            "developers/tooling/libraries/ape",
            "developers/tooling/libraries/ethereum-list",
            "developers/tooling/libraries/ethers-js",
            "developers/tooling/libraries/multicall",
            "developers/tooling/libraries/viem",
            "developers/tooling/libraries/wagmi",
            "developers/tooling/libraries/wallet-connect",
          ],
        },
        {
          type: "category",
          label: "Node providers",
          link: {
            type: "doc",
            id: "developers/tooling/node-providers/index",
          },
          items: [
            "developers/tooling/node-providers/erpc",
          ],
        },
        {
          type: "category",
          label: "Oracles",
          link: {
            type: "doc",
            id: "developers/tooling/oracles/index",
          },
          items: [
            "developers/tooling/oracles/api3",
            "developers/tooling/oracles/chainlink",
            "developers/tooling/oracles/dia",
            "developers/tooling/oracles/ora",
            "developers/tooling/oracles/pyth",
            "developers/tooling/oracles/redstone",
            "developers/tooling/oracles/supra",
            "developers/tooling/oracles/tellor",
            "developers/tooling/oracles/umbrella",
          ],
        },
        {
          type: "category",
          label: "Permanent data",
          items: [
            {
              type: "category",
              label: "Irys",
              items: [
                "developers/tooling/permanent-data/irys/overview",
                "developers/tooling/permanent-data/irys/irys-quickstart",
                "developers/tooling/permanent-data/irys/irys-querying",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Privacy",
          link: {
            type: "doc",
            id: "developers/tooling/privacy/index",
          },
          items: ["developers/tooling/privacy/secret"],
        },
        {
          type: "category",
          label: "Security",
          link: {
            type: "doc",
            id: "developers/tooling/security/index",
          },
          items: [
            "developers/tooling/security/goplus-security-api",
            "developers/tooling/security/scamfari",
            "developers/tooling/security/spherex",
            "developers/tooling/security/hexagate",
            "developers/tooling/security/hypernative"
          ],
        },
        {
          type: "category",
          label: "Social login",
          link: {
            type: "doc",
            id: "developers/tooling/social-login/index",
          },
          items: [
            "developers/tooling/social-login/arcana",
            "developers/tooling/social-login/openfort",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Reference",
      items: [
        {
          type: "category",
          label: "Linea JSON-RPC API",
          link: {
            type: "doc",
            id: "developers/reference/api/index",
          },
          items: [
            "developers/reference/api/eth-sendrawtransaction",
            "developers/reference/api/linea-estimategas",
            "developers/reference/api/linea-gettransactionexclusionstatusv1",
            "developers/reference/api/linea-getproof",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Community",
      link: {
        type: "doc",
        id: "developers/community/hackathons",
      },
      items: [
        "developers/community/hackathons",
        {
          type: "link",
          label: "Bug bounty program",
          href: "https://immunefi.com/bounty/linea/",
        },
      ],
    },
  ],
  architectureSidebar: [
    "architecture/index",
    {
      type: "category",
      label: "Overview",
      link: {
        type: "doc",
        id: "architecture/overview/index",
      },
      items: [
        "architecture/overview/decentralization-roadmap/index",
        "architecture/overview/transaction-lifecycle",
        "architecture/overview/network-data",
      ],
    },
    {
      type: "category",
      label: "Linea software",
      link: {
        type: "doc",
        id: "architecture/stack/index",
      },
      items: [
        {
          type: "category",
          label: "Bridge",
          link: {
            type: "doc",
            id: "architecture/stack/bridges/index",
          },
          items: ["architecture/stack/bridges/canonical-token-bridge"],
        },
        {
          type: "category",
          label: "Canonical message service",
          link: {
            type: "doc",
            id: "architecture/stack/canonical-msg-service/index",
          },
          items: ["architecture/stack/canonical-msg-service/message-service"],
        },
        "architecture/stack/coordinator/index",
        {
          type: "category",
          label: "Sequencer",
          link: {
            type: "doc",
            id: "architecture/stack/sequencer/index",
          },
          items: [
            "architecture/stack/sequencer/conflation",
            "architecture/stack/sequencer/traces-generator",
          ],
        },
        "architecture/stack/evm-state-manager/index",
        {
          type: "category",
          label: "Prover",
          link: {
            type: "doc",
            id: "architecture/stack/trace-expansion-proving/index",
          },
          items: [
            "architecture/stack/trace-expansion-proving/proving",
            "architecture/stack/trace-expansion-proving/trace-expansion",
            "architecture/stack/trace-expansion-proving/prover-limits"
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
