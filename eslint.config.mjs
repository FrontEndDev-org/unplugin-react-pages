/**
 * eslint.config.mjs
 * @ref https://eslint.org/
 */

import js from '@eslint/js';
import ts from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importX from 'eslint-plugin-import-x';
import globals from 'globals';
import uno from '@unocss/eslint-plugin';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import prettierConfig from 'eslint-config-prettier';

export default ts.config(
  {
    ignores: [
      //
      '**/.{git,idea,vscode,husky}/**',
      '**/dist/**',
      '**/dist-*/**',
      '**/coverage/**',
    ],
  },

  // import
  {
    plugins: {
      'import-x': importX,
    },
    rules: {
      ...importX.configs.recommended.rules,
      ...importX.configs.typescript.rules,

      // 忽略 virtual: 开头的 import
      // @ref https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unresolved.md
      'import-x/no-unresolved': ['error', { ignore: ['^virtual:'] }],
    },
    settings: {
      // 支持在 typeScript 解析 import
      // @ref https://github.com/un-ts/eslint-plugin-import-x?tab=readme-ov-file#typescript
      'import-x/resolver': {
        typescript: true,
      },
    },
  },

  // js
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': ['off'],
    },
  },

  // ts
  ...ts.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.{js,cjs,mjs,jsx}'],
    ...ts.configs.disableTypeChecked,
  },

  // react
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },

  // uno
  uno.configs.flat,
  {
    files: ['**/*.{jsx,tsx}'],
  },

  // prettier
  prettierRecommended,
  prettierConfig,

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
);
