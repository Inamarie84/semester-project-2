// import { createListingButton } from "../../../components/listings/createListingButton.js";
// import { setupSearch } from "../../../components/listings/setupSearch.js";
// import { setupFilters } from "../../../components/listings/filterListings.js";
// import { loadListings } from "../../../utils/listings/listingsPagination.js";

// // Declare mainContainer before calling main()
// const mainContainer = document.querySelector("main");

// async function main() {
//   if (mainContainer) createListingButton(mainContainer);

//   try {
//     // Load the first page of listings
//     await loadListings(1);
//     console.log("Listings are fully loaded.");
//   } catch (error) {
//     console.error("Error loading listings:", error);
//   }

//   // Initialize filters and search
//   setupFilters();
//   setupSearch();
// }

// main()
//   .then(() => {
//     // Optional: Do something after listings are loaded
//   })
//   .catch((error) => {
//     console.error("Error during the main function:", error);
//   });

import { createListingButton } from "../../../components/listings/createListingButton.js";
import { setupSearch } from "../../../components/listings/setupSearch.js";
import { setupFilters } from "../../../components/listings/filterListings.js";
import { loadListings } from "../../../utils/listings/listingsPagination.js";
import { showMessage } from "../../../utils/dom/messageHandler.js";

const mainContainer = document.querySelector("main");

async function main() {
  if (mainContainer) createListingButton(mainContainer);

  try {
    await loadListings(1);
    console.log("Listings are fully loaded.");
  } catch (error) {
    console.error("Error loading listings:", error);
    showMessage("error", "error", "messages-container");
  }

  setupFilters();
  setupSearch();
}

main()
  .then(() => {})
  .catch((error) => {
    console.error("Error during the main function:", error);
    showMessage("error", "error", "messages-container");
  });
