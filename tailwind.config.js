/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      backgroundImage: {
        'noImage': "url('/src/assets/images/no-image.jpg')",
      },
      colors: {
        "peach-cream": {
          50: "#fff3ed",
          100: "#ffebe0",
          200: "#fec5aa",
          300: "#fd9c74",
          400: "#fb693c",
          500: "#f94216",
          600: "#ea280c",
          700: "#c21a0c",
          800: "#9a1712",
          900: "#7c1612",
        },
      },
    },
  },
  plugins: [],
};
