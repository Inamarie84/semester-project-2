import { updateWelcomeMessage } from "../../../utils/welcomeMessage.js";
import { fetchProfile } from "./fetchProfile.js";
import { checkProfileAccess } from "../../../utils/checkProfileAccess.js";
import { initializeBioUpdate } from "./updateBio.js";
import { createListingButton } from "../../../components/createListingButton.js";
import { fetchUserListings } from "./fetchUserListings.js";
import { renderUserListings } from "./renderUserListings.js";
import { displayUserBids, displayUserWins } from "./renderUserActivity.js"; // ✅ Import render functions
import { addProfileEventListeners } from "./eventListenersProfile.js"; // Import the event listeners

updateWelcomeMessage();
fetchProfile();
checkProfileAccess();
initializeBioUpdate();

const profileContainer = document.getElementById("profile-container");

// ✅ Add "Create Listing" button to profile page
if (profileContainer) createListingButton(profileContainer);

// Fetch and display user listings, bids, and wins
async function loadUserData() {
  const listings = await fetchUserListings();
  if (listings) {
    renderUserListings(listings);
  }
  displayUserBids();
  displayUserWins();
}

// Call the loadUserData function to fetch and render listings
loadUserData();

// Add event listeners for toggling sections
addProfileEventListeners();
