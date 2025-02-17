import { LISTINGS_URL } from "../../../api/constants.js";

// Get the listing ID from the URL
const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

const listingContainer = document.getElementById("listing-container");

if (!listingId) {
  listingContainer.innerHTML = "<p class='text-red-500'>Listing not found.</p>";
} else {
  fetchListingDetails();
}

async function fetchListingDetails() {
  try {
    const response = await fetch(
      `${LISTINGS_URL}/${listingId}?_seller=true&_bids=true`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch listing details");
    }

    const json = await response.json();
    const listing = json.data; // ✅ Access listing inside "data"

    displayListingDetails(listing);
  } catch (error) {
    listingContainer.innerHTML = `<p class="text-red-500">Error loading listing.</p>`;
    console.error("❌ Error fetching listing details:", error);
  }
}

function displayListingDetails(listing) {
  listingContainer.innerHTML = `
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-3">${listing.title}</h2>
      <img src="${listing.media?.[0]?.url || "https://via.placeholder.com/300"}" 
           alt="${listing.media?.[0]?.alt || "Listing Image"}" 
           class="w-full h-64 object-cover rounded mb-3">
      <p class="text-gray-700">${listing.description || "No description available."}</p>
      <p class="text-gray-500 mt-2"><strong>Ends:</strong> ${new Date(listing.endsAt).toLocaleString()}</p>
      <p class="text-gray-700 mt-2"><strong>Bids:</strong> ${listing._count?.bids ?? 0}</p>
      <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        Place a Bid
      </button>
    </div>
  `;
}
