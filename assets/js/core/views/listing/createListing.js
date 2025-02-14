// import { getFromLocalStorage } from "../../../utils/storage.js";
// import { LISTINGS_URL } from "../../../api/constants.js";
// import { headers } from "../../../api/headers.js";

// const createListingForm = document.getElementById("create-listing-form");
// const messageContainer = document.getElementById("message-container"); // Assuming you have a container in your HTML for messages.

// createListingForm.addEventListener("submit", async (event) => {
//   event.preventDefault(); // Prevent default form submission

//   const title = document.getElementById("title").value.trim();
//   const description = document.getElementById("description").value.trim();
//   const tagsInput = document.getElementById("tags").value.trim();
//   const mediaInput = document.getElementById("media").value.trim();
//   const endsAt = document.getElementById("endsAt").value;

//   // Ensure the user is logged in
//   const accessToken = getFromLocalStorage("accessToken");
//   if (!accessToken) {
//     showMessage("❌ You need to be logged in to create a listing.", "error");
//     return;
//   }

//   // Process optional fields
//   const tags = tagsInput ? tagsInput.split(",").map((tag) => tag.trim()) : [];
//   const media =
//     mediaInput.length > 0
//       ? mediaInput.split(",").map((url) => ({ url: url.trim(), alt: "Image" }))
//       : [];

//   // Prepare listing data
//   const listingData = { title, description, endsAt };
//   if (tags.length > 0) listingData.tags = tags;
//   if (media.length > 0) listingData.media = media;

//   try {
//     const response = await fetch(LISTINGS_URL, {
//       method: "POST",
//       headers: headers(),
//       body: JSON.stringify(listingData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(
//         data.errors ? data.errors[0].message : "Failed to create listing",
//       );
//     }

//     console.log("✅ Listing created successfully:", data);

//     // Show success message and prevent redirect for now
//     showMessage("✅ Listing created successfully!", "success");

//     // Optionally, clear the form if needed
//     createListingForm.reset();

//     // Hide the message after a few seconds
//     setTimeout(() => {
//       messageContainer.innerHTML = ""; // Clear the message after 3 seconds
//     }, 5000);
//   } catch (error) {
//     console.error("❌ Error creating listing:", error.message);
//     showMessage(`❌ Error: ${error.message}`, "error");
//   }
// });

// // Function to show a success or error messagea
// function showMessage(message, type) {
//   const messageElement = document.createElement("div");
//   messageElement.textContent = message;

//   if (type === "success") {
//     messageElement.className =
//       "bg-green-btn text-white py-2 px-4 rounded-md shadow-md my-4"; // Removed mx-auto, w-fit, and mt-12
//   } else if (type === "error") {
//     messageElement.className =
//       "bg-red-500 text-white py-2 px-4 rounded-md shadow-md my-4"; // Removed mx-auto, w-fit, and mt-12
//   }

//   messageContainer.innerHTML = ""; // Clear any existing messages
//   messageContainer.appendChild(messageElement);
// }

import { getFromLocalStorage } from "../../../utils/storage.js";
import { LISTINGS_URL } from "../../../api/constants.js";
import { headers } from "../../../api/headers.js";

const createListingForm = document.getElementById("create-listing-form");
const messageContainer = document.getElementById("message-container"); // Assuming you have a container in your HTML for messages.

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

    // Show success message and prevent redirect for now
    showMessage("✅ Listing created successfully!", "success");

    // Optionally, clear the form if needed
    createListingForm.reset();

    // Automatically redirect after success message
    setTimeout(() => {
      window.location.href = "/"; // Redirect to the listings page
    }, 3000); // 3-second delay for user to see the success message
  } catch (error) {
    console.error("❌ Error creating listing:", error.message);
    showMessage(`❌ Error: ${error.message}`, "error");
  }
});

// Function to show a success or error message
function showMessage(message, type) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;

  // Common styling for the message container
  const baseClass =
    "py-2 px-4 rounded-md shadow-md my-4 mx-auto w-fit max-w-sm text-center";

  // Apply specific styles for success or error
  if (type === "success") {
    messageElement.className = `${baseClass} bg-green-btn text-white`;
  } else if (type === "error") {
    messageElement.className = `${baseClass} bg-red-500 text-white`;
  }

  messageContainer.innerHTML = ""; // Clear any existing messages
  messageContainer.appendChild(messageElement);
}
