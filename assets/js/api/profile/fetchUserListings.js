import { getFromLocalStorage } from "../../utils/storage/storage.js";
import { PROFILE_URL } from "../constants.js";
import { headers } from "../headers.js";
import { showMessage } from "../../utils/dom/messageHandler.js";

export async function fetchUserListings() {
  const username = getFromLocalStorage("username");
  const accessToken = getFromLocalStorage("accessToken");

  if (!accessToken || !username) {
    return null;
  }

  try {
    const response = await fetch(`${PROFILE_URL}/${username}/listings`, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      const errorData = await response.json();

      showMessage(
        "error",
        "Failed to fetch your listings. Please try again later.",
      );
      return;
    }

    const data = await response.json();

    if (data && data.data) {
      return data.data;
    } else {
      showMessage("error", "Unexpected error while fetching listings.");
      return [];
    }
  } catch (error) {
    showMessage("error", "An error occurred while fetching your listings.");
  }
}
