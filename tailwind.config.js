/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        "75ch": "75ch",
        "65ch": "65ch",
        "50ch": "50ch",
        "44ch": "44ch",
      },
      colors: {
        accent: "#654EFE",
        bg1: "#202124",
        shark: {
          900: "#202124",
          800: "#36373a",
          700: "#4d4d50",
          600: "#636466",
          500: "#797a7c",
          400: "#909092",
          300: "#a6a6a7",
          200: "#bcbcbd",
          100: "#d2d3d3",
          50: "#e9e9e9",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
