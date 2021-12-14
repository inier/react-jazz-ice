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
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
          },
          {
            pattern: '@/pages/**',
            group: 'sibling',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'react/no-unused-prop-types': 1,
    '@typescript-eslint/no-require-imports': 0,
  },
});
