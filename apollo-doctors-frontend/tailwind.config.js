/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff7e5f',
        secondary: '#feb47b',
        apolloBlue: '#02475b',
        apolloLightBlue: '#00b5b7',
      },
    },
  },
  plugins: [],
}