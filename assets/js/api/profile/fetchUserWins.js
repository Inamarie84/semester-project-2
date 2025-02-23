import { PROFILE_URL } from "../constants.js";
import { headers } from "../headers.js";
import { getFromLocalStorage } from "../../utils/storage/storage.js";

export async function fetchUserWins() {
  const username = getFromLocalStorage("username"); // Getting the username from localStorage
  if (!username) return [];

  try {
    const response = await fetch(`${PROFILE_URL}/${username}/wins?_wins=true`, {
      headers: headers(),
    });

    if (!response.ok) throw new Error("Failed to fetch wins");

    const { data } = await response.json(); // ✅ Extract the `data` array

    console.log("User Wins API Response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user wins:", error);
    return [];
  }
}
