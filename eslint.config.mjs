import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  // Global ignores
  {
    ignores: ["dist/", ".astro/", "node_modules/", ".github/", ".env*"],
  },
  
  // TypeScript & Javascript configurations
  ...tseslint.configs.recommended,
  
  // Astro configurations
  ...eslintPluginAstro.configs.recommended,
  
  // Overrides for Astro files
  {
    files: ["**/*.astro"],
    parser: "astro-eslint-parser",
    parserOptions: {
      parser: "@typescript-eslint/parser",
      extraFileExtensions: [".astro"],
    },
    rules: {
      "astro/valid-compile": "error",
    },
  },
  
  // General strictness
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "info"] }], // Allow useful logging
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
