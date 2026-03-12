export default {
  extends: ["stylelint-config-standard"],
  rules: {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
    "selector-class-pattern": null,
    "custom-property-empty-line-before": null,
    "selector-id-pattern": null,
    "declaration-empty-line-before": null,
    "comment-empty-line-before": null,
    "value-keyword-case": ["lower", { camelCaseSvgKeywords: true }],
    "media-feature-range-notation": "prefix",
    "no-descending-specificity": null,
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["composes"],
      },
    ],
    "selector-max-id": [
      0,
      {
        message: "ID selectors are forbidden — use classes instead",
        severity: "warning",
      },
    ],
    "max-nesting-depth": [
      4,
      {
        message: "Nesting depth > 4 — simplify selector or use a class",
        severity: "warning",
      },
    ],
  },
};
