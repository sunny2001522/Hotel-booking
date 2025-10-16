import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  { 
    ignores: [".next/**"] 
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  eslintPluginPrettierRecommended,
];

export default eslintConfig;