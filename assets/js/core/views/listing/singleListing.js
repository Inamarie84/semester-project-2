// singleListing.js
import { fetchListingDetails } from "../../../api/listingApi.js";
import { renderListingDetails } from "../../../components/renderListing.js";
import { updateTitle } from "../../../utils/updateTitle.js";
import { getFromLocalStorage } from "../../../utils/storage.js";

const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

const listingContainer = document.getElementById("listing-container");
const token = getFromLocalStorage("accessToken");

if (!listingId) {
  listingContainer.innerHTML = "<p class='text-red-500'>Listing not found.</p>";
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
