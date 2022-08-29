// https://github.com/okonet/lint-staged

module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': 'eslint',
  'src/**/*.css': 'stylelint',
  'src/**/*.scss': 'stylelint --syntax=scss',
  'src/**/*.{js,jsx,ts,tsx,css,scss,json,html,md,yml}': ['prettier --write'],
};
