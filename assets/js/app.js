// // Import the main CSS for styling the app
// // import "../css/style.css";

// // Import the router function to dynamically load page scripts based on the current URL
// import router from "../js/core/router.js";

// // Import the mobile menu toggle function
// import { toggleMobileMenu } from "../js/components/menuToggle.js";

// // Initialize the mobile menu toggle functionality
// toggleMobileMenu();

// // Invoke the router function to load the appropriate page script
// await router(window.location.pathname);

// Import the router function to dynamically load page scripts based on the current URL
import router from "./core/router.js";

// Import the mobile menu toggle function
import { toggleMobileMenu } from "./components/menuToggle.js";

// Import the activeNav function for active link styling
import "./components/activeNav.js"; // Ensure this import is included

// Import the logout functionality
import { handleLogout } from "./utils/logout.js";

// Ensure the script runs after the DOM content has fully loaded
document.addEventListener("DOMContentLoaded", async () => {
  // Initialize the mobile menu toggle functionality
  toggleMobileMenu();

  // Invoke the router function to load the appropriate page script
  await router(window.location.pathname);

  // Handle the logout functionality (show/hide the logout button)
  handleLogout();
});
