/* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
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
      primary: {
        disabled: '#EAD7C5',
        lighter: '#FEF6E8',
        light: '#D7B492',
        DEFAULT: '#CA9A6F',
      },
      secondary: {
        DEFAULT: '#1F074D',
        light: '#8E82A5',
      },
      error: '#B83E51',
      success: '#8EB83E',
      warning: '#FFC300',
      info: '#3EB8A5',
      white: '#fff',
      grey: {
        lighter: '#F9FBFC',
        light: '#EDEDED',
        DEFAULT: '#D9D9D9',
        dark: '#A299B5',
        darker: '#6A5E5E',
      },
    },
  },
  variants: {
    extend: {
      appearance: ['hover', 'focus'],
    },
  },
  plugins: [],
}
