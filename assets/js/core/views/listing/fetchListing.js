// fetchListing.js
import { LISTINGS_URL } from "../../../api/constants.js";

export async function fetchListingDetails(listingId) {
  try {
    const response = await fetch(
      `${LISTINGS_URL}/${listingId}?_seller=true&_bids=true`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch listing details");
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("❌ Error fetching listing details:", error);
    throw error;
  }
}
