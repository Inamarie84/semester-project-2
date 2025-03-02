import { getFromLocalStorage } from "../../utils/storage/storage.js";
import { PROFILE_URL } from "../constants.js";
import { headers } from "../headers.js";
import { showMessage } from "../../utils/dom/messageHandler.js";

export async function fetchUserListings() {
  const username = getFromLocalStorage("username");
  if (!username) return [];

  try {
    const response = await fetch(`${PROFILE_URL}/${username}/listings`, {
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch listings. Status: ${response.status}`);
    }

    const data = await response.json();

    return data?.data || [];
  } catch {
    showMessage("error", "error fetching listings");
    return [];
  }
}
