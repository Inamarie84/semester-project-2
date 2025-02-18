import { BASE_API_URL } from "../api/constants.js";
import { getFromLocalStorage } from "../utils/storage.js";
import { headers } from "../api/headers.js";

/**
 * Places a bid on a listing.
 * @param {string} listingId - The ID of the listing.
 * @param {number} bidAmount - The amount of the bid.
 */
export async function placeBid(listingId, bidAmount) {
  const token = getFromLocalStorage("accessToken"); // Use consistent key

  if (!token) {
    alert("You need to be logged in to place a bid.");
    return;
  }

  if (bidAmount <= 0) {
    alert("Please enter a valid bid amount.");
    return;
  }

  try {
    const response = await fetch(
      `${BASE_API_URL}/auction/listings/${listingId}/bids`,
      {
        method: "POST",
        headers: headers(), // Use headers function
        body: JSON.stringify({ amount: bidAmount }),
      },
    );

    const result = await response.json();
    if (response.ok) {
      alert("Your bid has been placed successfully.");
      return result;
    } else {
      alert(`Error: ${result.errors?.[0]?.message || "Failed to place bid"}`);
    }
  } catch (error) {
    console.error("Error placing bid:", error);
    alert("Something went wrong while placing the bid.");
  }
}

/**
 * Fetches all bids for a listing.
 * @param {string} listingId - The ID of the listing.
 * @returns {Promise<Array>} - An array of bids.
 */
export async function fetchBids(listingId) {
  try {
    const response = await fetch(
      `${BASE_API_URL}/auction/listings/${listingId}?_bids=true`,
      { headers: headers() },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch bids");
    }

    const data = await response.json();
    return data.data.bids || [];
  } catch (error) {
    console.error("❌ Error fetching bids:", error);
    return [];
  }
}
