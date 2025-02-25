import { generateListings } from "./generateListings.js";
import { fetchListings } from "../../api/listings/fetchListings.js";
import { showMessage } from "../../utils/dom/messageHandler.js";

const filterTagDropdown = document.getElementById("filter-tag");
const sortDropdown = document.getElementById("sort-options");

async function applyFilters() {
  try {
    let listings = await fetchListings();

    if (!listings || listings.length === 0) {
      showMessage("error", "No listings available.");
      return;
    }

    const selectedCategory = filterTagDropdown.value.toLowerCase();
    if (selectedCategory) {
      listings = listings.filter(
        (listing) =>
          listing.tags &&
          listing.tags.some((tag) => tag.toLowerCase() === selectedCategory),
      );
    }

    const selectedSort = sortDropdown.value;

    if (selectedSort === "ending-soon") {
      listings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
    } else {
      listings.sort((a, b) => new Date(b.created) - new Date(a.created)); // Newest First
    }

    const displayContainer = document.getElementById("listings-container");
    displayContainer.innerHTML = "";

    if (listings.length === 0) {
      showMessage("error", "No listings match your criteria.");
    } else {
      generateListings(listings, displayContainer);
    }
  } catch (error) {
    showMessage("error", "An error occurred while applying filters.");
  }
}

export function setupFilters() {
  filterTagDropdown.addEventListener("change", applyFilters);
  sortDropdown.addEventListener("change", applyFilters);
}
