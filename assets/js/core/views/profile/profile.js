console.log("🔥 profile.js is running!");

import { updateWelcomeMessage } from "../../../utils/welcomeMessage.js";
import { fetchProfile } from "./fetchProfile.js";
import { checkProfileAccess } from "../../../utils/checkProfileAccess.js";
import { initializeBioUpdate } from "./updateBio.js";

// Import, but do NOT call updateAvatar() here
import { updateAvatar } from "./updateAvatar.js";

updateWelcomeMessage();
fetchProfile();
checkProfileAccess();
initializeBioUpdate();

// ✅ Add the Create Listing button
const profileContainer = document.getElementById("profile-container");

if (profileContainer) {
  const createButton = document.createElement("a");
  createButton.href = "/listing/create-listing.html"; // Adjust the path if necessary
  createButton.textContent = "Create Listing";
  createButton.className =
    "bg-green-btn text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 shadow-md block w-fit mx-auto mb-6";

  profileContainer.appendChild(createButton);
}
