/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Outfit Variable", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      background: ["hover"], // Enable hover variant for background colors
      textColor: ["hover"], // Enable hover variant for text colors
    },
  },
  plugins: [],
};
