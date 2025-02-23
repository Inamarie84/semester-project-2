import { updateProfileTitle } from "../../../utils/dom/updateTitle.js"; // Import only the profile title function
import { updateWelcomeMessage } from "../../../utils/profile/welcomeMessage.js";
import { fetchProfile } from "../../../api/profile/fetchProfile.js";
import { renderProfile } from "./renderProfile.js"; // ✅ Import render function
import { checkProfileAccess } from "../../../utils/profile/checkProfileAccess.js";
import { initializeBioUpdate } from "./updateBio.js";
import { createListingButton } from "../../../components/listings/createListingButton.js";
import { fetchUserListings } from "../../../api/profile/fetchUserListings.js";
import { renderUserListings } from "../../../components/profile/renderUserListings.js";
import { updateAvatar } from "./updateAvatar.js";

import {
  displayUserBids,
  displayUserWins,
} from "../../../components/profile/renderUserActivity.js"; // ✅ Import render functions
import { addProfileEventListeners } from "./eventListenersProfile.js"; // ✅ Import event listeners

updateWelcomeMessage();
checkProfileAccess();
initializeBioUpdate();

const profileContainer = document.getElementById("profile-container");

// ✅ Add "Create Listing" button to profile page
if (profileContainer) createListingButton(profileContainer);

// Fetch and display profile and listings
async function loadUserData() {
  const profile = await fetchProfile(); // ✅ Get profile data
  if (profile) {
    renderProfile(profile); // ✅ Render profile UI
    updateProfileTitle(profile.name); // ✅ Update title with username
  }

  const listings = await fetchUserListings();
  if (listings) {
    renderUserListings(listings);
  }

  displayUserBids();
  displayUserWins();
}

// Call the function
loadUserData();

// ✅ Call event listener function
addProfileEventListeners();
