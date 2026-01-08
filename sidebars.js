/** @type {import("@docusaurus/plugin-content-docs").SidebarsConfig} */
const sidebars = {
  getStartedSidebar: [
    {
      type: "doc",
      label: "Overview",
      id: "get-started/index",
    },
    "get-started/connect",
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
            "get-started/build/quickstart/hub",
            "get-started/build/quickstart/hub-reviews",
            "get-started/build/quickstart/events"
          ],
        },
        "get-started/build/ethereum-differences",
        "get-started/build/network-info",
        "get-started/build/contracts",
        "get-started/build/block-explorers",
        "get-started/build/dapp-support",
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
            "get-started/how-to/deploy-smart-contract/cookbook",
            "get-started/how-to/deploy-smart-contract/foundry",
            "get-started/how-to/deploy-smart-contract/hardhat",
            "get-started/how-to/deploy-smart-contract/remix",
            "get-started/how-to/deploy-smart-contract/thirdweb",
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
        "get-started/how-to/migrate-dapp",
        "get-started/how-to/connect-wallet",
        "get-started/how-to/gas-fees",
        "get-started/how-to/bridge",
        "get-started/how-to/linea-safe",
        "get-started/how-to/deploy-subdomain",
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
            "get-started/how-to/run-a-node/beta-v4-migration",
            // "get-started/how-to/run-a-node/erigon",
            "get-started/how-to/run-a-node/geth",
            "get-started/how-to/run-a-node/linea-besu",
            "get-started/how-to/run-a-node/maru",
            // "get-started/how-to/run-a-node/nethermind",
            "get-started/how-to/run-a-node/bootnodes",
          ],
        },
        "get-started/how-to/verify-users-with-proof-of-humanity",
        "get-started/how-to/state-recovery",
      ],
    },
  ],
  toolsSidebar: [
    {
      type: "doc",
      label: "Overview",
      id: "tools/index",
    },
    {
      type: "category",
      label: "Account abstraction",
      link: {
        type: "doc",
        id: "tools/account-abstraction/index",
      },
      items: [
        "tools/account-abstraction/biconomy",
        "tools/account-abstraction/etherspot",
        "tools/account-abstraction/metamask",
        "tools/account-abstraction/noves",
        "tools/account-abstraction/oklink",
        "tools/account-abstraction/openfort",
        "tools/account-abstraction/particle-network",
        "tools/account-abstraction/pimlico",
        "tools/account-abstraction/station",
        "tools/account-abstraction/smartwallets",
      ],
    },
    {
      type: "category",
      label: "Analytics",
      link: {
        type: "doc",
        id: "tools/analytics/index",
      },
      items: [
        "tools/analytics/arkham",
        "tools/analytics/cookie3",
        "tools/analytics/dune",
        "tools/analytics/mobula",
      ],
    },
    {
      type: "category",
      label: "Attestations",
      link: {
        type: "doc",
        id: "tools/attestations/index",
      },
      items: [
        "tools/attestations/primus",
        "tools/attestations/verax",
      ],
    },
    {
      type: "category",
      label: "AI",
      link: {
        type: "doc",
        id: "tools/ai/index",
      },
      items: ["tools/ai/spheron"],
    },
    {
      type: "category",
      label: "Contract templates",
      link: {
        type: "doc",
        id: "tools/contracts-templates/index",
      },
      items: [
        "tools/contracts-templates/cookbook",
        "tools/contracts-templates/thirdweb",
      ],
    },
    {
      type: "category",
      label: "Cross-chain",
      link: {
        type: "doc",
        id: "tools/cross-chain/index",
      },
      items: [
        "tools/cross-chain/arcana",
        "tools/cross-chain/axelar",
        "tools/cross-chain/ccip",
        "tools/cross-chain/ccip-read",
        "tools/cross-chain/layerzero",
        "tools/cross-chain/reactive-network",
        "tools/cross-chain/shortcuts",
        "tools/cross-chain/thirdweb",
      ],
    },
    {
      type: "category",
      label: "Data indexers",
      link: {
        type: "doc",
        id: "tools/data-indexers/index",
      },
      items: [
        "tools/data-indexers/alchemy",
        "tools/data-indexers/arkham",
        "tools/data-indexers/bitscrunch",
        "tools/data-indexers/covalent",
        {
          type: "category",
          label: "DipDup",
          link: {
            type: "doc",
            id: "tools/data-indexers/dipdup/overview",
          },
          items: [
            "tools/data-indexers/dipdup/overview",
            "tools/data-indexers/dipdup/quickstart",
          ],
        },
        "tools/data-indexers/dune",
        "tools/data-indexers/envio",
        "tools/data-indexers/etherscan",
        "tools/data-indexers/flair",
        {
          type: "category",
          label: "Goldsky",
          link: {
            type: "doc",
            id: "tools/data-indexers/goldsky/overview",
          },
          items: [
            "tools/data-indexers/goldsky/overview",
            "tools/data-indexers/goldsky/goldsky-index",
            "tools/data-indexers/goldsky/goldsky-mirror",
          ],
        },
        "tools/data-indexers/mobula",
        "tools/data-indexers/moralis",
        "tools/data-indexers/nftscan",
        "tools/data-indexers/noves",
        "tools/data-indexers/reservoir",
        "tools/data-indexers/sentio",
        "tools/data-indexers/subsquid",
        "tools/data-indexers/subquery",
        "tools/data-indexers/scopescan",
        "tools/data-indexers/thegraph",
      ],
    },
    {
      type: "category",
      label: "Gas",
      link: {
        type: "doc",
        id: "tools/gas/index",
      },
      items: [
        "tools/gas/blocknative",
      ],
    },
    {
      type: "category",
      label: "Libraries",
      link: {
        type: "doc",
        id: "tools/libraries/index",
      },
      items: [
        "tools/libraries/ape",
        "tools/libraries/ethereum-list",
        "tools/libraries/ethers-js",
        "tools/libraries/multicall",
        "tools/libraries/reown",
        "tools/libraries/viem",
        "tools/libraries/wagmi",
        "tools/libraries/web3j",
      ],
    },
    {
      type: "category",
      label: "Node providers",
      link: {
        type: "doc",
        id: "tools/node-providers/index",
      },
      items: ["tools/node-providers/erpc"],
    },
    {
      type: "category",
      label: "Oracles",
      link: {
        type: "doc",
        id: "tools/oracles/index",
      },
      items: [
        "tools/oracles/api3",
        "tools/oracles/chainlink",
        "tools/oracles/dia",
        "tools/oracles/ora",
        "tools/oracles/pyth",
        "tools/oracles/redstone",
        "tools/oracles/supra",
        "tools/oracles/tellor",
        "tools/oracles/umbrella",
      ],
    },
    {
      type: "category",
      label: "Permanent data",
      link: {
        type: "doc",
        id: "tools/permanent-data/index",
      },
      items: [
        {
          type: "category",
          label: "Irys",
          link: {
            type: "doc",
            id: "tools/permanent-data/irys/overview",
          },
          items: [
            "tools/permanent-data/irys/overview",
            "tools/permanent-data/irys/irys-quickstart",
            "tools/permanent-data/irys/irys-querying",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Privacy",
      link: {
        type: "doc",
        id: "tools/privacy/index",
      },
      items: ["tools/privacy/secret"],
    },
    {
      type: "category",
      label: "Security",
      link: {
        type: "doc",
        id: "tools/security/index",
      },
      items: [
        "tools/security/goplus-security-api",
        "tools/security/hexagate",
        "tools/security/hypernative",
        "tools/security/scamfari",
        "tools/security/spherex",
      ],
    },
    {
      type: "category",
      label: "Social login",
      link: {
        type: "doc",
        id: "tools/social-login/index",
      },
      items: [
        "tools/social-login/arcana",
        "tools/social-login/dynamic",
        "tools/social-login/metamask",
        "tools/social-login/openfort",
        "tools/social-login/privy",
      ],
    },
  ],
  learnSidebar: [
    "learn/first-dapp",
    "learn/aiagent-quickstart",
    "learn/marketplace-dapp",
    "learn/voting-dapp",
    "learn/fallback",
    {
      type: "category",
      label: "Ecosystem tutorials",
      link: {
        type: "doc",
        id: "learn/ecosystem-tutorials/index",
      },
      collapsible: false,
      items: [
        {
          type: "category",
          label: "Irys",
          link: {
            type: "doc",
            id: "learn/ecosystem-tutorials/irys/index",
          },
          items: [
            "learn/ecosystem-tutorials/irys/irys-dynamic-nfts",
            "learn/ecosystem-tutorials/irys/irys-nfts",
          ],
        },
        "learn/ecosystem-tutorials/usdc",
      ],
    },
  ],
  apiSidebar: [
    {
      type: "category",
      label: "Smart contract reference",
      link: null,
      collapsible: false,
      items: [
        "api/linea-smart-contracts/linearollup",
        "api/linea-smart-contracts/zkevmv2",
        {
          type: "category",
          label: "Interfaces",
          link: null,
          collapsible: true,
          items: [
            "api/linea-smart-contracts/interfaces/igenericerrors",
            "api/linea-smart-contracts/interfaces/imessageservice",
            "api/linea-smart-contracts/interfaces/ipausemanager",
            "api/linea-smart-contracts/interfaces/ipermissionsmanager",
            "api/linea-smart-contracts/interfaces/iratelimiter",
            {
              type: "category",
              label: "L1",
              link: null,
              collapsible: true,
              items: [
                "api/linea-smart-contracts/interfaces/l1/il1messagemanager",
                "api/linea-smart-contracts/interfaces/l1/il1messagemanagerv1",
                "api/linea-smart-contracts/interfaces/l1/il1messageservice",
                "api/linea-smart-contracts/interfaces/l1/ilinearollup",
                "api/linea-smart-contracts/interfaces/l1/iplonkverifier",
                "api/linea-smart-contracts/interfaces/l1/izkevmv2",
              ],
            },
            {
              type: "category",
              label: "L2",
              link: null,
              collapsible: true,
              items: [
                "api/linea-smart-contracts/interfaces/l2/il2messagemanager",
                "api/linea-smart-contracts/interfaces/l2/il2messagemanagerv1",
                "api/linea-smart-contracts/interfaces/l2/il2messageservicev1",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "lib",
          link: null,
          collapsible: true,
          items: [
            "api/linea-smart-contracts/lib/callforwardingproxy",
            "api/linea-smart-contracts/lib/l2messageservicepausemanager",
            "api/linea-smart-contracts/lib/linearolluppausemanager",
            "api/linea-smart-contracts/lib/mimc",
            "api/linea-smart-contracts/lib/pausemanager",
            "api/linea-smart-contracts/lib/sparsemerkleproof",
            "api/linea-smart-contracts/lib/tokenbridgepausemanager",
            "api/linea-smart-contracts/lib/utils",
          ],
        },
        {
          type: "category",
          label: "Message service",
          link: null,
          collapsible: true,
          items: [
            "api/linea-smart-contracts/messageservice/messageservicebase",
            {
              type: "category",
              label: "L1",
              link: null,
              collapsible: true,
              items: [
                "api/linea-smart-contracts/messageservice/l1/l1messagemanager",
                "api/linea-smart-contracts/messageservice/l1/l1messageservice",
                {
                  type: "category",
                  label: "v1",
                  link: null,
                  collapsible: true,
                  items: [
                    "api/linea-smart-contracts/messageservice/l1/v1/l1messagemanagerv1",
                    "api/linea-smart-contracts/messageservice/l1/v1/l1messageservicev1",
                  ],
                },
              ],
            },
            {
              type: "category",
              label: "L2",
              link: null,
              collapsible: true,
              items: [
                "api/linea-smart-contracts/messageservice/l2/l2messagemanager",
                "api/linea-smart-contracts/messageservice/l2/l2messageservice",
                {
                  type: "category",
                  label: "v1",
                  link: null,
                  collapsible: true,
                  items: [
                    "api/linea-smart-contracts/messageservice/l2/v1/l2messagemanagerv1",
                    "api/linea-smart-contracts/messageservice/l2/v1/l2messageservicev1",
                  ],
                },
              ],
            },
            {
              type: "category",
              label: "lib",
              link: null,
              collapsible: true,
              items: [
                "api/linea-smart-contracts/messageservice/lib/messagehashing",
                "api/linea-smart-contracts/messageservice/lib/ratelimiter",
                "api/linea-smart-contracts/messageservice/lib/sparsemerkletreeverifier",
                "api/linea-smart-contracts/messageservice/lib/timelock",
                "api/linea-smart-contracts/messageservice/lib/transientstoragehelpers",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Token bridge",
          link: null,
          collapsible: true,
          items: [
            "api/linea-smart-contracts/tokenbridge/bridgedtoken",
            "api/linea-smart-contracts/tokenbridge/tokenbridge",
            {
              type: "category",
              label: "Interfaces",
              link: null,
              collapsible: true,
              items: [
                "api/linea-smart-contracts/tokenbridge/interfaces/itokenbridge",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "JSON-RPC API reference",
      link: {
        type: "doc",
        id: "api/reference/index"
      },
      collapsible: false,
      items: [
        "api/reference/eth-sendbundle",
        "api/reference/eth-sendrawtransaction",
        "api/reference/linea-estimategas",
        "api/reference/linea-gettransactionexclusionstatusv1",
        "api/reference/linea-getproof",
      ],
    },
    {
      type: "category",
      label: "Token API reference",
      link: {
        type: "doc",
        id: "api/token-api/overview"
      },
      collapsible: false,
      items: [
        {
          type: "link",
          label: "Reference",
          href: "/api/token-api/reference"
        }
      ],
    },
    {
      type: "doc",
      label: "SDK guide",
      id: "api/linea-sdk"
    }
  ],
  technologySidebar: [
    "technology/architecture",
    "technology/tokenomics",
    "technology/burn",
    "technology/repos",
    "technology/transaction-lifecycle",
    "technology/gas",
    "technology/network-data",
    "technology/canonical-token-bridge",
    {
      type: "category",
      label: "Canonical message service",
      collapsible: false,
      link: {
        type: "doc",
        id: "technology/message-service/index",
      },
      items: [
        "technology/message-service/reference",
      ],
    },
    "technology/coordinator",
    {
      type: "category",
      label: "Sequencer",
      collapsible: false,
      link: {
        type: "doc",
        id: "technology/sequencer/index",
      },
      items: [
        "technology/sequencer/conflation",
        "technology/sequencer/traces-generator",
      ],
    },
    "technology/state-manager",
    {
      type: "category",
      label: "Prover",
      collapsible: false,
      link: {
        type: "doc",
        id: "technology/prover/index",
      },
      items: [
        "technology/prover/proving",
        "technology/prover/trace-expansion",
        "technology/prover/prover-limits",
      ],
    },
  ],
};

module.exports = sidebars;
