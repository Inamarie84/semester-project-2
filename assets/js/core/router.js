import {
  showLoadingIndicator,
  hideLoadingIndicator,
} from "../utils/dom/loadingIndicator.js";
import { showMessage } from "../utils/dom/messageHandler.js"; // Import showMessage

export default async function router(pathname = window.location.pathname) {
  showLoadingIndicator(); // Show loading indicator before loading the module

  try {
    // Simulate network delay (e.g., 1 second)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    switch (pathname) {
      case "/":
        await import("./views/home/home.js");
        break;
      case "/auth/login.html":
        await import("./views/auth/login.js");
        break;
      case "/auth/register.html":
        await import("./views/auth/register.js");
        break;
      case "/profile/index.html":
        await import("./views/profile/profile.js");
        break;
      case "/listing/create-listing.html":
        await import("./views/listing/createListing.js");
        break;
      case "/listing/single-listing.html":
        await import("./views/listing/singleListing.js");
        break;
      default:
        throw new Error("Page not found");
    }
  } catch (error) {
    console.error("Error loading page module:", error);
    showMessage("error", "error", "messages-container"); // Use showMessage for error feedback
  } finally {
    hideLoadingIndicator(); // Hide loading indicator after module is loaded or error occurs
  }
}
