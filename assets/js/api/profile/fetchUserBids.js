import { PROFILE_URL } from "../constants.js";
import { headers } from "../headers.js";
import { getFromLocalStorage } from "../../utils/storage/storage.js";

export async function fetchUserBids() {
  const username = getFromLocalStorage("username"); // Getting the username from localStorage
  if (!username) return [];

  try {
    const response = await fetch(
      `${PROFILE_URL}/${username}/bids?_listings=true`, // Using username here
      { headers: headers() },
    );

    if (!response.ok) throw new Error("Failed to fetch bids");

    const { data } = await response.json(); // ✅ Extract the `data` array

    console.log("User Bids API Response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user bids:", error);
    return [];
  }
}
