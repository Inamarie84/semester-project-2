import { showMessage } from "../utils/dom/messageHandler.js"; // Import showMessage
import { handleSkeletonLoader } from "../utils/dom/skeletonLoader.js"; // Import handleSkeletonLoader

export default async function router(pathname = window.location.pathname) {
  try {
    switch (pathname) {
      case "/":
        await import("./views/home/home.js");
        handleSkeletonLoader("skeleton-loader", "listings-container"); // Handle skeleton loader for listings
        break;
      case "/login":
        await import("./views/auth/login.js");
        handleSkeletonLoader("skeleton-loader", "login-form"); // Handle skeleton loader for login
        break;
      case "/register":
        await import("./views/auth/register.js");
        handleSkeletonLoader("skeleton-loader", "register-form"); // Handle skeleton loader for registration
        break;
      case "/profile":
        await import("./views/profile/profile.js");
        handleSkeletonLoader("skeleton-loader", "profile-container"); // Handle skeleton loader for profile
        break;
      case "/create-listing":
        await import("./views/listing/createListing.js");
        handleSkeletonLoader("skeleton-loader", "create-listing-form"); // Handle skeleton loader for create listing
        break;
      case "/single-listing":
        await import("./views/listing/singleListing.js");
        handleSkeletonLoader("skeleton-loader", "listing-container"); // Handle skeleton loader for single listing
        break;
      default:
        throw new Error("Page not found");
    }
  } catch (error) {
    console.error("Error loading page module:", error);
    showMessage("error", "error", "messages-container");
  }
}
