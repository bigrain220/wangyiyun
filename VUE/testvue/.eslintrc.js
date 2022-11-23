module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'new-cap': 0,
    'no-new': 0,
    'no-unused-vars': 0,
    'no-useless-escape': 0,
    'prefer-const': 0,
    'no-duplicate-case': 0,
    'space-before-function-paren': 0,
    'no-unused-expressions': 0,
    'array-callback-return': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
