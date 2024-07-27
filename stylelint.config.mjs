/**
 * stylelint.config.mjs
 * @ref https://stylelint.io/
 * @type {import('stylelint').Config}
 */
export default {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-recommended-scss',
    'stylelint-config-css-modules',
    'stylelint-config-html/vue',
    'stylelint-prettier/recommended',
  ],

  rules: {
    // 源可以为空
    'no-empty-source': null,

    // 样式类名：无规则限制
    'selector-class-pattern': null,

    // 不接受无效属性值
    'declaration-property-value-no-unknown': true,

    // 不需要要求声明倒序
    'no-descending-specificity': null,

    // 适配 tailwindcss
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        // https://tailwindcss.com/docs/functions-and-directives
        ignoreAtRules: ['tailwind', 'layer', 'apply', 'config'],
      },
    ],
  },
};
