import { fetchListings } from "../../api/listings/fetchListings.js";
import { generateListings } from "../../components/listings/generateListings.js";

const listingsContainer = document.querySelector("#listings-container");
const prevButton = document.querySelector("#prev-page");
const nextButton = document.querySelector("#next-page");
const pageDisplay = document.querySelector("#current-page");

let currentPage = 1;
const listingsPerPage = 20;

export async function loadListings(page) {
  try {
    const listings = await fetchListings(page);

    if (!listings || !Array.isArray(listings)) {
      console.error("Error: Listings is not an array", listings);
      return [];
    }

    const totalListings = listings.length;

    const startIndex = (page - 1) * listingsPerPage;
    const endIndex = startIndex + listingsPerPage;
    const paginatedListings = listings.slice(startIndex, endIndex);

    // console.log(
    //   `Showing listings from ${startIndex} to ${endIndex}:`,
    //   paginatedListings,
    // );

    listingsContainer.innerHTML = "";
    generateListings(paginatedListings, listingsContainer);

    currentPage = page;
    if (pageDisplay) {
      pageDisplay.textContent = `Page ${currentPage}`;
    }

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = endIndex >= totalListings;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return paginatedListings;
  } catch (error) {
    console.error("Error loading paginated listings:", error);
    return [];
  }
}

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    loadListings(currentPage - 1);
  }
});

nextButton.addEventListener("click", () => {
  loadListings(currentPage + 1);
});

loadListings(currentPage);
