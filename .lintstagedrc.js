module.exports = {
  'packages/web/**/*.{js,ts,tsx}': [
    // https://eslint.org/docs/user-guide/command-line-interface
    'eslint --config ./.eslintrc.js --fix --color --'
  ],
  '**/*.{js,jsx,ts,tsx,css,less,styl,scss,sass,md,html}': [
    // https://prettier.io/docs/en/cli.html
    'pretty-quick --staged --verbose'
  ]
}
