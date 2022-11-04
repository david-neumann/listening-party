/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Space Grotesk"', 'sans-serif'],
      mono: ['"DM Mono"', 'monospace'],
    },
    extend: {
      colors: {
        spotify: '#2CE184',
      },
      borderRadius: {
        '4xl': '1.75rem',
        '5xl': '2rem',
        '6xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
