import { BASE_API_URL } from "../../api/constants.js";
import { headers } from "../../api/headers.js";
import { showMessage } from "../../utils/dom/messageHandler.js";

/**
 * Places a bid on a listing.
 * @param {string} listingId - The ID of the listing.
 * @param {number} bidAmount - The amount of the bid.
 * @returns {Promise<{ok: boolean, data?: any, error?: string}>}
 */
export async function placeBid(listingId, bidAmount) {
  if (bidAmount <= 0) {
    showMessage("error", "Bid amount must be greater than zero.");
    return { ok: false, error: "Invalid bid amount" };
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

    const result = await response.json().catch(() => ({}));

    if (response.ok) {
      showMessage("success", "Bid placed successfully!");
      return { ok: true, data: result };
    }

    const errorMessage =
      result.errors?.[0]?.message ||
      "There was an error placing your bid, please try again.";
    showMessage("error", errorMessage);
    return { ok: false, error: errorMessage };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    showMessage(
      "error",
      `A network error occurred. Please try again. (${message})`,
    );
    return { ok: false, error: message };
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

    const data = await response.json().catch(() => ({}));
    return data.data?.bids || [];
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    showMessage(
      "error",
      `A network error occurred while fetching bids. (${message})`,
    );
    return [];
  }
}
