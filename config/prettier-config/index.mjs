/** @typedef {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig } */
const config = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "auto",
  bracketSameLine: false,
  plugins: ["prettier-plugin-tailwindcss"]
};

export default config;
