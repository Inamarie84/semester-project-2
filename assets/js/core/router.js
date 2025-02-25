// import { showMessage } from "../utils/dom/messageHandler.js"; // Import showMessage
// import { handleSkeletonLoader } from "../utils/dom/skeletonLoader.js"; // Import handleSkeletonLoader

// export default async function router(pathname = window.location.pathname) {
//   try {
//     switch (pathname) {
//       case "/":
//         await import("./views/home/home.js");
//         handleSkeletonLoader("skeleton-loader", "listings-container"); // Handle skeleton loader for listings
//         break;
//       case "/login":
//         await import("./views/auth/login.js");
//         handleSkeletonLoader("skeleton-loader", "login-form"); // Handle skeleton loader for login
//         break;
//       case "/register":
//         await import("./views/auth/register.js");
//         handleSkeletonLoader("skeleton-loader", "register-form"); // Handle skeleton loader for registration
//         break;
//       case "/profile":
//         await import("./views/profile/profile.js");
//         handleSkeletonLoader("skeleton-loader", "profile-container"); // Handle skeleton loader for profile
//         break;
//       case "/create-listing":
//         await import("./views/listing/createListing.js");
//         handleSkeletonLoader("skeleton-loader", "create-listing-form"); // Handle skeleton loader for create listing
//         break;
//       case "/single-listing":
//         await import("./views/listing/singleListing.js");
//         handleSkeletonLoader("skeleton-loader", "listing-container"); // Handle skeleton loader for single listing
//         break;
//       default:
//         throw new Error("Page not found");
//     }
//   } catch (error) {
//     console.error("Error loading page module:", error);
//     showMessage("error", "error", "messages-container");
//   }
// }
import { showMessage } from "../utils/dom/messageHandler.js"; // Import showMessage
import { handleSkeletonLoader } from "../utils/dom/skeletonLoader.js"; // Import handleSkeletonLoader

export default async function router(pathname = window.location.pathname) {
  console.log("Current pathname:", pathname); // Debugging

  try {
    switch (pathname) {
      case "/":
      case "/index.html": // Add this line to handle index.html
        await import("./views/home/home.js");
        handleSkeletonLoader("skeleton-loader", "listings-container");
        break;
      case "/login":
      case "/login.html": // Add .html versions for all routes
        await import("./views/auth/login.js");
        handleSkeletonLoader("skeleton-loader", "login-form");
        break;
      case "/register":
      case "/register.html":
        await import("./views/auth/register.js");
        handleSkeletonLoader("skeleton-loader", "register-form");
        break;
      case "/profile":
      case "/profile.html":
        await import("./views/profile/profile.js");
        handleSkeletonLoader("skeleton-loader", "profile-container");
        break;
      case "/create-listing":
      case "/create-listing.html":
        await import("./views/listing/createListing.js");
        handleSkeletonLoader("skeleton-loader", "create-listing-form");
        break;
      case "/single-listing":
      case "/single-listing.html":
        await import("./views/listing/singleListing.js");
        handleSkeletonLoader("skeleton-loader", "listing-container");
        break;
      case "/about":
      case "/about.html":
        break;
      default:
        console.error("Page not found:", pathname);
        throw new Error("Page not found");
    }
  } catch (error) {
    console.error("Error loading page module:", error);
    showMessage("error", "error", "messages-container");
  }
}
