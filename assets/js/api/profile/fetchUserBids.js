import { PROFILE_URL } from "../constants.js";
import { headers } from "../headers.js";
import { getFromLocalStorage } from "../../utils/storage/storage.js";
import { showMessage } from "../../utils/dom/messageHandler.js";

export async function fetchUserBids() {
  const username = getFromLocalStorage("username");
  if (!username) return [];

  try {
    const response = await fetch(
      `${PROFILE_URL}/${username}/bids?_listings=true`,
      { headers: headers() },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch bids. Status: ${response.status}`);
    }

    const data = await response.json();

    return data?.data || [];
  } catch (error) {
    console.error("Error fetching bids:", error);
    showMessage("error", "error Fetching Bids");
    return [];
  }
}
