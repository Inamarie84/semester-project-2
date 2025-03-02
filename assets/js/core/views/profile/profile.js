import { updateProfileTitle } from "../../../utils/dom/updateTitle.js";
import { updateWelcomeMessage } from "../../../utils/profile/welcomeMessage.js";
import { fetchProfile } from "../../../api/profile/fetchProfile.js";
import { renderProfile } from "./renderProfile.js";
import { checkProfileAccess } from "../../../utils/profile/checkProfileAccess.js";
import { initializeBioUpdate } from "./updateBio.js";
import { createListingButton } from "../../../components/listings/createListingButton.js";
import { initializeAvatarUpdate } from "./updateAvatar.js";
import { addProfileEventListeners } from "./eventListenersProfile.js";
import { handleSkeletonLoader } from "../../../utils/dom/skeletonLoader.js";

updateWelcomeMessage();
checkProfileAccess();
initializeBioUpdate();
initializeAvatarUpdate();

const profileContainer = document.getElementById("profile-container");

if (profileContainer) createListingButton(profileContainer);

async function loadUserData() {
  handleSkeletonLoader("skeleton-loader", "profile-container");

  const profile = await fetchProfile();
  if (profile) {
    renderProfile(profile);
    updateProfileTitle(profile.name);

    handleSkeletonLoader("skeleton-loader", "profile-container");
  }
}

loadUserData();

addProfileEventListeners();
