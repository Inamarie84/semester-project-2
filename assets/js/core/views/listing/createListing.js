import { getFromLocalStorage } from "../../../utils/storage/storage.js";
import { createListing } from "../../../api/listing/fetchListing.js";
import { showMessage } from "../../../utils/dom/messageHandler.js"; // Keep the import

const createListingForm = document.getElementById("create-listing-form");

createListingForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const tagsInput = document.getElementById("tags").value.trim();
  const mediaInput = document.getElementById("media").value.trim(); // Image URLs input
  const endsAt = document.getElementById("endsAt").value;

  // Ensure the user is logged in
  const accessToken = getFromLocalStorage("accessToken");
  if (!accessToken) {
    showMessage("error", "loginFailed", "message-container"); // Use imported function
    return;
  }

  // Process optional fields
  const tags = tagsInput ? tagsInput.split(",").map((tag) => tag.trim()) : [];

  // Process media URLs
  const media = mediaInput
    ? mediaInput.split(",").map((url) => ({ url: url.trim(), alt: "Image" }))
    : [];

  // Prepare listing data
  const listingData = { title, description, endsAt };
  if (tags.length > 0) listingData.tags = tags;
  if (media.length > 0) listingData.media = media;

  try {
    await createListing(listingData);
    showMessage("success", "listingCreated", "message-container"); // Use imported function

    createListingForm.reset();

    setTimeout(() => {
      window.location.href = "/"; // Redirect after success message
    }, 3000);
  } catch (error) {
    showMessage("error", "error", "message-container"); // Use imported function
  }
});
