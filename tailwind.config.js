/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      accent_1: '#9CDDE8',
      accent_2: '#E096E6',
      light_bg: '#F5F5F5',
      dark_bg: '#1C1C1C',
    },
    extend: {
      boxShadow: {
        'custom': '-10px 12px 5px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [require("daisyui")],
};