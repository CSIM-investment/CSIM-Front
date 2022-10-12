/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  overrides: [
    {
      files: ['cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/component-name-in-template-casing': ['warn', 'PascalCase'],
    'vue/attribute-hyphenation': ['warn', 'never'],
    'vue/v-on-event-hyphenation': ['warn', 'never'],

    'vue/block-lang': [
      'warn',
      {
        script: { lang: 'ts' },
        style: { lang: 'scss' },
      },
    ],
  },
};