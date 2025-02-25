import { getFromLocalStorage } from "../../utils/storage/storage.js";
import {
  createImageElement,
  createButton,
} from "../../utils/dom/listingHelpers.js";

export function generateListings(listings, displayContainer) {
  displayContainer.innerHTML = ""; // Clear existing content

  const token = getFromLocalStorage("accessToken"); // Check if user is logged in

  listings.forEach((listing) => {
    const card = document.createElement("div");
    card.classList.add(
      "bg-white",
      "rounded-lg",
      "shadow-md",
      "p-4",
      "flex",
      "flex-col",
      "items-center",
      "text-center",
      "h-full",
    );

    const imageContainer = createImageElement(listing.media);
    const title = document.createElement("h3");
    title.textContent = listing.title;
    title.classList.add("mb-2");

    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add("flex-grow", "mb-3", "flex", "flex-col");

    const description = document.createElement("p");
    description.textContent =
      listing.description || "No description available.";
    description.classList.add("mb-3");

    const endsAt = document.createElement("p");
    endsAt.textContent = `Ends: ${new Date(listing.endsAt).toLocaleDateString()}`;
    endsAt.classList.add("text-xs", "text-gray-500", "italic");

    const sellerInfo = document.createElement("p");
    sellerInfo.textContent = listing.seller
      ? `Seller: ${listing.seller.name}`
      : "Unknown Seller";
    sellerInfo.classList.add("text-sm", "font-medium", "mt-2");

    const highestBidAmount =
      listing._count && listing._count.bids > 0
        ? listing._count.bids
        : "No bids yet";
    const highestBid = document.createElement("p");
    highestBid.textContent = `Highest Bid: ${highestBidAmount} $`;
    highestBid.classList.add("text-sm", "font-medium", "mt-2", "text-gray-700");

    contentWrapper.append(description, endsAt, sellerInfo, highestBid);

    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add(
      "mt-auto",
      "w-full",
      "flex",
      "justify-center",
      "gap-2",
    );

    const viewButton = createButton(
      "View Listing",
      `/listing/single-listing.html?id=${listing.id}`,
      [
        "px-4",
        "py-2",
        "bg-header",
        "text-light-bg",
        "rounded-md",
        "hover:bg-footer",
        "transition",
        "duration-300",
        "shadow-md",
        "focus:shadow-lg",
      ],
    );
    buttonWrapper.appendChild(viewButton);

    if (token) {
      const placeBidButton = createButton(
        "Place Bid",
        `/listing/single-listing.html?id=${listing.id}`,
        [
          "px-4",
          "py-2",
          "bg-green-btn",
          "text-footer",
          "rounded-md",
          "hover:bg-green-btn-hover",
          "transition",
          "duration-300",
          "shadow-md",
          "focus:shadow-lg",
        ],
      );
      buttonWrapper.appendChild(placeBidButton);
    }

    card.append(imageContainer, title, contentWrapper, buttonWrapper);
    displayContainer.appendChild(card);
  });
}

// export function generateListings(listings, displayContainer) {
//   displayContainer.innerHTML = ""; // Clear existing content

//   const token = getFromLocalStorage("accessToken"); // Check if user is logged in

//   if (!token) {
//     console.log("No token found, logged-out state assumed.");
//   }

//   listings.forEach((listing) => {
//     console.log("Listing Data:", listing); // Debug log

//     const card = document.createElement("div");
//     card.classList.add(
//       "bg-white",
//       "rounded-lg",
//       "shadow-md",
//       "p-4",
//       "flex",
//       "flex-col",
//       "items-center",
//       "text-center",
//       "h-full",
//     );

//     // Use the createImageElement helper
//     const imageContainer = createImageElement(listing.media);

//     const title = document.createElement("h3");
//     title.textContent = listing.title;
//     title.classList.add("mb-2");

//     // Other details (description, seller info, etc.)
//     const contentWrapper = document.createElement("div");
//     contentWrapper.classList.add("flex-grow", "mb-3", "flex", "flex-col");

//     const description = document.createElement("p");
//     description.textContent =
//       listing.description || "No description available.";
//     description.classList.add("mb-3");

//     const endsAt = document.createElement("p");
//     endsAt.textContent = `Ends: ${new Date(listing.endsAt).toLocaleDateString()}`;
//     endsAt.classList.add("text-xs", "text-gray-500", "italic");

//     const sellerInfo = document.createElement("p");
//     sellerInfo.textContent = listing.seller
//       ? `Seller: ${listing.seller.name}`
//       : "Unknown Seller";
//     sellerInfo.classList.add("text-sm", "font-medium", "mt-2");

//     const highestBidAmount =
//       listing._count && listing._count.bids > 0
//         ? listing._count.bids
//         : "No bids yet";
//     const highestBid = document.createElement("p");
//     highestBid.textContent = `Highest Bid: ${highestBidAmount} $`;
//     highestBid.classList.add("text-sm", "font-medium", "mt-2", "text-gray-700");

//     contentWrapper.append(description, endsAt, sellerInfo, highestBid);

//     const buttonWrapper = document.createElement("div");
//     buttonWrapper.classList.add(
//       "mt-auto",
//       "w-full",
//       "flex",
//       "justify-center",
//       "gap-2",
//     );

//     const viewButton = createButton(
//       "View Listing",
//       `/listing/single-listing.html?id=${listing.id}`,
//       [
//         "px-4",
//         "py-2",
//         "bg-header",
//         "text-light-bg",
//         "rounded-md",
//         "hover:bg-footer",
//         "transition",
//         "duration-300",
//         "shadow-md",
//         "focus:shadow-lg",
//       ],
//     );
//     buttonWrapper.appendChild(viewButton);

//     // Only add the "Place Bid" button if the user is logged in
//     if (token) {
//       const placeBidButton = createButton(
//         "Place Bid",
//         `/listing/single-listing.html?id=${listing.id}`,
//         [
//           "px-4",
//           "py-2",
//           "bg-green-btn",
//           "text-footer",
//           "rounded-md",
//           "hover:bg-green-btn-hover",
//           "transition",
//           "duration-300",
//           "shadow-md",
//           "focus:shadow-lg",
//         ],
//       );
//       buttonWrapper.appendChild(placeBidButton);
//     }

//     card.append(imageContainer, title, contentWrapper, buttonWrapper);
//     displayContainer.appendChild(card);
//   });
// }
