// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

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
  // Override stylistic rules to match Prettier config
  {
    rules: {
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'never'],
      'vue/singleline-html-element-content-newline': 'off',
      '@stylistic/indent': ['error', 2]
    }
  }
);
