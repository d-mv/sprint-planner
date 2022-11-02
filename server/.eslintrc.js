module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:json/recommended',
    'plugin:jest/recommended',
    'plugin:markdown/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@getify/proper-arrows',
    '@typescript-eslint',
    'async-await',
    'eslint-comments',
    'import',
    'jest',
    'prettier',
    'promise',
    'ramda',
  ],
  rules: {
    'ramda/always-simplification': 'error',
    'ramda/any-pass-simplification': 'error',
    'ramda/both-simplification': 'error',
    'ramda/complement-simplification': 'error',
    'ramda/compose-pipe-style': 'error',
    'ramda/compose-simplification': 'error',
    'ramda/cond-simplification': 'error',
    'ramda/either-simplification': 'error',
    'ramda/eq-by-simplification': 'error',
    'ramda/filter-simplification': 'error',
    'ramda/if-else-simplification': 'error',
    'ramda/map-simplification': 'error',
    'ramda/merge-simplification': 'error',
    'ramda/no-redundant-and': 'error',
    'ramda/no-redundant-not': 'error',
    'ramda/no-redundant-or': 'error',
    'ramda/pipe-simplification': 'error',
    'ramda/prefer-both-either': 'error',
    'ramda/prefer-complement': 'error',
    'ramda/prefer-ramda-boolean': 'error',
    'ramda/prop-satisfies-simplification': 'error',
    'ramda/reduce-simplification': 'error',
    'ramda/reject-simplification': 'error',
    'ramda/set-simplification': 'error',
    'ramda/unless-simplification': 'error',
    'ramda/when-simplification': 'error',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': 'allow-with-description',
        minimumDescriptionLength: 3,
      },
    ],
    '@typescript-eslint/no-redeclare': 'off',
    '@getify/proper-arrows/params': [
      'error',
      {
        unused: 'none',
        trivial: false,
        count: 15,
        length: 0,
        allowed: ['key'],
      },
    ],
    'no-useless-catch': 'error',
    'no-self-compare': 'error',
    'no-useless-return': 'error',
    'no-const-assign': 'error',
    'no-useless-constructor': 'error',
    'no-param-reassign': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'keyword-spacing': 'error',
    'no-use-before-define': ['error', { functions: true, classes: true, variables: true }],
    // radix: 'error',
    'no-var': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: false }],
    '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    '@typescript-eslint/semi': ['off', null],
    'async-await/space-after-async': 2,
    'async-await/space-after-await': 2,
    'block-spacing': ['error', 'always'],
    'lines-around-comment': [0],
    'lines-between-class-members': ['error', 'always'],
    'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
    'max-nested-callbacks': ['error', 15],
    'max-params': ['error', 4],
    'newline-per-chained-call': ['off'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-multi-spaces': ['error'],
    'no-multiple-empty-lines': ['error'],
    'no-spaced-func': ['error'],
    'no-whitespace-before-property': ['error'],
    'prettier/prettier': 'error',
    'space-before-blocks': ['error', 'always'],
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'const', next: '*' },
      { blankLine: 'always', prev: '*', next: 'const' },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'if', next: '*' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: 'for', next: '*' },
      { blankLine: 'always', prev: '*', next: 'for' },
      { blankLine: 'always', prev: 'switch', next: '*' },
      { blankLine: 'always', prev: '*', next: 'switch' },
      { blankLine: 'always', prev: 'try', next: '*' },
      { blankLine: 'always', prev: '*', next: 'try' },
      { blankLine: 'always', prev: 'export', next: '*' },
      { blankLine: 'always', prev: '*', next: 'export' },
    ],
    'eslint-comments/disable-enable-pair': [
      'error',
      {
        allowWholeFile: true,
      },
    ],
  },
};
