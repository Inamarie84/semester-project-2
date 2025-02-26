/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/**/*.{js,html}", "!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        header: "#1F5A8E",
        theme: "#D4AC2B",
        text: "#4A5568",
        "green-btn": "#48BB78",
        "green-btn-hover": "#38A15C",
        "red-btn": "#DC2626",
        "light-bg": "#F7FAFC",
        footer: "#2D3748",
        "delete-btn": "#EF4444",
        "delete-btn-hover": "#B91C1C",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
