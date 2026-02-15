module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off', // Typescript handles this
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  ignorePatterns: ['/dist/*', '/node_modules/*'],
};
