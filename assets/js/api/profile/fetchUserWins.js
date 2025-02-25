import { PROFILE_URL } from "../constants.js";
import { headers } from "../headers.js";
import { getFromLocalStorage } from "../../utils/storage/storage.js";
import { showMessage } from "../../utils/dom/messageHandler.js";

export async function fetchUserWins() {
  const username = getFromLocalStorage("username");
  if (!username) return [];

  try {
    const response = await fetch(`${PROFILE_URL}/${username}/wins?_wins=true`, {
      headers: headers(),
    });

    if (!response.ok) throw new Error("Failed to fetch wins");

    const { data } = await response.json();

    return data;
  } catch (error) {
    showMessage("error", "error");
    return [];
  }
}
