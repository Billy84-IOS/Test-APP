/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf3f2',
          100: '#fbe3e1',
          400: '#d85a52',
          500: '#c1272d',
          600: '#a11f24',
          700: '#7f191d',
        },
        sand: {
          50: '#fefaf5',
          100: '#faf1e4',
          200: '#f0e2c8',
        },
        teal: {
          500: '#0e7c7b',
          600: '#0b6362',
        },
        gold: {
          400: '#d4a13d',
        },
      },
    },
  },
  plugins: [],
};
