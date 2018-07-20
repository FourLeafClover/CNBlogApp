// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint'
  },

  env: {
    browser: true,
    node: true
  },

  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],

  // required to lint *.vue files
  plugins: [
    'vue'
  ],

  // add your custom rules here
  rules: {
    rules: {
      'no-var': 'error',
      'init-declarations': 2,
      quotes: [
        'error',
        'single'
      ],
      semi: [
        'error',
        'never'
      ],
      'no-extra-semi': 'error',
      'linebreak-style': [
        'error',
        'unix'
      ],
      indent: [
        'error',
        2,
        {
          SwitchCase: 1
        }
      ],
      'array-bracket-spacing': [
        2,
        'never'
      ],
      'block-scoped-var': 0,
      'brace-style': [
        2,
        '1tbs',
        {
          allowSingleLine: true
        }
      ],
      camelcase: 2,
      'comma-dangle': [
        2,
        'never'
      ],
      'comma-spacing': [
        2,
        {
          before: false,
          after: true
        }
      ],
      'comma-style': [
        2,
        'last'
      ],
      complexity: [
        2,
        9
      ],
      'computed-property-spacing': [
        2,
        'never'
      ]
    },
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ]
}