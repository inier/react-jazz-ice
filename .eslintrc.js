// https://eslint.org/docs/rules/
// https://www.npmjs.com/package/eslint-config-ali
// https://github.com/alibaba/f2e-spec/blob/main/packages/eslint-config-ali/rules/
// https://cloud.tencent.com/developer/doc/1078
// https://github.com/mobxjs/mobx/tree/main/packages/eslint-plugin-mobx

const { getESLintConfig } = require('@iceworks/spec');

module.exports = getESLintConfig('react-ts', {
  // extends: ['plugin:mobx/recommended'],
  // plugins: ['mobx'],
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
    'prefer-arrow-callback': 1,
    'no-console': 0,
    'no-multi-spaces': 0,
    'no-use-before-define': 0,
    'react/jsx-filename-extension': 0,
    'react/no-unused-prop-types': 1,
    '@typescript-eslint/no-require-imports': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@iceworks/best-practices/no-js-in-ts-project': 0,    
    '@iceworks/best-practices/no-http-url': 0,
    // mobx rules recommended
    // 'mobx/exhaustive-make-observable': 'warn',
    // 'mobx/unconditional-make-observable': 'error',
    // 'mobx/missing-make-observable': 'error',
    // 'mobx/missing-observer': 'warn',
    // 'mobx/no-anonymous-observer': 'warn',
  },
});
