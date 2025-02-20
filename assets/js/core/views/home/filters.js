import { generateListings } from "./generateListings.js";
import { fetchListings } from "./fetchListings.js";

// const filterActiveCheckbox = document.getElementById("filter-active");
const filterTagDropdown = document.getElementById("filter-tag");
const sortDropdown = document.getElementById("sort-options");

async function applyFilters() {
  try {
    let listings = await fetchListings();

    if (listings.length === 0) {
      console.warn("⚠ No listings available to filter.");
      return;
    }

    console.log("✅ Original Listings:", listings);
    console.log("🔍 Example Listing:", listings[0]); // Debugging properties

    // 🔹 Filter by Active Listings
    // if (filterActiveCheckbox.checked) {
    //   listings = listings.filter((listing) => listing.active);
    //   console.log("🟢 Showing only active listings");
    // }

    // 🔹 Category Filter (Case-Insensitive)
    const selectedCategory = filterTagDropdown.value.toLowerCase();
    if (selectedCategory) {
      console.log(`🔍 Filtering by category/tag: ${selectedCategory}`);
      listings = listings.filter(
        (listing) =>
          listing.tags &&
          listing.tags.some((tag) => tag.toLowerCase() === selectedCategory),
      );
    }

    // 🔹 Sorting Options (Fixes and Improvements)
    const selectedSort = sortDropdown.value;
    console.log(`🔄 Sorting by: ${selectedSort}`);

    if (selectedSort === "price-high") {
      listings.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "price-low") {
      listings.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "ending-soon") {
      listings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
    } else {
      listings.sort((a, b) => new Date(b.created) - new Date(a.created)); // Newest First
    }

    // 🔹 Debug final filtered/sorted listings
    console.log("🎯 Filtered Listings:", listings);

    // 🔹 Update UI
    const displayContainer = document.getElementById("listings-container");
    displayContainer.innerHTML = "";

    if (listings.length === 0) {
      displayContainer.innerHTML =
        "<p class='text-gray-500'>No listings match your criteria.</p>";
    } else {
      generateListings(listings, displayContainer);
    }
  } catch (error) {
    console.error("❌ Error applying filters:", error.message);
  }
}

// ✅ Ensure filters are properly set up
export function setupFilters() {
  //   filterActiveCheckbox.addEventListener("change", applyFilters);
  filterTagDropdown.addEventListener("change", applyFilters);
  sortDropdown.addEventListener("change", applyFilters);
}
