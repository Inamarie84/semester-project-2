import { fetchListingDetails } from "../../../api/listing/fetchListing.js";
import { renderListingDetails } from "../../../components/listing/renderListing.js";
import { updateTitle } from "../../../utils/dom/updateTitle.js";
import { getFromLocalStorage } from "../../../utils/storage/storage.js";
import { showMessage } from "../../../utils/dom/messageHandler.js";
import { createBackButton } from "../../../components/listing/backButton.js";

const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

const listingContainer = document.getElementById("listing-container");
const token = getFromLocalStorage("accessToken");

if (!listingId) {
  listingContainer.innerHTML =
    "<p class='text-red-500'>Listing not found. Please check the URL or go back to the homepage.</p>";
  const backButton = createBackButton();
  listingContainer.appendChild(backButton);
} else {
  fetchListingDetailsAndRender();
}

async function fetchListingDetailsAndRender() {
  try {
    const listing = await fetchListingDetails(listingId);
    updateTitle(listing.title);
    renderListingDetails(listing, listing.bids, listingContainer);
  } catch (error) {
    showMessage("error", "error", "messages-container");
    console.error("Error loading listing:", error);
  }
}
