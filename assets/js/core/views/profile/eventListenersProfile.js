import { toggleSection } from "../../../components/profile/toggleSection.js"; // Import toggleSection function

export function addProfileEventListeners() {
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
}
