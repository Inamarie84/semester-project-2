// updateAvatar.js
import { getFromLocalStorage } from "../../../utils/storage.js";
import { PROFILE_URL } from "../../../api/constants.js";
import { headers } from "../../../api/headers.js";

const avatarForm = document.querySelector("#avatar-form");
const avatarInput = document.querySelector("#avatar-url");
const avatarImage = document.querySelector("#avatar-image"); // Select the main avatar

async function updateAvatar(event) {
  event.preventDefault();

  const avatarUrl = avatarInput.value.trim();
  if (!avatarUrl) {
    alert("Please enter a valid image URL.");
    return;
  }

  const username = getFromLocalStorage("username");
  if (!username) {
    alert("You must be logged in to update your avatar.");
    return;
  }

  try {
    const response = await fetch(`${PROFILE_URL}/${username}`, {
      method: "PUT",
      headers: headers(), // Use centralized headers function
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

    // Update the main profile avatar instantly
    avatarImage.src = avatarUrl;
    avatarImage.alt = "User avatar";

    // Optional: Refresh profile data after updating avatar
    location.reload(); // Ensures the profile is updated with the new avatar
  } catch (error) {
    console.error("Error updating avatar:", error);
  }
}

// Export the updateAvatar function
export { updateAvatar };

// Add the event listener to the form only if the file is loaded
avatarForm.addEventListener("submit", updateAvatar);
