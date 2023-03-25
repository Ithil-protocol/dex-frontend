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
  ],
  globals: {
    JSX: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "@cspell", "sonarjs"],
  rules: {
    "@cspell/spellchecker": [
      "warn",
      {
        autoFix: false,
        checkComments: false,
      },
    ],
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
    "no-unused-vars": [
      "warn",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        vars: "all",
      },
    ],
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
    semi: ["warn", "always"],
  },
};
