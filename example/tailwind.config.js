/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./public/index.js"
  ],
  theme: {
    extend: {
      colors: {
        'searchmail-bg': '#EAF1FB',
        'clr-light': '#F1F3F4',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'], // Apply Lato as the primary sans-serif font
      }
    },
  },
  plugins: [],
}


