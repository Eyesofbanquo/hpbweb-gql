module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'max-len': [2, { code: 80, ignoreComments: false }],
    'no-console': 'off',
    semi: [2, 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
  },
};
