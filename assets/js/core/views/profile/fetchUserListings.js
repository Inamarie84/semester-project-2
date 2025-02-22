import { getFromLocalStorage } from "../../../utils/storage.js";
import { PROFILE_URL } from "../../../api/constants.js";
import { headers } from "../../../api/headers.js";

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
    console.log(data); // Log to inspect the structure

    if (response.ok) {
      // Return the listings data (do not render here)
      return data.data;
    } else {
      console.error("❌ Error fetching user listings", data);
    }
  } catch (error) {
    console.error("❌ Error fetching user listings:", error.message);
  }
}
