import { API_KEY, LISTINGS_URL } from "../constants.js";
import { getFromLocalStorage } from "../../utils/storage/storage.js";
import { filterExpiredListings } from "../../utils/listings/filterExpiredListings.js";
import { showMessage } from "../../utils/dom/messageHandler.js";

export async function fetchListings(page = 1, limit = 20) {
  try {
    const accessToken = getFromLocalStorage("accessToken");

    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    };

    const response = await fetch(
      `${LISTINGS_URL}?_seller=true&_limit=${limit}&_page=${page}&sort=created&sortOrder=desc`,
      fetchOptions,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch listings. Status: ${response.status}`);
    }

    const json = await response.json();

    return filterExpiredListings(json.data);
  } catch {
    showMessage(
      "error",
      "There was an issue fetching the listings. Please try again later.",
    );
    return [];
  }
}
