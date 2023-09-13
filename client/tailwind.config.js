/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:  "#EEE0C9",
      colors:{
        primary: "#102C57",
        secondary: "#DAC0A3",
      }
    },
  },
  plugins: [],
}

