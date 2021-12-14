// https://github.com/okonet/lint-staged

module.exports = {
  '*.{js,jsx}': ['eslint --cache', 'prettier --write'],
  '*.{ts,tsx}': ['eslint', 'prettier --parser typescript --write'],
  // '*.{scss}': 'stylelint --syntax scss',
  '*.{css,scss}': 'prettier --write',
  '*.{json,html,md,yml}': ['prettier --write'],
};
