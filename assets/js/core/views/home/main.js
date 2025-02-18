// import { fetchListings } from "./fetchListings.js";
// import { generateListings } from "./generateListings.js";
// import { createListingButton } from "../../../components/createListingButton.js";

// const displayContainer = document.getElementById("listings-container");
// const mainContainer = document.querySelector("main");

// async function main() {
//   // ✅ Add "Create Listing" button to main page
//   if (mainContainer) createListingButton(mainContainer);

//   // Fetch and display listings
//   try {
//     const listings = await fetchListings();
//     console.log("Number of Listings:", listings.length);

//     displayContainer.innerHTML = "";
//     generateListings(listings, displayContainer);
//   } catch (error) {
//     console.error("❌ Error fetching listings:", error.message);
//   }
// }

// main();

import { fetchListings } from "./fetchListings.js";
import { generateListings } from "./generateListings.js";
import { createListingButton } from "../../../components/createListingButton.js";
import { searchListings } from "../../../components/searchListings.js"; // Import the search function

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
    generateListings(listings, displayContainer);
  } catch (error) {
    console.error("❌ Error fetching listings:", error.message);
  }

  // Adding event listener for search functionality
  document.getElementById("search-button").addEventListener("click", () => {
    const query = document.getElementById("search-query").value;
    searchListings(query); // Call the search function with the query
  });
}

main();
