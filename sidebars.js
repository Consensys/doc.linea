/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docSidebar: [
    {
      type: "category",
      collapsed: false,
      label: "Getting started",
      link: {
        type: 'doc',
        id: "index",
      },
      items: [
        "use-mainnet/set-up-your-wallet",
        "use-mainnet/fund",
        "use-mainnet/bridges-of-linea/bridging-non-dev",
        "use-mainnet/linea-xp",
        "use-mainnet/import-info-contracts",
        "use-mainnet/gas-on-linea",
      ],
    },
    {
      type: "link",
      label: "Network status",
      href: "https://linea.statuspage.io/",
    },
    {
      type: "link",
      label: "Linea Mainnet block explorer",
      href: "https://lineascan.build",
    },
    {
      type: "link",
      label: "Linea Goerli block explorer",
      href: "https://goerli.lineascan.build",
    },
    "risk-disclosures/index",
    "decentralization-roadmap/index",
    "zero-knowledge-glossary/index",
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
        collapsed: false,
        label: "Build on Linea",
        link: {
          type: 'doc',
          id: "build-on-linea/index",
        },
        items: [
          {
            type: "category",
            label: "Run a Linea node",
            link: {
              type: 'doc',
              id: "build-on-linea/run-a-node/index"
            },
            items: [
              "build-on-linea/run-a-node/use-docker",
              "build-on-linea/run-a-node/use-binary",
            ],
          },
        {
        type: "category",
        collapsed: false,
        label: "Quickstart",
        link: {
          type: 'doc',
          id: "build-on-linea/quickstart/index",
        },
        items: [
          {
            type: "category",
            label: "Deploy a smart contract",
            link: {
              type: "doc",
              id: "build-on-linea/quickstart/deploy-smart-contract/index",
            },
            items: [
              "build-on-linea/quickstart/deploy-smart-contract/atlas",
              "build-on-linea/quickstart/deploy-smart-contract/foundry",
              "build-on-linea/quickstart/deploy-smart-contract/hardhat",
              "build-on-linea/quickstart/deploy-smart-contract/remix",
              "build-on-linea/quickstart/deploy-smart-contract/thirdweb",
              "build-on-linea/quickstart/deploy-smart-contract/cookbook",
            ],
          },
          {
            type: "category",
            label: "Verify a smart contract",
            link: {
              type: "doc",
              id: "build-on-linea/quickstart/verify-smart-contract/index",
            },
            items: [
              "build-on-linea/quickstart/verify-smart-contract/atlas",
              "build-on-linea/quickstart/verify-smart-contract/foundry",
              "build-on-linea/quickstart/verify-smart-contract/hardhat",
            ],
          },
          "use-mainnet/fund",
          {
            type: "category",
            label: "Bridge your funds",
            link: {
              type: 'doc',
              id: 'use-mainnet/bridges-of-linea/index'
            },
            items: [
              "use-mainnet/bridges-of-linea/how-to-bridge-erc20-tokens",
              "use-mainnet/bridges-of-linea/how-to-bridge-eth",
            ],
          },
          "build-on-linea/quickstart/rpc",
        ],
      },
      "use-mainnet/info-contracts",
      "build-on-linea/ethereum-differences",
      "build-on-linea/gas-fees",
      "build-on-linea/goerli-to-sepolia",
     {
      type: "category",
      label: "Tooling and infrastructure",
      link: {
        type: "doc",
        id: "build-on-linea/tooling/index",
      },
      items: [
        {
          type: "category",
          label: "Account abstraction",
          link: {
            type: "doc",
            id: "build-on-linea/tooling/account-abstraction/account-abstraction"

          },
          items: [
            "build-on-linea/tooling/account-abstraction/arcana",
            "build-on-linea/tooling/account-abstraction/pimlico",
            "build-on-linea/tooling/account-abstraction/biconomy",
            "build-on-linea/tooling/account-abstraction/etherspot",
            "build-on-linea/tooling/account-abstraction/smartwallets",
            "build-on-linea/tooling/account-abstraction/station",
            "build-on-linea/tooling/account-abstraction/particle-network",
            "build-on-linea/tooling/account-abstraction/noves",
            "build-on-linea/tooling/account-abstraction/oklink",
          ],
        },
        {
          type: "category",
          label: "Analytics",
          link: {
            type: "doc",
            id: "build-on-linea/tooling/analytics/index"

          },
          items: [
            "build-on-linea/tooling/analytics/cookie3",
          ],
        },
        {
          type: "category",
          label: "Attestations",
          link: {
            type: "doc",
            id: "build-on-linea/tooling/attestations/index",
          },
          items: [
            "build-on-linea/tooling/attestations/verax",
            "build-on-linea/tooling/attestations/pado",
          ],
        },
        {
          type: "category",
          label: "Automation",
          link: {
            type: "doc",
            id: "build-on-linea/tooling/automation/index",
          },
          items: [
            "build-on-linea/tooling/automation/hal-stream",
          ],
        },
        {
          type: "category",
          label: "Cloud infrastructure",
          link: {
            type: "doc",
            id: "build-on-linea/tooling/cloud-infra/index",
          },
          items: [
            "build-on-linea/tooling/cloud-infra/spheron",
          ],
        },
        {
          type: "category",
          label: "Contracts templates",
          link: {
            type: "doc",
            id: "build-on-linea/tooling/contracts-templates/index",
          },
          items: [
            "build-on-linea/tooling/contracts-templates/thirdweb",
            "build-on-linea/tooling/contracts-templates/cookbook",
          ],
        },
        {
          type: "category",
          label: "Cross-chain",
          link: {
            type: "doc",
            id: "build-on-linea/tooling/cross-chain/index",
          },
          items: [
            "build-on-linea/tooling/cross-chain/axelar",
            "build-on-linea/tooling/cross-chain/layerzero",
          ],
        },
        {
          type: "category",
          label: "Data indexers",
          link: {
            type: "doc",
            id: "build-on-linea/tooling/data-indexers/index",
          },
          items: [
            "build-on-linea/tooling/data-indexers/covalent",
            "build-on-linea/tooling/data-indexers/envio",
            "build-on-linea/tooling/data-indexers/flair",
            {
              type: "category",
              label: "Goldsky",
              items: [
                "build-on-linea/tooling/data-indexers/goldsky/overview",
                "build-on-linea/tooling/data-indexers/goldsky/goldsky-index",
                "build-on-linea/tooling/data-indexers/goldsky/goldsky-mirror",
              ],
            },
            "build-on-linea/tooling/data-indexers/nftscan",
            "build-on-linea/tooling/data-indexers/reservoir",
            "build-on-linea/tooling/data-indexers/sentio",
            "build-on-linea/tooling/data-indexers/thegraph",
            "build-on-linea/tooling/data-indexers/noves",
            "build-on-linea/tooling/data-indexers/scopescan",
          ],
        },
        {
          type: "category",
          label: "Libraries",
          link: {
            type: "doc",
            id: "build-on-linea/tooling/libraries/index",
          },
          items: [
            "build-on-linea/tooling/libraries/ape",
            "build-on-linea/tooling/libraries/ethereum-list",
            "build-on-linea/tooling/libraries/ethers-js",
            "build-on-linea/tooling/libraries/multicall",
            "build-on-linea/tooling/libraries/wagmi",
            "build-on-linea/tooling/libraries/wallet-connect",
          ],
        },
        {
          type: "category",
          label: "Oracles",
          link: {
            type: "doc",
            id: "build-on-linea/tooling/oracles/index",
          },
          items: [
            "build-on-linea/tooling/oracles/api3",
            "build-on-linea/tooling/oracles/chainlink",
            "build-on-linea/tooling/oracles/dia",
            "build-on-linea/tooling/oracles/pyth",
            "build-on-linea/tooling/oracles/redstone",
            "build-on-linea/tooling/oracles/supra",
            "build-on-linea/tooling/oracles/umbrella",
          ],
        },
        {
          type: "category",
          label: "Security",
          link: {
            type: "doc",
            id: "build-on-linea/tooling/security/index",
          },
          items: [
            "build-on-linea/tooling/security/goplus-security-api",
            "build-on-linea/tooling/security/scamfari",
            "build-on-linea/tooling/security/spherex",
            "build-on-linea/tooling/security/hexagate",
          ],
        },
        {
          type: "category",
          label: "Social login",
          link: {
            type: "doc",
            id: "build-on-linea/tooling/social-login/index",
          },
          items: [
            "build-on-linea/tooling/social-login/arcana"
          ],
        },
      ],
     },
      "build-on-linea/tooling/linea-safe",
      "build-on-linea/tooling/linea-inscription",
      "build-on-linea/tooling/node-providers",
      {
        type: "category",
        label: "Reference",
        items: [
          {
            type: "category",
            label: "Linea JSON-RPC API",
            link: {
              type: "doc",
              id: "reference/api/index",
            },
            items: [
              "reference/api/linea-estimategas",
            ],
          },
        ],
      },
      "build-on-linea/linea-version/index",
      "build-on-linea/hackathons",
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
      "architecture/network-data",
      "architecture/transaction-lifecycle",
      {
        type: "category",
        label: "Bridges",
        link: {
          type: "doc",
          id: "architecture/bridges/index",
        },
        items: [
          "architecture/bridges/canonical-token-bridge",
        ],
      },
      {
        type: "category",
        label: "Canonical message service",
        link: {
          type: "doc",
          id: "architecture/canonical-msg-service/index",
        },
        items: [
          "architecture/canonical-msg-service/message-service",
        ],
      },
      "architecture/coordinator/index",
      "architecture/evm-state-manager/index",
      {
        type: "category",
        label: "Sequencer",
        link: {
          type: "doc",
          id: "architecture/sequencer/index",
        },
        items: [
          "architecture/sequencer/conflation",
          "architecture/sequencer/traces-generator",
        ],
      },
      {
        type: "category",
        label: "Trace expansion proving",
        link: {
          type: "doc",
          id: "architecture/trace-expansion-proving/index",
        },
        items: [
          "architecture/trace-expansion-proving/proving",
          "architecture/trace-expansion-proving/trace-expansion",
        ],
      },
     ]
};

module.exports = sidebars;


      