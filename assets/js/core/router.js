// import {
//   showLoadingIndicator,
//   hideLoadingIndicator,
// } from "../utils/dom/loadingIndicator.js";
// import { showMessage } from "../utils/dom/messageHandler.js"; // Import showMessage

// export default async function router(pathname = window.location.pathname) {
//   showLoadingIndicator(); // Show loading indicator before loading the module

//   try {
//     // Simulate network delay (e.g., 1 second)
//     // await new Promise((resolve) => setTimeout(resolve, 1000));

//     switch (pathname) {
//       case "/":
//         await import("./views/home/home.js");
//         break;
//       case "/auth/login.html":
//         await import("./views/auth/login.js");
//         break;
//       case "/auth/register.html":
//         await import("./views/auth/register.js");
//         break;
//       case "/profile/index.html":
//         await import("./views/profile/profile.js");
//         break;
//       case "/listing/create-listing.html":
//         await import("./views/listing/createListing.js");
//         break;
//       case "/listing/single-listing.html":
//         await import("./views/listing/singleListing.js");
//         break;
//       case "/about/index.html":
//         break;
//       default:
//         throw new Error("Page not found");
//     }
//   } catch (error) {
//     console.error("Error loading page module:", error);
//     showMessage("error", "error", "messages-container");
//   } finally {
//     hideLoadingIndicator();
//   }
// }

// router.js
import { showMessage } from "../utils/dom/messageHandler.js"; // Import showMessage
import { handleSkeletonLoader } from "../utils/dom/skeletonLoader.js"; // Import handleSkeletonLoader

export default async function router(pathname = window.location.pathname) {
  try {
    switch (pathname) {
      case "/":
        await import("./views/home/home.js");
        handleSkeletonLoader("skeleton-loader", "listings-container"); // Handle skeleton loader for listings
        break;
      case "/auth/login.html":
        await import("./views/auth/login.js");
        handleSkeletonLoader("skeleton-loader", "login-form"); // Handle skeleton loader for login
        break;
      case "/auth/register.html":
        await import("./views/auth/register.js");
        handleSkeletonLoader("skeleton-loader", "register-form"); // Handle skeleton loader for registration
        break;
      case "/profile/":
        await import("./views/profile/profile.js");
        handleSkeletonLoader("skeleton-loader", "profile-container"); // Handle skeleton loader for profile
        break;
      case "/listing/create-listing.html":
        await import("./views/listing/createListing.js");
        handleSkeletonLoader("skeleton-loader", "create-listing-form"); // Handle skeleton loader for create listing
        break;
      case "/listing/single-listing.html":
        await import("./views/listing/singleListing.js");
        handleSkeletonLoader("skeleton-loader", "listing-container"); // Handle skeleton loader for single listing
        break;
      case "/about/index.html":
        break;
      default:
        throw new Error("Page not found");
    }
  } catch (error) {
    console.error("Error loading page module:", error);
    showMessage("error", "error", "messages-container");
  }
}
