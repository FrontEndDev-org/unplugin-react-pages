/**
 * eslint.config.mjs
 * @ref https://eslint.org/
 */

import antfu from '@antfu/eslint-config';
import imp from 'eslint-plugin-import-x';

export default antfu({
  type: 'lib',
  ignores: ['**/node_modules/**', '**/dist/**', '**/dist-*/**'],
  files: ['**/.*.{js,cjs,mjs}', '**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
  stylistic: {
    semi: true,
  },
  typescript: {
    overrides: {
      'ts/explicit-function-return-type': 'off',
    },
  },
  react: true,
  unocss: true,
  rules: {
    ...imp.configs.recommended.rules,
    ...imp.configs.typescript.rules,
    // @ref https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unresolved.md
    'import/no-unresolved': ['error', { ignore: ['^virtual:'] }],
  },
  settings: {
    // @ref https://github.com/un-ts/eslint-plugin-import-x?tab=readme-ov-file#typescript
    'import-x/resolver': {
      typescript: true,
    },
  },
});
