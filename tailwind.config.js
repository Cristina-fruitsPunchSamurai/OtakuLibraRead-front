/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: "#root",
  theme: {
    extend: {
      colors: {
        'cyber-white': '#f8fafc',
        'cyber-purple': '#7e22ce',
        'cyber-yellow': '#fde047',
        'cyber-black': '#020617',

      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

