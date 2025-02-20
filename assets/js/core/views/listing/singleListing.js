import { LISTINGS_URL } from "../../../api/constants.js";
import { placeBid } from "../../../components/placeAndFetchBids.js";
import { getFromLocalStorage } from "../../../utils/storage.js";

// Get the listing ID from the URL
const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

const listingContainer = document.getElementById("listing-container");
const token = getFromLocalStorage("accessToken"); // Check if the user is logged in

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
    const listing = json.data;

    displayListingDetails(listing, listing.bids); // Pass bids directly
  } catch (error) {
    listingContainer.innerHTML = `<p class="text-red-500">Error loading listing.</p>`;
    console.error("❌ Error fetching listing details:", error);
  }
}

function displayListingDetails(listing, bids) {
  const container = document.createElement("div");
  container.className =
    "bg-white shadow-md rounded-lg p-6 text-center max-w-lg mx-auto";

  const backButton = document.createElement("button");
  backButton.textContent = "← Back";
  backButton.className = "mb-4 text-footer font-semibold hover:underline";
  backButton.onclick = () => window.history.back();

  const title = document.createElement("h2");
  title.textContent = listing.title;
  title.className = "mb-3";

  const img = document.createElement("img");
  img.src = listing.media?.[0]?.url || "https://via.placeholder.com/300";
  img.alt = listing.media?.[0]?.alt || "Listing Image";
  img.className = "w-full h-64 object-cover rounded mb-3";

  const desc = document.createElement("p");
  desc.textContent = listing.description || "No description available.";
  desc.className = "text-text mb-3";

  const endsAt = document.createElement("p");
  endsAt.innerHTML = `<strong>Ends:</strong> ${new Date(listing.endsAt).toLocaleString()}`;
  endsAt.classList.add("text-xs", "text-gray-500", "italic");

  const bidCount = document.createElement("p");
  bidCount.innerHTML = `<strong>Bids:</strong> ${listing._count?.bids ?? 0}`;
  bidCount.className = "text-gray-700 mb-3 mt-2";

  // **Bid input & button**
  const bidForm = document.createElement("div");
  bidForm.className = "mt-4 p-4 border rounded bg-white";

  if (token) {
    // Only show bid form if user is logged in
    const bidInput = document.createElement("input");
    bidInput.type = "number";
    bidInput.id = "bid-amount";
    bidInput.placeholder = "Enter bid amount";
    bidInput.className = "border p-2 w-full mt-2";

    const bidButton = document.createElement("button");
    bidButton.textContent = "Place a Bid";
    bidButton.className =
      "w-fit mx-auto font-heading text-base bg-header text-light-bg py-2 px-4 rounded-md hover:bg-footer transition duration-300 shadow-md focus:shadow-lg text-center block mt-2";
    bidButton.addEventListener("click", () => {
      const bidAmount = parseFloat(bidInput.value);
      placeBid(listingId, bidAmount).then(() => fetchListingDetails()); // Reload listing to refresh bids
    });

    bidForm.append(bidInput, bidButton);
  } else {
    bidForm.innerHTML = "<p class='text-red-500'>Log in to place a bid.</p>";
  }

  // **Bids section**
  const bidsSection = document.createElement("div");
  bidsSection.className = "mt-6";
  const bidsTitle = document.createElement("h2");
  bidsTitle.textContent = "Bids";
  bidsTitle.className = "text-lg font-semibold";
  const bidsContainer = document.createElement("div");
  bidsContainer.id = "bids-container";
  bidsContainer.className = "mt-2";

  // Display Bids from the listing response
  if (bids.length === 0) {
    bidsContainer.innerHTML = "<p class='text-gray-500'>No bids yet.</p>";
  } else {
    bids.sort((a, b) => b.amount - a.amount); // Sort highest to lowest
    bids.forEach((bid) => {
      const bidElement = document.createElement("p");
      bidElement.className = "p-2 border-b";
      bidElement.innerHTML = `<strong>${bid.bidder.name}</strong>: ${bid.amount} $`;
      bidsContainer.appendChild(bidElement);
    });
  }

  // Append elements
  bidsSection.append(bidsTitle, bidsContainer);
  container.append(
    backButton,
    title,
    img,
    desc,
    endsAt,
    bidCount,
    bidForm,
    bidsSection,
  );
  listingContainer.innerHTML = ""; // Clear existing content
  listingContainer.appendChild(container);
}
