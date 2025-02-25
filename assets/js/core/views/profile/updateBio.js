import { getFromLocalStorage } from "../../../utils/storage/storage.js";
import { PROFILE_URL } from "../../../api/constants.js";
import { headers } from "../../../api/headers.js";
import { showMessage } from "../../../utils/dom/messageHandler.js"; // Import showMessage

const bioForm = document.querySelector("#bio-form");
const bioInput = document.querySelector("#bio-input");
const profileBio = document.querySelector("#profile-bio");
const editBioBtn = document.querySelector("#edit-bio-btn");

async function updateBio(event) {
  event.preventDefault();

  const bioText = bioInput.value.trim();
  if (!bioText) {
    showMessage("error", "Please enter a valid bio."); // Use showMessage for error
    return;
  }

  const username = getFromLocalStorage("username");
  if (!username) {
    showMessage("error", "You must be logged in to update your bio."); // Show error message for login requirement
    return;
  }

  try {
    const response = await fetch(`${PROFILE_URL}/${username}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({
        bio: bioText,
      }),
    });

    const json = await response.json();
    console.log("Bio update response:", json);

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Failed to update bio");
    }

    console.log("Bio updated successfully!");

    profileBio.textContent = bioText;

    bioForm.classList.add("hidden");
    profileBio.classList.remove("hidden");
    editBioBtn.classList.remove("hidden");

    showMessage("success", "Bio updated successfully!");
    setTimeout(() => location.reload(), 1500);
  } catch (error) {
    console.error("Error updating bio:", error);
    showMessage("error", "Failed to update bio. Please try again.");
  }
}

function editBio() {
  bioForm.classList.remove("hidden");
  profileBio.classList.add("hidden");
  editBioBtn.classList.add("hidden");
}

export function initializeBioUpdate() {
  editBioBtn.addEventListener("click", editBio);
  bioForm.addEventListener("submit", updateBio);
}
