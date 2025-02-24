import { getFromLocalStorage } from "../../../utils/storage/storage.js";
import { createListing } from "../../../api/listing/fetchListing.js";

const createListingForm = document.getElementById("create-listing-form");
const messageContainer = document.getElementById("message-container");

createListingForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const tagsInput = document.getElementById("tags").value.trim();
  const mediaInput = document.getElementById("media").value.trim();
  const endsAt = document.getElementById("endsAt").value;

  // Ensure the user is logged in
  const accessToken = getFromLocalStorage("accessToken");
  if (!accessToken) {
    showMessage("❌ You need to be logged in to create a listing.", "error");
    return;
  }

  // Process optional fields
  const tags = tagsInput ? tagsInput.split(",").map((tag) => tag.trim()) : [];
  const media =
    mediaInput.length > 0
      ? mediaInput.split(",").map((url) => ({ url: url.trim(), alt: "Image" }))
      : [];

  // Prepare listing data
  const listingData = { title, description, endsAt };
  if (tags.length > 0) listingData.tags = tags;
  if (media.length > 0) listingData.media = media;

  try {
    await createListing(listingData);
    showMessage("✅ Listing created successfully!", "success");

    createListingForm.reset();

    setTimeout(() => {
      window.location.href = "/"; // Redirect after success message
    }, 3000);
  } catch (error) {
    showMessage(`❌ Error: ${error.message}`, "error");
  }
});

function showMessage(message, type) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  const baseClass =
    "py-2 px-4 rounded-md shadow-md my-4 mx-auto w-fit max-w-sm text-center";
  messageElement.className =
    type === "success"
      ? `${baseClass} bg-green-btn text-white`
      : `${baseClass} bg-red-500 text-white`;

  messageContainer.innerHTML = "";
  messageContainer.appendChild(messageElement);
}
