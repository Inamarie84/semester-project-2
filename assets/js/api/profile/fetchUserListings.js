import { getFromLocalStorage } from "../../utils/storage/storage.js";
import { PROFILE_URL } from "../constants.js";
import { headers } from "../headers.js";

export async function fetchUserListings() {
  const username = getFromLocalStorage("username");
  const accessToken = getFromLocalStorage("accessToken");

  if (!accessToken || !username) {
    console.error("❌ User not logged in or missing username.");
    return;
  }

  try {
    const response = await fetch(`${PROFILE_URL}/${username}/listings`, {
      method: "GET",
      headers: headers(),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      return data.data;
    } else {
      console.error("❌ Error fetching user listings", data);
    }
  } catch (error) {
    console.error("❌ Error fetching user listings:", error.message);
  }
}
