import { updateProfileTitle } from "../../../utils/dom/updateTitle.js";
import { updateWelcomeMessage } from "../../../utils/profile/welcomeMessage.js";
import { fetchProfile } from "../../../api/profile/fetchProfile.js";
import { renderProfile } from "./renderProfile.js";
import { checkProfileAccess } from "../../../utils/profile/checkProfileAccess.js";
import { initializeBioUpdate } from "./updateBio.js";
import { createListingButton } from "../../../components/listings/createListingButton.js";
import { fetchUserListings } from "../../../api/profile/fetchUserListings.js";
import { renderUserListings } from "../../../components/profile/renderUserListings.js";
import { updateAvatar } from "./updateAvatar.js";
import { addProfileEventListeners } from "./eventListenersProfile.js";

updateWelcomeMessage();
checkProfileAccess();
initializeBioUpdate();

const profileContainer = document.getElementById("profile-container");

if (profileContainer) createListingButton(profileContainer);

async function loadUserData() {
  const profile = await fetchProfile();
  if (profile) {
    renderProfile(profile);
    updateProfileTitle(profile.name);
  }
}

// Load only basic profile details on page load
loadUserData();

// Attach event listeners to fetch listings, bids, and wins only when toggled
addProfileEventListeners();
