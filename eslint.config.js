import js from '@eslint/js';
import globals from 'globals';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules/**', '.idea/**', 'allure-*/**', 'playwright-report/**', 'test-results/**'],
  },
  {
    files: ['**/*.js'],
    ...js.configs.recommended,
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
    plugins: {
      prettier,
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'no-unused-vars': 'warn',
      'comma-dangle': ['error', 'always-multiline'],
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['tests/**/*.spec.js'],
    ...playwright.configs['flat/recommended'],
  },
];
