import { getFromLocalStorage } from "../../../utils/storage/storage.js";
import { createListing } from "../../../api/listing/fetchListing.js";
import { showMessage } from "../../../utils/dom/messageHandler.js";

const createListingForm = document.getElementById("create-listing-form");

createListingForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const tagsInput = document.getElementById("tags").value.trim();
  const mediaInput = document.getElementById("media").value.trim();
  const endsAt = document.getElementById("endsAt").value;

  const accessToken = getFromLocalStorage("accessToken");
  if (!accessToken) {
    showMessage("error", "loginFailed", "messages-container");
    return;
  }

  const tags = tagsInput ? tagsInput.split(",").map((tag) => tag.trim()) : [];

  const media = mediaInput
    ? mediaInput.split(",").map((url) => ({ url: url.trim(), alt: "Image" }))
    : [];

  const listingData = { title, description, endsAt };
  if (tags.length > 0) listingData.tags = tags;
  if (media.length > 0) listingData.media = media;

  try {
    await createListing(listingData);
    showMessage(
      "success",
      "Listing created successfully!",
      "messages-container",
    );

    createListingForm.reset();

    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  } catch (error) {
    showMessage("error", "error", "messages-container");
  }
});
