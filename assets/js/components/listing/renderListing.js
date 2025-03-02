import { createBackButton } from "./backButton.js";
import { createBidForm } from "../bids/bidForm.js";
import { createBidsSection } from "../bids/bidSection.js";
import { getFromLocalStorage } from "../../utils/storage/storage.js";
import { createImageElement } from "../../utils/dom/listingHelpers.js";

export function renderListingDetails(listing, bids, container) {
  const token = getFromLocalStorage("accessToken");

  const listingContainer = document.createElement("div");
  listingContainer.className =
    "bg-white shadow-md rounded-lg p-6 text-center max-w-lg mx-auto";

  const backButton = createBackButton();

  const title = document.createElement("h3");
  title.textContent = listing.title;
  title.className = "mb-3";

  const imageContainer = createImageElement(listing.media);

  const desc = document.createElement("p");
  desc.textContent = listing.description || "No description available.";
  desc.className = "text-text mb-3";

  const sellerInfo = document.createElement("p");
  sellerInfo.textContent = listing.seller
    ? `Seller: ${listing.seller.name}`
    : "Unknown Seller";
  sellerInfo.classList.add("text-sm", "font-medium", "mt-2", "mb-2");

  const endsAt = document.createElement("p");
  endsAt.innerHTML = `<strong>Ends:</strong> ${new Date(listing.endsAt).toLocaleString()}`;
  endsAt.classList.add("text-xs", "text-gray-500", "italic");

  const bidCount = document.createElement("p");
  bidCount.innerHTML = `<strong>Bids:</strong> ${listing._count?.bids ?? 0}`;
  bidCount.className = "text-gray-700 mb-3 mt-2";

  const bidForm = createBidForm(listing, token);
  const bidsSection = createBidsSection(bids);

  listingContainer.append(
    backButton,
    title,
    imageContainer,
    desc,
    sellerInfo,
    endsAt,
    bidCount,
    bidForm,
    bidsSection,
  );

  container.appendChild(listingContainer);
}
