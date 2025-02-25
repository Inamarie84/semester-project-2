import { getFromLocalStorage } from "../../utils/storage/storage.js";
import { PROFILE_URL } from "../constants.js";
import { headers } from "../headers.js";
import { showMessage } from "../../utils/dom/messageHandler.js";

export async function fetchProfile() {
  const username = getFromLocalStorage("username");
  if (!username) {
    showMessage("error", "loginPlease");
    return null;
  }

  try {
    const response = await fetch(`${PROFILE_URL}/${username}`, {
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch profile data. Status: ${response.status}`,
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const { data } = await response.json();
      return data;
    } else {
      throw new Error("Expected JSON response, but got something else.");
    }
  } catch (error) {
    showMessage("error", "error");
    return null;
  }
}
