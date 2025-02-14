import { fetchListings } from "./fetchListings.js";
import { generatelistings } from "./generateListings.js";
import { createListingButton } from "../../../components/createListingButton.js";

const displayContainer = document.getElementById("listings-container");
const mainContainer = document.querySelector("main");

async function main() {
  // ✅ Add "Create Listing" button to main page
  if (mainContainer) createListingButton(mainContainer);

  // Fetch and display listings
  try {
    const listings = await fetchListings();
    console.log("Number of Listings:", listings.length);

    displayContainer.innerHTML = "";
    generatelistings(listings, displayContainer);
  } catch (error) {
    console.error("❌ Error fetching listings:", error.message);
  }
}

main();
