// singleListing.js
import { fetchListingDetails } from "../../../api/listing/fetchListing.js";
import { renderListingDetails } from "../../../components/listing/renderListing.js";
import { updateTitle } from "../../../utils/dom/updateTitle.js";
import { getFromLocalStorage } from "../../../utils/storage/storage.js";

const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

const listingContainer = document.getElementById("listing-container");
const token = getFromLocalStorage("accessToken");

if (!listingId) {
  listingContainer.innerHTML =
    "<p class='text-red-500'>Listing not found. Please check the URL or go back to the homepage.</p>";
  const backButton = document.createElement("button");
  backButton.textContent = "Go back to homepage";
  backButton.className = "mt-4 p-2 bg-gray-300 rounded";
  backButton.onclick = () => (window.location.href = "/");
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
    listingContainer.innerHTML = `<p class="text-red-500">Error loading listing.</p>`;
  }
}
