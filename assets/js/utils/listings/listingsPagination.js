import { fetchListings } from "../../api/listings/fetchListings.js";
import { generateListings } from "../../components/listings/generateListings.js";

const listingsContainer = document.querySelector("#listings-container");
const prevButton = document.querySelector("#prev-page");
const nextButton = document.querySelector("#next-page");
const pageDisplay = document.querySelector("#current-page");

let currentPage = 1;
const listingsPerPage = 20; // Adjust as needed

export async function loadListings(page) {
  try {
    console.log("Fetching listings..."); // Debugging
    const listings = await fetchListings(page); // Fetch listings for the current page
    console.log("Fetched Listings:", listings); // Debugging

    if (!listings || !Array.isArray(listings)) {
      console.error("Error: Listings is not an array", listings);
      return [];
    }

    const totalListings = listings.length;
    console.log(`Total Listings Available: ${totalListings}`); // Debugging

    // Calculate pagination
    const startIndex = (page - 1) * listingsPerPage;
    const endIndex = startIndex + listingsPerPage;
    const paginatedListings = listings.slice(startIndex, endIndex);

    console.log(
      `Showing listings from ${startIndex} to ${endIndex}:`,
      paginatedListings,
    ); // Debugging

    listingsContainer.innerHTML = ""; // Clear previous listings
    generateListings(paginatedListings, listingsContainer);

    // Update currentPage and display it
    currentPage = page;
    if (pageDisplay) {
      pageDisplay.textContent = `Page ${currentPage}`;
    }

    // Enable or disable buttons based on the page number
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = endIndex >= totalListings; // Disable if last page

    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll for a better user experience
    });

    return paginatedListings;
  } catch (error) {
    console.error("Error loading paginated listings:", error);
    return [];
  }
}

// Event listeners for pagination buttons
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    loadListings(currentPage - 1); // Load previous page
  }
});

nextButton.addEventListener("click", () => {
  loadListings(currentPage + 1); // Load next page
});

// Initial load
loadListings(currentPage);
