import { updateWelcomeMessage } from "../../../utils/welcomeMessage.js";
import { fetchProfile } from "./fetchProfile.js";
import { checkProfileAccess } from "../../../utils/checkProfileAccess.js";
import { initializeBioUpdate } from "./updateBio.js";
import { createListingButton } from "../../../components/createListingButton.js";
import { fetchUserListings } from "./fetchUserListings.js"; // Import the fetchUserListings function

updateWelcomeMessage();
fetchProfile();
checkProfileAccess();
initializeBioUpdate();

const profileContainer = document.getElementById("profile-container");

// ✅ Add "Create Listing" button to profile page
if (profileContainer) createListingButton(profileContainer);

// Fetch user listings and display them on the profile page
fetchUserListings(); // Call the function to display the listings
