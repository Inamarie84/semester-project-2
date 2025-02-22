import { updateProfileTitle } from "../../../utils/updateTitle.js"; // Import only the profile title function
import { updateWelcomeMessage } from "../../../utils/welcomeMessage.js";
import { fetchProfile } from "./fetchProfile.js";
import { renderProfile } from "./renderProfile.js"; // ✅ Import render function
import { checkProfileAccess } from "../../../utils/checkProfileAccess.js";
import { initializeBioUpdate } from "./updateBio.js";
import { createListingButton } from "../../../components/createListingButton.js";
import { fetchUserListings } from "./fetchUserListings.js";
import { renderUserListings } from "./renderUserListings.js";
import { displayUserBids, displayUserWins } from "./renderUserActivity.js"; // ✅ Import render functions
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
