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
  } catch {
    showMessage("error", "error loading listinngs.");
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
