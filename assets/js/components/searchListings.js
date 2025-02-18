// searchListings.js (No Changes Needed)
import { LISTINGS_URL } from "../api/constants.js";
import { headers } from "../api/headers.js";

export async function searchListings(query) {
  const searchResultsContainer = document.getElementById("search-results");
  const searchHeadingContainer = document.getElementById("search-heading");

  if (!query.trim()) {
    searchResultsContainer.innerHTML = ""; // Clear results if the search is empty
    searchHeadingContainer.innerHTML = ""; // Clear the heading as well
    return; // Exit the function if no query is provided
  }

  try {
    const response = await fetch(`${LISTINGS_URL}/search?q=${query}`, {
      method: "GET",
      headers: headers(),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      displaySearchResults(data.data, query);
    } else {
      searchResultsContainer.innerHTML = `<p>No results found for "${query}".</p>`;
    }
  } catch (error) {
    console.error("❌ Error fetching search results:", error);
  }
}

function displaySearchResults(listings, query) {
  const searchResultsContainer = document.getElementById("search-results");
  const searchHeadingContainer = document.getElementById("search-heading");

  if (!Array.isArray(listings) || listings.length === 0) {
    searchResultsContainer.innerHTML = "<p>No listings found.</p>";
    return;
  }

  searchResultsContainer.innerHTML = ""; // Clear previous results
  searchHeadingContainer.innerHTML = `<h1 class="text-2xl font-bold mb-4">Search Results for: "${query}"</h1>`; // Add search heading

  listings.forEach((listing) => {
    const card = document.createElement("div");
    card.classList.add(
      "bg-white",
      "rounded-lg",
      "shadow-md",
      "p-4",
      "flex",
      "flex-col",
      "items-center",
      "text-center",
      "transition",
      "hover:shadow-lg",
    );

    const image = document.createElement("img");
    image.classList.add("w-full", "h-48", "object-cover", "rounded-md", "mb-3");

    if (listing.media && listing.media.length > 0) {
      image.src = listing.media[0].url;
      image.alt = listing.media[0].alt || "Listing Image";
    } else {
      image.src = "https://via.placeholder.com/300x200?text=No+Image+Available";
      image.alt = "No Image Available";
    }

    const title = document.createElement("h2");
    title.textContent = listing.title;
    title.classList.add("text-lg", "font-bold", "mb-2");

    const description = document.createElement("p");
    description.textContent =
      listing.description || "No description available.";
    description.classList.add("text-sm", "text-gray-600", "mb-3");

    const endsAt = document.createElement("p");
    endsAt.textContent = `Ends: ${new Date(listing.endsAt).toLocaleDateString()}`;
    endsAt.classList.add("text-xs", "text-gray-500", "italic");

    const bidsCount = document.createElement("p");
    bidsCount.textContent = `Bids: ${listing._count?.bids ?? 0}`;
    bidsCount.classList.add("text-sm", "font-medium", "mt-2", "text-gray-700");

    const viewButton = document.createElement("a");
    viewButton.href = `/listing/single-listing.html?id=${listing.id}`;

    viewButton.textContent = "View Listing";
    viewButton.classList.add(
      "mt-3",
      "px-4",
      "py-2",
      "bg-blue-500",
      "text-white",
      "rounded-lg",
      "hover:bg-blue-600",
      "transition",
    );

    card.append(image, title, description, endsAt, bidsCount, viewButton);
    searchResultsContainer.appendChild(card);
  });
}
