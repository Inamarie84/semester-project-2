import { PROFILE_URL } from "../constants.js";
import { headers } from "../headers.js";
import { getFromLocalStorage } from "../../utils/storage/storage.js";

export async function fetchUserBids() {
  const username = getFromLocalStorage("username");
  if (!username) return [];

  try {
    const response = await fetch(
      `${PROFILE_URL}/${username}/bids?_listings=true`,
      { headers: headers() },
    );

    if (!response.ok) throw new Error("Failed to fetch bids");

    const { data } = await response.json();

    if (!data || data.length === 0) {
      console.log("No bids found for the user.");
      showMessage("info", "noBids");
      return [];
    }

    return data;
  } catch (error) {
    showMessage("error", "An error occurred while fetching your bids.");
    return [];
  }
}
