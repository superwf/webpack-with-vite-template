module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'react', 'prettier', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/recommended',
  ],

  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': 2,
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'always',
      },
    ],
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'import/order': ['error', { 'newlines-between': 'always' }],
    'import/first': 0,
    'import/no-extraneous-dependencies': 0,

    // let prettier handle indent
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,

    // react hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.ts', '.js', '.jsx', '.json', '.tsx'],
      },
    },
  },
}
