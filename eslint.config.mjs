import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import _import from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
  },
  {
    ignores: [
      "**/build/",
      "**/.eslintrc.js",
      "docs/test-api",
      "./node_modules/*",
      "**/*.md",
      "**/*.mdx",
      "**/*.mp4",
      "**/*.mov",
      "src/components/cardlist.jsx",
      "src/components/HomepageCards/index.tsx",
      "**/sidebars.js",
      "**/LICENSE",
      "**/*.json",
      "**/.docusaurus/**/*",
      "**/.releaserc.js",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "plugin:react/recommended",
      "plugin:import/typescript",
      "plugin:prettier/recommended",
    ),
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      "jsx-a11y": jsxA11Y,
      import: fixupPluginRules(_import),
      prettier: fixupPluginRules(prettier),
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: ["./tsconfig.json"],
      },
    },

    settings: {
      react: {
        pragma: "React",
        fragment: "Fragment",
        version: "detect",
      },

      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },

      "import/resolver": {
        typescript: {},
      },
    },

    rules: {
      "react/jsx-filename-extension": [
        1,
        {
          extensions: [".js", ".tsx", ".jsx"],
        },
      ],

      "import/prefer-default-export": 0,
      "react/prop-types": 0,

      "import/no-unresolved": [
        "error",
        {
          ignore: ["^@theme", "^@docusaurus", "^@site"],
        },
      ],

      "no-nested-ternary": 0,
      "no-console": 0,
      "no-unused-vars": 0,
      "no-use-before-define": 0,
      "arrow-body-style": 0,
      "jsx-a11y/anchor-is-valid": 0,
      "jsx-a11y/no-static-element-interactions": 0,
      "jsx-a11y/click-events-have-key-events": 0,
      "@typescript-eslint/no-unused-expressions": 0,

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "none",
        },
      ],

      "@typescript-eslint/no-use-before-define": "warn",
      "react/require-default-props": 0,
      "react/jsx-props-no-spreading": 0,
      "react/button-has-type": 0,

      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          labelComponents: [],
          labelAttributes: [],
          controlComponents: [],
          assert: "either",
          depth: 2,
        },
      ],

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variableLike",
          leadingUnderscore: "forbid",
          trailingUnderscore: "forbid",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          filter: {
            regex: "^(__filename|__dirname)$",
            match: false,
          },
        },
      ],

      "import/extensions": 0,
    },
  },
];
