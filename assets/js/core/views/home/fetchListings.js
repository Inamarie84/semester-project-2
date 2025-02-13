import { API_KEY, LISTINGS_URL } from "../../../api/constants.js";
import { getFromLocalStorage } from "../../../utils/storage.js";

export async function fetchListings() {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    };

    const response = await fetch(LISTINGS_URL, fetchOptions);
    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }

    const json = await response.json();
    return json.data; // Assuming data is inside `json.data`
  } catch (error) {
    console.error("Error fetching listings:", error);
    return []; // Return empty array to prevent errors in UI
  }
}
