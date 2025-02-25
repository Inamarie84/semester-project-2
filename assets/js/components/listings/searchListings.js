import { LISTINGS_URL } from "../../api/constants.js";
import { headers } from "../../api/headers.js";

export async function searchListings(query) {
  const searchResultsContainer = document.getElementById("search-results");
  const searchHeadingContainer = document.getElementById("search-heading");

  if (!query.trim()) {
    searchResultsContainer.innerHTML = "";
    searchHeadingContainer.innerHTML = "";
    return;
  }

  const lowerCaseQuery = query.toLowerCase();

  try {
    const response = await fetch(`${LISTINGS_URL}/search?q=${query}`, {
      method: "GET",
      headers: headers(),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      displaySearchResults(data.data, lowerCaseQuery);
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

  searchResultsContainer.innerHTML = "";
  searchHeadingContainer.innerHTML = `<h1 class="text-2xl font-bold mb-4">Search Results for: "${query}"</h1>`;

  listings.forEach((listing) => {
    const title = listing.title?.toLowerCase() || "";
    const description = listing.description?.toLowerCase() || "";

    if (title.includes(query) || description.includes(query)) {
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

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("w-full", "mb-3");

      if (listing.media && listing.media.length > 0) {
        const image = document.createElement("img");
        image.classList.add(
          "w-full",
          "h-48",
          "object-cover",
          "rounded-md",
          "mb-3",
        );
        image.src = listing.media[0].url;
        image.alt = listing.media[0].alt || "Listing Image";
        imageContainer.appendChild(image);
      } else {
        const noImageText = document.createElement("div");
        noImageText.textContent = "No Image Available";
        noImageText.classList.add(
          "w-full",
          "h-48",
          "flex",
          "items-center",
          "justify-center",
          "bg-gray-300",
          "text-center",
          "text-gray-500",
          "font-semibold",
        );
        imageContainer.appendChild(noImageText);
      }

      const titleElement = document.createElement("h3");
      titleElement.textContent = listing.title;
      titleElement.classList.add("mb-2");

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent =
        listing.description || "No description available.";
      descriptionElement.classList.add("mb-3");

      const endsAt = document.createElement("p");
      endsAt.textContent = `Ends: ${new Date(listing.endsAt).toLocaleDateString()}`;
      endsAt.classList.add("text-xs", "text-gray-500", "italic");

      const bidsCount = document.createElement("p");
      bidsCount.textContent = `Bids: ${listing._count?.bids ?? 0}`;
      bidsCount.classList.add(
        "text-sm",
        "font-medium",
        "mt-2",
        "mb-2",
        "text-gray-700",
      );

      const viewButton = document.createElement("a");
      viewButton.href = `/single-listing.html?id=${listing.id}`;
      viewButton.textContent = "View Listing";
      viewButton.classList.add(
        "px-4",
        "py-2",
        "bg-header",
        "text-light-bg",
        "rounded-md",
        "hover:bg-footer",
        "transition",
        "duration-300",
        "shadow-md",
        "focus:shadow-lg",
      );

      card.append(
        imageContainer,
        titleElement,
        descriptionElement,
        endsAt,
        bidsCount,
        viewButton,
      );
      searchResultsContainer.appendChild(card);
    }
  });
}
