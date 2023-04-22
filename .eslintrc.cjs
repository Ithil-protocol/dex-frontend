module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@cspell/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:sonarjs/recommended",
    "prettier",
  ],
  globals: {
    JSX: true,
    React: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "@cspell", "sonarjs"],
  rules: {
    "@typescript-eslint/no-empty-interface": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@cspell/spellchecker": [
      "warn",
      {
        autoFix: false,
        checkComments: false,
      },
    ],
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        vars: "all",
      },
    ],
    "arrow-parens": "warn",
    indent: ["warn", 2],
    "linebreak-style": ["warn", "windows"],
    "no-delete-var": "warn",
    "no-unused-vars": "off",
    "no-use-before-define": [
      "error",
      {
        allowNamedExports: false,
        classes: true,
        functions: false,
        variables: false,
      },
    ],
    "no-var": "warn",
    "object-shorthand": ["warn", "always"],
    quotes: ["warn", "double"],
    semi: ["warn", "always"],
  },
};
