import { updateProfileTitle } from "../../../utils/dom/updateTitle.js";
import { updateWelcomeMessage } from "../../../utils/profile/welcomeMessage.js";
import { fetchProfile } from "../../../api/profile/fetchProfile.js";
import { renderProfile } from "./renderProfile.js";
import { checkProfileAccess } from "../../../utils/profile/checkProfileAccess.js";
import { initializeBioUpdate } from "./updateBio.js";
import { createListingButton } from "../../../components/listings/createListingButton.js";
// import { fetchUserListings } from "../../../api/profile/fetchUserListings.js";
// import { renderUserListings } from "../../../components/profile/renderUserListings.js";
import { initializeAvatarUpdate } from "./updateAvatar.js";
import { addProfileEventListeners } from "./eventListenersProfile.js";
import { handleSkeletonLoader } from "../../../utils/dom/skeletonLoader.js"; // Import handleSkeletonLoader

updateWelcomeMessage();
checkProfileAccess();
initializeBioUpdate();
initializeAvatarUpdate();

const profileContainer = document.getElementById("profile-container");

if (profileContainer) createListingButton(profileContainer);

async function loadUserData() {
  console.log("Showing skeleton loader...");
  handleSkeletonLoader("skeleton-loader", "profile-container");

  const profile = await fetchProfile();
  if (profile) {
    renderProfile(profile);
    updateProfileTitle(profile.name);

    console.log("Hiding skeleton loader...");
    // Hide skeleton loader and show profile content after rendering
    handleSkeletonLoader("skeleton-loader", "profile-container");
  }
}

// Load only basic profile details on page load
loadUserData();

// Attach event listeners to fetch listings, bids, and wins only when toggled
addProfileEventListeners();
