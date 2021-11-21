// https://github.com/okonet/lint-staged

module.exports = {
  'src/**/*.{js,jsx}': ['eslint', 'prettier --write'],
  'src/**/*.{ts,tsx}': ['eslint', 'prettier --parser typescript --write'],
  // '**/*.{css,scss}': ['stylelint', 'prettier --write'],
  '**/*.json': ['prettier --write'],
  '**/*.{md,markdown}': ['lint-md'],
};
