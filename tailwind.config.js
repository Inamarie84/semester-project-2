/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Scan all HTML files in the root
    "./assets/**/*.{js,html}", // Scan JavaScript and any remaining HTML in assets
    "!./node_modules/**/*", // Exclude node_modules
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
        "delete-btn": "#EF4444", // Red delete button (bg-red-500)
        "delete-btn-hover": "#B91C1C", // Hover effect for delete button (bg-red-600)
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
