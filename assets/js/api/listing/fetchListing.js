import { LISTINGS_URL } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Fetch listing details by ID, including seller and bids.
 * @param {string} listingId - The ID of the listing.
 * @returns {Promise<Object>} - The listing details.
 */
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

/**
 * Create a new listing.
 * @param {Object} listingData - The data for the new listing.
 * @returns {Promise<Object>} - The created listing.
 */
export async function createListing(listingData) {
  try {
    const response = await fetch(LISTINGS_URL, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(listingData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.errors ? data.errors[0].message : "Failed to create listing",
      );
    }

    return data;
  } catch (error) {
    console.error("❌ Error creating listing:", error);
    throw new Error(error.message);
  }
}
