import { getFromLocalStorage } from "../../../utils/storage/storage.js";
import { PROFILE_URL } from "../../../api/constants.js";
import { headers } from "../../../api/headers.js";
import { showMessage } from "../../../utils/dom/messageHandler.js";

const avatarForm = document.querySelector("#avatar-form");
const avatarInput = document.querySelector("#avatar-url");
const avatarImage = document.querySelector("#avatar-image");

export async function updateAvatar(event = null) {
  if (event) {
    event.preventDefault();
  }

  if (!avatarInput) {
    console.error("Avatar input field not found.");
    return;
  }

  const avatarUrl = avatarInput.value.trim();

  if (!avatarUrl) {
    showMessage("error", "error");
    return;
  }

  try {
    const username = getFromLocalStorage("username");

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

    if (avatarImage) {
      avatarImage.src = avatarUrl;
      avatarImage.alt = "User avatar";
    }

    showMessage("success", "avatarUpdated");
    setTimeout(() => location.reload(), 1500);
  } catch (error) {
    console.error("❌ Error updating avatar:", error);
    showMessage("error", "error");
  }
}

if (avatarForm) {
  avatarForm.addEventListener("submit", updateAvatar);
} else {
  console.warn("⚠️ Avatar form not found. Make sure it's on the page.");
}
