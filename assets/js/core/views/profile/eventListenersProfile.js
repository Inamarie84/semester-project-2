import { toggleSection } from "../../../components/profile/toggleSection.js"; // Import toggleSection function
import { displayUserBids } from "../../../components/profile/renderUserActivity.js";
import { displayUserWins } from "../../../components/profile/renderUserActivity.js";
import { fetchUserListings } from "../../../api/profile/fetchUserListings.js";
import { renderUserListings } from "../../../components/profile/renderUserListings.js";

export function addProfileEventListeners() {
  document
    .getElementById("toggle-listings")
    .addEventListener("click", async () => {
      toggleSection(
        "toggle-listings",
        "profile-listings-section",
        "Show Listings",
        "Hide Listings",
      );

      const listingsContainer = document.getElementById(
        "profile-listings-section",
      );
      if (!listingsContainer.classList.contains("hidden")) {
        const listings = await fetchUserListings();
        if (listings) {
          renderUserListings(listings);
        }
      }
    });

  document.getElementById("toggle-bids").addEventListener("click", () => {
    toggleSection(
      "toggle-bids",
      "bid-listings-section",
      "Show Bids",
      "Hide Bids",
    );

    const bidsContainer = document.getElementById("bid-listings-section");
    if (!bidsContainer.classList.contains("hidden")) {
      displayUserBids();
    }
  });

  document.getElementById("toggle-wins").addEventListener("click", () => {
    toggleSection(
      "toggle-wins",
      "win-listings-section",
      "Show Wins",
      "Hide Wins",
    );

    const winsContainer = document.getElementById("win-listings-section");
    if (!winsContainer.classList.contains("hidden")) {
      displayUserWins();
    }
  });
}
