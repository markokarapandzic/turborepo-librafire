module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb', 'airbnb/hooks', "turbo", "prettier"],
  env: {
    browser: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'comma-dangle': ['error', { functions: 'ignore' }],
    'react/react-in-jsx-scope': 'off',
    'object-curly-newline': 'off',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'react/jsx-no-bind': 'off',
    'operator-linebreak': 'off',
    'no-underscore-dangle': 'off',
    "react-hooks/exhaustive-deps": 'off'
  }
};
