import { showMessage } from "../utils/dom/messageHandler.js";
import { handleSkeletonLoader } from "../utils/dom/skeletonLoader.js";

export default async function router(pathname = window.location.pathname) {
  try {
    switch (pathname) {
      case "/":
      case "/index.html":
        await import("./views/home/home.js");
        handleSkeletonLoader("skeleton-loader", "listings-container");
        break;
      case "/login":
      case "/login.html":
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
        showMessage("error", `Page not found: ${pathname}`);
        throw new Error("Page not found");
    }
  } catch {
    showMessage("error", "There was an error loading the page");
  }
}
