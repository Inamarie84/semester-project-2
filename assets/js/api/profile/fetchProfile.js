import { getFromLocalStorage } from "../../utils/storage/storage.js";
import { PROFILE_URL } from "../constants.js";
import { headers } from "../headers.js";
import { showMessage } from "../../utils/dom/messageHandler.js";

export async function fetchProfile() {
  const username = getFromLocalStorage("username");
  if (!username) {
    showMessage("error", "You must be logged in to access your profile.");
    return null;
  }

  try {
    const response = await fetch(`${PROFILE_URL}/${username}`, {
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile. Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.data) {
      throw new Error("Invalid profile data received.");
    }

    return data.data;
  } catch (error) {
    console.error("Profile fetch error:", error);
    showMessage("error", "error fetching profile");
    return null;
  }
}
