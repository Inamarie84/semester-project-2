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
} from "../../../components/profile/renderUserActivity.js";
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

  const listings = await fetchUserListings();
  if (listings) {
    renderUserListings(listings);
  }

  displayUserBids();
  displayUserWins();
}

loadUserData();

addProfileEventListeners();
