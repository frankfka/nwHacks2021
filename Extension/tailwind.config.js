module.exports = {
  purge: ['./source/**/*.js', './source/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
        // => @media print { ... }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
