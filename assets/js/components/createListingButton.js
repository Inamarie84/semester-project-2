import { getFromLocalStorage } from "../utils/storage.js";

export function createListingButton(container) {
  // Check if user is logged in
  const accessToken = getFromLocalStorage("accessToken");
  if (!accessToken) return; // Don't add button if user isn't logged in

  // Prevent duplicate buttons
  if (document.getElementById("create-listing-btn")) return;

  // Create the button
  const createButton = document.createElement("a");
  createButton.href = "/listing/create-listing.html";

  // Add the pen icon using FontAwesome and text
  const icon = document.createElement("i");
  icon.className = "fas fa-pen"; // FontAwesome class for the pen icon
  icon.classList.add("mr-4"); // Adds a margin-right of 2 to create space between icon and text

  createButton.appendChild(icon);

  const text = document.createTextNode(" Create Listing");
  createButton.appendChild(text);

  createButton.className =
    "bg-light-bg text-footer border py-2 px-4 rounded-lg hover:bg-green-btn-hover transition duration-300 shadow-md block w-fit mx-auto mb-6 mt-6";
  createButton.id = "create-listing-btn";

  // Append button to the specified container
  container.prepend(createButton);
}
