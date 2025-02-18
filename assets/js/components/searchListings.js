import { LISTINGS_URL } from "../api/constants.js";
import { headers } from "../api/headers.js";

// Function to handle search
export async function searchListings(query) {
  const searchResultsContainer = document.getElementById("search-results");
  if (!query.trim()) {
    searchResultsContainer.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  try {
    const response = await fetch(`${LISTINGS_URL}/search?q=${query}`, {
      method: "GET",
      headers: headers(),
    });

    const data = await response.json();
    console.log(data); // Log to inspect the structure of the data

    if (response.ok) {
      // Display the search results
      displaySearchResults(data.data);
    } else {
      searchResultsContainer.innerHTML = `<p>No results found for "${query}".</p>`;
    }
  } catch (error) {
    console.error("❌ Error fetching search results:", error);
  }
}

// Function to display search results
function displaySearchResults(listings) {
  const searchResultsContainer = document.getElementById("search-results");

  if (!Array.isArray(listings) || listings.length === 0) {
    searchResultsContainer.innerHTML = "<p>No listings found.</p>";
    return;
  }

  searchResultsContainer.innerHTML = ""; // Clear previous results

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

    // Image or Placeholder
    const image = document.createElement("img");
    image.classList.add("w-full", "h-48", "object-cover", "rounded-md", "mb-3");

    if (listing.media && listing.media.length > 0) {
      image.src = listing.media[0].url;
      image.alt = listing.media[0].alt || "Listing Image";
    } else {
      image.src = "https://via.placeholder.com/300x200?text=No+Image+Available";
      image.alt = "No Image Available";
    }

    // Title
    const title = document.createElement("h2");
    title.textContent = listing.title;
    title.classList.add("text-lg", "font-bold", "mb-2");

    // Description
    const description = document.createElement("p");
    description.textContent =
      listing.description || "No description available.";
    description.classList.add("text-sm", "text-gray-600", "mb-3");

    // Ends At (Auction End Date)
    const endsAt = document.createElement("p");
    endsAt.textContent = `Ends: ${new Date(listing.endsAt).toLocaleDateString()}`;
    endsAt.classList.add("text-xs", "text-gray-500", "italic");

    // Bids Count
    const bidsCount = document.createElement("p");
    bidsCount.textContent = `Bids: ${listing._count?.bids ?? 0}`;
    bidsCount.classList.add("text-sm", "font-medium", "mt-2", "text-gray-700");

    // View Listing Button
    const viewButton = document.createElement("a");
    viewButton.href = `/listing/single-listing.html?id=${listing.id}`; // Link to the single listing page

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

    // Append elements to card
    card.append(image, title, description, endsAt, bidsCount, viewButton);

    // Append card to results container
    searchResultsContainer.appendChild(card);
  });
}

// Event listener for the search button
document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-query").value;
  searchListings(query);
});

// Optional: Add an event listener to trigger search when Enter is pressed
document.getElementById("search-query").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = document.getElementById("search-query").value;
    searchListings(query);
  }
});
