import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },

  // Base JS + strict TypeScript
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    settings: {
      react: { version: 'detect' },
    },

    plugins: {
      react:           pluginReact,
      'react-hooks':   pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },

    rules: {
      // React
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off',           // not needed with React 17+ JSX transform
      'react/prop-types': 'off',                   // TypeScript handles this

      // Prefer arrow-function components and expressions over `function` declarations
      'func-style': ['error', 'expression'],
      'react/function-component-definition': ['error', {
        namedComponents:   'arrow-function',
        unnamedComponents: 'arrow-function',
      }],

      // Formatting
      'semi': ['error', 'always'],

      // Strict quality
      'prefer-arrow-callback': 'error',
      'no-console':            ['warn', { allow: ['warn', 'error'] }],
      'eqeqeq':                ['error', 'always'],
      'no-var':                'error',
      'prefer-const':          'error',

      // Relaxed — too noisy for this codebase's patterns
      '@typescript-eslint/no-confusing-void-expression': 'off',  // event handlers returning void is idiomatic
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      'react/jsx-no-comment-textnodes': 'off',                   // intentional terminal-style // comments in UI
      'react-hooks/set-state-in-effect': 'off',                  // valid pattern: reset state when deps change
    },
  },

  // Must be last — disables ESLint rules that conflict with Prettier
  prettierConfig,
)
