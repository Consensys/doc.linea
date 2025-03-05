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
          ],
        },
        "get-started/build/ethereum-differences",
        "get-started/build/network-info",
        "get-started/build/contracts",
        "get-started/build/block-explorers",
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
        "get-started/how-to/poh-api",
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
            
            "get-started/tooling/account-abstraction/biconomy",
            "get-started/tooling/account-abstraction/etherspot",
            "get-started/tooling/account-abstraction/noves",
            "get-started/tooling/account-abstraction/oklink",
            "get-started/tooling/account-abstraction/openfort",
            "get-started/tooling/account-abstraction/particle-network",
            "get-started/tooling/account-abstraction/pimlico",
            "get-started/tooling/account-abstraction/station",
            "get-started/tooling/account-abstraction/smartwallets",
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
            "get-started/tooling/attestations/primus",
            "get-started/tooling/attestations/verax",
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
            "get-started/tooling/contracts-templates/cookbook",
            "get-started/tooling/contracts-templates/thirdweb",
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
            "get-started/tooling/cross-chain/arcana",
            "get-started/tooling/cross-chain/axelar",
            "get-started/tooling/cross-chain/ccip",
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
                id: "get-started/tooling/data-indexers/dipdup/overview",
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
                id: "get-started/tooling/data-indexers/goldsky/overview",
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
            id: "get-started/tooling/gas/index",
          },
          items: [
            "get-started/tooling/gas/blocknative",
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
            "get-started/tooling/libraries/reown",
            "get-started/tooling/libraries/viem",
            "get-started/tooling/libraries/wagmi",
          ],
        },
        {
          type: "category",
          label: "Node providers",
          link: {
            type: "doc",
            id: "get-started/tooling/node-providers/index",
          },
          items: ["get-started/tooling/node-providers/erpc"],
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
            id: "get-started/tooling/permanent-data/index",
          },
          items: [
            {
              type: "category",
              label: "Irys",
              link: {
                type: "doc",
                id: "get-started/tooling/permanent-data/irys/overview",
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
            "get-started/tooling/security/hexagate",
            "get-started/tooling/security/hypernative",
            "get-started/tooling/security/scamfari",
            "get-started/tooling/security/spherex",
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
    "learn/marketplace-dapp",
    "learn/voting-dapp",
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
    "technology/decentralization",
    "technology/repos",
    "technology/transaction-lifecycle",
    "technology/network-data",
    "technology/canonical-token-bridge",
    "technology/message-service",
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
