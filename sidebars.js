/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docSidebar: [
    {
      type: "category",
      collapsed: false,
      label: "Move funds to Linea",
      link: {
        type: 'doc',
        id: "index",
      },
      items: [
        "use-mainnet/move-funds/set-up-your-wallet",
        "use-mainnet/move-funds/fund",
        "use-mainnet/move-funds/bridge/index",
      ],
    },
    {
      type: "category",
      label: "Linea Voyage",
      link: {
        type: "doc",
        id: "use-mainnet/linea-voyage/index",
      },
      items: [
        "use-mainnet/linea-voyage/lxp/index",
        {
          type: "category",
          label: "The Surge",
          link: {
            type: "doc",
            id: "use-mainnet/linea-voyage/linea-surge/index",
          },
          items: [
            "use-mainnet/linea-voyage/linea-surge/linea-surge-model",
            "use-mainnet/linea-voyage/linea-surge/linea-surge-overview",
          ],
        },
      ],
    },
    "use-mainnet/zero-knowledge-glossary/index",
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
        "build-on-linea/quickstart/ethereum-differences",
        "build-on-linea/quickstart/info-contracts",
        "build-on-linea/quickstart/goerli-to-sepolia"
      ],
    },
    {
      type: "category",
      label: "Guides",
      link: {
        type: "doc",
        id: "build-on-linea/guides/index"
      },
      items: [
        {
          type: "category",
          label: "Gas",
          link: {
            type: "doc",
            id: "build-on-linea/guides/gas/gas-fees",
          },
          items: [
            "build-on-linea/guides/gas/gas-fees",
            "build-on-linea/guides/gas/gas-on-linea",
          ]
        },
        "build-on-linea/guides/bridge/index",
        "build-on-linea/guides/linea-api/index",
        "build-on-linea/guides/linea-sdk/index",
        {
          type: "category",
          label: "Run a Linea node",
          link: {
            type: 'doc',
            id: "build-on-linea/guides/run-a-node/index"
          },
          items: [
            "build-on-linea/guides/run-a-node/use-docker",
            "build-on-linea/guides/run-a-node/use-binary",
          ],
        },
        "build-on-linea/guides/linea-safe",
        "build-on-linea/guides/linea-inscriptions",
      ]
    },
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
            "build-on-linea/tooling/account-abstraction/openfort"
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
            "build-on-linea/tooling/analytics/arkham",
            "build-on-linea/tooling/analytics/cookie3",
            "build-on-linea/tooling/analytics/dune",
            "build-on-linea/tooling/analytics/mobula",
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
            "build-on-linea/tooling/cross-chain/shortcuts",
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
            "build-on-linea/tooling/data-indexers/arkham",
            "build-on-linea/tooling/data-indexers/covalent",
            "build-on-linea/tooling/data-indexers/decommas",
            "build-on-linea/tooling/data-indexers/dune",
            "build-on-linea/tooling/data-indexers/envio",
            "build-on-linea/tooling/data-indexers/flair",
            "build-on-linea/tooling/data-indexers/mobula",
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
            "build-on-linea/tooling/data-indexers/subsquid",
            "build-on-linea/tooling/data-indexers/thegraph",
            "build-on-linea/tooling/data-indexers/subquery",
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
            "build-on-linea/tooling/social-login/arcana",
            "build-on-linea/tooling/social-login/openfort",
          ],
        },
        "build-on-linea/tooling/node-providers",
      ],
    },
    {
      type: "category",
      label: "Community",
      link: {
        type: "doc",
        id: "build-on-linea/community/hackathons",
      },
      items: [
        "build-on-linea/community/hackathons",
        {
          type: "link",
          label: "Bug bounty program",
          href: "https://immunefi.com/bounty/linea/",
          },
      ]
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
        label: "The Linea stack",
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
            items: [
              "architecture/stack/bridges/canonical-token-bridge",
            ],
          },
          {
            type: "category",
            label: "Canonical message service",
            link: {
              type: "doc",
              id: "architecture/stack/canonical-msg-service/index",
            },
            items: [
              "architecture/stack/canonical-msg-service/message-service",
            ],
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
            ],
          },
        ],
      },
     ],
};

module.exports = sidebars;


      
