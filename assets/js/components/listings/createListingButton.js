import { getFromLocalStorage } from "../../utils/storage/storage.js";

export function createListingButton(container) {
  const accessToken = getFromLocalStorage("accessToken");
  if (!accessToken) return;

  if (document.getElementById("create-listing-btn")) return;

  const createButton = document.createElement("a");
  createButton.href = "/listing/create-listing.html";

  const icon = document.createElement("i");
  icon.className = "fas fa-pen";
  icon.classList.add("mr-4");

  createButton.appendChild(icon);

  const text = document.createTextNode(" Create Listing");
  createButton.appendChild(text);

  createButton.className =
    "bg-light-bg text-footer border py-2 px-4 rounded-lg hover:bg-footer hover:text-light-bg transition duration-300 shadow-md block w-fit mx-auto mb-6 mt-6";
  createButton.id = "create-listing-btn";

  container.prepend(createButton);
}
