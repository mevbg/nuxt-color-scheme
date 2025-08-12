export default {
  plugins: ['prettier-plugin-organize-imports'],
  semi: true,
  arrowParens: 'always',
  singleQuote: true,
  useTabs: false,
  trailingComma: 'none',
  printWidth: 100,
  tabWidth: 2,
  bracketSpacing: true,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'strict',
  vueIndentScriptAndStyle: true,
  // Override for Vue files
  overrides: [
    {
      files: '*.vue',
      options: {
        printWidth: 100,
        singleAttributePerLine: false
      }
    }
  ]
};
