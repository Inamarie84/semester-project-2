import { searchListings } from "./searchListings.js";

export function setupSearch() {
  const searchButton = document.getElementById("search-button");
  const searchQuery = document.getElementById("search-query");
  const searchResultsContainer = document.getElementById("search-results");
  const searchHeadingContainer = document.getElementById("search-heading");

  function handleSearch() {
    const query = searchQuery.value.trim();

    if (!query) {
      searchResultsContainer.innerHTML = "";
      searchHeadingContainer.innerHTML = "";
    }

    searchListings(query);
  }

  searchButton.addEventListener("click", handleSearch);

  searchQuery.addEventListener("input", handleSearch);

  searchQuery.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
}
