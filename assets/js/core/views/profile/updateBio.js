import { getFromLocalStorage } from "../../../utils/storage/storage.js";
import { PROFILE_URL } from "../../../api/constants.js";
import { headers } from "../../../api/headers.js";
import { showMessage } from "../../../utils/dom/messageHandler.js";

const bioForm = document.querySelector("#bio-form");
const bioInput = document.querySelector("#bio-input");
const profileBio = document.querySelector("#profile-bio");
const editBioBtn = document.querySelector("#edit-bio-btn");

export async function updateBio(event = null) {
  if (event) {
    event.preventDefault();
  }

  if (!bioInput) {
    return;
  }

  const bioText = bioInput.value.trim();

  if (!bioText) {
    showMessage("error", "Please enter a valid bio.");
    return;
  }

  try {
    const username = getFromLocalStorage("username");

    const response = await fetch(`${PROFILE_URL}/${username}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({ bio: bioText }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Failed to update bio");
    }

    showMessage("success", "Bio updated successfully!");

    profileBio.textContent = bioText;

    setTimeout(() => {
      bioForm.classList.add("hidden");
      profileBio.classList.remove("hidden");
      editBioBtn.classList.remove("hidden");
    }, 1500);
  } catch {
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
