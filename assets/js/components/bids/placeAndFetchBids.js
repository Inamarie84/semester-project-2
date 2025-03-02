import { BASE_API_URL } from "../../api/constants.js";

import { headers } from "../../api/headers.js";
import { showMessage } from "../../utils/dom/messageHandler.js";

/**
 * Places a bid on a listing.
 * @param {string} listingId - The ID of the listing.
 * @param {number} bidAmount - The amount of the bid.
 */

export async function placeBid(listingId, bidAmount) {
  if (bidAmount <= 0) {
    showMessage("error", "Bid amount must be greater than zero.");
    return;
  }

  try {
    const response = await fetch(
      `${BASE_API_URL}/auction/listings/${listingId}/bids`,
      {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ amount: bidAmount }),
      },
    );

    const result = await response.json();

    if (response.ok) {
      showMessage("success", "Bid placed successfully!");
      return result;
    } else {
      const errorMessage =
        result.errors?.[0]?.message ||
        "There was an error placing your bid, please try again.";
      showMessage("error", errorMessage);
    }
  } catch (error) {
    console.error("Error placing bid:", error);
    showMessage("error", "A network error occurred. Please try again.");
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
