import { fetchListings } from "./fetchListings.js";
import { generateListings } from "./generateListings.js";
import { createListingButton } from "../../../components/createListingButton.js";
import { searchListings } from "../../../components/searchListings.js"; // Import the search function

const displayContainer = document.getElementById("listings-container");
const mainContainer = document.querySelector("main");

async function main() {
  // Add "Create Listing" button to main page
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

  // Event listener for search button
  const searchButton = document.getElementById("search-button");
  const searchQuery = document.getElementById("search-query");

  searchButton.addEventListener("click", () => {
    const query = searchQuery.value;
    searchListings(query); // Call the search function with the query
  });

  // Trigger search when the user types or removes letters (using the input event)
  searchQuery.addEventListener("input", () => {
    const query = searchQuery.value;
    const searchResultsContainer = document.getElementById("search-results");
    const searchHeadingContainer = document.getElementById("search-heading");

    // If the input is empty, clear search results and heading
    if (!query.trim()) {
      searchResultsContainer.innerHTML = ""; // Clear results
      searchHeadingContainer.innerHTML = ""; // Clear heading
    } else {
      searchListings(query); // Otherwise, perform the search
    }
  });

  // Optional: Listen for "Enter" press to trigger search
  searchQuery.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchQuery.value;
      searchListings(query); // Call the search function with the query
    }
  });
}

main();
