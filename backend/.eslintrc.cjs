module.exports = {
  env: {
    es6: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:unicorn/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/no-misused-promises": 0,
    "@typescript-eslint/no-unsafe-assignment": 1,
    "@typescript-eslint/no-unsafe-call": 1,
    "@typescript-eslint/no-unsafe-member-access": 1,
    "@typescript-eslint/no-unsafe-return": 1,
    "unicorn/filename-case": [
      "warn",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
  },
  plugins: ["@typescript-eslint", "prefer-arrow", "unicorn"],
};
