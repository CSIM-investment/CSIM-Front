  /* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif']
    },
    screens: {
      'xs': '300px',
      // => @media (min-width: 300px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
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
