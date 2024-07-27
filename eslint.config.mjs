/**
 * eslint.config.mjs
 * @ref https://eslint.org/
 */

import { antfu } from '@antfu/eslint-config';
import imp from 'eslint-plugin-import-x';

export default antfu({
  type: 'lib',
  ignores: [
    '**/dist/**',
    '**/dist-*/**',
  ],
  files: [
    '**/.*.{js,cjs,mjs}',
    '**/*.{js,mjs,cjs,ts,mts,jsx,tsx}',
  ],
  stylistic: {
    semi: true,
  },
  typescript: {
    overrides: {
      // 不必要显式返回类型
      // @ref https://typescript-eslint.io/rules/explicit-function-return-type/
      'ts/explicit-function-return-type': ['off'],
    },
  },
  react: true,
  unocss: true,
  rules: {
    ...imp.configs.recommended.rules,
    ...imp.configs.typescript.rules,
    // 忽略 virtual: 开头的 import
    // @ref https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unresolved.md
    'import/no-unresolved': ['error', { ignore: ['^virtual:'] }],
    // 不必要求如何使用 process
    // @ref https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/prefer-global/process.md
    'node/prefer-global/process': ['off'],
  },
  settings: {
    // 支持在 typeScript 解析 import
    // @ref https://github.com/un-ts/eslint-plugin-import-x?tab=readme-ov-file#typescript
    'import-x/resolver': {
      typescript: true,
    },
  },
});
