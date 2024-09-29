import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import { fixupConfigRules } from '@eslint/compat';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...fixupConfigRules(pluginReactConfig),
    jsxA11y.flatConfigs.recommended,
    {
        rules: { 'react/react-in-jsx-scope': 'off', '@typescript-eslint/no-var-requires': 'off','react/display-name': 'off' },
    },
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
