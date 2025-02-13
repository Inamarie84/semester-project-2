import { fetchListings } from "./fetchListings.js";
import { generatelistings } from "./generateListings.js";

const displayContainer = document.getElementById("listings-container");

async function main() {
  // Check if the user is logged in by looking for the access token in localStorage
  const accessToken = localStorage.getItem("accessToken");

  // If the user is logged in, display the "Create Listing" button
  if (accessToken) {
    const mainContainer = document.querySelector("main"); // Select the main container
    if (mainContainer) {
      const createButton = document.createElement("a");
      createButton.href = "/listing/create-listing.html"; // Link to create-listing page
      createButton.textContent = "Create Listing";
      createButton.className =
        "bg-green-btn text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 shadow-md block w-fit mx-auto mb-6";

      // Insert button before the listings section
      mainContainer.prepend(createButton);
    }
  }

  // Fetch and display listings
  const listings = await fetchListings();
  generatelistings(listings, displayContainer);
}

main();
