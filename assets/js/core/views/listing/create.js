import { getFromLocalStorage } from "../../../utils/storage.js";
import { LISTINGS_URL } from "../../../api/constants.js";
import { headers } from "../../../api/headers.js";
import { fetchListings } from "../home/fetchListings.js";
import { generatelistings } from "../home/generateListings.js";

const createListingForm = document.getElementById("create-listing-form");

createListingForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const tagsInput = document.getElementById("tags").value.trim();
  const mediaInput = document.getElementById("media").value.trim();
  const endsAt = document.getElementById("endsAt").value;

  // Ensure the user is logged in
  const accessToken = getFromLocalStorage("accessToken");
  if (!accessToken) {
    console.error("❌ No access token found. User must be logged in.");
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
    const response = await fetch(LISTINGS_URL, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(listingData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.errors ? data.errors[0].message : "Failed to create listing",
      );
    }

    console.log("✅ Listing created successfully:", data);

    // Re-fetch and render updated listings
    await fetchAndRenderListings();

    // Redirect to the homepage or listings page
    window.location.href = "/";
  } catch (error) {
    console.error("❌ Error creating listing:", error.message);
  }
});

// Fetch and render updated listings after a new listing is created
async function fetchAndRenderListings() {
  const listingsContainer = document.getElementById("listings-container");

  try {
    const listings = await fetchListings();

    // Clear existing listings before updating the UI
    listingsContainer.innerHTML = "";

    // Render listings with the latest data
    generatelistings(listings, listingsContainer);
  } catch (error) {
    console.error("❌ Error fetching listings:", error.message);
  }
}
