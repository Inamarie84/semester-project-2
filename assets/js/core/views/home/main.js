import { fetchListings } from "./fetchListings.js";
import { generateListings } from "./generateListings.js";
import { createListingButton } from "../../../components/createListingButton.js";
import { setupSearch } from "../../../components/setupSearch.js";
import { setupFilters } from "./filters.js";

const displayContainer = document.getElementById("listings-container");
const mainContainer = document.querySelector("main");

async function main() {
  // Add "Create Listing" button
  if (mainContainer) createListingButton(mainContainer);

  // Fetch listings and display them
  try {
    const listings = await fetchListings();
    console.log("Number of Listings:", listings.length);

    displayContainer.innerHTML = "";
    generateListings(listings, displayContainer);

    // Initialize filters and sorting
    setupFilters();
  } catch (error) {
    console.error("❌ Error fetching listings:", error.message);
  }

  // Setup search functionality
  setupSearch();
}

main();
