module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb-typescript",
    "plugin:import/typescript",
    // @NOTE: Make sure this is always the last element in the array.
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: ["./tsconfig.json"],
  },
  plugins: [
    "react",
    "react-hooks",
    "jsx-a11y",
    "import",
    "prettier",
    "@typescript-eslint",
  ],
  settings: {
    react: {
      pragma: "React", // Pragma to use, default to "React"
      fragment: "Fragment", // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: "detect", // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "import/prefer-default-export": 0,
    "react/prop-types": 0,
    "import/no-unresolved": [
      "error",
      { ignore: ["^@theme", "^@docusaurus", "^@site"] },
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
    "@typescript-eslint/no-unused-vars": ["warn", { args: "none" }],
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
      },
    ],
    "import/extensions": 0,
  },
};
