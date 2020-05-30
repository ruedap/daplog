module.exports = {
  root: true,
  ignorePatterns: [
    'out/'
  ],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'react'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/strict-boolean-expressions': ['off'],
    '@typescript-eslint/no-floating-promises': ['off'],
    '@typescript-eslint/default-param-last': 'off',
    'no-new': ['off'],
    'react/prop-types': ['off'],
    'no-console': ['warn'],
    'react/jsx-curly-spacing': ['error', {
      when: 'always',
      allowMultiline: true,
      children: true
    }],
    'react/jsx-indent': ['error', 2, { indentLogicalExpressions: true }]
  }
}
