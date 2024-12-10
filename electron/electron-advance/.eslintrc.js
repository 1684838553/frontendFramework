module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        "endOfLine": "auto"
      }
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'ts', 'tsx'] }],
    'import/no-unresolved': [2, { ignore: ['^@/'] }],
    '@typescript-eslint/indent': 0,
    'react/prop-types': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    "import/prefer-default-export": 0,
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    'jsx-a11y/click-events-have-key-events': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    "react/jsx-indent": [2, 2],
    "react/jsx-one-expression-per-line": "off",
    "react/no-array-index-key": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/anchor-is-valid": "off",
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.renderer.config.js',
      },
    },
  },
};
