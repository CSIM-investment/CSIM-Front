/* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif']
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      grey: '#F4F7F9',
      red: '#DF2040',
      green: '#40BF6A',
      primary: {
        disabled: '#EAD7C5',
        light: '#D7B492',
        DEFAULT: '#CA9A6F',
      },
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
