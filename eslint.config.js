import js from '@eslint/js';
import globals from 'globals';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: [
      'node_modules/**',
      '.idea/**',
      'allure-*/**',
      'playwright-report/**',
      'test-results/**',
      'eslint.config.js',
      '*.config.js',
      'dist/**',
      'build/**',
      'coverage/**',
    ],
  },
  {
    files: ['**/*.js'],
    ...js.configs.recommended,
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
    plugins: {
      prettier,
    },
    rules: {
      // ✅ Prettier правила
      'prettier/prettier': 'error',

      // ✅ Стиль кода
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'comma-dangle': 'off',  // ✅ Prettier управляет

      // ✅ Лучшие практики
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      'no-console': 'warn',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',

      // ✅ Дополнительные полезные правила
      'arrow-parens': ['error', 'always'],
      'arrow-body-style': ['warn', 'as-needed'],
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'warn',
    },
  },
  {
    files: ['tests/**/*.spec.js'],
    ...playwright.configs['flat/recommended'],
    rules: {
      // ✅ Настройка правил Playwright
      'playwright/prefer-locator': 'warn',
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-force-option': 'warn',
      'playwright/no-page-pause': 'warn',
      'playwright/expect-expect': 'warn',
      'playwright/no-skipped-test': 'off',
      'playwright/no-focused-test': 'error',  // .only - ошибка
    },
  },
];
