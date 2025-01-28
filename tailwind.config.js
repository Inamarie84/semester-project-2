/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Include your main HTML file
    "./**/*.{html,js}", // Watch all HTML and JS files inside the project
    "!./node_modules/**/*", // Exclude node_modules directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
