export function generatelistings(listings, displayContainer) {
  displayContainer.innerHTML = ""; // Clear existing content

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
    const title = document.createElement("h2");
    title.textContent = listing.title;
    title.classList.add("text-lg", "font-semibold", "mb-2", "text-header");

    // Description
    const description = document.createElement("p");
    description.textContent =
      listing.description || "No description available.";
    description.classList.add("text-sm", "text-text", "mb-3");

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
          "bg-gray-200",
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

    // Bids Count
    console.log("Bids Count:", listing._count); // Debug log
    const bidsCount = document.createElement("p");
    bidsCount.textContent = `Bids: ${listing._count?.bids ?? 0}`;
    bidsCount.classList.add("text-sm", "font-medium", "mt-2", "text-gray-700");

    // Append elements to card
    card.append(
      image,
      title,
      description,
      endsAt,
      sellerInfo,
      tagsContainer,
      bidsCount,
    );

    // Append card to container
    displayContainer.appendChild(card);
  });
}
