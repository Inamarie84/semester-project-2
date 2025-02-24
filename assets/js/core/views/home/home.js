import { createListingButton } from "../../../components/listings/createListingButton.js";
import { setupSearch } from "../../../components/listings/setupSearch.js";
import { setupFilters } from "../../../components/listings/filterListings.js";
import { loadListings } from "../../../utils/listings/listingsPagination.js";

// Declare mainContainer before calling main()
const mainContainer = document.querySelector("main");

async function main() {
  if (mainContainer) createListingButton(mainContainer);

  // Load first page of listings
  await loadListings(1);

  // Initialize filters and search
  setupFilters();
  setupSearch();
}

// Now calling main() after all necessary variables are initialized
main();
