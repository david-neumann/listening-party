/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      mono: ['"DM Mono"', 'monospace'],
    },
    extend: {
      colors: {
        spotify: '#2CE184',
      },
      fontFamily: {
        space: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
