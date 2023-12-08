// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docSidebar: [
    {
      type: "category",
      collapsed: false,
      label: "Getting Started",
      link: {
        type: 'doc',
        id: "index",
      },
      items: [
        "use-mainnet/index",
        "use-mainnet/set-up-your-wallet",
        "use-mainnet/fund",
        "use-mainnet/bridges-of-linea/bridging-non-dev",
        "use-mainnet/linea-xp",
        "use-mainnet/gas-import",
        "use-mainnet/import-info-contracts",
      ],
    },
    {
      type: "link",
      label: "Network Status",
      href: "https://linea.statuspage.io/",
    },
    {
      type: "link",
      label: "Linea Mainnet Block Explorer",
      href: "https://lineascan.build",
    },
    {
      type: "link",
      label: "Linea Goerli Block Explorer",
      href: "https://goerli.lineascan.build",
    },
    "risk-disclosures/index",
    "decentralization-roadmap/index",
    "zero-knowledge-glossary/index",
    {
      type: "category",
      label: "Contact Us",
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
      "build-on-linea/quickstart/index",
      {
        type: "category",
        collapsed: false,
        label: "Quickstart",
        items: [
          {
            type: "category",
            label: "Deploy Smart Contract",
            items: [
              "build-on-linea/quickstart/deploy-smart-contract/atlas",
              "build-on-linea/quickstart/deploy-smart-contract/foundry",
              "build-on-linea/quickstart/deploy-smart-contract/hardhat",
              "build-on-linea/quickstart/deploy-smart-contract/remix",
              "build-on-linea/quickstart/deploy-smart-contract/thirdweb",
            ],
          },
          {
            type: "category",
            label: "Verify Smart Contract",
            items: [
              "build-on-linea/quickstart/verify-smart-contract/atlas",
              "build-on-linea/quickstart/verify-smart-contract/foundry",
              "build-on-linea/quickstart/verify-smart-contract/hardhat",
            ],
          },
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
          "build-on-linea/linea-sdk/index",
          "build-on-linea/run-a-node",
        ],
      },
      "use-mainnet/info-contracts",
      "build-on-linea/ethereum-differences",
      "build-on-linea/gas-fees",
     {
      type: "category",
      label: "Tooling and Infrastructure",
      link: {
        type: "doc",
        id: "build-on-linea/tooling/index",
      },
      items: [
        {
          type: "category",
          label: "Account Abstraction",
          items: [
            "build-on-linea/tooling/account-abstraction/4337",
            "build-on-linea/tooling/account-abstraction/biconomy",
            "build-on-linea/tooling/account-abstraction/etherspot",
            "build-on-linea/tooling/account-abstraction/smartwallets",
            "build-on-linea/tooling/account-abstraction/station",
          ],
        },
        {
          type: "category",
          label: "Attestations",
          items: [
            "build-on-linea/tooling/attestations/pado",
          ],
        },
        {
          type: "category",
          label: "Automation",
          items: [
            "build-on-linea/tooling/automation/hal-stream",
          ],
        },
        {
          type: "category",
          label: "Cloud Infra",
          items: [
            "build-on-linea/tooling/cloud-infra/spheron",
          ],
        },
        {
          type: "category",
          label: "Contracts Templates",
          items: [
            "build-on-linea/tooling/contracts-templates/thirdweb",
          ],
        },
        {
          type: "category",
          label: "Cross Chain",
          items: [
            "build-on-linea/tooling/cross-chain/axelar",
            "build-on-linea/tooling/cross-chain/layerzero",
          ],
        },
        {
          type: "category",
          label: "Data Indexers",
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
          ],
        },
        {
          type: "category",
          label: "Libraries",
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
          items: [
            "build-on-linea/tooling/oracles/api3",
            "build-on-linea/tooling/oracles/chainlink",
            "build-on-linea/tooling/oracles/dia",
            "build-on-linea/tooling/oracles/pyth",
            "build-on-linea/tooling/oracles/redstone",
            "build-on-linea/tooling/oracles/umbrella",
          ],
        },
        {
          type: "category",
          label: "Security",
          items: [
            "build-on-linea/tooling/security/goplus-security-api",
            "build-on-linea/tooling/security/scamfari",
          ],
        },
      ],
     },
      "build-on-linea/tooling/linea-safe",
      "build-on-linea/tooling/node-providers",
      "build-on-linea/linea-version/index",
     {
      type: "link",
      label: "Bug Bounty Program",
      href: "https://immunefi.com/bounty/linea/",
     },
  ],
  architectureSidebar: [
      "architecture/index",
      "architecture/network-data",
      "architecture/transaction-lifecycle",
      {
        type: "category",
        label: "Bridges",
        items: [
          "architecture/bridges/index",
          "architecture/bridges/canonical-token-bridge",
        ],
      },
      {
        type: "category",
        label: "Canonical Message Service",
        items: [
          "architecture/canonical-msg-service/index",
          "architecture/canonical-msg-service/message-service",
        ],
      },
      {
        type: "category",
        label: "Coordinator",
        items: [
          "architecture/coordinator/index",
        ],
      },
      {
        type: "category",
        label: "EVM State Manager",
        items: [
          "architecture/evm-state-manager/index",
        ],
      },
      {
        type: "category",
        label: "Sequencer",
        items: [
          "architecture/sequencer/index",
          "architecture/sequencer/conflation",
          "architecture/sequencer/traces-generator",
        ],
      },
      {
        type: "category",
        label: "Trace Expansion Proving",
        items: [
          "architecture/trace-expansion-proving/index",
          "architecture/trace-expansion-proving/proving",
          "architecture/trace-expansion-proving/trace-expansion",
        ],
      },
     ]
};

module.exports = sidebars;
