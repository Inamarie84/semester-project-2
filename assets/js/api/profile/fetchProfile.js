import { getFromLocalStorage } from "../../utils/storage/storage.js";
import { PROFILE_URL } from "../constants.js";
import { headers } from "../headers.js";

export async function fetchProfile() {
  const username = getFromLocalStorage("username");
  if (!username) {
    console.error("No username found in local storage.");
    return null;
  }

  try {
    const response = await fetch(`${PROFILE_URL}/${username}`, {
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const { data } = await response.json();
    return data; // ✅ Return profile data only
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}
