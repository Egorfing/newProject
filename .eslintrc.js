module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'plugin:i18next/recommended', 'plugin:storybook/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: ['react', 'i18next', 'react-hooks', 'plugin-imports', 'unused-imports', 'prettier'],
  rules: {
    "unused-imports/no-unused-imports": "error",
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/consistent-type-imports': "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    'react/display-name': 'off',
    'i18next/no-literal-string': ['error', {
      onlyAttribute: ['makrupOnly', 'callees'],
      ignoreAttribute: ['data-testid', 'to ']
    }],
    'max-len': ['error', {
      ignoreComments: true,
      code: 120
    }],
    '@typescript-eslint/consistent-type-assertions': "off",
    'react/prop-types': 'warn',
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "no-undef": "off",
    "plugin-imports/path-checker": ["error", {
      alias: '@'
    }],
    "plugin-imports/public-api-imports": ["error", {
      alias: '@',
      testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx']
    }],
    "plugin-imports/layer-imports": ["error", {
      alias: '@',
      ignoreImportPatterns: ['**/StoreProvider', '**/testing']
    }],
    '@typescript-eslint/no-misused-promises': 'warn',
    'react/jsx-max-props-per-line': ['error', { maximum: 3 }]
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  overrides: [{
    files: ['**/src/**/*.test.{ts,tsx}'],
    rules: {
      'i18next/no-literal-string': 'off'
    }
  }]
};