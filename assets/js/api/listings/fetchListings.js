import { API_KEY, LISTINGS_URL } from "../constants.js";
import { getFromLocalStorage } from "../../utils/storage/storage.js";

export async function fetchListings() {
  try {
    const accessToken = getFromLocalStorage("accessToken");

    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    };

    const response = await fetch(
      `${LISTINGS_URL}?_seller=true&_limit=100&sort=created&sortOrder=desc`,
      fetchOptions,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }

    const json = await response.json();
    console.log("All Listings:", json.data); // Debugging

    // Get the current date
    const now = new Date();

    // Filter out expired listings
    const activeListings = json.data.filter((listing) => {
      const endsAtDate = new Date(listing.endsAt);
      return endsAtDate >= now;
    });

    console.log("Active Listings:", activeListings); // Debugging

    return activeListings;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return []; // Return empty array to prevent errors in UI
  }
}
