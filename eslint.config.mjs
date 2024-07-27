/**
 * eslint.config.mjs
 * @ref https://eslint.org/
 */
import { defineFlatConfig } from 'eslint-define-config';
import stylistic from '@stylistic/eslint-plugin';
import prettier from 'eslint-config-prettier';

export default defineFlatConfig([
  {
    ignores: [
      //
      '**/node_modules/**',
      '**/dist/**',
      '**/dist-*/**',
    ],
    files: [
      //
      '**/.*.{js,cjs,mjs}',
      '**/*.{js,mjs,cjs,ts,mts,jsx,tsx}',
    ],
  },
  stylistic.configs.customize({
    semi: true,
  }),
  prettier,
]);
