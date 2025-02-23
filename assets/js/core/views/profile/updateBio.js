// updateBio.js
import { getFromLocalStorage } from "../../../utils/storage/storage.js";
import { PROFILE_URL } from "../../../api/constants.js";
import { headers } from "../../../api/headers.js";

// Select the elements from the DOM
const bioForm = document.querySelector("#bio-form");
const bioInput = document.querySelector("#bio-input");
const profileBio = document.querySelector("#profile-bio"); // Where the bio is displayed
const editBioBtn = document.querySelector("#edit-bio-btn");

// Function to handle bio update
async function updateBio(event) {
  event.preventDefault();

  const bioText = bioInput.value.trim();
  if (!bioText) {
    alert("Please enter a valid bio.");
    return;
  }

  const username = getFromLocalStorage("username");
  if (!username) {
    alert("You must be logged in to update your bio.");
    return;
  }

  try {
    const response = await fetch(`${PROFILE_URL}/${username}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({
        bio: bioText, // Sending the updated bio
      }),
    });

    const json = await response.json();
    console.log("Bio update response:", json);

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Failed to update bio");
    }

    console.log("Bio updated successfully!");

    // Update the displayed bio instantly
    profileBio.textContent = bioText;

    // Optionally, hide the bio form after submission and show the bio
    bioForm.classList.add("hidden");
    profileBio.classList.remove("hidden");
    editBioBtn.classList.remove("hidden");
  } catch (error) {
    console.error("Error updating bio:", error);
  }
}

// Function to show bio form and hide the "Edit Bio" button
function editBio() {
  bioForm.classList.remove("hidden");
  profileBio.classList.add("hidden");
  editBioBtn.classList.add("hidden");
}

// Exported function to initialize the bio update functionality
export function initializeBioUpdate() {
  editBioBtn.addEventListener("click", editBio);
  bioForm.addEventListener("submit", updateBio);
}
