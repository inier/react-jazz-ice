// https://github.com/okonet/lint-staged

module.exports = {
  '**/*.{js,jsx,ts,tsx}': 'eslint',
  '**/*.css': 'stylelint',
  '**/*.scss': 'stylelint --syntax=scss',
  '**/*.{js,jsx,ts,tsx,css,scss,json,html,md,yml}': ['prettier --write'],
};
