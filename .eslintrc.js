module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'no-continue': 0,
    'no-shadow': 0,
    camelcase: ['error', { allow: ['WEAPON_IDs'] }],
    'linebreak-style': 0, // git config autocrlf manages this automatically. No need to use eslint for this.
  },
};
