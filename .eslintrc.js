// https://eslint.org/docs/rules/
// https://www.npmjs.com/package/eslint-config-ali
// https://github.com/alibaba/f2e-spec/blob/main/packages/eslint-config-ali/rules/
// https://cloud.tencent.com/developer/doc/1078

const { getESLintConfig } = require('@iceworks/spec');

module.exports = getESLintConfig('react-ts', {
  rules: {
    // import 语句的排序
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'no-use-before-define': 0,
    'react/jsx-filename-extension': 0,
    'react/no-unused-prop-types': 1,
    '@typescript-eslint/no-require-imports': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@iceworks/best-practices/no-js-in-ts-project': 0,
    '@iceworks/best-practices/no-secret-info': 0,
    '@iceworks/best-practices/no-http-url': 0,
  },
});
