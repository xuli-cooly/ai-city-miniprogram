module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser', // Vue项目作为可选
  plugins: ['import', 'prettier', 'react', 'react-hooks'], // Vue项目作为可选
  rules: {
    'no-console': 'off',
    'linebreak-style': ['error', 'unix'],
    'no-cond-assign': ['error', 'except-parens'],
    'no-unused-expressions': [
      'error',
      {
        allowTernary: true,
        allowShortCircuit: true,
        allowTaggedTemplates: true
      }
    ],
    'import/order': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'prettier/prettier': 'error',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'global-require': 0,
    'no-param-reassign': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': [
      'error',
      'never',
      { json: 'always', css: 'always', png: 'always', gif: 'always' }
    ]
  }
}
