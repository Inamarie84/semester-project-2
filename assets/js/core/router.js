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
  try {
    console.log("Current pathname:", pathname); // Debugging log

    switch (pathname) {
      case "/":
        console.log("Loading home.js");
        await import("./views/home/home.js");
        handleSkeletonLoader("skeleton-loader", "listings-container");
        break;
      case "/login.html":
        console.log("Loading login.js");
        await import("./views/auth/login.js");
        handleSkeletonLoader("skeleton-loader", "login-form");
        break;
      case "/register.html":
        console.log("Loading register.js");
        await import("./views/auth/register.js");
        handleSkeletonLoader("skeleton-loader", "register-form");
        break;
      case "/profile.html":
        console.log("Loading profile.js");
        await import("./views/profile/profile.js");
        handleSkeletonLoader("skeleton-loader", "profile-container");
        break;
      case "/create-listing.html":
        console.log("Loading createListing.js");
        await import("./views/listing/createListing.js");
        handleSkeletonLoader("skeleton-loader", "create-listing-form");
        break;
      case "/single-listing.html":
        console.log("Loading singleListing.js");
        await import("./views/listing/singleListing.js");
        handleSkeletonLoader("skeleton-loader", "listing-container");
        break;
      case "/about.html":
        console.log("Loading singleListing.js");

        break;
      default:
        console.error("Page not found:", pathname); // Debugging log
        throw new Error("Page not found");
    }
  } catch (error) {
    console.error("Error loading page module:", error);
    showMessage("error", "error", "messages-container");
  }
}
