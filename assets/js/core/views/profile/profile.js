import { updateWelcomeMessage } from "../../../utils/welcomeMessage.js";
import { fetchProfile } from "./fetchProfile.js";
import { checkProfileAccess } from "../../../utils/checkProfileAccess.js";
import { initializeBioUpdate } from "./updateBio.js";
import { createListingButton } from "../../../components/createListingButton.js";
import { fetchUserListings } from "./fetchUserListings.js";
import { displayUserBids, displayUserWins } from "./renderUserActivity.js"; // ✅ Import render functions
import { toggleSection } from "../../../components/toggleSection.js"; // Import toggleSection function

updateWelcomeMessage();
fetchProfile();
checkProfileAccess();
initializeBioUpdate();

const profileContainer = document.getElementById("profile-container");

// ✅ Add "Create Listing" button to profile page
if (profileContainer) createListingButton(profileContainer);

// Fetch and display user listings, bids, and wins
fetchUserListings();
displayUserBids();
displayUserWins();

// Add event listeners to buttons for toggling sections
document.getElementById("toggle-listings").addEventListener("click", () => {
  toggleSection(
    "toggle-listings",
    "profile-listings-section",
    "Show Listings",
    "Hide Listings",
  );
});

document.getElementById("toggle-bids").addEventListener("click", () => {
  toggleSection(
    "toggle-bids",
    "bid-listings-section",
    "Show Bids",
    "Hide Bids",
  );
});

document.getElementById("toggle-wins").addEventListener("click", () => {
  toggleSection(
    "toggle-wins",
    "win-listings-section",
    "Show Wins",
    "Hide Wins",
  );
});
