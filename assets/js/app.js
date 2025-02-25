// Import the main CSS for styling the app
// import "../css/style.css";

// Import the router function to dynamically load page scripts based on the current URL
import router from "./core/router.js";

// Import the mobile menu toggle function
import { toggleMobileMenu } from "./components/navigation/menuToggle.js";

// Import the activeNav function for active link styling
import { setActiveNav } from "./components/navigation/activeNav.js"; // Ensure this import is included

// Import the logout functionality
import { handleLogout } from "./utils/auth/logout.js";

// Import the back-to-top button setup function
import { setupBackToTopButton } from "./components/dom/backToTopButton.js";

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

  // Initialize the back-to-top button functionality
  setupBackToTopButton();
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

// // Import the router function to dynamically load page scripts based on the current URL
// import router from "./core/router.js";

// // Import the mobile menu toggle function
// import { toggleMobileMenu } from "./components/navigation/menuToggle.js";

// // Import the activeNav function for active link styling
// import { setActiveNav } from "./components/navigation/activeNav.js";

// // Import the logout functionality
// import { handleLogout } from "./utils/auth/logout.js";

// // Import the back-to-top button setup function
// import { setupBackToTopButton } from "./components/dom/backToTopButton.js";

// // Import the skeleton loader functions
// import {
//   showSkeletonLoader,
//   hideSkeletonLoader,
// } from "./utils/dom/skeletonLoader.js";

// // Import listings loading function
// import { loadListings } from "./utils/listings/listingsPagination.js";

// // Function to initialize the app
// async function initializeApp() {
//   console.log("Initializing app...");

//   // Initialize the mobile menu toggle functionality
//   toggleMobileMenu();

//   // Detect the page and apply skeleton loader if necessary
//   const pageContainer = document.querySelector("main");

//   if (pageContainer) {
//     showSkeletonLoader(pageContainer); // Show skeleton while loading content
//   }

//   // Load the appropriate page script via the router
//   await router(window.location.pathname);

//   // Handle the logout functionality (show/hide the logout button)
//   handleLogout();

//   // Set active navigation link
//   setActiveNav();

//   // Initialize the back-to-top button functionality
//   setupBackToTopButton();

//   // Load listings if on the home page
//   if (document.body.dataset.page === "home") {
//     try {
//       await loadListings(1); // Load first page of listings
//     } catch (error) {
//       console.error("Error loading listings:", error);
//     }
//   }

//   // Hide the skeleton loader once content is loaded
//   setTimeout(() => {
//     hideSkeletonLoader(pageContainer);
//   }, 300); // Small delay to ensure smooth transition
// }

// // Ensure the app initializes only when the DOM is fully ready
// if (document.readyState === "loading") {
//   console.log("Document still loading, waiting for it to be ready...");
//   document.addEventListener("readystatechange", () => {
//     if (document.readyState === "complete") {
//       console.log("Document is ready, initializing app...");
//       requestAnimationFrame(initializeApp);
//     }
//   });
// } else {
//   console.log("Document already loaded, initializing app immediately...");
//   requestAnimationFrame(initializeApp);
// }
