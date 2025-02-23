import { getFromLocalStorage } from "../../../utils/storage/storage.js";
import { PROFILE_URL } from "../../../api/constants.js";
import { headers } from "../../../api/headers.js";

const avatarForm = document.querySelector("#avatar-form");
const avatarInput = document.querySelector("#avatar-url");
const avatarImage = document.querySelector("#avatar-image"); // Select the main avatar

export async function updateAvatar(event = null) {
  if (event) {
    event.preventDefault(); // Prevent form submission if triggered by an event
  }

  if (!avatarInput) {
    console.error("Avatar input field not found.");
    return;
  }

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
      headers: headers(),
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

    console.log("✅ Avatar updated successfully!");

    // Update the main profile avatar instantly
    if (avatarImage) {
      avatarImage.src = avatarUrl;
      avatarImage.alt = "User avatar";
    }

    location.reload(); // Refresh to reflect the updated avatar
  } catch (error) {
    console.error("❌ Error updating avatar:", error);
  }
}

// ✅ Ensure the event listener is added
if (avatarForm) {
  avatarForm.addEventListener("submit", updateAvatar);
} else {
  console.warn("⚠️ Avatar form not found. Make sure it's on the page.");
}
