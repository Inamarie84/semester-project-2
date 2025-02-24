// import { placeBid } from "../bids/placeAndFetchBids.js";
// import { getFromLocalStorage } from "../../utils/storage/storage.js";

// export function renderListingDetails(listing, bids, container) {
//   const token = getFromLocalStorage("accessToken"); // Check if user is logged in

//   const listingContainer = document.createElement("div");
//   listingContainer.className =
//     "bg-white shadow-md rounded-lg p-6 text-center max-w-lg mx-auto";

//   const backButton = document.createElement("button");
//   backButton.textContent = "← Back";
//   backButton.className = "mb-4 text-footer font-semibold hover:underline";
//   backButton.onclick = () => window.history.back();

//   const title = document.createElement("h3");
//   title.textContent = listing.title;
//   title.className = "mb-3";

//   // Image Container for multiple images
//   const imageContainer = document.createElement("div");
//   imageContainer.classList.add("w-full", "mb-3");

//   // Show the first image as the main image
//   if (listing.media && listing.media.length > 0) {
//     const mainImage = document.createElement("img");
//     mainImage.classList.add("w-full", "h-64", "object-cover", "rounded-md");
//     mainImage.src = listing.media[0].url;
//     mainImage.alt = listing.media[0].alt || "Listing Image";
//     imageContainer.appendChild(mainImage);

//     // Add "View Gallery" button if there are multiple images
//     if (listing.media.length > 1) {
//       const galleryButton = document.createElement("button");
//       galleryButton.classList.add(
//         "mt-2",
//         "text-header",
//         "underline",
//         "hover:text-footer",
//         "focus:outline-none",
//       );
//       galleryButton.textContent = "View Media Gallery";

//       // Open gallery in a modal
//       galleryButton.addEventListener("click", () => {
//         openGalleryModal(listing.media);
//       });

//       imageContainer.appendChild(galleryButton);
//     }
//   } else {
//     const placeholder = document.createElement("img");
//     placeholder.src =
//       "https://via.placeholder.com/300x200?text=No+Image+Available"; // Placeholder
//     placeholder.alt = "No Image Available";
//     placeholder.classList.add("w-32", "h-32", "object-cover", "rounded-md");
//     imageContainer.appendChild(placeholder);
//   }

//   const desc = document.createElement("p");
//   desc.textContent = listing.description || "No description available.";
//   desc.className = "text-text mb-3";

//   const endsAt = document.createElement("p");
//   endsAt.innerHTML = `<strong>Ends:</strong> ${new Date(listing.endsAt).toLocaleString()}`;
//   endsAt.classList.add("text-xs", "text-gray-500", "italic");

//   const bidCount = document.createElement("p");
//   bidCount.innerHTML = `<strong>Bids:</strong> ${listing._count?.bids ?? 0}`;
//   bidCount.className = "text-gray-700 mb-3 mt-2";

//   // Bid input & button
//   const bidForm = document.createElement("div");
//   bidForm.className = "mt-4 p-4 border rounded bg-white";

//   if (token) {
//     const bidInput = document.createElement("input");
//     bidInput.type = "number";
//     bidInput.id = "bid-amount";
//     bidInput.placeholder = "Enter bid amount";
//     bidInput.className = "border p-2 w-full mt-2";

//     const bidButton = document.createElement("button");
//     bidButton.textContent = "Place a Bid";
//     bidButton.className =
//       "w-fit mx-auto font-heading text-base bg-header text-light-bg py-2 px-4 rounded-md hover:bg-footer transition duration-300 shadow-md focus:shadow-lg text-center block mt-2";

//     bidButton.addEventListener("click", async () => {
//       const bidAmount = parseFloat(bidInput.value);
//       if (isNaN(bidAmount) || bidAmount <= 0) {
//         alert("Please enter a valid bid amount.");
//         return;
//       }

//       try {
//         await placeBid(listing.id, bidAmount);
//         alert("Bid placed successfully!");
//         location.reload(); // Refresh the page to show new bids
//       } catch (error) {
//         console.error("❌ Error placing bid:", error);
//         alert("Failed to place bid. Please try again.");
//       }
//     });

//     bidForm.append(bidInput, bidButton);
//   } else {
//     bidForm.innerHTML = "<p class='text-red-500'>Log in to place a bid.</p>";
//   }

//   const bidsSection = document.createElement("div");
//   bidsSection.className = "mt-6";
//   const bidsTitle = document.createElement("h2");
//   bidsTitle.textContent = "Bids";
//   bidsTitle.className = "text-lg font-semibold";
//   const bidsContainer = document.createElement("div");
//   bidsContainer.id = "bids-container";
//   bidsContainer.className = "mt-2";

//   if (!bids || bids.length === 0) {
//     bidsContainer.innerHTML = "<p class='text-gray-500'>No bids yet.</p>";
//   } else {
//     bids.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort bids by latest
//     bids.forEach((bid) => {
//       const bidItem = document.createElement("div");
//       bidItem.className = "flex justify-between mt-2";

//       const bidderName = document.createElement("span");
//       bidderName.className = "text-sm font-medium";
//       bidderName.textContent = bid.bidder.name;

//       const bidAmount = document.createElement("span");
//       bidAmount.className = "text-sm font-medium";
//       bidAmount.textContent = `$${bid.amount}`;

//       bidItem.append(bidderName, bidAmount);
//       bidsContainer.appendChild(bidItem);
//     });
//   }

//   bidsSection.append(bidsTitle, bidsContainer);

//   // Append all content to the container
//   listingContainer.append(
//     backButton,
//     title,
//     imageContainer,
//     desc,
//     endsAt,
//     bidCount,
//     bidForm,
//     bidsSection,
//   );
//   container.appendChild(listingContainer);
// }

// // Function to open the media gallery modal
// function openGalleryModal(media) {
//   const modal = document.createElement("div");
//   modal.classList.add(
//     "fixed",
//     "inset-0",
//     "bg-gray-800",
//     "bg-opacity-75",
//     "flex",
//     "items-center",
//     "justify-center",
//     "z-50",
//   );

//   const modalContent = document.createElement("div");
//   modalContent.classList.add(
//     "bg-white",
//     "p-4",
//     "rounded-lg",
//     "max-w-lg",
//     "w-full",
//   );

//   const closeButton = document.createElement("button");
//   closeButton.textContent = "Close";
//   closeButton.classList.add(
//     "absolute",
//     "top-4",
//     "right-4",
//     "text-light-bg",
//     "hover:text-gray-700",
//   );
//   closeButton.addEventListener("click", () => modal.remove());

//   const gallery = document.createElement("div");
//   gallery.classList.add("grid", "grid-cols-2", "sm:grid-cols-3", "gap-2");

//   media.forEach((image) => {
//     const img = document.createElement("img");
//     img.classList.add("w-full", "h-32", "object-cover", "rounded-md");
//     img.src = image.url;
//     img.alt = image.alt || "Listing Image";
//     gallery.appendChild(img);
//   });

//   modalContent.appendChild(closeButton);
//   modalContent.appendChild(gallery);
//   modal.appendChild(modalContent);
//   document.body.appendChild(modal);
// }

// import { placeBid } from "../bids/placeAndFetchBids.js";
// import { getFromLocalStorage } from "../../utils/storage/storage.js";
// import {
//   createImageElement,
//   createButton,
// } from "../../utils/dom/listingHelpers.js";

// export function renderListingDetails(listing, bids, container) {
//   const token = getFromLocalStorage("accessToken");

//   const listingContainer = document.createElement("div");
//   listingContainer.className =
//     "bg-white shadow-md rounded-lg p-6 text-center max-w-lg mx-auto";

//   const backButton = createButton("← Back", "javascript:history.back()", [
//     "mb-4",
//     "text-footer",
//     "font-semibold",
//     "hover:underline",
//   ]);

//   const title = document.createElement("h3");
//   title.textContent = listing.title;
//   title.className = "mb-3";

//   // Image Container for multiple images
//   const imageContainer = createImageElement(listing.media);

//   const desc = document.createElement("p");
//   desc.textContent = listing.description || "No description available.";
//   desc.className = "text-text mb-3";

//   const endsAt = document.createElement("p");
//   endsAt.innerHTML = `<strong>Ends:</strong> ${new Date(listing.endsAt).toLocaleString()}`;
//   endsAt.classList.add("text-xs", "text-gray-500", "italic");

//   const bidCount = document.createElement("p");
//   bidCount.innerHTML = `<strong>Bids:</strong> ${listing._count?.bids ?? 0}`;
//   bidCount.className = "text-gray-700 mb-3 mt-2";

//   // Reintroduce bid input & button functionality
//   const bidForm = document.createElement("div");
//   bidForm.className = "mt-4 p-4 border rounded bg-white";

//   if (token) {
//     const bidInput = document.createElement("input");
//     bidInput.type = "number";
//     bidInput.id = "bid-amount";
//     bidInput.min = "1";
//     bidInput.className = "w-full p-2 mb-3 border rounded";

//     const placeBidBtn = createButton("Place Bid", "#", [
//       "w-fit", // Adjust width
//       "mx-auto", // Center the button
//       "font-heading", // Use the same font
//       "text-base", // Text size
//       "bg-header", // Background color
//       "text-light-bg", // Text color
//       "py-2", // Vertical padding
//       "px-4", // Horizontal padding
//       "rounded-md", // Rounded corners
//       "hover:bg-footer", // Hover effect
//       "transition", // Smooth transition
//       "duration-300", // Transition duration
//       "shadow-md", // Shadow effect
//       "focus:shadow-lg", // Focus shadow effect
//       "text-center", // Text alignment
//       "block", // Block-level button
//       "mt-2", // Margin top
//     ]);

//     placeBidBtn.addEventListener("click", (e) => {
//       e.preventDefault();
//       const bidAmount = parseFloat(bidInput.value);
//       if (isNaN(bidAmount) || bidAmount <= 0) {
//         alert("Please enter a valid bid amount.");
//         return;
//       }

//       placeBid(listing.id, bidAmount)
//         .then(() => {
//           alert("Bid placed successfully!");
//           location.reload(); // Refresh the page to show new bids
//         })
//         .catch((error) => {
//           console.error("❌ Error placing bid:", error);
//           alert("Failed to place bid. Please try again.");
//         });
//     });

//     bidForm.append(bidInput, placeBidBtn);
//   } else {
//     bidForm.innerHTML = "<p class='text-red-500'>Log in to place a bid.</p>";
//   }

//   // Bids section - list existing bids
//   const bidsSection = document.createElement("div");
//   bidsSection.className = "mt-6";
//   const bidsTitle = document.createElement("h2");
//   bidsTitle.textContent = "Bids";
//   bidsTitle.className = "text-lg font-semibold";
//   const bidsContainer = document.createElement("div");
//   bidsContainer.id = "bids-container";
//   bidsContainer.className = "mt-2";

//   if (!bids || bids.length === 0) {
//     bidsContainer.innerHTML = "<p class='text-gray-500'>No bids yet.</p>";
//   } else {
//     bids.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort bids by latest
//     bids.forEach((bid) => {
//       const bidItem = document.createElement("div");
//       bidItem.className = "flex justify-between mt-2";

//       const bidderName = document.createElement("span");
//       bidderName.className = "text-sm font-medium";
//       bidderName.textContent = bid.bidder.name;

//       const bidAmount = document.createElement("span");
//       bidAmount.className = "text-sm font-medium";
//       bidAmount.textContent = `$${bid.amount}`;

//       bidItem.append(bidderName, bidAmount);
//       bidsContainer.appendChild(bidItem);
//     });
//   }

//   bidsSection.append(bidsTitle, bidsContainer);

//   // Assemble all content
//   listingContainer.append(
//     backButton,
//     title,
//     imageContainer,
//     desc,
//     endsAt,
//     bidCount,
//     bidForm,
//     bidsSection,
//   );

//   container.appendChild(listingContainer);
// }

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

  // Image Container for multiple images
  const imageContainer = createImageElement(listing.media);

  const desc = document.createElement("p");
  desc.textContent = listing.description || "No description available.";
  desc.className = "text-text mb-3";

  const endsAt = document.createElement("p");
  endsAt.innerHTML = `<strong>Ends:</strong> ${new Date(listing.endsAt).toLocaleString()}`;
  endsAt.classList.add("text-xs", "text-gray-500", "italic");

  const bidCount = document.createElement("p");
  bidCount.innerHTML = `<strong>Bids:</strong> ${listing._count?.bids ?? 0}`;
  bidCount.className = "text-gray-700 mb-3 mt-2";

  // Create bid form and bids section
  const bidForm = createBidForm(listing, token);
  const bidsSection = createBidsSection(bids);

  // Assemble all content
  listingContainer.append(
    backButton,
    title,
    imageContainer,
    desc,
    endsAt,
    bidCount,
    bidForm,
    bidsSection,
  );

  container.appendChild(listingContainer);
}
