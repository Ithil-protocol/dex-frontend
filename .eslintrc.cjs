module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:@cspell/recommended",
    "plugin:sonarjs/recommended",
    "next/core-web-vitals",
    "prettier",
    "plugin:jsx-a11y/recommended",
    // "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "sonarjs"],
  rules: {
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
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"],
    "no-delete-var": "warn",

    "no-unused-vars": 0,
    //   [
    //   "warn",
    //   {
    //     args: "after-used",
    //     argsIgnorePattern: "^_",
    //     ignoreRestSiblings: true,
    //     vars: "all",
    //   },
    // ],
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
    "object-shorthand": ["error", "always"],
    quotes: ["warn", "double"],
    semi: ["error", "always"],
    "no-undef": 0,
  },
};
