// https://github.com/okonet/lint-staged

module.exports = {
  'src/**/*.{js,jsx}': ['eslint', 'prettier --write'],
  'src/**/*.{ts,tsx}': ['eslint', 'prettier --parser typescript --write'],
  '**/*.css': ['stylelint', 'prettier --write'],
  '**/*.less': ['stylelint --syntax=less', 'prettier --write'],
  '**/*.scss': ['stylelint --syntax=scss', 'prettier --write'],
  '**/*.json': ['prettier --write'],
  '**/*.{md,markdown}': ['lint-md'],
};
