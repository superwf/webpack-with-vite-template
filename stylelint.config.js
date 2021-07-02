module.exports = {
  plugins: ['stylelint-prettier'],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-property-sort-order-smacss',
  ],
  rules: {
    'prettier/prettier': [true, { singleQuote: false }],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
}
