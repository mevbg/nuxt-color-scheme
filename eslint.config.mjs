// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import prettierConfig from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true
  },
  dirs: {
    src: ['./playground']
  }
}).append(
  // Add Prettier plugin and config
  {
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': 'error',
      // Disable conflicting rules
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/html-indent': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/semi': 'off',
      '@stylistic/comma-dangle': 'off'
    }
  },
  // Disable all conflicting rules from other configs
  prettierConfig
);
