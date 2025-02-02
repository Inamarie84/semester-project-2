/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./assets/**/*.{html,js}",
    "./auth/**/*.html",
    "./profile/**/*.html",
    "!./node_modules/**/*",
  ],
  theme: {
    extend: {
      colors: {
        header: "#1F5A8E", // Header & buttons
        theme: "#D4AC2B", // Theme color
        text: "#4A5568", // Text color
        "green-btn": "#48BB78", // Green button
        "green-btn-hover": "#38A15C",
        "red-btn": "#DC2626", // Red button
        "light-bg": "#F7FAFC", // Light background
        footer: "#2D3748", // Footer
        "white-bg": "#FFFFFF", // White background
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
