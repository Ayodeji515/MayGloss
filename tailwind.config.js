
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        mauve: {
          50: '#fdf8f7',
          100: '#f9f0ed',
          200: '#f2e1db',
          300: '#e6c8be',
          400: '#d7a799',
          500: '#c58676',
          600: '#b26858',
          700: '#945447',
          800: '#7a473d',
          900: '#673e36',
        }
      }
    },
  },
  plugins: [],
}
