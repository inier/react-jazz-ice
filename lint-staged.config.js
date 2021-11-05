// .lintstagedrc.js
// https://github.com/okonet/lint-staged

module.exports = {
  'src/**/*.{js,jsx}': ['prettier --write', 'eslint --format table'],
  'src/**/*.{ts,tsx}': ['prettier --parser typescript --write', 'eslint --format table'],
  'src/**/*.{css}': ['prettier --write', 'stylelint'],
  'src/**/*.{less}': ['prettier --write', 'stylelint --syntax less'],
  'src/**/*.{sass,scss}': ['prettier --write', 'stylelint --syntax scss'],
  'src/**/*.{json}': ['prettier'],
  'src/**/*.{md,markdown}': ['lint-md'],
};
