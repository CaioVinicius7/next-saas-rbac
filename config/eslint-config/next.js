/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@rocketseat/eslint-config/next"],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        arrowParens: "always",
        semi: true,
        endOfLine: "auto",
        trailingComma: "none"
      }
    ]
  }
};
