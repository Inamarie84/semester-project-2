import { getFromLocalStorage } from "../../../utils/storage.js";
import { PROFILE_URL } from "../../../api/constants.js";
import { API_KEY } from "../../../api/constants.js";

const avatarForm = document.querySelector("#avatar-form");
const avatarInput = document.querySelector("#avatar-url");
const avatarPreview = document.querySelector("#avatar-preview");

async function updateAvatar(event) {
  event.preventDefault();

  const avatarUrl = avatarInput.value.trim();
  if (!avatarUrl) {
    alert("Please enter a valid image URL.");
    return;
  }

  const token = getFromLocalStorage("accessToken");
  const username = getFromLocalStorage("username");

  console.log("Token:", token); // Debugging
  console.log("Username:", username); // Debugging
  console.log("API Key:", API_KEY); // Debugging

  if (!token || !username) {
    alert("You must be logged in to update your avatar.");
    return;
  }

  try {
    const response = await fetch(`${PROFILE_URL}/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-API-Key": API_KEY,
      },
      body: JSON.stringify({
        avatar: {
          url: avatarUrl,
          alt: "User avatar",
        },
      }),
    });

    const json = await response.json();
    console.log("Avatar update response:", json);

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Failed to update avatar");
    }

    console.log("Avatar updated successfully!");
  } catch (error) {
    console.error("Error updating avatar:", error);
  }
}

avatarForm.addEventListener("submit", updateAvatar);
