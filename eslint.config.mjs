import { defineConfig } from 'eslint/config'
import globals from 'globals'
import stylisticJs from '@stylistic/eslint-plugin'

export default defineConfig([{
  plugins: {
    '@stylistic': stylisticJs,
  },

  languageOptions: {
    globals: {
      ...globals.browser,
    },

    ecmaVersion: 12,
    sourceType: 'module',
  },

  rules: {
    'import/extensions': 0,
    'no-console': 0,
    'no-unused-expressions': 0,
    'no-continue': 0,
    'no-unused-vars': 'error',

    'no-underscore-dangle': [2, {
      allow: ['__filename', '__dirname'],
    }],

    '@stylistic/semi': ['error', 'never'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/indent': ['error', 2],
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
    '@stylistic/quote-props': ['error', 'as-needed'],
  },
}])
