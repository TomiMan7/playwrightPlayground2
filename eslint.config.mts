import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Global ignores, no linting
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', 'allure-report/**', 'allure-results/**', 'playwright-report/**', 'test-results/**'],
  },
  {
    // Only lint test related files
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts}', 'tests/**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      // Warn on unused variables
      'no-unused-vars': ['warn'],

      // Enforce using === and !== instead of == and !=
      eqeqeq: ['warn', 'always'],

      // Disallow console.log statements (useful for cleaner code)
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Require semicolons at the end of statements
      semi: ['warn', 'always'],
    },
  },
  tseslint.configs.recommended,
]);
