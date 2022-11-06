/* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      main: {
        primary: '#CA9A6F',
        secondary: '#1F074D',
      },
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}
