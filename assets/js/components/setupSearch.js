import { searchListings } from "./searchListings.js";

export function setupSearch() {
  const searchButton = document.getElementById("search-button");
  const searchQuery = document.getElementById("search-query");
  const searchResultsContainer = document.getElementById("search-results");
  const searchHeadingContainer = document.getElementById("search-heading");

  function handleSearch() {
    const query = searchQuery.value.trim();

    if (!query) {
      searchResultsContainer.innerHTML = ""; // Clear results
      searchHeadingContainer.innerHTML = ""; // Clear heading
      return;
    }

    searchListings(query);
  }

  // Search button click
  searchButton.addEventListener("click", handleSearch);

  // Live search when typing
  searchQuery.addEventListener("input", handleSearch);

  // Search on Enter key press
  searchQuery.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
}
