/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  getStartedSidebar: [
    {
      type: "doc",
      label: "Overview",
      id: "get-started/index",
    },
    {
      type: "category",
      label: "Build on Linea",
      link: null,
      collapsible: false,
      items: [
        {
          type: "category",
          label: "Quickstart",
          collapsible: false,
          link: {
            type: "doc",
            id: "get-started/build/quickstart/deploy",
          },
          items: [
            "get-started/build/quickstart/deploy",
            "get-started/build/quickstart/app",
          ]
        },
        "get-started/build/ethereum-differences",
        "get-started/build/network-info",
        "get-started/build/contracts",
        "get-started/build/block-explorers",
        "get-started/build/repos"
      ],
    },
    {
      type: "category",
      label: "How to",
      link: null,
      collapsible: false,
      items: [
        "get-started/how-to/get-testnet-eth",
        {
          type: "category",
          label: "Deploy a smart contract",
          link: {
            type: "doc",
            id: "get-started/how-to/deploy-smart-contract/index",
          },
          items: [
            "get-started/how-to/deploy-smart-contract/atlas",
            "get-started/how-to/deploy-smart-contract/foundry",
            "get-started/how-to/deploy-smart-contract/hardhat",
            "get-started/how-to/deploy-smart-contract/remix",
            "get-started/how-to/deploy-smart-contract/thirdweb",
            "get-started/how-to/deploy-smart-contract/cookbook",
          ],
        },
        {
          type: "category",
          label: "Verify a smart contract",
          link: {
            type: "doc",
            id: "get-started/how-to/verify-smart-contract/index",
          },
          items: [
            "get-started/how-to/verify-smart-contract/atlas",
            "get-started/how-to/verify-smart-contract/foundry",
            "get-started/how-to/verify-smart-contract/hardhat",
          ],
        },
        "get-started/how-to/gas-fees",
        {
          type: "category",
          label: "Bridge your tokens",
          link: {
            type: "doc",
            id: "get-started/how-to/bridge/index",
          },
          items: [
            "get-started/how-to/bridge/how-to-bridge-eth",
            "get-started/how-to/bridge/how-to-bridge-erc20-tokens",
          ],
        },
        "get-started/how-to/linea-safe",
        "get-started/how-to/deploy-subdomain",
        "get-started/how-to/linea-inscriptions",
        "get-started/how-to/finalized-block",
        {
          type: "category",
          label: "Run a node",
          link: {
            type: "doc",
            id: "get-started/how-to/run-a-node/index",
          },
          items: [
            "get-started/how-to/run-a-node/besu",
            "get-started/how-to/run-a-node/erigon",
            "get-started/how-to/run-a-node/geth",
            "get-started/how-to/run-a-node/linea-besu",
            "get-started/how-to/run-a-node/nethermind",
            "get-started/how-to/run-a-node/bootnodes",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Concepts",
      link: {
        type: "doc",
        id: "get-started/concepts/index",
      },
      collapsible: false,
      items: [
        "get-started/concepts/architecture",
        "get-started/concepts/decentralization",
        "get-started/concepts/transaction-lifecycle",
        "get-started/concepts/network-data",
        "get-started/concepts/canonical-token-bridge",
        "get-started/concepts/message-service",
        "get-started/concepts/coordinator",
        {
          type: "category",
          label: "Sequencer",
          link: {
            type: "doc",
            id: "get-started/concepts/sequencer/index"
          },
          items: [
            "get-started/concepts/sequencer/conflation",
            "get-started/concepts/sequencer/traces-generator"
          ]
        },
        "get-started/concepts/state-manager",
        {
          type: "category",
          label: "Prover",
          link: {
            type: "doc",
            id: "get-started/concepts/prover/index"
          },
          items: [
            "get-started/concepts/prover/proving",
            "get-started/concepts/prover/trace-expansion",
            "get-started/concepts/prover/prover-limits"
          ]
        }
      ],
    },
    {
      type: "category",
      label: "Tools",
      link: null,
      collapsible: false,
      items: [
        {
          type: "category",
          label: "Account abstraction",
          link: {
            type: "doc",
            id: "get-started/tooling/account-abstraction/index",
          },
          items: [
            "get-started/tooling/account-abstraction/arcana",
            "get-started/tooling/account-abstraction/pimlico",
            "get-started/tooling/account-abstraction/biconomy",
            "get-started/tooling/account-abstraction/etherspot",
            "get-started/tooling/account-abstraction/smartwallets",
            "get-started/tooling/account-abstraction/station",
            "get-started/tooling/account-abstraction/particle-network",
            "get-started/tooling/account-abstraction/noves",
            "get-started/tooling/account-abstraction/oklink",
            "get-started/tooling/account-abstraction/openfort",
          ],
        },
        {
          type: "category",
          label: "Analytics",
          link: {
            type: "doc",
            id: "get-started/tooling/analytics/index",
          },
          items: [
            "get-started/tooling/analytics/arkham",
            "get-started/tooling/analytics/cookie3",
            "get-started/tooling/analytics/dune",
            "get-started/tooling/analytics/mobula",
          ],
        },
        {
          type: "category",
          label: "Attestations",
          link: {
            type: "doc",
            id: "get-started/tooling/attestations/index",
          },
          items: [
            "get-started/tooling/attestations/verax",
            "get-started/tooling/attestations/pado",
          ],
        },
        {
          type: "category",
          label: "AI",
          link: {
            type: "doc",
            id: "get-started/tooling/ai/index",
          },
          items: ["get-started/tooling/ai/spheron"],
        },
        {
          type: "category",
          label: "Contract templates",
          link: {
            type: "doc",
            id: "get-started/tooling/contracts-templates/index",
          },
          items: [
            "get-started/tooling/contracts-templates/thirdweb",
            "get-started/tooling/contracts-templates/cookbook",
          ],
        },
        {
          type: "category",
          label: "Cross-chain",
          link: {
            type: "doc",
            id: "get-started/tooling/cross-chain/index",
          },
          items: [
            "get-started/tooling/cross-chain/axelar",
            "get-started/tooling/cross-chain/ccip-read",
            "get-started/tooling/cross-chain/layerzero",
            "get-started/tooling/cross-chain/shortcuts",
          ],
        },
        {
          type: "category",
          label: "Data indexers",
          link: {
            type: "doc",
            id: "get-started/tooling/data-indexers/index",
          },
          items: [
            "get-started/tooling/data-indexers/alchemy",
            "get-started/tooling/data-indexers/arkham",
            "get-started/tooling/data-indexers/covalent",
            {
              type: "category",
              label: "DipDup",
              link: {
                type: "doc",
                id: "get-started/tooling/data-indexers/dipdup/overview"
              },
              items: [
                "get-started/tooling/data-indexers/dipdup/overview",
                "get-started/tooling/data-indexers/dipdup/quickstart",   
              ],
            },            
            "get-started/tooling/data-indexers/dune",
            "get-started/tooling/data-indexers/envio",
            "get-started/tooling/data-indexers/etherscan",
            "get-started/tooling/data-indexers/flair",            
            {
              type: "category",
              label: "Goldsky",
              link: {
                type: "doc",
                id: "get-started/tooling/data-indexers/goldsky/overview"
              },
              items: [
                "get-started/tooling/data-indexers/goldsky/overview",
                "get-started/tooling/data-indexers/goldsky/goldsky-index",
                "get-started/tooling/data-indexers/goldsky/goldsky-mirror",
              ],
            },
            "get-started/tooling/data-indexers/mobula",
            "get-started/tooling/data-indexers/moralis",
            "get-started/tooling/data-indexers/nftscan",
            "get-started/tooling/data-indexers/noves",
            "get-started/tooling/data-indexers/reservoir",
            "get-started/tooling/data-indexers/sentio",
            "get-started/tooling/data-indexers/subsquid",
            "get-started/tooling/data-indexers/subquery",
            "get-started/tooling/data-indexers/scopescan",
            "get-started/tooling/data-indexers/thegraph",
          ],
        },
        {
          type: "category",
          label: "Gas",
          link: {
            type: "doc",
            id: "developers/tooling/gas/index",
          },
          items: [
            "developers/tooling/gas/blocknative",
          ],
        },
        {
          type: "category",
          label: "Libraries",
          link: {
            type: "doc",
            id: "get-started/tooling/libraries/index",
          },
          items: [
            "get-started/tooling/libraries/ape",
            "get-started/tooling/libraries/ethereum-list",
            "get-started/tooling/libraries/ethers-js",
            "get-started/tooling/libraries/multicall",
            "get-started/tooling/libraries/viem",
            "get-started/tooling/libraries/wagmi",
            "get-started/tooling/libraries/walletconnect",
          ],
        },
        {
          type: "category",
          label: "Node providers",
          link: {
            type: "doc",
            id: "get-started/tooling/node-providers/index",
          },
          items: [
            "get-started/tooling/node-providers/erpc",
          ],
        },
        {
          type: "category",
          label: "Oracles",
          link: {
            type: "doc",
            id: "get-started/tooling/oracles/index",
          },
          items: [
            "get-started/tooling/oracles/api3",
            "get-started/tooling/oracles/chainlink",
            "get-started/tooling/oracles/dia",
            "get-started/tooling/oracles/ora",
            "get-started/tooling/oracles/pyth",
            "get-started/tooling/oracles/redstone",
            "get-started/tooling/oracles/supra",
            "get-started/tooling/oracles/tellor",
            "get-started/tooling/oracles/umbrella",
          ],
        },
        {
          type: "category",
          label: "Permanent data",
          link: {
            type: "doc",
            id: "get-started/tooling/permanent-data/index"
          },
          items: [
            {
              type: "category",
              label: "Irys",
              link: {
                type: "doc",
                id: "get-started/tooling/permanent-data/irys/overview"
              },
              items: [
                "get-started/tooling/permanent-data/irys/overview",
                "get-started/tooling/permanent-data/irys/irys-quickstart",
                "get-started/tooling/permanent-data/irys/irys-querying",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Privacy",
          link: {
            type: "doc",
            id: "get-started/tooling/privacy/index",
          },
          items: ["get-started/tooling/privacy/secret"],
        },
        {
          type: "category",
          label: "Security",
          link: {
            type: "doc",
            id: "get-started/tooling/security/index",
          },
          items: [
            "get-started/tooling/security/goplus-security-api",
            "get-started/tooling/security/scamfari",
            "get-started/tooling/security/spherex",
            "get-started/tooling/security/hexagate",
            "get-started/tooling/security/hypernative"
          ],
        },
        {
          type: "category",
          label: "Social login",
          link: {
            type: "doc",
            id: "get-started/tooling/social-login/index",
          },
          items: [
            "get-started/tooling/social-login/arcana",
            "get-started/tooling/social-login/openfort",
          ],
        },
      ],
    },
  ],
  learnSidebar: [
    {
      type: "category",
      label: "Learn",
      link: {
        type: "doc",
        id: "learn/index",
      },
      collapsible: false,
      items: [
        {
          type: "category",
          label: "Ecosystem tutorials",
          link: {
            type: "doc",
            id: "learn/ecosystem-tutorials/index"
          },
          collapsible: false,
          items: [
            {
              type: "category",
              label: "Irys",
              link: {
                type: "doc",
                id: "learn/ecosystem-tutorials/irys/index"
              },
              items: [
                "learn/ecosystem-tutorials/irys/irys-dynamic-nfts",
                "learn/ecosystem-tutorials/irys/irys-nfts",
              ]
            }
          ]
        }
      ]
    }
  ],
  apiSidebar: [
    {
      type: "doc",
      label: "Overview",
      id: "api/index",
    },
    {
      type: "category",
      label: "Linea JSON-RPC API",
      link: null,
      collapsible: false,
      items: [
        "api/reference/eth-sendrawtransaction",
        "api/reference/linea-estimategas",
        "api/reference/linea-gettransactionexclusionstatusv1",
        "api/reference/linea-getproof",
      ]
    },
    "api/linea-sdk",
  ]
}

module.exports = sidebars;