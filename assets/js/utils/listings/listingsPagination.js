import { fetchListings } from "../../api/listings/fetchListings.js";
import { generateListings } from "../../components/listings/generateListings.js";

const listingsContainer = document.querySelector("#listings-container");
const prevButton = document.querySelector("#prev-page");
const nextButton = document.querySelector("#next-page");
const pageDisplay = document.querySelector("#current-page"); // Ensure this exists in your HTML

let currentPage = 1;
const listingsPerPage = 20; // Adjust as needed

async function loadListings(page) {
  try {
    const listings = await fetchListings(); // Fetch all listings
    const totalListings = listings.length;

    // Calculate pagination
    const startIndex = (page - 1) * listingsPerPage;
    const endIndex = startIndex + listingsPerPage;
    const paginatedListings = listings.slice(startIndex, endIndex);

    listingsContainer.innerHTML = ""; // Clear previous listings
    generateListings(paginatedListings, listingsContainer);

    // Update currentPage and display it
    currentPage = page;
    if (pageDisplay) {
      pageDisplay.textContent = `Page ${currentPage}`;
    }

    // Enable or disable buttons
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = endIndex >= totalListings; // Disable if last page
  } catch (error) {
    console.error("Error loading paginated listings:", error);
  }
}

// Event Listeners
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    loadListings(currentPage - 1);
  }
});

nextButton.addEventListener("click", () => {
  loadListings(currentPage + 1);
});

export { loadListings };
