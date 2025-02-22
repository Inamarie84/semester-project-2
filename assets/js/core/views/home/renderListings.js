import { getFromLocalStorage } from "../../../utils/storage.js";

export function generateListings(listings, displayContainer) {
  displayContainer.innerHTML = ""; // Clear existing content

  const token = getFromLocalStorage("accessToken"); // Check if user is logged in

  listings.forEach((listing) => {
    console.log("Listing Data:", listing); // Debug log

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

    // Image or Placeholder
    const image = document.createElement("img");
    image.classList.add("w-full", "h-48", "object-cover", "rounded-md", "mb-3");

    if (listing.media && listing.media.length > 0) {
      image.src = listing.media[0].url;
      image.alt = listing.media[0].alt || "Listing Image";
    } else {
      image.src = "https://via.placeholder.com/300x200?text=No+Image+Available"; // Placeholder
      image.alt = "No Image Available";
    }

    // Title
    const title = document.createElement("h3");
    title.textContent = listing.title;
    title.classList.add("mb-2");

    // Description (Wrapped in a div with flex-grow)
    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add("flex-grow", "mb-3", "flex", "flex-col");

    // Description
    const description = document.createElement("p");
    description.textContent =
      listing.description || "No description available.";
    description.classList.add("mb-3");

    // Ends At (Auction End Date)
    const endsAt = document.createElement("p");
    endsAt.textContent = `Ends: ${new Date(listing.endsAt).toLocaleDateString()}`;
    endsAt.classList.add("text-xs", "text-gray-500", "italic");

    // Seller Info
    const sellerInfo = document.createElement("p");
    sellerInfo.textContent = listing.seller
      ? `Seller: ${listing.seller.name}`
      : "Unknown Seller";
    sellerInfo.classList.add("text-sm", "font-medium", "mt-2");

    // Tags (if available)
    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add(
      "flex",
      "flex-wrap",
      "justify-center",
      "gap-2",
      "mt-3",
    );

    if (Array.isArray(listing.tags) && listing.tags.length > 0) {
      listing.tags.forEach((tag) => {
        console.log("Tag:", tag); // Debug log

        const tagElement = document.createElement("span");
        tagElement.textContent = `#${tag}`;
        tagElement.classList.add(
          "bg-light-bg",
          "text-gray-700",
          "px-2",
          "py-1",
          "text-xs",
          "rounded-full",
        );
        tagsContainer.appendChild(tagElement);
      });
    } else {
      console.log("No tags found"); // Debug log
      const noTags = document.createElement("span");
      noTags.textContent = "No tags available";
      noTags.classList.add("text-xs", "text-gray-500");
      tagsContainer.appendChild(noTags);
    }

    // Highest Bid
    const highestBidAmount =
      listing._count && listing._count.bids > 0
        ? listing._count.bids // Assuming _count.bids gives the total number of bids, adjust if it provides the actual bid amount
        : "No bids yet";

    const highestBid = document.createElement("p");
    highestBid.textContent = `Highest Bid: ${highestBidAmount} $`;
    highestBid.classList.add("text-sm", "font-medium", "mt-2", "text-gray-700");

    contentWrapper.append(
      description,
      endsAt,
      sellerInfo,
      tagsContainer,
      highestBid, // Add this here
    );

    // View Listing Button Wrapper
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add(
      "mt-auto",
      "w-full",
      "flex",
      "justify-center",
      "gap-2",
    );

    // View Listing Button
    const viewButton = document.createElement("a");
    viewButton.href = `/listing/single-listing.html?id=${listing.id}`;
    viewButton.textContent = "View Listing";
    viewButton.classList.add(
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
    );

    buttonWrapper.appendChild(viewButton);

    // Only show the bid button if the user is logged in
    if (token) {
      const placeBidButton = document.createElement("a");
      placeBidButton.href = `/listing/single-listing.html?id=${listing.id}`;
      placeBidButton.textContent = "Place Bid";
      placeBidButton.classList.add(
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
      );
      buttonWrapper.appendChild(placeBidButton);
    }

    card.append(image, title, contentWrapper, buttonWrapper);
    displayContainer.appendChild(card);
  });
}
