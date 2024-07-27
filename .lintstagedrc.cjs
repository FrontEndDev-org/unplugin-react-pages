/**
 * lint-staged config
 * @ref https://www.npmjs.com/package/lint-staged
 */

module.exports = {
  '*.{,c,m}[jt]s{,x}': [
    //
    'eslint --fix',
    'prettier --write',
  ],
  '*.vue': [
    //
    'eslint --fix',
    'prettier --write',
  ],
  '*.{css,s[ac]ss}': [
    //
    'stylelint --fix --allow-empty-input',
    'prettier --write',
  ],
  '!(package-lock).json': [
    //
    'prettier --write',
  ],
  '!(pnpm-lock).{yml,yaml}': [
    //
    'prettier --write',
  ],
};
