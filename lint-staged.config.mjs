/**
 * lint-staged.config.mjs
 * @ref https://www.npmjs.com/package/lint-staged
 */
export default {
  '*.{js,mjs,cjs,ts,mts,jsx,tsx}': [
    //
    'eslint --fix',
    'prettier --write',
  ],
  '*.vue': [
    //
    'eslint --fix',
    'prettier --write',
  ],
  '*.{css,scss}': [
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
