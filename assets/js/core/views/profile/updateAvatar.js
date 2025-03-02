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
    return;
  }

  const avatarUrl = avatarInput.value.trim();

  if (!avatarUrl) {
    showMessage("error", "Please enter a valid avatar URL.");
    return;
  }

  const spinner = document.createElement("div");
  spinner.className =
    "w-12 h-12 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"; // Tailwind spinner styling
  avatarImage.replaceWith(spinner);

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

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Failed to update avatar");
    }

    showMessage("success", "Avatar updated successfully!");

    if (avatarImage) {
      avatarImage.src = `${avatarUrl}?t=${Date.now()}`;
      avatarImage.alt = "User avatar";
    }

    avatarInput.value = "";
  } catch {
    showMessage("error", "Failed to update avatar. Please try again.");
  } finally {
    spinner.replaceWith(avatarImage);
  }
}

export function initializeAvatarUpdate() {
  if (avatarForm) {
    avatarForm.addEventListener("submit", updateAvatar);
  } else {
    showMessage("error", "Avatar form not found. Please try again later.");
  }
}
