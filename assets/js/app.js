// // Import the main CSS for styling the app
// // import "../css/style.css";

// Import the router function to dynamically load page scripts based on the current URL
import router from "./core/router.js";

// Import the mobile menu toggle function
import { toggleMobileMenu } from "./components/menuToggle.js";

// Import the activeNav function for active link styling
import { setActiveNav } from "./components/activeNav.js"; // Ensure this import is included

// Import the logout functionality
import { handleLogout } from "./utils/logout.js";

// Function to initialize the app
async function initializeApp() {
  console.log("Initializing app...");

  // Initialize the mobile menu toggle functionality
  toggleMobileMenu();

  // Load the appropriate page script via the router
  await router(window.location.pathname);

  // Handle the logout functionality (show/hide the logout button)
  handleLogout();

  // Set active navigation link
  setActiveNav();
}

// Ensure the app initializes only when the DOM is fully ready
if (document.readyState === "loading") {
  console.log("Document still loading, waiting for it to be ready...");
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      console.log("Document is ready, initializing app...");
      requestAnimationFrame(initializeApp);
    }
  });
} else {
  console.log("Document already loaded, initializing app immediately...");
  requestAnimationFrame(initializeApp);
}
