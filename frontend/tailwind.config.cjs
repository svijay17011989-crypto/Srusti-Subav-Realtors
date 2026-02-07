// frontend/tailwind.config.cjs
module.exports = {
  darkMode: "class", // ✅ REQUIRED for global dark theme (SAFE ADD)

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#000000", // luxury black
        accent: "#D4AF37", // gold
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },

  plugins: [],
};
